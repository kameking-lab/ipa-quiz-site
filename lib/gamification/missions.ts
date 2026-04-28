import { LS_KEYS } from "@/lib/storage/keys";
import { jstChallengeDate } from "./daily-challenge";

export type MissionId =
  | "answer-10"
  | "correct-5"
  | "complete-challenge"
  | "study-3-categories"
  | "use-ai"
  | "review-wrong";

export interface MissionDef {
  id: MissionId;
  title: string;
  description: string;
  icon: string;
  target: number;
  xpReward: number;
}

export const MISSIONS: Record<MissionId, MissionDef> = {
  "answer-10": {
    id: "answer-10",
    title: "10問チャレンジ",
    description: "今日 10 問解答する",
    icon: "📝",
    target: 10,
    xpReward: 30,
  },
  "correct-5": {
    id: "correct-5",
    title: "5問正解",
    description: "今日 5 問正解する",
    icon: "🎯",
    target: 5,
    xpReward: 30,
  },
  "complete-challenge": {
    id: "complete-challenge",
    title: "デイリーチャレンジ完走",
    description: "今日のデイリーチャレンジを完走",
    icon: "🏆",
    target: 1,
    xpReward: 50,
  },
  "study-3-categories": {
    id: "study-3-categories",
    title: "幅広く学習",
    description: "今日 3 カテゴリ以上を学習",
    icon: "🌐",
    target: 3,
    xpReward: 30,
  },
  "use-ai": {
    id: "use-ai",
    title: "AIに質問",
    description: "AIコパイロットを 1 回利用",
    icon: "🤖",
    target: 1,
    xpReward: 20,
  },
  "review-wrong": {
    id: "review-wrong",
    title: "復習タイム",
    description: "誤答した問題を 3 問復習",
    icon: "🔄",
    target: 3,
    xpReward: 30,
  },
};

const MISSION_IDS: MissionId[] = Object.keys(MISSIONS) as MissionId[];

export interface MissionProgress {
  date: string;
  missions: MissionId[];
  progress: Record<MissionId, number>;
  claimed: Record<MissionId, boolean>;
}

const EMPTY: MissionProgress = {
  date: "",
  missions: [],
  progress: {} as Record<MissionId, number>,
  claimed: {} as Record<MissionId, boolean>,
};

function dailySeededIds(date: string): MissionId[] {
  let h = 5381;
  for (let i = 0; i < date.length; i++) {
    h = (h * 33) ^ date.charCodeAt(i);
  }
  let s = h >>> 0;
  const arr = [...MISSION_IDS];
  for (let i = arr.length - 1; i > 0; i--) {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    const j = Math.floor(r * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 3);
}

export function readMissions(today: string = jstChallengeDate()): MissionProgress {
  if (typeof window === "undefined") {
    return { date: today, missions: dailySeededIds(today), progress: {} as Record<MissionId, number>, claimed: {} as Record<MissionId, boolean> };
  }
  try {
    const raw = window.localStorage.getItem(LS_KEYS.dailyMissions);
    if (!raw) {
      const fresh = { date: today, missions: dailySeededIds(today), progress: {} as Record<MissionId, number>, claimed: {} as Record<MissionId, boolean> };
      write(fresh);
      return fresh;
    }
    const parsed = JSON.parse(raw) as Partial<MissionProgress>;
    if (parsed.date !== today) {
      const fresh = { date: today, missions: dailySeededIds(today), progress: {} as Record<MissionId, number>, claimed: {} as Record<MissionId, boolean> };
      write(fresh);
      return fresh;
    }
    return {
      date: parsed.date,
      missions: Array.isArray(parsed.missions) ? (parsed.missions as MissionId[]) : dailySeededIds(today),
      progress: (parsed.progress ?? {}) as Record<MissionId, number>,
      claimed: (parsed.claimed ?? {}) as Record<MissionId, boolean>,
    };
  } catch {
    return EMPTY;
  }
}

function write(state: MissionProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.dailyMissions, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function setMissionProgress(id: MissionId, value: number): MissionProgress {
  const today = jstChallengeDate();
  const state = readMissions(today);
  const next: MissionProgress = {
    ...state,
    progress: { ...state.progress, [id]: Math.max(state.progress[id] ?? 0, value) },
  };
  write(next);
  return next;
}

export function incrementMission(id: MissionId, delta: number = 1): MissionProgress {
  const today = jstChallengeDate();
  const state = readMissions(today);
  const cur = state.progress[id] ?? 0;
  return setMissionProgress(id, cur + delta);
}

export function claimMission(id: MissionId): { claimed: boolean; xp: number } {
  const today = jstChallengeDate();
  const state = readMissions(today);
  const def = MISSIONS[id];
  const cur = state.progress[id] ?? 0;
  if (cur < def.target || state.claimed[id]) return { claimed: false, xp: 0 };
  const next: MissionProgress = {
    ...state,
    claimed: { ...state.claimed, [id]: true },
  };
  write(next);
  return { claimed: true, xp: def.xpReward };
}
