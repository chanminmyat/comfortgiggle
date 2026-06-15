'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Leaf, Heart, Sprout, Gift, ArrowRight, Quote } from 'lucide-react';
import { fetchProducts, WooCommerceProduct } from '@/lib/woocommerce';
import { SAMPLE_PRODUCTS } from '@/lib/sample-products';
import { addToCart } from '@/lib/cart';
import { toast } from 'sonner';

const features = [
  { icon: Leaf, title: 'Natural Ingredients', description: 'Clean, non-toxic & safe' },
  { icon: Heart, title: 'Handcrafted with Love', description: 'Made in small batches' },
  { icon: Sprout, title: 'Eco Friendly', description: 'Sustainable & kind to Earth' },
  { icon: Gift, title: 'Thoughtful Packaging', description: 'Perfect for gifting' },
];

const testimonials = [
  {
    quote:
      'The candles are beautiful and smell amazing! They instantly make my space feel peaceful.',
    name: 'Ananya R.',
  },
  {
    quote:
      'I love how natural and clean the ingredients are. You can truly feel the difference.',
    name: 'Priya S.',
  },
  {
    quote: 'Perfect packaging and such lovely scents. Great for gifting!',
    name: 'Mehak T.',
  },
];

function formatPrice(value: string) {
  const amount = parseFloat(value);
  if (Number.isNaN(amount)) return value;
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function Ornament() {
  return (
    <div className="mx-auto mt-3 flex items-center justify-center gap-1 text-taupe/60" aria-hidden="true">
      <span className="text-sm tracking-[0.3em]">⟨⟨⟨</span>
    </div>
  );
}

export default function Home() {
  const [bestsellers, setBestsellers] = useState<WooCommerceProduct[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const { products } = await fetchProducts({ per_page: 4, featured: true });
        const list = products.length ? products : (await fetchProducts({ per_page: 4 })).products;
        if (active) setBestsellers(list.length ? list : SAMPLE_PRODUCTS.slice(0, 4));
      } catch {
        if (active) setBestsellers(SAMPLE_PRODUCTS.slice(0, 4));
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const products = bestsellers.length ? bestsellers : SAMPLE_PRODUCTS.slice(0, 4);

  const handleAddToCart = (product: WooCommerceProduct) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/hero-candle.png"
              alt="Handcrafted Comfort Giggles candle on a tray with dried flowers"
              className="h-full w-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/90 from-5% via-cream/40 via-40% to-transparent to-65%" />
          </div>

          <div className="container relative mx-auto px-4">
            <div className="max-w-xl py-24 md:py-32 lg:py-40">
              <h1 className="font-serif text-5xl leading-[1.05] text-ink md:text-6xl">
                Handcrafted candles for peaceful moments
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-ink/70">
                Made with natural ingredients and thoughtfully crafted to bring warmth,
                calm and comfort to your space.
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 bg-olive px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive-dark"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Feature strip */}
        <section className="border-b border-clay/60 bg-cream">
          <div className="container mx-auto px-4">
            <ul className="grid grid-cols-1 divide-y divide-clay/60 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
              {features.map((feature) => (
                <li key={feature.title} className="flex items-center gap-4 px-2 py-6 lg:justify-center">
                  <feature.icon className="h-7 w-7 shrink-0 text-olive" strokeWidth={1.25} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-ink">{feature.title}</p>
                    <p className="text-xs text-taupe">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h2 className="font-serif text-3xl text-ink md:text-4xl">Our Bestsellers</h2>
              <Ornament />
            </header>

            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => (
                <article key={product.id} className="group flex flex-col">
                  <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-sand">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt || product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-taupe">No image</div>
                    )}
                  </Link>
                  <div className="mt-4 flex flex-1 flex-col text-center">
                    <h3 className="font-serif text-lg text-ink">
                      <Link href={`/products/${product.slug}`} className="transition-colors hover:text-olive">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-taupe">{formatPrice(product.price)}</p>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="mt-4 w-full border border-ink/30 px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 border border-ink/30 px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-sand">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-0 lg:grid-cols-2">
              <div className="relative h-72 lg:h-[420px]">
                <img
                  src="/our-story.png"
                  alt="A hand lighting a Comfort Giggles candle"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-2 py-12 lg:px-14">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-taupe">Our Story</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">
                  Crafted with love,
                  <br />
                  inspired by nature
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-ink/70">
                  At Comfort Giggles, every candle is handcrafted in small batches using natural
                  ingredients and clean fragrances. We believe in slowing down, cherishing little
                  moments, and creating a space that feels like home.
                </p>
                <Link
                  href="/about"
                  className="mt-7 inline-flex items-center gap-2 border border-ink/30 px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:border-olive hover:bg-olive hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-olive"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h2 className="font-serif text-3xl text-ink md:text-4xl">What Our Customers Say</h2>
              <Ornament />
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="bg-sand/70 p-8">
                  <Quote className="h-7 w-7 text-olive/50" aria-hidden="true" />
                  <blockquote className="mt-4 text-sm leading-7 text-ink/80">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-medium text-ink">— {testimonial.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
