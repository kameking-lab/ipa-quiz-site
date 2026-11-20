import calendar from "./featured-calendar.generated.json";
import { qualificationDisplayKey } from "@/lib/qualifications/groups";

export interface FeaturedExamDate { date: string; endDate?: string; sourceUrl: string; note?: string }
export interface FeaturedCalendarExam {
  key: string;
  qualificationId: string;
  candidates: number | null;
  candidatesSourceUrl?: string;
  scheduleMode?: string;
  dates: readonly FeaturedExamDate[];
}
export const HOME_EXAM_CALENDAR: readonly FeaturedCalendarExam[] = calendar.exams;

export function historyExamLookup(keys: readonly string[], aliases: Readonly<Record<string, string>>) {
  const longestFirst = [...keys].sort((a, b) => b.length - a.length);
  const aliasPrefixes = Object.keys(aliases).sort((a, b) => b.length - a.length);
  return (id: string) => {
    const alias = aliasPrefixes.find(prefix => id.startsWith(prefix));
    if (alias) return keys.includes(aliases[alias]) ? aliases[alias] : undefined;
    const automotive = /^jidosha-20\d{2}-(?:first|second)-(.+)-q\d+$/.exec(id);
    return automotive ? keys.find(key => key === `jidosha-${automotive[1]}`)
      : longestFirst.find(key => id.startsWith(`${key}-`));
  };
}

/** Latest qualification first; choose up to two others by attempts (including
 * reattempts), then display those by recency. */
export function frequentExamKeys(entries: unknown, keys: readonly string[], aliases: Readonly<Record<string, string>> = {}, excludedIds: readonly string[] = [], displayKeys: Readonly<Record<string, string>> = {}): string[] {
  return rankFrequentExams(entries, historyExamLookup(keys, aliases), excludedIds, displayKeys);
}

function rankFrequentExams(
  entries: unknown,
  examFor: (id: string) => string | undefined,
  excludedIds: readonly string[],
  displayKeys: Readonly<Record<string, string>>,
): string[] {
  if (!Array.isArray(entries)) return [];
  const counts = new Map<string, { count: number; latest: number }>();
  for (const entry of entries) {
    if (!entry || typeof entry.id !== "string" || !Number.isFinite(entry.at) || excludedIds.includes(entry.id)) continue;
    const key = examFor(entry.id);
    if (!key) continue;
    const displayKey = displayKeys[key] ?? key;
    const previous = counts.get(displayKey) ?? { count: 0, latest: -Infinity };
    counts.set(displayKey, { count: previous.count + 1, latest: Math.max(previous.latest, entry.at) });
  }
  const byRecency = ([a, x]: [string, { latest: number }], [b, y]: [string, { latest: number }]) =>
    y.latest - x.latest || a.localeCompare(b, "en");
  const recent = [...counts].sort(byRecency);
  if (recent.length === 0) return [];
  const [latest, ...others] = recent;
  const frequent = others.sort(([a, x], [b, y]) => y.count - x.count || byRecency([a, x], [b, y])).slice(0, 2);
  return [latest, ...frequent.sort(byRecency)].map(([key]) => key);
}

/** Keep the lookup and ranking self-contained when the browser runs the inline script. */
export function personalExamReservationScript(
  id: string,
  historyKey: string,
  keys: readonly string[],
  aliases: Readonly<Record<string, string>>,
  excludedIds: readonly string[],
  displayKeys: Readonly<Record<string, string>>,
): string {
  const args = JSON.stringify([id, historyKey, keys, aliases, excludedIds, displayKeys]).replaceAll("<", "\\u003c");
  return `try {
    const [id, historyKey, keys, aliases, excludedIds, displayKeys] = ${args};
    const row = document.getElementById(id);
    const history = JSON.parse(localStorage.getItem(historyKey) || "null");
    const examFor = (${historyExamLookup.toString()})(keys, aliases);
    const personal = (${rankFrequentExams.toString()})(history?.entries, examFor, excludedIds, displayKeys);
    row.dataset.personal = String(personal.length > 0);
  } catch {}`;
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
  const available = new Set(keys.filter(key => !excluded.includes(qualificationDisplayKey(key)) && !excluded.includes(key)));
  const nextByKey = new Map<string, { key: string; candidates: number; next?: FeaturedExamDate }>();
  for (const row of rows) {
    if (!available.has(row.key) || row.scheduleMode === "ondemand" || row.candidates === null || row.candidates <= 0) continue;
    const next = [...row.dates].filter(item => (item.endDate ?? item.date) >= today).sort((a, b) => a.date.localeCompare(b.date))[0];
    const key = qualificationDisplayKey(row.key);
    const previous = nextByKey.get(key);
    // Several children may share the same nationwide candidate count.
    nextByKey.set(key, { key, candidates: Math.max(previous?.candidates ?? 0, row.candidates),
      next: next && (!previous?.next || next.date < previous.next.date) ? next : previous?.next });
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
