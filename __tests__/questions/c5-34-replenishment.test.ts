import { describe, expect, it } from "vitest";
import { CHUZO1_QUESTIONS } from "@/data/questions/chuzo1";
import { CHUZO2_QUESTIONS } from "@/data/questions/chuzo2";
import { CHUZO3_QUESTIONS } from "@/data/questions/chuzo3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表を5問（3級は10問）ずつ読んで固定。3級13は訂正後の○。
const editions = [
  { exam: "chuzo1" as const, all: CHUZO1_QUESTIONS, answers: "××○○○○○×○○×××○○○×××○○×○×○イロイニハニイロハハロイハハロニニイハロハイロイニ", count: 50, total: 100 },
  { exam: "chuzo2" as const, all: CHUZO2_QUESTIONS, answers: "○○×○○○○○×○××○○○○×○×○○○○○×ハロニロニロニニロロニハハイイハイニハロイイハハニ", count: 50, total: 50 },
  { exam: "chuzo3" as const, all: CHUZO3_QUESTIONS, answers: "×○○○○××○○○○×○○○○×○○○○○×○×○×○○○", count: 30, total: 60 },
];

describe.each(editions)("c5-34 $exam 2024前期", ({ exam, all, answers, count, total }) => {
  const rows = all.filter(q => q.year === 2024 && q.season === "early");
  it("全公式正答を保持し、各問のURL・原本記号・構造化データを正しく配信する", () => {
    expect(rows).toHaveLength(count);
    expect(new Set(rows.map(q => q.id)).size).toBe(count);
    for (const [i, q] of rows.entries()) {
      const official = answers[i];
      const key = (official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)]) as ChoiceKey;
      expect(q.answer, q.id).toBe(key);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(formatQuestionAnswerForDisplay(q, key), q.id).toBe(official);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialQuestionLabel).toBe(count === 30 ? String(i + 1) : i < 25 ? `A群 ${i + 1}` : `B群 ${i - 24}`);
      expect(questionSourceEdition(q)).toBe("2024年度前期");
      expect(isPracticeReadyQuestion(q)).toBe(true);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/R06-1-.+\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/R06-1-.+\.pdf$/);
      const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      const graph = JSON.stringify(buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: q.id }));
      expect(graph).toContain(`${official}: ${q.choices![key]}`);
      expect(graph).toContain("中央職業能力開発協会");
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(q.hasImage).toBe(false);
    }
  });
  it("既存年度を含め一覧・演習で全問を読み、級ごとの表示と年度範囲が一致する", async () => {
    expect(all).toHaveLength(total);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
    expect(await getQuestionsForExam(exam)).toEqual(all);
    expect(EXAM_CONFIGS[exam].yearRange.start).toBe(2024);
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(count);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    const keys = (count === 30 ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"]) as ChoiceKey[];
    expect(keys.map(k => choiceDisplayLabel(exam, k))).toEqual(count === 30 ? ["○", "×"] : ["イ", "ロ", "ハ", "ニ"]);
  });
});

it("原本で拡大確認した語句と3級13の公式訂正を残す", () => {
  const one = CHUZO1_QUESTIONS.filter(q => q.year === 2024);
  expect(one[30].choices?.エ).toBe("w … 下型の重量");
  expect(one[33].choices?.イ).toContain("型被せ");
  expect(one[33].choices?.エ).toContain("塗型が必要");
  expect(one[39].question).toContain("鋳鉄の微小部分");
  expect(one[41].choices?.エ).toContain("生型には発生しにくい");
  expect(CHUZO2_QUESTIONS[11].question).toContain("抵抗を直列に接続");
  expect(CHUZO2_QUESTIONS[11].explanation).toContain("1Ω+2Ω=3Ω");
  expect(CHUZO2_QUESTIONS[36].choices?.イ).toContain("鋳型の素材");
  const q13 = CHUZO3_QUESTIONS.find(q => q.year === 2024 && q.qNumber === 13)!;
  expect(q13.answer).toBe("ア");
  expect(q13.explanation).toContain("公式正答表では問13を○に訂正");
});
