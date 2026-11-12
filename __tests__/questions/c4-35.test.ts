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
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examFullName, examTopDescription } from "@/lib/seo/exam-meta";

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

describe("Q4-105 フラワー装飾2級2023年度前期", () => {
  const questions = FLOWER2_QUESTIONS.filter(q => q.year === 2023);
  // 公式正答表の画像から独立して転記。A群、B群の順。
  const answers = "○○××○×××○×○×××○×○×○×○×○○○"
    + "イロハハロロロニニハイロロロイロロイニニハニニニイ";
  it("公式本文と50問の正答・全肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`flower2-2023-early-gakka-${i < 25 ? "a" : "b"}-${String(i % 25 + 1).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionSourceEdition(q)).toBe("2023年度前期");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.sourcePdfUrl).toMatch(/#page=[2-8]$/);
      expect(q.sourceAttribution).toContain("令和5年度前期 2級フラワー装飾");
    });
    expect(questions[48].choices?.エ).toBe("りん酸肥料は、根の発育を促進する。");
    expect(questions[32].choices?.イ).toBe("アンソーテッド");
    expect(questions[48].officialAnswerNumber).toBe("ニ");
    expect(questions[48].explanation).toContain("注：");
    expect(questions[48].officialReferenceUrls).toContain("https://www.maff.go.jp/j/pr/aff/2312/spe1_04.html");
  });
  it("両年度100問のURL・資格名・構造化データを生成する", () => {
    expect(FLOWER2_QUESTIONS).toHaveLength(100);
    expect(new Set(FLOWER2_QUESTIONS.map(questionPagePath)).size).toBe(100);
    expect(examFullName("flower2")).toContain("フラワー装飾");
    expect(examTopDescription("flower2", 100)).toContain("フラワー装飾");
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(FLOWER2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
    const jsonld = JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "フラワー装飾技能士2級", lastUpdatedISO: "2026-11-13" }));
    expect(jsonld).toContain("中央職業能力開発協会");
    expect(jsonld).toContain("○: 正しい（○）");
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
    expect(getQualificationByExamCode("flower2")?.reuseSummary).not.toContain("2025年度");
    questions.forEach(q => {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(FLOWER2_QUESTIONS, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
    expect(questions[49].answer).toBe("ウ");
    expect(questions[49].choices?.ウ).toBe("トリカブト");
  });
});
