import type { ExamCode, Session } from "./types";

export const SPECIALIST_EXAMS: readonly ExamCode[] = ["st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"];
export const PRACTICE_SESSIONS: readonly Session[] = ["am", "am1", "am2", "kamoku-a", "kamoku-b", "gakka", "riron", "denryoku", "kikai", "houki"];

/** Specialist practice starts with the specialist paper; common AM I is explicit. */
export function defaultPracticeSession(exam: ExamCode, year?: number): Session {
  if (SPECIALIST_EXAMS.includes(exam)) return "am2";
  if ((exam === "fe" || exam === "sg") && (!year || year >= 2023)) return "kamoku-a";
  if (exam === "fp2" || exam === "fp3" || exam === "denko2") return "gakka";
  if (exam === "denken3") return "riron";
  return "am";
}

export function parsePracticeSession(value?: string): Session | undefined {
  return PRACTICE_SESSIONS.includes(value as Session) ? value as Session : undefined;
}

export function practiceSessionLabel(session: Session): string {
  return ({ am: "午前", am1: "午前I（共通）", am2: "午前II（専門）", "kamoku-a": "科目A", "kamoku-b": "科目B", pm: "午後", pm1: "午後I", pm2: "午後II", gakka: "学科", riron: "理論", denryoku: "電力", kikai: "機械", houki: "法規" })[session];
}

export function quizBackHref({ exam, mode, returnTo }: { exam: string; mode?: string; returnTo?: string }): string {
  // Only local learning destinations; never accept external URLs or player loops.
  if (returnTo && /^\/(?!\/)/.test(returnTo) && !/[\\\u0000-\u0020]/.test(returnTo) && !/^\/quiz(?:[/?#]|$)/.test(returnTo)) return returnTo;
  if (mode === "year") return `/modes/year?exam=${encodeURIComponent(exam)}`;
  if (mode === "topic") return `/modes/topic?exam=${encodeURIComponent(exam)}`;
  return `/${encodeURIComponent(exam)}`;
}
