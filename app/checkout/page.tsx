'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getCart, clearCart, getCartTotal, CartItem } from '@/lib/cart';
import { ArrowLeft, Lock, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Dashboard?: {
      mount: (target: string | HTMLElement, options: any) => Promise<{ destroy?: () => void; refresh?: (nextAmount?: number) => Promise<any> }>;
      unmount: (target: string | HTMLElement) => void;
    };
  }
}

const SHIPPING_FEE = 30;
const FREE_SHIPPING_THRESHOLD = 50;
const PORTAL_BASE_URL = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || '';
const WIDGET_ROOT_ID = 'dashboard-widget-root';
const SDK_SCRIPT_ID = 'dashboard-sdk-script';

function formatPrice(value: number | string) {
  const amount = typeof value === 'number' ? value : parseFloat(value);
  if (Number.isNaN(amount)) return String(value);
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const fieldClass =
  'w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone placeholder:text-bone/60 focus:border-ember focus:outline-none';
const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-bone/60';

function makeMerchantOrderId() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

async function ensurePortalSdk(baseUrl: string) {
  if (typeof window === 'undefined') return;
  if (window.Dashboard) return;

  const existingScript = document.getElementById(SDK_SCRIPT_ID) as HTMLScriptElement | null;
  if (existingScript) {
    await new Promise<void>((resolve, reject) => {
      if (window.Dashboard) {
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

  const hasSdkConfig = !!PORTAL_BASE_URL;
  const formDataRef = useRef(formData);
  const acceptedTermsRef = useRef(acceptedTerms);
  const cartItemsLengthRef = useRef(cartItems.length);
  const cartItemsRef = useRef<CartItem[]>(cartItems);
  const merchantOrderIdRef = useRef(merchantOrderId);
  const totalsRef = useRef({ cartTotal, orderTotal, shippingCost });

  useEffect(() => {
    formDataRef.current = formData;
    acceptedTermsRef.current = acceptedTerms;
    cartItemsLengthRef.current = cartItems.length;
    cartItemsRef.current = cartItems;
    merchantOrderIdRef.current = merchantOrderId;
    totalsRef.current = { cartTotal, orderTotal, shippingCost };
  }, [acceptedTerms, cartItems, cartItems.length, cartTotal, formData, merchantOrderId, orderTotal, shippingCost]);

  const validateCheckoutForm = useCallback(() => {
    const latestFormData = formDataRef.current;
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
      if (!String(latestFormData[field] || '').trim()) {
        throw new Error('Please complete all required billing fields before continuing.');
      }
    }

    if (!acceptedTermsRef.current) {
      throw new Error('Please accept the terms before continuing to payment.');
    }

    if (!cartItemsLengthRef.current) {
      throw new Error('Your cart is empty.');
    }
  }, []);

  const buildCheckoutData = useCallback(
    (selectedMethod?: string) => {
      validateCheckoutForm();

      const latestFormData = formDataRef.current;
      const totals = totalsRef.current;
      const orderId = merchantOrderIdRef.current || makeMerchantOrderId();
      if (!merchantOrderIdRef.current) {
        merchantOrderIdRef.current = orderId;
        setMerchantOrderId(orderId);
      }

      const redirectUrl = `${window.location.origin}/thank-you?order=${encodeURIComponent(orderId)}&method=${encodeURIComponent(selectedMethod || 'unknown')}&amount=${encodeURIComponent(totals.orderTotal.toFixed(2))}`;

      return {
        orderId,
        merchantOrderId: orderId,
        visualOrderId: orderId,
        subtotal: totals.cartTotal,
        totalAmount: totals.orderTotal,
        shippingAmount: totals.shippingCost,
        currency: 'USD',
        redirectUrl,
        billingDetails: {
          firstName: latestFormData.firstName.trim(),
          lastName: latestFormData.lastName.trim(),
          email: latestFormData.email.trim(),
          phone: latestFormData.phone.trim(),
          address1: latestFormData.address.trim(),
          address2: '',
          city: latestFormData.city.trim(),
          state: latestFormData.state.trim(),
          postcode: latestFormData.zipCode.trim(),
          country: latestFormData.country.trim() || 'US',
        },
        items: cartItemsRef.current.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          price: Number(item.product.price || 0),
        })),
      };
    },
    [validateCheckoutForm],
  );

  useEffect(() => {
    const items = getCart();
    if (items.length === 0) {
      router.push('/cart');
      return;
    }
    setCartItems(items);
    setCartTotal(getCartTotal());
    const nextOrderId = makeMerchantOrderId();
    merchantOrderIdRef.current = nextOrderId;
    setMerchantOrderId(nextOrderId);
  }, [router]);

  useEffect(() => {
    let cancelled = false;

    const loadSdk = async () => {
      if (!hasSdkConfig) {
        setWidgetError('Online payment is not configured yet. Add the required payment environment variables on the server and storefront.');
        return;
      }

      try {
        await ensurePortalSdk(PORTAL_BASE_URL);
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
    if (!sdkReady || !window.Dashboard || !cartItems.length) {
      return;
    }

    let active = true;

    const mountWidget = async () => {
      try {
        if (widgetHandleRef.current?.destroy) {
          widgetHandleRef.current.destroy();
        } else if (window.Dashboard) {
          window.Dashboard.unmount(`#${WIDGET_ROOT_ID}`);
        }

        const dashboard = window.Dashboard;
        if (!dashboard) {
          throw new Error('The payment service did not initialize correctly.');
        }

        const handle = await dashboard.mount(`#${WIDGET_ROOT_ID}`, {
          configUrl: '/api/payment/config',
          sessionUrl: '/api/payment/session',
          baseUrl: PORTAL_BASE_URL,
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
      } else if (window.Dashboard) {
        window.Dashboard.unmount(`#${WIDGET_ROOT_ID}`);
      }
      widgetHandleRef.current = null;
    };
  }, [sdkReady, cartItems.length, orderTotal, buildCheckoutData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
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
                      <Link href="/refund-return-policy" className="font-medium text-ember underline underline-offset-2 hover:text-ember-dark">
                        Refund &amp; Return Policy
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
