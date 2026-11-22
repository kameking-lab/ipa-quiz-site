import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { AI_DAILY_RESET_OFFSET_MINUTES } from "@/lib/constants/ai-quota";
import { usageKvCommand, usageWindow } from "./usage-kv";

const LEASE_MS = 120_000;
const METRIC_TTL_SECONDS = 8 * 86_400;

// One hash per subject and day, with at most one field per free slot. A field
// is a digest of the request and holds either a completed answer or a lease.
// The owner token fences late completion after expiration or reassignment.
export const QUESTION_QUOTA_LUA = `
local action, limit, now, expiry = ARGV[1], tonumber(ARGV[2]), tonumber(ARGV[3]), ARGV[4]
local request, owner, lease = ARGV[5], ARGV[6], ARGV[7]
local entries, done, pending, own = redis.call('HGETALL', KEYS[1]), 0, 0, nil
if #entries > 2 * limit then return redis.error_reply('invalid quota hash size') end
for i = 1, #entries, 2 do
  local id, value = entries[i], entries[i+1]
  if value == 'done' then
    done = done + 1
    if id == request then own = value end
  else
    local at = tonumber(string.match(value, '^%x+:(%d+)$'))
    if not at then return redis.error_reply('invalid quota lease') end
    if at > now then
      pending = pending + 1
      if id == request then own = value end
    elseif action == 'reserve' then
      redis.call('HDEL', KEYS[1], id)
    end
  end
end
if action == 'read' then return {'status', done} end
if action == 'reserve' then
  if own == 'done' then return {'repeat', done} end
  if done >= limit then return {'exhausted', done} end
  if own or done + pending >= limit then return {'pending', done} end
  redis.call('HSET', KEYS[1], request, owner .. ':' .. lease)
  redis.call('PEXPIREAT', KEYS[1], expiry)
  return {'reserved', done}
end
if action == 'complete' and own == 'done' then return {'completed', done} end
if not own or own ~= owner .. ':' .. lease then return {'unchanged', done} end
if action == 'release' then
  redis.call('HDEL', KEYS[1], request)
  return {'released', done}
end
redis.call('HSET', KEYS[1], request, 'done')
done = done + 1
local function count(field)
  redis.pcall('HINCRBY', KEYS[2], field, 1)
  redis.pcall('EXPIRE', KEYS[2], ARGV[8])
end
count('free')
if done == limit then count('reached') end
return {'completed', done}
`;

function metricKey(now: number) {
  const day = new Date(now + AI_DAILY_RESET_OFFSET_MINUTES * 60_000).toISOString().slice(0, 10);
  return `ai:question-metrics:v1:${day}`;
}

interface QuotaDay { subject: string; limit: number; offset: number; now: number }
interface QuotaLease { day: QuotaDay; fingerprint: string; owner: string; expiresAt: number }
type QuotaResult = "status" | "reserved" | "repeat" | "exhausted" | "pending" | "released" | "completed" | "unchanged";

async function command(action: string, day: QuotaDay, expected: readonly QuotaResult[], lease?: QuotaLease, now = day.now) {
  const { key, resetAt } = usageWindow(day.subject, day.now, day.offset);
  const result = await usageKvCommand([
    "EVAL", QUESTION_QUOTA_LUA, 2, key.replace("ai:usage:v1:", "ai:question-quota:v1:"), metricKey(day.now),
    action, day.limit, now, resetAt + LEASE_MS, lease?.fingerprint ?? "", lease?.owner ?? "",
    lease?.expiresAt ?? 0, METRIC_TTL_SECONDS,
  ]);
  if (!Array.isArray(result) || result.length !== 2 || !expected.includes(result[0])
    || !Number.isSafeInteger(result[1]) || result[1] < 0 || result[1] > day.limit) throw new Error("invalid question quota response");
  return { status: result[0] as QuotaResult, remaining: day.limit - result[1], resetAt };
}

export const questionQuotaStore = {
  read: (day: QuotaDay) => command("read", day, ["status"]),
  async reserve(day: QuotaDay, request: unknown) {
    const fingerprint = createHash("sha256").update(JSON.stringify(request)).digest("hex");
    const lease = { day, fingerprint, owner: randomUUID().replaceAll("-", ""), expiresAt: day.now + LEASE_MS };
    const result = await command("reserve", day, ["reserved", "repeat", "exhausted", "pending"], lease);
    return { ...result, lease: result.status === "reserved" ? lease : undefined };
  },
  async settle(lease: QuotaLease, completed: boolean) {
    return command(completed ? "complete" : "release", lease.day, ["completed", "released", "unchanged"], lease, Date.now());
  },
};

export async function recordPaidAiQuestion(now: number) {
  await usageKvCommand(["EVAL", `
    local count = redis.call('HINCRBY', KEYS[1], 'paid', 1)
    redis.call('EXPIRE', KEYS[1], ARGV[1])
    return count
  `, 1, metricKey(now), METRIC_TTL_SECONDS]);
}

export async function readAiQuestionMetrics(now: number) {
  const counts = await usageKvCommand(["HMGET", metricKey(now), "free", "paid", "reached"]);
  if (!Array.isArray(counts) || counts.length !== 3 || counts.some(count =>
    count !== null && !(/^\d+$/.test(String(count)) && Number.isSafeInteger(Number(count))))) {
    throw new Error("invalid AI question metrics");
  }
  const [free, paid, quotaReached] = counts.map(Number);
  return { free, paid, quotaReached };
}
