import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2026-early-construction10.json";
import packet from "@/docs/evidence/tsushin2-construction10-20261011.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

describe("telecom original construction and quality questions", () => {
  it("adds only the ten reserved IDs with no duplicate originals", () => {
    expect(source.questions.map((q) => q.number)).toEqual([29, 38, 39, 53, 55, 57, 59, 60, 63, 64]);
    expect(source.publishedCount).toBe(10);
    expect(source.officialQuestionCount).toBe(65);
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
    for (const n of [4, 7, 8, 9, 10]) expect(TSUSHIN2_QUESTIONS.some((q) => q.qNumber === n)).toBe(true);
    expect(packet.savedDraftReuseCount).toBe(3);
    expect(packet.secondPeriodComplete).toBe(false);
  });
  it("matches every official answer and maps all forty choice reasons", () => {
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
  it("keeps official control-chart pixels and recovers both blank combinations", () => {
    const item = source.questions.find((q) => q.number === 60)!;
    expect(item.imageUrl).toBe("/images/questions/tsushin2/2026-early-gakka-q60.png");
    expect(createHash("sha256").update(readFileSync(`public${item.imageUrl}`)).digest("hex")).toBe(packet.figureCrops["60"].sha256);
    expect(packet.figureCrops["60"].visualVerified).toBe(true);
    expect(source.questions.find((q) => q.number === 38)!.question).toContain("［イ］");
    expect(source.questions.find((q) => q.number === 63)!.question).toContain("［エ］");
  });
});
