import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import late from "@/data/questions/tsushin2/2025-late-last1.json";
import early from "@/data/questions/tsushin2/2026-early-last1.json";
import packet from "@/docs/evidence/tsushin2-last2-20261011.json";

describe("telecom remaining two grounded saved originals", () => {
  it("maps official keys and preserves complete choice reasons", () => {
    expect(late.questions.map((q) => q.number)).toEqual([20]);
    expect(late.questions[0]!.officialAnswerNumbers).toEqual([1]);
    expect(early.questions.map((q) => q.number)).toEqual([54]);
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
  it("records saved reuse, pre-exam catalog evidence and the remaining individual hold", () => {
    expect(packet.choiceReasons).toBe(8);
    expect(packet.savedDraftReuseCount).toBe(2);
    expect(packet.newTranscriptions).toBe(0);
    expect(packet.newExplanations).toBe(0);
    expect(packet.regeneratedManuscripts).toBe(0);
    expect(packet.actualModelReceipt).toBeNull();
    expect(packet.candidateTotal).toBe(129);
    expect(packet.remainingOriginals).toBe(1);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(packet.primaryLocators["2026Q54"]).toContain("2026-03-09");
    expect(packet.primaryLocators["2026Q54"]).toContain("article161");
    expect(packet.primaryLocators["2025Q20"]).toContain("single sum/difference sideband");
    expect(packet.individualSourceHolds["2025Q21"]).toContain("Official answer4 retained");
    for (const receipt of Object.values(packet.primarySources)) {
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.bytes).toBeGreaterThan(1000);
    }
  });
});
