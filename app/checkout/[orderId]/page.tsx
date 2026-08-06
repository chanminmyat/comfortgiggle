import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { findCheckoutIntent } from "@/lib/checkout-intents";
import { PayNowButton } from "./pay-now-button";
import { AuthorizeNetCardForm } from "./authorize-net-card-form";

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(Number(amount || 0));
}

function getText(value: unknown) {
  return String(value ?? "").trim();
}

function isAuthorizeNetProcessor(processor: string, paymentMethod: string) {
  const normalized = `${processor} ${paymentMethod}`.toLowerCase();
  return normalized.includes("authorize") || normalized.includes("authnet");
}

function processorLabel(processor: string, paymentMethod: string) {
  if (isAuthorizeNetProcessor(processor, paymentMethod)) return "Authorize.Net";
  return processor || paymentMethod || "Payment";
}

export default async function MerchantCheckoutPage({
  params,
}: {
  params: { orderId: string };
}) {
  const orderId = decodeURIComponent(params.orderId);
  const intent = await findCheckoutIntent(orderId);

  if (!intent) {
    notFound();
  }

  const processor = getText(intent.processor);
  const paymentMethod = getText(intent.paymentMethod);
  const billing = intent.billingDetails || {};
  const firstName = getText(billing.firstName);
  const lastName = getText(billing.lastName);
  const customerName = [firstName, lastName].filter(Boolean).join(" ");
  const customerEmail = getText(billing.email);
  const statementDescriptor = getText(intent.statementDescriptor) || processorLabel(processor, paymentMethod);
  const isAuthorizeNet = isAuthorizeNetProcessor(processor, paymentMethod);
  const authorizeNetConfig = {
    apiLoginId: process.env.AUTHORIZE_NET_API_LOGIN_ID || process.env.NEXT_PUBLIC_AUTHORIZE_NET_API_LOGIN_ID || "",
    clientKey: process.env.AUTHORIZE_NET_CLIENT_KEY || process.env.NEXT_PUBLIC_AUTHORIZE_NET_CLIENT_KEY || "",
    environment:
      (process.env.AUTHORIZE_NET_ENVIRONMENT || process.env.NEXT_PUBLIC_AUTHORIZE_NET_ENVIRONMENT) === "production"
        ? "production"
        : "sandbox",
  } as const;

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

          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ember">Secure Checkout</p>
            <h1 className="mt-3 font-display text-4xl text-bone md:text-5xl">Review and Pay</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-bone/70">
              Confirm your order details, then continue to secure payment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section className="border border-bone/15 bg-charcoal-dark p-6 lg:col-span-2">
              <h2 className="font-display text-2xl text-bone">Order details</h2>
              <dl className="mt-6 grid grid-cols-1 gap-5 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">Order ID</dt>
                  <dd className="mt-1 font-medium text-bone">{intent.orderId}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">
                    Statement Descriptor
                  </dt>
                  <dd className="mt-1 font-medium text-bone">{statementDescriptor}</dd>
                </div>
                {customerName ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">Customer</dt>
                    <dd className="mt-1 font-medium text-bone">{customerName}</dd>
                  </div>
                ) : null}
                {customerEmail ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">Email</dt>
                    <dd className="mt-1 font-medium text-bone">{customerEmail}</dd>
                  </div>
                ) : null}
              </dl>
            </section>

            <aside className="space-y-6">
              <div className="border border-bone/15 bg-charcoal-dark p-6">
                <h2 className="font-display text-2xl text-bone">Your order</h2>
                <div className="mt-6 flex items-center justify-between text-lg">
                  <span className="text-bone/70">Total</span>
                  <span className="font-display text-bone">{formatMoney(intent.amount, intent.currency)}</span>
                </div>
              </div>

              <div className="border border-bone/15 bg-charcoal-dark p-6">
                <h2 className="mb-5 flex items-center gap-2 font-display text-2xl text-bone">
                  <Lock className="h-5 w-5 text-ember" />
                  Payment
                </h2>

                {isAuthorizeNet ? (
                  <AuthorizeNetCardForm
                    orderId={intent.orderId}
                    config={authorizeNetConfig}
                    statementDescriptor={statementDescriptor}
                  />
                ) : (
                  <PayNowButton
                    orderId={intent.orderId}
                    processor={processorLabel(processor, paymentMethod)}
                    statementDescriptor={statementDescriptor}
                  />
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
