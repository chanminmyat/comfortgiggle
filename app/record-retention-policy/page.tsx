import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function RecordRetentionPolicyPage() {
  return (
    <PolicyPage
      title={"Record Retention Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Establishes retention schedules for financial records, tax documents, AML logs, SMS opt-in records, and customer orders for Comfort Giggles LLC."}
      sections={[
        {
          title: "1. Purpose & Regulatory Alignment",
          body: [
            "This Record Retention Policy establishes standardized retention periods for business, financial, tax, AML compliance, and customer communication records maintained by Comfort Giggles LLC in accordance with IRS guidelines, Delaware corporate law, card network dispute rules, and TCPA/carrier compliance standards.",
          ],
        },
        {
          title: "2. Retention Schedule by Record Category",
          bullets: [
            "Financial, Tax & Accounting Records (7 Years): Invoices, payment receipts, bank/ACH settlement statements, merchant processor reports, and federal/state tax filings are retained for at least seven (7) years.",
            "Order, Shipping, Return & Chargeback Records (5 Years): Customer order logs, carrier delivery proofs, return/exchange records, refund receipts, and chargeback representment evidence are retained for five (5) years.",
            "SMS Opt-In & Opt-Out Consent Logs (5 Years): Timestamps, IP addresses, checkout form consent records, and STOP/HELP logs associated with toll-free number 1-888-554-4521 are retained for a minimum of five (5) years to demonstrate compliance with TCPA and carrier regulations.",
            "AML / KYC Verification Logs (5 Years): High-value order verification and sanctions screening records are retained for at least five (5) years.",
          ],
        },
        {
          title: "3. Secure Disposal",
          body: [
            "Upon expiration of the applicable retention period, electronic records are permanently purged or anonymized using industry-standard data sanitization methods, and any physical records are cross-cut shredded.",
          ],
        },
      ]}
    />
  );
}
