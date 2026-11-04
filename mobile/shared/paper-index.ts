import type { ExamQuestion } from "@/lib/exam-library-model";

/** Safe routing/progress metadata. Never includes text, figures, explanations or keys. */
export type PaperQuestionIndex = Pick<ExamQuestion, "id" | "number" | "choiceCount" | "answerAuthority" | "referenceOnly"> & {scorable: boolean};
export function paperPlaceholder(item: PaperQuestionIndex): ExamQuestion {
  return {id:item.id, number:item.number, choiceCount:item.choiceCount, answerAuthority:item.answerAuthority,
    referenceOnly:item.referenceOnly, text:"", images:[], correctChoice:null};
}
