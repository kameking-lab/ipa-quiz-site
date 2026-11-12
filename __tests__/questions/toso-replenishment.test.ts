import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { TOSO2_QUESTIONS } from "@/data/questions/toso2";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Independently read from each rendered official answer sheet, five per row.
const SITTINGS = [{
  exam: "toso2", year: 2024, all: TOSO2_QUESTIONS,
  answers: "○○××○" + "○××××" + "××○○×" + "○○○×○" + "×××○○"
    + "イニニニイ" + "ロハイロロ" + "ニイニハハ" + "ハニロロニ" + "イハロハイ",
}] as const;

describe("建築塗装の補充原本と学習経路", () => {
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
      for (const q of questions.filter(q => /次図|図中/.test(q.question))) {
        expect(q.hasImage, q.id).toBe(true);
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts?.[0], q.id).toBeTruthy();
        const bytes = readFileSync(path.join(process.cwd(), "public", q.imageUrls![0]));
        expect(bytes.subarray(8, 12).toString(), q.id).toBe("WEBP");
      }
    });
  }
  it("2024年B群22・23は肯定形の設問として公式正答を保持する", () => {
    for (const n of [47, 48]) {
      const q = TOSO2_QUESTIONS.find(q => q.year === 2024 && q.qNumber === n)!;
      expect(q.question).toContain("適切なもの");
      expect(q.question).not.toContain("適切でない");
    }
  });
});
