import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold mb-6'>Terms of Service</h1>

            <div className='space-y-8 text-gray-700'>
              <section className='space-y-3'>
                <p className='text-sm text-gray-500'>
                  Last Updated: December 2025 <br />
                  Effective Date: December 1, 2025 <br />
                  Website: www.comfortgiggle.com
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the website www.comfortgiggle.com ("Site")
                  and the services provided by Comfort Giggle ("Company," "we,"
                  "us," or "our"), you agree to comply with and be bound by
                  these Terms of Service ("Terms"). If you do not agree to these
                  Terms, you may not access or use the Site or Services.
                </p>
                <p>
                  These Terms apply to all visitors, users, clients, and
                  freelancers who access the Site.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  2. Description of Services
                </h2>
                <p>
                  Comfort Giggle operates as a platform connecting users seeking
                  professional advice ("Clients") with independent contractors
                  providing virtual consultation services ("Freelancers").
                </p>

                <div className='space-y-2'>
                  <p className='font-medium text-gray-900'>2.1 Venue Only</p>
                  <p>
                    Comfort Giggle serves solely as a venue to facilitate
                    connections. We are not a party to any agreement between
                    Clients and Freelancers and do not control or supervise the
                    services provided.
                  </p>
                </div>

                <div className='space-y-2'>
                  <p className='font-medium text-gray-900'>
                    2.2 No Employment Relationship
                  </p>
                  <p>
                    Freelancers are independent contractors and are not
                    employees, partners, or agents of Comfort Giggle.
                  </p>
                </div>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  3. User Accounts
                </h2>

                <div className='space-y-2'>
                  <p className='font-medium text-gray-900'>3.1 Eligibility</p>
                  <p>
                    You must be at least 18 years old to create an account. By
                    using the Site, you represent that you meet this
                    requirement.
                  </p>
                </div>

                <div className='space-y-2'>
                  <p className='font-medium text-gray-900'>
                    3.2 Account Security
                  </p>
                  <p>
                    You are responsible for maintaining the confidentiality of
                    your account credentials and for all activities that occur
                    under your account.
                  </p>
                </div>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  4. Payments and Billing
                </h2>

                <ul className='list-disc pl-5 space-y-1'>
                  <li>
                    Fees for virtual consults are clearly displayed at checkout
                    and must be paid in full at the time of booking.
                  </li>
                  <li>
                    Payments are processed through third-party providers such as
                    Stripe or PayPal. We do not store full payment card details.
                  </li>
                  <li>
                    Refunds are governed by our Dispute Resolution Policy. Late
                    cancellations may be non-refundable.
                  </li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  5. User Conduct
                </h2>
                <p>You agree not to:</p>
                <ul className='list-decimal pl-5 space-y-1'>
                  <li>Violate any applicable law or regulation.</li>
                  <li>Harass, abuse, or harm others.</li>
                  <li>Impersonate any person or entity.</li>
                  <li>
                    Circumvent platform fees by transacting outside Comfort
                    Giggle.
                  </li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate accounts for
                  violations of these rules.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  6. Intellectual Property
                </h2>
                <p>
                  All content, code, design, and branding on the Site are the
                  exclusive property of Comfort Giggle and are protected by
                  intellectual property laws.
                </p>
                <p>
                  You retain ownership of content you upload but grant us a
                  limited license to use it solely to provide the Services.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  7. Disclaimers and Limitation of Liability
                </h2>
                <p className='uppercase'>
                  The site and services are provided “as is” and “as available”
                  without warranties of any kind.
                </p>
                <p className='uppercase'>
                  To the fullest extent permitted by law, Comfort Giggle shall not
                  be liable for any indirect, incidental, or consequential
                  damages. Our total liability shall not exceed the amount paid
                  by you in the past six (6) months.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  8. Dispute Resolution & Arbitration
                </h2>
                <p className='font-medium uppercase text-gray-900'>
                  Please read carefully. This section affects your legal rights.
                </p>
                <p>
                  Disputes will first be addressed informally by contacting
                  hello@comfortgiggle.com. If unresolved, disputes will be
                  resolved through binding arbitration in Delaware.
                </p>
                <p>
                  Class actions and representative proceedings are not
                  permitted.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  9. California Residents
                </h2>
                <p>
                  California residents have additional rights under the CCPA and
                  CPRA, including rights to access, delete, correct, and opt out
                  of data sharing.
                </p>
                <p>
                  Comfort Giggle does not sell personal data. Requests may be
                  submitted to hello@comfortgiggle.com.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  10. General Provisions
                </h2>
                <ul className='list-disc pl-5 space-y-1'>
                  <li>
                    These Terms are governed by the laws of the State of
                    Delaware.
                  </li>
                  <li>
                    If any provision is invalid, the remaining provisions remain
                    in effect.
                  </li>
                  <li>We may update these Terms at any time.</li>
                </ul>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Contact Us
                </h2>
                <div className='space-y-2'>
                  <p>
                    Comfort Giggle <br />
                    Address: 8 The Green Suite B, Dover, DE 19901
                  </p>
                  <p>Phone: 1-202-800-7298</p>
                  <p>Email: hello@comfortgiggle.com</p>
                  <p>
                    Customer Service Hours:
                    <br />
                    Monday – Friday: 9:00 AM – 5:00 PM EST
                    <br />
                    Saturday: 10:00 AM – 3:00 PM EST
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </section>

              <section>
                <p className='text-sm text-gray-500'>
                  Last Updated: December 2025
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
