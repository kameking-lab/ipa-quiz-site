import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  readGscConfig,
  isGscConfigured,
  fetchGsc30dTotals,
  fetchGscDailyTrend,
  fetchGscTopQueries,
} from "@/lib/stats/gsc";

/**
 * Characterization tests for the Google Search Console client. The four-env-var
 * gate (readGscConfig) decides whether /stats shows real data or the
 * "連携準備中" fallback, and roundBucket is the privacy-bucketing contract for
 * the publicly-rendered top-query table. Source is unchanged.
 */

const FULL_ENV: Record<string, string> = {
  GSC_SITE_URL: "sc-domain:kakomon-ai.jp",
  GSC_OAUTH_CLIENT_ID: "client-id",
  GSC_OAUTH_CLIENT_SECRET: "client-secret",
  GSC_OAUTH_REFRESH_TOKEN: "refresh-token",
};

function setFullEnv() {
  for (const [k, v] of Object.entries(FULL_ENV)) vi.stubEnv(k, v);
}

/**
 * A fetch router that returns an OAuth token for the token endpoint and a
 * fixed analytics payload for the searchAnalytics endpoint. Handles the
 * module-level token cache transparently (the token call may be skipped).
 */
function routedFetch(rows: unknown[]) {
  return vi.fn().mockImplementation(async (url: string) => {
    if (url.includes("oauth2.googleapis.com/token")) {
      return { ok: true, json: async () => ({ access_token: "tok", expires_in: 3600 }) };
    }
    return { ok: true, json: async () => ({ rows }) };
  });
}

beforeEach(() => {
  setFullEnv();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("readGscConfig / isGscConfigured", () => {
  it("returns the config when all four env vars are present", () => {
    expect(readGscConfig()).toEqual({
      siteUrl: "sc-domain:kakomon-ai.jp",
      clientId: "client-id",
      clientSecret: "client-secret",
      refreshToken: "refresh-token",
    });
    expect(isGscConfigured()).toBe(true);
  });

  it.each(Object.keys(FULL_ENV))(
    "returns null (and not configured) when %s is missing",
    (missing) => {
      vi.stubEnv(missing, "");
      expect(readGscConfig()).toBeNull();
      expect(isGscConfigured()).toBe(false);
    },
  );
});

describe("fetch functions return null when unconfigured", () => {
  beforeEach(() => {
    // Blank one required var so the config gate trips.
    vi.stubEnv("GSC_OAUTH_REFRESH_TOKEN", "");
    vi.stubGlobal("fetch", vi.fn());
  });

  it("fetchGsc30dTotals → null", async () => {
    expect(await fetchGsc30dTotals()).toBeNull();
  });
  it("fetchGscDailyTrend → null", async () => {
    expect(await fetchGscDailyTrend()).toBeNull();
  });
  it("fetchGscTopQueries → null", async () => {
    expect(await fetchGscTopQueries()).toBeNull();
  });
});

describe("fetchGsc30dTotals", () => {
  it("rounds the single aggregate row and stamps the date range", async () => {
    vi.stubGlobal("fetch", routedFetch([{ impressions: 1234.6, clicks: 7.2 }]));
    const totals = await fetchGsc30dTotals();
    expect(totals?.impressions).toBe(1235);
    expect(totals?.clicks).toBe(7);
    // 31-day window ending at the ~2-day GSC data lag.
    expect(totals?.rangeFrom).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(totals?.rangeTo).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(totals!.rangeFrom < totals!.rangeTo).toBe(true);
  });

  it("treats an empty row set as zero totals", async () => {
    vi.stubGlobal("fetch", routedFetch([]));
    const totals = await fetchGsc30dTotals();
    expect(totals?.impressions).toBe(0);
    expect(totals?.clicks).toBe(0);
  });
});

describe("fetchGscDailyTrend", () => {
  it("maps rows, drops empty dates, and sorts ascending by date", async () => {
    vi.stubGlobal(
      "fetch",
      routedFetch([
        { keys: ["2026-03-02"], impressions: 10.4, clicks: 1 },
        { keys: [""], impressions: 99, clicks: 9 }, // dropped (empty date)
        { keys: ["2026-03-01"], impressions: 5, clicks: 0.6 },
      ]),
    );
    const trend = await fetchGscDailyTrend();
    expect(trend).toEqual([
      { date: "2026-03-01", impressions: 5, clicks: 1 },
      { date: "2026-03-02", impressions: 10, clicks: 1 },
    ]);
  });
});

describe("fetchGscTopQueries (privacy buckets)", () => {
  it("buckets impression/click counts into privacy-safe labels and drops empty queries", async () => {
    vi.stubGlobal(
      "fetch",
      routedFetch([
        { keys: ["fe 過去問"], impressions: 0, clicks: 0 },
        { keys: ["ap 午前"], impressions: 50, clicks: 50 },
        { keys: ["基本情報"], impressions: 500, clicks: 500 },
        { keys: ["応用情報"], impressions: 5000, clicks: 5000 },
        { keys: ["sg 試験"], impressions: 50_000, clicks: 50_000 },
        { keys: ["情報処理"], impressions: 200_000, clicks: 200_000 },
        { keys: [""], impressions: 1, clicks: 1 }, // dropped (empty query)
      ]),
    );
    const top = await fetchGscTopQueries();
    expect(top).toEqual([
      { query: "fe 過去問", impressionsBucket: "1 桁", clicksBucket: "1 桁" },
      { query: "ap 午前", impressionsBucket: "数十回", clicksBucket: "数十回" },
      { query: "基本情報", impressionsBucket: "数百回", clicksBucket: "数百回" },
      { query: "応用情報", impressionsBucket: "数千回", clicksBucket: "数千回" },
      { query: "sg 試験", impressionsBucket: "数万回", clicksBucket: "数万回" },
      { query: "情報処理", impressionsBucket: "10 万回以上", clicksBucket: "10 万回以上" },
    ]);
  });
});
