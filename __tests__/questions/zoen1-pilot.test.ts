import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import source from "@/data/questions/zoen1/2026-september.json";
import { defaultPracticeSession } from "@/lib/questions/practice-session";

describe("1級造園 令和8年度第一次検定", () => {
  it("問題A/Bの公式全問必須条件と収録範囲を区別する", () => {
    expect(source.allQuestionsRequired).toBe(true);
    expect(source.papers.map((paper) => paper.officialQuestionCount)).toEqual([36, 29]);
    expect(source.papers.map((paper) => paper.publishedCount)).toEqual([20, 4]);
    expect(ZOEN1_QUESTIONS).toHaveLength(24);
    expect(defaultPracticeSession("zoen1")).toBe("mondai-a");
    expect(ZOEN1_QUESTIONS.filter((q) => q.session === "mondai-a")).toHaveLength(20);
    expect(ZOEN1_QUESTIONS.filter((q) => q.session === "mondai-b")).toHaveLength(4);
  });

  it("追加15問は既存9問と重複せず、公式正答の単一選択肢を保つ", () => {
    const added = [6, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 22, 30, 34];
    const answers = [3, 2, 4, 1, 2, 4, 2, 4, 4, 3, 1, 1, 3, 3, 3];
    expect(new Set(ZOEN1_QUESTIONS.map((q) => q.id)).size).toBe(24);
    for (const [index, number] of added.entries()) {
      const question = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === number);
      expect(question?.answer).toEqual(["ア", "イ", "ウ", "エ"][answers[index]! - 1]);
      expect(question?.requiredSelections).toBeUndefined();
    }
  });

  it("問題B No.24〜26は公式の正解をすべて選んだ場合だけ採点する", () => {
    for (const [number, expected] of [[24, ["ア", "ウ"]], [25, ["ア", "イ", "エ"]], [26, ["ア", "ウ", "エ"]]] as const) {
      const question = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === number);
      expect(question?.answer).toEqual(expected);
      expect(question?.requiredSelections).toBe(expected.length);
    }
    expect(ZOEN1_QUESTIONS.filter((q) => q.session === "mondai-a" || q.qNumber < 24).every((q) => !q.requiredSelections)).toBe(true);
  });
});
