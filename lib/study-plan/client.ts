"use client";
import { getPaceAttempts } from "./pace-storage";
import { createHistoryStore } from "@/lib/storage/history";
import type { PlanQuestion } from "./pace";
import { readLastQuestion } from "@/lib/storage/last-question";
import { latestAnswers } from "./pace";
export interface CatalogQuestion extends PlanQuestion { season: string; session: string; qNumber: number; part?: string }
export function paceAttempts() { return getPaceAttempts(createHistoryStore().getAllEntries()); }
export async function loadPlanCatalog(exam: string, signal?: AbortSignal): Promise<CatalogQuestion[]> {
  const response = await fetch(`/api/study-plan/catalog/${encodeURIComponent(exam)}`, { signal });
  if (!response.ok) throw new Error("問題を取得できませんでした。");
  const data = await response.json() as { questions: CatalogQuestion[] };
  return data.questions;
}
export function resumeQuestionId(catalog: readonly CatalogQuestion[]) {
  const last = readLastQuestion();
  if (!last) return undefined;
  const paper = catalog.filter(q => q.exam === last.exam && q.year === last.year && q.season === last.season && q.session === last.session);
  const index = paper.findIndex(q => q.qNumber === last.qNumber && (q.part ?? "") === (last.part ?? ""));
  const latest = latestAnswers(paceAttempts());
  return index < 0 ? undefined : paper.slice(index + 1).find(q => !latest.get(q.id)?.correct)?.id;
}
