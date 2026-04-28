import { LS_KEYS } from "@/lib/storage/keys";
import type { ExamCode } from "@/lib/questions/types";

export interface MockScore {
  id: string;
  exam: ExamCode;
  score: number;
  total: number;
  takenAt: number;
}

interface MockScoreState {
  scores: MockScore[];
}

const EMPTY: MockScoreState = { scores: [] };

function read(): MockScoreState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.mockScores);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as MockScoreState;
    return { scores: Array.isArray(parsed.scores) ? parsed.scores : [] };
  } catch {
    return EMPTY;
  }
}

function write(state: MockScoreState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.mockScores, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function recordMockScore(score: Omit<MockScore, "id" | "takenAt">): MockScore {
  const entry: MockScore = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    takenAt: Date.now(),
    ...score,
  };
  const state = read();
  state.scores.push(entry);
  write(state);
  return entry;
}

export function getMockScores(): MockScore[] {
  return read().scores;
}

export function getNickname(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(LS_KEYS.rankingNickname) ?? "";
  } catch {
    return "";
  }
}

export function setNickname(name: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.rankingNickname, name);
  } catch {
    // ignore
  }
}
