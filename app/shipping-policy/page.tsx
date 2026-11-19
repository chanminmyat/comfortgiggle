import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title={"Shipping & Delivery Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Covers order processing, free standard shipping on orders $50+, $30 shipping threshold below $50, warm-weather candle protection, and tracking via 1-888-554-4521."}
      sections={[
        {
          title: "1. Order Processing Times",
          body: [
            "Orders placed on www.comfortgiggles.com are processed within 1–3 business days (Monday through Saturday, excluding U.S. federal holidays) following payment confirmation. Custom or personalized candle orders may require an additional 1–2 business days for production by our manufacturing partners. Orders paid via ACH/Bank Transfer or Zelle are processed once funds clear.",
          ],
        },
        {
          title: "2. Shipping Rates & Free Shipping Threshold",
          bullets: [
            "Free Standard U.S. Shipping ($50+ Orders): Orders totaling $50.00 or more (before tax and after discounts) qualify for free standard shipping within the contiguous United States.",
            "Orders Below $50.00: Orders below the $50.00 threshold carry a flat $30.00 shipping and protective packaging fee, clearly displayed in your cart and at checkout prior to payment.",
            "Estimated Transit Times: Standard U.S. shipping typically arrives within 3–7 business days via USPS, UPS, or FedEx after dispatch.",
          ],
        },
        {
          title: "3. Warm-Weather Soy Candle Care & Tracking",
          body: [
            "Once your order ships, you will receive a tracking number via email (and via SMS from 1-888-554-4521 if you opted in). During warm summer months, we recommend retrieving delivered packages promptly from outdoor mailboxes or porches to prevent natural soy wax softening.",
          ],
        },
        {
          title: "4. Damaged or Lost Shipments",
          body: [
            "Every candle jar is packed with protective cushioning. If your candle arrives cracked, shattered, or damaged in transit, please email support@comfortgiggles.com within 7 calendar days of delivery with clear photos of the shipping box and candle so we can send a free replacement or issue a full refund.",
          ],
        },
      ]}
    />
  );
}
