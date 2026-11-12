import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KAGU3_QUESTIONS } from "@/data/questions/kagu3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";

describe("Q4-103 家具製作3級2023年度後期", () => {
  const questions = KAGU3_QUESTIONS.filter(q => q.year === 2023);
  // 公式正答表の画像から独立して転記。
  const answers = "○×××××○○○×" + "×××××○○×○○" + "○××××○○○×○";
  it("全30問の公式正答と原問番号・図5点を保持する", () => {
    expect(questions).toHaveLength(30);
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([1, 4, 21, 23, 26]);
    questions.forEach((q, i) => {
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ"]);
      q.imageUrls?.forEach(url => expect(readFileSync(`public${url}`).subarray(1, 4).toString()).toBe("PNG"));
    });
  });
  it("両年度を読み込み、年度別の問題URLで取り出せる", async () => {
    expect(await getQuestionsForExam("kagu3")).toEqual(KAGU3_QUESTIONS);
    expect(KAGU3_QUESTIONS.filter(q => q.year === 2025)).toHaveLength(30);
    expect(new Set(KAGU3_QUESTIONS.map(questionPagePath)).size).toBe(60);
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(KAGU3_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
  });
});
