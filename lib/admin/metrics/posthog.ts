import type { MetricsRangeMeta, MetricsResponse } from "./types";
import { readActivity } from "@/lib/analytics/activity";

/** The anonymous first-party aggregate does not require an external analytics SDK. */
export async function fetchMetrics(meta: MetricsRangeMeta): Promise<MetricsResponse> {
  const activity = await readActivity(meta.from, meta.to);
  if (activity.available) return { meta, source: "kv", generatedAt: new Date().toISOString(), activity };
  return {
    meta,
    source: "unavailable",
    generatedAt: new Date().toISOString(),
    reason: "KV集計が未設定、取得失敗、または保存期間の95日を超える指定です。",
  };
}
