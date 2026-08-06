import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getPortalBaseUrl, getPortalToken } from "../../../../lib/portal-security";

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function getSignatureUrls(request: Request) {
  const urls = new Set<string>();
  const configuredUrls = (process.env.SQUARE_WEBHOOK_URL || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  configuredUrls.forEach((url) => urls.add(url));
  if (request.url) urls.add(request.url);

  try {
    const parsed = new URL(request.url);
    const configuredSiteUrls = [
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.SITE_URL,
    ]
      .map((value) => String(value || "").trim())
      .filter(Boolean);

    configuredSiteUrls.forEach((siteUrl) => {
      try {
        urls.add(new URL(`${parsed.pathname}${parsed.search}`, siteUrl).toString());
      } catch {
        // Ignore invalid site URL env values.
      }
    });

    const forwardedProto = request.headers.get("x-forwarded-proto");
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = request.headers.get("host");

    if (forwardedProto && forwardedHost) {
      urls.add(`${forwardedProto}://${forwardedHost}${parsed.pathname}${parsed.search}`);
    }
    if (forwardedProto && host) {
      urls.add(`${forwardedProto}://${host}${parsed.pathname}${parsed.search}`);
    }
    if (forwardedHost) {
      urls.add(`${parsed.protocol}//${forwardedHost}${parsed.pathname}${parsed.search}`);
    }
    if (host) {
      urls.add(`${parsed.protocol}//${host}${parsed.pathname}${parsed.search}`);
    }
  } catch {
    // Keep the explicit configured URL and request.url candidates.
  }

  return Array.from(urls);
}

function verifySquareSignatureWithAlgorithm(
  rawBody: string,
  signature: string,
  signatureKey: string,
  notificationUrl: string,
  algorithm: "sha1" | "sha256",
) {
  const expected = crypto
    .createHmac(algorithm, signatureKey)
    .update(notificationUrl + rawBody)
    .digest("base64");
  return safeEqual(signature, expected);
}

function verifySquareSignatureForAnyUrl(rawBody: string, signature: string, signatureKey: string, notificationUrls: string[]) {
  return notificationUrls.some((notificationUrl) => (
    verifySquareSignatureWithAlgorithm(rawBody, signature, signatureKey, notificationUrl, "sha256") ||
    verifySquareSignatureWithAlgorithm(rawBody, signature, signatureKey, notificationUrl, "sha1")
  ));
}

async function notifyBackend(payload: {
  orderId: string;
  processor: "Square";
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

function extractPayment(event: any) {
  return event?.data?.object?.payment || event?.data?.object || {};
}

function normalizeOrderIdFromPayment(payment: any) {
  const note = String(payment?.note || "").trim();
  return note.replace(/^order\s+/i, "").trim();
}

function normalizeSquareEvent(event: any) {
  const type = String(event?.type || "");
  const payment = extractPayment(event);
  const squareStatus = String(payment?.status || "").toUpperCase();
  const orderId = normalizeOrderIdFromPayment(payment);

  let status: "completed" | "failed" | "canceled" | null = null;
  if (squareStatus === "COMPLETED") status = "completed";
  if (squareStatus === "FAILED") status = "failed";
  if (squareStatus === "CANCELED" || squareStatus === "CANCELLED") status = "canceled";

  if (!status) return null;

  const amountCents = Number(
    payment?.amountMoney?.amount ??
    payment?.amount_money?.amount ??
    payment?.totalMoney?.amount ??
    payment?.total_money?.amount ??
    0,
  );
  const currency = String(
    payment?.amountMoney?.currency ??
    payment?.amount_money?.currency ??
    payment?.totalMoney?.currency ??
    payment?.total_money?.currency ??
    "",
  ).toUpperCase();

  return {
    orderId,
    processor: "Square" as const,
    eventType: type || `payment.${squareStatus.toLowerCase()}`,
    status,
    providerPaymentIntentId: String(payment?.id || payment?.orderId || payment?.order_id || ""),
    providerPaymentLinkId: String(payment?.paymentLinkId || payment?.payment_link_id || ""),
    providerEventId: String(event?.event_id || event?.id || ""),
    amount: Number.isFinite(amountCents) ? amountCents / 100 : undefined,
    currency,
    paidAt: payment?.createdAt || payment?.created_at || new Date().toISOString(),
  };
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-square-hmacsha256-signature") || request.headers.get("x-square-signature") || "";
  const signatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY || "";

  if (!signatureKey) {
    return NextResponse.json({ error: "Missing SQUARE_WEBHOOK_SIGNATURE_KEY" }, { status: 500 });
  }
  const signatureUrls = getSignatureUrls(request);
  if (!signature || !verifySquareSignatureForAnyUrl(rawBody, signature, signatureKey, signatureUrls)) {
    console.warn("[Square Webhook] Invalid signature", {
      hasSignature: Boolean(signature),
      candidateUrls: signatureUrls,
    });
    return NextResponse.json({ error: "Invalid Square webhook signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const normalized = normalizeSquareEvent(event);
  if (!normalized) return NextResponse.json({ received: true, ignored: true });
  if (!normalized.orderId) {
    console.warn("[Square Webhook] Missing order note", {
      eventType: event?.type || "",
      paymentId: event?.data?.object?.payment?.id || event?.data?.object?.id || "",
      squareOrderId: event?.data?.object?.payment?.orderId || event?.data?.object?.payment?.order_id || "",
      paymentLinkId: event?.data?.object?.payment?.paymentLinkId || event?.data?.object?.payment?.payment_link_id || "",
    });
    return NextResponse.json({ error: "Square webhook missing order note" }, { status: 400 });
  }

  await notifyBackend(normalized);
  return NextResponse.json({ received: true });
}
