import { describe, expect, it } from "vitest";
import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { SHASHUTSU1_QUESTIONS } from "@/data/questions/shashutsu1";
import { SHASHUTSU2_QUESTIONS } from "@/data/questions/shashutsu2";
import { KIKAI_KENSA3_QUESTIONS } from "@/data/questions/kikai-kensa3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表の原本画像から5問ずつ再読。データ生成時のPDF文字抽出とは独立に照合する。
const editions = [
  { exam: "shashutsu1" as const, rows: SHASHUTSU1_QUESTIONS,
    answers: "××○○×" + "○××○○" + "○○××○" + "○×○○×" + "×○××○"
      + "ハロロイニ" + "ニニロイハ" + "ロイロイニ" + "イロハイニ" + "ニイイニハ",
    pages: [...Array(12).fill(2), ...Array(13).fill(3), ...Array(6).fill(4), ...Array(5).fill(5), ...Array(5).fill(6), ...Array(6).fill(7), ...Array(3).fill(8)],
    figures: [5, 7, 35, 38] },
  { exam: "shashutsu2" as const, rows: SHASHUTSU2_QUESTIONS,
    answers: "○○×○○" + "×○×○×" + "○○×○○" + "○○○××" + "××○×○"
      + "ニロハニハ" + "イハハイニ" + "ロハハニハ" + "イニニニハ" + "ロロロロロ",
    pages: [...Array(16).fill(2), ...Array(9).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8],
    figures: [24, 49] },
  { exam: "kikai-kensa3" as const, rows: KIKAI_KENSA3_QUESTIONS.filter(q => q.year === 2025 && q.season === "early"),
    answers: "○○○○○" + "○×××○" + "××○○○" + "××××○" + "×○××○" + "×○○××",
    pages: [...Array(16).fill(2), ...Array(14).fill(3)], figures: [] as number[] },
];

describe.each(editions)("c4-52 $exam 2025年度前期", ({ exam, rows, answers, pages, figures }) => {
  it("公式正答を全問で保持し、表示・出典・個別ページ・原図を接続する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2025-early.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(answers.length);
    expect(evidence.choiceExplanationCount).toBe(answers.length === 30 ? 60 : 150);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(questionSourceEdition(q), q.id).toBe("2025年度前期");
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl, q.id).toBe(evidence.sources[1].url);
      expect(q.officialQuestionLabel, q.id).toBe(answers.length === 30 ? String(i + 1) : i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      expect(evidence.review[i]).toMatchObject({ id: q.id, pdfPage: pages[i], officialAnswer: official, internalAnswer: key, statementChecked: true, allChoicesChecked: true });
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage, q.id).toBe(figures.includes(q.qNumber));
      if (q.hasImage) {
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        for (const url of q.imageUrls!) expect(statSync(path.join(process.cwd(), "public", url)).size).toBeGreaterThan(1000);
      }
    }
  });

  it("一覧・演習で全問を読み込み、年度・分野を選択できる", async () => {
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === 2025 && q.season === "early")).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === 2025 && q.season === "early")).toEqual(rows);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(2025);
    expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(2025);
    if (answers.length === 30) {
      expect(["ア", "イ"].map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(["○", "×"]);
    } else {
      expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    }
  });
});

it("射出成形の計算図・否定形の設問を原本に合わせて扱う", () => {
  expect(SHASHUTSU1_QUESTIONS[34].explanation).toContain("3.3768g");
  expect(SHASHUTSU2_QUESTIONS[43].question).toContain("適切でない");
  expect(SHASHUTSU2_QUESTIONS[43].choices?.イ).toContain("閉じておく");
});
