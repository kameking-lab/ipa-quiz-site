import { describe, expect, it } from "vitest";
import raw from "@/data/questions/fp1/applied-2026-september-q51-q55.json";
import { parseFp1AppliedExtension, publishableExtensionQuestions } from "@/lib/fp1/applied-extension";

describe("FP1 September applied Q51–55 original part", () => {
  const part = parseFp1AppliedExtension(raw);

  it("retains both original shared cases and all 20 official answer slots", () => {
    expect(part.edition).toBe("202609");
    expect(part.lawReferenceDate).toBe("2026-04-01");
    expect(part.sharedCases.map(c => c.number)).toEqual([1,2]);
    expect(part.questions.map(q => q.number)).toEqual([51,52,53,54,55]);
    expect(part.questions.map(q => q.type === "originalmixedcloze" ? q.fields.length : q.answers.length))
      .toEqual([7,5,2,4,2]);
    expect(publishableExtensionQuestions(part)).toHaveLength(5);
    expect(part.sharedCases[1]?.blocks.some(block => block.type === "table")).toBe(true);
    const q53 = part.questions.find(q => q.number === 53)!;
    expect(q53.type).toBe("originalworkedcalculation");
    if (q53.type === "originalworkedcalculation") {
      expect(q53.instruction.replace(/\s/g, "")).toContain("在職定時改定は考慮しない");
      expect(q53.answers[0]?.prompt.replace(/\s/g, "")).toContain("老齢基礎年金の年金額");
      expect(q53.answers[1]?.prompt.replace(/\s/g, "")).toContain("支給調整後の老齢厚生年金");
      expect(q53.conditions).toHaveLength(6);
    }
  });

  it("matches the answer sheet, not OCR-lost formulas, on both calculation questions", () => {
    const answers = part.questions.map(q =>
      (q.type === "originalmixedcloze" ? q.fields : q.answers).map(field => field.officialAnswer)
    );
    expect(answers).toEqual([
      ["65","4","9","150","10","1","84"],
      ["68","名目手取り賃金変動率","マクロ経済（スライド）","3","再評価率"],
      ["797,874","1,498,822"],
      ["5.41","44.14","145.45","138.06"],
      ["1.45","9.27"],
    ]);
    const q55 = part.questions.find(q => q.number === 55)!;
    expect(q55.type).toBe("originalworkedcalculation");
    if (q55.type === "originalworkedcalculation") {
      expect(q55.answers.every(a => a.calculationSteps.length > 0)).toBe(true);
      expect(q55.answers[1]?.calculationSteps.join("")).toContain("0.50");
    }
  });
});
