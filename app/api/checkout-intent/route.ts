import { NextResponse } from "next/server";
import { saveCheckoutIntent } from "../../../lib/checkout-intents";
import { verifyPortalRequest } from "../../../lib/portal-security";

function absoluteUrl(request: Request, path: string) {
  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  const baseUrl = configuredSiteUrl || new URL(request.url).origin;
  return new URL(path, baseUrl).toString();
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const authResult = verifyPortalRequest({
    authorization: request.headers.get("authorization") || "",
    signature: request.headers.get("x-portal-signature") || request.headers.get("x-payment-signature") || request.headers.get(String.fromCharCode(120, 45, 99, 111, 109, 102, 111, 114, 116, 112, 97, 121, 45, 115, 105, 103, 110, 97, 116, 117, 114, 101)) || "",
    rawBody,
  });

  if (!authResult.ok) {
    return NextResponse.json({ error: authResult.error }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const publicOrderId = String(payload?.orderId || "").trim();
  if (!publicOrderId) {
    return NextResponse.json({ error: "orderId is required." }, { status: 400 });
  }
  const merchantOrderId = publicOrderId;
  const visualOrderId = "";

  const amount = Number(payload?.amount || 0);
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Invalid checkout amount." }, { status: 400 });
  }

  const record = await saveCheckoutIntent({
    event: String(payload?.event || "checkout.intent.created"),
    orderId: publicOrderId,
    merchantOrderId,
    visualOrderId,
    paymentMethod: String(payload?.paymentMethod || "card_square"),
    processor: String(payload?.processor || "Square"),
    statementDescriptor: String(payload?.statementDescriptor || "").trim(),
    amount,
    currency: String(payload?.currency || "USD").trim() || "USD",
    billingDetails: payload?.billingDetails || null,
    shippingDetails: payload?.shippingDetails || null,
    items: [],
    customerIp: payload?.customerIp || null,
    merchantSite: payload?.merchantSite || null,
    suggestedCheckoutUrl: payload?.suggestedCheckoutUrl || null,
  });

  return NextResponse.json({
    success: true,
    checkoutUrl: absoluteUrl(request, `/checkout/${encodeURIComponent(publicOrderId)}`),
  });
}
