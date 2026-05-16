// IP-level anti-abuse rate limit via Upstash Redis REST API (no SDK dependency).
// Falls back gracefully when KV_REST_API_URL / KV_REST_API_TOKEN are absent,
// preserving the existing in-memory layer (lib/rate-limit/server.ts) as the sole guard.

import { getClientIp } from "@/lib/rate-limit/server";

const KV_URL = process.env.KV_REST_API_URL?.replace(/\/$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const KV_ENABLED = Boolean(KV_URL && KV_TOKEN);

// Anti-abuse limits per IP (all tiers — applied on top of the feature-level limits)
export const IP_LIMITS = {
  minute: 10,
  hour: 100,
  day: 500,
} as const;

// Estimated cost per LLM request (Gemini 2.5 Flash-Lite, avg 1200 in + 600 out tokens)
export const COST_JPY_PER_REQUEST = 0.055;

export type IpRateLimitResult =
  | { ok: true }
  | { ok: false; reason: "minute" | "hour" | "daily"; resetAt: number };

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
): Promise<IpRateLimitResult> {
  if (!KV_ENABLED) return { ok: true };

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

  if (minCount > IP_LIMITS.minute) {
    return { ok: false, reason: "minute", resetAt: (minBucket + 1) * 60_000 };
  }
  if (hrCount > IP_LIMITS.hour) {
    return { ok: false, reason: "hour", resetAt: (hrBucket + 1) * 3_600_000 };
  }
  if (dayCount > IP_LIMITS.day) {
    return { ok: false, reason: "daily", resetAt: (dayBucket + 1) * 86_400_000 };
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
      last1h: Math.round(totalLast1h * COST_JPY_PER_REQUEST * 100) / 100,
      last24h: Math.round(totalLast24h * COST_JPY_PER_REQUEST * 100) / 100,
    },
  };
}
