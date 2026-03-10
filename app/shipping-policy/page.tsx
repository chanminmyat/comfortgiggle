import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ShippingPolicyPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <h1 className='text-4xl font-bold mb-2'>Shipping Policy</h1>
            <p className='text-sm text-gray-500 mb-8'>
              Last Updated: December 1, 2025
            </p>

            <div className='space-y-8 text-gray-700'>
              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Shipping Methods
                </h2>
                <p>
                  We use trusted, reputable carriers (e.g., USPS, UPS, FedEx).
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Shipping Costs &amp; Estimates
                </h2>
                <div className='overflow-x-auto'>
                  <table className='w-full text-left border border-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th className='px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700'>
                          Destination
                        </th>
                        <th className='px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700'>
                          Estimated Delivery Time
                        </th>
                        <th className='px-4 py-2 border-b border-gray-200 text-sm font-semibold text-gray-700'>
                          Shipping Cost
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='px-4 py-2 border-b border-gray-200'>
                          United States
                        </td>
                        <td className='px-4 py-2 border-b border-gray-200'>
                          7-12 Business Days
                        </td>
                        <td className='px-4 py-2 border-b border-gray-200'>
                          $35
                        </td>
                      </tr>
                      <tr>
                        <td className='px-4 py-2'>Canada</td>
                        <td className='px-4 py-2'>12-18 Business Days</td>
                        <td className='px-4 py-2'>$45</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Order Tracking
                </h2>
                <p>
                  You will receive a confirmation email with a tracking number
                  once your order ships.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>Delays</h2>
                <p>
                  While we strive for on-time delivery, we are not responsible
                  for delays caused by carriers, weather, or natural disasters.
                </p>
              </section>

              <section className='space-y-4'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Lost or Damaged Packages
                </h2>
                <ul className='space-y-2'>
                  <li>
                    Lost Packages: Contact us with your order number. We will
                    file a claim with the carrier and, if approved, resend the
                    item or issue a refund.
                  </li>
                  <li>
                    Damaged Items: Contact us within 48 hours of receipt with
                    photos. We will either replace the item or issue a refund.
                  </li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Responsibility for Delivery
                </h2>
                <p>
                  You (the recipient) are responsible for providing a valid
                  phone number and address. Comfort Giggle is not liable for
                  misdelivered packages due to incorrect information provided at
                  checkout.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Contact Us
                </h2>
                <p>For shipping inquiries, contact:</p>
                <ul className='space-y-2'>
                  <li>Email: hello@comfortgiggle.com</li>
                  <li>Phone: 1-202-800-7298</li>
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
