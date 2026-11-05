import { LS_KEYS } from "@/lib/storage/keys";
import type { ExamQuestion } from "@/lib/exam-library-model";
import { loadReferenceAwareGradingPaper } from "@/lib/exam-library/reference-aware-grading-index";
import { EXAM_PROGRESS_CHANGE_EVENT, sanitizeExamProgressForStorage, parseExamProgress, summarizeExamProgress, type ExamProgress, type ExamProgressSummary } from "@/lib/exam-library-progress";

export interface ExamTabSummary extends ExamProgressSummary {
  examId: string;
  examTitle: string;
  lastQuestionId: string | null;
  updatedAt: string;
}

function tabStorage(): Storage | null {
  try { return typeof window === "undefined" ? null : window.sessionStorage; } catch { return null; }
}

export function readExamTabProgress(examId: string, questions: readonly ExamQuestion[]): ExamProgress | null {
  try {
    const raw = tabStorage()?.getItem(`${LS_KEYS.examLibrarySessionPrefix}${examId}`);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || !("progress" in value)) return null;
    return parseExamProgress(JSON.stringify(value.progress), examId, questions);
  } catch { return null; }
}

/** Keeps navigation/reload progress in this tab; never opts into localStorage. */
export function writeExamTabProgress(progress: ExamProgress, questions: readonly ExamQuestion[], examTitle: string, verifiedSummary?: ExamProgressSummary): void {
  progress = sanitizeExamProgressForStorage(progress);
  const summary: ExamTabSummary = { ...(verifiedSummary ?? summarizeExamProgress(questions, progress.answers)), examId: progress.examId, examTitle, lastQuestionId: progress.lastQuestionId, updatedAt: progress.updatedAt };
  try {
    tabStorage()?.setItem(`${LS_KEYS.examLibrarySessionPrefix}${progress.examId}`, JSON.stringify({ progress, summary }));
    window.dispatchEvent(new Event(EXAM_PROGRESS_CHANGE_EVENT));
  } catch { /* Restricted storage leaves the current in-memory session usable. */ }
}

/** Dashboard summaries only; the player always revalidates answers against question data. */
export function listExamTabSummaries(): ExamTabSummary[] {
  const storage = tabStorage();
  if (!storage) return [];
  const summaries: ExamTabSummary[] = [];
  try {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (!key?.startsWith(LS_KEYS.examLibrarySessionPrefix)) continue;
      try {
        const value: unknown = JSON.parse(storage.getItem(key) ?? "null");
        if (!value || typeof value !== "object" || !("summary" in value)) continue;
        const summary = value.summary as Partial<ExamTabSummary> | null;
        if (!summary || typeof summary.examId !== "string" || !/^[a-z0-9-]+$/i.test(summary.examId) || typeof summary.examTitle !== "string" || typeof summary.updatedAt !== "string") continue;
        if (![summary.answered, summary.total, summary.correct, summary.incorrect, summary.unscored, summary.scorable].every((count) => typeof count === "number" && Number.isSafeInteger(count) && count >= 0)) continue;
        if (summary.lastQuestionId !== null && typeof summary.lastQuestionId !== "string") continue;
        const survey = loadReferenceAwareGradingPaper(summary.examId);
        if (survey) {
          if (!("progress" in value)) continue;
          const parsed = parseExamProgress(JSON.stringify(value.progress), summary.examId, survey);
          if (!parsed) continue;
          summaries.push({ ...summary as ExamTabSummary, ...summarizeExamProgress(survey, parsed.answers), lastQuestionId: parsed.lastQuestionId });
        } else summaries.push(summary as ExamTabSummary);
      } catch { /* Ignore individual corrupt entries. */ }
    }
  } catch { return []; }
  return summaries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** Includes explicit long-term saves, with the current tab taking precedence. */
export function listExamLearningSummaries(): ExamTabSummary[] {
  const summaries = new Map(listExamTabSummaries().map((summary) => [summary.examId, summary]));
  try {
    const storage = typeof window === "undefined" ? null : window.localStorage;
    if (storage) for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (!key?.startsWith(LS_KEYS.examLibraryPrefix)) continue;
      try {
        const raw = JSON.parse(storage.getItem(key) ?? "null") as ExamProgress | null;
        const survey = raw && typeof raw.examId === "string" ? loadReferenceAwareGradingPaper(raw.examId) : null;
        const parsed = raw && survey ? parseExamProgress(JSON.stringify(raw), raw.examId, survey) : null;
        const progress = raw && survey ? (parsed ? { ...parsed, summary: { ...summarizeExamProgress(survey, parsed.answers), examTitle: raw.summary?.examTitle ?? "測量士補" } } : null) : raw;
        if (!progress?.summary || typeof progress.examId !== "string" || summaries.has(progress.examId)) continue;
        if (![progress.summary.answered, progress.summary.total, progress.summary.correct, progress.summary.incorrect, progress.summary.unscored].every((count) => Number.isSafeInteger(count) && count >= 0)) continue;
        if (typeof progress.summary.examTitle !== "string" || typeof progress.updatedAt !== "string") continue;
        summaries.set(progress.examId, { ...progress.summary, examId: progress.examId, lastQuestionId: progress.lastQuestionId, updatedAt: progress.updatedAt });
      } catch { /* Ignore corrupt saves. */ }
    }
  } catch { /* Storage may be disabled. */ }
  return [...summaries.values()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
