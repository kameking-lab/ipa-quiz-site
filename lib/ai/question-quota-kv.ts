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
local function doneValue(v) return v == 'done' or v and string.match(v, '^done:%x+$') end
local function replayedValue(v) return v and string.match(v, '^replayed:%x+$') end
local function scan(key, prune)
  local entries = redis.call('HGETALL', key)
  if #entries > 2 * limit then return nil end
  local done, pending, delivering, own = 0, 0, 0, nil
  for i = 1, #entries, 2 do
    local id, value = entries[i], entries[i+1]
    local confirmationAt = tonumber(string.match(value, '^delivery:%x+:(%d+)$'))
    local recoveryAt = tonumber(string.match(value, '^redelivery:%x+:(%d+)$'))
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
      local token = recovery and string.sub(value, 7) or value
      local at = tonumber(string.match(token, '^%x+:(%d+)$'))
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
  if doneValue(own) then
    redis.call('HSET', KEYS[1], request, 'retry:' .. owner .. ':' .. lease)
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

local token = owner .. ':' .. lease
local retry = 'retry:' .. token
local delivery = 'delivery:' .. token
local redelivery = 'redelivery:' .. token
local replayed = 'replayed:' .. owner
local completed = 'done:' .. owner
if action == 'release' then
  if own == retry or own == redelivery then
    redis.call('HSET', KEYS[1], request, 'done')
    return {'released', done}
  end
  if own == token or own == delivery then
    redis.call('HDEL', KEYS[1], request)
    return {'released', own == delivery and done - 1 or done}
  end
  return {'unchanged', done}
end

if own == replayed or (action == 'confirm' and own == redelivery) then return {'recovered', done} end
if own == completed or (action == 'confirm' and own == delivery) then return {'completed', done} end
if (action == 'delivered' and own == redelivery) or (action ~= 'delivered' and own == retry) then
  redis.call('HSET', KEYS[1], request, action == 'confirm' and redelivery or replayed)
  return {'recovered', done}
end
if action == 'confirm' then
  if own ~= token then return {'unchanged', done} end
  redis.call('HSET', KEYS[1], request, delivery)
  return {'completed', done + 1}
end
if (action == 'delivered' and own ~= delivery) or (action == 'complete' and own ~= token) then return {'unchanged', done} end
redis.call('HSET', KEYS[1], request, completed)
if action == 'complete' then done = done + 1 end
local function count(field)
  redis.pcall('HINCRBY', KEYS[2], field, 1)
  redis.pcall('EXPIRE', KEYS[2], ARGV[8])
end
count('free')
if done - delivering + (action == 'delivered' and 1 or 0) == limit then count('reached') end
return {'completed', done}
`;

function metricKey(now: number) {
  const day = new Date(now + AI_DAILY_RESET_OFFSET_MINUTES * 60_000).toISOString().slice(0, 10);
  return `ai:question-metrics:v1:${day}`;
}

interface QuotaDay { subject: string; limit: number; offset: number; now: number }
interface QuotaLease { day: QuotaDay; fingerprint: string; owner: string; expiresAt: number }
type QuotaResult = "status" | "reserved" | "repeat" | "answered" | "exhausted" | "pending" | "released" | "completed" | "recovered" | "unchanged" | "claimed";
export type QuotaSettlement = boolean | "confirm" | "delivered";

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
  const result = await usageKvCommand([
    "EVAL", QUESTION_QUOTA_LUA, keys.length, ...keys,
    action, day.limit, now, resetAt + LEASE_MS, lease?.fingerprint ?? "", lease?.owner ?? "",
    lease?.expiresAt ?? 0, METRIC_TTL_SECONDS,
  ]);
  if (!Array.isArray(result) || result.length !== 2 || !expected.includes(result[0])
    || !Number.isSafeInteger(result[1]) || result[1] < 0 || result[1] > day.limit) throw new Error("invalid question quota response");
  return { status: result[0] as QuotaResult, remaining: day.limit - result[1], resetAt };
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
  async settle(lease: QuotaLease, settlement: QuotaSettlement) {
    const action = typeof settlement === "boolean" ? settlement ? "complete" : "release" : settlement;
    return command(action, lease.day, ["completed", "recovered", "released", "unchanged"], lease, Date.now());
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
