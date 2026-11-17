import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-11-17T01:30:00Z"));
  vi.stubEnv("KV_REST_API_URL", "https://kv.example.com");
  vi.stubEnv("KV_REST_API_TOKEN", "test-token");
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

function reply() {
  const counts = Array.from({ length: 96 }, (_, i) => String(i));
  return new Response(JSON.stringify([{ result: counts }, { result: [] }, { result: [] }]));
}

describe("dashboard command budget", () => {
  it("replaces 194 GET/ZREVRANGE commands with three, sharing concurrent readers and warm cache", async () => {
    const bodies: string[][][] = [];
    vi.stubGlobal("fetch", vi.fn(async (_url, init) => {
      bodies.push(JSON.parse(init.body));
      return reply();
    }));
    const mod = await import("@/lib/rate-limit");
    const [stats, series] = await Promise.all([mod.getApiUsageStats(), mod.getApiCallsHourlySeries()]);
    expect(bodies.flat()).toHaveLength(3);
    expect(bodies[0][0][0]).toBe("MGET");
    expect(bodies[0][0]).toHaveLength(97);
    expect(new Set(bodies[0][0].slice(1)).size).toBe(96);
    expect(series.reduce((sum, count) => sum + count, 0)).toBe(stats.totalLast24h);
    expect(series[0]).toBe(stats.totalLast1h);
    await mod.getApiUsageStats();
    await mod.getApiCallsHourlySeries();
    expect(bodies.flat()).toHaveLength(3);
    vi.advanceTimersByTime(60_000);
    await mod.getApiUsageStats();
    expect(bodies.flat()).toHaveLength(6);
  });

  it("reloads immediately at an hour boundary, even inside the cache lifetime", async () => {
    vi.setSystemTime(new Date("2026-11-17T01:59:40Z"));
    const fetcher = vi.fn(async () => reply());
    vi.stubGlobal("fetch", fetcher);
    const mod = await import("@/lib/rate-limit");
    await mod.getApiUsageStats();
    vi.advanceTimersByTime(20_000);
    await mod.getApiCallsHourlySeries();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("does not cache an unavailable response", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce(new Response("unavailable", { status: 503 }))
      .mockImplementation(async () => reply());
    vi.stubGlobal("fetch", fetcher);
    const mod = await import("@/lib/rate-limit");
    expect((await mod.getApiUsageStats()).totalLast24h).toBe(0);
    expect((await mod.getApiUsageStats()).totalLast24h).toBeGreaterThan(0);
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("keeps hourly counts when the optional top-IP query fails and retries next time", async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify([
      { result: Array(96).fill("1") }, { error: "unavailable" }, { result: [] },
    ])));
    vi.stubGlobal("fetch", fetcher);
    const mod = await import("@/lib/rate-limit");
    const stats = await mod.getApiUsageStats();
    expect(stats.totalLast24h).toBe(96);
    expect(stats.topIps).toEqual([]);
    await mod.getApiCallsHourlySeries();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });
});
