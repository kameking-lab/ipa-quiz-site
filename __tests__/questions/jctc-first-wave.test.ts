import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { ZOEN2_QUESTIONS } from "@/data/questions/zoen2";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import garden from "@/data/questions/zoen2/2026-early.json";
import telecom from "@/data/questions/tsushin2/2026-early.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";

const keys = ["ア", "イ", "ウ", "エ"] as const;

describe("JCTC 2026 first-stage publication", () => {
  it.each([
    ["zoen2", garden, ZOEN2_QUESTIONS, 40, 10],
    ["tsushin2", telecom, TSUSHIN2_QUESTIONS, 65, 5],
  ] as const)("%s publishes only reviewed items with official PDF and answer provenance", (exam, source, questions, officialCount, publishedCount) => {
    expect(source.officialQuestionCount).toBe(officialCount);
    expect(source.publishedCount).toBe(publishedCount);
    expect(questions).toHaveLength(publishedCount);
    expect(source.questions).toHaveLength(publishedCount);
    for (const kind of ["question", "answer"] as const) {
      const pdf = readFileSync(join(process.cwd(), "docs/evidence/zoen2-tsushin2/input", `${exam}-2026-${kind === "question" ? "q" : "a"}.pdf`));
      expect(createHash("sha256").update(pdf).digest("hex")).toBe(source[`${kind}Sha256`]);
    }
    for (const question of questions) {
      const expectedNumbers = answers[exam][question.qNumber - 1];
      const expectedKeys = expectedNumbers.map((number) => keys[number - 1]);
      expect(question.answer).toEqual(expectedKeys.length === 1 ? expectedKeys[0] : expectedKeys);
      expect(question.officialAnswerNumber).toBe(expectedNumbers.join("・"));
      expect(question.sourcePdfUrl).toBe(source.questionUrl);
      expect(question.sourceAnswerUrl).toBe(source.answerUrl);
      expect(Object.values(question.choiceExplanations ?? {}).filter(Boolean)).toHaveLength(4);
      expect(question.hasImage).toBe(false);
    }
  });

  it("keeps telecom questions with missing diagrams out of the published pool", () => {
    expect(TSUSHIN2_QUESTIONS.map((question) => question.qNumber)).toEqual([4, 7, 8, 9, 10]);
    expect(telecom.deferred.map((item) => item.number)).toEqual([1, 2, 3, 5, 6]);
  });
});
