import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2025-late-construction6.json";
import packet from "@/docs/evidence/tsushin2-2025-construction6-20261011.json";

describe("2025 late telecom six construction originals", () => {
  it("preserves the official keys and complete choice explanations", () => {
    expect(source.questions.map((q) => q.number)).toEqual([36, 54, 56, 57, 59, 63]);
    expect(source.questions.map((q) => q.officialAnswerNumbers[0])).toEqual([3, 1, 1, 3, 4, 4]);
    expect(source.officialQuestionCount).toBe(65);
    expect(source.publishedCount).toBe(6);
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
  it("pins verified source bytes without claiming a complete second sitting", () => {
    expect(packet.choiceReasons).toBe(24);
    expect(packet.savedDraftReuseCount).toBe(0);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(Object.keys(packet.pageVisualChecks)).toHaveLength(5);
    for (const receipt of Object.values(packet.primarySources)) {
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.bytes).toBeGreaterThan(1000);
    }
    expect(packet.primarySources["https://literature.cdn.keysight.com/litweb/pdf/5952-0292.pdf"].kind).toBe("HTML");
  });
  it("distinguishes rack fixation, daily work quantity and construction plan types", () => {
    expect(source.questions.find((q) => q.number === 54)!.explanation).toContain("3 m以下");
    expect(source.questions.find((q) => q.number === 57)!.explanation).toContain("作業量");
    expect(source.questions.find((q) => q.number === 63)!.explanation).toContain("③品質管理計画");
  });
});
