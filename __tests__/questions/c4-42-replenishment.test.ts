import { describe, expect, it } from "vitest";
import { ENGEI_SOSHOKU3_QUESTIONS } from "@/data/questions/engei-soshoku3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey } from "@/lib/questions/types";

// Independent transcription of the official answer tables, in printed order.
const editions = [
  { exam: "engei-soshoku3" as const, year: 2024, rows: ENGEI_SOSHOKU3_QUESTIONS.filter(q => q.year === 2024),
    answers: "×○×○×××○○○" + "×○○×○××○○○" + "×○○○○○××××" },
];

describe.each(editions)("園芸装飾 $exam $year 年度前期", ({ exam, year, rows, answers }) => {
  it("公式正答の記号で採点・表示し、各問URLと構造化データに同じ答えを出す", () => {
    expect(rows).toHaveLength(answers.length);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(questionSourceEdition(q), q.id).toBe(`${year}年度前期`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id });
      expect(JSON.stringify(graph), q.id).toContain(`${official}: ${q.choices![key]}`);
    }
  });

  it("資格一覧・年度別演習の同期データと非同期読込みに全問を登録する", async () => {
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(rows);
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(rows);
    expect(getQualificationByExamCode(exam)?.shortName).toContain("園芸装飾技能士");
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(new Set(rows.map(q => q.id)).size).toBe(rows.length);
  });
});
