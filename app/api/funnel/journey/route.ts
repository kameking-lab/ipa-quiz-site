import { journeyBody, recordJourney } from "@/lib/billing/journey";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bots = /bot|crawler|spider|slurp|crawl|headless|lighthouse|preview|facebookexternalhit|embedly|monitor|curl|wget|python|httpclient|go-http/i;
const buckets = new Map<string, { count: number; reset: number }>();
export async function POST(request: Request) {
  const done = () => new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  const ua = request.headers.get("user-agent");
  if (!ua || bots.test(ua)) return done();
  const site = request.headers.get("sec-fetch-site"), origin = request.headers.get("origin");
  if ((site && site !== "same-origin") || (origin && origin !== new URL(request.url).origin)) return done();
  const now = Date.now(), ip = getClientIp(request);
  // Same bound as the existing anonymous funnel endpoint. Network values stay in memory only.
  for (const [key, value] of buckets) if (value.reset <= now) buckets.delete(key);
  const bucket = buckets.get(ip) ?? { count: 0, reset: now + 60000 };
  buckets.set(ip, bucket);
  if (++bucket.count > 20) return new Response(null, { status: 429 });
  let parsed;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return new Response(null, { status: 413 });
    parsed = journeyBody.safeParse(JSON.parse(raw));
  } catch { return new Response(null, { status: 400 }); }
  if (!parsed.success) return new Response(null, { status: 400 });
  const body = parsed.data;
  if (body.changes.some(row => row.outcome === "purchased")) {
    if (!body.purchaseOrder) return new Response(null, { status: 400 });
    try {
      const { billingIdentity, billingRuntime } = await import("@/lib/billing/runtime");
      const { monthlySelected } = await import("@/lib/billing/subscription/config");
      const user = await billingIdentity();
      const service = monthlySelected() ? (await import("@/lib/billing/subscription/runtime")).monthlyRuntime().service : billingRuntime().service;
      const status = await service.status(user, body.purchaseOrder);
      if (!status.entitled || status.purchase?.id !== body.purchaseOrder || status.purchase.status !== "paid") return new Response(null, { status: 403 });
    } catch { return new Response(null, { status: 403 }); }
  }
  return await recordJourney(body, now) ? done() : new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
}
