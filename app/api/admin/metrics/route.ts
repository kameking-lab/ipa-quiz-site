import { NextResponse } from "next/server";
import { resolveRange } from "@/lib/admin/metrics/range";
import { fetchMetrics } from "@/lib/admin/metrics/posthog";
import type { MetricsRange } from "@/lib/admin/metrics/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const payload = await fetchMetrics(meta);
  return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
}
