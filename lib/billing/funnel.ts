import "server-only";
import { createHmac } from "node:crypto";
import { jstDay } from "./domain";
import { FUNNEL_EVENTS, type FunnelEvent } from "./funnel-events";

export { FUNNEL_EVENTS, CLIENT_FUNNEL_EVENTS, isClientFunnelEvent, type FunnelEvent } from "./funnel-events";

const DAY_MS = 86_400_000;
/** Counts are kept for about three months; nothing older is needed to read the funnel. */
const RETENTION_SECONDS = 95 * 86400;

function kv() {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, ""), token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

/** One set per JST day and step. Its size is the number of distinct people (or Stripe sessions). */
export function funnelKey(day: string, event: FunnelEvent) {
  return `funnel:v1:${day}:${event}`;
}

/** Never stores the raw identifier: only a keyed hash that cannot be reversed or joined across days. */
export function funnelVisitor(raw: string, day: string) {
  const secret = process.env.AUTH_SECRET ?? process.env.KV_REST_API_TOKEN ?? "funnel";
  return createHmac("sha256", secret).update(`funnel:v1:${day}:${raw}`).digest("hex").slice(0, 32);
}

async function pipeline(store: { url: string; token: string }, commands: string[][], timeout: number) {
  return fetch(`${store.url}/pipeline`, {
    method: "POST", cache: "no-store", signal: AbortSignal.timeout(timeout),
    headers: { Authorization: `Bearer ${store.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
}

/**
 * Count one funnel step for the JST day, once per visitor (idempotent: the same
 * visitor repeating the step on the same day does not add to the count).
 * Awaited by every caller: a serverless function is frozen after its response,
 * so an un-awaited write can be lost. Counting never breaks the user's action,
 * so failures resolve to false.
 */
export async function recordFunnel(event: FunnelEvent, visitor: string, now = Date.now()): Promise<boolean> {
  if (!FUNNEL_EVENTS.includes(event) || !visitor) return false;
  const store = kv();
  if (!store) return false;
  const day = jstDay(new Date(now));
  const key = funnelKey(day, event);
  try {
    const response = await pipeline(store, [["SADD", key, funnelVisitor(visitor, day)], ["EXPIRE", key, String(RETENTION_SECONDS)]], 1500);
    return response.ok;
  } catch { return false; }
}

export type FunnelCounts = Record<FunnelEvent, number>;
export interface FunnelDay { day: string; counts: FunnelCounts }

export function funnelDays(days: number, now = Date.now()) {
  return Array.from({ length: days }, (_, i) => jstDay(new Date(now - i * DAY_MS)));
}

/** Read-only view for the admin route: one pipeline for every day and step. */
export async function readFunnel(days: number, now = Date.now()): Promise<{ available: boolean; days: FunnelDay[] }> {
  const list = funnelDays(days, now);
  const result: FunnelDay[] = list.map(day => ({ day, counts: Object.fromEntries(FUNNEL_EVENTS.map(e => [e, 0])) as FunnelCounts }));
  const store = kv();
  if (!store) return { available: false, days: result };
  const commands = list.flatMap(day => FUNNEL_EVENTS.map(event => ["SCARD", funnelKey(day, event)]));
  try {
    const response = await pipeline(store, commands, 3000);
    if (!response.ok) return { available: false, days: result };
    const payload: unknown = await response.json();
    if (!Array.isArray(payload) || payload.length !== commands.length) return { available: false, days: result };
    let i = 0;
    for (const day of result) for (const event of FUNNEL_EVENTS) {
      const item: unknown = payload[i++];
      const value = item && typeof item === "object" && "result" in item ? Number((item as { result: unknown }).result) : NaN;
      if (!Number.isSafeInteger(value) || value < 0) return { available: false, days: result };
      day.counts[event] = value;
    }
    return { available: true, days: result };
  } catch { return { available: false, days: result }; }
}
