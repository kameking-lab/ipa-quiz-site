import { describe, expect, it } from "vitest";
import { TSUSHIN1_QUESTIONS } from "@/data/questions/tsushin1";
import source from "@/data/questions/tsushin1/2026-september.json";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { isExamPublished } from "@/lib/qualifications/catalog";

describe("1級電気通信工事 令和8年度第一次検定", () => {
  it("12問の初回収録を公式90問と区別して公開する", () => {
    expect(source.papers.map((paper) => paper.officialQuestionCount)).toEqual([55, 35]);
    expect(source.papers.map((paper) => paper.publishedCount)).toEqual([8, 4]);
    expect(TSUSHIN1_QUESTIONS).toHaveLength(12);
    expect(new Set(TSUSHIN1_QUESTIONS.map((q) => q.id)).size).toBe(12);
    expect(defaultPracticeSession("tsushin1")).toBe("mondai-a");
    expect(isExamPublished("tsushin1")).toBe(true);
  });

  it("公式正答を数字から4肢の単一選択へ順番どおり変換する", () => {
    const answers: Record<string, Record<number, string>> = {
      "mondai-a": { 5: "エ", 8: "ア", 11: "ア", 12: "ウ", 13: "エ", 14: "ウ", 15: "ア", 16: "イ" },
      "mondai-b": { 1: "ウ", 5: "イ", 6: "ウ", 9: "ア" },
    };
    for (const question of TSUSHIN1_QUESTIONS) {
      expect(question.answer).toBe(answers[question.session]?.[question.qNumber]);
      expect(question.requiredSelections).toBeUndefined();
      expect(Object.values(question.choices ?? {})).toHaveLength(4);
      expect(Object.keys(question.choiceExplanations ?? {})).toHaveLength(4);
    }
  });
});
