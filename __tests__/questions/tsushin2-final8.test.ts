import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import late from "@/data/questions/tsushin2/2025-late-final7.json";
import early from "@/data/questions/tsushin2/2026-early-gantt1.json";
import packet from "@/docs/evidence/tsushin2-final8-20261011.json";

describe("telecom eight remaining grounded originals", () => {
  it("maps official keys for both sittings and preserves all choice reasons", () => {
    expect(late.questions.map((q) => q.number)).toEqual([16, 33, 34, 40, 55, 58, 62]);
    expect(late.questions.map((q) => q.officialAnswerNumbers[0])).toEqual([4, 4, 4, 1, 4, 2, 3]);
    expect(early.questions.map((q) => q.number)).toEqual([58]);
    expect(early.questions[0]!.officialAnswerNumbers).toEqual([4]);
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const source of [late, early]) {
      expect(source.questions.length).toBe(source.publishedCount);
      expect(source.officialQuestionCount).toBe(65);
      for (const original of source.questions) {
        const q = TSUSHIN2_QUESTIONS.find((q) => q.year === source.year && q.qNumber === original.number)!;
        expect(q.answer).toBe(keys[original.officialAnswerNumbers[0]! - 1]);
        expect(Object.keys(q.choices ?? {})).toEqual(keys);
        expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
        expect(q.explanationCoverage).toBe("full");
        expect(q.sourcePdfUrl).toBe(source.questionUrl);
        expect(q.sourceAnswerUrl).toBe(source.answerUrl);
      }
    }
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
  });
  it("records independent hold resolutions without claiming completion", () => {
    expect(packet.choiceReasons).toBe(32);
    expect(packet.savedDraftReuseCount).toBe(2);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(packet.actualModelReceipt).toBeNull();
    expect(packet.holdHistory["2025Q16"].textRegenerated).toBe(false);
    expect(packet.holdHistory["2025Q62"].independentOriginalSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(packet.individualSourceHolds["2025Q21"]).toContain("Official answer4 retained");
    for (const receipt of Object.values(packet.primarySources)) {
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.bytes).toBeGreaterThan(1000);
    }
  });
  it("keeps exact law-date evidence and distinguishes chart types", () => {
    expect(packet.primaryLocators["2025Q33"]).toContain("As-of2025-11-16 inference");
    expect(packet.contractAsOf).toBe("2025-11-16");
    expect(late.questions.find((q) => q.number === 33)!.choiceExplanations[3]).toContain("バスダクト");
    expect(early.questions[0]!.choiceExplanations[3]).toContain("100");
  });
});
