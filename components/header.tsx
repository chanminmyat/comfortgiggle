'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X, Search, User } from 'lucide-react';
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
    <Link href="/" className={`flex flex-col items-center leading-none ${className}`}>
      <svg viewBox="0 0 24 24" className="mb-1 h-6 w-6 text-olive" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
        <path d="M12 21V9" strokeLinecap="round" />
        <path d="M12 11c0-3 2-5 5-5 0 3-2 5-5 5Z" strokeLinejoin="round" />
        <path d="M12 14c0-3-2-5-5-5 0 3 2 5 5 5Z" strokeLinejoin="round" />
      </svg>
      <span className="font-serif text-lg tracking-[0.25em] text-ink">COMFORT GIGGLES</span>
      <span className="mt-0.5 text-[10px] tracking-[0.45em] text-taupe">CANDLES</span>
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
      <div className="bg-sand text-center text-xs tracking-[0.12em] text-ink/70">
        <p className="px-4 py-2.5">✿ Free shipping on orders above $50 ✿</p>
      </div>

      <div className="border-b border-clay/60 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
        <div className="container mx-auto px-4">
          <div className="grid h-24 grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Left: desktop nav / mobile menu button */}
            <div className="flex items-center">
              <nav className="hidden items-center gap-7 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-ink/80 transition-colors hover:text-olive"
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
                    className="rounded-md px-4 py-3 text-ink/80 transition-colors hover:bg-sand hover:text-olive"
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
