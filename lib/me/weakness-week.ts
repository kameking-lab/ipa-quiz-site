import { z } from "zod";
import { LS_KEYS } from "@/lib/storage/keys";
import { dayNumber } from "@/lib/study-plan/pace";
import { jstDateString } from "@/lib/streak/core";
import type { StudyPlanSyncEntry } from "@/lib/sync/types";
import type { HistoryEntry } from "@/lib/storage/history";

const date = z.string().refine(value => dayNumber(value) !== null);
const weekGroups = z.array(z.array(z.object({ id: z.string(), topic: z.string() })).nonempty());
const scheduledWeek = z.object({ from: date, to: date, groups: weekGroups });
const savedWeek = z.object({
  from: date, to: date, startedAt: z.number(), examDate: date.optional(),
  complete: z.boolean().optional(),
  groups: weekGroups,
  forecast: z.object({ from: date, to: date, count: z.number().int().positive(), weeks: z.array(scheduledWeek).optional() }).optional(),
});
export type SavedWeek = z.infer<typeof savedWeek>;
type ScheduledWeek = z.infer<typeof scheduledWeek>;
const ownerPrefix = (owner: string) => `${LS_KEYS.weaknessWeek}${encodeURIComponent(owner)}:`;
export const weaknessWeekKey = (owner: string, exam: string) => ownerPrefix(owner) + exam;

export function weaknessForecast(weeks: readonly ScheduledWeek[]): SavedWeek["forecast"] {
  const byDate = new Map<string, ScheduledWeek>();
  for (const week of weeks) {
    const previous = byDate.get(week.from);
    byDate.set(week.from, { ...week, groups: [...(previous?.groups ?? []), ...week.groups] });
  }
  const remaining = [...byDate.values()].filter(week => week.groups.length);
  if (!remaining.length) return undefined;
  return { from: remaining[0].from, to: remaining[remaining.length - 1].to, weeks: remaining,
    count: remaining.reduce((sum, week) => sum + week.groups.reduce((count, group) => count + group.length, 0), 0) };
}

export function continueWeaknessWeek(week: SavedWeek | undefined, today: string, examDate: string | undefined, history: readonly HistoryEntry[]): SavedWeek | undefined {
  if (!week?.complete || week.to >= today || week.examDate !== examDate) return undefined;
  const next = week.forecast?.weeks?.find(candidate => candidate.from <= today && today <= candidate.to);
  if (!next) return undefined;
  const done = new Set(history.filter(entry => entry.at >= week.startedAt).map(entry => entry.id));
  const remaining = (groups: ScheduledWeek["groups"]) => groups.map(group => group.filter(question => !done.has(question.id))).filter(group => group.length);
  const later = (week.forecast?.weeks ?? []).filter(candidate => candidate.from > next.to)
    .map(candidate => ({ ...candidate, groups: remaining(candidate.groups) }));
  return { ...next, groups: remaining(next.groups), startedAt: Date.parse(`${next.from}T00:00:00+09:00`), examDate, complete: true,
    forecast: weaknessForecast(later) };
}

function canSyncWeek(week: SavedWeek, today: string) {
  return week.complete && week.from <= today && (week.to >= today || week.forecast?.weeks?.some(next => next.to >= today));
}

export function readWeek(key: string) {
  try {
    const stored = savedWeek.safeParse(JSON.parse(localStorage.getItem(key) ?? "null"));
    return stored.success ? stored.data : undefined;
  } catch { return undefined; }
}

export function getWeaknessWeekEntries(owner: string, now = new Date()): StudyPlanSyncEntry[] {
  const prefix = ownerPrefix(owner);
  const today = jstDateString(now);
  return Object.keys(localStorage).filter(key => key.startsWith(prefix)).flatMap(id => {
    const week = readWeek(id);
    if (!week || !canSyncWeek(week, today)) return [];
    return [{ id, payload: { kind: "weakness-week-v1", week }, createdAt: week.startedAt, updatedAt: now.getTime() }];
  });
}

export function mergeWeaknessWeekEntries(owner: string, entries: readonly StudyPlanSyncEntry[], now = new Date()) {
  const today = jstDateString(now);
  const prefix = ownerPrefix(owner);
  const present = new Set<string>();
  const schema = z.object({ kind: z.literal("weakness-week-v1"), week: savedWeek });
  for (const entry of entries) {
    if (!entry.id.startsWith(prefix)) continue;
    const payload = schema.safeParse(entry.payload);
    if (!payload.success) continue;
    const week = payload.data.week;
    if (!canSyncWeek(week, today)) continue;
    const local = readWeek(entry.id);
    const current = local && local.from <= today && local.to >= today;
    if (current && local.examDate !== week.examDate) continue;
    if (local?.complete && local.from > week.from && canSyncWeek(local, today)) continue;
    present.add(entry.id);
    if (JSON.stringify(local) === JSON.stringify(week)) continue;
    localStorage.setItem(entry.id, JSON.stringify(week));
    window.dispatchEvent(new CustomEvent("weakness-week:synced", { detail: entry.id }));
  }
  return present;
}
