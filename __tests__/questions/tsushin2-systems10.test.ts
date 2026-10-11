import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2026-early-systems10.json";
import packet from "@/docs/evidence/tsushin2-systems10-20261011.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

describe("telecom first-stage technology originals", () => {
  it("adds the ten reserved IDs and preserves the original pilot without duplicates", () => {
    expect(source.questions.map((q) => q.number)).toEqual([12, 13, 15, 19, 20, 32, 34, 35, 36, 37]);
    expect(source.publishedCount).toBe(10);
    expect(source.officialQuestionCount).toBe(65);
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
    for (const n of [4, 7, 8, 9, 10]) expect(TSUSHIN2_QUESTIONS.some((q) => q.qNumber === n)).toBe(true);
    expect(packet.secondPeriodComplete).toBe(false);

  });
  it("matches official answer numbers and all forty reasons through the real adapter", () => {
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const item of source.questions) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.qNumber === item.number)!;
      expect(item.officialAnswerNumbers).toEqual(answers.tsushin2[item.number - 1]);
      expect(q.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
    }
  });
  it("preserves original figure bytes and all blank-choice combinations", () => {
    for (const n of [13, 36]) {
      const item = source.questions.find((q) => q.number === n)!;
      expect(item.imageUrl).toBe(`/images/questions/tsushin2/2026-early-gakka-q${n}.png`);
      expect(createHash("sha256").update(readFileSync(`public${item.imageUrl}`)).digest("hex")).toBe(packet.figureCrops[String(n) as "13" | "36"].sha256);
    }
    expect(source.questions.find((q) => q.number === 15)!.question).toContain("［ウ］");
    expect(source.questions.find((q) => q.number === 36)!.choices[1]).toContain("凝縮機");
  });
});
