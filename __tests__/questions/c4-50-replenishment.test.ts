import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { CHIKURO1_QUESTIONS } from "@/data/questions/chikuro1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表を原本画像から5問ずつ再読したキー。内部キーと分けて照合する。
const editions = [
  { exam: "chikuro1" as const, year: 2023, rows: CHIKURO1_QUESTIONS.filter(q => q.year === 2023),
    answers: "×○×○×" + "×○○○×" + "×○×○×" + "○○○×○" + "×○××○"
      + "ロロハロハ" + "ハロニニロ" + "ハニイロイ" + "イハニイロ" + "ハハイニイ",
    pages: [...Array(17).fill(2), ...Array(8).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8],
    figures: [31, 48] },
  { exam: "chikuro1" as const, year: 2024, rows: CHIKURO1_QUESTIONS.filter(q => q.year === 2024),
    answers: "○×××○" + "×○○○○" + "×○×○○" + "×○×○×" + "○○○○○"
      + "イニニハハ" + "ニイロニニ" + "ロハハハロ" + "ロハニイハ" + "ニハニイイ",
    pages: [...Array(12).fill(2), ...Array(13).fill(3), ...Array(5).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(5).fill(7), ...Array(3).fill(8)],
    figures: [5, 28] },
];

describe.each(editions)("c4-50 $exam $year 年度前期", ({ exam, year, rows, answers, pages, figures }) => {
  it("公式50正答が採点・表示・個別URLに対応し、原図が閲覧できる", () => {
    expect(rows).toHaveLength(50);
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(50);
    expect(evidence.choiceExplanationCount).toBe(150);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(["イ", "ロ", "ハ", "ニ"]);
      expect(questionSourceEdition(q), q.id).toBe(`${year}年度前期`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl, q.id).toBe(evidence.sources[1].url);
      expect(q.officialQuestionLabel, q.id).toBe(i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      expect(evidence.review[i]).toMatchObject({ id: q.id, pdfPage: pages[i], officialAnswer: official, internalAnswer: key, statementChecked: true, allChoicesChecked: true });
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage, q.id).toBe(figures.includes(q.qNumber));
      if (q.hasImage) {
        expect(q.imageUrls?.length).toBeGreaterThan(0);
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        for (const url of q.imageUrls!) expect(statSync(path.join(process.cwd(), "public", url)).size).toBeGreaterThan(1000);
      }
    }
  });

  it("一覧と演習で全問を読み込み、分野と年度のフィルターに登録する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(rows);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
  });
});
