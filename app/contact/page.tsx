import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const fieldClass =
  "w-full border border-ink/20 bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-taupe focus:border-olive focus:outline-none";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-taupe";

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
    <div className="flex min-h-screen flex-col bg-cream font-sans text-ink">
      <Header />

      <main className="flex-1">
        {/* Intro */}
        <section className="border-b border-clay/60 bg-sand/60">
          <div className="container mx-auto px-4 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-taupe">Contact</p>
            <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">We&apos;d love to hear from you</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/70">
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
                <div key={card.title} className="border border-clay bg-cream p-8 text-center">
                  <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-olive/10 text-olive">
                    <card.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h2 className="font-serif text-xl text-ink">{card.title}</h2>
                  <p className="mt-1 text-sm text-taupe">{card.note}</p>
                  <a href={card.href} className="mt-2 inline-block text-sm text-olive hover:text-olive-dark hover:underline">
                    {card.value}
                  </a>
                </div>
              ))}

              <div className="border border-clay bg-cream p-8 text-center">
                <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-olive/10 text-olive">
                  <MapPin className="h-7 w-7" strokeWidth={1.5} />
                </div>
                <h2 className="font-serif text-xl text-ink">Location</h2>
                <p className="mt-1 text-sm leading-6 text-ink/70">
                  8 The Green Suite B
                  <br />
                  Dover, DE 19901
                </p>
              </div>
            </div>

            {/* Form + hours */}
            <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl text-ink">Get In Touch</h2>
                <p className="mt-3 text-sm leading-7 text-ink/70">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <form className="mt-6 space-y-4 border border-clay bg-cream p-6">
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
                    className="w-full bg-olive px-6 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-olive-dark"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div>
                <h2 className="font-serif text-3xl text-ink">Business Hours</h2>
                <div className="mt-6 border border-clay bg-cream p-6">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-6 w-6 flex-shrink-0 text-olive" strokeWidth={1.5} />
                    <div className="flex-1">
                      <h3 className="font-serif text-lg text-ink">Store Hours</h3>
                      <dl className="mt-4 space-y-2 text-sm text-ink/70">
                        <div className="flex justify-between">
                          <dt>Monday – Friday</dt>
                          <dd className="font-medium text-ink">9:00 AM – 5:00 PM EST</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Saturday</dt>
                          <dd className="font-medium text-ink">10:00 AM – 3:00 PM EST</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Sunday</dt>
                          <dd className="font-medium text-ink">Closed</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className="mt-6 h-[360px] overflow-hidden border border-clay">
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
