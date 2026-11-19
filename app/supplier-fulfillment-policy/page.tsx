import { PolicyPage } from "@/components/policy-page";
import { COMPANY } from "@/lib/company-info";

export default function SupplierFulfillmentPolicyPage() {
  return (
    <PolicyPage
      title={"Supplier & Fulfillment Policy"}
      effectiveDate={COMPANY.policyEffectiveDate}
      intro={"Governs third-party soy wax/fragrance suppliers, manufacturing/fulfillment partners, quality control, and vendor confidentiality for Comfort Giggles LLC."}
      sections={[
        {
          title: "1. Vetted Production & Fulfillment Partners",
          body: [
            "To source and ship 100% soy wax candles reliably across the United States, Comfort Giggles LLC works with vetted domestic fragrance houses, candle manufacturers, packaging suppliers, and fulfillment warehouses.",
          ],
        },
        {
          title: "2. Quality Standards & Ingredient Compliance",
          bullets: [
            "100% Soy Wax & Clean Fragrances: Suppliers and manufacturing partners must adhere to our material specifications, including 100% soy wax formulations, lead-free cotton/wood wicks, and IFRA-compliant phthalate-free fragrance oils.",
            "Batch Inspection: Production partners perform visual, weight, and packaging integrity checks prior to carrier handoff.",
          ],
        },
        {
          title: "3. Data Privacy & Vendor Confidentiality",
          body: [
            "Fulfillment partners receive only the shipping name, delivery address, and item SKU required to dispatch your order. Suppliers never have access to your credit card numbers, banking details, or SMS consent records. Comfort Giggles LLC remains fully accountable for your order from purchase to delivery.",
          ],
        },
      ]}
    />
  );
}
