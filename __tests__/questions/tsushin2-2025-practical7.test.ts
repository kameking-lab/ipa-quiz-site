import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2025-late-practical7.json";
import packet from "@/docs/evidence/tsushin2-2025-practical7-20261011.json";

describe("2025 late telecom seven practical originals", () => {
  it("preserves official keys and all choice explanations without duplicates", () => {
    expect(source.questions.map((q) => q.number)).toEqual([35, 37, 38, 39, 53, 60, 64]);
    expect(source.questions.map((q) => q.officialAnswerNumbers[0])).toEqual([2, 4, 3, 2, 3, 1, 2]);
    expect(source.officialQuestionCount).toBe(65);
    expect(source.publishedCount).toBe(7);
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const item of source.questions) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === item.number)!;
      expect(q.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
    }
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
  });
  it("pins source bytes and keeps the individual Q62 hold", () => {
    expect(packet.choiceReasons).toBe(28);
    expect(packet.savedCurrentManuscriptsReused).toBe(7);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(packet.actualModelReceipt).toBeNull();
    expect(Object.keys(packet.pageVisualChecks)).toHaveLength(5);
    expect(packet.individualSourceHolds["2025Q62"]).toContain("SHA absent");
    expect(source.questions.some((q) => q.number === 62)).toBe(false);
    for (const receipt of Object.values(packet.primarySources)) {
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.bytes).toBeGreaterThan(1000);
    }
    expect(packet.primarySources["https://laws.e-gov.go.jp/api/2/law_data/336CO0000000037?asof=2025-11-16"].lawAsOf).toBe("2025-11-16");
  });
  it("retains original diagrams and distinguishes fusion skill and takt time", () => {
    expect(source.questions.filter((q) => "imageUrl" in q).map((q) => q.number)).toEqual([35, 60]);
    expect(Object.keys(packet.figureCrops)).toEqual(["35", "60"]);
    expect(source.questions.find((q) => q.number === 53)!.choiceExplanations[3]).toContain("技能が必要");
    expect(source.questions.find((q) => q.number === 64)!.choiceExplanations[2]).toContain("時間");
  });
});
