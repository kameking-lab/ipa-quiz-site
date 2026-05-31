import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { fetchFunnelData, isFunnelConfigured } from "@/lib/admin/funnel/posthog";

/**
 * Characterization tests for fetchFunnelData / isFunnelConfigured
 * (lib/admin/funnel/posthog.ts). buildFunnelSteps is covered separately
 * (funnel-steps.test.ts); the orchestrator + env gate were not. Contracts:
 *   1. no PostHog credentials → configured:false, empty funnels/counts, and
 *      fetch is NOT called (admin funnel UI renders the "未設定" state);
 *   2. credentials present → configured:true with exactly the three named
 *      funnels, range_days echoed, and event_counts parsed from the probe;
 *   3. the HogQL row parser maps [event, count], coerces counts, and SKIPS
 *      rows with a blank event name;
 *   4. a failed probe (!ok) degrades to zero counts but still configured:true.
 */

function setEnv(present: boolean) {
  if (present) {
    vi.stubEnv("POSTHOG_API_KEY", "phk_test");
    vi.stubEnv("POSTHOG_PROJECT_ID", "4242");
  } else {
    vi.stubEnv("POSTHOG_API_KEY", "");
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
  }
}

beforeEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("isFunnelConfigured", () => {
  it("reflects whether both credentials are present", () => {
    setEnv(true);
    expect(isFunnelConfigured()).toBe(true);
    setEnv(false);
    expect(isFunnelConfigured()).toBe(false);
  });
});

describe("fetchFunnelData", () => {
  it("returns the unconfigured shape without calling fetch when credentials are absent", async () => {
    setEnv(false);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const res = await fetchFunnelData(7);

    expect(res.configured).toBe(false);
    expect(res.funnels).toEqual([]);
    expect(res.event_counts).toEqual({});
    expect(res.range_days).toBe(7);
    expect(typeof res.cachedAt).toBe("string");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("builds the three named funnels and parses event counts when configured", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          results: [
            ["quiz_started", 60],
            ["$pageview", "100"], // coerced via Number()
            ["", 999], // blank name → skipped
          ],
        }),
      }),
    );

    const res = await fetchFunnelData(30);

    expect(res.configured).toBe(true);
    expect(res.range_days).toBe(30);
    expect(res.funnels.map((f) => f.name)).toEqual([
      "クイズ演習ファネル",
      "論文問題ファネル",
      "ブログ読了ファネル",
    ]);
    expect(res.event_counts).toEqual({ quiz_started: 60, $pageview: 100 });
    expect(Object.keys(res.event_counts)).not.toContain("");

    // The quiz funnel's first step has no predecessor → drop_pct null.
    const quiz = res.funnels[0].steps;
    expect(quiz[0]).toMatchObject({ event: "$pageview", count: 100, drop_pct: null });
    expect(quiz[1]).toMatchObject({ event: "quiz_started", count: 60 });
  });

  it("degrades to zero counts but stays configured when the probe fails", async () => {
    setEnv(true);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }),
    );

    const res = await fetchFunnelData(1);

    expect(res.configured).toBe(true);
    expect(res.event_counts).toEqual({});
    expect(res.funnels).toHaveLength(3);
    expect(res.funnels[0].steps.every((s) => s.count === 0)).toBe(true);
  });
});
