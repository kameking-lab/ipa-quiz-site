import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Characterization tests for lib/rate-limit.ts — the IP-level anti-abuse gate
 * (checkIpRateLimit) used by every LLM API route, plus the /admin/api-usage
 * aggregation (getApiUsageStats / getApiCallsHourlySeries). Untested before; no
 * test imported the top-level @/lib/rate-limit module.
 *
 * KV config is read at module import time, so tests stub env + reset modules
 * before importing (cost-guard.test idiom). The Upstash pipeline is driven via a
 * mocked global fetch that returns an array of { result } entries by position.
 *
 * Load-bearing contracts:
 *   1. KV absent → checkIpRateLimit fails OPEN ({ ok: true }) and never fetches;
 *      stats report enabled:false with all-zero buckets (SSOT fallback);
 *   2. KV present → per-IP minute/hour/day INCR counts gate, in that precedence,
 *      against IP_LIMITS (10 / 100 / 500); over-limit returns the reset boundary;
 *   3. a KV failure (non-ok / throw) also fails OPEN — availability over strictness;
 *   4. usage aggregation sums 24 hourly buckets per endpoint, derives cost from
 *      COST_JPY_PER_REQUEST (§12 SSOT), and merges top-IP sorted sets.
 */

function req(ip = "1.2.3.4"): Request {
  return new Request("https://x.test/api", { headers: { "x-forwarded-for": ip } });
}

/** Wrap raw values as an Upstash pipeline JSON response (array of { result }). */
function kvResponse(values: unknown[]): Response {
  return new Response(JSON.stringify(values.map((v) => ({ result: v }))), {
    status: 200,
  });
}

function enableKv() {
  vi.stubEnv("KV_REST_API_URL", "https://kv.example.com");
  vi.stubEnv("KV_REST_API_TOKEN", "test-token");
}

function disableKv() {
  vi.stubEnv("KV_REST_API_URL", "");
  vi.stubEnv("KV_REST_API_TOKEN", "");
}

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("lib/rate-limit constants (SSOT)", () => {
  it("pins anti-abuse limits, tracked endpoints and per-request cost", async () => {
    disableKv();
    const mod = await import("@/lib/rate-limit");
    expect(mod.IP_LIMITS).toEqual({ minute: 10, hour: 100, day: 500 });
    expect(mod.COST_JPY_PER_REQUEST).toBe(0.055);
    expect(mod.TRACKED_ENDPOINTS).toEqual([
      "copilot",
      "essay-grade",
      "generate-question",
      "scoring",
    ]);
  });
});

describe("checkIpRateLimit — KV disabled (fail open)", () => {
  it("returns ok and never calls fetch", async () => {
    disableKv();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const mod = await import("@/lib/rate-limit");
    await expect(mod.checkIpRateLimit(req(), "copilot")).resolves.toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("checkIpRateLimit — KV enabled", () => {
  // pipeline order: INCR min, EXPIRE, INCR hr, EXPIRE, INCR day, EXPIRE, INCR stats,
  // EXPIRE, ZINCRBY topips, EXPIRE  → counts read at positions 0 (min), 2 (hr), 4 (day).
  function counts(min: number, hr: number, day: number): unknown[] {
    return [min, 1, hr, 1, day, 1, 1, 1, 1, 1];
  }

  it("allows when all counts are within limits", async () => {
    enableKv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(kvResponse(counts(3, 30, 100))));
    const mod = await import("@/lib/rate-limit");
    await expect(mod.checkIpRateLimit(req(), "copilot")).resolves.toEqual({ ok: true });
  });

  it("blocks on the minute window first, with a future reset boundary", async () => {
    enableKv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(kvResponse(counts(11, 200, 600))));
    const mod = await import("@/lib/rate-limit");
    const before = Date.now();
    const res = await mod.checkIpRateLimit(req(), "copilot");
    expect(res.ok).toBe(false);
    if (res.ok === false) {
      expect(res.reason).toBe("minute");
      expect(res.resetAt).toBeGreaterThan(before);
      expect(res.resetAt).toBeLessThanOrEqual(before + 60_000);
    }
  });

  it("blocks on the hour window when minute is under but hour exceeds", async () => {
    enableKv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(kvResponse(counts(5, 101, 200))));
    const mod = await import("@/lib/rate-limit");
    const res = await mod.checkIpRateLimit(req(), "copilot");
    expect(res.ok).toBe(false);
    if (res.ok === false) expect(res.reason).toBe("hour");
  });

  it("blocks on the daily window when minute/hour are under but day exceeds", async () => {
    enableKv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(kvResponse(counts(5, 50, 501))));
    const mod = await import("@/lib/rate-limit");
    const res = await mod.checkIpRateLimit(req(), "copilot");
    expect(res.ok).toBe(false);
    if (res.ok === false) expect(res.reason).toBe("daily");
  });

  it("fails OPEN when the KV pipeline returns non-ok", async () => {
    enableKv();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("nope", { status: 500 })));
    const mod = await import("@/lib/rate-limit");
    await expect(mod.checkIpRateLimit(req(), "copilot")).resolves.toEqual({ ok: true });
  });

  it("fails OPEN when fetch throws", async () => {
    enableKv();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    const mod = await import("@/lib/rate-limit");
    await expect(mod.checkIpRateLimit(req(), "copilot")).resolves.toEqual({ ok: true });
  });
});

