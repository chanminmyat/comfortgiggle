'use client';

import Link from 'next/link';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';
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

function PinterestIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.5 2 3.5 5.72 3.5 9.43c0 1.72.92 3.86 2.39 4.54.22.1.34.06.39-.16l.32-1.32c.03-.12.02-.22-.08-.34-.5-.6-.9-1.7-.9-2.73 0-2.64 2-5.2 5.4-5.2 2.94 0 5 2 5 4.87 0 3.23-1.63 5.47-3.76 5.47-1.17 0-2.05-.97-1.77-2.17.34-1.42 1-2.96 1-3.99 0-.92-.49-1.69-1.51-1.69-1.2 0-2.16 1.24-2.16 2.9 0 1.06.36 1.77.36 1.77s-1.2 5.08-1.42 6c-.42 1.78-.06 3.96-.03 4.18.02.13.18.16.26.06.1-.14 1.45-1.8 1.9-3.46.13-.47.74-2.9.74-2.9.37.7 1.43 1.31 2.56 1.31 3.37 0 5.66-3.07 5.66-7.18C20.5 5.07 17.5 2 12.04 2Z" />
    </svg>
  );
}

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
            <div className="mt-5 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="rounded-full bg-cream p-2 text-ink/70 transition-colors hover:text-olive">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Facebook" className="rounded-full bg-cream p-2 text-ink/70 transition-colors hover:text-olive">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Pinterest" className="rounded-full bg-cream p-2 text-ink/70 transition-colors hover:text-olive">
                <PinterestIcon className="h-4 w-4" />
              </a>
            </div>
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
