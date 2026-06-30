'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCart, clearCart, getCartTotal, CartItem } from '@/lib/cart';
import { ArrowLeft, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    ComfortPay?: {
      mount: (target: string | HTMLElement, options: any) => Promise<{ destroy?: () => void; refresh?: (nextAmount?: number) => Promise<any> }>;
      unmount: (target: string | HTMLElement) => void;
    };
  }
}

const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 50;
const COMFORTPAY_BASE_URL = process.env.NEXT_PUBLIC_COMFORTPAY_BASE_URL || '';
const WIDGET_ROOT_ID = 'comfortpay-widget-root';
const SDK_SCRIPT_ID = 'comfortpay-sdk-script';

function formatPrice(value: number | string) {
  const amount = typeof value === 'number' ? value : parseFloat(value);
  if (Number.isNaN(amount)) return String(value);
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const fieldClass =
  'w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone placeholder:text-bone/60 focus:border-ember focus:outline-none';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-bone/60';

function makeMerchantOrderId() {
  const now = new Date();
  const stamp = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, '0'),
    String(now.getUTCDate()).padStart(2, '0'),
    String(now.getUTCHours()).padStart(2, '0'),
    String(now.getUTCMinutes()).padStart(2, '0'),
    String(now.getUTCSeconds()).padStart(2, '0'),
  ].join('');

  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CG-${stamp}-${random}`;
}

async function ensureComfortPaySdk(baseUrl: string) {
  if (typeof window === 'undefined') return;
  if (window.ComfortPay) return;

  const existingScript = document.getElementById(SDK_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript) {
    await new Promise<void>((resolve, reject) => {
      if (window.ComfortPay) {
        resolve();
        return;
      }
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Failed to load the payment service.')), { once: true });
    });
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = SDK_SCRIPT_ID;
    script.src = `${baseUrl.replace(/\/$/, '')}/api/sdk`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load the payment service.'));
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false);
  const [widgetError, setWidgetError] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [merchantOrderId, setMerchantOrderId] = useState('');
  const widgetHandleRef = useRef<{ destroy?: () => void; refresh?: (nextAmount?: number) => Promise<any> } | null>(null);

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

  const hasSdkConfig = !!COMFORTPAY_BASE_URL;

  const lineItems = useMemo(
    () =>
      cartItems.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: Number.parseFloat(item.product.price || '0') || 0,
      })),
    [cartItems],
  );

  const validateCheckoutForm = useCallback(() => {
    const requiredFields: Array<keyof typeof formData> = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'country',
    ];

    for (const field of requiredFields) {
      if (!String(formData[field] || '').trim()) {
        throw new Error('Please complete all required billing fields before continuing.');
      }
    }

    if (!acceptedTerms) {
      throw new Error('Please accept the terms before continuing to payment.');
    }

    if (!cartItems.length) {
      throw new Error('Your cart is empty.');
    }
  }, [acceptedTerms, cartItems.length, formData]);

  const buildCheckoutData = useCallback(
    (selectedMethod?: string) => {
      validateCheckoutForm();

      const visualOrderId = merchantOrderId || makeMerchantOrderId();
      if (!merchantOrderId) {
        setMerchantOrderId(visualOrderId);
      }

      const redirectUrl = `${window.location.origin}/thank-you?order=${encodeURIComponent(visualOrderId)}&method=${encodeURIComponent(selectedMethod || 'unknown')}&amount=${encodeURIComponent(orderTotal.toFixed(2))}`;

      return {
        merchantOrderId: visualOrderId,
        visualOrderId,
        subtotal: cartTotal,
        totalAmount: orderTotal,
        shippingAmount: shippingCost,
        currency: 'USD',
        redirectUrl,
        billingDetails: {
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address1: formData.address.trim(),
          address2: '',
          city: formData.city.trim(),
          state: formData.state.trim(),
          postcode: formData.zipCode.trim(),
          country: formData.country.trim() || 'US',
        },
        items: lineItems,
      };
    },
    [cartTotal, formData, lineItems, merchantOrderId, orderTotal, shippingCost, validateCheckoutForm],
  );

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      router.push('/cart');
      return;
    }
    setCartItems(items);
    setCartTotal(getCartTotal());
    setMerchantOrderId(makeMerchantOrderId());
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    const loadSdk = async () => {
      if (!hasSdkConfig) {
        setWidgetError('Online payment is not configured yet. Add the required payment environment variables on the server and storefront.');
        return;
      }

      try {
        await ensureComfortPaySdk(COMFORTPAY_BASE_URL);
        if (!cancelled) {
          setSdkReady(true);
          setWidgetError('');
        }
      } catch (error: any) {
        if (!cancelled) {
          setWidgetError(error?.message || 'Unable to load checkout.');
        }
      }
    };

    loadSdk();

    return () => {
      cancelled = true;
    };
  }, [hasSdkConfig]);

  useEffect(() => {
    if (!sdkReady || !window.ComfortPay || !cartItems.length) {
      return;
    }

    let active = true;

    const mountWidget = async () => {
      try {
        if (widgetHandleRef.current?.destroy) {
          widgetHandleRef.current.destroy();
        } else if (window.ComfortPay) {
          window.ComfortPay.unmount(`#${WIDGET_ROOT_ID}`);
        }

        const comfortPay = window.ComfortPay;
        if (!comfortPay) {
          throw new Error('The payment service did not initialize correctly.');
        }

        const handle = await comfortPay.mount(`#${WIDGET_ROOT_ID}`, {
          configUrl: '/api/comfortpay/config',
          sessionUrl: '/api/comfortpay/session',
          baseUrl: COMFORTPAY_BASE_URL,
          amount: orderTotal,
          getCheckoutData: (selectedMethod: string) => buildCheckoutData(selectedMethod),
          onSuccess: () => {
            clearCart();
          },
          onError: (error: any) => {
            const message = error?.message || 'Unable to start checkout.';
            setWidgetError(message);
            toast.error(message);
          },
          onClose: () => {
            setLoading(false);
          },
        });

        if (!active) {
          handle?.destroy?.();
          return;
        }

        widgetHandleRef.current = handle || null;
        setWidgetError('');
      } catch (error: any) {
        const message = error?.message || 'Unable to load payment methods.';
        setWidgetError(message);
      }
    };

    mountWidget();

    return () => {
      active = false;
      if (widgetHandleRef.current?.destroy) {
        widgetHandleRef.current.destroy();
      } else if (window.ComfortPay) {
        window.ComfortPay.unmount(`#${WIDGET_ROOT_ID}`);
      }
      widgetHandleRef.current = null;
    };
  }, [sdkReady, cartItems.length, orderTotal, buildCheckoutData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (cartItems.length === 0) {
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
              <div className="space-y-6">
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

                <div className="border border-bone/15 bg-charcoal-dark p-6">
                  <h2 className="flex items-center gap-2 font-display text-2xl text-bone">
                    <Lock className="h-5 w-5 text-ember" />
                    Payment Information
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-bone/70">
                    Choose your payment method below. Hosted methods will redirect to the processor. Manual methods will open payment instructions during checkout.
                  </p>

                  <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-bone/70">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-ember"
                    />
                    <span>
                      By continuing, I agree to the{' '}
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
                      . I confirm my order and billing details are accurate.
                    </span>
                  </label>

                  {!acceptedTerms && (
                    <div className="mt-4 border border-bone/15 bg-soot px-4 py-3 text-xs leading-6 text-bone/60">
                      Accept the terms to continue with checkout.
                    </div>
                  )}

                  <div className="mt-5 rounded-2xl border border-bone/15 bg-soot/60 p-4">
                    {!sdkReady && !widgetError ? (
                      <div className="flex items-center gap-3 text-sm text-bone/70">
                        <Loader2 className="h-4 w-4 animate-spin text-ember" />
                        Loading secure payment methods...
                      </div>
                    ) : null}
                    <div id={WIDGET_ROOT_ID} />
                    {widgetError ? (
                      <div className="mt-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {widgetError}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

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
