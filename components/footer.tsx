'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const quickLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
  { href: '/contact', label: 'FAQ', key: 'faq' },
];

const customerCare = [
  { href: '/shipping-policy', label: 'Shipping & Delivery' },
  { href: '/refund-return-policy', label: 'Returns & Exchanges' },
  { href: '/cancellation-policy', label: 'Cancellation Policy' },
  { href: '/clear-pricing-policy', label: 'Clear Pricing' },
  { href: '/freelancer-third-party-provider-policy', label: 'Supplier & Fulfillment' },
  { href: '/terms-and-conditions', label: 'Terms & Conditions' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  return (
    <footer className="bg-soot text-bone">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center" aria-label="Comfort Giggles — home">
              <img
                src="/giggles/logo.jpeg"
                alt="Comfort Giggles — Slightly Rude, Highly Fragrant"
                className="h-24 w-24 rounded-full object-cover"
              />
            </Link>
            <p className="mt-5 text-sm leading-7 text-bone/70">
              Curated candles sourced through trusted manufacturing and fulfillment partners to bring
              warmth, calm and comfort to your everyday moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wide text-bone">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.key ?? link.href}>
                  <Link href={link.href} className="text-bone/70 transition-colors hover:text-ember">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wide text-bone">Customer Care</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {customerCare.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-bone/70 transition-colors hover:text-ember">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-lg uppercase tracking-wide text-bone">Stay in the loop</h4>
            <p className="mt-5 text-sm leading-7 text-bone/70">
              Subscribe to get updates on new arrivals, offers &amp; more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5 flex items-center border border-bone/30 bg-charcoal-dark">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent px-4 py-3 text-sm text-bone placeholder:text-bone/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-12 shrink-0 items-center justify-center text-bone transition-colors hover:text-ember"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-bone/15 pt-6 text-center text-xs text-bone/50">
          <p>© {currentYear} Comfort Giggles Candles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
