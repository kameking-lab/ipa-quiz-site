import type { MetricsRange, MetricsRangeMeta } from "./types";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function resolveRange(
  range: MetricsRange,
  customFrom?: string,
  customTo?: string,
  now: Date = new Date(),
): MetricsRangeMeta {
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  let from: Date;
  let to: Date;
  let label: string;

  switch (range) {
    case "today":
      from = today;
      to = today;
      label = "今日";
      break;
    case "7d":
      from = new Date(today.getTime() - 6 * ONE_DAY_MS);
      to = today;
      label = "直近 7 日";
      break;
    case "30d":
      from = new Date(today.getTime() - 29 * ONE_DAY_MS);
      to = today;
      label = "直近 30 日";
      break;
    case "mtd":
      from = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), 1));
      to = today;
      label = "今月";
      break;
    case "custom": {
      const f = customFrom && /^\d{4}-\d{2}-\d{2}$/.test(customFrom) ? new Date(customFrom + "T00:00:00Z") : today;
      const t = customTo && /^\d{4}-\d{2}-\d{2}$/.test(customTo) ? new Date(customTo + "T00:00:00Z") : today;
      from = f.getTime() <= t.getTime() ? f : t;
      to = f.getTime() <= t.getTime() ? t : f;
      label = `${formatDate(from)} 〜 ${formatDate(to)}`;
      break;
    }
    default:
      from = today;
      to = today;
      label = "今日";
  }

  const spanDays = Math.max(1, Math.round((to.getTime() - from.getTime()) / ONE_DAY_MS) + 1);
  const comparedTo = new Date(from.getTime() - ONE_DAY_MS);
  const comparedFrom = new Date(comparedTo.getTime() - (spanDays - 1) * ONE_DAY_MS);

  return {
    range,
    from: formatDate(from),
    to: formatDate(to),
    label,
    comparedFrom: formatDate(comparedFrom),
    comparedTo: formatDate(comparedTo),
  };
}

export function rangeSpanDays(meta: MetricsRangeMeta): number {
  const f = new Date(meta.from + "T00:00:00Z").getTime();
  const t = new Date(meta.to + "T00:00:00Z").getTime();
  return Math.max(1, Math.round((t - f) / ONE_DAY_MS) + 1);
}

export function dateSeries(from: string, to: string): string[] {
  const out: string[] = [];
  const start = new Date(from + "T00:00:00Z").getTime();
  const end = new Date(to + "T00:00:00Z").getTime();
  for (let t = start; t <= end; t += ONE_DAY_MS) {
    out.push(new Date(t).toISOString().slice(0, 10));
  }
  return out;
}
