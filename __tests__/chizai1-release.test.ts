import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

type SourceReceipt = {
  pdf: string;
  answerPage?: number;
  answers: Record<string, string>;
};
const receipts = import.meta.glob<{ default: Record<"gakka" | "practical", SourceReceipt> }>(
  "../data/questions/chizai1/*-sources.json",
  { eager: true },
);

describe("知的財産管理技能検定1級", () => {
  it("serves the registered papers with their published answers", async () => {
    const questions = await getQuestionsForExam("chizai1");
    expect(questions.map(question => question.id)).toEqual(
      QUESTIONS_BY_EXAM.chizai1?.map(question => question.id),
    );

    const checkedIds = new Set<string>();
    for (const { default: sources } of Object.values(receipts)) {
      for (const session of ["gakka", "practical"] as const) {
        const source = sources[session];
        const paper = questions.filter(question =>
          question.session === session && question.sourcePdfUrl?.split("#")[0] === source.pdf,
        );
        expect(paper).toHaveLength(session === "gakka" ? 45 : 15);
        for (const question of paper) {
          const officialAnswer = source.answers[question.qNumber];
          const [answerDocument, answerFragment] = question.sourceAnswerUrl?.split("#") ?? [];
          expect(answerDocument).toBe(source.pdf);
          if (answerFragment) expect(answerFragment).toBe(`page=${source.answerPage}`);
          expect(question.officialAnswerNumber).toBe(officialAnswer);
          const answer = session === "gakka"
            ? question.answer
            : question.choices?.[question.answer as "ア" | "イ"];
          expect(answer).toBe(officialAnswer);
          expect(Object.keys(question.choiceExplanations ?? {})).toEqual(Object.keys(question.choices ?? {}));
          checkedIds.add(question.id);
        }
      }
    }
    expect(checkedIds.size).toBe(questions.length);
  });
});
