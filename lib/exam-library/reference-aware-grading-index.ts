import information from "@/data/exam-library/pe-first/information-grading-index.json";
import { loadSurveyAssistantGradingPaper } from "./survey-assistant-grading-index";
import type { ExamQuestion } from "@/lib/exam-library-model";

/** Recompute stale summaries for papers with an unscored reference question. */
export function loadReferenceAwareGradingPaper(id: string): readonly ExamQuestion[] | null {
  if (id !== "pe-first-information-2025") return loadSurveyAssistantGradingPaper(id);
  return information.map(question => ({ ...question, referenceOnly: question.referenceOnly === true,
    text: "", images: [], answerAuthority: question.answerAuthority === "official" ? "official" : "unconfirmed" }));
}
