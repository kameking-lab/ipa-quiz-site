import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { FUJIN_KODOMOFUKU1_QUESTIONS } from "@/data/questions/fujin-kodomofuku1";
import { FUJIN_KODOMOFUKU2_QUESTIONS } from "@/data/questions/fujin-kodomofuku2";

import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Independently read from each rendered official answer sheet, five per row.
const SITTINGS = [{
  exam: "fujin-kodomofuku1", year: 2024, all: FUJIN_KODOMOFUKU1_QUESTIONS,
  answers: "×○○○×" + "×○×○○" + "××○○○" + "×○×○○" + "○××○×"
    + "ニハロイイ" + "イロイロイ" + "ハロハニイ" + "イロニロイ" + "ロロロニハ",
}, {
  exam: "fujin-kodomofuku1", year: 2025, all: FUJIN_KODOMOFUKU1_QUESTIONS,
  answers: "○○×○○" + "××○×○" + "○○○○×" + "○○○×○" + "×××○×"
    + "ロイニハハ" + "イハイニハ" + "イロニイハ" + "ハロイハハ" + "ハハイロニ",
}, {
  exam: "fujin-kodomofuku2", year: 2023, all: FUJIN_KODOMOFUKU2_QUESTIONS,
  answers: "○○×○○" + "××○×○" + "○×○○○" + "○×○○○" + "×○○○×"
    + "ニイハロロ" + "ニロハニロ" + "イハハイロ" + "ハハロロイ" + "ロロニハニ",
}] as const;

describe("婦人子供服製造の補充原本と学習経路", () => {
  for (const { exam, year, all, answers } of SITTINGS) {
    const questions: Question[] = all.filter(q => q.year === year);
    it(`${exam}/${year}: 公式50正答を原本表記で表示して採点する`, () => {
      expect(questions).toHaveLength(50);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
      expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
      for (const q of questions) {
        const official = answers[q.qNumber - 1];
        const answer = official === "○" ? "ア" : official === "×" ? "イ" : "アイウエ"["イロハニ".indexOf(official)];
        expect(q.answer, q.id).toBe(answer);
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(questionSourceEdition(q), q.id).toBe(`${year}年度前期`);
      }
      expect(usesNumberedChoices(exam)).toBe(true);
    });
    it(`${exam}/${year}: 同期・遅延読込と全問の個別URLが一致する`, async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
      expect(await getQuestionsForExam(exam)).toEqual(all);
      expect(getQualificationByExamCode(exam)?.status).toBe("live");
      expect(new Set(all.map(q => q.id)).size).toBe(all.length);
      expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
      for (const q of questions) {
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      }
    });
    it(`${exam}/${year}: 原図を読み込め、図問題に画像と代替文がある`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
      expect(source.questions).toHaveLength(50);
      for (const q of questions.filter(q => q.hasImage)) {
        expect(q.hasImage, q.id).toBe(true);
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
        const bytes = readFileSync(path.join(process.cwd(), "public", q.imageUrls![0]));
        expect(bytes.subarray(8, 12).toString(), q.id).toBe("WEBP");
      }
    });
  }
  it("合糸は原本110デニールと70デニールを加算する", () => {
    const q = FUJIN_KODOMOFUKU2_QUESTIONS.find(q => q.year === 2023 && q.qNumber === 31)!;
    expect(q.question).toContain("110デニール1本と70デニール1本");
    expect(q.officialAnswerNumber).toBe("ニ");
    expect(q.explanation).toContain("110＋70＝180");
  });
});
