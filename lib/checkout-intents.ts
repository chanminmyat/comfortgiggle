import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type CheckoutIntentItem = {
  itemId?: string;
  itemKind?: string;
  quantity?: number;
  itemTitle?: string;
  name?: string;
  title?: string;
  unitPriceCents?: number;
  lineTotalCents?: number;
  price?: number;
};

export type CheckoutIntent = {
  event?: string;
  orderId: string;
  merchantOrderId: string;
  visualOrderId?: string;
  paymentMethod?: string;
  processor?: string;
  statementDescriptor?: string;
  amount: number;
  currency: string;
  billingDetails?: Record<string, unknown> | null;
  shippingDetails?: Record<string, unknown> | null;
  items?: CheckoutIntentItem[];
  customerIp?: string | null;
  merchantSite?: string | null;
  suggestedCheckoutUrl?: string | null;
  receivedAt: string;
};

const dataDirectory = process.env.CHECKOUT_INTENTS_DIR || path.join(process.cwd(), "data");
const intentsFile = "checkout-intents.ndjson";
const maxStoredIntents = 100;
const maxIntentAgeMs = 2 * 24 * 60 * 60 * 1000;
const checkoutSiteKey =
  process.env.CHECKOUT_SITE_KEY?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.SITE_URL?.trim() ||
  "comfortgiggle";
const supabaseUrl =
  (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "")
    .trim()
    .replace(/\/$/, "");
const supabaseServiceRoleKey =
  (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    ""
  ).trim();
const supabaseTable = process.env.SUPABASE_CHECKOUT_INTENTS_TABLE?.trim() || "checkout_intents";

function shouldUseSupabase() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

