import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AccessibilityStatementPage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 py-16'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto'>
            <h1 className='text-4xl font-bold mb-6'>Accessibility Statement</h1>

            <div className='space-y-8 text-gray-700'>
              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Commitment
                </h2>
                <p>
                  Comfort Giggle is dedicated to ensuring digital accessibility
                  for people with disabilities. We are continually improving the
                  user experience for everyone and applying the relevant
                  accessibility standards.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Standards
                </h2>
                <p>
                  We aim to adhere to the Web Content Accessibility Guidelines
                  (WCAG) 2.1 at the AA level.
                </p>
              </section>

              <section className='space-y-3'>
                <h2 className='text-2xl font-semibold text-gray-900'>
                  Feedback
                </h2>
                <p>
                  If you encounter accessibility barriers on our website, please
                  contact us:
                </p>
                <ul className='space-y-2'>
                  <li>Phone: 1-202-800-7298</li>
                  <li>Email: hello@comfortgiggles.com</li>
                  <li>
                    Response Time: We aim to respond to feedback within 2
                    business days.
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
