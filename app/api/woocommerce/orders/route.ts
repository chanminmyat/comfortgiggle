import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '';
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';

const getAuthHeader = () => {
  const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  return `Basic ${credentials}`;
};

const withQueryAuth = (inputUrl: string) => {
  const url = new URL(inputUrl);
  url.searchParams.set('consumer_key', CONSUMER_KEY);
  url.searchParams.set('consumer_secret', CONSUMER_SECRET);
  return url.toString();
};

export async function POST(request: NextRequest) {
  if (!API_BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    return NextResponse.json(
      { message: 'WooCommerce environment variables are not configured.' },
      { status: 500 },
    );
  }

  try {
    const payload = await request.json();
    const url = `${API_BASE_URL}/wp-json/wc/v3/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader(),
        'Content-Type': 'application/json',
        'User-Agent': 'comfortgiggles-vercel',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok && [401, 403].includes(response.status)) {
      const fallbackResponse = await fetch(withQueryAuth(url), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'comfortgiggles-vercel',
        },
        body: JSON.stringify(payload),
      });

      if (!fallbackResponse.ok) {
        const error = await fallbackResponse.json().catch(() => ({}));
        return NextResponse.json(
          { message: error?.message || 'Failed to create order.' },
          { status: fallbackResponse.status },
        );
      }

      const data = await fallbackResponse.json();
      return NextResponse.json(data);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: error?.message || 'Failed to create order.' },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('WooCommerce orders error:', error);
    return NextResponse.json({ message: 'Unexpected error creating order.' }, { status: 500 });
  }
}
