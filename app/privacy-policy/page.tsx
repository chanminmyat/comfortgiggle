import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title={"Privacy Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Data Controller: Comfort Giggles LLC. Includes mandatory carrier-compliant Mobile/SMS No-Sharing Clause for 1-888-554-4521, CCPA/CPRA U.S. state privacy rights, and PCI-DSS payment security disclosures."}
      sections={[
        {
          title: "1. Overview & Scope",
          body: [
            "Comfort Giggles LLC (\"Comfort Giggles,\" \"we,\" \"us,\" or \"our\") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit www.comfortgiggles.com, purchase candles or home fragrance goods, or receive transactional SMS payment links.",
          ],
        },
        {
          title: "2. Information We Collect",
          bullets: [
            "Identity & Contact Data: Full name, billing address, shipping address, email address, and mobile phone number.",
            "Transaction & Payment Data: Order details, gift messages, invoice records, and payment confirmation tokens for transactions made via Visa, Mastercard, American Express, Discover, ACH / Bank Transfer, Zelle, and Wise. Full credit card numbers are processed directly by PCI-DSS Level 1 compliant payment gateways and are never stored on our servers.",
            "Technical & Usage Data: IP address, browser type, device identifiers, referring URLs, and cookie preferences.",
          ],
        },
        {
          title: "3. How We Use Your Information",
          bullets: [
            "Order Fulfillment & Billing: To process payments under descriptor \"COMFORT GIGGLES\", coordinate production and packing with our manufacturing and fulfillment partners, ship candles, and provide tracking updates.",
            "Transactional SMS Communications: To send secure checkout/invoice payment links, payment confirmations, and shipping alerts from 1-888-554-4521 when you have explicitly opted in.",
            "Compliance & Fraud Prevention: To verify customer identity, prevent unauthorized card transactions, resolve chargebacks, and fulfill tax and AML recordkeeping duties.",
          ],
        },
        {
          title: "4. SMS & Mobile Text Messaging Privacy (No Third-Party Sharing)",
          body: [
            "No Third-Party Sharing or Marketing: No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties, except with essential telecommunications providers and subcontractors (such as our SMS gateway provider, Telnyx) strictly required to deliver our text messages to you.",
            "You may revoke SMS consent at any time by replying STOP to 1-888-554-4521 or emailing support@comfortgiggles.com.",
          ],
        },
        {
          title: "5. Disclosure of Information to Service Providers",
          body: [
            "We share personal information only with vetted operational partners strictly necessary to run our store, including payment processors, banking partners, candle production/fulfillment partners, shipping carriers (USPS, UPS, FedEx), and telecommunications providers. We do not sell your personal information.",
          ],
        },
        {
          title: "6. Your U.S. State Privacy Rights (CCPA/CPRA & State Laws)",
          body: [
            "Depending on your state of residence (including California, Virginia, Colorado, Connecticut, and Texas), you have the right to request access to, correction of, or deletion of your personal data (subject to legal, tax, and AML recordkeeping obligations). Submit privacy requests to support@comfortgiggles.com or call 1-888-554-4521.",
          ],
        },
      ]}
    />
  );
}
