import "server-only";
import { createHmac } from "node:crypto";
import { jstDay } from "./domain";
import { CONVERSION_CHANNELS, CONVERSION_METRICS, type ConversionChannel, type ConversionMetric, type ConversionCounts, type ConversionRow } from "./conversion-contract";

const RETENTION = 95 * 86400;
function prefix() {
  // Test purchases must never appear in the production figures.
  return `conversion:v1:${process.env.VERCEL_ENV ?? "local"}:${process.env.BILLING_WEBHOOK_MODE ?? "off"}`;
}
function digest(value: string) {
  const secret = process.env.AUTH_SECRET ?? process.env.KV_REST_API_TOKEN;
  if (!secret) throw new Error("measurement unavailable");
  return createHmac("sha256", secret).update(`conversion:v1:${value}`).digest("hex");
}
async function pipeline(commands: string[][]): Promise<{ result: unknown }[] | null> {
  const url = process.env.KV_REST_API_URL?.replace(/\/+$/, ""), token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  try {
    const response = await fetch(`${url}/pipeline`, { method: "POST", cache: "no-store", signal: AbortSignal.timeout(1000), headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(commands) });
    if (!response.ok) return null;
    const data: unknown = await response.json();
    return Array.isArray(data) && data.length === commands.length && data.every(row => row && typeof row === "object" && !row.error && "result" in row) ? data : null;
  } catch { return null; }
}
// Atomic deduplication and increment: concurrent tabs/webhook retries cannot overcount.
export const CONVERSION_UPDATE = `
if ARGV[2] ~= '' and redis.call('SADD', KEYS[2], ARGV[2]) == 0 then return 0 end
if ARGV[2] ~= '' then redis.call('EXPIRE', KEYS[2], ARGV[4]) end
redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
redis.call('EXPIRE', KEYS[1], ARGV[3])
return 1`;

/** Only daily HMACs for people; checkout IDs are hashed separately for retry deduplication. */
export async function recordConversion(metric: ConversionMetric, channel: ConversionChannel, unique?: string, now = Date.now()): Promise<boolean> {
  try {
    if (!CONVERSION_METRICS.includes(metric) || !CONVERSION_CHANNELS.includes(channel)) return false;
    const day = jstDay(new Date(now)), base = prefix();
    const order = metric === "checkout_created" || metric === "payment_completed";
    const member = unique ? digest(`${order ? "order" : `${day}:${channel}`}:${unique}`) : "";
    const seen = `${base}:seen:${order ? "orders" : day}:${metric}`;
    const result = await pipeline([["EVAL", CONVERSION_UPDATE, "2", `${base}:${day}:${channel}`, seen, metric, member, String(RETENTION), String(order ? RETENTION : 2 * 86400)]]);
    return result?.[0]?.result === 0 || result?.[0]?.result === 1;
  } catch { return false; }
}
export function conversionChannel(request: Request): ConversionChannel { return request.headers.get("X-Kakomon-Native") === "ios" ? "ios" : "web"; }

/** The mapping contains only a channel, never a raw order/account/session ID. */
export async function saveConversionChannel(order: string, channel: ConversionChannel): Promise<void> {
  try { await pipeline([["SET", `${prefix()}:order:${digest(order)}`, channel, "EX", String(RETENTION), "NX"]]); } catch { /* optional measurement */ }
}
export async function readConversionChannel(order: string): Promise<ConversionChannel> {
  try {
    const result = await pipeline([["GET", `${prefix()}:order:${digest(order)}`]]);
    const value = result?.[0]?.result;
    return value === "ios" || value === "web" ? value : "unknown";
  } catch { return "unknown"; }
}
export async function readConversions(days = 14, now = Date.now()): Promise<{ available: boolean; rows: ConversionRow[] }> {
  const unavailable = { available: false, rows: [] };
  if (!Number.isInteger(days) || days < 1 || days > 95) return unavailable;
  const rows: ConversionRow[] = Array.from({ length: days }, (_, i) => jstDay(new Date(now - i * 86400000))).flatMap(day => CONVERSION_CHANNELS.map(channel => ({ day, channel, measured: false, counts: Object.fromEntries(CONVERSION_METRICS.map(m => [m, 0])) as ConversionCounts })));
  const payload = await pipeline(rows.map(row => ["HGETALL", `${prefix()}:${row.day}:${row.channel}`]));
  if (!payload) return unavailable;
  for (let i = 0; i < rows.length; i++) {
    const fields = payload[i].result;
    if (!Array.isArray(fields) || fields.length % 2) return unavailable;
    rows[i].measured = fields.length > 0;
    for (let j = 0; j < fields.length; j += 2) {
      const metric = fields[j], value = fields[j + 1];
      if (!CONVERSION_METRICS.includes(metric) || !/^(0|[1-9]\d*)$/.test(String(value)) || !Number.isSafeInteger(Number(value))) return unavailable;
      rows[i].counts[metric as ConversionMetric] = Number(value);
    }
  }
  return { available: true, rows };
}
