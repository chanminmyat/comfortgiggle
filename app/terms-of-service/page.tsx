import { PolicyPage } from "@/components/policy-page";

export default function TermsOfServicePage() {
  return (
    <PolicyPage
      title="Terms of Service"
      effectiveDate="May 15, 2026"
      intro="These Terms of Service govern your use of Comfort Giggles and purchases made through our website."
      sections={[
        {
          title: "1. Merchant Relationship",
          body: [
            "Comfort Giggles is the retailer and customer-facing merchant for orders placed through our website. We may work with third-party candle manufacturers, suppliers, payment processors, and fulfillment partners, but Comfort Giggles remains responsible for customer support for website purchases.",
          ],
        },
        {
          title: "2. Products",
          body: [
            "Product descriptions, photos, pricing, availability, scent notes, burn times, and packaging details are provided in good faith. Small variations may occur because products can be produced or fulfilled by supplier partners.",
          ],
        },
        {
          title: "3. Orders and Payment",
          body: [
            "Orders are subject to acceptance, payment authorization, product availability, and fraud checks. We may refuse or cancel an order if payment fails, product information is incorrect, stock is unavailable, or fraud is suspected.",
            "Payment must be completed through the payment methods shown at checkout. We do not store full card numbers on our servers.",
          ],
        },
        {
          title: "4. Shipping, Returns, and Cancellations",
          body: [
            "Shipping, return, refund, and cancellation rules are described in our Shipping Policy, Refund Policy, and Cancellation Policy. Those policies are incorporated into these terms.",
          ],
        },
        {
          title: "5. Customer Responsibilities",
          bullets: [
            "Provide accurate billing, shipping, and contact information.",
            "Review the order summary, shipping cost, and policy links before completing checkout.",
            "Use our website lawfully and do not attempt to interfere with website security or payment processing.",
          ],
        },
        {
          title: "6. Intellectual Property",
          body: [
            "Website content, branding, product names, images, graphics, and copy belong to Comfort Giggles or its licensors and may not be copied or reused without permission.",
          ],
        },
        {
          title: "7. Limitation of Liability",
          body: [
            "To the fullest extent permitted by law, Comfort Giggles is not liable for indirect, incidental, consequential, or punitive damages arising from use of the website or products.",
          ],
        },
        {
          title: "8. Contact Information",
          bullets: [
            "Comfort Giggles",
            "Email: hello@comfortgiggle.com",
            "Phone: 1-202-800-7298",
            "Address: 8 The Green Suite B, Dover, DE 19901",
            "Contact Form: /contact",
          ],
        },
      ]}
    />
  );
}
