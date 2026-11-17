"use client";
import { getPaceAttempts } from "./pace-storage";
import { createHistoryStore } from "@/lib/storage/history";
import type { PlanQuestion } from "./pace";
import { readLastQuestion } from "@/lib/storage/last-question";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { latestAnswers } from "./pace";
import type { PaperQuestionIndex } from "@/mobile/shared/paper-index";
export interface CatalogQuestion extends PlanQuestion { season: string; session: string; qNumber: number; part?: string;
  paperId?: string; paperTitle?: string; pdfUrl?: string; indexUrl?: string;
  number?: number; choiceCount?: number; answerAuthority?: PaperQuestionIndex["answerAuthority"]; scorable?: boolean }
export function paceAttempts() { return getPaceAttempts(createHistoryStore().getAllEntries()); }
export async function loadPlanCatalog(exam: string, signal?: AbortSignal): Promise<CatalogQuestion[]> {
  const response = await fetch(`/api/study-plan/catalog/${encodeURIComponent(exam)}`, { signal });
  if (!response.ok) throw new Error("問題を取得できませんでした。");
  const data = await response.json() as { questions: CatalogQuestion[] };
  return data.questions;
}
export function resumeQuestionId(catalog: readonly CatalogQuestion[]) {
  const last = readLastQuestion();
  const library = listExamLearningSummaries().find(s => catalog.some(q => q.paperId === s.examId) && s.lastQuestionId);
  if (library && (!last || Date.parse(library.updatedAt) > last.answeredAt)) {
    const paper = catalog.filter(q => q.paperId === library.examId);
    const index = paper.findIndex(q => q.id === library.lastQuestionId);
    return index < 0 ? undefined : paper.slice(index + 1).find(q => !latestAnswers(paceAttempts()).get(q.id)?.correct)?.id;
  }
  if (!last) return undefined;
  const paper = catalog.filter(q => q.exam === last.exam && q.year === last.year && q.season === last.season && q.session === last.session);
  const index = paper.findIndex(q => q.qNumber === last.qNumber && (q.part ?? "") === (last.part ?? ""));
  const latest = latestAnswers(paceAttempts());
  return index < 0 ? undefined : paper.slice(index + 1).find(q => !latest.get(q.id)?.correct)?.id;
}
