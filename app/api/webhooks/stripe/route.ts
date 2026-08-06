import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getPortalBaseUrl, getPortalToken } from "../../../../lib/portal-security";

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function verifyStripeSignature(rawBody: string, signature: string, secret: string) {
  const parts = signature.split(",").reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split("=", 2);
    if (!key || !value) return acc;
    acc[key] = [...(acc[key] || []), value];
    return acc;
  }, {});
  const timestamp = parts.t?.[0];
  const signatures = parts.v1 || [];
  if (!timestamp || signatures.length === 0) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");

  return signatures.some((value) => safeEqual(value, expected));
}

async function notifyBackend(payload: {
  orderId: string;
  processor: "Stripe";
  eventType: string;
  status: "completed" | "failed" | "canceled";
  providerPaymentIntentId?: string;
  providerPaymentLinkId?: string;
  providerEventId?: string;
  amount?: number;
  currency?: string;
  paidAt?: string;
}) {
  const token = getPortalToken();
  const baseUrl = getPortalBaseUrl();
  if (!token || !baseUrl) throw new Error("Backend callback is not configured.");

  const response = await fetch(new URL("/api/plugin/payments/provider-webhook", baseUrl).toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const rawText = await response.text();
    throw new Error(`Backend provider webhook callback failed (${response.status}): ${rawText.slice(0, 500)}`);
  }
}

function normalizeStripeEvent(event: any) {
  const object = event?.data?.object || {};
  const type = String(event?.type || "");

  if (type === "checkout.session.completed") {
    const orderId = String(object?.metadata?.orderId || object?.client_reference_id || "").trim();
    return {
      orderId,
      processor: "Stripe" as const,
      eventType: type,
      status: "completed" as const,
      providerPaymentIntentId: String(object?.payment_intent || ""),
      providerPaymentLinkId: String(object?.id || ""),
      providerEventId: String(event?.id || ""),
      amount: Number(object?.amount_total || 0) / 100,
      currency: String(object?.currency || "").toUpperCase(),
      paidAt: event?.created ? new Date(Number(event.created) * 1000).toISOString() : new Date().toISOString(),
    };
  }

  if (type === "payment_intent.succeeded") {
    const orderId = String(object?.metadata?.orderId || "").trim();
    return {
      orderId,
      processor: "Stripe" as const,
      eventType: type,
      status: "completed" as const,
      providerPaymentIntentId: String(object?.id || ""),
      providerPaymentLinkId: "",
      providerEventId: String(event?.id || ""),
      amount: Number(object?.amount_received || object?.amount || 0) / 100,
      currency: String(object?.currency || "").toUpperCase(),
      paidAt: object?.created ? new Date(Number(object.created) * 1000).toISOString() : new Date().toISOString(),
    };
  }

  if (type === "payment_intent.payment_failed" || type === "checkout.session.expired") {
    const orderId = String(object?.metadata?.orderId || object?.client_reference_id || "").trim();
    return {
      orderId,
      processor: "Stripe" as const,
      eventType: type,
      status: type === "checkout.session.expired" ? "canceled" as const : "failed" as const,
      providerPaymentIntentId: String(object?.payment_intent || object?.id || ""),
      providerPaymentLinkId: type.startsWith("checkout.session") ? String(object?.id || "") : "",
      providerEventId: String(event?.id || ""),
      currency: String(object?.currency || "").toUpperCase(),
    };
  }

  return null;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  const secret = process.env.STRIPE_WEBHOOK_SECRET || "";

  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 });
  }
  if (!signature || !verifyStripeSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid Stripe webhook signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const normalized = normalizeStripeEvent(event);
  if (!normalized) return NextResponse.json({ received: true, ignored: true });
  if (!normalized.orderId) {
    return NextResponse.json({ error: "Stripe webhook missing orderId metadata" }, { status: 400 });
  }

  await notifyBackend(normalized);
  return NextResponse.json({ received: true });
}
