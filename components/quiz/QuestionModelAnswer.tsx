import type { Question } from "@/lib/questions/types";
import { QuestionBody } from "./QuestionBody";
import { QuestionFigures } from "./QuestionFigures";

/** Exact drawing answers are shown separately from the original question. */
export function QuestionModelAnswer({ question }: { question: Question }) {
  if (!question.modelAnswer) return null;
  return (
    <section aria-label="解答例" className="mb-4 rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-3 font-bold">解答例</h3>
      <QuestionBody text={question.modelAnswer} />
      <QuestionFigures question={{ ...question, imageUrls: question.modelAnswerImageUrls, imageAltTexts: question.modelAnswerImageAltTexts }} />
    </section>
  );
}
