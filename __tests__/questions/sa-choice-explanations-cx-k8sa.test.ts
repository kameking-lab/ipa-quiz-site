import { describe, expect, it } from "vitest";
import { SA_QUESTIONS } from "@/data/questions/sa";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sa/by-year";
import overlay from "@/data/questions/sa/choice-explanations-cx-k8sa.json";
import { applyIpaCorrections } from "@/data/questions/corrections";
import type { ChoiceKey } from "@/lib/questions/types";

describe("SA 午前IIの選択肢解説", () => {
  it("8年度200問を、解説182問と明示した除外18問に分ける", () => {
    const skippedIds = [
      "sa-2009a-am2-q2", "sa-2009a-am2-q23",
      "sa-2010a-am2-q1", "sa-2010a-am2-q3", "sa-2010a-am2-q4",
      "sa-2010a-am2-q9", "sa-2010a-am2-q11", "sa-2010a-am2-q21",
      "sa-2011a-am2-q1", "sa-2011a-am2-q12", "sa-2011a-am2-q23",
      "sa-2021h-am2-q21",
      "sa-2022h-am2-q5", "sa-2022h-am2-q24", "sa-2022h-am2-q25",
      "sa-2023h-am2-q2", "sa-2023h-am2-q9",
      "sa-2025h-am2-q8",
    ];
    const questions = SA_QUESTIONS.filter(question => question.session === "am2");
    expect(questions).toHaveLength(200);
    expect(Object.keys(overlay)).toHaveLength(182);
    expect(questions.filter(question => !(question.id in overlay)).map(question => question.id).sort())
      .toEqual(skippedIds.sort());
    const perYear: Record<number, number> = {};
    for (const question of questions.filter(question => question.id in overlay)) {
      perYear[question.year] = (perYear[question.year] ?? 0) + 1;
    }
    expect(perYear).toEqual({ 2009: 23, 2010: 19, 2011: 22, 2021: 24, 2022: 22, 2023: 23, 2024: 25, 2025: 24 });
  });

  it("問題・選択肢・既存の訂正済み正答を変えずに読み込む", () => {
    const originals = applyIpaCorrections("sa", BY_YEAR_QUESTIONS);
    const withoutReasons = (questions: typeof SA_QUESTIONS) => questions.map(question => {
      const copy = { ...question };
      delete copy.choiceExplanations;
      return copy;
    });
    expect(withoutReasons(SA_QUESTIONS)).toEqual(withoutReasons(originals));
  });

  it("対象の全四肢に60〜180字の異なる理由を付け、正答と正誤を一致させる", () => {
    const byId = new Map(SA_QUESTIONS.map(question => [question.id, question]));
    for (const [id, reasons] of Object.entries(overlay)) {
      const question = byId.get(id)!;
      expect(question, id).toBeDefined();
      expect(question.session, id).toBe("am2");
      expect(question.type, id).toBe("multiple-choice");
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
        expect(question.choiceExplanations?.[key as ChoiceKey], `${id}/${key}`).toBe(reason);
      }
    }
  });

  it("既存の正答訂正を解説にも反映する", () => {
    const question = SA_QUESTIONS.find(question => question.id === "sa-2009a-am2-q9")!;
    expect(question.answer).toBe("ア");
    expect(question.choiceExplanations?.ア).toContain("正しいです。");
    expect(question.choiceExplanations?.イ).toContain("誤りです。");
  });

  it("一括読込と遅延読込にも同じ728肢の解説を渡す", async () => {
    const { ALL_QUESTIONS } = await import("@/data/questions");
    const { getQuestionsForExam } = await import("@/lib/questions/get-questions");
    const lazy = await getQuestionsForExam("sa");
    for (const questions of [ALL_QUESTIONS.filter(question => question.exam === "sa"), lazy]) {
      const byId = new Map(questions.map(question => [question.id, question]));
      for (const [id, reasons] of Object.entries(overlay)) {
        expect(byId.get(id)?.choiceExplanations, id).toEqual(reasons);
      }
    }
  });

  it("法令・規格・制度等の版に依存する理由には当時の前提を全肢へ残す", () => {
    const datedIds = [
      "sa-2009a-am2-q10", "sa-2009a-am2-q12", "sa-2009a-am2-q15",
      "sa-2010a-am2-q12", "sa-2010a-am2-q16", "sa-2010a-am2-q23",
      "sa-2011a-am2-q13", "sa-2011a-am2-q15",
      "sa-2021h-am2-q9", "sa-2021h-am2-q10", "sa-2021h-am2-q11", "sa-2021h-am2-q15", "sa-2021h-am2-q19",
      "sa-2022h-am2-q11", "sa-2022h-am2-q12",
      "sa-2023h-am2-q8", "sa-2023h-am2-q11", "sa-2023h-am2-q14", "sa-2023h-am2-q18",
      "sa-2024h-am2-q10", "sa-2024h-am2-q11", "sa-2024h-am2-q14", "sa-2024h-am2-q20",
    ];
    for (const id of datedIds) {
      const reasons = overlay[id as keyof typeof overlay];
      for (const reason of Object.values(reasons)) expect(reason, id).toContain("出題当時の");
    }
  });
});
