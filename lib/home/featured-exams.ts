import calendar from "./featured-calendar.generated.json";

export interface FeaturedExamDate { date: string; sourceUrl: string; note?: string }
export interface FeaturedCalendarExam {
  key: string;
  qualificationId: string;
  candidates: number | null;
  candidatesSourceUrl?: string;
  dates: readonly FeaturedExamDate[];
}
export const HOME_EXAM_CALENDAR: readonly FeaturedCalendarExam[] = calendar.exams;

/** Attempts, including reattempts; recency breaks ties. Self-contained so the
 * same reader can reserve the correct height before the first paint. */
export function frequentExamKeys(entries: unknown, keys: readonly string[], aliases: Readonly<Record<string, string>> = {}, excludedIds: readonly string[] = []): string[] {
  if (!Array.isArray(entries)) return [];
  const longestFirst = [...keys].sort((a, b) => b.length - a.length);
  const aliasPrefixes = Object.keys(aliases).sort((a, b) => b.length - a.length);
  const counts = new Map<string, { count: number; latest: number }>();
  for (const entry of entries) {
    if (!entry || typeof entry.id !== "string" || !Number.isFinite(entry.at) || excludedIds.includes(entry.id)) continue;
    const automotive = /^jidosha-20\d{2}-(?:first|second)-(.+)-q\d+$/.exec(entry.id);
    const alias = aliasPrefixes.find(prefix => entry.id.startsWith(prefix));
    const key = alias ? aliases[alias] : automotive ? keys.find(key => key === `jidosha-${automotive[1]}`)
      : longestFirst.find(key => entry.id.startsWith(`${key}-`));
    if (!key || !keys.includes(key)) continue;
    const previous = counts.get(key) ?? { count: 0, latest: 0 };
    counts.set(key, { count: previous.count + 1, latest: Math.max(previous.latest, entry.at) });
  }
  return [...counts].sort(([a, x], [b, y]) => y.count - x.count || y.latest - x.latest || a.localeCompare(b, "en"))
    .slice(0, 3).map(([key]) => key);
}

export function japanDate(now: Date): string {
  return new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

/** 90-day group: popularity first. Thereafter: next date, then undated popularity.
 * Expired dates never become the next exam; stale data still fill three cards. */
export function upcomingExamPicks(keys: readonly string[], excluded: readonly string[], now: Date,
  rows: readonly FeaturedCalendarExam[] = HOME_EXAM_CALENDAR) {
  const today = japanDate(now);
  const limit = new Date(Date.parse(`${today}T00:00:00Z`) + 90 * 86400000).toISOString().slice(0, 10);
  const available = new Set(keys.filter(key => !excluded.includes(key)));
  const nextByKey = new Map<string, { key: string; candidates: number; next?: FeaturedExamDate }>();
  for (const row of rows) {
    if (!available.has(row.key) || row.candidates === null || row.candidates <= 0) continue;
    const next = [...row.dates].filter(item => item.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
    const previous = nextByKey.get(row.key);
    if (!previous || (next && (!previous.next || next.date < previous.next.date))) {
      nextByKey.set(row.key, { key: row.key, candidates: row.candidates ?? 0, next });
    }
  }
  const tier = (date?: string) => date ? date <= limit ? 0 : 1 : 2;
  return [...nextByKey.values()].sort((a, b) => {
    const group = tier(a.next?.date) - tier(b.next?.date);
    if (group) return group;
    if (tier(a.next?.date) === 1) {
      const dateOrder = a.next!.date.localeCompare(b.next!.date);
      if (dateOrder) return dateOrder;
    }
    return b.candidates - a.candidates || (a.next?.date ?? "").localeCompare(b.next?.date ?? "") || a.key.localeCompare(b.key, "en");
  }).slice(0, 3);
}
