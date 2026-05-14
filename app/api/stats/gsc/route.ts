import { NextResponse } from "next/server";
import {
  fetchGsc30dTotals,
  fetchGscDailyTrend,
  fetchGscTopQueries,
  isGscConfigured,
} from "@/lib/stats/gsc";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h

interface CachedPayload {
  expiresAt: number;
  payload: Awaited<ReturnType<typeof buildPayload>>;
}
let cache: CachedPayload | null = null;

async function buildPayload() {
  if (!isGscConfigured()) {
    return {
      configured: false as const,
      totals: null,
      trend: null,
      topQueries: null,
    };
  }
  const [totals, trend, topQueries] = await Promise.all([
    fetchGsc30dTotals(),
    fetchGscDailyTrend(90),
    fetchGscTopQueries(10),
  ]);
  return {
    configured: true as const,
    totals,
    trend,
    topQueries,
  };
}

export async function GET() {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return NextResponse.json({ ...cache.payload, cachedAt: new Date(cache.expiresAt - CACHE_TTL_MS).toISOString() });
  }
  const payload = await buildPayload();
  cache = { expiresAt: now + CACHE_TTL_MS, payload };
  return NextResponse.json({ ...payload, cachedAt: new Date(now).toISOString() });
}
