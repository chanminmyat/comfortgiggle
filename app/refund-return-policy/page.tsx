import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RefundReturnPolicyPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold mb-2'>
              Refund &amp; Return Policy
            </h1>
            <p className='text-sm text-gray-500 mb-8'>
              Last Updated: December 1, 2025
            </p>

            <div className='space-y-8 text-gray-700'>
              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Eligibility for Returns
                </h2>
                <div className='space-y-2'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Physical Products
                  </h3>
                  <ul className='space-y-2'>
                    <li>
                      You have 30 calendar days from the date you receive your
                      product to initiate a return.
                    </li>
                    <li>
                      Items must be unused, in original packaging, and in a
                      resalable condition.
                    </li>
                    <li>
                      Proof of purchase (order confirmation email) is required.
                    </li>
                  </ul>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Digital Products
                  </h3>
                  <ul className='space-y-2'>
                    <li>
                      Digital products (e.g., downloadable content) are
                      non-refundable unless defective.
                    </li>
                  </ul>
                </div>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  How to Initiate a Return
                </h2>
                <ol className='list-decimal list-inside space-y-2'>
                  <li>
                    Contact us at hello@comfortzoneusa.cc or call 1-202-800-7298
                    within the 30-day window.
                  </li>
                  <li>
                    We will provide a Return Authorization Number (RAN) and
                    instructions.
                  </li>
                  <li>
                    Ship the item at your own expense to:
                    <div className='mt-2'>
                      <div>Returns Department</div>
                      <div>8 The Green Suite B</div>
                      <div>Dover, DE 19901</div>
                    </div>
                  </li>
                </ol>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Refunds
                </h2>
                <ul className='space-y-2'>
                  <li>
                    Once we receive and inspect your item, we will email you a
                    confirmation.
                  </li>
                  <li>
                    Refunds are processed within 7–10 business days to your
                    original payment method.
                  </li>
                  <li>
                    Shipping costs are non-refundable unless the item was
                    defective or incorrect.
                  </li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Non-Refundable Items
                </h2>
                <ul className='space-y-2'>
                  <li>
                    Gift cards, promotional items, and virtual consultations
                    (see below).
                  </li>
                  <li>Clearance or customized items.</li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Virtual Consultations Refund Policy
                </h2>
                <div className='space-y-2'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Cancellations by Client
                  </h3>
                  <ul className='space-y-2'>
                    <li>
                      If you cancel more than 24 hours before your scheduled
                      consultation, no fee will apply.
                    </li>
                    <li>
                      If you cancel less than 24 hours before, a 50% fee of the
                      consultation fee will be charged.
                    </li>
                    <li>
                      No-shows (failing to attend without notice) will result in
                      a 100% charge of the consultation fee.
                    </li>
                  </ul>
                </div>
                <div className='space-y-2'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Cancellations by Freelancer or Comfort Zone
                  </h3>
                  <ul className='space-y-2'>
                    <li>
                      If a freelancer or we cancel your consultation, you will
                      receive a full refund or the option to reschedule.
                    </li>
                  </ul>
                </div>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Exchanges
                </h2>
                <p>
                  We do not offer direct exchanges. If you wish to exchange an
                  item, you must return the original item and place a new order.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Contact Us
                </h2>
                <p>For any questions regarding returns or refunds, contact:</p>
                <ul className='space-y-2'>
                  <li>Email: hello@comfortzoneusa.cc</li>
                  <li>
                    Phone: 1-202-800-7298 (Customer Service: Mon–Fri 9 AM–5 PM
                    EST, Sat 10 AM–3 PM EST)
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
