import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import tech from "@/data/questions/tsushin2/2025-late-tech17.json";
import final from "@/data/questions/tsushin2/2026-early-final2.json";
import techPacket from "@/docs/evidence/tsushin2-tech17-20261011.json";
import finalPacket from "@/docs/evidence/tsushin2-final2-20261011.json";
import official from "@/reports/zoen2-tsushin2-20260927/official-answers.json";

describe("telecom seventeen2025 technical and two2026 contract/wiring originals", () => {
  it("keeps reserved originals and official answer keys without duplicate runtime IDs", () => {
    expect(tech.questions.map((q) => q.number)).toEqual([13,14,15,17,18,19,22,23,24,25,26,27,28,29,30,31,32]);
    expect(final.questions.map((q) => q.number)).toEqual([33,40]);
    expect(tech.publishedCount).toBe(17);
    expect(final.publishedCount).toBe(2);
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const source of [tech, final]) {
      expect(source.officialQuestionCount).toBe(65);
      expect(source.questionSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(source.answerSha256).toMatch(/^[a-f0-9]{64}$/);
      for (const item of source.questions) {
        const runtime = TSUSHIN2_QUESTIONS.find((q) => q.year === source.year && q.qNumber === item.number)!;
        const answer = source.year === 2025 ? [techPacket.officialAnswers[item.number - 1]] : official.tsushin2[item.number - 1];
        expect(item.officialAnswerNumbers).toEqual(answer);
        expect(runtime.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
        expect(Object.keys(runtime.choices ?? {})).toEqual(keys);
        expect(Object.values(runtime.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
        expect(runtime.explanationCoverage).toBe("full");
        expect(runtime.sourcePdfUrl).toBe(source.questionUrl);
        expect(runtime.sourceAnswerUrl).toBe(source.answerUrl);
        expect(runtime.hasImage).toBe(false);
        expect(item.officialReferenceUrls.length).toBeGreaterThan(0);
      }
    }
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
  });
  it("records inspected pages and source bytes while keeping individual holds excluded", () => {
    expect(techPacket.pendingVisualPages).toEqual([]);
    expect(techPacket.primaryReferenceReviewPending).toEqual([]);
    for (const receipt of Object.values(techPacket.primarySources)) {
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.bytes).toBeGreaterThan(100);
    }
    expect(tech.questions.some((q) => [16,20,21].includes(q.number))).toBe(false);
    expect(final.questions.some((q) => [54,58].includes(q.number))).toBe(false);
    expect(finalPacket.savedDraftReuseCount).toBe(2);
    expect(techPacket.choiceReasons + finalPacket.choiceReasons).toBe(76);
    expect(techPacket.secondPeriodComplete).toBe(false);
    expect(finalPacket.secondPeriodComplete).toBe(false);
    for (const source of Object.values(finalPacket.sourceDocuments)) {
      expect(source.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(source.effectiveOn <= "2026-06-07").toBe(true);
    }
  });
  it("preserves binary host calculation, duplex scope and exact contract wording", () => {
    expect(tech.questions.find((q) => q.number === 24)!.officialAnswerNumbers).toEqual([3]);
    expect(tech.questions.find((q) => q.number === 24)!.explanation).toContain("53");
    expect(tech.questions.find((q) => q.number === 18)!.choiceExplanations[3]).toContain("下り");
    expect(final.questions.find((q) => q.number === 40)!.choices[2]).toContain("施工図");
    expect(final.questions.find((q) => q.number === 40)!.explanation).toContain("設計図書");
  });
});
