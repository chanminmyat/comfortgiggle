import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function SecurityPolicyPage() {
  return (
    <PolicyPage
      title={"Security & Information Security Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Details PCI-DSS Level 1 payment processing, TLS 1.3 encryption, tokenization, and access controls protecting shoppers on www.comfortgiggles.com."}
      sections={[
        {
          title: "1. Commitment to Data & Payment Security",
          body: [
            "Comfort Giggles LLC maintains administrative, technical, and physical safeguards designed to protect customer data and payment transactions on www.comfortgiggles.com against unauthorized access, alteration, or disclosure.",
          ],
        },
        {
          title: "2. PCI-DSS Compliance & Payment Tokenization",
          bullets: [
            "Zero Cardholder Data Storage: www.comfortgiggles.com does not store raw credit card numbers, CVV security codes, or bank account credentials on our web servers.",
            "PCI-DSS Level 1 Gateways: All credit card transactions (Visa, Mastercard, American Express, Discover) and ACH transfers are processed through PCI-DSS Level 1 certified payment processors utilizing end-to-end encryption and tokenization.",
            "Secure Branded Payment Links: All payment links sent via email or SMS from 1-888-554-4521 resolve exclusively to verified HTTPS URLs on www.comfortgiggles.com or our certified payment gateway.",
          ],
        },
        {
          title: "3. Encryption, Access Controls & Incident Response",
          body: [
            "All storefront traffic is encrypted in transit using TLS 1.2/1.3 (HTTPS), and administrative accounts require multi-factor authentication (MFA). In the event of a confirmed security incident affecting personal data, we follow our Incident Response Plan and notify affected individuals and regulators as required by law. Report security concerns immediately to support@comfortgiggles.com.",
          ],
        },
      ]}
    />
  );
}
