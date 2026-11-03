import type { MetricsRangeMeta, MetricsResponse } from "./types";

/** A connection probe is not a measurement. Until the dashboard's complete
 * aggregate queries exist, report missing data explicitly and never synthesize
 * traffic, revenue, errors or recommendations in the production response. */
export async function fetchMetrics(meta: MetricsRangeMeta): Promise<MetricsResponse> {
  const configured = Boolean(process.env.POSTHOG_API_KEY && process.env.POSTHOG_PROJECT_ID);
  return {
    meta,
    source: "unavailable",
    generatedAt: new Date().toISOString(),
    reason: configured
      ? "この管理画面の実測集計は未実装です。実測値は PostHog で確認してください。"
      : "PostHog の集計接続が未設定です。アクセス数は未取得です。",
  };
}
