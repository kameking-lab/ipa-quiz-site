import "server-only";
import { createHmac } from "node:crypto";
import { jstDay } from "./domain";
import { FUNNEL_EVENTS, type FunnelEvent } from "./funnel-events";
import { attributionQualification, normalizeAttribution, type FunnelAttribution } from "./attribution";

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
export async function recordFunnel(event: FunnelEvent, visitor: string, now = Date.now(), attribution?: FunnelAttribution | null): Promise<boolean> {
  if (!FUNNEL_EVENTS.includes(event) || !visitor) return false;
  const store = kv();
  if (!store) return false;
  const day = jstDay(new Date(now));
  const key = funnelKey(day, event);
  try {
    const commands = [["SADD", key, funnelVisitor(visitor, day)], ["EXPIRE", key, String(RETENTION_SECONDS)]];
    const touch = normalizeAttribution(attribution);
    if (touch) {
      const group = `${touch.utm_source}:${touch.utm_content}`;
      const groupKey = `${key}:source:${group}`;
      const index = `funnel:v1:${day}:sources`;
      commands.push(["SADD", groupKey, funnelVisitor(visitor, day)], ["EXPIRE", groupKey, String(RETENTION_SECONDS)],
        ["SADD", index, group], ["EXPIRE", index, String(RETENTION_SECONDS)]);
    }
    const response = await pipeline(store, commands, 1500);
    return response.ok;
  } catch { return false; }
}

/** Link the public labels to the order using a keyed digest; never retain user/order IDs in KV. */
function orderAttributionKey(order: string) { return `funnel:v1:order-source:${funnelVisitor(order, "order-source")}`; }
export async function saveOrderAttribution(order: string, attribution: FunnelAttribution | null): Promise<void> {
  const store = kv(), touch = normalizeAttribution(attribution);
  if (!store || !touch) return;
  try { await pipeline(store, [["SET", orderAttributionKey(order), JSON.stringify(touch), "EX", String(RETENTION_SECONDS), "NX"]], 1500); } catch { /* optional analytics */ }
}
export async function readOrderAttribution(order: string): Promise<FunnelAttribution | null> {
  const store = kv();
  if (!store || !order) return null;
  try {
    const response = await pipeline(store, [["GET", orderAttributionKey(order)]], 1500);
    if (!response.ok) return null;
    const payload = await response.json();
    return normalizeAttribution(JSON.parse(payload[0]?.result ?? "null"));
  } catch { return null; }
}

export interface FunnelSourceDay { day: string; utm_source: string; utm_content: string; qualification_slug: string; counts: FunnelCounts }
/** Bounded to 500 day/group rows per read. Global totals are always complete. */
export async function readFunnelSources(days: number, now = Date.now()): Promise<{ available: boolean; truncated: boolean; days: FunnelSourceDay[] }> {
  const store = kv(), list = funnelDays(days, now);
  const unavailable = { available: false, truncated: false, days: [] };
  if (!store) return unavailable;
  try {
    const response = await pipeline(store, list.map(day => ["SMEMBERS", `funnel:v1:${day}:sources`]), 3000);
    if (!response.ok) return unavailable;
    const payload: unknown = await response.json();
    if (!Array.isArray(payload) || payload.length !== days) return unavailable;
    let truncated = false;
    const rows: FunnelSourceDay[] = [];
    for (let i = 0; i < list.length; i++) {
      const groups: unknown = payload[i]?.result;
      if (!Array.isArray(groups) || !groups.every(g => typeof g === "string")) return unavailable;
      const remaining = 500 - rows.length;
      truncated ||= groups.length > remaining;
      for (const group of groups.sort().slice(0, remaining)) {
        const [utm_source, utm_content, extra] = group.split(":");
        const touch = normalizeAttribution({ utm_source, utm_content });
        if (!touch || extra || touch.utm_content !== utm_content) continue;
        rows.push({ day: list[i], ...touch, qualification_slug: attributionQualification(touch), counts: Object.fromEntries(FUNNEL_EVENTS.map(e => [e, 0])) as FunnelCounts });
      }
    }
    if (!rows.length) return { available: true, truncated, days: rows };
    {
      const commands = rows.flatMap(row => FUNNEL_EVENTS.map(event => ["SCARD", `${funnelKey(row.day, event)}:source:${row.utm_source}:${row.utm_content}`]));
      const result = await pipeline(store, commands, 3000);
      if (!result.ok) return unavailable;
      const counts: unknown = await result.json();
      if (!Array.isArray(counts) || counts.length !== commands.length) return unavailable;
      let index = 0;
      for (const row of rows) for (const event of FUNNEL_EVENTS) {
        const value = Number(counts[index++]?.result);
        if (!Number.isSafeInteger(value) || value < 0) return unavailable;
        row.counts[event] = value;
      }
    }
    return { available: true, truncated, days: rows };
  } catch { return unavailable; }
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
