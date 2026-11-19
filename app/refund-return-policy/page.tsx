import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function ReturnsExchangesPolicyPage() {
  return (
    <PolicyPage
      title={"Returns & Exchanges Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"30-day return/exchange window for unused candles, free replacement for transit damage, and refunds posted under 'COMFORT GIGGLES'."}
      sections={[
        {
          title: "1. 30-Day Return & Exchange Window",
          body: [
            "We want you to love every scent from Comfort Giggles. You may request a return or scent exchange within 30 calendar days of delivery for eligible items. To qualify, candles must be unburned, unused, in their original glass jar/vessel, and in original packaging.",
          ],
        },
        {
          title: "2. How to Start a Return or Exchange",
          bullets: [
            "Request Authorization: Contact support@comfortgiggles.com or call 1-888-554-4521 (Monday – Saturday, 9:00 AM – 6:00 PM Eastern Time (ET) (Phone & Email); Sunday: Email Support Only) with your order number and the item(s) you wish to return or exchange.",
            "Return Shipping: Customers are responsible for return shipping costs on preference-based returns or scent exchanges. If your order arrived damaged, defective, or incorrect, we cover 100% of replacement or return shipping costs.",
            "Non-Returnable Items: Burned or partially burned candles, custom-labeled or personalized candles, gift cards, and items marked as Final Sale at checkout.",
          ],
        },
        {
          title: "3. Refund Processing & Statement Credits",
          body: [
            "Once your returned item is received and inspected, approved refunds are issued within 5–7 business days back to your original payment method (Visa, Mastercard, American Express, Discover, ACH / Bank Transfer, Zelle, and Wise). Depending on your bank or card issuer, statement credits typically post within 3–10 business days under merchant name \"COMFORT GIGGLES\".",
          ],
        },
      ]}
    />
  );
}
