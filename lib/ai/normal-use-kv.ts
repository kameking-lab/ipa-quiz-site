import "server-only";
import { logAiKvFailure } from "./kv-diagnostics";
import { kvInteger, usageKvCommand } from "./usage-kv";

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

export const sharedNormalUseStore: NormalUseStore = {
  async admit(windows) {
    if (!Array.isArray(windows) || windows.length < 1 || windows.length > 6) throw new Error("invalid normal use windows");
    // The request and reply must refer to these same captured primitive values.
    const snapshot = Array.from(windows, w => ({ key: w.key, limit: w.limit, resetAt: w.resetAt }));
    if (new Set(snapshot.map(w => w.key)).size !== snapshot.length
      || snapshot.some(w => typeof w.key !== "string" || !w.key || !Number.isSafeInteger(w.limit) || w.limit < 1
        || !Number.isSafeInteger(w.resetAt) || w.resetAt <= 0)) throw new Error("invalid normal use windows");
    const result = await usageKvCommand(["EVAL", ADMIT_NORMAL_USE_LUA, snapshot.length, ...snapshot.map(w => w.key),
      ...snapshot.flatMap(w => [w.limit, Math.ceil(w.resetAt / 1000)])], "normal-use:admit");
    const [allowed, window] = Array.isArray(result) && result.length === 2 ? result.map(kvInteger) : [];
    if (window === undefined || !((allowed === 1 && window === 0) || (allowed === 0 && window >= 1 && window <= snapshot.length))) {
      logAiKvFailure("normal-use:admit", "response", 200);
      throw new Error("invalid normal use response");
    }
    return allowed === 1 ? { allowed: true } : { allowed: false, deniedWindow: window - 1 };
  },
};
