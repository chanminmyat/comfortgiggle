import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_PRODUCTS } from '@/lib/sample-products';

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

// Per-attempt timeout so a slow/hanging store can't stall the page.
const REQUEST_TIMEOUT_MS = 3500;

const fetchWithRetry = async (url: string, init: RequestInit, retries = 1) => {
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
      if (response.ok) {
        return response;
      }

      // Retry only transient infrastructure errors, not a persistent 500.
      if (attempt < retries && [429, 502, 503, 504].includes(response.status)) {
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

const toPositiveInt = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }
  return Math.floor(parsed);
};

const matchesCategory = (product: (typeof SAMPLE_PRODUCTS)[number], categoryValue: string) => {
  const normalized = categoryValue.toLowerCase();
  return product.categories.some(
    (category) =>
      category.slug.toLowerCase() === normalized ||
      category.name.toLowerCase() === normalized ||
      String(category.id) === categoryValue,
  );
};

// Small, deliberate delay so the loading state shows — makes the local
// catalog feel like a real network fetch instead of an instant render.
const SAMPLE_LOADING_MIN_MS = 350;
const SAMPLE_LOADING_MAX_MS = 650;

const getSampleProductsResponse = async (searchParams: URLSearchParams) => {
  const wait = SAMPLE_LOADING_MIN_MS + Math.random() * (SAMPLE_LOADING_MAX_MS - SAMPLE_LOADING_MIN_MS);
  await delay(wait);

  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  if (id) {
    const productId = Number(id);
    const product = SAMPLE_PRODUCTS.find((item) => item.id === productId) || null;
    return NextResponse.json(product);
  }

  if (slug) {
    const product = SAMPLE_PRODUCTS.find((item) => item.slug === slug) || null;
    return NextResponse.json(product);
  }

  let filtered = [...SAMPLE_PRODUCTS];

  const category = searchParams.get('category');
  if (category) {
    filtered = filtered.filter((product) => matchesCategory(product, category));
  }

  const featured = searchParams.get('featured');
  if (featured === 'true') {
    filtered = filtered.filter((product) => product.featured);
  }

  const onSale = searchParams.get('on_sale');
  if (onSale === 'true') {
    filtered = filtered.filter((product) => product.on_sale);
  }

  const search = searchParams.get('search')?.trim().toLowerCase();
  if (search) {
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.short_description.toLowerCase().includes(search),
    );
  }

  const perPage = toPositiveInt(searchParams.get('per_page'), 12);
  const page = toPositiveInt(searchParams.get('page'), 1);
  const total = filtered.length;
  const totalPages = total === 0 ? 0 : Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const products = filtered.slice(start, start + perPage);

  return NextResponse.json({ products, total, totalPages });
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');

  if (!API_BASE_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    return getSampleProductsResponse(searchParams);
  }

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
          'User-Agent': 'comfortgiggles-vercel',
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
            'User-Agent': 'comfortgiggles-vercel',
          },
          next: { revalidate: 60 },
        },
        1,
      );

      if (!fallbackResponse.ok) {
        // Store reachable but rejecting — serve the local catalog instead of erroring.
        return getSampleProductsResponse(searchParams);
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
      // Store is up but returning an error (e.g. 500) — fall back to the local catalog.
      return getSampleProductsResponse(searchParams);
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
    // Network failure / timeout — serve the local catalog so pages still render fast.
    return getSampleProductsResponse(searchParams);
  }
}
