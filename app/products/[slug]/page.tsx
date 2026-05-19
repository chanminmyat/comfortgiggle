'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { fetchProductBySlug, WooCommerceProduct } from '@/lib/woocommerce';
import { addToCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, ArrowLeft, Package, Truck, Shield, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<WooCommerceProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customScent, setCustomScent] = useState('Lavender Dream');
  const [customJarColor, setCustomJarColor] = useState('Amber Jar');
  const [customSize, setCustomSize] = useState('8 oz');
  const [customLabelText, setCustomLabelText] = useState('');

  useEffect(() => {
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  const loadProduct = async () => {
    setLoading(true);
    try {
      const fetchedProduct = await fetchProductBySlug(slug);
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isCustomProduct =
    product.slug === 'comfort-giggle-custom-candle' ||
    product.tags?.some((tag) => tag.slug === 'custom');

  const customRequestSubject = `Custom Candle Request - ${product.name}`;
  const customRequestBody = [
    'Hi Comfort Giggle team,',
    '',
    'I would like to order a custom candle with these options:',
    `- Product: ${product.name}`,
    `- Scent: ${customScent}`,
    `- Jar Color: ${customJarColor}`,
    `- Size: ${customSize}`,
    `- Label Text: ${customLabelText || 'Not provided'}`,
    '',
    'Please send me the price based on these selections and share the next steps.',
    '',
    'Thank you!',
  ].join('\n');
  const customRequestMailto = `mailto:hello@comfortgiggles.com?subject=${encodeURIComponent(
    customRequestSubject,
  )}&body=${encodeURIComponent(customRequestBody)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage]?.src || product.images[0].src}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image available
                  </div>
                )}
              </div>

              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-amber-600'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt || product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  {product.categories && product.categories.length > 0 && (
                    <p className="text-sm text-gray-600 mb-2">
                      {product.categories.map(cat => cat.name).join(' • ')}
                    </p>
                  )}
                  <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  {product.on_sale && (
                    <Badge className="bg-red-600 hover:bg-red-700">Sale</Badge>
                  )}
                  {product.featured && (
                    <Badge className="bg-amber-600 hover:bg-amber-700">Featured</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                {product.on_sale && product.regular_price ? (
                  <>
                    <span className="text-4xl font-bold text-amber-700">
                      ${product.price}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.regular_price}
                    </span>
                    <Badge variant="destructive">
                      Save $
                      {(parseFloat(product.regular_price) - parseFloat(product.price)).toFixed(2)}
                    </Badge>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                )}
              </div>

              <Separator className="my-6" />

              <div
                className="prose prose-sm max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <Separator className="my-6" />

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Package className="h-8 w-8 text-amber-600 mb-2" />
                  <span className="text-sm text-center">Premium Quality</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Truck className="h-8 w-8 text-amber-600 mb-2" />
                  <span className="text-sm text-center">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-8 w-8 text-amber-600 mb-2" />
                  <span className="text-sm text-center">Secure Payment</span>
                </div>
              </div>

              {isCustomProduct ? (
                <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-xl font-semibold text-gray-900">Create Your Custom Candle</h3>
                  <p className="text-sm text-gray-700">
                    Choose your preferences and send us your custom request. According to your choices, we will send you the price and production time.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Scent</label>
                      <select
                        value={customScent}
                        onChange={(e) => setCustomScent(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option>Lavender Dream</option>
                        <option>Vanilla Amber</option>
                        <option>Citrus Morning</option>
                        <option>Ocean Breeze</option>
                        <option>Custom Blend</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Jar Color</label>
                      <select
                        value={customJarColor}
                        onChange={(e) => setCustomJarColor(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option>Amber Jar</option>
                        <option>Matte Black Jar</option>
                        <option>Clear Glass Jar</option>
                        <option>White Ceramic Jar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">Size</label>
                      <select
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      >
                        <option>8 oz</option>
                        <option>12 oz</option>
                        <option>16 oz</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Label Text (optional)
                      </label>
                      <input
                        type="text"
                        value={customLabelText}
                        onChange={(e) => setCustomLabelText(e.target.value)}
                        placeholder="e.g. Happy Birthday Emma"
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="bg-amber-600 hover:bg-amber-700">
                      <a href={customRequestMailto}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email Custom Request
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-amber-300 bg-white">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="font-semibold">Quantity:</label>
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-6 py-2 border-x">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
