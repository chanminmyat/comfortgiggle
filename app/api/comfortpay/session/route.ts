import { NextRequest, NextResponse } from "next/server";

function getMerchantSite(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || request.nextUrl.origin;
}

export async function POST(request: NextRequest) {
  try {
    const baseUrl = process.env.COMFORTPAY_BASE_URL;
    const apiToken = process.env.COMFORTPAY_API_TOKEN;

    if (!baseUrl || !apiToken) {
      return NextResponse.json({ error: "ComfortPay merchant configuration is missing." }, { status: 503 });
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

    const payload = await response.text();
    return new NextResponse(payload, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to create ComfortPay session." },
      { status: 500 },
    );
  }
}
