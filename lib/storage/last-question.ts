import type { ExamCode, Season, Session } from "@/lib/questions/types";
import { LS_KEYS } from "./keys";

export interface LastQuestionState {
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  qNumber: number;
  part?: "a" | "b";
  answeredAt: number;
}

export function readLastQuestion(): LastQuestionState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.lastQuestion);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LastQuestionState>;
    if (
      typeof parsed.exam !== "string" ||
      typeof parsed.year !== "number" ||
      typeof parsed.season !== "string" ||
      typeof parsed.session !== "string" ||
      typeof parsed.qNumber !== "number" ||
      (parsed.part !== undefined && parsed.part !== "a" && parsed.part !== "b") ||
      typeof parsed.answeredAt !== "number"
    ) {
      return null;
    }
    return parsed as LastQuestionState;
  } catch {
    return null;
  }
}

export function writeLastQuestion(state: LastQuestionState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.lastQuestion, JSON.stringify(state));
  } catch {
    // ignore quota errors
  }
}

export function clearLastQuestion(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LS_KEYS.lastQuestion);
  } catch {
    // ignore
  }
}
