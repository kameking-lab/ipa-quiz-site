import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement7.json";

describe("Zoen1 technical supplement seven", () => {
  it("keeps the official answers and complete choice explanations", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-a:23", "mondai-a:31", "mondai-b:1", "mondai-b:4", "mondai-b:10",
    ]);
    expect(items.map(({ item }) => item.officialAnswerNumbers)).toEqual([[2], [1], [1], [3], [2]]);
    for (const { paper, item } of items) {
      const q = ZOEN1_QUESTIONS.find((q) => q.session === paper.session && q.qNumber === item.number)!;
      expect(q.answer).toBe(["ア", "イ", "ウ", "エ"][item.officialAnswerNumbers[0]! - 1]);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
    }
  });
  it("retains diagrams, chloride units and the resource schedule", () => {
    for (const [session, number] of [["mondai-a", 31], ["mondai-b", 1], ["mondai-b", 4]] as const) {
      const q = ZOEN1_QUESTIONS.find((q) => q.session === session && q.qNumber === number)!;
      expect(q.hasImage).toBe(true);
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
    }
    const concrete = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 10)!;
    expect(concrete.question).toContain("Cl⁻量として");
    expect(concrete.question).toContain("kg/m³");
    expect(concrete.choiceExplanations?.イ).toContain("14.5cm");
    const resources = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 1)!;
    expect(resources.explanation).toContain("55人日");
    expect(new Set(ZOEN1_QUESTIONS.map((q) => q.id)).size).toBe(ZOEN1_QUESTIONS.length);
  });
});
