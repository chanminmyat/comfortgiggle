import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const faqs = [
  {
    question: "What does Comfort Giggles sell?",
    answer:
      "Comfort Giggles sells scented candles, custom candles, and candle gifts for customers in the United States.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders are typically processed within 3-5 business days after payment confirmation. Standard shipping usually takes 3-7 business days after processing.",
  },
  {
    question: "How much is shipping?",
    answer:
      "Orders of $50 or more qualify for free standard shipping. Orders below that threshold currently show a $30 shipping charge before payment.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "You may request cancellation within 24 hours of placing an order if it has not been processed, sent to a supplier or fulfillment partner, customized, or shipped.",
  },
  {
    question: "Can I return a candle?",
    answer:
      "Returns may be requested within 14 days of delivery for unused, unburned, undamaged items in original packaging. Custom or personalized products are not returnable once production has started.",
  },
  {
    question: "Who should I contact for support?",
    answer:
      "Contact Comfort Giggles at hello@comfortgiggles.com or 1-202-800-7298 for order, shipping, return, or product questions.",
  },
];

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col bg-soot font-sans text-bone">
      <Header />

      <main className="flex-1">
        <section className="border-b border-bone/15 bg-charcoal-dark">
          <div className="container mx-auto px-4 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ember">FAQ</p>
            <h1 className="mt-3 font-display text-5xl uppercase tracking-wide text-bone md:text-6xl">
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-bone/70">
              Clear answers about Comfort Giggles orders, shipping, cancellations, returns, and support.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl space-y-5">
            {faqs.map((faq) => (
              <article key={faq.question} className="border border-bone/15 bg-charcoal-dark p-6 md:p-8">
                <h2 className="font-display text-2xl uppercase tracking-wide text-bone">{faq.question}</h2>
                <p className="mt-3 text-sm leading-7 text-bone/70">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
