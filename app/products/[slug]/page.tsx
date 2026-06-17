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

// --- Standard product variations (jar + size affect the final price) ---
const STANDARD_SIZES: { label: string; note: string; fee: number }[] = [
  { label: '8 oz', note: '~40 hr burn', fee: 0 },
  { label: '12 oz', note: '~65 hr burn', fee: 10 },
  { label: '16 oz', note: '~90 hr burn', fee: 20 },
];

const STANDARD_JARS: { label: string; fee: number }[] = [
  { label: 'Amber Glass with Black Lid', fee: 0 },
  { label: 'Clear Glass', fee: 0 },
  { label: 'Smoke Grey Glass', fee: 4 },
  { label: 'Frosted Glass with Gold Lid', fee: 6 },
  { label: 'White Ceramic', fee: 8 },
  { label: 'Ribbed Glass with Wooden Lid', fee: 8 },
];

function standardSizeFee(size: string) {
  return STANDARD_SIZES.find((s) => s.label === size)?.fee ?? 0;
}

function standardJarFee(jar: string) {
  return STANDARD_JARS.find((j) => j.label === jar)?.fee ?? 0;
}

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
    <div className="relative aspect-square w-full overflow-hidden bg-charcoal-dark">
      {/* Blank jar photo (changes with jar color) */}
      <img src={jar.src} alt="Custom candle preview" className="h-full w-full object-contain" />

      <span className="absolute left-3 top-3 z-10 bg-ember px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-charcoal">
        Live Preview
      </span>

      {/* Your custom label — applied on the jar's front */}
      <div className="absolute left-1/2 top-[57%] z-10 w-[44%] -translate-x-1/2 -translate-y-1/2 bg-[#f8f4ec] px-3 py-3.5 text-center shadow-md ring-1 ring-black/10">
        <svg viewBox="0 0 24 24" className="mx-auto mb-1 h-4 w-4 text-ember" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
          <path d="M12 21V9" strokeLinecap="round" />
          <path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5Z" strokeLinejoin="round" />
          <path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5Z" strokeLinejoin="round" />
        </svg>
        <p className="font-display text-xs leading-tight tracking-[0.14em] text-bone sm:text-sm">COMFORT GIGGLES</p>
        <p className="mt-0.5 text-[8px] tracking-[0.4em] text-bone/60">CANDLES</p>
        <div className="mx-auto my-2 h-px w-8 bg-black/40" />
        <p className="font-display text-base italic leading-tight text-bone">{scent}</p>
        {labelText.trim() && (
          <p className="mt-1 break-words text-[10px] leading-snug text-bone/60">“{labelText.trim()}”</p>
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
  const [stdSize, setStdSize] = useState(STANDARD_SIZES[0].label);
  const [stdJar, setStdJar] = useState(STANDARD_JARS[0].label);

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
    if (!product) return;
    const unit = standardUnitPrice;
    const configId = product.id * 1000 + hashConfig(`${stdSize}|${stdJar}`) % 1000;
    const configured = {
      ...product,
      id: configId,
      price: unit.toFixed(2),
      regular_price: unit.toFixed(2),
      on_sale: false,
      categories: [
        ...(product.categories ?? []),
        { id: 105, name: `${stdSize} · ${stdJar}`, slug: 'variation' },
      ],
    };
    addToCart(configured, quantity);
    toast.success(`${product.name} (${stdSize}, ${stdJar}) added to cart!`);
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
      <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-ember" />
            <p className="mt-4 text-bone/60">Loading product…</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
        <Header />
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="text-center">
            <Leaf className="mx-auto h-10 w-10 text-ember/40" strokeWidth={1.25} />
            <h1 className="mt-4 font-display text-3xl text-bone">Product not found</h1>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 border border-bone/30 px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-bone transition-colors hover:border-ember hover:bg-ember hover:text-charcoal"
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

  const standardBasePrice = parseFloat(product.price) || 0;
  const standardSizeAddOn = standardSizeFee(stdSize);
  const standardJarAddOn = standardJarFee(stdJar);
  const standardUnitPrice = standardBasePrice + standardSizeAddOn + standardJarAddOn;

  const trust = [
    { icon: Leaf, label: 'Natural Ingredients' },
    { icon: Truck, label: 'Free Shipping $50+' },
    { icon: ShieldCheck, label: 'Secure Payment' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 text-sm text-bone/60 transition-colors hover:text-ember"
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
                  <p className="mt-3 text-center text-xs text-bone/60">
                    {customJarColor} · {customSize} — preview updates as you customize
                  </p>
                </div>
              ) : (
                <>
                  <div className="relative aspect-square overflow-hidden bg-charcoal-dark">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[selectedImage]?.src || product.images[0].src}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-bone/60">
                        No image available
                      </div>
                    )}
                    {product.featured && (
                      <span className="absolute left-4 top-4 bg-ember px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-charcoal">
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
                            selectedImage === index ? 'border-ember' : 'border-bone/15 hover:border-ember/50'
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
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bone/60">
                  {product.categories.map((cat) => cat.name).join(' • ')}
                </p>
              )}
              <h1 className="mt-3 font-display text-4xl text-bone md:text-5xl">{product.name}</h1>

              <div className="mt-4 flex items-baseline gap-3">
                {isCustomProduct ? (
                  <>
                    <span className="font-display text-3xl text-bone">{formatPrice(customUnit.toFixed(2))}</span>
                    <span className="text-sm text-bone/60">configured price</span>
                  </>
                ) : (
                  <>
                    <span className="font-display text-3xl text-bone">{formatPrice(standardUnitPrice.toFixed(2))}</span>
                    <span className="text-sm text-bone/60">{stdSize} · {stdJar}</span>
                  </>
                )}
              </div>

              <div className="my-7 h-px bg-bone/15" />

              <div
                className="space-y-3 text-sm leading-7 text-bone/70 [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />

              <div className="my-7 h-px bg-bone/15" />

              {isCustomProduct ? (
                <div className="space-y-5 border border-bone/15 bg-charcoal-dark p-6">
                  <div>
                    <h2 className="font-display text-2xl text-bone">Create Your Custom Candle</h2>
                    <p className="mt-2 text-sm leading-7 text-bone/70">
                      Choose your preferences below. The price updates as you customize, then add it
                      straight to your cart.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">Scent</label>
                      <select
                        value={customScent}
                        onChange={(e) => setCustomScent(e.target.value)}
                        className="w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone focus:border-ember focus:outline-none"
                      >
                        {CUSTOM_SCENTS.map((scent) => (
                          <option key={scent}>{scent}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">Jar Color</label>
                      <select
                        value={customJarColor}
                        onChange={(e) => setCustomJarColor(e.target.value)}
                        className="w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone focus:border-ember focus:outline-none"
                      >
                        {CUSTOM_JAR_OPTIONS.map((jar) => (
                          <option key={jar}>{jar}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">Size</label>
                      <select
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        className="w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone focus:border-ember focus:outline-none"
                      >
                        <option>8 oz</option>
                        <option>12 oz</option>
                        <option>16 oz</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">Label Text (optional)</label>
                      <input
                        type="text"
                        value={customLabelText}
                        onChange={(e) => setCustomLabelText(e.target.value)}
                        placeholder="e.g. Happy Birthday Emma"
                        className="w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone placeholder:text-bone/60 focus:border-ember focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <dl className="space-y-1.5 border-t border-bone/10 pt-4 text-sm">
                    <div className="flex justify-between text-bone/70">
                      <dt>Base candle</dt>
                      <dd>{formatPrice(CUSTOM_BASE_PRICE.toFixed(2))}</dd>
                    </div>
                    <div className="flex justify-between text-bone/70">
                      <dt>Size · {customSize}</dt>
                      <dd>{customSizeAddOn ? `+ ${formatPrice(customSizeAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-bone/70">
                      <dt>Jar · {customJarColor}</dt>
                      <dd>{customJarAddOn ? `+ ${formatPrice(customJarAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-bone/70">
                      <dt>Scent · {customScent}</dt>
                      <dd>{customScentAddOn ? `+ ${formatPrice(customScentAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-bone/70">
                      <dt>Personalized label</dt>
                      <dd>{customLabelAddOn ? `+ ${formatPrice(customLabelAddOn.toFixed(2))}` : '—'}</dd>
                    </div>
                    <div className="mt-1 flex justify-between border-t border-bone/10 pt-2 font-display text-base text-bone">
                      <dt>Price each</dt>
                      <dd>{formatPrice(customUnit.toFixed(2))}</dd>
                    </div>
                  </dl>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-bone">Quantity</span>
                    <div className="flex items-center border border-bone/20 bg-charcoal-dark">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2.5 text-bone hover:bg-bone/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 border-x border-bone/20 py-2.5 text-center text-sm">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2.5 text-bone hover:bg-bone/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddCustomToCart}
                    className="inline-flex w-full items-center justify-center gap-2 bg-ember px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart — {formatPrice((customUnit * quantity).toFixed(2))}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Size */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">Size</span>
                      <span className="text-xs text-bone/40">Choose your jar size</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {STANDARD_SIZES.map((size) => {
                        const active = stdSize === size.label;
                        return (
                          <button
                            key={size.label}
                            type="button"
                            onClick={() => setStdSize(size.label)}
                            aria-pressed={active}
                            className={`flex flex-col items-center border px-2 py-3 text-center transition-colors ${
                              active
                                ? 'border-ember bg-ember/10 text-bone'
                                : 'border-bone/20 text-bone/70 hover:border-ember/50'
                            }`}
                          >
                            <span className="font-display text-lg">{size.label}</span>
                            <span className="mt-0.5 text-[10px] uppercase tracking-wide text-bone/50">{size.note}</span>
                            <span className="mt-1 text-xs text-ember">
                              {size.fee ? `+ ${formatPrice(size.fee.toFixed(2))}` : 'Base'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Jar style */}
                  <div>
                    <label htmlFor="std-jar" className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-bone/60">
                      Jar Style
                    </label>
                    <select
                      id="std-jar"
                      value={stdJar}
                      onChange={(e) => setStdJar(e.target.value)}
                      className="w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone focus:border-ember focus:outline-none"
                    >
                      {STANDARD_JARS.map((jar) => (
                        <option key={jar.label} value={jar.label}>
                          {jar.label}
                          {jar.fee ? ` (+ $${jar.fee.toFixed(2)})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price breakdown */}
                  <dl className="space-y-1.5 border-t border-bone/10 pt-4 text-sm">
                    <div className="flex justify-between text-bone/70">
                      <dt>Base candle</dt>
                      <dd>{formatPrice(standardBasePrice.toFixed(2))}</dd>
                    </div>
                    <div className="flex justify-between text-bone/70">
                      <dt>Size · {stdSize}</dt>
                      <dd>{standardSizeAddOn ? `+ ${formatPrice(standardSizeAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="flex justify-between text-bone/70">
                      <dt>Jar · {stdJar}</dt>
                      <dd>{standardJarAddOn ? `+ ${formatPrice(standardJarAddOn.toFixed(2))}` : 'Included'}</dd>
                    </div>
                    <div className="mt-1 flex justify-between border-t border-bone/10 pt-2 font-display text-base text-bone">
                      <dt>Price each</dt>
                      <dd>{formatPrice(standardUnitPrice.toFixed(2))}</dd>
                    </div>
                  </dl>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-bone">Quantity</span>
                    <div className="flex items-center border border-bone/20">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3.5 py-2.5 text-bone hover:bg-bone/10"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 border-x border-bone/20 py-2.5 text-center text-sm">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3.5 py-2.5 text-bone hover:bg-bone/10"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="inline-flex w-full items-center justify-center gap-2 bg-ember px-6 py-4 text-sm font-medium uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart — {formatPrice((standardUnitPrice * quantity).toFixed(2))}
                  </button>
                </div>
              )}

              <div className="mt-8 grid grid-cols-3 gap-3 border-t border-bone/10 pt-7">
                {trust.map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 text-center">
                    <item.icon className="h-6 w-6 text-ember" strokeWidth={1.25} />
                    <span className="text-xs text-bone/60">{item.label}</span>
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
