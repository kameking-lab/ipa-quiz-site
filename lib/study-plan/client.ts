"use client";
import { getPaceAttempts } from "./pace-storage";
import { createHistoryStore } from "@/lib/storage/history";
import type { PlanQuestion } from "./pace";
import type { ExamSchedule } from "./schedule";
import type { PaperQuestionIndex } from "@/mobile/shared/paper-index";
export interface CatalogQuestion extends PlanQuestion { season: string; session: string; qNumber: number; part?: string;
  paperId?: string; paperTitle?: string; pdfUrl?: string; indexUrl?: string;
  number?: number; choiceCount?: number; answerAuthority?: PaperQuestionIndex["answerAuthority"]; scorable?: boolean }
export function paceAttempts() { return getPaceAttempts(createHistoryStore().getAllEntries()); }
export async function loadPlanCatalog(exam: string, signal?: AbortSignal): Promise<CatalogQuestion[]> {
  const response = await fetch(`/api/study-plan/catalog/${encodeURIComponent(exam)}`, { signal });
  if (!response.ok) throw new Error("問題を取得できませんでした。");
  const data = await response.json() as { questions: CatalogQuestion[] };
  if (!Array.isArray(data.questions)) throw new Error("問題を読み込めませんでした");
  return data.questions;
}

export async function loadPlanSchedule(exam: string, signal: AbortSignal): Promise<ExamSchedule | null> {
  try {
    const response = await fetch(`/api/exam-schedule/${encodeURIComponent(exam)}`, { signal });
    const data = response.ok ? await response.json() as ExamSchedule : null;
    return data?.exam === exam && Array.isArray(data.sessions) ? data : null;
  } catch {
    return null;
  }
}

export function clearBatchQuestion() {
  const url = new URL(location.href);
  url.searchParams.delete("question");
  window.history.replaceState(window.history.state, "", url);
}
