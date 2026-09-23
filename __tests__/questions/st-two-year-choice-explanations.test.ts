import { describe, expect, it } from "vitest";
import { ST_QUESTIONS } from "@/data/questions/st";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

const EXPECTED_PAPERS: Record<string, number> = {
  "2024/spring/am1": 30,
  "2024/spring/am2": 25,
  "2025/spring/am1": 30,
  "2025/spring/am2": 25,
};

const questions = ST_QUESTIONS.filter((question) =>
  [2024, 2025].includes(question.year)
  && question.type === "multiple-choice"
  && question.choices,
);

describe("ST 2024/2025 all-choice explanations", () => {
  it("keeps morning I and morning II as four distinct official papers", () => {
    const actual: Record<string, number> = {};
    for (const question of questions) {
      const key = `${question.year}/${question.season}/${question.session}`;
      actual[key] = (actual[key] ?? 0) + 1;
    }
    expect(actual).toEqual(EXPECTED_PAPERS);
    expect(questions).toHaveLength(110);
  });

  it("covers every displayed choice with a distinct correct/wrong reason", () => {
    for (const question of questions) {
      const choiceKeys = Object.keys(question.choices ?? {}).sort() as ChoiceKey[];
      const explanationKeys = Object.keys(question.choiceExplanations ?? {}).sort() as ChoiceKey[];
      expect(explanationKeys, question.id).toEqual(choiceKeys);
      const correct = new Set(Array.isArray(question.answer) ? question.answer : [question.answer]);
      const reasons = choiceKeys.map((key) => question.choiceExplanations?.[key]?.trim() ?? "");
      expect(new Set(reasons).size, question.id).toBe(reasons.length);
      for (const [index, key] of choiceKeys.entries()) {
        const reason = reasons[index]!;
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(55);
        expect(reason.startsWith(correct.has(key) ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
      }
    }
  });

  it("uses current official IPA question and answer PDFs for each paper", () => {
    for (const question of questions) {
      expect(question.sourcePdfUrl, question.id).toMatch(/^https:\/\/www\.ipa\.go\.jp\/shiken\/mondai-kaiotu\/.*_qs\.pdf$/u);
      expect(getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl), question.id)
        .toMatch(/^https:\/\/www\.ipa\.go\.jp\/shiken\/mondai-kaiotu\/.*_ans\.pdf$/u);
    }
  });
});
