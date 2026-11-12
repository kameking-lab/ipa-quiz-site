import { describe, expect, it } from "vitest";
import { KINZOKU_NETSUSHORI3_QUESTIONS } from "@/data/questions/kinzoku-netsushori3";
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
}];

describe.each(papers)("$exam $year 年度前期", ({ exam, year, answers, questions }) => {
  it("全問の公式正答・表示・全肢解説・出典・経路が対応する", () => {
    expect(questions).toHaveLength(answers.length);
    expect(new Set(questions.map(q => q.id)).size).toBe(answers.length);
    expect(new Set(questions.map(questionPagePath)).size).toBe(answers.length);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`${exam}-${year}-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
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
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(KINZOKU_NETSUSHORI3_QUESTIONS);
    expect(await getQuestionsForExam(exam)).toEqual(KINZOKU_NETSUSHORI3_QUESTIONS);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(choiceDisplayLabel(exam, "ア")).toBe("○");
    expect(choiceDisplayLabel(exam, "イ")).toBe("×");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(30);
    expect(JSON.stringify(buildQuestionJsonLd({ question: questions[0], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[0])}`, title: "金属熱処理3級", lastUpdatedISO: "2026-11-13" }))).toContain("中央職業能力開発協会");
  });
});
