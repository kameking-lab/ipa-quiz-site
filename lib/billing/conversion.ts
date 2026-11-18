import "server-only";
import { createHmac } from "node:crypto";
import { jstDay } from "./domain";
import { retentionCache } from "@/lib/kv/retention";
import { CONVERSION_CHANNELS, CONVERSION_METRICS, type ClientConversion, type ConversionChannel, type ConversionMetric, type ConversionCounts, type ConversionRow } from "./conversion-contract";

const RETENTION = 95 * 86400;
export const CONVERSION_VISITOR_MINUTE_LIMIT = 120;
export const CONVERSION_GLOBAL_MINUTE_LIMIT = 1_000;
const retention = retentionCache();
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
if ARGV[7] ~= '' then
  local total = tonumber(redis.call('HGET', KEYS[3], 'total') or '0')
  if total >= tonumber(ARGV[9]) then return -1 end
  local visitor = redis.call('HINCRBY', KEYS[3], ARGV[7], 1)
  if visitor > tonumber(ARGV[8]) then return -1 end
  if redis.call('HINCRBY', KEYS[3], 'total', 1) == 1 then redis.call('EXPIRE', KEYS[3], 120) end
end
if ARGV[2] ~= '' and redis.call('SADD', KEYS[2], ARGV[2]) == 0 then return 0 end
if ARGV[2] ~= '' and ARGV[6] == '1' then redis.call('EXPIRE', KEYS[2], ARGV[4]) end
redis.call('HINCRBY', KEYS[1], ARGV[1], 1)
if ARGV[5] == '1' then redis.call('EXPIRE', KEYS[1], ARGV[3]) end
return 1`;

type WriteResult = "ok" | "limited" | "unavailable";

async function writeConversion(metric: ConversionMetric, channel: ConversionChannel, unique: string | undefined, now: number, network?: string): Promise<WriteResult> {
  try {
    if (!CONVERSION_METRICS.includes(metric) || !CONVERSION_CHANNELS.includes(channel)) return "unavailable";
    const day = jstDay(new Date(now)), base = prefix();
    const order = metric === "checkout_created" || metric === "payment_completed";
    const member = unique ? digest(`${order ? "order" : `${day}:${channel}`}:${unique}`) : "";
    // A shared order set with a refreshed TTL would retain old members forever
    // under steady traffic. Each order gets its own fixed-lifetime marker.
    const seen = order ? `${base}:seen:order:${metric}:${member}` : `${base}:seen:${day}:${metric}`;
    const aggregate = `${base}:${day}:${channel}`;
    const storeUrl = process.env.KV_REST_API_URL?.replace(/\/+$/, "");
    const aggregateCache = `${storeUrl}|${aggregate}`, seenCache = `${storeUrl}|${seen}`;
    const refreshAggregate = retention.needsRefresh(aggregateCache);
    const refreshSeen = !!member && retention.needsRefresh(seenCache);
    const minute = Math.floor(now / 60_000);
    const limitKey = network === undefined ? [] : [`${base}:rate:${minute}`];
    const visitor = network === undefined ? "" : digest(`rate:${minute}:${network}`);
    // Use the existing write to enforce shared admission. Like the other fixed
    // windows, the bucket gets a TTL only on its first admitted request.
    const result = await pipeline([["EVAL", CONVERSION_UPDATE, String(2 + limitKey.length), aggregate, seen, ...limitKey, metric, member,
      String(RETENTION), String(order ? RETENTION : 2 * 86400), refreshAggregate ? "1" : "0", refreshSeen ? "1" : "0",
      visitor, String(CONVERSION_VISITOR_MINUTE_LIMIT), String(CONVERSION_GLOBAL_MINUTE_LIMIT)]]);
    if (result?.[0]?.result === 1) {
      if (refreshAggregate) retention.confirm(aggregateCache);
      if (refreshSeen) retention.confirm(seenCache);
    }
    if (result?.[0]?.result === -1) return "limited";
    return result?.[0]?.result === 0 || result?.[0]?.result === 1 ? "ok" : "unavailable";
  } catch { return "unavailable"; }
}

/** Only daily HMACs for people; checkout IDs are hashed separately for retry deduplication. */
export async function recordConversion(metric: ConversionMetric, channel: ConversionChannel, unique?: string, now = Date.now()): Promise<boolean> {
  return await writeConversion(metric, channel, unique, now) === "ok";
}

export function recordClientConversion(event: ClientConversion, channel: ConversionChannel, unique: string | undefined, now: number, network: string): Promise<WriteResult> {
  return writeConversion(event, channel, unique, now, network);
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
