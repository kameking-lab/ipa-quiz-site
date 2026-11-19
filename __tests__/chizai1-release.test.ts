import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import sources from "@/data/questions/chizai1/2025-52-sources.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("知的財産管理技能検定1級 第52回", () => {
  it("serves the patent theory and content practical papers with their published answers", async () => {
    const questions = await getQuestionsForExam("chizai1");
    expect(questions.map(question => question.id)).toEqual(
      QUESTIONS_BY_EXAM.chizai1?.map(question => question.id),
    );
    for (const session of ["gakka", "practical"] as const) {
      const paper = questions.filter(question => question.session === session);
      const source = sources[session];
      const answers: Record<string, string> = source.answers;
      expect(paper).toHaveLength(session === "gakka" ? 45 : 15);
      for (const question of paper) {
        expect(question.year).toBe(2025);
        expect(question.sourcePdfUrl).toBe(source.pdf);
        expect(question.sourceAnswerUrl).toBe(source.pdf);
        expect(question.officialAnswerNumber).toBe(answers[question.qNumber]);
        const answer = session === "gakka" ? question.answer : question.choices?.[question.answer as "ア" | "イ"];
        expect(answer).toBe(answers[question.qNumber]);
        expect(Object.keys(question.choiceExplanations ?? {})).toEqual(Object.keys(question.choices ?? {}));
      }
    }
  });
});
