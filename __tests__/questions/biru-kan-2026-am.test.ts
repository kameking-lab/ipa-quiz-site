import { describe, expect, it } from "vitest";
import { BIRU_KAN_2026_AM_STAGING as questions, validateBiruKan2026Am } from "@/scripts/lib/validate-biru-kan-2026";
import review from "@/data/qualification-staging/biru-kan/2026/am-review.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

const question = (n: number) => questions.find(q => q.qNumber === n)!;

describe("2026 biru-kan morning source corpus", () => {
  it("preserves 90 source numbers, official answers, 450 reasons and two complete figures", () => {
    expect(validateBiruKan2026Am()).toEqual([]);
    expect(questions.flatMap(q => Object.values(q.choiceExplanations!))).toHaveLength(450);
    expect(questions.filter(q => q.subject === "建築物衛生行政概論")).toHaveLength(20);
    expect(questions.filter(q => q.subject === "建築物の環境衛生")).toHaveLength(25);
    expect(questions.filter(q => q.subject === "空気環境の調整")).toHaveLength(45);
  });

  it("retains blank labels, inline option locations, tables, units and formula terms lost by OCR", () => {
    for (const n of [1, 16, 20, 23, 49, 59, 72, 73, 84, 88]) {
      expect(question(n).question, String(n)).toContain("［ア］");
      expect(question(n).originalContent!.tables, String(n)).toHaveLength(1);
    }
    expect(question(3).choices!.ウ).toContain("7,000m²");
    expect(question(48).question).toContain("［(4) 防湿層］");
    expect(question(54).question).toContain("［(4) 内装材料］");
    expect(question(45).question).toMatch(/^10%溶液/);
    expect(question(61).originalContent!.tables![0].rows[1]).toEqual(["1", "19", "34"]);
    expect(question(83).choices!.ウ).toContain("1/√2");
    expect(question(85).question).toContain("log₁₀5＝0.6990");
    expect(question(90).question).toContain("2,500lm");
  });

  it("recomputes numeric solutions and selects the nearest printed choice", () => {
    const results = new Map([
      [45, 50 * 80 / 100000 * 1000], [46, 960 / (2 * 6 * 4 ** 2)],
      [50, 1.2 * (1 ** 2 - 2 ** 2) / 2], [85, 10 * Math.log10(10 ** 7 + 10 ** 7.7)],
      [90, 500 * 80 / (2500 * 0.6 * 0.75)],
    ]);
    for (const [n, result] of results) {
      const q = question(n);
      const values = Object.entries(q.choices!).map(([k, v]) => [k, Number.parseFloat(v!.replace("−", "-"))] as const);
      const nearest = values.reduce((a, b) => Math.abs(a[1] - result) < Math.abs(b[1] - result) ? a : b);
      expect(q.answer, q.id).toBe(nearest[0]);
      expect(review.calculations.find(c => c.qNumber === n)!.result).toBeCloseTo(result, 8);
    }
    expect((4 + 24 * 3) / 4).toBe(19);
    expect((10 + 42 * 3) / 4).toBe(34);
    expect(question(61).answer).toBe("ア");
    expect([20 * Math.log10(2), 10 * Math.log10(2), 20, 10].map(Math.round)).toEqual([6, 3, 20, 10]);
    expect(question(84).answer).toBe("イ");
  });

  it("keeps the official Q37 key while retaining the separate factual observation", () => {
    expect(question(37).answer).toBe("オ");
    expect(question(37).officialAnswerNumber).toBe(5);
    expect(question(37).choices!.ウ).toBe("地球磁場は時間によって変動しない。");
    expect(question(37).choiceFactTruth!.ウ).toBe(false);
    expect(question(37).explanation).toContain("肢3を正しい知識として覚えないでください");
    expect(question(37).explanation).toContain("公式正答の（5）で採点");
    expect(review.technicalObservations[0].status).toBe("explained-with-official-scoring");
  });

  it("publishes reviewed morning originals in synchronous and lazy serving pools", async () => {
    const ids = new Set(questions.map(q => q.id));
    for (const pool of [QUESTIONS_BY_EXAM["biru-kan"]!, await getQuestionsForExam("biru-kan")]) {
      expect(pool.filter(q => ids.has(q.id))).toHaveLength(90);
      expect(pool.filter(q => q.year === 2026)).toHaveLength(180);
      expect(pool.every(q => q.publicAllowed !== false && !q.needsReview)).toBe(true);
      expect(pool).toHaveLength(540);
    }
  });
});
