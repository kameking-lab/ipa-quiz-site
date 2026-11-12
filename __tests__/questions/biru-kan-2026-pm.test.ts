import { describe, expect, it } from "vitest";
import { BIRU_KAN_2026_PM_STAGING as questions, validateBiruKan2026Pm } from "@/scripts/lib/validate-biru-kan-2026";
import review from "@/data/qualification-staging/biru-kan/2026/pm-review.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

const question = (n: number) => questions.find(q => q.qNumber === n)!;

describe("2026 biru-kan afternoon source corpus", () => {
  it("completes all 180 source numbers with 90 afternoon originals and 450 reasons", () => {
    expect(validateBiruKan2026Pm()).toEqual([]);
    expect(questions.flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(450);
    for (const [subject, count] of [["建築物の構造概論", 15], ["給水及び排水の管理", 35], ["清掃", 25], ["ねずみ、昆虫等の防除", 15]] as const) {
      expect(questions.filter(q => q.subject === subject)).toHaveLength(count);
    }
  });

  it("preserves printed option order, units, source blanks and the 100m calculation input", () => {
    expect(question(95).choices!.ウ).toContain("多孔質系断熱材");
    expect(question(95).choices!.オ).toContain("鋼材の降伏強さ");
    expect(question(100).choices!.ウ).toContain("開口条件によらず");
    expect(question(110).choices!.エ).toContain("銅");
    expect(question(110).choices!.オ).toContain("pH値");
    expect(question(104).choices!.オ).toBe("ホテルの宴会場");
    expect(question(106).originalContent!.tables![0].rows[4]).toEqual(["4", "給湯器の加熱能力", "kJ"]);
    expect(question(118).question).toContain("管長が100m");
    expect(question(118).question).toContain("H_L÷Δt");
    expect(question(130).choices!.エ).toContain("150mm");
    expect(question(142).question.match(/［ ］/g)).toHaveLength(2);
    expect(question(159).question).toContain("［ア］");
    expect(question(159).question).toContain("［イ］");
    expect(question(159).question).toContain("［ウ］");
    expect(question(159).originalContent!.tables![0].rows[3]).toEqual(["3", "市町村長", "占有者", "減量"]);
  });

  it("recomputes both numeric solutions and selects the nearest printed choice", () => {
    for (const [n, result] of [[118, 0.0143 * (100 * 40) / 5], [157, (100 - 20 - 10) / 10]]) {
      const q = question(n);
      const choices = Object.entries(q.choices!).map(([key, value]) => ({ key, value: Number.parseFloat(value!) }));
      const nearest = choices.reduce((a, b) => Math.abs(a.value - result) < Math.abs(b.value - result) ? a : b);
      expect(q.answer).toBe(nearest.key);
      expect(review.calculations.find(c => c.qNumber === n)!.result).toBeCloseTo(result, 8);
    }
    expect(question(118).answer).toBe("イ");
    expect(question(157).answer).toBe("オ");
  });

  it("locks all 90 official afternoon keys independently of the generated source review", () => {
    const expected = ["231551314311154", "4355254253342543422435111", "3425355222", "4352434125131442543241412", "542224154415222"].join("");
    // The answer sequence is copied from the official PDF, separately from the question generator.
    const actual = questions.map(q => q.officialAnswerNumber).join("");
    expect(actual).toBe(expected);
    expect(question(135).answer).toBe("ウ");
    expect(question(135).choiceExplanations!.オ).toContain("月1回");
  });

  it("keeps all 2026 originals out of synchronous and lazy public question pools", async () => {
    const ids = new Set(questions.map(q => q.id));
    for (const pool of [QUESTIONS_BY_EXAM["biru-kan"]!, await getQuestionsForExam("biru-kan")]) {
      expect(pool.some(q => ids.has(q.id) || q.year === 2026)).toBe(false);
      expect(pool).toHaveLength(360);
    }
  });
});
