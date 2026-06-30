import { PolicyPage } from "@/components/policy-page";

export default function AccessibilityStatementPage() {
  return (
    <PolicyPage
      title="Accessibility Statement"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles aims to make our website accessible and usable for all customers."
      sections={[
        {
          title: "1. Commitment",
          body: [
            "We work to improve website accessibility and support a shopping experience that can be used by customers with different needs and assistive technologies.",
          ],
        },
        {
          title: "2. Feedback",
          body: [
            "If you experience difficulty using the website, checking out, reading policy information, or contacting us, please let us know so we can review the issue.",
          ],
        },
        {
          title: "3. Contact Information",
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
