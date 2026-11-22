import "server-only";
import { fetchFunnelData } from "@/lib/admin/funnel/posthog";
import { readConversions } from "@/lib/billing/conversion";
import { readFunnel } from "@/lib/billing/funnel";
import { jstDay } from "@/lib/billing/domain";
import { ACTIVITY_EVENTS, type ActivityEventName } from "@/lib/analytics/activity-contract";
import { fetchMetrics } from "./posthog";
import { resolveRange } from "./range";

export async function readDailyMetrics(now = Date.now()) {
  const yesterday = now - 86_400_000;
  const date = jstDay(new Date(yesterday));
  const [conversions, billingFunnel, metrics, funnel] = await Promise.allSettled([
    readConversions(1, yesterday),
    readFunnel(1, yesterday),
    fetchMetrics(resolveRange("custom", date, date, new Date(now))),
    fetchFunnelData(1, new Date(date + "T00:00:00+09:00")),
  ]);
  const conversion = conversions.status === "fulfilled" && conversions.value.available
    ? Object.fromEntries(conversions.value.rows.map(row => [row.channel, row.measured ? row.counts : null])) : null;
  const billing = billingFunnel.status === "fulfilled" && billingFunnel.value.available
    ? billingFunnel.value.days[0]?.counts ?? null : null;
  const posthog = funnel.status === "fulfilled" && funnel.value.configured && !funnel.value.queryFailed
    ? funnel.value.event_counts : null;
  let activity: Record<ActivityEventName, number> | null = null;
  if (metrics.status === "fulfilled" && metrics.value.source === "kv") {
    activity = Object.fromEntries(ACTIVITY_EVENTS.map(event => [event, 0])) as Record<ActivityEventName, number>;
    for (const row of metrics.value.activity.rows) activity[row.event] += row.count;
  }
  return { date, conversion, billing, activity, posthog };
}