function supabaseHeaders(extra?: HeadersInit) {
  return {
    apikey: supabaseServiceRoleKey,
    Authorization: `Bearer ${supabaseServiceRoleKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

function supabaseTableUrl(searchParams?: URLSearchParams) {
  const query = searchParams?.toString();
  return `${supabaseUrl}/rest/v1/${supabaseTable}${query ? `?${query}` : ""}`;
}

function normalizeOrderId(value: unknown) {
  return String(value ?? "").trim();
}

function normalizeRecord(payload?: Partial<CheckoutIntent> | null): CheckoutIntent | null {
  const merchantOrderId = normalizeOrderId(payload?.merchantOrderId);
  const visualOrderId = normalizeOrderId(payload?.visualOrderId);
  const orderId = normalizeOrderId(payload?.orderId) || merchantOrderId || visualOrderId;
  if (!orderId) return null;

  return {
    ...payload,
    orderId,
    merchantOrderId: merchantOrderId || orderId,
    statementDescriptor: normalizeOrderId(payload?.statementDescriptor),
    amount: Number(payload?.amount || 0),
    currency: normalizeOrderId(payload?.currency || "USD") || "USD",
    receivedAt: normalizeOrderId(payload?.receivedAt) || new Date().toISOString(),
  };
}

function parseIntentLine(line: string): CheckoutIntent | null {
  try {
    return normalizeRecord(JSON.parse(line) as Partial<CheckoutIntent>);
  } catch {
    return null;
  }
}

function recordIsCurrent(record: CheckoutIntent) {
  const receivedAt = new Date(record.receivedAt).getTime();
  if (!Number.isFinite(receivedAt)) return true;
  return Date.now() - receivedAt <= maxIntentAgeMs;
}

async function readFileRecords() {
  try {
    const raw = await readFile(path.join(dataDirectory, intentsFile), "utf8");
    return raw.split("\n").filter(Boolean).map(parseIntentLine).filter((record): record is CheckoutIntent => !!record);
  } catch (error: any) {
    if (error?.code !== "ENOENT") {
      console.error("Failed to read checkout intents", error);
    }
    return [];
  }
}

async function writeFileRecords(records: CheckoutIntent[]) {
  await mkdir(dataDirectory, { recursive: true });
  const targetPath = path.join(dataDirectory, intentsFile);
  const body = records.length ? records.map((record) => JSON.stringify(record)).join("\n") + "\n" : "";
  await writeFile(targetPath, body, "utf8");
}

async function cleanupSupabaseIntents() {
  const cutoff = new Date(Date.now() - maxIntentAgeMs).toISOString();
  const searchParams = new URLSearchParams({
    site_key: `eq.${checkoutSiteKey}`,
    expires_at: `lt.${cutoff}`,
  });
  const response = await fetch(supabaseTableUrl(searchParams), {
    method: "DELETE",
    headers: supabaseHeaders(),
  });

  if (!response.ok) {
    const rawText = await response.text();
    console.error("Failed to cleanup Supabase checkout intents", response.status, rawText.slice(0, 500));
  }
}

async function saveToSupabase(record: CheckoutIntent) {
  if (!shouldUseSupabase()) return false;

  const expiresAt = new Date(Date.now() + maxIntentAgeMs).toISOString();
  const searchParams = new URLSearchParams({
    on_conflict: "site_key,order_id",
  });
  const response = await fetch(supabaseTableUrl(searchParams), {
    method: "POST",
    headers: supabaseHeaders({
      Prefer: "resolution=merge-duplicates,return=minimal",
    }),
    body: JSON.stringify({
      site_key: checkoutSiteKey,
      order_id: record.orderId,
      merchant_order_id: record.merchantOrderId || record.orderId,
      visual_order_id: record.visualOrderId || "",
      payload: record,
      received_at: record.receivedAt,
      expires_at: expiresAt,
    }),
  });

  if (!response.ok) {
    const rawText = await response.text();
    throw new Error(`Supabase checkout intent save failed (${response.status}): ${rawText.slice(0, 500)}`);
  }

  cleanupSupabaseIntents().catch((cleanupError) => {
    console.error("Supabase checkout intent cleanup failed", cleanupError);
  });
  return true;
}

async function findInSupabase(orderId: string) {
  if (!shouldUseSupabase()) return null;

  const searchParams = new URLSearchParams({
    select: "payload",
    site_key: `eq.${checkoutSiteKey}`,
    or: `(order_id.eq.${orderId},merchant_order_id.eq.${orderId},visual_order_id.eq.${orderId})`,
    order: "received_at.desc",
    limit: "1",
  });
  const response = await fetch(supabaseTableUrl(searchParams), {
    method: "GET",
    headers: supabaseHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    const rawText = await response.text();
    throw new Error(`Supabase checkout intent lookup failed (${response.status}): ${rawText.slice(0, 500)}`);
  }

  const rows = (await response.json().catch(() => [])) as any[];
  return normalizeRecord(rows[0]?.payload as Partial<CheckoutIntent> | undefined);
}

export async function saveCheckoutIntent(payload: Omit<CheckoutIntent, "receivedAt">) {
  const record = normalizeRecord({ ...payload, receivedAt: new Date().toISOString() });
  if (!record) throw new Error("Checkout intent is missing an order ID.");

  if (await saveToSupabase(record)) return record;

  const records = (await readFileRecords())
    .filter((existing) => existing.orderId !== record.orderId)
    .filter(recordIsCurrent);
  records.push(record);
  await writeFileRecords(records.slice(-maxStoredIntents));
  return record;
}

export async function findCheckoutIntent(orderId: string) {
  const targetOrderId = normalizeOrderId(orderId);
  if (!targetOrderId) return null;

  const supabaseRecord = await findInSupabase(targetOrderId);
  if (supabaseRecord) return supabaseRecord;

  const records = (await readFileRecords()).reverse();
  for (const record of records) {
    if (
      record.orderId === targetOrderId ||
      record.merchantOrderId === targetOrderId ||
      record.visualOrderId === targetOrderId
    ) {
      return record;
    }
  }

  return null;
}
