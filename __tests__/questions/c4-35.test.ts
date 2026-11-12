import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KAGU3_QUESTIONS } from "@/data/questions/kagu3";
import { FLOWER2_QUESTIONS } from "@/data/questions/flower2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
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

describe("Q4-104 フラワー装飾2級2024年度前期", () => {
  const questions = FLOWER2_QUESTIONS.filter(q => q.year === 2024);
  // 公式正答表の画像から独立して転記。A群、B群の順。
  const answers = "○×○××××○○×○○×○○×○×○○○○×○×"
    + "ニロニハロロロニハイロハイニロハイハロイロロイロハ";
  it("全50問の公式正答・群別番号・全肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    questions.forEach((q, i) => {
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionNumberLabel(q)).toBe(`${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS.flower2.sessions[0].categories).toContain(q.category);
      expect(q.hasImage).toBe(false);
    });
  });
  it("同期・遅延ローダーと資格一覧に接続し、URLで原問を特定する", async () => {
    expect(QUESTIONS_BY_EXAM.flower2).toEqual(FLOWER2_QUESTIONS);
    expect(await getQuestionsForExam("flower2")).toEqual(FLOWER2_QUESTIONS);
    expect(getQualificationByExamCode("flower2")?.status).toBe("live");
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(FLOWER2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
    expect(questions[49].answer).toBe("ウ");
    expect(questions[49].choices?.ウ).toBe("トリカブト");
  });
});
