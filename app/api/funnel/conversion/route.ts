import { CLIENT_CONVERSIONS, GUEST_ANSWER_HANDLED, type ClientConversion } from "@/lib/billing/conversion-contract";
import { CONVERSION_GLOBAL_MINUTE_LIMIT, CONVERSION_VISITOR_MINUTE_LIMIT, conversionChannel, recordClientConversion } from "@/lib/billing/conversion";
import { billingConfig } from "@/lib/billing/config";
import { monthlyConfig, monthlySelected } from "@/lib/billing/subscription/config";
import { clientNetwork, guestRealm, readGuestCookie } from "@/lib/billing/guest-practice";
import { optionalBillingIdentity } from "@/lib/billing/runtime";
import { getClientIp } from "@/lib/rate-limit/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const bots = /bot|crawler|spider|slurp|headless|lighthouse|preview|monitor|curl|wget|python/i;
const localVisitors = new Map<string, number>();
let localMinute = -1;
let localTotal = 0;
const reply = (status: number, guestHandled = false) => new Response(null, { status, headers: {
  "Cache-Control": "no-store", ...(guestHandled ? { [GUEST_ANSWER_HANDLED]: "1" } : {}),
} });

function sameSiteSource(request: Request): boolean {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const expected = new URL(request.url).origin;
  const origin = request.headers.get("origin");
  if (origin !== null) return origin === expected;
  const referer = request.headers.get("referer");
  return !!referer && URL.parse(referer)?.origin === expected;
}

export async function POST(request: Request) {
  const ua = request.headers.get("user-agent");
  const channel = conversionChannel(request);
  if ((!ua && channel !== "ios") || (ua && bots.test(ua))) return reply(204);
  if (!sameSiteSource(request)) return reply(403);
  const now = Date.now(), network = clientNetwork(getClientIp(request));
  // Cheap local guard applies before any auth or shared storage work. The
  // atomic shared limits are enforced by the conversion write itself.
  const minute = Math.floor(now / 60_000);
  if (minute !== localMinute) {
    localMinute = minute;
    localTotal = 0;
    localVisitors.clear();
  }
  const count = localVisitors.get(network) ?? 0;
  if (count >= CONVERSION_VISITOR_MINUTE_LIMIT || localTotal >= CONVERSION_GLOBAL_MINUTE_LIMIT) return reply(429);
  localVisitors.set(network, count + 1);
  localTotal++;
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
      if (await optionalBillingIdentity()) return reply(204, true);
      const config = monthlySelected() ? monthlyConfig() : billingConfig();
      const guest = readGuestCookie(request, guestRealm(config.mode, config.sourceInstance), now);
      if (!guest) return reply(204);
      unique = `guest:${guest}`;
    } catch { return reply(204); }
  }
  const result = await recordClientConversion(event, channel, unique, now, network);
  if (result === "limited") return reply(429);
  if (result === "unavailable") return reply(503);
  return reply(204, event === "guest_answered");
}
