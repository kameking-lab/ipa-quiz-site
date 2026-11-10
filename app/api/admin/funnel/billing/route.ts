import { NextResponse } from "next/server";
import { FUNNEL_EVENTS, readFunnel, readFunnelSources } from "@/lib/billing/funnel";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Read-only purchase funnel counts per JST day (distinct visitors per step).
 * Protected by the admin Basic auth in middleware.ts (/api/admin/:path*).
 * GET /api/admin/funnel/billing?days=14  (1–90, default 14)
 */
export async function GET(request: Request) {
  const raw = Number(new URL(request.url).searchParams.get("days") ?? 14);
  const days = Number.isInteger(raw) && raw >= 1 && raw <= 90 ? raw : 14;
  const [{ available, days: rows }, attribution] = await Promise.all([readFunnel(days), readFunnelSources(days)]);
  const totals = Object.fromEntries(FUNNEL_EVENTS.map(event => [event, rows.reduce((sum, row) => sum + row.counts[event], 0)]));
  return NextResponse.json({ available, timezone: "Asia/Tokyo", unit: "distinct visitors per day (checkout_completed: Stripe sessions)", steps: FUNNEL_EVENTS, totals, days: rows, attribution },
    { headers: { "Cache-Control": "no-store" } });
}
