import index from "@/data/exam-library/survey-assistant/grading-index.json";
import type { ExamQuestion } from "@/lib/exam-library-model";

/** Only canonical IDs and grading fields; no manuscripts, explanations or asset map. */
export function loadSurveyAssistantGradingPaper(id: string): readonly ExamQuestion[] | null {
  const paper = index.find(item => item.id === id);
  return paper ? paper.questions.map(question => ({ ...question, text: "", images: [],
    answerAuthority: question.answerAuthority === "official" ? "official" : "unconfirmed" })) : null;
}
