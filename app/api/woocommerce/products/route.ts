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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, init: RequestInit, retries = 2) => {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) {
        return response;
      }

      if (attempt < retries && [429, 500, 502, 503, 504].includes(response.status)) {
        await delay(300 * (attempt + 1));
        continue;
      }

      return response;
    } catch (error) {
      if (attempt >= retries) {
        throw error;
      }
      await delay(300 * (attempt + 1));
    }
  }

  throw new Error('Failed to fetch after retries.');
};

export async function GET(request: NextRequest) {
  if (!API_BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    return NextResponse.json(
      { message: 'WooCommerce environment variables are not configured.' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  try {
    let url = '';

    if (id) {
      url = `${API_BASE_URL}/wp-json/wc/v3/products/${id}`;
    } else {
      const wcParams = new URLSearchParams();
      const keys = ['per_page', 'page', 'category', 'featured', 'on_sale', 'search', 'slug'];

      keys.forEach((key) => {
        const value = searchParams.get(key);
        if (value) wcParams.append(key, value);
      });

      url = `${API_BASE_URL}/wp-json/wc/v3/products?${wcParams.toString()}`;
    }

    const response = await fetchWithRetry(
      url,
      {
        headers: {
          Authorization: getAuthHeader(),
          'Content-Type': 'application/json',
          'User-Agent': 'classiccomfort-vercel',
        },
        next: { revalidate: 60 },
      },
      2,
    );

    if (!response.ok && [401, 403].includes(response.status)) {
      const fallbackResponse = await fetchWithRetry(
        withQueryAuth(url),
        {
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'classiccomfort-vercel',
          },
          next: { revalidate: 60 },
        },
        1,
      );

      if (!fallbackResponse.ok) {
        const error = await fallbackResponse.json().catch(() => ({}));
        return NextResponse.json(
          { message: error?.message || 'Failed to fetch products.' },
          { status: fallbackResponse.status },
        );
      }

      const data = await fallbackResponse.json();

      if (id) {
        return NextResponse.json(data);
      }

      if (slug) {
        return NextResponse.json(data[0] || null);
      }

      const total = Number(fallbackResponse.headers.get('x-wp-total') || 0);
      const totalPages = Number(fallbackResponse.headers.get('x-wp-totalpages') || 0);

      return NextResponse.json({ products: data, total, totalPages });
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: error?.message || 'Failed to fetch products.' },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (id) {
      return NextResponse.json(data);
    }

    if (slug) {
      return NextResponse.json(data[0] || null);
    }

    const total = Number(response.headers.get('x-wp-total') || 0);
    const totalPages = Number(response.headers.get('x-wp-totalpages') || 0);

    return NextResponse.json({ products: data, total, totalPages });
  } catch (error) {
    console.error('WooCommerce products error:', error);
    return NextResponse.json({ message: 'Unexpected error fetching products.' }, { status: 500 });
  }
}
