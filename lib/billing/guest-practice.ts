import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { BillingError, jstDay } from "./domain";

const COOKIE = "practice_guest";
const MAX_AGE = 30 * 86400;
const DAY = 86400000;
export interface GuestSnapshot { day: string; ids: string[] }
function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value) throw new BillingError("billing_unavailable", 503);
  return value;
}
function mac(label: string, value: string) {
  return createHmac("sha256", secret()).update(`practice:${label}:v1:${value}`).digest("hex");
}

// ---- Network + device bucket -------------------------------------------------
// Clearing cookies, a private window or another browser issues a fresh guest
// cookie. The daily free quota is therefore also counted per "network + device
// class" bucket. The bucket is an HMAC whose key is rotated every JST day, so it
// cannot be reversed to the client IP / User-Agent nor linked across days. The
// raw IP and User-Agent are never stored, logged or sent to KV.

/** Normalises a client address to its network: the IPv4 address, or the IPv6 /64 prefix. */
export function clientNetwork(raw: string | null | undefined): string {
  let value = (raw ?? "").trim().toLowerCase();
  if (!value || value.length > 100) return "unknown";
  if (value.startsWith("[")) {
    const end = value.indexOf("]");
    if (end < 0) return "unknown";
    value = value.slice(1, end);
  }
  const v4 = /^(?:::ffff:)?(\d{1,3}(?:\.\d{1,3}){3})(?::\d{1,5})?$/.exec(value);
  if (v4) return v4[1].split(".").every(x => Number(x) <= 255) ? `v4:${v4[1]}` : "unknown";
  value = value.replace(/%.*$/, "");
  if (!/^[0-9a-f:]+$/.test(value) || !value.includes(":")) return "unknown";
  const halves = value.split("::");
  if (halves.length > 2) return "unknown";
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 2 ? missing < 1 : missing !== 0) return "unknown";
  const groups = [...head, ...Array<string>(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  if (!groups.every(g => /^[0-9a-f]{1,4}$/.test(g))) return "unknown";
  // Privacy extensions rotate the interface ID freely; the /64 is the line.
  return `v6:${groups.slice(0, 4).map(g => parseInt(g, 16).toString(16)).join(":")}`;
}

/** Device type, OS and browser from a User-Agent, keeping only major versions. */
export function deviceClass(userAgent: string | null | undefined): string {
  const ua = (userAgent ?? "").slice(0, 512);
  const major = (re: RegExp) => re.exec(ua)?.[1] ?? "";
  const type = /bot|crawl|spider|slurp|mediapartners/i.test(ua) ? "bot"
    : /ipad|tablet|kindle|silk/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua)) ? "tablet"
    : /mobi|iphone|ipod|android/i.test(ua) ? "mobile" : "desktop";
  const os = /iphone|ipad|ipod/i.test(ua) ? `ios${major(/ OS (\d+)[_.]/i)}`
    : /android/i.test(ua) ? `android${major(/android (\d+)/i)}`
    : /windows/i.test(ua) ? "windows"
    : /cros/i.test(ua) ? "chromeos"
    : /macintosh|mac os x/i.test(ua) ? "macos"
    : /linux/i.test(ua) ? "linux" : "other";
  const browser = /edg(?:e|a|ios)?\//i.test(ua) ? `edge${major(/edg(?:e|a|ios)?\/(\d+)/i)}`
    : /samsungbrowser\//i.test(ua) ? `samsung${major(/samsungbrowser\/(\d+)/i)}`
    : /opr\/|opera/i.test(ua) ? `opera${major(/opr\/(\d+)/i)}`
    : / line\//i.test(ua) ? "line"
    : /fxios\/|firefox\//i.test(ua) ? `firefox${major(/(?:fxios|firefox)\/(\d+)/i)}`
    : /crios\/|chrome\//i.test(ua) ? `chrome${major(/(?:crios|chrome)\/(\d+)/i)}`
    : /version\/\d+.*safari\//i.test(ua) ? `safari${major(/version\/(\d+)/i)}`
    : /applewebkit/i.test(ua) ? "webview" : "other";
  return `${type}/${os}/${browser}`;
}

