import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function DisputeResolutionPolicyPage() {
  return (
    <PolicyPage
      title={"Dispute Resolution & Chargeback Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Card-network-compliant pre-dispute resolution path, chargeback evidence standards, and Delaware venue terms for COMFORT GIGGLES."}
      sections={[
        {
          title: "1. Direct Customer Resolution First",
          body: [
            "We are committed to resolving any billing question, damaged candle claim, or shipping delay quickly. Before initiating a payment dispute or chargeback with your bank or card issuer, please contact our support team at support@comfortgiggles.com or call 1-888-554-4521 (Monday – Saturday, 9:00 AM – 6:00 PM Eastern Time (ET) (Phone & Email); Sunday: Email Support Only). Most billing or order inquiries are resolved within 1–2 business days.",
          ],
        },
        {
          title: "2. Recognizing Your Billing Descriptor",
          body: [
            "Charges from www.comfortgiggles.com appear on your credit card or bank statement as \"COMFORT GIGGLES\". If you see an unfamiliar charge under this descriptor, please contact us with the transaction date and amount so we can verify the order or SMS payment link immediately.",
          ],
        },
        {
          title: "3. Chargeback & Payment Dispute Process",
          body: [
            "If a formal chargeback or ACH return is filed without prior contact, or in contradiction to our published Returns & Exchanges or Cancellation Policies:",
          ],
          bullets: [
            "Representment Evidence: We submit complete transaction documentation to the acquiring bank and card network, including IP address verification, AVS/CVV match logs, SMS/email payment link authorization records, carrier tracking and delivery confirmation, and published policy acceptance timestamps.",
            "Friendly Fraud Prevention: Confirmed fraudulent chargebacks (where goods were delivered as agreed and verified) may result in permanent account restriction and collection recovery where permitted by law.",
          ],
        },
        {
          title: "4. Governing Law & Venue",
          body: [
            "Any dispute, claim, or controversy arising out of or relating to these policies or your purchases that cannot be resolved informally shall be governed by the laws of the State of Delaware. To the extent permitted by law, disputes shall be resolved individually and not as part of any class or representative action.",
          ],
        },
      ]}
    />
  );
}
