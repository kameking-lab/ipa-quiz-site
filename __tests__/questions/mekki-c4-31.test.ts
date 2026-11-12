import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { MEKKI3_QUESTIONS } from "@/data/questions/mekki3";
import { MEKKI1_QUESTIONS } from "@/data/questions/mekki1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

// 公式正答表から問題データとは別に転記した各10問の正答。
const papers = [{
  exam: "mekki3" as const, year: 2025, all: MEKKI3_QUESTIONS,
  answers: "×○××○○×○○○" + "×○○○×○×○○×" + "×××××○××○×",
}, {
  exam: "mekki1" as const, year: 2024, all: MEKKI1_QUESTIONS,
  answers: "○○○××" + "×○×××" + "○×○○○" + "×○○××" + "×○×○×"
    + "ハハロロイ" + "ハロハロロ" + "ハロハロハ" + "ロニイロイ" + "ハイイニハ",
}];

describe.each(papers)("$exam $year 年度前期", ({ exam, year, all, answers }) => {
  const questions = all.filter(q => q.year === year);
  it("全問を公式正答・原問番号・全肢解説・出典・経路と対応させる", () => {
    expect(questions).toHaveLength(answers.length);
    expect(new Set(questions.map(q => q.id)).size).toBe(answers.length);
    expect(new Set(questions.map(questionPagePath)).size).toBe(answers.length);
    questions.forEach((q, i) => {
      const group = exam === "mekki1" && i >= 25 ? "b" : "a";
      const number = exam === "mekki1" ? i % 25 + 1 : i + 1;
      expect(q.id).toBe(`${exam}-${year}-early-gakka-${group}-${String(number).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${group.toUpperCase()}群 ${number}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.+#page=\d+$/);
      expect(q.sourceAnswerUrl).toContain("www.kentei.javada.or.jp/pdf/");
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
  });
  it("同期・遅延ローダー、資格一覧、構造化データに接続する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
    expect(await getQuestionsForExam(exam)).toEqual(all);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    const structured = JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "めっき技能士", lastUpdatedISO: "2026-11-13" }));
    expect(structured).toContain("中央職業能力開発協会");
    expect(structured).toContain(`${answers[0]}: ${questions[0].choices?.[questions[0].answer as "ア" | "イ"]}`);
  });
});

it("1級の組合せ表と計算条件を保持する", () => {
  const byNumber = (n: number) => MEKKI1_QUESTIONS.find(q => q.qNumber === n)!;
  expect(byNumber(29).choices?.イ).toBe("①230℃　②ウィスカ　③鉛");
  expect(byNumber(34).question).toContain("200V、2kW");
  expect(byNumber(34).choices?.イ).toBe("500W");
  expect(byNumber(42).choices?.エ).toBe("15mm²");
  expect(MEKKI1_QUESTIONS.some(q => q.hasImage)).toBe(false);
});

it("2025年度3級の電流計算に必要な寸法図を保持する", () => {
  const q = MEKKI3_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 2)!;
  expect(q.hasImage).toBe(true);
  expect(q.imageAltTexts?.[0]).toContain("100mm");
  expect(q.imageAltTexts?.[0]).toContain("50mm");
  expect(readFileSync(`public${q.imageUrls?.[0]}`).subarray(1, 4).toString()).toBe("PNG");
  expect(MEKKI3_QUESTIONS.filter(q => q.hasImage)).toHaveLength(1);
  expect(q.explanation).toContain("3A");
});
