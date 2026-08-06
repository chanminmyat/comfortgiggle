import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { findCheckoutIntent } from "../../../lib/checkout-intents";
import { getPortalBaseUrl, getPortalToken } from "../../../lib/portal-security";

function getSquareBaseUrl() {
  return process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

function getSiteUrl(request: Request) {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || new URL(request.url).origin;
}

function normalizeCurrency(value: string) {
  return String(value || "USD").trim().toUpperCase() || "USD";
}

async function notifyBackendSquareLink({
  orderId,
  checkoutUrl,
  providerPaymentIntentId,
  providerPaymentLinkId,
  merchantSiteUrl,
}: {
  orderId: string;
  checkoutUrl: string;
  providerPaymentIntentId?: string | null;
  providerPaymentLinkId?: string | null;
  merchantSiteUrl: string;
}) {
  const token = getPortalToken();
  const baseUrl = getPortalBaseUrl();
  if (!token || !baseUrl) return;

  const response = await fetch(new URL("/api/plugin/payments/square-link", baseUrl).toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Merchant-Site": merchantSiteUrl,
    },
    body: JSON.stringify({
      orderId,
      checkoutUrl,
      providerPaymentIntentId: providerPaymentIntentId || "",
      providerPaymentLinkId: providerPaymentLinkId || "",
    }),
  });

  if (!response.ok) {
    const rawText = await response.text();
    console.error("Backend Square link callback failed", response.status, rawText.slice(0, 500));
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { orderId?: string };
    const orderId = String(body.orderId || "").trim();
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }

    const intent = await findCheckoutIntent(orderId);
    if (!intent) {
      return NextResponse.json({ error: "Checkout intent not found." }, { status: 404 });
    }

    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;
    if (!accessToken || !locationId) {
      return NextResponse.json({ error: "Square is not configured." }, { status: 500 });
    }

    const siteUrl = getSiteUrl(request);
    const amountCents = Math.max(0, Math.round(Number(intent.amount || 0) * 100));
    const currency = normalizeCurrency(intent.currency);
    const orderReference = intent.orderId || intent.merchantOrderId || "Order";
    const successPath = orderReference !== "Order"
      ? `/thank-you?orderId=${encodeURIComponent(orderReference)}`
      : "/thank-you";
    const successUrl = new URL(successPath, siteUrl).toString();
    const paymentNote = orderReference !== "Order" ? `Order ${orderReference}` : undefined;

    const squareResponse = await fetch(`${getSquareBaseUrl()}/v2/online-checkout/payment-links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "Square-Version": process.env.SQUARE_VERSION || "2025-07-16",
      },
      body: JSON.stringify({
        idempotency_key: crypto.randomUUID(),
        quick_pay: {
          name: `Order ${orderReference}`,
          price_money: {
            amount: amountCents,
            currency,
          },
          location_id: locationId,
        },
        checkout_options: {
          redirect_url: successUrl,
        },
        ...(paymentNote ? { payment_note: paymentNote } : {}),
      }),
    });

    const squarePayload = await squareResponse.json().catch(() => ({}));
    if (!squareResponse.ok) {
      console.error("Square payment link creation failed", squarePayload);
      const detail = Array.isArray(squarePayload?.errors)
        ? squarePayload.errors
            .map((error: any) => [error.category, error.code, error.detail].filter(Boolean).join(": "))
            .join("; ")
        : "";
      return NextResponse.json(
        {
          error: detail || "Unable to create Square checkout link.",
        },
        { status: 502 },
      );
    }

    const paymentLink = squarePayload?.payment_link || squarePayload?.paymentLink || {};
    const checkoutUrl = String(paymentLink?.url || "").trim();
    if (!checkoutUrl) {
      return NextResponse.json({ error: "Square did not return a checkout URL." }, { status: 502 });
    }

    await notifyBackendSquareLink({
      orderId: intent.orderId || intent.merchantOrderId || "",
      checkoutUrl,
      providerPaymentIntentId: paymentLink?.order_id || paymentLink?.orderId || "",
      providerPaymentLinkId: paymentLink?.id || "",
      merchantSiteUrl: siteUrl,
    });

    return NextResponse.json({ success: true, checkoutUrl });
  } catch (error) {
    console.error("Create Square checkout failed", error);
    return NextResponse.json({ error: "Unable to create Square checkout right now." }, { status: 500 });
  }
}
