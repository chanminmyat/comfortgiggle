export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  stock_status: string;
  stock_quantity: number | null;
  manage_stock: boolean;
}

export interface CartItem {
  product: WooCommerceProduct;
  quantity: number;
}

export interface WooCommerceProductList {
  products: WooCommerceProduct[];
  total: number;
  totalPages: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL || '';
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET || '';
const isBrowser = typeof window !== 'undefined';

const getAuthHeader = () => {
  const credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  return `Basic ${credentials}`;
};

export async function fetchProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  featured?: boolean;
  on_sale?: boolean;
  search?: string;
}): Promise<WooCommerceProductList> {
  try {
    const searchParams = new URLSearchParams();

    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.featured) searchParams.append('featured', 'true');
    if (params?.on_sale) searchParams.append('on_sale', 'true');
    if (params?.search) searchParams.append('search', params.search);

    if (isBrowser) {
      const response = await fetch(`/api/woocommerce/products?${searchParams.toString()}`);

      if (!response.ok) {
        console.error('Failed to fetch products:', response.statusText);
        return { products: [], total: 0, totalPages: 0 };
      }

      return await response.json();
    }

    const url = `${API_BASE_URL}/wp-json/wc/v3/products?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Failed to fetch products:', response.statusText);
      return { products: [], total: 0, totalPages: 0 };
    }

    const products = await response.json();
    const total = Number(response.headers.get('x-wp-total') || 0);
    const totalPages = Number(response.headers.get('x-wp-totalpages') || 0);

    return { products, total, totalPages };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], total: 0, totalPages: 0 };
  }
}

export async function fetchProductBySlug(slug: string): Promise<WooCommerceProduct | null> {
  try {
    if (isBrowser) {
      const response = await fetch(`/api/woocommerce/products?slug=${slug}`);

      if (!response.ok) {
        console.error('Failed to fetch product:', response.statusText);
        return null;
      }

      return await response.json();
    }

    const url = `${API_BASE_URL}/wp-json/wc/v3/products?slug=${slug}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Failed to fetch product:', response.statusText);
      return null;
    }

    const products = await response.json();
    return products[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchProductById(id: number): Promise<WooCommerceProduct | null> {
  try {
    if (isBrowser) {
      const response = await fetch(`/api/woocommerce/products?id=${id}`);

      if (!response.ok) {
        console.error('Failed to fetch product:', response.statusText);
        return null;
      }

      return await response.json();
    }

    const url = `${API_BASE_URL}/wp-json/wc/v3/products/${id}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Failed to fetch product:', response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function createOrder(orderData: {
  billing: any;
  shipping: any;
  line_items: Array<{ product_id: number; quantity: number }>;
  payment_method: string;
  payment_method_title: string;
}) {
  try {
    if (isBrowser) {
      const response = await fetch('/api/woocommerce/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }

      return await response.json();
    }

    const url = `${API_BASE_URL}/wp-json/wc/v3/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': getAuthHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