function requestNetwork(request: Request) {
  // Vercel overwrites both headers with the connecting client's address.
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0];
  return clientNetwork(forwarded?.trim() ? forwarded : request.headers.get("x-real-ip"));
}

/** Irreversible per-day bucket of (realm, network, device class). */
export function guestDeviceKey(request: Request, realm: string, day: string): string {
  const daySalt = createHmac("sha256", secret()).update(`practice:device-salt:v1:${day}`).digest();
  return createHmac("sha256", daySalt)
    .update(`${realm}\n${requestNetwork(request)}\n${deviceClass(request.headers.get("user-agent"))}`).digest("hex");
}
export function guestCookie(realm: string, now = Date.now()) {
  const data = `${randomUUID()}.${Math.floor(now / 1000)}`;
  return `${data}.${mac(`cookie:${realm}`, data)}`;
}
export function readGuestCookie(request: Request, realm: string, now = Date.now()): string | null {
  const raw = request.headers.get("cookie")?.split(";").map(x => x.trim()).find(x => x.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!raw) return null;
  const match = /^([0-9a-f-]{36})\.(\d{1,12})\.([0-9a-f]{64})$/.exec(raw);
  if (!match) return null;
  const issued = Number(match[2]);
  if (!Number.isSafeInteger(issued) || issued > Math.floor(now / 1000) || issued + MAX_AGE <= Math.floor(now / 1000)) return null;
  const expected = Buffer.from(mac(`cookie:${realm}`, `${match[1]}.${match[2]}`), "hex");
  const actual = Buffer.from(match[3], "hex");
  return timingSafeEqual(expected, actual) ? match[1] : null;
}
export function cookieHeader(value: string, secure: boolean) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE}${secure ? "; Secure" : ""}`;
}
export function resetAt(now: number) { return new Date((Math.floor((now + 9 * 3600000) / DAY) + 1) * DAY - 9 * 3600000).toISOString(); }
export function guestRealm(mode: string, source: string | undefined) {
  const environment = process.env.VERCEL_ENV ?? (process.env.NODE_ENV === "production" ? "production" : "development");
  return `${environment}:${mode}:${source ?? "default"}`;
}
// A single Redis script serializes claim, quota, and minute burst operations. A
// claim freezes the day's set; retries by its owner receive the same snapshot.
export const GUEST_SCRIPT = `
local action, id, owner, limit, ttl = ARGV[1], ARGV[2], ARGV[3], tonumber(ARGV[4]), tonumber(ARGV[5])
local claimed = redis.call('HGET', KEYS[1], 'owner')
if action == 'recover' then
  if claimed and claimed == owner then return cjson.encode({status='claimed', ids=redis.call('SMEMBERS', KEYS[2])}) end
  return cjson.encode({status='none'})
end
if action == 'claim' then
  if claimed and claimed ~= owner then return cjson.encode({status='other'}) end
  if not claimed then
    redis.call('HSET', KEYS[1], 'owner', owner)
    redis.call('EXPIRE', KEYS[1], ttl)
    redis.call('EXPIRE', KEYS[2], ttl)
  end
  return cjson.encode({status='claimed', ids=redis.call('SMEMBERS', KEYS[2])})
end
if claimed then return cjson.encode({status='claimed'}) end
local count = redis.call('INCR', KEYS[3])
if count == 1 then redis.call('EXPIRE', KEYS[3], 60) end
if count > 60 then return cjson.encode({status='rate', retry=redis.call('TTL', KEYS[3])}) end
local used = redis.call('SCARD', KEYS[2])
local device = KEYS[4]
if redis.call('SISMEMBER', KEYS[2], id) == 1 then
  local seen = used
  if device then seen = math.max(used, redis.call('SCARD', device)) end
  return cjson.encode({status='ok', used=seen})
