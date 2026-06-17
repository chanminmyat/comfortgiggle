'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X, Search, User, Sparkles, Truck, Leaf } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCartItemCount } from '@/lib/cart';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
];

function BrandMark({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`relative z-10 flex items-center ${className}`} aria-label="Comfort Giggles — home">
      <img
        src="/giggles/logo.jpeg"
        alt="Comfort Giggles — Slightly Rude, Highly Fragrant"
        className="h-24 w-24 translate-y-3 rounded-full object-cover mix-blend-multiply md:h-32 md:w-32 md:translate-y-6"
      />
    </Link>
  );
}

export function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCartCount(getCartItemCount());
    const handleCartUpdate = () => setCartCount(getCartItemCount());
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="bg-charcoal text-xs font-semibold uppercase tracking-[0.16em] text-bone">
        <div className="container mx-auto grid gap-2 px-4 py-2.5 text-center md:grid-cols-3 md:items-center">
          <p className="flex items-center justify-center gap-2 md:justify-start">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Slightly Rude. Highly Fragrant.
          </p>
          <p className="flex items-center justify-center gap-2">
            <Truck className="h-3.5 w-3.5" aria-hidden="true" />
            Free shipping on orders above $50
          </p>
          <p className="flex items-center justify-center gap-2 md:justify-end">
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            100% soy wax
          </p>
        </div>
      </div>

      <div className="border-b-2 border-charcoal bg-paper">
        <div className="container mx-auto px-4">
          <div className="grid h-20 grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Left: desktop nav / mobile menu button */}
            <div className="flex items-center">
              <nav className="hidden items-center gap-7 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-olive"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-ink hover:bg-sand md:hidden"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Center: brand */}
            <BrandMark className="justify-self-center text-center" />

            {/* Right: utilities */}
            <div className="flex items-center justify-end gap-2 sm:gap-4">
              <Link
                href="/products"
                aria-label="Search products"
                className="hidden rounded-full p-2 text-ink/80 transition-colors hover:bg-sand hover:text-olive sm:inline-flex"
              >
                <Search className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                aria-label="Account"
                className="hidden rounded-full p-2 text-ink/80 transition-colors hover:bg-sand hover:text-olive sm:inline-flex"
              >
                <User className="h-5 w-5" />
              </Link>
              <Link
                href="/cart"
                aria-label={`Cart, ${cartCount} item${cartCount === 1 ? '' : 's'}`}
                className="relative inline-flex items-center justify-center rounded-full p-2 text-ink/80 transition-colors hover:bg-sand hover:text-olive"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-olive text-[11px] font-medium text-white">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile nav */}
          {mobileMenuOpen && (
            <div className="border-t border-clay/60 py-4 md:hidden">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-md px-4 py-3 font-semibold uppercase tracking-wide text-ink transition-colors hover:bg-sand hover:text-olive"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
