import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const fieldClass =
  "w-full border border-bone/20 bg-charcoal-dark px-3 py-2.5 text-sm text-bone placeholder:text-bone/40 focus:border-ember focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-bone/60";

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    note: "Give us a call",
    href: "tel:+12028007298",
    value: "1-202-800-7298",
  },
  {
    icon: Mail,
    title: "Email",
    note: "Send us a message",
    href: "mailto:hello@comfortgiggle.com",
    value: "hello@comfortgiggle.com",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
      <Header />

      <main className="flex-1">
        {/* Intro */}
        <section className="border-b border-bone/15 bg-charcoal-dark">
          <div className="container mx-auto px-4 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">Contact</p>
            <h1 className="mt-3 font-display text-5xl uppercase tracking-wide text-bone md:text-6xl">We&apos;d love to hear from you</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-bone/70">
              Questions about scents, shipping, or gift sets? Reach out and our team will get back to
              you within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            {/* Contact cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {contactCards.map((card) => (
                <div key={card.title} className="border border-bone/15 bg-charcoal-dark p-8 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember/15 text-ember">
                    <card.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-display text-xl uppercase tracking-wide text-bone">{card.title}</h2>
                  <p className="mt-1 text-sm text-bone/60">{card.note}</p>
                  <a href={card.href} className="mt-2 inline-block text-sm text-ember hover:text-bone hover:underline">
                    {card.value}
                  </a>
                </div>
              ))}

              <div className="border border-bone/15 bg-charcoal-dark p-8 text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember/15 text-ember">
                  <MapPin className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-xl uppercase tracking-wide text-bone">Location</h2>
                <p className="mt-1 text-sm leading-6 text-bone/70">
                  8 The Green Suite B
                  <br />
                  Dover, DE 19901
                </p>
              </div>
            </div>

            {/* Form + hours */}
            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-4xl uppercase tracking-wide text-bone">Get In Touch</h2>
                <p className="mt-3 text-sm leading-7 text-bone/70">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <form className="mt-6 space-y-4 border border-bone/15 bg-charcoal-dark p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>First Name *</label>
                      <input id="firstName" name="firstName" required className={fieldClass} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>Last Name *</label>
                      <input id="lastName" name="lastName" required className={fieldClass} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email *</label>
                    <input id="email" name="email" type="email" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input id="phone" name="phone" type="tel" className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="subject" className={labelClass}>Subject *</label>
                    <input id="subject" name="subject" required className={fieldClass} />
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Tell us how we can help you..."
                      className={fieldClass}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-ember px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-charcoal transition-colors hover:bg-ember-dark hover:text-bone"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h2 className="font-display text-4xl uppercase tracking-wide text-bone">Business Hours</h2>
                <div className="mt-6 border border-bone/15 bg-charcoal-dark p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-6 w-6 flex-shrink-0 text-ember" strokeWidth={1.5} />
                    <div className="flex-1">
                      <h3 className="font-display text-lg uppercase tracking-wide text-bone">Store Hours</h3>
                      <dl className="mt-4 space-y-2 text-sm text-bone/70">
                        <div className="flex justify-between">
                          <dt>Monday – Friday</dt>
                          <dd className="font-medium text-bone">9:00 AM – 5:00 PM EST</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Saturday</dt>
                          <dd className="font-medium text-bone">10:00 AM – 3:00 PM EST</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Sunday</dt>
                          <dd className="font-medium text-bone">Closed</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-[360px] overflow-hidden border border-bone/15">
                  <img
                    src="/our-story.png"
                    alt="Comfort Giggles candle styled with dried flowers"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
