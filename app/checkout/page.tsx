'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCart, clearCart, getCartTotal, CartItem } from '@/lib/cart';
import { ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 50;
const zelleRecipient = 'chris@comfortgiggles.com';

function formatPrice(value: number | string) {
  const amount = typeof value === 'number' ? value : parseFloat(value);
  if (Number.isNaN(amount)) return String(value);
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const fieldClass =
  'w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone placeholder:text-bone/60 focus:border-ember focus:outline-none';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-bone/60';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const qualifiesForFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = qualifiesForFreeShipping ? 0 : SHIPPING_FEE;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const orderTotal = cartTotal + shippingCost;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      router.push('/cart');
    }
    setCartItems(items);
    setCartTotal(getCartTotal());
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      clearCart();
      setOrderComplete(true);
      toast.success('Request submitted! We will reach out to confirm next steps.');
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderComplete) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
      <Header />

      <main className="flex-1 py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-2 text-sm text-bone/60 transition-colors hover:text-ember"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <h1 className="mb-8 font-display text-4xl text-bone md:text-5xl">Checkout</h1>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {orderComplete ? (
                <div className="border border-bone/15 bg-charcoal-dark p-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-7 w-7 text-ember" />
                    <h2 className="font-display text-2xl text-bone">Request Received</h2>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-bone/70">
                    Thanks for your order request. Please complete payment via Zelle using the
                    details below.
                  </p>
                  <dl className="mt-5 space-y-1.5 border border-bone/15 bg-charcoal-dark p-5 text-sm text-bone/80">
                    <div className="flex gap-2">
                      <dt className="font-semibold text-bone">Payment Method:</dt>
                      <dd>Zelle</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-bone">Transfer To:</dt>
                      <dd>{zelleRecipient}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="font-semibold text-bone">Amount:</dt>
                      <dd>{formatPrice(orderTotal)}</dd>
                    </div>
                    <p className="pt-2 text-xs leading-6 text-bone/60">
                      Please include your full name in the transfer note so we can match your payment
                      quickly.
                    </p>
                  </dl>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center justify-center bg-ember px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone"
                  >
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Billing */}
                  <div className="border border-bone/15 bg-charcoal-dark p-6">
                    <h2 className="font-display text-2xl text-bone">Billing Information</h2>
                    <div className="mt-5 space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <label htmlFor="firstName" className={labelClass}>First Name *</label>
                          <input id="firstName" name="firstName" required value={formData.firstName} onChange={handleInputChange} className={fieldClass} />
                        </div>
                        <div>
                          <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                          <input id="lastName" name="lastName" required value={formData.lastName} onChange={handleInputChange} className={fieldClass} />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className={labelClass}>Email *</label>
                        <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelClass}>Phone *</label>
                        <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className={fieldClass} />
                      </div>
                      <div>
                        <label htmlFor="address" className={labelClass}>Address *</label>
                        <input id="address" name="address" required value={formData.address} onChange={handleInputChange} className={fieldClass} />
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                          <label htmlFor="city" className={labelClass}>City *</label>
                          <input id="city" name="city" required value={formData.city} onChange={handleInputChange} className={fieldClass} />
                        </div>
                        <div>
                          <label htmlFor="state" className={labelClass}>State *</label>
                          <input id="state" name="state" required value={formData.state} onChange={handleInputChange} className={fieldClass} />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className={labelClass}>ZIP Code *</label>
                          <input id="zipCode" name="zipCode" required value={formData.zipCode} onChange={handleInputChange} className={fieldClass} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="border border-bone/15 bg-charcoal-dark p-6">
                    <h2 className="flex items-center gap-2 font-display text-2xl text-bone">
                      <Lock className="h-5 w-5 text-ember" />
                      Payment Information
                    </h2>
                    <div className="mt-5 border border-bone/15 bg-charcoal-dark p-5 text-sm leading-7 text-bone/80">
                      <p>
                        <span className="font-semibold text-bone">Payment Method:</span> Zelle
                      </p>
                      <p className="mt-1">
                        Please transfer <span className="font-semibold text-bone">{formatPrice(orderTotal)}</span> to{' '}
                        <span className="font-semibold text-bone">{zelleRecipient}</span> after submitting this order request.
                      </p>
                      <p className="mt-1 text-xs text-bone/60">Add your full name in the transfer note.</p>
                    </div>

                    <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-bone/70">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 shrink-0 accent-ember"
                      />
                      <span>
                        By completing this purchase, I confirm that I have read and agree to the{' '}
                        <Link href="/terms-and-conditions" className="font-medium text-ember underline underline-offset-2 hover:text-ember-dark">
                          Terms &amp; Conditions
                        </Link>
                        ,{' '}
                        <Link href="/privacy-policy" className="font-medium text-ember underline underline-offset-2 hover:text-ember-dark">
                          Privacy Policy
                        </Link>
                        ,{' '}
                        <Link href="/refund-policy" className="font-medium text-ember underline underline-offset-2 hover:text-ember-dark">
                          Refund Policy
                        </Link>
                        , and{' '}
                        <Link href="/shipping-policy" className="font-medium text-ember underline underline-offset-2 hover:text-ember-dark">
                          Shipping Policy
                        </Link>
                        . I authorize this payment and acknowledge that all order details and personal
                        information provided are accurate.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={loading || !acceptedTerms}
                      className="mt-5 w-full bg-ember px-6 py-4 text-xs font-medium uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? 'Submitting…' : 'Submit Order Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-32 border border-bone/15 bg-charcoal-dark p-6">
                <h2 className="font-display text-2xl text-bone">Order Summary</h2>

                <ul className="mt-5 space-y-4 text-sm">
                  {cartItems.map((item) => {
                    const variation = item.product.categories?.find((c) => c.slug === 'variation' || c.slug === 'custom-candles')?.name;
                    const image = item.product.images?.[0]?.src;
                    return (
                      <li key={item.product.id} className="flex items-start gap-3">
                        <div className="relative h-16 w-16 flex-none overflow-hidden border border-bone/15 bg-soot">
                          {image ? (
                            <img src={image} alt={item.product.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[10px] text-bone/40">No image</div>
                          )}
                          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[10px] font-bold text-charcoal">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium leading-snug text-bone">{item.product.name}</p>
                          {variation && <p className="mt-0.5 text-xs text-bone/60">{variation}</p>}
                        </div>
                        <p className="flex-none font-medium text-bone">
                          {formatPrice(parseFloat(item.product.price) * item.quantity)}
                        </p>
                      </li>
                    );
                  })}
                </ul>

                <div className="my-4 h-px bg-bone/15" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-bone/70">
                    <span>Subtotal</span>
                    <span className="font-medium text-bone">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-bone/70">
                    <span>Shipping</span>
                    {qualifiesForFreeShipping ? (
                      <span className="font-medium text-ember">FREE</span>
                    ) : (
                      <span className="font-medium text-bone">{formatPrice(shippingCost)}</span>
                    )}
                  </div>
                </div>

                {qualifiesForFreeShipping ? (
                  <p className="mt-3 border border-ember/30 bg-ember/10 px-3 py-2 text-xs leading-5 text-ember">
                    You&apos;ve unlocked free delivery on this order.
                  </p>
                ) : (
                  <p className="mt-3 border border-bone/15 px-3 py-2 text-xs leading-5 text-bone/70">
                    Add <span className="font-semibold text-bone">{formatPrice(amountToFreeShipping)}</span> more to qualify for free delivery.
                  </p>
                )}

                <div className="my-4 h-px bg-bone/15" />

                <div className="flex justify-between text-lg">
                  <span className="font-display text-bone">Total</span>
                  <span className="font-display text-bone">{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
