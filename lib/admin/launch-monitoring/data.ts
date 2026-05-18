// Data aggregation for /admin/launch-monitoring dashboard.
// Pulls from PostHog (24h events), Upstash KV (API usage), GSC (search visibility),
// and optionally Vercel Web Analytics. All sources fail gracefully.

import { fetchFunnelData } from "@/lib/admin/funnel/posthog";
import { getApiUsageStats, getApiCallsHourlySeries, type ApiUsageStats } from "@/lib/rate-limit";
import { fetchGsc30dTotals, isGscConfigured } from "@/lib/stats/gsc";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Alert {
  level: "critical" | "warning" | "info";
  title: string;
  detail: string;
}

export interface Traffic24h {
  posthogConfigured: boolean;
  pageviews: number;
  quizStarts: number;
  quizCompleted: number;
  aiQueries: number;
  blogViews: number;
  /** quiz_completed / quiz_started × 100, null if no quiz starts */
  quizConversionPct: number | null;
}

export interface ApiUsageSummary {
  enabled: boolean;
  totalLast1h: number;
  totalLast24h: number;
  copilotLast24h: number;
  costJpy24h: number;
  /** 24 hourly call counts, index 0 = most recent hour */
  hourlySeries: number[];
  rateLimitFireCount24h: number;
}

export interface GscSummary {
  configured: boolean;
  clicks30d: number;
  impressions30d: number;
}

export interface VercelAnalyticsSummary {
  configured: boolean;
  /** 0 when token absent or API returns no data */
  pageviews24h: number;
}

export interface LaunchMonitoringData {
  traffic: Traffic24h;
  apiUsage: ApiUsageSummary;
  gsc: GscSummary;
  vercel: VercelAnalyticsSummary;
  alerts: Alert[];
  generatedAt: string;
}

// ─── PostHog 24h funnel ───────────────────────────────────────────────────────

async function fetchTraffic24h(): Promise<Traffic24h> {
  try {
    const data = await fetchFunnelData(1);
    if (!data.configured) {
      return {
        posthogConfigured: false,
        pageviews: 0,
        quizStarts: 0,
        quizCompleted: 0,
        aiQueries: 0,
        blogViews: 0,
        quizConversionPct: null,
      };
    }
    const counts = data.event_counts;
    const quizStarts = counts["quiz_started"] ?? 0;
    const quizCompleted = counts["quiz_completed"] ?? 0;
    return {
      posthogConfigured: true,
      pageviews: counts["$pageview"] ?? 0,
      quizStarts,
      quizCompleted,
      aiQueries: counts["ai_query_sent"] ?? 0,
      blogViews: counts["blog_viewed"] ?? 0,
      quizConversionPct:
        quizStarts > 0 ? Math.round((quizCompleted / quizStarts) * 100) : null,
    };
  } catch {
    return {
      posthogConfigured: false,
      pageviews: 0,
      quizStarts: 0,
      quizCompleted: 0,
      aiQueries: 0,
      blogViews: 0,
      quizConversionPct: null,
    };
  }
}

// ─── API usage ────────────────────────────────────────────────────────────────

async function fetchApiUsageSummary(): Promise<ApiUsageSummary> {
  const [stats, hourlySeries]: [ApiUsageStats, number[]] = await Promise.all([
    getApiUsageStats().catch(() => ({
      enabled: false,
      generatedAt: new Date().toISOString(),
      totalLast1h: 0,
      totalLast24h: 0,
      byEndpoint: {
        copilot: { last1h: 0, last24h: 0 },
        "essay-grade": { last1h: 0, last24h: 0 },
        "generate-question": { last1h: 0, last24h: 0 },
        scoring: { last1h: 0, last24h: 0 },
      },
      topIps: [],
      estimatedCostJpy: { last1h: 0, last24h: 0 },
    })),
    getApiCallsHourlySeries().catch(() => Array(24).fill(0) as number[]),
  ]);

  return {
    enabled: stats.enabled,
    totalLast1h: stats.totalLast1h,
    totalLast24h: stats.totalLast24h,
    copilotLast24h: stats.byEndpoint.copilot.last24h,
    costJpy24h: stats.estimatedCostJpy.last24h,
    hourlySeries,
    // rate-limit firings are not tracked separately; approximate from hourly spikes
    rateLimitFireCount24h: 0,
  };
}

