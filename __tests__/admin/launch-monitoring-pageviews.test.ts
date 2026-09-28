import { describe, expect, it, vi } from "vitest";

/**
 * Regression test: /admin/launch-monitoring の 24h ページビューは、クライアントが実際に
 * 送っている `page_view` イベントから読む。以前は PostHog 標準の `$pageview` を読んでいたが、
 * PostHogProvider は capture_pageview: false で自動 `$pageview` を送らないため常に 0 だった。
 */

vi.mock("@/lib/admin/funnel/posthog", () => ({
  fetchFunnelData: vi.fn(async () => ({
    configured: true,
    range_days: 1,
    funnels: [],
    event_counts: { page_view: 321, $pageview: 0, quiz_started: 10, quiz_completed: 4 },
    cachedAt: new Date().toISOString(),
  })),
}));

vi.mock("@/lib/rate-limit", () => ({
  getApiUsageStats: vi.fn(async () => {
    throw new Error("kv not configured in test");
  }),
  getApiCallsHourlySeries: vi.fn(async () => {
    throw new Error("kv not configured in test");
  }),
}));

vi.mock("@/lib/stats/gsc", () => ({
  isGscConfigured: () => false,
  fetchGsc30dTotals: vi.fn(),
}));

describe("fetchLaunchMonitoringData — pageviews", () => {
  it("reads 24h pageviews from the page_view event, not $pageview", async () => {
    vi.stubEnv("VERCEL_ACCESS_TOKEN", "");
    const { fetchLaunchMonitoringData } = await import("@/lib/admin/launch-monitoring/data");

    const data = await fetchLaunchMonitoringData();

    expect(data.traffic.posthogConfigured).toBe(true);
    expect(data.traffic.pageviews).toBe(321);
    expect(data.traffic.quizConversionPct).toBe(40);
    vi.unstubAllEnvs();
  });
});
