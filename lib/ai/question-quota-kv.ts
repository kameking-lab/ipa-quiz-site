import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { AI_DAILY_RESET_OFFSET_MINUTES } from "@/lib/constants/ai-quota";
import { logAiKvFailure } from "./kv-diagnostics";
import { kvInteger, usageKvCommand, usageWindow } from "./usage-kv";

const LEASE_MS = 120_000;
const METRIC_TTL_SECONDS = 8 * 86_400;

// One hash per subject and day, with at most one field per free slot. A field
// is a digest of the request and holds either a completed answer or a lease.
// The owner token fences late completion after expiration or reassignment.
export const QUESTION_QUOTA_LUA = `
local action, limit, now, expiry = ARGV[1], tonumber(ARGV[2]), tonumber(ARGV[3]), ARGV[4]
local request, owner, lease = ARGV[5], ARGV[6], ARGV[7]
if not limit or not now or not string.match(expiry, '^%d+$') or not string.match(lease, '^%d+$') then
  return redis.error_reply('invalid quota arguments')
end
local token = owner .. ':' .. lease
local retry = 'retry:' .. token
local function doneValue(v) return v == 'done' or v and string.match(v, '^done:%x+$') end
local function replayedValue(v) return v and string.match(v, '^replayed:%x+$') end
local function leaseTime(value)
  local at = value and tonumber(value)
  if at and at > 0 and at <= 9007199254740991 and math.floor(at) == at then return at end
end
local function scan(key, prune)
  local fields = redis.call('HKEYS', key)
  if #fields > limit then return nil end
  local done, pending, delivering, own = 0, 0, 0, nil
  if #fields == 0 then return done, pending, delivering, own end
  local values = redis.call('HMGET', key, unpack(fields))
  for i, id in ipairs(fields) do
    local value = values[i]
    if type(value) ~= 'string' then return nil end
    -- Existing ledgers may contain leases from the previous REST number encoding.
    local confirmationAt = leaseTime(string.match(value, '^delivery:%x+:(.+)$'))
    local recoveryAt = leaseTime(string.match(value, '^redelivery:%x+:(.+)$'))
    if doneValue(value) or replayedValue(value) or value == 'inherited' or confirmationAt or recoveryAt then
      done = done + 1
      if prune and (confirmationAt or recoveryAt) and (confirmationAt or recoveryAt) <= now then
        value = confirmationAt and 'done' or ('replayed:' .. string.match(value, '^redelivery:(%x+):'))
        redis.call('HSET', key, id, value)
      elseif confirmationAt then
        delivering = delivering + 1
      end
      if id == request then own = value end
    else
      local recovery = string.sub(value, 1, 6) == 'retry:'
      local storedToken = recovery and string.sub(value, 7) or value
      local at = leaseTime(string.match(storedToken, '^%x+:(.+)$'))
      if not at then return nil end
      if recovery then done = done + 1 end
      if at > now then
        if not recovery then pending = pending + 1 end
        if id == request then own = value end
      elseif prune then
        if recovery then
          redis.call('HSET', key, id, 'done')
          if id == request then own = 'done' end
        else
          redis.call('HDEL', key, id)
        end
      end
    end
  end
  return done, pending, delivering, own
end

local done, pending, delivering, own = scan(KEYS[1], action == 'reserve' or action == 'claim')
if not done then return redis.error_reply('invalid quota hash') end
if action == 'claim' then
  if redis.call('EXISTS', KEYS[4]) == 1 then return {'claimed', done} end
  local guestDone, guestPending, guestDelivering = scan(KEYS[3], true)
  if not guestDone then return redis.error_reply('invalid guest quota hash') end
  local inherited = math.min(guestDone, limit - done + delivering)
  if guestPending > 0 or guestDelivering > 0 or done + pending + inherited > limit then return {'pending', done} end
  for i = 1, inherited do
    redis.call('HSET', KEYS[1], KEYS[3] .. ':' .. i, 'inherited')
  end
  if inherited > 0 then redis.call('PEXPIREAT', KEYS[1], expiry) end
  -- Freeze this signed guest for the day, including concurrent tabs and re-logins.
  redis.call('SET', KEYS[4], '1', 'PXAT', expiry)
  return {'claimed', done + inherited}
end
if (action == 'read' or action == 'reserve') and KEYS[3] and redis.call('EXISTS', KEYS[3]) == 1 then
  return {'claimed', done}
end
if action == 'read' then return {'status', done} end
if action == 'reserve' then
  -- A lost REST response can follow a successful write. Retry the same lease.
  if own == token then return {'reserved', done} end
  if own == retry then return {'repeat', done} end
  if doneValue(own) then
    redis.call('HSET', KEYS[1], request, retry)
    return {'repeat', done}
  end
  if replayedValue(own) then return {'answered', done} end
  if own then return {'pending', done} end
  if done >= limit then return {'exhausted', done} end
  if done + pending >= limit then return {'pending', done} end
  redis.call('HSET', KEYS[1], request, owner .. ':' .. lease)
  redis.call('PEXPIREAT', KEYS[1], expiry)
  return {'reserved', done}
end

local replayed = 'replayed:' .. owner
local completed = 'done:' .. owner
if action == 'release' then
  if own == retry then
    redis.call('HSET', KEYS[1], request, 'done')
    return {'released', done}
  end
  if own == token then
    redis.call('HDEL', KEYS[1], request)
    return {'released', done}
  end
  return {'unchanged', done}
end

if own == replayed then return {'recovered', done} end
if own == completed then return {'completed', done} end
if own == retry then
  redis.call('HSET', KEYS[1], request, replayed)
  return {'recovered', done}
end
if own ~= token then return {'unchanged', done} end
redis.call('HSET', KEYS[1], request, completed)
done = done + 1
local function count(field)
  redis.pcall('HINCRBY', KEYS[2], field, 1)
  redis.pcall('EXPIRE', KEYS[2], ARGV[8])
end
count('free')
if done - delivering == limit then count('reached') end
return {'completed', done}
`;

