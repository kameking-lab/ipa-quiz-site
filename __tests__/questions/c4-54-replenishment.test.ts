import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { KATAWAKU2_QUESTIONS } from "@/data/questions/katawaku2";
import { TEKKIN3_QUESTIONS } from "@/data/questions/tekkin3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表の画像を5問ずつ再読し、転記した文字列とは別に照合する。
const editions = [
  { exam: "katawaku2" as const, rows: KATAWAKU2_QUESTIONS,
    answers: "××○○×" + "○○×○×" + "××○○○" + "××○○○" + "×××○×"
      + "ハニニハロ" + "ロニロハハ" + "イニニロニ" + "ニハハロロ" + "ニハロハニ",
    pages: [...Array(11).fill(2), ...Array(14).fill(3), ...Array(5).fill(4), ...Array(4).fill(5), ...Array(5).fill(6), ...Array(4).fill(7), ...Array(5).fill(8), ...Array(2).fill(9)],
    figures: [1, 21, 28, 31, 35, 41, 42, 43, 44, 46, 47, 50] },
  { exam: "tekkin3" as const, rows: TEKKIN3_QUESTIONS,
    answers: "×××○×" + "×○○×○" + "×○×○○" + "×○○×○" + "×○○×○" + "×○○○○",
    pages: [...Array(10).fill(2), ...Array(10).fill(3), ...Array(10).fill(4)],
    figures: [5, 7, 8, 11, 16, 23, 24] },
];

describe.each(editions)("c4-54 $exam 2025年度後期", ({ exam, rows, answers, pages, figures }) => {
  it("公式正答・問番号・本文出典・原図・表示・個別ページを全問で保持する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2025-late.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(answers.length);
    expect(evidence.choiceExplanationCount).toBe(answers.length === 30 ? 60 : 150);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(questionSourceEdition(q), q.id).toBe("2025年度後期");
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
        for (const url of q.imageUrls!) {
          const png = readFileSync(path.join(process.cwd(), "public", url));
          expect(png.subarray(0, 8).toString("hex"), url).toBe("89504e470d0a1a0a");
          expect(png.readUInt32BE(16), url).toBeGreaterThan(20);
          expect(png.readUInt32BE(20), url).toBeGreaterThan(20);
        }
      }
    }
  });

  it("一覧と演習で全問を読み込み、年度・分野・原本の選択肢記号を表示する", async () => {
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(rows);
    expect(await getQuestionsForExam(exam)).toEqual(rows);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(answers.length);
    expect(EXAM_CONFIGS[exam].yearRange).toEqual({ start: 2025, end: 2025 });
    expect(EXAM_CONFIGS[exam].seasons).toEqual(["late"]);
    if (answers.length === 30) {
      expect(["ア", "イ"].map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(["○", "×"]);
    } else {
      expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(["イ", "ロ", "ハ", "ニ"]);
    }
  });
});

it("型枠の使用長さ計算と否定形設問を原本に合わせる", () => {
  expect(KATAWAKU2_QUESTIONS[30].choices?.イ).toBe("325mm");
  expect(KATAWAKU2_QUESTIONS[30].explanation).toContain("175＋175－25＝325mm");
  expect(KATAWAKU2_QUESTIONS[49].question).toContain("適切でない");
});
