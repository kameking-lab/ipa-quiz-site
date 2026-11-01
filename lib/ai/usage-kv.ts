import "server-only";
import { createHash } from "node:crypto";

const DAY_MS = 86_400_000;
const MAX_DATE_MS = 8_640_000_000_000_000;

/** The date and absolute expiration derive from the same instant/offset. No DST rules. */
export function usageWindow(subject: string, now: number, offsetMinutes: number) {
  if (typeof subject !== "string" || !subject.trim() || subject.length > 512
    || !Number.isSafeInteger(now) || now < 0 || now > MAX_DATE_MS
    || !Number.isInteger(offsetMinutes) || offsetMinutes < -720 || offsetMinutes > 840)
    throw new Error("invalid usage window");
  const offsetMs = offsetMinutes * 60_000;
  const day = Math.floor((now + offsetMs) / DAY_MS);
  const resetAt = (day + 1) * DAY_MS - offsetMs;
  if (!Number.isSafeInteger(day) || !Number.isSafeInteger(resetAt)
    || resetAt <= now || resetAt > MAX_DATE_MS) throw new Error("invalid usage window");
  // Escaping preserves distinct UTF-16 strings, including unpaired surrogates.
  const hash = createHash("sha256").update(JSON.stringify(subject)).digest("hex");
  return { key: `ai:usage:v1:${hash}:${day}`, resetAt };
}

// Single atomic admission across features/instances. Reject corrupt stored values,
// including fractional, negative and non-number values; nil alone means first use.
export const ADMIT_AI_USAGE_LUA = `
local function integer(raw)
  if type(raw) ~= 'string' or not string.match(raw, '^%d+$')
    or (#raw > 1 and string.sub(raw, 1, 1) == '0')
    or #raw > 16 or (#raw == 16 and raw > '9007199254740991') then return nil end
  return tonumber(raw)
end
if #KEYS ~= 1 or #ARGV ~= 2 or #KEYS[1] < 1 or #KEYS[1] > 1024 then
  return redis.error_reply('invalid AI usage arguments')
end
local limit = integer(ARGV[1])
local expiry = integer(ARGV[2])
if not limit or not expiry or expiry < 1 then
  return redis.error_reply('invalid AI usage arguments')
end
local raw = redis.call('GET', KEYS[1])
local count = 0
if raw then
  count = integer(raw)
  if not count then
    return redis.error_reply('invalid AI usage counter')
  end
end
if count >= limit then return {0, count} end
count = redis.call('INCR', KEYS[1])
redis.call('EXPIREAT', KEYS[1], ARGV[2])
return {1, count}
`;

export interface UsageAdmission { allowed: boolean; remaining: number; limit: number; resetAt: number }
export interface UsageStore {
  admit(subject: string, limit: number, offsetMinutes: number, now: number): Promise<UsageAdmission>;
}

function checkDeadline(signal: AbortSignal, deadline: number): void {
  signal.throwIfAborted();
  if (performance.now() >= deadline) throw new Error("usage store unavailable");
}

/** The monotonic check also stops immediate empty-chunk microtask starvation.
 * Neither mechanism can preempt synchronous CPU work; parsing stays byte-bounded.
 */
async function beforeDeadline<T>(operation: Promise<T>, signal: AbortSignal, deadline: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const aborted = () => {
      signal.removeEventListener("abort", aborted);
      reject(new Error("usage store unavailable"));
    };
    signal.addEventListener("abort", aborted, { once: true });
    // Both handlers stay attached after abort so a late rejection is consumed.
    operation.then(value => {
      signal.removeEventListener("abort", aborted);
      try { checkDeadline(signal, deadline); resolve(value); }
      catch (error) { reject(error); }
    }, error => {
      signal.removeEventListener("abort", aborted); reject(error);
    });
    try { checkDeadline(signal, deadline); }
    catch (error) { signal.removeEventListener("abort", aborted); reject(error); }
  });
}

function cancelBody(response: Response): void {
  try { void response.body?.cancel().catch(() => undefined); }
  catch { /* Cleanup never exposes a transport exception or waits for an ACK. */ }
}

async function boundedFetch(url: string, init: RequestInit, signal: AbortSignal, deadline: number): Promise<Response> {
  const operation = fetch(url, init);
  try { return await beforeDeadline(operation, signal, deadline); }
  catch (error) {
    // The transport may deliver a response after this caller stopped waiting.
    void operation.then(cancelBody, () => undefined);
    throw error;
  }
}

async function boundedJson(response: Response, signal: AbortSignal, deadline: number): Promise<unknown> {
  const reader = response.body?.getReader();
  if (!reader) throw new Error("invalid usage response");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0, text = "";
  try {
    for (;;) {
      checkDeadline(signal, deadline);
      const { done, value } = await beforeDeadline(reader.read(), signal, deadline);
      checkDeadline(signal, deadline);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) throw new Error("invalid usage response");
      checkDeadline(signal, deadline);
      text += decoder.decode(value, { stream: true });
      checkDeadline(signal, deadline);
    }
    checkDeadline(signal, deadline);
    const body: unknown = JSON.parse(text + decoder.decode());
    checkDeadline(signal, deadline);
    return body;
  } finally {
    void reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}

export const sharedUsageStore: UsageStore = {
  async admit(subject, limit, offsetMinutes, now) {
    let response: Response | undefined;
    try {
      if (!Number.isSafeInteger(limit) || limit < 0) throw new Error("invalid usage limit");
      const { key, resetAt } = usageWindow(subject, now, offsetMinutes);
      const url = process.env.KV_REST_API_URL?.replace(/\/$/, "");
      const token = process.env.KV_REST_API_TOKEN;
      if (!url || !token) throw new Error("usage store unavailable");
      const signal = AbortSignal.timeout(3000);
      const deadline = performance.now() + 3000;
      response = await boundedFetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(["EVAL", ADMIT_AI_USAGE_LUA, 1, key, limit, Math.ceil(resetAt / 1000)]),
        signal,
        cache: "no-store",
      }, signal, deadline);
      if (!response.ok) throw new Error("usage store unavailable");
      const body = await boundedJson(response, signal, deadline);
      if (typeof body !== "object" || body === null || !("result" in body) || "error" in body)
        throw new Error("invalid usage response");
      const result = body.result;
      if (!Array.isArray(result) || result.length !== 2 || (result[0] !== 0 && result[0] !== 1)
        || !Number.isSafeInteger(result[1]) || result[1] < 0
        || (result[0] === 1 && (result[1] < 1 || result[1] > limit))
        || (result[0] === 0 && result[1] < limit)) throw new Error("invalid usage response");
      checkDeadline(signal, deadline);
      return { allowed: result[0] === 1, remaining: Math.max(0, limit - result[1]), limit, resetAt };
      } catch {
      // No transport detail/credentials and no retry, fallback or refund. A lost
      // response can follow a committed mutation; this does not roll it back.
      throw new Error("usage store unavailable");
    } finally {
      if (response) cancelBody(response);
    }
  },
};
