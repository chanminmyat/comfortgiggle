'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCart, removeFromCart, updateCartItemQuantity, getCartTotal, CartItem } from '@/lib/cart';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';

const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 50;

function formatPrice(value: number | string) {
  const amount = typeof value === 'number' ? value : parseFloat(value);
  if (Number.isNaN(amount)) return String(value);
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    loadCart();
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    setCartItems(getCart());
    setCartTotal(getCartTotal());
  };

  const handleRemoveItem = (productId: number) => removeFromCart(productId);
  const handleUpdateQuantity = (productId: number, newQuantity: number) =>
    updateCartItemQuantity(productId, newQuantity);

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
        <Header />
        <main className="flex flex-1 items-center justify-center py-24">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-6 h-16 w-16 text-ember/40" strokeWidth={1} />
            <h1 className="font-display text-3xl text-bone md:text-4xl">Your cart is empty</h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-bone/60">
              Looks like you haven&apos;t added any candles to your cart yet.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex items-center gap-2 bg-ember px-8 py-4 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            Continue Shopping
          </Link>

          <h1 className="mb-8 font-display text-4xl text-bone md:text-5xl">Shopping Cart</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="border border-bone/15 bg-charcoal-dark">
                <ul>
                  {cartItems.map((item, index) => (
                    <li
                      key={item.product.id}
                      className={`flex gap-5 p-5 sm:gap-6 sm:p-6 ${index > 0 ? 'border-t border-bone/10' : ''}`}
                    >
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="relative h-28 w-28 flex-shrink-0 overflow-hidden bg-charcoal-dark sm:h-32 sm:w-32"
                      >
                        {item.product.images?.[0] ? (
                          <img
                            src={item.product.images[0].src}
                            alt={item.product.images[0].alt || item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-bone/60">
                            No image
                          </div>
                        )}
                      </Link>

                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <div>
                            <h2 className="font-display text-lg text-bone">
                              <Link
                                href={`/products/${item.product.slug}`}
                                className="transition-colors hover:text-ember"
                              >
                                {item.product.name}
                              </Link>
                            </h2>
                            {item.product.categories?.[0] && (
                              <p className="mt-1 text-xs text-bone/60">{item.product.categories[0].name}</p>
                            )}
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product.id)}
                            className="h-fit text-bone/60 transition-colors hover:text-red-600"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center border border-bone/20">
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-2 text-bone hover:bg-bone/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="min-w-[3rem] border-x border-bone/20 px-3 py-2 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 text-bone hover:bg-bone/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-display text-xl text-bone">
                              {formatPrice(parseFloat(item.product.price) * item.quantity)}
                            </p>
                            <p className="text-xs text-bone/60">{formatPrice(item.product.price)} each</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-32 border border-bone/15 bg-charcoal-dark p-6">
                <h2 className="font-display text-2xl text-bone">Order Summary</h2>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between text-bone/70">
                    <span>Subtotal</span>
                    <span className="font-medium text-bone">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-bone/70">
                    <span>Shipping</span>
                    {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="font-medium text-ember">FREE</span>
                    ) : (
                      <span className="font-medium text-bone">{formatPrice(SHIPPING_FEE)}</span>
                    )}
                  </div>
                  <div className="my-2 h-px bg-bone/15" />
                  <div className="flex justify-between text-lg">
                    <span className="font-display text-bone">Total</span>
                    <span className="font-display text-bone">
                      {formatPrice(cartTotal + (cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE))}
                    </span>
                  </div>
                </div>

                {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                  <p className="mt-3 border border-ember/30 bg-ember/10 px-3 py-2 text-xs leading-5 text-ember">
                    You&apos;ve unlocked free delivery on this order.
                  </p>
                ) : (
                  <p className="mt-3 border border-bone/15 px-3 py-2 text-xs leading-5 text-bone/70">
                    Add <span className="font-semibold text-bone">{formatPrice(FREE_SHIPPING_THRESHOLD - cartTotal)}</span> more to qualify for free delivery.
                  </p>
                )}

                <Link
                  href="/checkout"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-ember px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-4 text-center text-xs leading-6 text-bone/60">
                  No online payment required. Submit your request and we will follow up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
