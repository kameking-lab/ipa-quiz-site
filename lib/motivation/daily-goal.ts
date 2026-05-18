import { LS_KEYS } from "@/lib/storage/keys";
import { jstDateString } from "@/lib/streak/core";
import { getHeatmapMap } from "@/lib/motivation/heatmap";

export const DEFAULT_DAILY_GOAL = 10;
export const MIN_DAILY_GOAL = 1;
export const MAX_DAILY_GOAL = 100;

interface DailyGoalStorage {
  target: number;
}

function read(): DailyGoalStorage {
  if (typeof window === "undefined") return { target: DEFAULT_DAILY_GOAL };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.dailyGoal);
    if (!raw) return { target: DEFAULT_DAILY_GOAL };
    const parsed = JSON.parse(raw) as Partial<DailyGoalStorage>;
    const t = parsed.target;
    if (typeof t === "number" && t >= MIN_DAILY_GOAL && t <= MAX_DAILY_GOAL) {
      return { target: t };
    }
    return { target: DEFAULT_DAILY_GOAL };
  } catch {
    return { target: DEFAULT_DAILY_GOAL };
  }
}

function write(data: DailyGoalStorage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.dailyGoal, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function readDailyGoalTarget(): number {
  return read().target;
}

export function writeDailyGoalTarget(target: number): void {
  const clamped = Math.max(MIN_DAILY_GOAL, Math.min(MAX_DAILY_GOAL, Math.round(target)));
  write({ target: clamped });
}

export interface DailyProgress {
  count: number;
  target: number;
  pct: number;
  completed: boolean;
}

export function getDailyProgress(): DailyProgress {
  const target = read().target;
  const map = getHeatmapMap();
  const count = map[jstDateString()] ?? 0;
  const pct = Math.min(100, target > 0 ? Math.round((count / target) * 100) : 0);
  return { count, target, pct, completed: count >= target };
}
