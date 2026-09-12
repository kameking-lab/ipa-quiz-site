import type { ExamCode, Question } from "@/lib/questions/types";
import { IPA_AUDIT_CORRECTIONS } from "./ipa-audit-20260913";
import { IPA_AUDIT_ADDITIONS } from "./ipa-audit-additions-20260913";
import { IPA_EXPLANATION_REPAIRS } from "./explanations-20260913";
import sources from "./official-sources.json";

const sourceByPaper: Record<string, { question: string; answer: string }> = sources;

/** Shared by eager, lazy and direct exam imports so no player uses stale keys. */
export function applyIpaCorrections(exam: ExamCode, questions: Question[]): Question[] {
  const ids = new Set(questions.map(q => q.id));
  return [...questions, ...IPA_AUDIT_ADDITIONS.filter(q => q.exam === exam && !ids.has(q.id))].map(q => {
    const source = sourceByPaper[`${q.exam}/${q.year}/${q.season}/${q.session}`];
    const explanation = IPA_EXPLANATION_REPAIRS[q.id];
    const verified = IPA_AUDIT_CORRECTIONS[q.id];
    return {
      ...q,
      ...(source ? { sourcePdfUrl: source.question } : {}),
      ...explanation,
      ...verified,
      ...(explanation || verified ? { lastUpdated: "2026-09-13" } : {}),
    };
  });
}
