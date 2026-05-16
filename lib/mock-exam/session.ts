import type { ChoiceKey, ExamCode } from "@/lib/questions/types";
import type { SlimMockQuestion } from "./types";

const SESSION_KEY = "ipa-quiz:mock-exam-session:v1";
/** Saved sessions older than this are ignored on resume. */
const SESSION_TTL_MS = 1000 * 60 * 60 * 6;

export interface MockExamActiveSession {
  exam: ExamCode;
  startedAt: number;
  /** Saved at write time; used to recompute remaining time after reload. */
  savedAt: number;
  totalSec: number;
  questions: SlimMockQuestion[];
  answers: (ChoiceKey | undefined)[];
  index: number;
}

export function saveActiveSession(s: MockExamActiveSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ ...s, savedAt: Date.now() }),
    );
  } catch {
    // quota exceeded, ignore — we'll just lose resume capability
  }
}

export function loadActiveSession(): MockExamActiveSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as MockExamActiveSession;
    if (
      !parsed ||
      !Array.isArray(parsed.questions) ||
      parsed.questions.length === 0 ||
      typeof parsed.startedAt !== "number"
    ) {
      return null;
    }
    if (Date.now() - parsed.savedAt > SESSION_TTL_MS) {
      clearActiveSession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearActiveSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

/**
 * Seconds remaining for a saved session — based on elapsed wall-clock since
 * `startedAt`, not since the last save, so closing the tab does not pause
 * the timer (matches real exam behavior).
 */
export function computeRemainingSec(s: MockExamActiveSession): number {
  const elapsed = Math.floor((Date.now() - s.startedAt) / 1000);
  return Math.max(0, s.totalSec - elapsed);
}
