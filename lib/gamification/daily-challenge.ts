import { LS_KEYS } from "@/lib/storage/keys";

export const DAILY_CHALLENGE_SIZE = 5;

export function jstChallengeDate(now: Date = new Date()): string {
  const jst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

/** Mulberry32-style deterministic PRNG for stable picks per day. */
export function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dateSeed(date: string): number {
  let h = 2166136261;
  for (let i = 0; i < date.length; i++) {
    h ^= date.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickDeterministic<T>(items: T[], n: number, seed: number): T[] {
  const rnd = seededRandom(seed);
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, n);
}

export interface DailyChallengeRecord {
  date: string;
  questionIds: string[];
  answers: Array<"correct" | "incorrect" | "pending">;
  completedAt: number | null;
  perfect: boolean;
  consecutiveDays: number;
  perfectStreak: number;
  lastCompletedDate: string | null;
}

const EMPTY: DailyChallengeRecord = {
  date: "",
  questionIds: [],
  answers: [],
  completedAt: null,
  perfect: false,
  consecutiveDays: 0,
  perfectStreak: 0,
  lastCompletedDate: null,
};

export function readDailyChallenge(): DailyChallengeRecord {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.dailyChallenge);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<DailyChallengeRecord>;
    return { ...EMPTY, ...parsed } as DailyChallengeRecord;
  } catch {
    return EMPTY;
  }
}

function write(state: DailyChallengeRecord): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.dailyChallenge, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function isYesterdayJst(prev: string, today: string): boolean {
  if (!prev) return false;
  const prevDate = new Date(prev + "T00:00:00Z");
  const todayDate = new Date(today + "T00:00:00Z");
  const diff = (todayDate.getTime() - prevDate.getTime()) / (24 * 60 * 60 * 1000);
  return Math.round(diff) === 1;
}

export function ensureChallengeForToday(
  questionIds: string[],
  today: string = jstChallengeDate(),
): DailyChallengeRecord {
  const current = readDailyChallenge();
  if (current.date === today && current.questionIds.length === questionIds.length) {
    return current;
  }
  const fresh: DailyChallengeRecord = {
    ...current,
    date: today,
    questionIds,
    answers: questionIds.map(() => "pending"),
    completedAt: null,
    perfect: false,
  };
  write(fresh);
  return fresh;
}

export interface CompletionResult {
  correctCount: number;
  total: number;
  perfect: boolean;
  consecutiveDays: number;
  perfectStreak: number;
  alreadyCompleted: boolean;
}

export function completeChallenge(
  answers: Array<"correct" | "incorrect">,
  today: string = jstChallengeDate(),
): CompletionResult {
  const current = readDailyChallenge();
  const correctCount = answers.filter((a) => a === "correct").length;
  const total = answers.length;
  const perfect = correctCount === total && total > 0;

  if (current.date === today && current.completedAt) {
    return {
      correctCount,
      total,
      perfect: current.perfect,
      consecutiveDays: current.consecutiveDays,
      perfectStreak: current.perfectStreak,
      alreadyCompleted: true,
    };
  }

  const consecutive =
    current.lastCompletedDate && isYesterdayJst(current.lastCompletedDate, today)
      ? current.consecutiveDays + 1
      : current.lastCompletedDate === today
      ? current.consecutiveDays
      : 1;
  const perfectStreak = perfect
    ? current.lastCompletedDate && isYesterdayJst(current.lastCompletedDate, today)
      ? current.perfectStreak + 1
      : 1
    : 0;

  const next: DailyChallengeRecord = {
    ...current,
    date: today,
    questionIds: current.questionIds,
    answers,
    completedAt: Date.now(),
    perfect,
    consecutiveDays: consecutive,
    perfectStreak,
    lastCompletedDate: today,
  };
  write(next);
  return { correctCount, total, perfect, consecutiveDays: consecutive, perfectStreak, alreadyCompleted: false };
}
