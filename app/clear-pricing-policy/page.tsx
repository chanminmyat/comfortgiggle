import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ClearPricingPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Clear Pricing Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  We believe in complete transparency regarding costs. You will never be charged
                  fees that were not disclosed prior to checkout.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Service Fees</h2>
                <ul className="space-y-2">
                  <li>
                    Consultation Rates: Rates are set by the freelancer or fixed by the platform and
                    clearly displayed on the booking page.
                  </li>
                  <li>
                    Platform Fee: A service fee may be applied to bookings to cover platform
                    maintenance. This will be itemized at checkout.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Currency</h2>
                <p>All prices are listed in USD unless otherwise stated.</p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Cancellation Fees</h2>
                <ul className="space-y-2">
                  <li>
                    Client Cancellations: Cancellations made less than 24 hours before the scheduled
                    time may be subject to a cancellation fee (up to 100% of the booking cost).
                  </li>
                  <li>
                    Freelancer Cancellations: If a freelancer cancels, the client is entitled to a
                    full refund.
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
