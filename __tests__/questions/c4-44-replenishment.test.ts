import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { SASSHI1_QUESTIONS } from "@/data/questions/sasshi1";
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

// Official answer tables transcribed in groups of five, separately from the data builder.
const editions = [
  { exam: "sasshi1" as const, year: 2024, rows: SASSHI1_QUESTIONS.filter(q => q.year === 2024),
    answers: "×○×○○" + "○○○×○" + "○○○○×" + "×○○○×" + "○○○××"
      + "ニロロイロ" + "ハロハハニ" + "ロロニロハ" + "ロニイニイ" + "イロロニロ",
    pages: [...Array(15).fill(2), ...Array(10).fill(3), ...Array(5).fill(4), ...Array(6).fill(5), ...Array(5).fill(6), ...Array(6).fill(7), ...Array(3).fill(8)],
    figureNumbers: [23, 24] },
  { exam: "sasshi1" as const, year: 2023, rows: SASSHI1_QUESTIONS.filter(q => q.year === 2023),
    answers: "○○○×○" + "××○××" + "×○○×○" + "×○×××" + "×○×××"
      + "ロロハハロ" + "イハイハニ" + "ロニニロイ" + "ニイロロロ" + "ハハイロハ",
    pages: [...Array(15).fill(2), ...Array(10).fill(3), ...Array(5).fill(4), ...Array(6).fill(5), ...Array(5).fill(6), ...Array(6).fill(7), ...Array(3).fill(8)],
    figureNumbers: [23, 46, 48] },
];

describe.each(editions)("c4-44 $exam $year 年度前期", ({ exam, year, rows, answers, pages, figureNumbers }) => {
  it("全公式正答が演習の採点・原本記号表示・個別URL・構造化データで一致する", () => {
    expect(rows).toHaveLength(50);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
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
      expect(JSON.stringify(graph), q.id).toContain("中央職業能力開発協会");
    }
  });

  it("一覧の同期データと演習の非同期読込みが全問を返す", async () => {
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(rows);
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(rows);
    expect(getQualificationByExamCode(exam)?.administrator).toBe("中央職業能力開発協会");
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
  });

  it("原本ページ・問題番号・原図が配信データと照合記録で対応する", () => {
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(50);
    expect(evidence.figureCount).toBe(figureNumbers.length);
    expect(evidence.choiceExplanationCount).toBe(150);
    for (const [i, q] of rows.entries()) {
      const page = pages[i];
      const label = i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`;
      const hasFigure = figureNumbers.includes(q.qNumber);
      expect(q.officialQuestionLabel, q.id).toBe(label);
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${page}`);
      expect(q.sourceAnswerUrl, q.id).toBe(evidence.sources[1].url);
      expect(evidence.review[i]).toMatchObject({ id: q.id, originalNumber: label, pdfPage: page, officialAnswer: answers[i], internalAnswer: q.answer, statementChecked: true, allChoicesChecked: true, hasFigure });
      expect(q.hasImage, q.id).toBe(hasFigure);
      if (hasFigure) {
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts, q.id).toHaveLength(1);
        const file = path.join(process.cwd(), "public", q.imageUrls![0]);
        expect(existsSync(file), q.id).toBe(true);
        expect(readFileSync(file).subarray(0, 8).toString("hex"), q.id).toBe("89504e470d0a1a0a");
      }
    }
  });
});
