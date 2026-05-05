import { NextResponse } from "next/server";
import { resolveRange } from "@/lib/admin/metrics/range";
import { fetchMetrics } from "@/lib/admin/metrics/posthog";
import type { MetricsRange, MetricsResponse } from "@/lib/admin/metrics/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
  expiresAt: number;
  payload: MetricsResponse;
}

const cache = new Map<string, CacheEntry>();

function isMetricsRange(v: string | null): v is MetricsRange {
  return v === "today" || v === "7d" || v === "30d" || v === "mtd" || v === "custom";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawRange = url.searchParams.get("range");
  const range: MetricsRange = isMetricsRange(rawRange) ? rawRange : "7d";
  const customFrom = url.searchParams.get("from") ?? undefined;
  const customTo = url.searchParams.get("to") ?? undefined;

  const meta = resolveRange(range, customFrom, customTo);
  const cacheKey = `${meta.range}|${meta.from}|${meta.to}`;
  const now = Date.now();

  const hit = cache.get(cacheKey);
  if (hit && hit.expiresAt > now) {
    return NextResponse.json({ ...hit.payload, cachedAt: new Date(hit.expiresAt - CACHE_TTL_MS).toISOString() });
  }

  const payload = await fetchMetrics(meta);
  cache.set(cacheKey, { expiresAt: now + CACHE_TTL_MS, payload });

  if (cache.size > 32) {
    for (const [k, v] of cache) if (v.expiresAt <= now) cache.delete(k);
  }

  return NextResponse.json({ ...payload, cachedAt: new Date(now).toISOString() });
}
