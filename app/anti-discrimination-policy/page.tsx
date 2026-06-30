import { PolicyPage } from "@/components/policy-page";

export default function AntiDiscriminationPolicyPage() {
  return (
    <PolicyPage
      title="Anti-Discrimination Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles is committed to providing respectful customer service and a shopping experience free from unlawful discrimination."
      sections={[
        {
          title: "1. Equal Service",
          body: [
            "We do not refuse service or treat customers differently based on race, color, religion, sex, gender identity, sexual orientation, national origin, disability, age, or any other protected status under applicable law.",
          ],
        },
        {
          title: "2. Customer Conduct",
          body: [
            "Abusive, threatening, fraudulent, or harassing behavior toward Comfort Giggles support staff, suppliers, fulfillment partners, or other customers may result in order cancellation or refusal of future service.",
          ],
        },
        {
          title: "3. Reporting Concerns",
          body: [
            "If you believe you experienced discrimination while interacting with Comfort Giggles, contact us with the order number, date, and details so we can review the issue.",
          ],
        },
        {
          title: "4. Contact Information",
          bullets: [
            "Comfort Giggles",
            "Email: hello@comfortgiggles.com",
            "Phone: 1-202-800-7298",
            "Address: 8 The Green Suite B, Dover, DE 19901",
            "Contact Form: /contact",
          ],
        },
      ]}
    />
  );
}
