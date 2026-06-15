'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { fetchProductBySlug, WooCommerceProduct } from '@/lib/woocommerce';
import { SAMPLE_PRODUCTS } from '@/lib/sample-products';
import { addToCart } from '@/lib/cart';
import { ShoppingBag, ArrowLeft, Leaf, Truck, ShieldCheck, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

function formatPrice(value: string) {
  const amount = parseFloat(value);
  if (Number.isNaN(amount)) return value;
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Scent choices for the custom candle, derived from the catalog so they stay in sync.
const CUSTOM_SCENTS = [
  ...SAMPLE_PRODUCTS.filter((p) => p.slug !== 'comfort-giggle-custom-candle').map((p) => p.name),
  'Custom Blend',
];

// Each jar option maps to a blank (label-free) jar photo.
const CUSTOM_JARS: Record<string, { src: string }> = {
  'Amber Glass Jar with Black Lid': { src: '/products/jar-amber.png' },
  'Clear Glass Jar': { src: '/products/jar-clear.png' },
  'White Ceramic Jar': { src: '/products/jar-white-ceramic.png' },
  'Frosted Glass Jar with Gold Lid': { src: '/products/jar-frosted-gold.png' },
  'Smoke Grey Glass Jar with Black Lid': { src: '/products/jar-smoke-grey.png' },
  'Ribbed Glass Jar with Wooden Lid': { src: '/products/jar-ribbed-wood.png' },
};

const CUSTOM_JAR_OPTIONS = Object.keys(CUSTOM_JARS);

// --- Custom candle pricing (compounding add-ons) ---
const CUSTOM_BASE_PRICE = 22;

const CUSTOM_SIZE_FEES: Record<string, number> = {
  '8 oz': 0,
  '12 oz': 6,
  '16 oz': 12,
};

const CUSTOM_JAR_FEES: Record<string, number> = {
  'Clear Glass Jar': 0,
  'Amber Glass Jar with Black Lid': 2,
  'Smoke Grey Glass Jar with Black Lid': 3,
  'Frosted Glass Jar with Gold Lid': 4,
  'White Ceramic Jar': 5,
  'Ribbed Glass Jar with Wooden Lid': 5,
};

const CUSTOM_LABEL_FEE = 3;

function customScentFee(scent: string) {
  if (scent === 'Custom Blend') return 5;
  const match = SAMPLE_PRODUCTS.find((p) => p.name === scent);
  const price = match ? parseFloat(match.price) : 18;
  return Math.max(0, Math.round(price - 18)); // catalog scents range $18–$24 → $0–$6
}

function customUnitPrice(scent: string, jar: string, size: string, label: string) {
  return (
    CUSTOM_BASE_PRICE +
    (CUSTOM_SIZE_FEES[size] ?? 0) +
    (CUSTOM_JAR_FEES[jar] ?? 0) +
    customScentFee(scent) +
    (label.trim() ? CUSTOM_LABEL_FEE : 0)
  );
}

function hashConfig(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function CandlePreview({
  jarColor,
  scent,
  labelText,
}: {
  jarColor: string;
  scent: string;
  labelText: string;
}) {
  const jar = CUSTOM_JARS[jarColor] ?? CUSTOM_JARS['Amber Glass Jar with Black Lid'];

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-white">
      {/* Blank jar photo (changes with jar color) */}
      <img src={jar.src} alt="Custom candle preview" className="h-full w-full object-contain" />

      <span className="absolute left-3 top-3 z-10 bg-olive px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
        Live Preview
      </span>

      {/* Your custom label — applied on the jar's front */}
      <div className="absolute left-1/2 top-[57%] z-10 w-[44%] -translate-x-1/2 -translate-y-1/2 bg-[#f8f4ec] px-3 py-3.5 text-center shadow-md ring-1 ring-black/10">
        <svg viewBox="0 0 24 24" className="mx-auto mb-1 h-4 w-4 text-olive" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
          <path d="M12 21V9" strokeLinecap="round" />
          <path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5Z" strokeLinejoin="round" />
          <path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5Z" strokeLinejoin="round" />
        </svg>
        <p className="font-serif text-xs leading-tight tracking-[0.14em] text-ink sm:text-sm">COMFORT GIGGLES</p>
        <p className="mt-0.5 text-[8px] tracking-[0.4em] text-taupe">CANDLES</p>
        <div className="mx-auto my-2 h-px w-8 bg-ink/20" />
        <p className="font-serif text-base italic leading-tight text-ink">{scent}</p>
        {labelText.trim() && (
          <p className="mt-1 break-words text-[10px] leading-snug text-taupe">“{labelText.trim()}”</p>
        )}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<WooCommerceProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customScent, setCustomScent] = useState('Lavender Dream');
  const [customJarColor, setCustomJarColor] = useState('Amber Glass Jar with Black Lid');
  const [customSize, setCustomSize] = useState('8 oz');
  const [customLabelText, setCustomLabelText] = useState('');

  useEffect(() => {
    if (!slug) return;
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const fetched = await fetchProductBySlug(slug);
        const fallback = SAMPLE_PRODUCTS.find((p) => p.slug === slug) ?? null;
        if (active) setProduct(fetched ?? fallback);
      } catch {
        if (active) setProduct(SAMPLE_PRODUCTS.find((p) => p.slug === slug) ?? null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddCustomToCart = () => {
    if (!product) return;
    const unit = customUnitPrice(customScent, customJarColor, customSize, customLabelText);
    const jar = CUSTOM_JARS[customJarColor] ?? CUSTOM_JARS['Amber Glass Jar with Black Lid'];
    const label = customLabelText.trim();
    const configId =
      990000 +
      (hashConfig(`${customScent}|${customJarColor}|${customSize}|${label}`) % 100000);

    const configured = {
      ...product,
      id: configId,
      name: label ? `Custom Candle — ${customScent} (“${label}”)` : `Custom Candle — ${customScent}`,
      price: unit.toFixed(2),
      regular_price: unit.toFixed(2),
      short_description: `${customJarColor}, ${customSize}`,
      images: [{ id: configId, src: jar.src, name: 'Custom Candle', alt: 'Custom candle' }],
      categories: [
        { id: 104, name: `${customSize} · ${customJarColor}`, slug: 'custom-candles' },
      ],
    };

    addToCart(configured, quantity);
    toast.success('Custom candle added to cart!');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-olive" />
            <p className="mt-4 text-taupe">Loading product…</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
        <Header />
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <Leaf className="mx-auto h-10 w-10 text-olive/40" strokeWidth={1.25} />
            <h1 className="mt-4 font-serif text-3xl text-ink">Product not found</h1>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 border border-ink/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const isCustomProduct =
    product.slug === 'comfort-giggle-custom-candle' ||
    product.tags?.some((tag) => tag.slug === 'custom');

  const customUnit = customUnitPrice(customScent, customJarColor, customSize, customLabelText);
  const customScentAddOn = customScentFee(customScent);
  const customJarAddOn = CUSTOM_JAR_FEES[customJarColor] ?? 0;
  const customSizeAddOn = CUSTOM_SIZE_FEES[customSize] ?? 0;
  const customLabelAddOn = customLabelText.trim() ? CUSTOM_LABEL_FEE : 0;

  const trust = [
    { icon: Leaf, label: 'Natural Ingredients' },
    { icon: Truck, label: 'Free Shipping $50+' },
    { icon: ShieldCheck, label: 'Secure Payment' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 text-sm text-taupe transition-colors hover:text-olive"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Gallery / live preview */}
            <div>
              {isCustomProduct ? (
                <div className="lg:sticky lg:top-32">
                  <CandlePreview
                    jarColor={customJarColor}
                    scent={customScent}
                    labelText={customLabelText}
                  />
                  <p className="mt-3 text-center text-xs text-taupe">
                    {customJarColor} · {customSize} — preview updates as you customize
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative aspect-square overflow-hidden bg-sand">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[selectedImage]?.src || product.images[0].src}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-taupe">
                        No image available
                      </div>
                    )}
                    {product.featured && (
                      <span className="absolute left-4 top-4 bg-olive px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                        Featured
                      </span>
                    )}
                  </div>

                  {product.images && product.images.length > 1 && (
                    <div className="mt-4 grid grid-cols-4 gap-3">
                      {product.images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setSelectedImage(index)}
                          className={`aspect-square overflow-hidden border transition-colors ${
                            selectedImage === index ? 'border-olive' : 'border-clay hover:border-olive/50'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img src={image.src} alt={image.alt || product.name} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Details */}
            <div>
              {product.categories && product.categories.length > 0 && (
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-taupe">
                  {product.categories.map((cat) => cat.name).join(' • ')}
                </p>
              )}
              <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{product.name}</h1>

              <div className="mt-4 flex items-baseline gap-3">
                {isCustomProduct ? (
                  <>
                    <span className="font-serif text-3xl text-ink">{formatPrice(customUnit.toFixed(2))}</span>
                    <span className="text-sm text-taupe">configured price</span>
                  </>
                ) : product.on_sale && product.regular_price ? (
                  <>
                    <span className="font-serif text-3xl text-olive">{formatPrice(product.price)}</span>
                    <span className="text-lg text-taupe line-through">{formatPrice(product.regular_price)}</span>
                  </>
                ) : (
                  <span className="font-serif text-3xl text-ink">{formatPrice(product.price)}</span>
                )}
              </div>

              <div className="my-7 h-px bg-clay/70" />

              <div
                className="space-y-3 text-sm leading-7 text-ink/70 [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className="my-7 h-px bg-clay/70" />

              {isCustomProduct ? (
                <div className="space-y-5 border border-clay bg-sand/50 p-6">
                  <div>
                    <h2 className="font-serif text-2xl text-ink">Create Your Custom Candle</h2>
                    <p className="mt-2 text-sm leading-7 text-ink/70">
                      Choose your preferences below. The price updates as you customize, then add it
                      straight to your cart.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Scent</label>
                      <select
                        value={customScent}
                        onChange={(e) => setCustomScent(e.target.value)}
                        className="w-full border border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink focus:border-olive focus:outline-none"
                      >
                        {CUSTOM_SCENTS.map((scent) => (
                          <option key={scent}>{scent}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Jar Color</label>
                      <select
                        value={customJarColor}
                        onChange={(e) => setCustomJarColor(e.target.value)}
                        className="w-full border border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink focus:border-olive focus:outline-none"
                      >
                        {CUSTOM_JAR_OPTIONS.map((jar) => (
                          <option key={jar}>{jar}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Size</label>
                      <select
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="w-full border border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink focus:border-olive focus:outline-none"
                      >
                        <option>8 oz</option>
                        <option>12 oz</option>
                        <option>16 oz</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-taupe">Label Text (optional)</label>
                      <input
                        type="text"
                        value={customLabelText}
                        onChange={(e) => setCustomLabelText(e.target.value)}
                        placeholder="e.g. Happy Birthday Emma"
                        className="w-full border border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-taupe focus:border-olive focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <dl className="space-y-1.5 border-t border-clay/70 pt-4 text-sm">
                    <div className="flex justify-between text-ink/70">
                      <dt>Base candle</dt>
                      <dd>{formatPrice(CUSTOM_BASE_PRICE.toFixed(2))}</dd>
                    </div>
                    <div className="flex justify-between text-ink/70">
                      <dt>Size · {customSize}</dt>
                      <dd>{customSizeAddOn ? `+ ${formatPrice(customSizeAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-ink/70">
                      <dt>Jar · {customJarColor}</dt>
                      <dd>{customJarAddOn ? `+ ${formatPrice(customJarAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-ink/70">
                      <dt>Scent · {customScent}</dt>
                      <dd>{customScentAddOn ? `+ ${formatPrice(customScentAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-ink/70">
                      <dt>Personalized label</dt>
                      <dd>{customLabelAddOn ? `+ ${formatPrice(customLabelAddOn.toFixed(2))}` : '—'}</dd>
                    </div>
                    <div className="mt-1 flex justify-between border-t border-clay/70 pt-2 font-serif text-base text-ink">
                      <dt>Price each</dt>
                      <dd>{formatPrice(customUnit.toFixed(2))}</dd>
                    </div>
                  </dl>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-ink">Quantity</span>
                    <div className="flex items-center border border-ink/20 bg-cream">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2.5 text-ink hover:bg-sand"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 border-x border-ink/20 py-2.5 text-center text-sm">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2.5 text-ink hover:bg-sand"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddCustomToCart}
                    className="inline-flex w-full items-center justify-center gap-2 bg-olive px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart — {formatPrice((customUnit * quantity).toFixed(2))}
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-ink">Quantity</span>
                    <div className="flex items-center border border-ink/20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2.5 text-ink hover:bg-sand"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 border-x border-ink/20 py-2.5 text-center text-sm">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2.5 text-ink hover:bg-sand"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex w-full items-center justify-center gap-2 bg-olive px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart — {formatPrice((parseFloat(product.price) * quantity).toFixed(2))}
                  </button>
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-clay/70 pt-7">
                {trust.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <item.icon className="h-6 w-6 text-olive" strokeWidth={1.25} />
                    <span className="text-xs text-taupe">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
