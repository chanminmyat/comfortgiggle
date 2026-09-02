import "server-only";

import crypto from "node:crypto";

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
}

function readEnv(...names: string[]) {
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) return value;
  }
  return "";
}

export function getPortalBaseUrl() {
  return readEnv("BACKEND_PORTAL_BASE_URL", "PORTAL_BASE_URL");
}

export function getPortalApiToken() {
  return readEnv("BACKEND_PORTAL_API_TOKEN", "PORTAL_API_TOKEN");
}

export function getPortalToken() {
  return readEnv(
    "BACKEND_PORTAL_CHECKOUT_TOKEN",
    "BACKEND_PORTAL_PAYMENT_ACCOUNT_TOKEN",
    "BACKEND_PORTAL_API_TOKEN",
    "BACKEND_PORTAL_MERCHANT_TOKEN",
    "PORTAL_CHECKOUT_TOKEN",
    "PORTAL_ACCOUNT_TOKEN",
    "PORTAL_API_TOKEN",
    "PORTAL_MERCHANT_TOKEN",
  );
}

export function verifyPortalRequest({
  authorization,
  signature,
  rawBody,
}: {
  authorization?: string | null;
  signature?: string | null;
  rawBody: string;
}) {
  const token = getPortalToken();
  if (!token) {
    return { ok: false, error: "Missing checkout token" };
  }

  const bearer = String(authorization || "").replace(/^Bearer\s+/i, "").trim();
  if (bearer && safeEqual(bearer, token)) return { ok: true };

  const receivedSignature = String(signature || "").trim();
  if (receivedSignature) {
    const expectedSignature = crypto.createHmac("sha256", token).update(rawBody).digest("hex");
    if (safeEqual(receivedSignature, expectedSignature)) return { ok: true };
  }

  return { ok: false, error: "Unauthorized checkout request" };
}
