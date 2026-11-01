import "server-only";

export interface NormalUseWindow { key: string; limit: number; resetAt: number; reason: "minute" | "hour" | "daily" | "accounting" }
export interface NormalUseAdmission { allowed: boolean; deniedWindow?: number }
export interface NormalUseStore { admit(windows: readonly NormalUseWindow[]): Promise<NormalUseAdmission> }

/** All reads/types/values/arguments are checked before any writes; script errors do not roll back Redis. */
export const ADMIT_NORMAL_USE_LUA = `
local counts = {}
for i, key in ipairs(KEYS) do
  local raw = redis.call('GET', key)
  local count = 0
  if raw then
    if not string.match(raw, '^%d+$') or (#raw > 1 and string.sub(raw, 1, 1) == '0') then
      return redis.error_reply('invalid normal use counter')
    end
    count = tonumber(raw)
    if not count or count < 0 or count ~= math.floor(count) or count >= 9007199254740991 then
      return redis.error_reply('invalid normal use counter')
    end
  end
  local limit = tonumber(ARGV[i * 2 - 1])
  local expiry = tonumber(ARGV[i * 2])
  if not limit or limit < 1 or limit ~= math.floor(limit) or limit > 9007199254740991
    or not expiry or expiry < 1 or expiry ~= math.floor(expiry) or expiry > 9007199254740991 then
    return redis.error_reply('invalid normal use arguments')
  end
  counts[i] = count
end
for i, count in ipairs(counts) do
  if count >= tonumber(ARGV[i * 2 - 1]) then return {0, i} end
end
for i, key in ipairs(KEYS) do
  redis.call('INCR', key)
  redis.call('EXPIREAT', key, ARGV[i * 2])
end
return {1, 0}
`;

function checkDeadline(signal: AbortSignal, deadline: number): void {
  signal.throwIfAborted();
  if (performance.now() >= deadline) throw new Error("normal use store unavailable");
}

/** The monotonic check also stops immediate empty-chunk microtask starvation.
 * Neither mechanism can preempt synchronous CPU work; parsing stays byte-bounded.
 */
async function beforeDeadline<T>(operation: Promise<T>, signal: AbortSignal, deadline: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const aborted = () => {
      signal.removeEventListener("abort", aborted);
      reject(new Error("normal use store unavailable"));
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
  if (!reader) throw new Error("invalid normal use response");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0, text = "";
  try {
    for (;;) {
      checkDeadline(signal, deadline);
      const { done, value } = await beforeDeadline(reader.read(), signal, deadline);
      checkDeadline(signal, deadline);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 4096) throw new Error("oversized normal use response");
      text += decoder.decode(value, { stream: true });
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

export const sharedNormalUseStore: NormalUseStore = {
  async admit(windows) {
    let response: Response | undefined;
    try {
      if (!Array.isArray(windows) || windows.length < 1 || windows.length > 6) throw new Error("invalid normal use windows");
      // The request and reply must refer to these same captured primitive values.
      const snapshot = Array.from(windows, w => ({ key: w.key, limit: w.limit, resetAt: w.resetAt }));
      if (new Set(snapshot.map(w => w.key)).size !== snapshot.length
        || snapshot.some(w => typeof w.key !== "string" || !w.key || !Number.isSafeInteger(w.limit) || w.limit < 1
          || !Number.isSafeInteger(w.resetAt) || w.resetAt <= 0)) throw new Error("invalid normal use windows");
      const url = process.env.KV_REST_API_URL?.replace(/\/$/, "");
      const token = process.env.KV_REST_API_TOKEN;
      if (!url || !token) throw new Error("normal use store unavailable");
      const signal = AbortSignal.timeout(3000);
      const deadline = performance.now() + 3000;
      response = await boundedFetch(url, {
        method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(["EVAL", ADMIT_NORMAL_USE_LUA, snapshot.length, ...snapshot.map(w => w.key),
          ...snapshot.flatMap(w => [w.limit, Math.ceil(w.resetAt / 1000)])]),
        signal, cache: "no-store",
      }, signal, deadline);
      if (!response.ok) throw new Error("normal use store unavailable");
      const body = await boundedJson(response, signal, deadline);
      if (typeof body !== "object" || body === null || !("result" in body) || "error" in body)
        throw new Error("invalid normal use response");
      const result = body.result;
      if (!Array.isArray(result) || result.length !== 2 || !Number.isInteger(result[1])
        || !((result[0] === 1 && result[1] === 0)
          || (result[0] === 0 && result[1] >= 1 && result[1] <= snapshot.length)))
        throw new Error("invalid normal use response");
      return result[0] === 1 ? { allowed: true } : { allowed: false, deniedWindow: result[1] - 1 };
      } catch {
      // A remote write may already have committed. No retry, fallback or refund;
      // do not expose raw transport messages, response bodies or credentials.
      throw new Error("normal use store unavailable");
    } finally {
      if (response) cancelBody(response);
    }
  },
};
