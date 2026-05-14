import { NextResponse } from "next/server";
import {
  fetchFeatureBreakdown,
  fetchReferrerBreakdown,
  isPosthogStatsConfigured,
} from "@/lib/stats/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 30 * 60 * 1000; // 30m

interface CachedPayload {
  expiresAt: number;
  payload: Awaited<ReturnType<typeof buildPayload>>;
}
let cache: CachedPayload | null = null;

async function buildPayload() {
  if (!isPosthogStatsConfigured()) {
    return {
      configured: false as const,
      features: null,
      referrers: null,
    };
  }
  const [features, referrers] = await Promise.all([
    fetchFeatureBreakdown(),
    fetchReferrerBreakdown(),
  ]);
  return {
    configured: true as const,
    features,
    referrers,
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
