import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  isPosthogStatsConfigured,
  fetchFeatureBreakdown,
  fetchReferrerBreakdown,
} from "@/lib/stats/posthog";

/**
 * Characterization tests for the public /stats PostHog fetchers. The env gate
 * decides real-data vs graceful-null, and the feature/referrer bucketing +
 * percentage aggregation produce the values rendered on /stats. Source is
 * unchanged; HogQL responses are shaped as `{ results: [[col0, col1], ...] }`.
 */

function setEnv() {
  vi.stubEnv("POSTHOG_API_KEY", "phx_key");
  vi.stubEnv("POSTHOG_PROJECT_ID", "proj-1");
  vi.stubEnv("POSTHOG_HOST", "https://eu.posthog.com/");
}

function resultsFetch(results: unknown[][]) {
  return vi.fn().mockResolvedValue({ ok: true, json: async () => ({ results }) });
}

beforeEach(() => {
  setEnv();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("isPosthogStatsConfigured", () => {
  it("is true when apiKey and projectId are present", () => {
    expect(isPosthogStatsConfigured()).toBe(true);
  });

  it("is false when the API key is missing", () => {
    vi.stubEnv("POSTHOG_API_KEY", "");
    expect(isPosthogStatsConfigured()).toBe(false);
  });

  it("is false when the project id is missing", () => {
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
    expect(isPosthogStatsConfigured()).toBe(false);
  });
});

describe("fetch functions return null when unconfigured", () => {
  beforeEach(() => {
    vi.stubEnv("POSTHOG_PROJECT_ID", "");
    vi.stubGlobal("fetch", vi.fn());
  });

  it("fetchFeatureBreakdown → null", async () => {
    expect(await fetchFeatureBreakdown()).toBeNull();
  });
  it("fetchReferrerBreakdown → null", async () => {
    expect(await fetchReferrerBreakdown()).toBeNull();
  });
});

describe("fetchFeatureBreakdown", () => {
  it("classifies paths into feature buckets, computes pct, and sorts desc", async () => {
    vi.stubGlobal(
      "fetch",
      resultsFetch([
        ["/quiz/123", 50],
        ["/q/ap-2023h-am-q1", 10], // also クイズ → merges with /quiz
        ["/afternoon/ap", 20],
        ["/essays/sc", 5],
        ["/mock-exam", 5],
        ["/blog/post", 4],
        ["/ranking", 3],
        ["/glossary/tcp", 2],
        ["/about", 1], // その他
        ["", 999], // empty path skipped, excluded from grand total
      ]),
    );
    const rows = await fetchFeatureBreakdown();
    // grand = 50+10+20+5+5+4+3+2+1 = 100 (empty path's 999 excluded).
    expect(rows).not.toBeNull();
    const byFeature = Object.fromEntries(rows!.map((r) => [r.feature, r]));
    expect(byFeature["クイズ"].pageviews).toBe(60);
    expect(byFeature["クイズ"].pct).toBe(60);
    expect(byFeature["午後問題"].pageviews).toBe(20);
    expect(byFeature["その他"].pageviews).toBe(1);
    // Descending by pageviews — クイズ (60) leads.
    expect(rows![0].feature).toBe("クイズ");
    for (let i = 1; i < rows!.length; i++) {
      expect(rows![i - 1].pageviews).toBeGreaterThanOrEqual(rows![i].pageviews);
    }
  });

  it("returns [] when there are no pageviews", async () => {
    vi.stubGlobal("fetch", resultsFetch([]));
    expect(await fetchFeatureBreakdown()).toEqual([]);
  });

  it("returns null when the HogQL body has no results", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) }));
    expect(await fetchFeatureBreakdown()).toBeNull();
  });

  it("returns null on a non-ok HogQL response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) }));
    expect(await fetchFeatureBreakdown()).toBeNull();
  });
});

describe("fetchReferrerBreakdown", () => {
  it("classifies referring domains into Direct/Search/Social/Referrer buckets", async () => {
    vi.stubGlobal(
      "fetch",
      resultsFetch([
        ["$direct", 40],
        ["www.google.com", 30],
        ["t.co", 20],
        ["news.ycombinator.com", 10],
      ]),
    );
    const rows = await fetchReferrerBreakdown();
    const bySource = Object.fromEntries(rows!.map((r) => [r.source, r.pageviews]));
    expect(bySource["Direct"]).toBe(40);
    expect(bySource["Search"]).toBe(30);
    expect(bySource["Social"]).toBe(20);
    expect(bySource["Referrer"]).toBe(10);
    // pct of Direct = 40/100*100 = 40.0
    expect(rows!.find((r) => r.source === "Direct")!.pct).toBe(40);
    expect(rows![0].source).toBe("Direct"); // desc sort
  });
});
