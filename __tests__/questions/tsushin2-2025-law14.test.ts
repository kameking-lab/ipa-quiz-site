import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2025-late-law14.json";
import packet from "@/docs/evidence/tsushin2-2025-law14-20261011.json";

describe("2025 late telecom law14 official originals", () => {
  it("retains the fourteen reserved original keys and all choice reasons", () => {
    expect(source.questions.map((q) => q.number)).toEqual([41,42,43,44,45,46,47,48,49,50,51,52,61,65]);
    expect(source.questions.map((q) => q.officialAnswerNumbers[0])).toEqual([4,3,4,1,3,2,1,4,2,4,3,1,1,2]);
    expect(source.officialQuestionCount).toBe(65);
    expect(source.publishedCount).toBe(14);
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const item of source.questions) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === item.number)!;
      expect(q.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
      expect(q.hasImage).toBe(false);
      expect(item.officialReferenceUrls.every((u) => u.endsWith("asof=2025-11-16"))).toBe(true);
    }
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
  });
  it("pins the exam date law revisions and verified locators", () => {
    expect(packet.lawAsOf).toBe("2025-11-16");
    expect(packet.verifiedLocators).toHaveLength(25);
    expect(packet.choiceReasons).toBe(56);
    expect(packet.savedDraftReuseCount).toBe(0);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(Object.keys(packet.pageVisualChecks)).toHaveLength(7);
    for (const receipt of Object.values(packet.lawSources)) {
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.revision.amendment_enforcement_date <= "2025-11-16").toBe(true);
    }
  });
  it("distinguishes completion notices, retirement rights and passage thresholds", () => {
    expect(source.questions.find((q) => q.number === 42)!.explanation).toContain("20日");
    expect(source.questions.find((q) => q.number === 45)!.explanation).toContain("退職");
    expect(source.questions.find((q) => q.number === 61)!.explanation).toContain("30 cm");
    expect(source.questions.find((q) => q.number === 65)!.explanation).toContain("80 cm");
  });
});
