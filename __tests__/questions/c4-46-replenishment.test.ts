import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { KYOKA_PLASTIC1_QUESTIONS } from "@/data/questions/kyoka-plastic1";
import { KAGAKU_BUNSEKI2_QUESTIONS } from "@/data/questions/kagaku-bunseki2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表を5問ずつ別途読み取り、内部キー・画面表示・構造化データを照合する。
const editions = [
  { exam: "kagaku-bunseki2" as const, year: 2023, rows: KAGAKU_BUNSEKI2_QUESTIONS.filter(q => q.year === 2023),
    answers: "○○○×○" + "×○○○○" + "××○○×" + "○××○○" + "○×○××"
      + "ニハロロロ" + "ロロロロニ" + "ハロハニハ" + "ハイロロハ" + "ニハイロロ",
    pages: [...Array(16).fill(2), ...Array(9).fill(3), ...Array(5).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), ...Array(2).fill(8)], figures: [] as number[] },
  { exam: "kagaku-bunseki2" as const, year: 2024, rows: KAGAKU_BUNSEKI2_QUESTIONS.filter(q => q.year === 2024),
    answers: "×○×○○" + "○○××○" + "○×○×○" + "○○×○○" + "×○××○"
      + "ロロロハロ" + "イニハニハ" + "イニニニイ" + "ロイイロロ" + "イハロハロ",
    pages: [...Array(15).fill(2), ...Array(10).fill(3), ...Array(6).fill(4), ...Array(5).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), ...Array(2).fill(8)], figures: [] as number[] },
  { exam: "kyoka-plastic1" as const, year: 2023, rows: KYOKA_PLASTIC1_QUESTIONS.filter(q => q.year === 2023),
    answers: "○○○○×" + "○○○○○" + "×○××○" + "××○××" + "○××○○"
      + "イイロイハ" + "ニロニハニ" + "ロハニニハ" + "ロハイハハ" + "ニイロロロ",
    pages: [...Array(14).fill(2), ...Array(11).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8], figures: [] as number[] },
];

describe.each(editions)("c4-46 $exam $year 年度前期", ({ exam, year, rows, answers, pages, figures }) => {
  it("公式正答50件が採点・表示・個別URL・出典に対応する", () => {
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
        expect(q.imageUrls).toHaveLength(1);
        expect(q.imageAltTexts).toHaveLength(1);
        expect(existsSync(path.join(process.cwd(), "public", q.imageUrls![0]))).toBe(true);
      }
    }
  });

  it("一覧と演習が全問を読込み、分野と年度のフィルターに登録される", async () => {
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(rows);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
  });
});
