import { NextResponse } from "next/server";
import { fetchFunnelData, type RangeDays } from "@/lib/admin/funnel/posthog";
import type { FunnelResponse } from "@/lib/admin/funnel/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CacheEntry {
  expiresAt: number;
  payload: FunnelResponse;
}

const cache = new Map<string, CacheEntry>();

function parseRange(raw: string | null): RangeDays {
  const n = Number(raw);
  if (n === 1 || n === 7 || n === 30) return n;
  return 7;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const range = parseRange(url.searchParams.get("days"));
  const cacheKey = String(range);
  const now = Date.now();

  const hit = cache.get(cacheKey);
  if (hit && hit.expiresAt > now) {
    return NextResponse.json(hit.payload);
  }

  const payload = await fetchFunnelData(range);
  cache.set(cacheKey, { expiresAt: now + CACHE_TTL_MS, payload });

  if (cache.size > 8) {
    for (const [k, v] of cache) if (v.expiresAt <= now) cache.delete(k);
  }

  return NextResponse.json(payload);
}
