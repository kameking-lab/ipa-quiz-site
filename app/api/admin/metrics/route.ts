import { NextRequest, NextResponse } from "next/server";
import { fetchMetrics } from "@/lib/admin/metrics-posthog";
import type { MetricsPeriod, MetricsResponse } from "@/lib/admin/metrics-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 5 * 60 * 1000;
const ALLOWED_PERIODS: MetricsPeriod[] = ["24h", "7d", "30d", "90d"];

interface CacheEntry {
  expiresAt: number;
  data: MetricsResponse;
}

const cache = new Map<MetricsPeriod, CacheEntry>();

function parsePeriod(raw: string | null): MetricsPeriod {
  if (raw && (ALLOWED_PERIODS as string[]).includes(raw)) {
    return raw as MetricsPeriod;
  }
  return "7d";
}

export async function GET(req: NextRequest) {
  const period = parsePeriod(req.nextUrl.searchParams.get("period"));
  const now = Date.now();
  const cached = cache.get(period);
  if (cached && cached.expiresAt > now) {
    return NextResponse.json(cached.data, {
      headers: {
        "x-metrics-cache": "hit",
        "cache-control": "private, max-age=300",
      },
    });
  }

  const data = await fetchMetrics(period);
  cache.set(period, { expiresAt: now + CACHE_TTL_MS, data });
  return NextResponse.json(data, {
    headers: {
      "x-metrics-cache": "miss",
      "cache-control": "private, max-age=300",
    },
  });
}
