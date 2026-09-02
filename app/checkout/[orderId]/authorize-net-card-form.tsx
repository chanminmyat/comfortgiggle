"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";

type AuthorizeNetConfig = {
  apiLoginId: string;
  clientKey: string;
  environment: "sandbox" | "production";
};

type AcceptOpaqueData = {
  dataDescriptor: string;
  dataValue: string;
};

type AcceptResponse = {
  messages?: {
    resultCode?: string;
    message?: Array<{ code?: string; text?: string }>;
  };
  opaqueData?: AcceptOpaqueData;
};

declare global {
  interface Window {
    Accept?: {
      dispatchData: (
        secureData: unknown,
        callback: (response: AcceptResponse) => void,
      ) => void;
    };
  }
}

const SCRIPT_IDS = {
  sandbox: "authorizenet-accept-js-sandbox",
  production: "authorizenet-accept-js-production",
};

const SCRIPT_URLS = {
  sandbox: "https://jstest.authorize.net/v1/Accept.js",
  production: "https://js.authorize.net/v1/Accept.js",
};

function waitForAcceptJs(timeoutMs = 10000) {
  return new Promise<void>((resolve, reject) => {
    const startedAt = Date.now();
    const checkReady = () => {
      if (window.Accept?.dispatchData) {
        resolve();
        return;
      }
      if (Date.now() - startedAt >= timeoutMs) {
        reject(new Error("Authorize.Net Accept.js loaded, but the card tokenizer did not initialize."));
        return;
      }
      window.setTimeout(checkReady, 100);
    };
    checkReady();
  });
}

