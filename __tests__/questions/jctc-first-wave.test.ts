import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { ZOEN2_QUESTIONS } from "@/data/questions/zoen2";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import garden from "@/data/questions/zoen2/2026-early.json";
import garden2025 from "@/data/questions/zoen2/2025-late.json";
import telecom from "@/data/questions/tsushin2/2026-early.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";

const keys = ["ア", "イ", "ウ", "エ"] as const;

describe("JCTC 2026 first-stage publication", () => {
  it.each([
    ["zoen2", garden, ZOEN2_QUESTIONS.filter((question) => question.year === 2026), 40, 10],
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

  it("publishes ten distinct 2025 late gardening questions against the official PDFs", () => {
    const selected = ZOEN2_QUESTIONS.filter((question) => question.year === 2025);
    expect(garden2025.officialQuestionCount).toBe(40);
    expect(garden2025.publishedCount).toBe(10);
    expect(selected.map((question) => question.qNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 10, 11]);
    expect(selected.every((question) => question.season === "late")).toBe(true);
    expect(selected.map((question) => question.officialAnswerNumber)).toEqual(["3", "2", "3", "4", "1", "1", "1", "3", "1", "1"]);
    expect(selected.map((question) => question.answer)).toEqual(["ウ", "イ", "ウ", "エ", "ア", "ア", "ア", "ウ", "ア", "ア"]);
    expect(garden2025.deferred).toEqual([{ number: 9, reason: expect.stringContaining("図") }]);
    expect(new Set(ZOEN2_QUESTIONS.map((question) => question.id)).size).toBe(ZOEN2_QUESTIONS.length);
    for (const kind of ["question", "answer"] as const) {
      const suffix = kind === "question" ? "q" : "a";
      const pdf = readFileSync(join(process.cwd(), "docs/evidence/zoen2-2025/input", `zoen2-2025-${suffix}.pdf`));
      expect(createHash("sha256").update(pdf).digest("hex")).toBe(garden2025[`${kind}Sha256`]);
    }
    for (const question of selected) {
      expect(Object.values(question.choices ?? {})).toHaveLength(4);
      expect(Object.values(question.choiceExplanations ?? {}).filter(Boolean)).toHaveLength(4);
      expect(question.sourcePdfUrl).toBe(garden2025.questionUrl);
      expect(question.sourceAnswerUrl).toBe(garden2025.answerUrl);
      expect(question.hasImage).toBe(false);
    }
  });
});
