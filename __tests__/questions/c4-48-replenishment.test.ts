import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { KAGAKU_BUNSEKI1_QUESTIONS } from "@/data/questions/kagaku-bunseki1";
import { KAGAKU_BUNSEKI3_QUESTIONS } from "@/data/questions/kagaku-bunseki3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表を原本画像から10問（1級は5問）ずつ読み直したキー。
const editions = [
  { exam: "kagaku-bunseki3" as const, year: 2024, rows: KAGAKU_BUNSEKI3_QUESTIONS.filter(q => q.year === 2024),
    answers: "×○×○××○××○" + "○××○○×○×××" + "××○○○○×○○×",
    pages: [...Array(15).fill(2), ...Array(15).fill(3)], choiceCount: 60 },
  { exam: "kagaku-bunseki3" as const, year: 2023, rows: KAGAKU_BUNSEKI3_QUESTIONS.filter(q => q.year === 2023),
    answers: "×○×××××○○×" + "○×○××○×○×○" + "○××○×○××○○",
    pages: [...Array(17).fill(2), ...Array(13).fill(3)], choiceCount: 60 },
  { exam: "kagaku-bunseki1" as const, year: 2023, rows: KAGAKU_BUNSEKI1_QUESTIONS.filter(q => q.year === 2023),
    answers: "×○×○○" + "×××○×" + "○×○×○" + "○○×××" + "×○×××"
      + "ニハハニニ" + "ハハイニハ" + "イロニニハ" + "イハロロハ" + "ロイハロニ",
    pages: [...Array(15).fill(2), ...Array(10).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8], choiceCount: 150 },
];

describe.each(editions)("c4-48 $exam $year 年度前期", ({ exam, year, rows, answers, pages, choiceCount }) => {
  it("全公式正答が採点・選択肢表示・個別URL・構造化データに対応する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(answers.length);
    expect(evidence.choiceExplanationCount).toBe(choiceCount);
    expect(evidence.figureCount).toBe(0);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      if (exam === "kagaku-bunseki3") {
        expect(choiceDisplayLabel(exam, "ア")).toBe("○");
        expect(choiceDisplayLabel(exam, "イ")).toBe("×");
      } else {
        expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(["イ", "ロ", "ハ", "ニ"]);
      }
      expect(questionSourceEdition(q), q.id).toBe(`${year}年度前期`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl, q.id).toBe(evidence.sources[1].url);
      expect(q.officialQuestionLabel, q.id).toBe(exam === "kagaku-bunseki3" ? `${i + 1}` : i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      expect(evidence.review[i]).toMatchObject({ id: q.id, pdfPage: pages[i], officialAnswer: official, internalAnswer: key, statementChecked: true, allChoicesChecked: true });
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage, q.id).toBe(false);
    }
  });

  it("一覧と演習が全問を読み込み、分野と年度のフィルターに登録される", async () => {
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(rows);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
  });
});
