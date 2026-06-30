import { NextRequest, NextResponse } from "next/server";

function getMerchantSite(request: NextRequest) {
  return process.env.NEXT_PUBLIC_SITE_URL || request.headers.get("origin") || request.nextUrl.origin;
}

export async function GET(request: NextRequest) {
  try {
    const baseUrl = process.env.COMFORTPAY_BASE_URL;
    const apiToken = process.env.COMFORTPAY_API_TOKEN;

    if (!baseUrl || !apiToken) {
      return NextResponse.json({ error: "Payment configuration is missing." }, { status: 503 });
    }

    const amount = request.nextUrl.searchParams.get("amount");
    const url = new URL(`${baseUrl.replace(/\/$/, "")}/api/checkout/config`);
    if (amount) {
      url.searchParams.set("amount", amount);
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "X-Merchant-Site": getMerchantSite(request),
      },
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
      { error: (error as Error).message || "Failed to load payment configuration." },
      { status: 500 },
    );
  }
}
