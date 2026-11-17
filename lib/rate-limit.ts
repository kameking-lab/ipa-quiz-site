// IP-level anti-abuse rate limit via Upstash Redis REST API (no SDK dependency).
// Falls back gracefully when KV_REST_API_URL / KV_REST_API_TOKEN are absent,
// preserving the existing in-memory layer (lib/rate-limit/server.ts) as the sole guard.

import { getClientIp } from "@/lib/rate-limit/server";
import { costJpy, tierForModel } from "@/lib/ai/cost-tracker";
import { COPILOT_MODEL } from "@/lib/copilot/model";

const KV_URL = process.env.KV_REST_API_URL?.replace(/\/$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_ENABLED = Boolean(KV_URL && KV_TOKEN);

// Anti-abuse limits per IP (all tiers — applied on top of the feature-level limits)
export const IP_LIMITS = {
  minute: 10,
  hour: 100,
  day: 500,
} as const;

// A learner can ask more than ten follow-up questions in one sitting, while
// the hourly/day limits still stop sustained automated use.
export const COPILOT_MINUTE_LIMIT = 20;
export const COPILOT_GLOBAL_LIMITS = { hour: 500, day: 5_000 } as const;

// Legacy estimate for non-copilot endpoints. Counts alone cannot give actual cost.
export const COST_JPY_PER_REQUEST = 0.055;
// Copilot uses a different model; derive its estimate from the same pricing
// table used by the monthly cost cap, including introductory pricing dates.
export const COPILOT_COST_JPY_PER_REQUEST = costJpy(tierForModel(COPILOT_MODEL), 1200, 600);

export type IpRateLimitResult =
  | { ok: true }
  | { ok: false; reason: "minute" | "hour" | "daily" | "unavailable"; resetAt: number };

type KvPipelineEntry = { result: unknown } | { error: string };

// These keys include the time bucket. Their existing TTLs cover the whole
// bucket plus the dashboard's lookback, so later calls need not extend them.
// Upstash bills EVAL and its inner commands: grouping the increments avoids
// replacing every saved EXPIRE with a separate EVAL/TTL command.
const IP_COUNTER_SCRIPT = `
local counts = {}
for i = 1, 4 do
  local count = redis.pcall('INCR', KEYS[i])
  if type(count) == 'number' then
    counts[i] = count
    if count == 1 then redis.pcall('EXPIRE', KEYS[i], ARGV[i]) end
  else
    counts[i] = false
  end
end
redis.pcall('ZINCRBY', KEYS[5], 1, ARGV[5])
if counts[4] == 1 then redis.pcall('EXPIRE', KEYS[5], ARGV[4]) end
return counts
`;

const GLOBAL_COUNTER_SCRIPT = `
local counts = {}
for i = 1, 2 do
  local count = redis.pcall('INCR', KEYS[i])
  if type(count) == 'number' then
    counts[i] = count
    if count == 1 then redis.pcall('EXPIRE', KEYS[i], ARGV[i]) end
  else
    counts[i] = false
  end
end
return counts
`;

function scriptCounts(result: unknown): unknown[] {
  // Lua false is a null bulk reply in Redis; also reject a JSON boolean from
  // adapters rather than interpreting it as a zero count.
  return Array.isArray(result) ? result.map((count) => count === false ? null : count) : [];
}

async function kvPipeline(commands: unknown[][]): Promise<unknown[]> {
  if (!KV_ENABLED) return commands.map(() => null);
  try {
    const res = await fetch(`${KV_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return commands.map(() => null);
    const json = (await res.json()) as KvPipelineEntry[];
    return json.map((r) => ("result" in r ? r.result : null));
  } catch {
    return commands.map(() => null);
  }
}

/**
 * Check IP-level anti-abuse rate limit and record usage stats for the dashboard.
 * Returns { ok: true } immediately when KV is not configured.
 */
export async function checkIpRateLimit(
  req: Request,
  endpoint: string,
  options: { requireKv?: boolean } = {},
): Promise<IpRateLimitResult> {
  // Paid copilot calls must not fail open when the shared counter is unavailable.
  if (!KV_ENABLED) return options.requireKv
    ? { ok: false, reason: "unavailable", resetAt: Date.now() + 60_000 }
    : { ok: true };

  const ip = getClientIp(req);
  const now = Date.now();
  const minBucket = Math.floor(now / 60_000);
  const hrBucket = Math.floor(now / 3_600_000);
  const dayBucket = Math.floor(now / 86_400_000);

  const minKey = `rl:ip:${ip}:m:${minBucket}`;
  const hrKey = `rl:ip:${ip}:h:${hrBucket}`;
  const dayKey = `rl:ip:${ip}:d:${dayBucket}`;
  const statsKey = `rl:stats:${endpoint}:h:${hrBucket}`;
  const topIpKey = `rl:topips:h:${hrBucket}`;

  const [result] = await kvPipeline([
    ["EVAL", IP_COUNTER_SCRIPT, 5, minKey, hrKey, dayKey, statsKey, topIpKey,
      120, 7200, 172800, 90_000, ip],
  ]);
  const results = scriptCounts(result);

  const minCount = Number(results[0] ?? 0);
  const hrCount = Number(results[1] ?? 0);
  const dayCount = Number(results[2] ?? 0);

  if (options.requireKv && [results[0], results[1], results[2]].some((value) => value == null || !Number.isFinite(Number(value)))) {
    return { ok: false, reason: "unavailable", resetAt: now + 60_000 };
  }

  if (minCount > (endpoint === "copilot" ? COPILOT_MINUTE_LIMIT : IP_LIMITS.minute)) {
    return { ok: false, reason: "minute", resetAt: (minBucket + 1) * 60_000 };
  }
  if (hrCount > IP_LIMITS.hour) {
    return { ok: false, reason: "hour", resetAt: (hrBucket + 1) * 3_600_000 };
  }
  if (dayCount > IP_LIMITS.day) {
    return { ok: false, reason: "daily", resetAt: (dayBucket + 1) * 86_400_000 };
  }

  // Atomic shared admission counters prevent a distributed client from
  // bypassing the per-IP limits and exhausting the monthly Gemini budget.
  if (endpoint === "copilot") {
    const globalHourKey = `rl:global:copilot:h:${hrBucket}`;
    const globalDayKey = `rl:global:copilot:d:${dayBucket}`;
    const [globalResult] = await kvPipeline([
      ["EVAL", GLOBAL_COUNTER_SCRIPT, 2, globalHourKey, globalDayKey, 7200, 172800],
    ]);
    const global = scriptCounts(globalResult);
    if (options.requireKv && [global[0], global[1]].some((value) => value == null || !Number.isFinite(Number(value)))) {
      return { ok: false, reason: "unavailable", resetAt: now + 60_000 };
    }
    if (Number(global[0] ?? 0) > COPILOT_GLOBAL_LIMITS.hour) {
      return { ok: false, reason: "hour", resetAt: (hrBucket + 1) * 3_600_000 };
    }
    if (Number(global[1] ?? 0) > COPILOT_GLOBAL_LIMITS.day) {
      return { ok: false, reason: "daily", resetAt: (dayBucket + 1) * 86_400_000 };
    }
  }

  return { ok: true };
}

// Endpoints tracked in the /admin/api-usage dashboard
export const TRACKED_ENDPOINTS = [
  "copilot",
  "essay-grade",
  "generate-question",
  "scoring",
] as const;

export type TrackedEndpoint = (typeof TRACKED_ENDPOINTS)[number];

export interface EndpointStats {
  last1h: number;
  last24h: number;
}

export interface ApiUsageStats {
  enabled: boolean;
  generatedAt: string;
  totalLast1h: number;
  totalLast24h: number;
  byEndpoint: Record<TrackedEndpoint, EndpointStats>;
  topIps: Array<{ ip: string; count24h: number }>;
  estimatedCostJpy: { last1h: number; last24h: number };
}

interface UsageSnapshot {
  hour: number;
  generatedAt: number;
  counts: unknown[];
  topIps: unknown[];
}

// Dashboard reads only. Never use this cache for admission or AI accounting.
// One bounded entry per process; concurrent dashboard readers share the same load.
let usageSnapshot: UsageSnapshot | undefined;
let usageLoad: { hour: number; promise: Promise<UsageSnapshot> } | undefined;
const USAGE_CACHE_MS = 60_000;

async function readUsageSnapshot(hour: number): Promise<UsageSnapshot> {
  const now = Date.now();
  if (usageSnapshot?.hour === hour && now - usageSnapshot.generatedAt < USAGE_CACHE_MS) return usageSnapshot;
  if (usageLoad?.hour === hour) return usageLoad.promise;
  const promise = (async () => {
    const keys = TRACKED_ENDPOINTS.flatMap(endpoint =>
      Array.from({ length: 24 }, (_, i) => `rl:stats:${endpoint}:h:${hour - i}`));
    const results = await kvPipeline([
      ["MGET", ...keys],
      ["ZREVRANGE", `rl:topips:h:${hour}`, 0, 19, "WITHSCORES"],
      ["ZREVRANGE", `rl:topips:h:${hour - 1}`, 0, 19, "WITHSCORES"],
    ]);
    const validCounts = Array.isArray(results[0]) && results[0].length === keys.length;
    const valid = validCounts && Array.isArray(results[1]) && Array.isArray(results[2]);
    const snapshot: UsageSnapshot = { hour, generatedAt: now,
      counts: validCounts ? results[0] as unknown[] : keys.map(() => null),
      topIps: results.slice(1).map(value => Array.isArray(value) ? value : []) };
    // A failed load must not hide recovery for a full cache period.
    if (valid) usageSnapshot = snapshot;
    return snapshot;
  })();
  usageLoad = { hour, promise };
  try { return await promise; }
  finally { if (usageLoad?.promise === promise) usageLoad = undefined; }
}

export async function getApiUsageStats(): Promise<ApiUsageStats> {
  const now = Date.now();
  const currentHrBucket = Math.floor(now / 3_600_000);

  const emptyEndpoints = Object.fromEntries(
    TRACKED_ENDPOINTS.map((e) => [e, { last1h: 0, last24h: 0 }]),
  ) as Record<TrackedEndpoint, EndpointStats>;

  const empty: ApiUsageStats = {
    enabled: KV_ENABLED,
    generatedAt: new Date(now).toISOString(),
    totalLast1h: 0,
    totalLast24h: 0,
    byEndpoint: emptyEndpoints,
    topIps: [],
    estimatedCostJpy: { last1h: 0, last24h: 0 },
  };

  if (!KV_ENABLED) return empty;

  const snapshot = await readUsageSnapshot(currentHrBucket);
  const results = [...snapshot.counts, ...snapshot.topIps];

  const byEndpoint = { ...emptyEndpoints };
  let idx = 0;

  for (const endpoint of TRACKED_ENDPOINTS) {
    let last24h = 0;
    let last1h = 0;
    for (let i = 0; i < 24; i++) {
      const count = Number(results[idx] ?? 0);
      last24h += count;
      if (i === 0) last1h = count;
      idx++;
    }
    byEndpoint[endpoint] = { last1h, last24h };
  }

  const totalLast1h = TRACKED_ENDPOINTS.reduce((s, e) => s + byEndpoint[e].last1h, 0);
  const totalLast24h = TRACKED_ENDPOINTS.reduce((s, e) => s + byEndpoint[e].last24h, 0);
  const estimatedLast1h = byEndpoint.copilot.last1h * COPILOT_COST_JPY_PER_REQUEST
    + (totalLast1h - byEndpoint.copilot.last1h) * COST_JPY_PER_REQUEST;
  const estimatedLast24h = byEndpoint.copilot.last24h * COPILOT_COST_JPY_PER_REQUEST
    + (totalLast24h - byEndpoint.copilot.last24h) * COST_JPY_PER_REQUEST;

  // Merge top IPs from both hour buckets
  const ipCounts = new Map<string, number>();
  for (let setIdx = 0; setIdx < 2; setIdx++) {
    const raw = results[idx + setIdx];
    if (Array.isArray(raw)) {
      for (let i = 0; i + 1 < raw.length; i += 2) {
        const ip = String(raw[i]);
        const count = Number(raw[i + 1] ?? 0);
        ipCounts.set(ip, (ipCounts.get(ip) ?? 0) + count);
      }
    }
  }
  const topIps = [...ipCounts.entries()]
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([ip, count24h]) => ({ ip, count24h }));

  return {
    enabled: true,
    generatedAt: new Date(snapshot.generatedAt).toISOString(),
    totalLast1h,
    totalLast24h,
    byEndpoint,
    topIps,
    estimatedCostJpy: {
      last1h: Math.round(estimatedLast1h * 100) / 100,
      last24h: Math.round(estimatedLast24h * 100) / 100,
    },
  };
}

/**
 * Returns 24 hourly total call counts across all tracked endpoints.
 * Index 0 = most recent hour, index 23 = 23 hours ago.
 * Returns array of zeros when KV is not configured.
 */
export async function getApiCallsHourlySeries(): Promise<number[]> {
  if (!KV_ENABLED) return Array(24).fill(0) as number[];

  const now = Date.now();
  const currentHrBucket = Math.floor(now / 3_600_000);

  const { counts } = await readUsageSnapshot(currentHrBucket);
  const series: number[] = [];

  for (let i = 0; i < 24; i++) {
    let hourTotal = 0;
    for (let j = 0; j < TRACKED_ENDPOINTS.length; j++) {
      hourTotal += Number(counts[j * 24 + i] ?? 0);
    }
    series.push(hourTotal);
  }

  return series;
}
