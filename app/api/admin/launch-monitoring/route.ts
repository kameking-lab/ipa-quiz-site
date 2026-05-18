import { NextResponse } from "next/server";
import { fetchLaunchMonitoringData } from "@/lib/admin/launch-monitoring/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple in-memory 2-minute cache to avoid hammering PostHog/KV on frequent polls
let cached: { data: Awaited<ReturnType<typeof fetchLaunchMonitoringData>>; ts: number } | null =
  null;
const CACHE_TTL_MS = 2 * 60 * 1000;

export async function GET() {
  const now = Date.now();
  if (cached && now - cached.ts < CACHE_TTL_MS) {
    return NextResponse.json({ ...cached.data, cachedAt: new Date(cached.ts).toISOString() });
  }
  const data = await fetchLaunchMonitoringData();
  cached = { data, ts: now };
  return NextResponse.json(data);
}
