"use client";

import { useState } from "react";

export function PayNowButton({
  orderId,
  processor,
  statementDescriptor,
}: {
  orderId: string;
  processor: string;
  statementDescriptor: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [descriptorAccepted, setDescriptorAccepted] = useState(false);

  async function handlePayNow() {
    try {
      if (!descriptorAccepted) {
        setErrorMessage("Please confirm the statement descriptor before continuing.");
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      const endpoint = processor.toLowerCase() === "stripe"
        ? "/api/create-stripe-checkout"
        : "/api/create-square-checkout";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error || `Unable to start checkout.`);
      }

      window.location.href = payload.checkoutUrl;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : `Unable to start checkout.`);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <label className="mb-4 flex items-start gap-3 border border-bone/15 bg-soot/50 px-4 py-3 text-sm font-medium leading-6 text-bone/70">
        <input
          type="checkbox"
          checked={descriptorAccepted}
          onChange={(event) => setDescriptorAccepted(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-ember"
        />
        <span>
          I understand payment will appear on my statement as{" "}
          <strong className="text-bone">{statementDescriptor}</strong>.
        </span>
      </label>
      <button
        type="button"
        onClick={handlePayNow}
        disabled={isLoading || !descriptorAccepted}
        className="inline-flex w-full items-center justify-center bg-ember px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-soot transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Opening payment link..." : "Pay Now"}
      </button>
      {errorMessage ? (
        <p className="mt-4 border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
