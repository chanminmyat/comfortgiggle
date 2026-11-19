import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function ClearPricingPolicyPage() {
  return (
    <PolicyPage
      title={"Clear Pricing Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Transparent USD pricing, $50 free shipping / $30 shipping disclosure, zero hidden subscriptions, and exact billing under 'COMFORT GIGGLES'."}
      sections={[
        {
          title: "1. Transparent USD Product Pricing",
          body: [
            "All product prices on www.comfortgiggles.com are displayed clearly in United States Dollars (USD) across product pages, the shopping cart, and checkout. Prices may vary by candle size, wax weight, vessel style, or custom labeling options.",
          ],
        },
        {
          title: "2. Shipping Charges & Taxes Disclosed Upfront",
          bullets: [
            "Shipping Thresholds: Orders of $50.00 or more qualify for free standard U.S. shipping. Orders below $50.00 incur a $30.00 shipping charge, displayed transparently in your cart and checkout before payment.",
            "Applicable Taxes: Estimated state and local sales taxes are calculated and itemized prior to payment authorization.",
          ],
        },
        {
          title: "3. No Hidden Fees or Unauthorized Subscriptions",
          body: [
            "All purchases and SMS payment link invoices on www.comfortgiggles.com are one-time transactions unless you explicitly enroll in a clearly labeled candle subscription club. We never add undisclosed charges after checkout—the exact total you authorize matches the charge billed under \"COMFORT GIGGLES\".",
          ],
        },
      ]}
    />
  );
}
