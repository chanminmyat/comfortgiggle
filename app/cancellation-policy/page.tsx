import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function CancellationPolicyPage() {
  return (
    <PolicyPage
      title={"Cancellation Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"24-hour cancellation window prior to fulfillment/shipment, custom order exceptions, and 5–7 business day refund turnaround under 'COMFORT GIGGLES'."}
      sections={[
        {
          title: "1. 24-Hour Order Cancellation Window",
          body: [
            "Customers may request to cancel an order within 24 hours of placing the order, provided the order has not yet been processed, sent to our production/fulfillment partner, customized, or shipped.",
          ],
        },
        {
          title: "2. How to Request a Cancellation",
          body: [
            "To cancel an order immediately, email support@comfortgiggles.com or call 1-888-554-4521 (Monday – Saturday, 9:00 AM – 6:00 PM Eastern Time (ET) (Phone & Email); Sunday: Email Support Only) with your order number and full name.",
          ],
        },
        {
          title: "3. Orders Already Processed or Shipped",
          body: [
            "Once an order has entered fulfillment or been handed to a shipping carrier, it can no longer be canceled. Customers may instead follow our Returns & Exchanges Policy once the package arrives.",
          ],
        },
        {
          title: "4. Custom or Personalized Orders",
          body: [
            "Custom-scented, custom-labeled, personalized, or special-order candles cannot be canceled once production or fulfillment has begun.",
          ],
        },
        {
          title: "5. Refunds for Canceled Orders",
          body: [
            "Approved order cancellations are refunded in full to your original payment method (Visa, Mastercard, American Express, Discover, ACH / Bank Transfer, Zelle, and Wise) within 5–7 business days, appearing on your statement under \"COMFORT GIGGLES\".",
          ],
        },
      ]}
    />
  );
}
