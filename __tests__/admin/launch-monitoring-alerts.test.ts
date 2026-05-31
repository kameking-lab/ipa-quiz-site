import { describe, it, expect } from "vitest";
import {
  buildAlerts,
  type Traffic24h,
  type ApiUsageSummary,
  type GscSummary,
} from "@/lib/admin/launch-monitoring/data";

/**
 * Characterization tests for buildAlerts — the /admin/launch-monitoring alert
 * thresholds. These guard the operational warning rules (esp. the ¥500 API
 * cost-cap alert tied to §0 of CLAUDE.md). Pure function, source thresholds
 * unchanged; only `buildAlerts` was newly exported for testing.
 */

function traffic(overrides: Partial<Traffic24h> = {}): Traffic24h {
  return {
    posthogConfigured: true,
    pageviews: 100,
    quizStarts: 50,
    quizCompleted: 40,
    aiQueries: 10,
    blogViews: 5,
    quizConversionPct: 80,
    ...overrides,
  };
}

function apiUsage(overrides: Partial<ApiUsageSummary> = {}): ApiUsageSummary {
  return {
    enabled: true,
    totalLast1h: 0,
    totalLast24h: 0,
    copilotLast24h: 0,
    costJpy24h: 0,
    hourlySeries: [],
    rateLimitFireCount24h: 0,
    ...overrides,
  };
}

function gsc(overrides: Partial<GscSummary> = {}): GscSummary {
  return { configured: true, clicks30d: 0, impressions30d: 0, ...overrides };
}

describe("buildAlerts", () => {
  it("returns no alerts when everything is healthy and configured", () => {
    expect(buildAlerts(traffic(), apiUsage(), gsc())).toEqual([]);
  });

  it("warns when 24h API cost reaches the ¥500 cap threshold", () => {
    const alerts = buildAlerts(traffic(), apiUsage({ costJpy24h: 500 }), gsc());
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toMatchObject({ level: "warning", title: "API コスト高騰" });
    expect(alerts[0].detail).toContain("¥500");
  });

  it("does NOT warn just below the ¥500 cost threshold", () => {
    expect(buildAlerts(traffic(), apiUsage({ costJpy24h: 499 }), gsc())).toEqual([]);
  });

  it("rounds the cost detail to a whole yen", () => {
    const alerts = buildAlerts(traffic(), apiUsage({ costJpy24h: 612.7 }), gsc());
    expect(alerts[0].detail).toContain("¥613");
  });

  it("warns when last-1h API calls reach the 200 spike threshold", () => {
    const alerts = buildAlerts(traffic(), apiUsage({ totalLast1h: 200 }), gsc());
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toMatchObject({ level: "warning", title: "直近 1h API 急増" });
    expect(alerts[0].detail).toContain("200");
  });

  it("does NOT warn just below the 200 spike threshold", () => {
    expect(buildAlerts(traffic(), apiUsage({ totalLast1h: 199 }), gsc())).toEqual([]);
  });

  it("flags low quiz conversion below 20% only when posthog is configured", () => {
    const alerts = buildAlerts(
      traffic({ posthogConfigured: true, quizConversionPct: 19 }),
      apiUsage(),
      gsc(),
    );
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toMatchObject({ level: "info", title: "クイズ完了率低下" });
  });

  it("does NOT flag conversion at exactly 20%", () => {
    expect(
      buildAlerts(traffic({ quizConversionPct: 20 }), apiUsage(), gsc()),
    ).toEqual([]);
  });

  it("does NOT flag low conversion when posthog is unconfigured", () => {
    // posthog unconfigured + apiUsage enabled + gsc configured → no infra alert either
    const alerts = buildAlerts(
      traffic({ posthogConfigured: false, quizConversionPct: 5 }),
      apiUsage({ enabled: true }),
      gsc({ configured: true }),
    );
    expect(alerts).toEqual([]);
  });

  it("does NOT flag conversion when quizConversionPct is null (no quiz starts)", () => {
    expect(
      buildAlerts(traffic({ quizConversionPct: null }), apiUsage(), gsc()),
    ).toEqual([]);
  });

  it("warns about missing observability only when all three sources are unset", () => {
    const alerts = buildAlerts(
      traffic({ posthogConfigured: false }),
      apiUsage({ enabled: false }),
      gsc({ configured: false }),
    );
    expect(alerts).toHaveLength(1);
    expect(alerts[0]).toMatchObject({ level: "info", title: "観測基盤未設定" });
  });

  it("does NOT warn about observability when at least one source is set", () => {
    const alerts = buildAlerts(
      traffic({ posthogConfigured: false }),
      apiUsage({ enabled: false }),
      gsc({ configured: true }),
    );
    expect(alerts).toEqual([]);
  });

  it("can emit multiple independent alerts together", () => {
    const alerts = buildAlerts(
      traffic({ posthogConfigured: true, quizConversionPct: 10 }),
      apiUsage({ costJpy24h: 800, totalLast1h: 300 }),
      gsc(),
    );
    const titles = alerts.map((a) => a.title);
    expect(titles).toEqual([
      "API コスト高騰",
      "直近 1h API 急増",
      "クイズ完了率低下",
    ]);
  });
});
