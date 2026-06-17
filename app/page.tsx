'use client';

import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {
  Flame,
  Hand,
  Sparkles,
  Truck,
  Leaf,
  Star,
  ArrowRight,
  PenLine,
} from 'lucide-react';
import { addToCart } from '@/lib/cart';
import type { WooCommerceProduct } from '@/lib/woocommerce';
import { toast } from 'sonner';
import { useState } from 'react';

/* ----------------------------- data ----------------------------- */

const heroPerks = [
  { icon: Flame, title: 'Clean Burn', description: '100% soy wax' },
  { icon: Hand, title: 'Hand Poured', description: 'In small batches' },
  { icon: Sparkles, title: 'Made to Giggle', description: 'Attitude included' },
];

const moods = [
  { image: '/giggles/moods/i_need_peace.png', label: 'I Need Peace', slug: 'calm' },
  { image: '/giggles/moods/fellin_chaotic.png', label: "I'm Feeling Chaotic", slug: 'chaotic' },
  { image: '/giggles/moods/cozy_unbothered.png', label: 'Cozy & Unbothered', slug: 'cozy' },
  { image: '/giggles/moods/im_this_close.png', label: "I'm This Close", slug: 'rage' },
  { image: '/giggles/moods/sassy_unapologetic.png', label: 'Sassy & Unapologetic', slug: 'sassy' },
  { image: '/giggles/moods/its_fine.png', label: "It's Fine. I'm Fine.", slug: 'fine' },
];

type Favorite = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
};

const favorites: Favorite[] = [
  {
    id: 9101,
    name: 'My Last Nerve',
    slug: 'my-last-nerve',
    tagline: 'Burning Calmly. Barely.',
    price: '49.00',
    image: '/products/my_last_nerve.png',
    rating: 5,
    reviews: 1248,
  },
  {
    id: 9102,
    name: 'Apology Not Accepted',
    slug: 'apology-not-accepted',
    tagline: 'Smells Like Consequences.',
    price: '49.00',
    image: '/products/apology_not_accepted.png',
    rating: 5,
    reviews: 963,
  },
  {
    id: 9103,
    name: 'Social Battery Low',
    slug: 'social-battery-low',
    tagline: 'Recharging. Do Not Make Plans.',
    price: '49.00',
    image: '/products/social_battery_low.png',
    rating: 4,
    reviews: 1105,
  },
  {
    id: 9104,
    name: 'Respectfully, No',
    slug: 'respectfully-no',
    tagline: 'Soft Tone. Solid Boundary.',
    price: '49.00',
    image: '/products/respectfully_no.png',
    rating: 5,
    reviews: 1421,
  },
  {
    id: 9105,
    name: 'Was I Petty?',
    slug: 'was-i-petty',
    tagline: 'Petty With Purpose.',
    price: '49.00',
    image: '/products/was_i_petty.png',
    rating: 5,
    reviews: 732,
  },
];

const bottomPerks = [
  {
    icon: Flame,
    title: 'Hand Poured with Attitude',
    description: 'Made in small batches for big personalities.',
  },
  {
    icon: Leaf,
    title: 'Clean Ingredients',
    description: '100% soy wax, phthalate-free fragrance, cotton wicks.',
  },
  {
    icon: Truck,
    title: 'Ships Fast',
    description: "Because your new favorite candle shouldn't keep you waiting.",
  },
];

/* --------------------------- helpers --------------------------- */

function formatPrice(value: string) {
  const amount = parseFloat(value);
  if (Number.isNaN(amount)) return value;
  return `$${amount.toFixed(2)}`;
}

