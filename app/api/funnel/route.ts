import { isClientFunnelEvent, recordFunnel } from "@/lib/billing/funnel";
import { getClientIp } from "@/lib/rate-limit/server";
import { requestAttribution } from "@/lib/billing/attribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Crawlers, previews and automation never count as people in the funnel.
const BOT_UA = /bot|crawler|spider|slurp|crawl|headless|lighthouse|preview|facebookexternalhit|embedly|monitor|curl|wget|python|httpclient|go-http/i;
const MINUTE_LIMIT = 20;
const minute = new Map<string, { count: number; resetAt: number }>();

function limited(ip: string, now: number) {
  const bucket = minute.get(ip);
  if (!bucket || bucket.resetAt <= now) {
    if (minute.size > 5000) for (const [key, value] of minute) if (value.resetAt <= now) minute.delete(key);
    minute.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > MINUTE_LIMIT;
}

function crossSite(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return true;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try { return new URL(origin).host !== new URL(request.url).host && new URL(origin).host !== request.headers.get("host"); }
  catch { return true; }
}

/**
 * Anonymous funnel beacon. Body: {"event": "<client step>"} only. No personal
 * data is accepted or stored; the visitor is a daily keyed hash of the
 * practice cookie (or network address + browser) so a visitor counts once a day.
 */
export async function POST(request: Request) {
  const done = new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT_UA.test(ua) || crossSite(request)) return done;
  const now = Date.now();
  const ip = getClientIp(request);
  if (limited(ip, now)) return new Response(null, { status: 429, headers: { "Retry-After": "60" } });
  let event: unknown;
  try {
    const text = await request.text();
    if (text.length > 200) return new Response(null, { status: 413 });
    event = (JSON.parse(text) as { event?: unknown }).event;
  } catch { return new Response(null, { status: 400 }); }
  if (!isClientFunnelEvent(event)) return new Response(null, { status: 400 });
  const guest = request.headers.get("cookie")?.split(";").map(x => x.trim()).find(x => x.startsWith("practice_guest="))?.slice(15).split(".")[0];
  const visitor = guest && /^[0-9a-f-]{36}$/.test(guest) ? `guest:${guest}` : `net:${ip}:${ua}`;
  const attribution = requestAttribution(request);
  if (attribution) await recordFunnel(event, visitor, now, attribution);
  else await recordFunnel(event, visitor, now);
  return done;
}
