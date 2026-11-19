import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function AntiMoneyLaunderingPolicyPage() {
  return (
    <PolicyPage
      title={"Anti-Money Laundering (AML) Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Establishes AML, KYC/KYB, sanctions screening, and suspicious activity controls for Comfort Giggles LLC across card, ACH, Zelle, and Wise payments."}
      sections={[
        {
          title: "1. Purpose & Regulatory Compliance Commitment",
          body: [
            "Comfort Giggles LLC is committed to preventing money laundering, terrorist financing, sanctions evasion, and illicit financial activity across www.comfortgiggles.com and all accepted payment rails (Visa, Mastercard, American Express, Discover, ACH / Bank Transfer, Zelle, and Wise). We adhere to applicable U.S. federal anti-money laundering principles, including the Bank Secrecy Act (BSA), USA PATRIOT Act standards, and Office of Foreign Assets Control (OFAC) sanctions regulations.",
          ],
        },
        {
          title: "2. Know Your Customer / Know Your Business (KYC / KYB) Verification",
          body: [
            "To ensure legitimate consumer and wholesale/event transactions, we apply risk-based identity and business verification procedures:",
          ],
          bullets: [
            "Standard Due Diligence: Collecting and verifying the purchaser's full legal name, business entity name (for wholesale or corporate event candle orders), billing and shipping addresses, email address, and mobile phone number.",
            "Enhanced Due Diligence (EDD): For large wholesale/event orders or unusual cross-border payment patterns (such as via Wise or international cards), we may request government-issued photo identification, business registration documents, or proof of account ownership prior to fulfilling the order.",
            "Third-Party Payment Restrictions: Payments must originate from an account or card belonging to the contracting individual or business entity. Unverified third-party payments may be rejected and returned to the originating source.",
          ],
        },
        {
          title: "3. OFAC & Sanctions Screening",
          body: [
            "Comfort Giggles LLC does not conduct business with individuals, entities, or jurisdictions subject to comprehensive U.S. economic sanctions administered by OFAC. Orders or payments originating from sanctioned regions or restricted parties are automatically blocked and reported as required by law.",
          ],
        },
        {
          title: "4. Transaction Monitoring & Suspicious Activity Reporting",
          bullets: [
            "Ongoing Monitoring: We monitor transactions across card, ACH, Zelle, and Wise channels for red flags, including structured split payments, rapid order cancellations requesting refunds to different accounts, mismatched billing/shipping/IP locations, or payments unrelated to legitimate merchandise.",
            "Right to Refuse or Freeze Transactions: We reserve the right to delay, decline, or refund any transaction that fails KYC/AML review or exhibits indicators of illicit activity, and to cooperate with banking partners, payment processors, and law enforcement authorities.",
            "Recordkeeping: All KYC verification documents and transaction monitoring logs are retained for at least five (5) years in accordance with our Record Retention Policy.",
          ],
        },
      ]}
    />
  );
}