describe("getApiUsageStats", () => {
  it("KV disabled → enabled:false with all-zero buckets", async () => {
    disableKv();
    const mod = await import("@/lib/rate-limit");
    const stats = await mod.getApiUsageStats();
    expect(stats.enabled).toBe(false);
    expect(stats.totalLast1h).toBe(0);
    expect(stats.totalLast24h).toBe(0);
    expect(stats.topIps).toEqual([]);
    expect(stats.byEndpoint.copilot).toEqual({ last1h: 0, last24h: 0 });
    expect(stats.estimatedCostJpy).toEqual({ last1h: 0, last24h: 0 });
  });

  it("KV enabled → sums hourly buckets, derives cost, merges top-IP sets", async () => {
    enableKv();
    // 4 endpoints × 24 hourly GETs = 96, then 2 ZREVRANGE WITHSCORES = 98 entries.
    const values: unknown[] = new Array(98).fill(null);
    // copilot (endpoint index 0 → positions 0..23): newest hour 5, one earlier hour 3.
    values[0] = 5;
    values[1] = 3;
    // top-IP sorted sets: [ip, score, ip, score, ...]
    values[96] = ["1.2.3.4", "7"];
    values[97] = ["1.2.3.4", "3", "5.6.7.8", "2"];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(kvResponse(values)));

    const mod = await import("@/lib/rate-limit");
    const stats = await mod.getApiUsageStats();

    expect(stats.enabled).toBe(true);
    expect(stats.byEndpoint.copilot).toEqual({ last1h: 5, last24h: 8 });
    expect(stats.byEndpoint.scoring).toEqual({ last1h: 0, last24h: 0 });
    expect(stats.totalLast1h).toBe(5);
    expect(stats.totalLast24h).toBe(8);
    // cost = total × COST_JPY_PER_REQUEST (0.055), rounded to 2 decimals.
    expect(stats.estimatedCostJpy.last1h).toBe(0.28); // 5 × 0.055 = 0.275 → 0.28
    expect(stats.estimatedCostJpy.last24h).toBe(0.44); // 8 × 0.055 = 0.44
    // merged across both hour buckets: 1.2.3.4 = 7+3 = 10, then 5.6.7.8 = 2.
    expect(stats.topIps).toEqual([
      { ip: "1.2.3.4", count24h: 10 },
      { ip: "5.6.7.8", count24h: 2 },
    ]);
  });
});

describe("getApiCallsHourlySeries", () => {
  it("KV disabled → 24 zeros", async () => {
    disableKv();
    const mod = await import("@/lib/rate-limit");
    const series = await mod.getApiCallsHourlySeries();
    expect(series).toHaveLength(24);
    expect(series.every((n) => n === 0)).toBe(true);
  });

  it("KV enabled → index 0 newest hour, each hour summed across endpoints", async () => {
    enableKv();
    // command order: hour i (outer) × endpoint j (inner) → position i*4 + j.
    const values: unknown[] = new Array(96).fill(null);
    values[0] = 1; // hour0, copilot
    values[1] = 2; // hour0, essay-grade
    values[2] = 3; // hour0, generate-question
    values[3] = 4; // hour0, scoring  → series[0] = 10
    values[8] = 5; // hour2, copilot  → series[2] = 5
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(kvResponse(values)));

    const mod = await import("@/lib/rate-limit");
    const series = await mod.getApiCallsHourlySeries();

    expect(series).toHaveLength(24);
    expect(series[0]).toBe(10);
    expect(series[1]).toBe(0);
    expect(series[2]).toBe(5);
    expect(series.slice(3).every((n) => n === 0)).toBe(true);
  });
});
