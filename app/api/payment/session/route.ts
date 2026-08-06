import { NextRequest, NextResponse } from "next/server";
import { getPortalApiToken, getPortalBaseUrl } from "../../../../lib/portal-security";

function getMerchantSite(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || request.headers.get("origin") || request.nextUrl.origin;
}

function sanitizeUpstreamPayload(payload: string, contentType: string) {
  if (!payload) return payload;
  if (!contentType.toLowerCase().includes("json")) return payload;

  try {
    const parsed = JSON.parse(payload);
    if (typeof parsed?.error === "string" && /dashboard\s*brand/i.test(parsed.error)) {
      parsed.error = "Checkout request failed.";
    }
    if (typeof parsed?.message === "string" && /dashboard\s*brand/i.test(parsed.message)) {
      parsed.message = "Checkout request failed.";
    }
    return JSON.stringify(parsed);
  } catch {
    return payload;
  }
}

export async function POST(request: NextRequest) {
  try {
    const baseUrl = getPortalBaseUrl();
    const apiToken = getPortalApiToken();

    if (!baseUrl || !apiToken) {
      return NextResponse.json({ error: "Payment configuration is missing." }, { status: 503 });
    }

    const body = await request.json();
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/api/checkout/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
        "X-Merchant-Site": getMerchantSite(request),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") || "application/json; charset=utf-8";
    const payload = sanitizeUpstreamPayload(await response.text(), contentType);
    if (!response.ok) {
      console.error("[payment/session] session request failed", response.status, payload.slice(0, 500));
    }
    return new NextResponse(payload, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    console.error("[payment/session] session request failed", error);
    return NextResponse.json(
      { error: "Failed to create payment session." },
      { status: 500 },
    );
  }
}
