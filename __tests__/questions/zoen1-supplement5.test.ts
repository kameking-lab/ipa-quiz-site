import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement5.json";

describe("Zoen1 five original supplement", () => {
  it("preserves official numbering, answers and full coverage", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-a:21", "mondai-a:24", "mondai-b:5", "mondai-b:6", "mondai-b:8",
    ]);
    expect(items.map(({ item }) => item.officialAnswerNumbers)).toEqual([[2], [2], [3], [1], [1]]);
    for (const { paper, item } of items) {
      const q = ZOEN1_QUESTIONS.find((q) => q.session === paper.session && q.qNumber === item.number);
      expect(q?.answer).toBe(["ア", "イ", "ウ", "エ"][item.officialAnswerNumbers[0]! - 1]);
      expect(q?.explanationCoverage).toBe("full");
      expect(Object.keys(q?.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q?.officialReferenceUrls?.length).toBeGreaterThan(0);
      expect(q?.requiredSelections).toBeUndefined();
    }
  });
  it("keeps source units and all ten statistical observations", () => {
    const a21 = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 21)!;
    const a24 = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 24)!;
    const b8 = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 8)!;
    expect(a21.question).toContain("13,500 m³");
    expect(a21.choices?.イ).toContain("15,000 m³");
    expect(a24.question).toContain("m³/sec");
    expect(b8.question).toContain("| 19 | 26 | 29 | 18 | 19 | 27 | 19 | 29 | 20 | 24 |");
  });
});
