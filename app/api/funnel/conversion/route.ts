import { CLIENT_CONVERSIONS, type ClientConversion } from "@/lib/billing/conversion-contract";
import { conversionChannel, recordConversion } from "@/lib/billing/conversion";
import { billingConfig } from "@/lib/billing/config";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { guestRealm, readGuestCookie } from "@/lib/billing/guest-practice";
import { optionalBillingIdentity } from "@/lib/billing/runtime";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bots = /bot|crawler|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|python/i;
const buckets = new Map<string, { count: number; reset: number }>();
const reply = (status: number) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const ua = request.headers.get("user-agent");
  if ((!ua && conversionChannel(request) !== "ios") || (ua && bots.test(ua))) return reply(204);
  const site = request.headers.get("sec-fetch-site"), origin = request.headers.get("origin");
  const nativeOrigin = conversionChannel(request) === "ios" && origin === "capacitor://localhost";
  if (!nativeOrigin && ((site && site !== "same-origin") || (origin && origin !== new URL(request.url).origin))) return reply(403);
  const now = Date.now(), ip = getClientIp(request);
  for (const [key, value] of buckets) if (value.reset <= now) buckets.delete(key);
  const bucket = buckets.get(ip) ?? { count: 0, reset: now + 60000 };
  if (!buckets.has(ip) && buckets.size >= 5000) return reply(429);
  buckets.set(ip, bucket);
  if (++bucket.count > 120) return reply(429);
  let event: ClientConversion;
  try {
    const text = await request.text();
    if (text.length > 100) return reply(413);
    const body = JSON.parse(text);
    if (!body || Object.keys(body).length !== 1 || !CLIENT_CONVERSIONS.includes(body.event)) return reply(400);
    event = body.event;
  } catch { return reply(400); }
  let unique: string | undefined;
  if (event === "guest_answered") {
    try {
      if (await optionalBillingIdentity()) return reply(204);
      const config = monthlySelected() ? monthlyConfig() : billingConfig();
      const guest = readGuestCookie(request, guestRealm(config.mode, config.sourceInstance), now);
      if (!guest) return reply(204);
      unique = `guest:${guest}`;
    } catch { return reply(204); }
  }
  return reply(await recordConversion(event, conversionChannel(request), unique, now) ? 204 : 503);
}
