import { LS_KEYS } from "@/lib/storage/keys";

export const MAX_LEVEL = 100;

/**
 * Quadratic curve so leveling slows progressively without being grindy.
 * Total XP to reach level L = 50 * (L - 1) * L. Level 100 ≈ 495,000 XP total.
 */
export function totalXpForLevel(level: number): number {
  if (level <= 1) return 0;
  if (level >= MAX_LEVEL) return 50 * (MAX_LEVEL - 1) * MAX_LEVEL;
  return 50 * (level - 1) * level;
}

export function levelFromXp(xp: number): number {
  if (xp <= 0) return 1;
  let lo = 1;
  let hi = MAX_LEVEL;
  while (lo < hi) {
    const mid = Math.floor((lo + hi + 1) / 2);
    if (totalXpForLevel(mid) <= xp) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

export interface XpProgress {
  level: number;
  xp: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  progress: number; // 0..1
  isMax: boolean;
}

export function xpProgress(xp: number): XpProgress {
  const level = levelFromXp(xp);
  if (level >= MAX_LEVEL) {
    return {
      level: MAX_LEVEL,
      xp,
      xpIntoLevel: 0,
      xpForNextLevel: 0,
      progress: 1,
      isMax: true,
    };
  }
  const base = totalXpForLevel(level);
  const next = totalXpForLevel(level + 1);
  const xpIntoLevel = xp - base;
  const xpForNextLevel = next - base;
  return {
    level,
    xp,
    xpIntoLevel,
    xpForNextLevel,
    progress: xpForNextLevel > 0 ? xpIntoLevel / xpForNextLevel : 1,
    isMax: false,
  };
}

export const XP_REWARDS = {
  correct: 10,
  incorrect: 2,
  streakBonus: 5, // per study day in current streak, capped
  challengeComplete: 50,
  challengeAllCorrect: 30,
  missionComplete: 20,
  achievementUnlock: 100,
} as const;

export interface XpState {
  total: number;
  earnedToday: number;
  lastEarnedDate: string | null; // YYYY-MM-DD JST
}

const EMPTY: XpState = { total: 0, earnedToday: 0, lastEarnedDate: null };

function jstDate(): string {
  const now = new Date();
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

export function readXp(): XpState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.xpState);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<XpState>;
    const today = jstDate();
    const total = Number.isFinite(parsed.total) ? Number(parsed.total) : 0;
    const earnedToday =
      parsed.lastEarnedDate === today && Number.isFinite(parsed.earnedToday)
        ? Number(parsed.earnedToday)
        : 0;
    return {
      total: Math.max(0, total),
      earnedToday: Math.max(0, earnedToday),
      lastEarnedDate: parsed.lastEarnedDate === today ? today : null,
    };
  } catch {
    return EMPTY;
  }
}

function write(state: XpState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.xpState, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export interface XpAwardResult {
  awarded: number;
  total: number;
  levelBefore: number;
  levelAfter: number;
  leveledUp: boolean;
  progress: XpProgress;
}

export function awardXp(amount: number): XpAwardResult {
  const safe = Math.max(0, Math.floor(amount));
  const before = readXp();
  const today = jstDate();
  const sameDay = before.lastEarnedDate === today;
  const next: XpState = {
    total: before.total + safe,
    earnedToday: (sameDay ? before.earnedToday : 0) + safe,
    lastEarnedDate: today,
  };
  write(next);
  const levelBefore = levelFromXp(before.total);
  const levelAfter = levelFromXp(next.total);
  return {
    awarded: safe,
    total: next.total,
    levelBefore,
    levelAfter,
    leveledUp: levelAfter > levelBefore,
    progress: xpProgress(next.total),
  };
}

export function resetXp(): void {
  write(EMPTY);
}
