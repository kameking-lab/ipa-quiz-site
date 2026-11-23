import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS as SETSUBI } from "@/data/questions/kikai-hozen-setsubi1";
import { KIKAI_HOZEN3_QUESTIONS as KIKAI } from "@/data/questions/kikai-hozen3";
import { KIKAI_HOZEN_DENKI3_QUESTIONS as DENKI } from "@/data/questions/kikai-hozen-denki3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Transcribed independently from the rendered official answer table, ten per row.
const SITTINGS = [{
  exam: "kikai-hozen-setsubi1", season: "round2", all: SETSUBI, figures: 3,
  answers: "○○○××○×○○○" + "○○○××○×○×○" + "○×○××アウウウエ" + "ウイアウエイアウアウ" + "アアアウエウイウアイ",
}, {
  exam: "kikai-hozen3", season: "round1", all: KIKAI, figures: 4,
  answers: "○××○○○×○××" + "××○○○○×○×○" + "×○○○××××○○",
}, {
  exam: "kikai-hozen-denki3", season: "round1", all: DENKI, figures: 6,
  answers: "○××○○○×○××" + "××○○○×○○××" + "×○×○○○○○○×",
}] as const;

describe("機械保全2024年度の原本照合と配信", () => {
  for (const { exam, season, all, figures, answers } of SITTINGS) {
    const questions = all.filter(q => q.year === 2024 && q.season === season);
    it(`${exam}: 公式正答・全肢解説・問題番号がそろう`, () => {
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
    it(`${exam}: 本文と切り出した原図が照合台帳と一致する`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2024-${season}.sources.json`), "utf8")) as {
        figures: { path: string; sha256: string }[];
        questions: { id: string; bodySha256: string }[];
      };
      expect(source.questions).toHaveLength(questions.length);
      expect(source.figures).toHaveLength(figures);
      for (const q of questions) {
        expect(createHash("sha256").update(q.question).digest("hex"), q.id).toBe(source.questions.find(row => row.id === q.id)?.bodySha256);
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
      for (const q of all as Question[]) {
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      }
    });
  }
  it("3級の共通15問は本文・解説・4図を再利用する", () => {
    const mechanical = KIKAI.filter(q => q.year === 2024 && q.season === "round1" && q.qNumber <= 15);
    const electrical = DENKI.filter(q => q.year === 2024 && q.season === "round1" && q.qNumber <= 15);
    expect(mechanical).toHaveLength(15);
    expect(electrical).toHaveLength(15);
    for (let i = 0; i < 15; i++) {
      expect(electrical[i]!.question).toBe(mechanical[i]!.question);
      expect(electrical[i]!.officialAnswerNumber).toBe(mechanical[i]!.officialAnswerNumber);
      expect(electrical[i]!.choiceExplanations).toEqual(mechanical[i]!.choiceExplanations);
      expect(electrical[i]!.imageUrls).toEqual(mechanical[i]!.imageUrls);
    }
  });
});
