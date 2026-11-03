import "server-only";
import candidate from "@/data/exam-library/survey-assistant/candidate.json";
import type { ExamQuestion } from "@/lib/exam-library-model";

export { SURVEY_ASSISTANT_CATALOG, SURVEY_ASSISTANT_GROUP, SURVEY_ASSISTANT_PUBLICATION } from "./survey-assistant-catalog";

export interface SurveyAssistantQuestion extends ExamQuestion {
  referenceOnly: boolean;
  referenceNotice?: string;
  officialKey: number;
  originalPdf: string;
  answerPdf: string;
  referenceReasons?: readonly { number: number; reason: string }[];
}

export function loadSurveyAssistantPaper(id: string): readonly SurveyAssistantQuestion[] | null {
  const paper = candidate.papers.find(item => item.id === id);
  if (!paper) return null;
  return paper.questions.map(question => {
    const referenceOnly = question.referenceOnly;
    return {
      id: question.id, number: question.number, text: question.text,
      images: question.images, sourcePages: question.sourcePages, sourceQuestionNumber: question.number,
      correctChoice: referenceOnly ? null : question.correctChoice,
      choiceCount: referenceOnly ? 0 : 5,
      answerAuthority: referenceOnly ? "unconfirmed" : "official",
      referenceOnly, officialKey: question.officialKey,
      originalPdf: question.originalPdf, answerPdf: question.answerPdf,
      presentation: { sourceHash: question.sourceHash, prompt: question.text,
        choices: referenceOnly ? [] : question.choiceLabels, figures: question.figures },
      explanation: question.explanation,
      ...(referenceOnly ? { referenceNotice: question.referenceNotice, referenceReasons: question.reasons } : {
        choiceExplanation: {
          sourceHash: question.sourceHash, correctChoice: question.officialKey,
          summary: question.explanation,
          choices: question.reasons.map(reason => ({ ...reason,
            verdict: reason.number === question.officialKey ? "correct" as const : "incorrect" as const })),
          sources: [{ title: "原本問題PDF", url: question.originalPdf }, { title: "公式解答PDF", url: question.answerPdf }],
        },
      }),
    };
  });
}

/** Select before practice, scores, progress, history, review, SRS and rewards. */
export function surveyAssistantPracticeQuestions(questions: readonly SurveyAssistantQuestion[]): SurveyAssistantQuestion[] {
  return questions.filter(question => !question.referenceOnly);
}
