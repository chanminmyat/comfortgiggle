import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { findCheckoutIntent } from "../../../lib/checkout-intents";
import { getPortalBaseUrl, getPortalToken } from "../../../lib/portal-security";

function getSiteUrl(request: Request) {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || new URL(request.url).origin;
}

function normalizeCurrency(value: string) {
  return String(value || "USD").trim().toLowerCase() || "usd";
}

function appendFormValue(params: URLSearchParams, key: string, value: string | number | undefined | null) {
  if (value === undefined || value === null || value === "") return;
  params.append(key, String(value));
}

async function notifyBackendStripeLink({
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

  const response = await fetch(new URL("/api/plugin/payments/stripe-link", baseUrl).toString(), {
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
    console.error("Backend Stripe link callback failed", response.status, rawText.slice(0, 500));
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

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
    }

    const siteUrl = getSiteUrl(request);
    const amountCents = Math.max(0, Math.round(Number(intent.amount || 0) * 100));
    const currency = normalizeCurrency(intent.currency);
    const orderReference = intent.orderId || intent.merchantOrderId || "Order";
    const successPath = orderReference !== "Order"
      ? `/thank-you?orderId=${encodeURIComponent(orderReference)}`
      : "/thank-you";
    const successUrl = new URL(successPath, siteUrl).toString();
    const cancelUrl = new URL(`/checkout/${encodeURIComponent(orderReference)}`, siteUrl).toString();

    const params = new URLSearchParams();
    appendFormValue(params, "mode", "payment");
    appendFormValue(params, "payment_method_types[0]", "card");
    appendFormValue(params, "billing_address_collection", "required");
    appendFormValue(params, "shipping_address_collection[allowed_countries][0]", "US");
    appendFormValue(params, "line_items[0][quantity]", 1);
    appendFormValue(params, "line_items[0][price_data][currency]", currency);
    appendFormValue(params, "line_items[0][price_data][product_data][name]", `Order ${orderReference}`);
    appendFormValue(params, "line_items[0][price_data][unit_amount]", amountCents);
    appendFormValue(params, "success_url", successUrl);
    appendFormValue(params, "cancel_url", cancelUrl);
    appendFormValue(params, "client_reference_id", orderReference);
    appendFormValue(params, "metadata[orderId]", orderReference);
    appendFormValue(params, "payment_intent_data[metadata][orderId]", orderReference);
    const email = typeof intent.billingDetails?.email === "string" ? intent.billingDetails.email : "";
    appendFormValue(params, "customer_email", email);
    appendFormValue(params, "payment_intent_data[receipt_email]", email);

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: params,
    });

    const stripePayload = await stripeResponse.json().catch(() => ({}));
    if (!stripeResponse.ok) {
      console.error("Stripe checkout session creation failed", stripePayload);
      const detail = stripePayload?.error?.message || "Unable to create Stripe checkout link.";
      return NextResponse.json({ error: detail }, { status: 502 });
    }

    const checkoutUrl = String(stripePayload?.url || "").trim();
    if (!checkoutUrl) {
      return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 502 });
    }

    await notifyBackendStripeLink({
      orderId: intent.orderId || intent.merchantOrderId || "",
      checkoutUrl,
      providerPaymentIntentId: stripePayload?.payment_intent || "",
      providerPaymentLinkId: stripePayload?.id || "",
      merchantSiteUrl: siteUrl,
    });

    return NextResponse.json({ success: true, checkoutUrl });
  } catch (error) {
    console.error("Create Stripe checkout failed", error);
    return NextResponse.json({ error: "Unable to create Stripe checkout right now." }, { status: 500 });
  }
}