// ─── GSC ──────────────────────────────────────────────────────────────────────

async function fetchGscSummary(): Promise<GscSummary> {
  if (!isGscConfigured()) return { configured: false, clicks30d: 0, impressions30d: 0 };
  try {
    const totals = await fetchGsc30dTotals();
    if (!totals) return { configured: true, clicks30d: 0, impressions30d: 0 };
    return { configured: true, clicks30d: totals.clicks, impressions30d: totals.impressions };
  } catch {
    return { configured: true, clicks30d: 0, impressions30d: 0 };
  }
}

// ─── Vercel Analytics (optional) ──────────────────────────────────────────────

async function fetchVercelAnalytics(): Promise<VercelAnalyticsSummary> {
  const token = process.env.VERCEL_ACCESS_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;

  if (!token || !projectId) return { configured: false, pageviews24h: 0 };

  const from = new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 10);
  const to = new Date().toISOString().slice(0, 10);

  try {
    const params = new URLSearchParams({ projectId, from, to });
    if (teamId) params.set("teamId", teamId);

    const res = await fetch(`https://vercel.com/api/v1/web-analytics/data?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!res.ok) return { configured: true, pageviews24h: 0 };

    const json = (await res.json()) as Record<string, unknown>;
    const pv =
      (json.data as Array<{ pageviews?: number }>)?.[0]?.pageviews ??
      (json as { pageviews?: number }).pageviews ??
      0;
    return { configured: true, pageviews24h: Number(pv) };
  } catch {
    return { configured: true, pageviews24h: 0 };
  }
}

// ─── Alert detection ──────────────────────────────────────────────────────────

function buildAlerts(
  traffic: Traffic24h,
  apiUsage: ApiUsageSummary,
  gsc: GscSummary,
): Alert[] {
  const alerts: Alert[] = [];

  if (apiUsage.costJpy24h >= 500) {
    alerts.push({
      level: "warning",
      title: "API コスト高騰",
      detail: `過去 24h の推定コスト ¥${apiUsage.costJpy24h.toFixed(0)} が警戒水準 (¥500) を超えています。`,
    });
  }

  if (apiUsage.totalLast1h >= 200) {
    alerts.push({
      level: "warning",
      title: "直近 1h API 急増",
      detail: `直近 1 時間の API 呼出: ${apiUsage.totalLast1h} 回。異常なスパイクを確認してください。`,
    });
  }

  if (traffic.posthogConfigured && traffic.quizConversionPct !== null && traffic.quizConversionPct < 20) {
    alerts.push({
      level: "info",
      title: "クイズ完了率低下",
      detail: `完了率 ${traffic.quizConversionPct}% — 離脱ポイントを /admin/funnel で確認してください。`,
    });
  }

  if (!traffic.posthogConfigured && !apiUsage.enabled && !gsc.configured) {
    alerts.push({
      level: "info",
      title: "観測基盤未設定",
      detail: "PostHog / KV / GSC いずれも未設定です。上記の設定状況を確認してください。",
    });
  }

  return alerts;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function fetchLaunchMonitoringData(): Promise<LaunchMonitoringData> {
  const [traffic, apiUsage, gsc, vercel] = await Promise.all([
    fetchTraffic24h(),
    fetchApiUsageSummary(),
    fetchGscSummary(),
    fetchVercelAnalytics(),
  ]);

  return {
    traffic,
    apiUsage,
    gsc,
    vercel,
    alerts: buildAlerts(traffic, apiUsage, gsc),
    generatedAt: new Date().toISOString(),
  };
}
