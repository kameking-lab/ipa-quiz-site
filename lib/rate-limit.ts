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

  const results = await kvPipeline([
    ["INCR", minKey],
    ["EXPIRE", minKey, 120],
    ["INCR", hrKey],
    ["EXPIRE", hrKey, 7200],
    ["INCR", dayKey],
    ["EXPIRE", dayKey, 172800],
    ["INCR", statsKey],
    ["EXPIRE", statsKey, 90_000],
    ["ZINCRBY", topIpKey, 1, ip],
    ["EXPIRE", topIpKey, 90_000],
  ]);

  const minCount = Number(results[0] ?? 0);
  const hrCount = Number(results[2] ?? 0);
  const dayCount = Number(results[4] ?? 0);

  if (options.requireKv && [results[0], results[2], results[4]].some((value) => value == null || !Number.isFinite(Number(value)))) {
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
    const global = await kvPipeline([
      ["INCR", globalHourKey],
      ["EXPIRE", globalHourKey, 7200],
      ["INCR", globalDayKey],
      ["EXPIRE", globalDayKey, 172800],
    ]);
    if (options.requireKv && [global[0], global[2]].some((value) => value == null || !Number.isFinite(Number(value)))) {
      return { ok: false, reason: "unavailable", resetAt: now + 60_000 };
    }
    if (Number(global[0] ?? 0) > COPILOT_GLOBAL_LIMITS.hour) {
      return { ok: false, reason: "hour", resetAt: (hrBucket + 1) * 3_600_000 };
    }
    if (Number(global[2] ?? 0) > COPILOT_GLOBAL_LIMITS.day) {
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

  // Build pipeline: last 24 hourly buckets per endpoint + top-IP sorted sets
  const commands: unknown[][] = [];
  for (const endpoint of TRACKED_ENDPOINTS) {
    for (let i = 0; i < 24; i++) {
      commands.push(["GET", `rl:stats:${endpoint}:h:${currentHrBucket - i}`]);
    }
  }
  // Top IPs from current + previous hour bucket (ZREVRANGE with scores)
  commands.push(["ZREVRANGE", `rl:topips:h:${currentHrBucket}`, 0, 19, "WITHSCORES"]);
  commands.push(["ZREVRANGE", `rl:topips:h:${currentHrBucket - 1}`, 0, 19, "WITHSCORES"]);

  const results = await kvPipeline(commands);

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
    generatedAt: new Date(now).toISOString(),
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

  const commands: unknown[][] = [];
  for (let i = 0; i < 24; i++) {
    for (const endpoint of TRACKED_ENDPOINTS) {
      commands.push(["GET", `rl:stats:${endpoint}:h:${currentHrBucket - i}`]);
    }
  }

  const results = await kvPipeline(commands);
  const series: number[] = [];

  for (let i = 0; i < 24; i++) {
    let hourTotal = 0;
    for (let j = 0; j < TRACKED_ENDPOINTS.length; j++) {
      hourTotal += Number(results[i * TRACKED_ENDPOINTS.length + j] ?? 0);
    }
    series.push(hourTotal);
  }

  return series;
}
