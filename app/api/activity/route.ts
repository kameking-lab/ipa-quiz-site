import { activityBody, recordActivity } from "@/lib/analytics/activity";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bots = /bot|crawler|spider|slurp|crawl|headless|lighthouse|preview|facebookexternalhit|embedly|monitor|curl|wget|python|httpclient|go-http/i;
const buckets = new Map<string, { count: number; reset: number }>();
const response = (status: number) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent");
  if (!ua || bots.test(ua)) return response(204);
  const site = request.headers.get("sec-fetch-site"), origin = request.headers.get("origin");
  if ((site && site !== "same-origin") || (origin && origin !== new URL(request.url).origin)) return response(403);
  const now = Date.now(), ip = getClientIp(request);
  for (const [key, bucket] of buckets) if (bucket.reset <= now) buckets.delete(key);
  const bucket = buckets.get(ip) ?? { count: 0, reset: now + 60_000 };
  if (!buckets.has(ip) && buckets.size >= 5000) return response(429);
  buckets.set(ip, bucket);
  if (++bucket.count > 120) return response(429);
  let parsed;
  try {
    const text = await request.text();
    if (text.length > 12000) return response(413);
    parsed = activityBody.safeParse(JSON.parse(text));
  } catch { return response(400); }
  if (!parsed.success) return response(400);
  return response(await recordActivity(parsed.data.events, now) ? 204 : 503);
}
