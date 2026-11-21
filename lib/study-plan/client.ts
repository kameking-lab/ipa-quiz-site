"use client";
import { getPaceAttempts } from "./pace-storage";
import { createHistoryStore } from "@/lib/storage/history";
import type { PlanQuestion } from "./pace";
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