function loadAcceptJs(environment: "sandbox" | "production") {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Accept?.dispatchData) return Promise.resolve();

  const scriptId = SCRIPT_IDS[environment];
  const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (existingScript) {
    return new Promise<void>((resolve, reject) => {
      if (window.Accept?.dispatchData) {
        resolve();
        return;
      }
      existingScript.addEventListener("load", () => {
        waitForAcceptJs().then(resolve).catch(reject);
      }, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Authorize.Net Accept.js.")), { once: true });
      waitForAcceptJs().then(resolve).catch(reject);
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = SCRIPT_URLS[environment];
    script.async = true;
    script.onload = () => {
      waitForAcceptJs().then(resolve).catch(reject);
    };
    script.onerror = () => reject(new Error("Failed to load Authorize.Net Accept.js."));
    document.body.appendChild(script);
  });
}

function getAcceptError(response: AcceptResponse) {
  const messages = response.messages?.message || [];
  return messages.map((message) => message.text || message.code).filter(Boolean).join(" ") || "Unable to tokenize this card.";
}

function parseExpiry(value: string) {
  const cleaned = value.replace(/\s+/g, "");
  const match = cleaned.match(/^(\d{1,2})\/?(\d{2}|\d{4})$/);
  if (!match) return null;
  const month = match[1].padStart(2, "0");
  const year = match[2].length === 2 ? "20" + match[2] : match[2];
  const monthNumber = Number(month);
  if (monthNumber < 1 || monthNumber > 12) return null;
  return { month, year };
}

function formatCardNumber(value: string) {
  return value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return digits.slice(0, 2) + "/" + digits.slice(2);
}

export function AuthorizeNetCardForm({
  orderId,
  config,
  statementDescriptor,
}: {
  orderId: string;
  config: AuthorizeNetConfig;
  statementDescriptor: string;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [descriptorAccepted, setDescriptorAccepted] = useState(false);

  const hasConfig = !!config.apiLoginId && !!config.clientKey;
  const environment = config.environment === "production" ? "production" : "sandbox";
  const cardPreview = useMemo(() => cardNumber || "0000 0000 0000 0000", [cardNumber]);

  useEffect(() => {
    let cancelled = false;
    async function initialize() {
      if (!hasConfig) {
        setErrorMessage("Authorize.Net public keys are not configured on this website.");
        return;
      }
      try {
        await loadAcceptJs(environment);
        if (!cancelled) {
          setIsReady(true);
          setErrorMessage("");
        }
      } catch (error) {
        if (!cancelled) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load Authorize.Net card form.");
        }
      }
    }
    void initialize();
    return () => {
      cancelled = true;
    };
  }, [environment, hasConfig]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!descriptorAccepted) {
      setErrorMessage("Please confirm the statement descriptor before continuing.");
      return;
    }

    const expiryParts = parseExpiry(expiry);
    if (!expiryParts) {
      setErrorMessage("Use a valid expiry date like 12/27.");
      return;
    }
    if (!window.Accept?.dispatchData) {
      setErrorMessage("Authorize.Net script is not ready yet.");
      return;
    }

    try {
      setIsProcessing(true);
      const tokenResponse = await new Promise<AcceptResponse>((resolve, reject) => {
        window.Accept?.dispatchData(
          {
            authData: {
              clientKey: config.clientKey,
              apiLoginID: config.apiLoginId,
            },
            cardData: {
              cardNumber: cardNumber.replace(/\s+/g, ""),
              month: expiryParts.month,
              year: expiryParts.year,
              cardCode: cvv.trim(),
            },
          },
          (response) => {
            if (response.messages?.resultCode === "Error") {
              reject(new Error(getAcceptError(response)));
              return;
            }
            resolve(response);
          },
        );
      });

      const opaqueData = tokenResponse.opaqueData;
      if (!opaqueData?.dataDescriptor || !opaqueData?.dataValue) {
        throw new Error("Authorize.Net token was not returned.");
      }

      const paymentResponse = await fetch("/api/create-authorize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, opaqueData }),
      });
      const paymentPayload = (await paymentResponse.json().catch(() => ({}))) as {
        error?: string;
        thankYouUrl?: string;
      };

      if (!paymentResponse.ok || !paymentPayload.thankYouUrl) {
        throw new Error(paymentPayload.error || "Unable to process Authorize.Net payment.");
      }

      window.location.href = paymentPayload.thankYouUrl;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to process Authorize.Net payment.");
      setIsProcessing(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-bone/15 bg-soot/50 p-4">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-bone/50">
          <span>Card Payment</span>
          <span>{environment === "production" ? "Live" : "Sandbox"}</span>
        </div>
        <div className="mt-5 break-words text-lg font-semibold tracking-[0.08em] text-bone">
          {cardPreview}
        </div>
        <div className="mt-3 text-sm font-semibold text-bone/60">
          Expiry {expiry || "MM/YY"}
        </div>
      </div>

      <label className="block text-sm font-semibold text-bone">
        Card number
        <input
          inputMode="numeric"
          autoComplete="cc-number"
          value={cardNumber}
          onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
          disabled={!isReady || isProcessing}
          className="mt-2 w-full border border-bone/20 bg-soot px-4 py-3 text-sm font-medium text-bone outline-none transition placeholder:text-bone/40 focus:border-ember disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="4111 1111 1111 1111"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block text-sm font-semibold text-bone">
          Expiry
          <input
            inputMode="numeric"
            autoComplete="cc-exp"
            value={expiry}
            onChange={(event) => setExpiry(formatExpiry(event.target.value))}
            disabled={!isReady || isProcessing}
            className="mt-2 w-full border border-bone/20 bg-soot px-4 py-3 text-sm font-medium text-bone outline-none transition placeholder:text-bone/40 focus:border-ember disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="12/27"
          />
        </label>
        <label className="block text-sm font-semibold text-bone">
          CVV
          <input
            inputMode="numeric"
            autoComplete="cc-csc"
            value={cvv}
            onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
            disabled={!isReady || isProcessing}
            className="mt-2 w-full border border-bone/20 bg-soot px-4 py-3 text-sm font-medium text-bone outline-none transition placeholder:text-bone/40 focus:border-ember disabled:cursor-not-allowed disabled:opacity-60"
            placeholder="123"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 border border-bone/15 bg-soot/50 px-4 py-3 text-sm font-medium leading-6 text-bone/70">
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
        type="submit"
        disabled={!isReady || isProcessing || !descriptorAccepted}
        className="inline-flex w-full items-center justify-center bg-ember px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-soot transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isProcessing ? "Processing..." : isReady ? "Pay Now" : "Loading card form..."}
      </button>

      {errorMessage ? (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
