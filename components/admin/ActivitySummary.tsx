import { resolveRange } from "@/lib/admin/metrics/range";
import { readActivity } from "@/lib/analytics/activity";
import { jstDay } from "@/lib/billing/domain";
import { ActivityReport } from "./ActivityReport";

export async function ActivitySummary({ days = 7 }: { days?: number }) {
  const to = resolveRange("today").to;
  const from = jstDay(new Date(Date.now() - (days - 1) * 86400000));
  return <ActivityReport data={await readActivity(from, to)} period={`${from} 〜 ${to}`} />;
}
