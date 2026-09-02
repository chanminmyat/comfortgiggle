import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { findCheckoutIntent } from "../../../lib/checkout-intents";
import { getPortalBaseUrl, getPortalToken } from "../../../lib/portal-security";

function getAuthorizeNetEndpoint() {
  const environment =
    process.env.AUTHORIZE_NET_ENVIRONMENT ||
    process.env.NEXT_PUBLIC_AUTHORIZE_NET_ENVIRONMENT;
  return environment === "production"
    ? "https://api.authorize.net/xml/v1/request.api"
    : "https://apitest.authorize.net/xml/v1/request.api";
}

function getSiteUrl(request: Request) {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || new URL(request.url).origin;
}

function normalizeCurrency(value: string) {
  return String(value || "USD").trim().toUpperCase() || "USD";
}

function formatAmount(value: unknown) {
  const amount = Number(value || 0);
  if (!Number.isFinite(amount) || amount <= 0) return "0.00";
  return amount.toFixed(2);
}

function clean(value: unknown) {
  return String(value ?? "").trim();
}

function truncate(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

function parseAuthorizeNetResponse(rawText: string) {
  const text = rawText.replace(/^\uFEFF/, "");
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getTransactionMessage(payload: any) {
  const transactionResponse = payload?.transactionResponse || {};
  const errors = transactionResponse?.errors;
  if (Array.isArray(errors) && errors[0]?.errorText) return String(errors[0].errorText);
  const messages = transactionResponse?.messages;
  if (Array.isArray(messages) && messages[0]?.description) return String(messages[0].description);
  const topMessages = payload?.messages?.message;
  if (Array.isArray(topMessages) && topMessages[0]?.text) return String(topMessages[0].text);
  return "Authorize.Net payment was declined.";
}

async function notifyBackendAuthorizeNetPayment({
  orderId,
  transactionId,
  amount,
  currency,
  merchantSiteUrl,
}: {
  orderId: string;
  transactionId: string;
  amount: number;
  currency: string;
  merchantSiteUrl: string;
}) {
  const token = getPortalToken();
  const baseUrl = getPortalBaseUrl();
  if (!token || !baseUrl) return;

  const response = await fetch(new URL("/api/plugin/payments/provider-webhook", baseUrl).toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-Merchant-Site": merchantSiteUrl,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify({
      orderId,
      processor: "AuthorizeNetCard",
      eventType: "merchant.authorizenet.payment.approved",
      status: "completed",
      providerPaymentIntentId: transactionId,
      providerPaymentLinkId: "",
      providerEventId: transactionId,
      amount,
      currency,
      paidAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const rawText = await response.text();
    console.error("Backend Authorize.Net payment callback failed", response.status, rawText.slice(0, 500));
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      orderId?: string;
      opaqueData?: {
        dataDescriptor?: string;
        dataValue?: string;
      };
    };
    const orderId = clean(body.orderId);
    if (!orderId) {
      return NextResponse.json({ error: "orderId is required." }, { status: 400 });
    }

    const opaqueData = body.opaqueData || {};
    const dataDescriptor = clean(opaqueData.dataDescriptor);
    const dataValue = clean(opaqueData.dataValue);
    if (!dataDescriptor || !dataValue) {
      return NextResponse.json({ error: "Authorize.Net opaqueData is required." }, { status: 400 });
    }

    const intent = await findCheckoutIntent(orderId);
    if (!intent) {
      return NextResponse.json({ error: "Checkout intent not found." }, { status: 404 });
    }

    const apiLoginId =
      process.env.AUTHORIZE_NET_API_LOGIN_ID ||
      process.env.NEXT_PUBLIC_AUTHORIZE_NET_API_LOGIN_ID;
    const transactionKey = process.env.AUTHORIZE_NET_TRANSACTION_KEY;
    if (!apiLoginId || !transactionKey) {
      return NextResponse.json({ error: "Authorize.Net is not configured." }, { status: 500 });
    }

    const orderReference = intent.orderId || intent.merchantOrderId || orderId;
    const amount = formatAmount(intent.amount);
    if (amount === "0.00") {
      return NextResponse.json({ error: "Order amount is invalid." }, { status: 400 });
    }

    const billing = intent.billingDetails || {};
    const customerEmail = typeof billing.email === "string" ? billing.email.trim() : "";
    const transactionRequest: Record<string, unknown> = {
      transactionType: "authCaptureTransaction",
      amount,
      payment: {
        opaqueData: {
          dataDescriptor,
          dataValue,
        },
      },
      order: {
        invoiceNumber: truncate(orderReference, 20),
        description: truncate("Order " + orderReference, 255),
      },
      customer: customerEmail
        ? {
            email: customerEmail,
          }
        : undefined,
      billTo: {
        firstName: truncate(clean(billing.firstName), 50),
        lastName: truncate(clean(billing.lastName), 50),
        address: truncate(clean(billing.address1), 60),
        city: truncate(clean(billing.city), 40),
        state: truncate(clean(billing.state), 40),
        zip: truncate(clean(billing.postcode), 20),
        country: truncate(clean(billing.country), 60),
      },
      customerIP: clean(intent.customerIp) || undefined,
    };

    Object.keys(transactionRequest.billTo as Record<string, string>).forEach((key) => {
      if (!(transactionRequest.billTo as Record<string, string>)[key]) {
        delete (transactionRequest.billTo as Record<string, string>)[key];
      }
    });

    const authorizeResponse = await fetch(getAuthorizeNetEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createTransactionRequest: {
          merchantAuthentication: {
            name: apiLoginId,
            transactionKey,
          },
          refId: crypto.randomUUID(),
          transactionRequest,
        },
      }),
    });

    const rawText = await authorizeResponse.text();
    const authorizePayload = parseAuthorizeNetResponse(rawText);
    if (!authorizeResponse.ok || !authorizePayload) {
      console.error("Authorize.Net transaction request failed", authorizeResponse.status, rawText.slice(0, 500));
      return NextResponse.json({ error: "Unable to create Authorize.Net payment." }, { status: 502 });
    }

    const transactionResponse = authorizePayload?.transactionResponse || {};
    const responseCode = String(transactionResponse?.responseCode || "");
    const transactionId = clean(transactionResponse?.transId);
    if (responseCode !== "1" || !transactionId) {
      console.error("Authorize.Net payment failed", authorizePayload);
      return NextResponse.json({ error: getTransactionMessage(authorizePayload) }, { status: 402 });
    }

    const siteUrl = getSiteUrl(request);
    const currency = normalizeCurrency(intent.currency);
    await notifyBackendAuthorizeNetPayment({
      orderId: orderReference,
      transactionId,
      amount: Number(amount),
      currency,
      merchantSiteUrl: siteUrl,
    });

    const thankYouUrl = new URL(
      "/thank-you?orderId=" + encodeURIComponent(orderReference) + "&method=authorize.net&amount=" + encodeURIComponent(amount),
      siteUrl,
    ).toString();

    return NextResponse.json({
      success: true,
      transactionId,
      providerPaymentIntentId: transactionId,
      currency,
      amount,
      thankYouUrl,
    });
  } catch (error) {
    console.error("Create Authorize.Net payment failed", error);
    return NextResponse.json({ error: "Unable to create Authorize.Net payment right now." }, { status: 500 });
  }
}