end
if used >= limit then return cjson.encode({status='limit', used=used}) end
-- The network+device bucket is shared by every guest cookie from the same line
-- and device class. A question already seen from it is not counted again.
local deviceUsed = 0
if device then
  local added = redis.call('SADD', device, id)
  deviceUsed = redis.call('SCARD', device)
  if added == 1 then
    if deviceUsed > limit then
      redis.call('SREM', device, id)
      return cjson.encode({status='limit', used=limit})
    end
    if deviceUsed == 1 then redis.call('EXPIRE', device, ttl) end
  end
end
redis.call('SADD', KEYS[2], id)
redis.call('EXPIRE', KEYS[2], ttl)
return cjson.encode({status='ok', used=math.max(used+1, deviceUsed)})
`;
interface ScriptResult { status: "ok" | "limit" | "rate" | "claimed" | "other" | "none"; used?: number; retry?: number; ids?: string[] }
async function run(realm: string, guest: string, day: string, action: "grant" | "claim" | "recover", id: string, owner: string, limit: number, now: number, device?: string): Promise<ScriptResult> {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, ""), token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new BillingError("billing_unavailable", 503);
  const base = `practice:v1:${mac("realm", realm)}:${day}:${mac("guest", guest)}`;
  // Retain each day's immutable snapshot for at least 24 hours after its JST end.
  const dayEnd = Date.parse(`${day}T00:00:00+09:00`) + DAY;
  const ttl = Math.max(1, Math.ceil((dayEnd + DAY - now) / 1000));
  const keys = [`${base}:claim`, `${base}:ids`, `${base}:minute`];
  if (device) keys.push(`practice:v1:${mac("realm", realm)}:${day}:device:${device}:ids`);
  let response: Response;
  try {
    response = await fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(["EVAL", GUEST_SCRIPT, String(keys.length), ...keys, action, id, owner, String(limit), String(ttl)]), signal: AbortSignal.timeout(1500), cache: "no-store" });
    if (!response.ok) throw new Error("KV response");
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("result" in payload) || typeof payload.result !== "string") throw new Error("KV result");
    const result: unknown = JSON.parse(payload.result);
    if (!result || typeof result !== "object" || !("status" in result)) throw new Error("KV result");
    const r = result as ScriptResult;
    const allowed: Record<typeof action, readonly string[]> = {
      grant: ["ok", "limit", "rate", "claimed"], claim: ["claimed", "other"], recover: ["claimed", "none"],
    };
    if (!allowed[action].includes(r.status)) throw new Error("KV action result");
    // Redis cjson represents an empty Lua table as an object on some versions.
    if (action !== "grant" && r.status === "claimed") {
      const ids: unknown = r.ids;
      if (ids !== null && typeof ids === "object" && !Array.isArray(ids) && Object.keys(ids).length === 0) r.ids = [];
      if (!Array.isArray(r.ids) || !r.ids.every(x => typeof x === "string" && x.length > 0 && x.length <= 160)) throw new Error("KV snapshot");
    }
    if ((r.status === "ok" || r.status === "limit") && (!Number.isSafeInteger(r.used) || r.used! < 0)) throw new Error("KV count");
    if (r.status === "rate" && (!Number.isSafeInteger(r.retry) || r.retry! < 0)) throw new Error("KV retry");
    return r;
  } catch { throw new BillingError("billing_unavailable", 503); }
}
/** Counts the day's free quota per guest cookie and per network+device bucket; either reaching the limit stops. */
export async function guestGrant(realm: string, guest: string, id: string, limit: number, now: number, request: Request) {
  const day = jstDay(new Date(now));
  return run(realm, guest, day, "grant", id, "", limit, now, guestDeviceKey(request, realm, day));
}
export async function guestClaim(realm: string, guest: string, user: string, limit: number, now: number): Promise<GuestSnapshot[]> {
  const owner = mac(`owner:${realm}`, user);
  const previous = jstDay(new Date(now - DAY)), today = jstDay(new Date(now));
  const recovered = await run(realm, guest, previous, "recover", "", owner, limit, now);
  const current = await run(realm, guest, today, "claim", "", owner, limit, now);
  const result: GuestSnapshot[] = [];
  if (recovered.status === "claimed") result.push({ day: previous, ids: recovered.ids! });
  if (current.status === "claimed") result.push({ day: today, ids: current.ids! });
  return result;
}
