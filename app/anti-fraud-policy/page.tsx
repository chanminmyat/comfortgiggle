import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function AntiFraudPolicyPage() {
  return (
    <PolicyPage
      title={"Anti-Fraud Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Protects shoppers and Comfort Giggles LLC against unauthorized card use, payment link spoofing, and identity theft."}
      sections={[
        {
          title: "1. Zero-Tolerance Fraud Commitment",
          body: [
            "Comfort Giggles LLC maintains strict anti-fraud controls across www.comfortgiggles.com and our SMS payment link workflow (1-888-554-4521) to protect customers, cardholders, and financial partners from unauthorized transactions and identity theft.",
          ],
        },
        {
          title: "2. Transaction Screening & Verification",
          bullets: [
            "Automated Security Checks: All card and ACH transactions undergo Address Verification Service (AVS), Card Verification Value (CVV/CVC) validation, velocity checks, and device/IP risk scoring.",
            "Manual Order Verification: High-value bulk candle orders or flagged transactions may require secondary verification (such as confirming billing details via email or phone) prior to shipment. If verification cannot be completed within 48 hours, the order will be canceled and refunded in full.",
            "Official Domain Verification: Legitimate payment links from Comfort Giggles are sent only upon customer request and always direct to www.comfortgiggles.com. We will never ask you for your full card number, PIN, or banking password over SMS or email.",
          ],
        },
        {
          title: "3. Reporting Suspicious Activity",
          body: [
            "If you receive a suspicious message claiming to be from Comfort Giggles or suspect unauthorized use of your payment method on www.comfortgiggles.com, please notify us immediately at support@comfortgiggles.com or call 1-888-554-4521 (Monday – Saturday, 9:00 AM – 6:00 PM Eastern Time (ET) (Phone & Email); Sunday: Email Support Only) so we can investigate and block fraudulent activity.",
          ],
        },
      ]}
    />
  );
}
