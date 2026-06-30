import { PolicyPage } from "@/components/policy-page";

export default function SecurityInformationSecurityPolicyPage() {
  return (
    <PolicyPage
      title="Security and Information Security Policy"
      effectiveDate="May 15, 2026"
      intro="Comfort Giggles takes reasonable steps to protect customer information, payment-related records, and order data."
      sections={[
        {
          title: "1. Website Security",
          bullets: [
            "We use encrypted connections where supported by our hosting and payment systems.",
            "Access to customer information is limited to personnel and service providers with a business need.",
            "We review orders and payment activity for fraud-prevention and support purposes.",
          ],
        },
        {
          title: "2. Payment Security",
          body: [
            "Online payments are handled through payment service providers. Comfort Giggles does not store full credit or debit card numbers on our servers.",
          ],
        },
        {
          title: "3. Supplier and Fulfillment Access",
          body: [
            "When supplier or fulfillment partners need order information to produce or ship products, we share only the information needed to complete that task.",
          ],
        },
        {
          title: "4. Incident Response",
          body: [
            "If we identify a security incident involving customer information, we will investigate, take appropriate mitigation steps, and notify affected parties when required by applicable law.",
          ],
        },
        {
          title: "5. Contact Information",
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
