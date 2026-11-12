import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS as DENKI } from "@/data/questions/kikai-hozen-denki1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey } from "@/lib/questions/types";

// Read independently from the rendered official answer sheets, ten per row.
const SITTINGS = [{
  exam: "kikai-hozen-denki1", season: "round2", all: DENKI, figures: 7,
  answers: "○○○××××○○×" + "×○×○○×××××" + "×○○×○ウアウウエ" + "エウイイウアエアウイ" + "アウイウアイアイエエ",
}] as const;

describe("機械保全2023年度の公式原本照合と配信", () => {
  for (const { exam, season, all, figures, answers } of SITTINGS) {
    const questions = all.filter(q => q.year === 2023 && q.season === season);
    it(`${exam}: 全問の正答・採点・解説を確認する`, () => {
      expect(questions).toHaveLength(answers.length);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
      expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
      for (const q of questions) {
        const official = answers[q.qNumber - 1]!;
        expect(q.answer, q.id).toBe(official === "○" ? "ア" : official === "×" ? "イ" : official);
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(official);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(Object.keys(q.choices!));
        expect(q.question, q.id).not.toMatch(/\?\?\?\?|学科試験問題/);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      }
    });
    it(`${exam}: 本文・選択肢・原図を照合台帳と照合する`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2023-${season}.sources.json`), "utf8")) as {
        figures: { path: string; sha256: string }[];
        questions: { id: string; bodySha256: string; choicesSha256: string }[];
      };
      expect(source.questions).toHaveLength(questions.length);
      expect(source.figures).toHaveLength(figures);
      for (const q of questions) {
        const row = source.questions.find(row => row.id === q.id)!;
        expect(createHash("sha256").update(q.question).digest("hex"), q.id).toBe(row.bodySha256);
        const choices = JSON.stringify(q.choices, Object.keys(q.choices!).sort()).replace(/:/g, ": ").replace(/,/g, ", ");
        expect(createHash("sha256").update(choices).digest("hex"), q.id).toBe(row.choicesSha256);
      }
      for (const figure of source.figures) {
        expect(createHash("sha256").update(readFileSync(path.join(process.cwd(), figure.path))).digest("hex")).toBe(figure.sha256);
      }
      for (const q of questions.filter(q => /下図/.test(q.question))) {
        expect(q.hasImage, q.id).toBe(true);
        expect(q.imageUrls, q.id).toHaveLength(1);
        expect(q.imageAltTexts, q.id).toHaveLength(1);
      }
    });
    it(`${exam}: 同期・遅延ローダーと全問の個別URLが一致する`, async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(all);
      expect(await getQuestionsForExam(exam)).toEqual(all);
      expect(new Set(all.map(q => q.id)).size).toBe(all.length);
      expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
      for (const q of questions) {
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      }
    });
  }
});
