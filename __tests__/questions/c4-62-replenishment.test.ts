import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { SHOHIN_SOSHOKU1_QUESTIONS } from "@/data/questions/shohin-soshoku1";
import { TATEGU1_QUESTIONS } from "@/data/questions/tategu1";
import { HISESHOKU_JOKYO1_QUESTIONS } from "@/data/questions/hiseshoku-jokyo1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表の画像を5問ずつ読み取り固定した照合用の正答。
const editions = [
  { exam: "hiseshoku-jokyo1" as const, rows: HISESHOKU_JOKYO1_QUESTIONS, season: "early" as const, answers: "○○×○○○××○○×○××××○×××○×○○○ニニイニニイロハイハロニイイロニイロイハロロイハイ", pages: [2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,5,5,5,6,6,6,6,6,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10], figures: [8,23,28,33,34,36,48] as number[] },
  { exam: "tategu1" as const, rows: TATEGU1_QUESTIONS, season: "early" as const, answers: "×××○×○○××○○××○○○○○×××××○×ロイイハイロハニロイロハニニニイニハロハロイイニハ", pages: [2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,8,8,8], figures: [7,8,21,22,26,32,44,45] as number[] },
  { exam: "shohin-soshoku1" as const, rows: SHOHIN_SOSHOKU1_QUESTIONS, season: "early" as const, answers: "○××○×○○×××××○○○○○××○○○×××ロニイハロニニロロハロハハロハニニロハハロロハイハ", pages: [2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,7,7,7,7,8,8,8,9,9,9,9,10,10,10,10,10,11,11,11,11], figures: [8,9,13,14,18,19,36,40] as number[] }
];

describe.each(editions)("c4-62 $exam", ({ exam, rows, season, answers, pages, figures }) => {
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
      expect(questionSourceEdition(q), q.id).toBe(`2025年度${String(season) === "late" ? "後期" : "前期"}`);
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
    expect(QUESTIONS_BY_EXAM[exam]!.filter(q => q.season === season)).toEqual(rows);
    expect((await getQuestionsForExam(exam)).filter(q => q.season === season)).toEqual(rows);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(rows.length);
    expect(EXAM_CONFIGS[exam].seasons).toContain(season);
    expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    const labels = rows.length === 30 ? ["○", "×"] : ["イ", "ロ", "ハ", "ニ"];
    expect((rows.length === 30 ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"]).map(k => choiceDisplayLabel(exam, k as ChoiceKey))).toEqual(labels);
  });
});

it("短い原文と公式正答をそのまま保持する", () => {
  expect(TATEGU1_QUESTIONS[36].question).toBe("広葉樹はどれか。");
  expect(TATEGU1_QUESTIONS[47].choices?.エ).toBe("打当ては、組み立てる建具材よりも硬い材料がよい。");
  expect(TATEGU1_QUESTIONS[47].officialAnswerNumber).toBe("イ");
});
