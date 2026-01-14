import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function FreelancerThirdPartyProviderPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Freelancer &amp; Third-Party Provider Policy</h1>

            <div className="space-y-8 text-gray-700">
              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
                <p>
                  Comfort Zone operates as a platform connecting clients with independent freelance
                  consultants. This policy outlines the standards and relationship between Comfort
                  Zone, the Client, and the Freelancer.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Independent Contractor Status</h2>
                <p>
                  All consultants and service providers listed on Comfort Zone are independent
                  contractors, not employees of Comfort Zone. They retain full control over their
                  methods, schedules, and professional judgment during virtual consults.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Professional Conduct</h2>
                <p>
                  Freelancers represent their own professional brands but must adhere to Comfort
                  Zone’s community standards:
                </p>
                <ul className="space-y-2">
                  <li>Punctuality: Freelancers must attend virtual consults at the scheduled time.</li>
                  <li>
                    Professionalism: Respectful communication and appropriate attire are required
                    during video calls.
                  </li>
                  <li>
                    Accuracy: Freelancers must provide accurate information regarding their
                    qualifications and expertise.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-2xl font-semibold text-gray-900">Non-Circumvention</h2>
                <p>
                  Freelancers and Clients agree not to circumvent the Comfort Zone platform. Any
                  attempt to move payments or ongoing business relationships off-platform to avoid
                  fees will result in immediate suspension of both accounts.
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
