import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { PAN_SEIZO1_QUESTIONS as ALL_PAN_SEIZO1_QUESTIONS } from "@/data/questions/pan-seizo1";
import { KIKAI_SHIAGE1_QUESTIONS as ALL_KIKAI_SHIAGE1_QUESTIONS } from "@/data/questions/kikai-shiage1";
import { KIKAI_SHIAGE3_QUESTIONS as ALL_KIKAI_SHIAGE3_QUESTIONS } from "@/data/questions/kikai-shiage3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const PAN_SEIZO1_QUESTIONS = ALL_PAN_SEIZO1_QUESTIONS.filter(q => q.year === 2025);
const KIKAI_SHIAGE1_QUESTIONS = ALL_KIKAI_SHIAGE1_QUESTIONS.filter(q => q.year === 2025);
const KIKAI_SHIAGE3_QUESTIONS = ALL_KIKAI_SHIAGE3_QUESTIONS.filter(q => q.year === 2025);

// 公式正答表の画像を5問ずつ再読して固定。転記側の配列から正答を生成しない。
const editions = [
  { exam: "pan-seizo1" as const, rows: PAN_SEIZO1_QUESTIONS, season: "late" as const,
    answers: "○○××○" + "○○×××" + "×○×××" + "○○○××" + "×××○×"
      + "ニハニイニ" + "ニロハイハ" + "ロニニハハ" + "ロロハロロ" + "ニイニハイ",
    pages: [...Array(16).fill(2), ...Array(9).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(6).fill(6), ...Array(6).fill(7), 8],
    figures: [] as number[] },
  { exam: "kikai-shiage1" as const, rows: KIKAI_SHIAGE1_QUESTIONS, season: "early" as const,
    answers: "×○○○○" + "×○×○○" + "○××○×" + "○○○○×" + "○××○○"
      + "イハイニハ" + "ロニイロニ" + "ロロイハハ" + "ハロニイロ" + "ニイイロハ",
    pages: [...Array(16).fill(2), ...Array(9).fill(3), ...Array(6).fill(4), ...Array(6).fill(5), ...Array(5).fill(6), ...Array(6).fill(7), ...Array(2).fill(8)],
    figures: [41] },
  { exam: "kikai-shiage3" as const, rows: KIKAI_SHIAGE3_QUESTIONS, season: "early" as const,
    answers: "○×○○×" + "×○○×○" + "○×○○○" + "○×○○×" + "○○××○" + "××××○",
    pages: [...Array(11).fill(2), ...Array(15).fill(3), ...Array(4).fill(4)],
    figures: [7, 10, 22] },
];

describe.each(editions)("c4-56 $exam", ({ exam, rows, season, answers, pages, figures }) => {
  it("公式正答・出典ページ・図と、画面および構造化データの表示を保持する", () => {
    expect(rows).toHaveLength(answers.length);
    expect(new Set(rows.map(q => q.id)).size).toBe(answers.length);
    const evidence = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2025-${season}.sources.json`), "utf8"));
    expect(evidence.review).toHaveLength(rows.length);
    expect(evidence.figureCount).toBe(figures.length);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(key);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(questionSourceEdition(q), q.id).toBe(`2025年度${season === "late" ? "後期" : "前期"}`);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl, q.id).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl, q.id).toBe(evidence.sources[1].url);
      expect(q.officialQuestionLabel).toBe(rows.length === 30 ? String(i + 1) : i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(q.hasImage).toBe(figures.includes(q.qNumber));
      if (q.hasImage) {
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        for (const url of q.imageUrls!) {
          const png = readFileSync(path.join(process.cwd(), "public", url));
          expect(png.subarray(0, 8).toString("hex"), url).toBe("89504e470d0a1a0a");
          expect(png.readUInt32BE(16)).toBeGreaterThan(20);
          expect(png.readUInt32BE(20)).toBeGreaterThan(20);
        }
      }
    }
  });
  it("一覧・演習の両ローダーで全問を配信し、級に応じて原本の記号を使う", async () => {
    expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === 2025)).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.year === 2025)).toEqual(rows);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(rows.length);
    expect(EXAM_CONFIGS[exam].seasons).toEqual([season]);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    const labels = rows.length === 30 ? ["○", "×"] : ["イ", "ロ", "ハ", "ニ"];
    expect((rows.length === 30 ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"]).map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(labels);
  });
});

it("パン製造の生産計算と、確認した表示基準を解説に反映する", () => {
  expect(PAN_SEIZO1_QUESTIONS[45].explanation).toContain("92×5＝460枚");
  expect(PAN_SEIZO1_QUESTIONS[48].explanation).toContain("蜂蜜は4%以上");
  expect(PAN_SEIZO1_QUESTIONS[27].question).toContain("クリスマス用");
  expect(PAN_SEIZO1_QUESTIONS[27].explanation).toContain("復活祭");
});

it("機械組立仕上げ1級の単位換算・誤った電力式・抜き加工図の対応を保持する", () => {
  expect(KIKAI_SHIAGE1_QUESTIONS[15].explanation).toContain("4500÷150＝30N/mm²＝30MPa");
  expect(KIKAI_SHIAGE1_QUESTIONS[43].choices?.ア).toBe("P＝I²/R");
  expect(KIKAI_SHIAGE1_QUESTIONS[43].officialAnswerNumber).toBe("イ");
  expect(KIKAI_SHIAGE1_QUESTIONS[40].choices?.ウ).toBe("①だれ面　②せん断面　③破断面　④バリ");
});

it("3級の図と用語の取り違えを原本どおりに保持する", () => {
  expect(KIKAI_SHIAGE3_QUESTIONS[6].question).toContain("サインバー");
  expect(KIKAI_SHIAGE3_QUESTIONS[9].hasImage).toBe(true);
  expect(KIKAI_SHIAGE3_QUESTIONS[21].explanation).toContain("弦の長さ");
  expect(KIKAI_SHIAGE3_QUESTIONS[26].explanation).toContain("N・m");
  expect(KIKAI_SHIAGE3_QUESTIONS[27].explanation).toContain("バックラッシ");
});