function favoriteToProduct(fav: Favorite): WooCommerceProduct {
  return {
    id: fav.id,
    name: fav.name,
    slug: fav.slug,
    permalink: `/products/${fav.slug}`,
    type: 'simple',
    status: 'publish',
    featured: true,
    description: fav.tagline,
    short_description: fav.tagline,
    sku: `CG-${fav.id}`,
    price: fav.price,
    regular_price: fav.price,
    sale_price: '',
    on_sale: false,
    purchasable: true,
    total_sales: fav.reviews,
    virtual: false,
    downloadable: false,
    images: [{ id: fav.id + 100, src: fav.image, name: fav.name, alt: fav.name }],
    categories: [{ id: 101, name: 'Scented Candles', slug: 'scented-candles' }],
    tags: [],
    stock_status: 'instock',
    stock_quantity: 50,
    manage_stock: true,
  };
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < rating ? 'fill-ember text-ember' : 'fill-none text-ember/40'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Sep() {
  return (
    <span className="mx-3 text-ember/70" aria-hidden="true">
      ✦
    </span>
  );
}

/* ----------------------------- page ----------------------------- */

export default function Home() {
  const [customText, setCustomText] = useState('');

  const handleAddToCart = (fav: Favorite) => {
    addToCart(favoriteToProduct(fav), 1);
    toast.success(`${fav.name} added to cart!`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-bone font-sans text-charcoal">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-paper relative isolate overflow-hidden border-b border-charcoal/10">
          {/* Full-bleed candle photo on the right (desktop) */}
          <div className="absolute inset-y-0 right-0 hidden w-[54%] lg:block xl:w-[58%]">
            <img
              src="/giggles/hero_section.png"
              alt="The Comfort Giggles candle collection — Cozy Chaos, Main Character Meltdown, Tiny Rage Big Flame, Overthinking Hour and Do Not Disturb"
              className="h-full w-full object-cover object-[58%_50%]"
            />
            {/* Torn paper edge: cream strip with a ragged right edge tearing over the photo */}
            <svg
              className="absolute inset-y-0 -left-px h-full w-32"
              viewBox="0 0 100 1000"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="torn-edge" x="-20%" y="-5%" width="140%" height="110%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.015 0.09" numOctaves="4" seed="8" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="42" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </defs>
              <rect x="-20" y="-30" width="78" height="1060" fill="#F4EBDD" filter="url(#torn-edge)" />
            </svg>
          </div>

          <div className="container relative mx-auto px-4">
            <div className="max-w-xl py-14 md:py-20 lg:py-24">
              <h1 className="font-display text-7xl uppercase leading-[0.92] tracking-tight text-charcoal sm:text-8xl lg:text-9xl">
                Light It.
                <br />
                Laugh Anyway.
              </h1>
              <p className="mt-6 max-w-md text-base leading-7 text-charcoal/70">
                Candles with attitude for moods, moments, and mild meltdowns.
                Hand-poured, clean-burning, and never afraid to say what you're thinking.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-charcoal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                  Shop All Candles
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#shop-by-mood"
                  className="inline-flex items-center gap-2 border border-charcoal/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-charcoal transition-colors hover:border-charcoal hover:bg-charcoal hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                >
                  Shop By Mood
                </a>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                {heroPerks.map((perk) => (
                  <li key={perk.title} className="flex items-center gap-3">
                    <perk.icon className="h-6 w-6 shrink-0 text-ember-dark" strokeWidth={1.5} aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{perk.title}</p>
                      <p className="text-xs text-charcoal/60">{perk.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Candle photo below text on mobile/tablet */}
          <div className="lg:hidden">
            <img
              src="/giggles/hero_section.png"
              alt=""
              aria-hidden="true"
              className="h-64 w-full object-cover sm:h-80"
            />
          </div>
        </section>

        {/* Shop by Mood */}
        <section id="shop-by-mood" className="scroll-mt-24 bg-bone py-16 md:py-20">
          <div className="container mx-auto px-4">
            <header className="mb-10 text-center">
              <h2 className="font-display text-4xl uppercase tracking-wide text-charcoal md:text-5xl">
                <Sep />
                Shop By Mood
                <Sep />
              </h2>
              <p className="mt-3 text-sm text-charcoal/60">Whatever you're feeling, there's a flame for that.</p>
            </header>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {moods.map((mood) => (
                <li key={mood.slug}>
                  <Link
                    href={`/products?mood=${mood.slug}`}
                    className="group flex h-full flex-col items-center border border-charcoal/15 bg-cream pb-5 text-center transition-all hover:-translate-y-1 hover:border-charcoal/40 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                  >
                    <img
                      src={mood.image}
                      alt={mood.label}
                      className="aspect-square w-full object-cover"
                    />
                    <span className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ember-dark transition-colors group-hover:text-charcoal">
                      Shop Now
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured Favorites — dark */}
        <section className="bg-soot py-16 text-bone md:py-20">
          <div className="container mx-auto px-4">
            <header className="mb-12 text-center">
              <h2 className="font-display text-4xl uppercase tracking-wide text-bone md:text-5xl">
                <Sep />
                Featured Favorites
                <Sep />
              </h2>
              <p className="mt-3 text-sm text-bone/60">The ones everyone keeps relighting.</p>
            </header>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
              {favorites.map((fav) => (
                <article key={fav.id} className="group flex flex-col">
                  <Link
                    href={`/products/${fav.slug}`}
                    className="relative block aspect-square overflow-hidden bg-charcoal-dark"
                  >
                    <span className="absolute left-2 top-2 z-10 bg-ember px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-charcoal">
                      Best Seller
                    </span>
                    <img
                      src={fav.image}
                      alt={fav.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="font-display text-xl uppercase tracking-wide text-bone">
                      <Link href={`/products/${fav.slug}`} className="transition-colors hover:text-ember">
                        {fav.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-xs text-bone/55">{fav.tagline}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Stars rating={fav.rating} />
                      <span className="text-[11px] text-bone/45">({fav.reviews})</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-ember">{formatPrice(fav.price)}</p>
                    <button
                      type="button"
                      onClick={() => handleAddToCart(fav)}
                      className="mt-4 w-full border border-bone/30 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:border-ember hover:bg-ember hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
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
                className="inline-flex items-center gap-2 border border-bone/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:border-ember hover:bg-ember hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              >
                View All Candles
              </Link>
            </div>
          </div>
        </section>

        {/* Custom Candles */}
        <section className="bg-bone py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-0 overflow-hidden border border-charcoal/15 bg-cream lg:grid-cols-2">
              <div className="relative h-72 lg:h-full lg:min-h-[420px]">
                <img
                  src="/giggles/custom.png"
                  alt="A personalized Comfort Giggles candle reading 'Your Text Here'"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-6 py-12 lg:px-14">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-ember-dark">
                  <PenLine className="h-4 w-4" aria-hidden="true" />
                  Custom Candles
                </p>
                <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-tight text-charcoal md:text-6xl">
                  Make It Yours.
                  <br />
                  Say It Their Face.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-7 text-charcoal/70">
                  Add your own text, pick your scent, and we'll pour the perfect dose of
                  personality. The pettiest gift they'll actually love.
                </p>

                <label htmlFor="custom-text" className="mt-7 block text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/60">
                  Your candle text
                </label>
                <input
                  id="custom-text"
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={40}
                  placeholder="e.g. Bless This Mess"
                  className="mt-2 w-full max-w-sm border border-charcoal/25 bg-bone px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-charcoal focus:outline-none"
                />

                <div className="mt-7">
                  <Link
                    href="/products/comfort-giggle-custom-candle"
                    className="inline-flex items-center gap-2 bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-bone transition-colors hover:bg-charcoal-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                  >
                    Create Your Candle
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom perks + newsletter */}
        <section className="border-t border-charcoal/10 bg-cream py-14">
          <div className="container mx-auto px-4">
            <div className="grid gap-10 lg:grid-cols-4">
              {bottomPerks.map((perk) => (
                <div key={perk.title} className="flex items-start gap-4">
                  <perk.icon className="h-8 w-8 shrink-0 text-ember-dark" strokeWidth={1.4} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{perk.title}</p>
                    <p className="mt-1 text-xs leading-6 text-charcoal/60">{perk.description}</p>
                  </div>
                </div>
              ))}

              <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 shrink-0 text-ember-dark" strokeWidth={1.4} aria-hidden="true" />
                <div className="w-full">
                  <p className="text-sm font-semibold text-charcoal">Join the Giggle Club</p>
                  <p className="mt-1 text-xs leading-6 text-charcoal/60">
                    New drops, deals, and giggles in your inbox.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