function metricKey(now: number) {
  const day = new Date(now + AI_DAILY_RESET_OFFSET_MINUTES * 60_000).toISOString().slice(0, 10);
  return `ai:question-metrics:v1:${day}`;
}

interface QuotaDay { subject: string; limit: number; offset: number; now: number }
interface QuotaLease { day: QuotaDay; fingerprint: string; owner: string; expiresAt: number }
type QuotaResult = "status" | "reserved" | "repeat" | "answered" | "exhausted" | "pending" | "released" | "completed" | "recovered" | "unchanged" | "claimed";

function quotaWindow(day: QuotaDay) {
  const { key, resetAt } = usageWindow(day.subject, day.now, day.offset);
  return { key: key.replace("ai:usage:v1:", "ai:question-quota:v1:"), resetAt };
}

async function command(action: string, day: QuotaDay, expected: readonly QuotaResult[], lease?: QuotaLease, now = day.now, guest?: string) {
  const { key, resetAt } = quotaWindow(day);
  const keys = [key, metricKey(day.now)];
  if (guest) {
    const guestKey = quotaWindow({ ...day, subject: guest }).key;
    keys.push(guestKey, `${guestKey}:claim`);
  } else if (day.subject.startsWith("guest:")) {
    keys.push(`${key}:claim`);
  }
  const operation = `question-quota:${action}`;
  const request = [
    "EVAL", QUESTION_QUOTA_LUA, keys.length, ...keys,
    action, String(day.limit), String(now), String(resetAt + LEASE_MS), lease?.fingerprint ?? "", lease?.owner ?? "",
    String(lease?.expiresAt ?? 0), String(METRIC_TTL_SECONDS),
  ];
  const evaluate = async () => {
    const result = await usageKvCommand(request, operation);
    const count = Array.isArray(result) && result.length === 2 ? kvInteger(result[1]) : undefined;
    if (count === undefined || count > day.limit || !Array.isArray(result) || !expected.includes(result[0])) {
      logAiKvFailure(operation, "response", 200);
      throw new Error("invalid question quota response");
    }
    return { status: result[0] as QuotaResult, remaining: day.limit - count, resetAt };
  };
  if (action === "reserve" || action === "claim" || action === "read") return evaluate().catch(evaluate);
  return evaluate();
}

export const questionQuotaStore = {
  read: (day: QuotaDay) => command("read", day, ["status", "claimed"]),
  claimGuest: (day: QuotaDay, guest: string) => command("claim", day, ["claimed", "pending"], undefined, day.now, guest),
  async reserve(day: QuotaDay, request: unknown) {
    const fingerprint = createHash("sha256").update(JSON.stringify(request)).digest("hex");
    const lease = { day, fingerprint, owner: randomUUID().replaceAll("-", ""), expiresAt: day.now + LEASE_MS };
    const result = await command("reserve", day, ["reserved", "repeat", "answered", "exhausted", "pending", "claimed"], lease);
    return { ...result, lease: result.status === "reserved" || result.status === "repeat" ? lease : undefined };
  },
  async settle(lease: QuotaLease, completed: boolean) {
    const results: QuotaResult[] = completed ? ["completed", "recovered", "unchanged"] : ["released", "unchanged"];
    return command(completed ? "complete" : "release", lease.day, results, lease, Date.now());
  },
};

export async function recordPaidAiQuestion(now: number) {
  await usageKvCommand(["EVAL", `
    local count = redis.call('HINCRBY', KEYS[1], 'paid', 1)
    redis.call('EXPIRE', KEYS[1], ARGV[1])
    return count
  `, 1, metricKey(now), METRIC_TTL_SECONDS], "question-metrics:paid");
}

export async function readAiQuestionMetrics(now: number) {
  const counts = await usageKvCommand(["HMGET", metricKey(now), "free", "paid", "reached"], "question-metrics:read");
  const [free, paid, quotaReached] = Array.isArray(counts) && counts.length === 3
    ? counts.map(count => count === null ? 0 : kvInteger(count)) : [];
  if (free === undefined || paid === undefined || quotaReached === undefined) {
    logAiKvFailure("question-metrics:read", "response", 200);
    throw new Error("invalid AI question metrics");
  }
  return { free, paid, quotaReached };
}
