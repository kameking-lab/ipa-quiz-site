import { describe, expect, it } from "vitest";
import { KINZOKU_NETSUSHORI3_QUESTIONS } from "@/data/questions/kinzoku-netsushori3";
import { KINZOKU_NETSUSHORI1_QUESTIONS } from "@/data/questions/kinzoku-netsushori1";
import { readFileSync } from "node:fs";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay, questionNumberLabel, choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

// 公式正答表の10問ずつの行を、問題JSONと独立に転記。
const papers = [{
  exam: "kinzoku-netsushori3" as const, year: 2024,
  answers: "×○○××○○××○" + "○○○××○×××○" + "○○○×××○○○×",
  questions: KINZOKU_NETSUSHORI3_QUESTIONS.filter(q => q.year === 2024),
}, {
  exam: "kinzoku-netsushori3" as const, year: 2023,
  answers: "×○○○×××○×○" + "○××○○××○○×" + "○×○×○×○×○×",
  questions: KINZOKU_NETSUSHORI3_QUESTIONS.filter(q => q.year === 2023),
}, {
  exam: "kinzoku-netsushori1" as const, year: 2023,
  // 1級は公式表の左右をそれぞれ上から下へ読む。
  answers: "×○×○○" + "×○○×○" + "××××○" + "××○××" + "×○○○×"
    + "ロイロハロ" + "ハニニロハ" + "ハニイハニ" + "ロニニハニ" + "ハニロロイ",
  questions: KINZOKU_NETSUSHORI1_QUESTIONS.filter(q => q.year === 2023),
}];

describe.each(papers)("$exam $year 年度前期", ({ exam, year, answers, questions }) => {
  it("全問の公式正答・表示・全肢解説・出典・経路が対応する", () => {
    expect(questions).toHaveLength(answers.length);
    expect(new Set(questions.map(q => q.id)).size).toBe(answers.length);
    expect(new Set(questions.map(questionPagePath)).size).toBe(answers.length);
    questions.forEach((q, i) => {
      const number = exam === "kinzoku-netsushori1" ? i % 25 + 1 : i + 1;
      const group = exam === "kinzoku-netsushori1" ? `${i < 25 ? "a" : "b"}-` : "";
      expect(q.id).toBe(`${exam}-${year}-early-gakka-${group}${String(number).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(exam === "kinzoku-netsushori1" ? `${i < 25 ? "A" : "B"}群 ${number}` : String(number));
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
  it("同期・遅延ローダーと資格一覧・構造化データに接続する", async () => {
    const all = exam === "kinzoku-netsushori1" ? KINZOKU_NETSUSHORI1_QUESTIONS : KINZOKU_NETSUSHORI3_QUESTIONS;
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
    expect(await getQuestionsForExam(exam)).toEqual(all);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(choiceDisplayLabel(exam, "ア")).toBe(exam === "kinzoku-netsushori1" ? "イ" : "○");
    expect(choiceDisplayLabel(exam, "イ")).toBe(exam === "kinzoku-netsushori1" ? "ロ" : "×");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    expect(JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "金属熱処理3級", lastUpdatedISO: "2026-11-13" }))).toContain("中央職業能力開発協会");
  });
});

it("1級の原図2点を保持し、3級は文字だけで解答できる", () => {
  const firstGrade2023 = KINZOKU_NETSUSHORI1_QUESTIONS.filter(q => q.year === 2023);
  expect(firstGrade2023.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([42, 48]);
  expect(KINZOKU_NETSUSHORI3_QUESTIONS.filter(q => q.year <= 2024).some(q => q.hasImage)).toBe(false);
  for (const q of firstGrade2023.filter(q => q.hasImage)) {
    expect(q.imageAltTexts?.[0]).toBeTruthy();
    const bytes = readFileSync(`public${q.imageUrls?.[0]}`);
    expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
  }
  expect(firstGrade2023[42].choices?.エ).toBe("10%");
  expect(KINZOKU_NETSUSHORI3_QUESTIONS.find(q => q.year === 2023 && q.qNumber === 19)?.question).toContain("1471N");
});
