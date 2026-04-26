import { LS_KEYS } from "@/lib/storage/keys";
import { jstDateString } from "@/lib/streak/core";
import type { HistoryEntry } from "@/lib/storage/history";

export interface DayCount {
  date: string;
  count: number;
}

interface StoredMap {
  byDate: Record<string, number>;
  lastSeenAt: number;
  lastEntryCount: number;
}

const EMPTY: StoredMap = { byDate: {}, lastSeenAt: 0, lastEntryCount: 0 };

function read(): StoredMap {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.studyDays);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<StoredMap>;
    return {
      byDate:
        parsed.byDate && typeof parsed.byDate === "object"
          ? (parsed.byDate as Record<string, number>)
          : {},
      lastSeenAt: typeof parsed.lastSeenAt === "number" ? parsed.lastSeenAt : 0,
      lastEntryCount:
        typeof parsed.lastEntryCount === "number" ? parsed.lastEntryCount : 0,
    };
  } catch {
    return { ...EMPTY };
  }
}

function write(m: StoredMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.studyDays, JSON.stringify(m));
  } catch {
    // ignore quota
  }
}

export function dateForEntry(at: number): string {
  return jstDateString(new Date(at));
}

export function rebuildHeatmapFromHistory(entries: HistoryEntry[]): Record<string, number> {
  const out: Record<string, number> = {};
  for (const e of entries) {
    const d = dateForEntry(e.at);
    out[d] = (out[d] ?? 0) + 1;
  }
  return out;
}

export function syncHeatmapWithHistory(entries: HistoryEntry[]): Record<string, number> {
  const stored = read();
  if (entries.length === stored.lastEntryCount && Object.keys(stored.byDate).length > 0) {
    return stored.byDate;
  }
  const byDate = rebuildHeatmapFromHistory(entries);
  write({ byDate, lastSeenAt: Date.now(), lastEntryCount: entries.length });
  return byDate;
}

export function recordStudyOnDate(date: string = jstDateString()): void {
  const stored = read();
  stored.byDate[date] = (stored.byDate[date] ?? 0) + 1;
  stored.lastSeenAt = Date.now();
  write(stored);
}

export function getHeatmapMap(): Record<string, number> {
  return read().byDate;
}

export function generateDayRange(days: number, end: Date = new Date()): string[] {
  const out: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end.getTime() - i * 86_400_000);
    out.push(jstDateString(d));
  }
  return out;
}

export function intensityLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count <= 0) return 0;
  if (count < 5) return 1;
  if (count < 15) return 2;
  if (count < 30) return 3;
  return 4;
}

export function totalStudyDays(byDate: Record<string, number>): number {
  return Object.values(byDate).filter((c) => c > 0).length;
}

export function totalAnswered(byDate: Record<string, number>): number {
  return Object.values(byDate).reduce((s, c) => s + c, 0);
}
