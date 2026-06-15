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
    <footer className="bg-clay/70 text-ink">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-olive" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
                <path d="M12 21V9" strokeLinecap="round" />
                <path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5Z" strokeLinejoin="round" />
                <path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5Z" strokeLinejoin="round" />
              </svg>
              <span className="font-serif text-base tracking-[0.22em]">COMFORT GIGGLES</span>
            </div>
            <p className="mt-5 text-sm leading-7 text-ink/70">
              Handcrafted candles made with natural ingredients to bring warmth, calm and comfort
              to your everyday moments.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base text-ink">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.key ?? link.href}>
                  <Link href={link.href} className="text-ink/70 transition-colors hover:text-olive">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-base text-ink">Customer Care</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {customerCare.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-ink/70 transition-colors hover:text-olive">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-base text-ink">Stay in the loop</h4>
            <p className="mt-5 text-sm leading-7 text-ink/70">
              Subscribe to get updates on new arrivals, offers &amp; more.
            </p>
            <form onSubmit={handleSubscribe} className="mt-5 flex items-center border border-ink/20 bg-cream">
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
                className="w-full bg-transparent px-4 py-3 text-sm text-ink placeholder:text-taupe focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-11 w-12 shrink-0 items-center justify-center text-ink transition-colors hover:text-olive"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-ink/10 pt-6 text-center text-xs text-taupe">
          <p>© {currentYear} Comfort Giggles Candles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
