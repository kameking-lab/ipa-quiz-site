import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KIKAI_HOZEN3_QUESTIONS } from "@/data/questions/kikai-hozen3";
import { KIKAI_HOZEN_DENKI3_QUESTIONS } from "@/data/questions/kikai-hozen-denki3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Independently read from the rendered official answer sheet, in printed order.
const SITTINGS = [
  { exam: "kikai-hozen3", season: "round1", questions: KIKAI_HOZEN3_QUESTIONS, answers: "××○××○○×○×○×○××○××○○×○○×××○○○○", figures: 3 },
  { exam: "kikai-hozen-denki3", season: "round1", questions: KIKAI_HOZEN_DENKI3_QUESTIONS, answers: "××○××○○×○×○×○××○×○○×○×○×××○×○○", figures: 6 },
] as const;

describe("機械保全3級の原問・正答・配信経路", () => {
  for (const { exam, season, answers, questions: all, figures } of SITTINGS) {
    const questions = all.filter((q) => q.season === season);
    it(`${exam}2025年度${season}: 全30問を公式正答で採点できる`, () => {
      expect(questions).toHaveLength(30);
      expect(usesNumberedChoices(exam)).toBe(true);
      expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
      expect(questions.map((q) => q.officialAnswerNumber).join("")).toBe(answers);
      for (const q of questions) {
        expect(q.answer, q.id).toBe(answers[q.qNumber - 1] === "○" ? "ア" : "イ");
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(q.officialAnswerNumber);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(["ア", "イ"]);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      }
    });
    it(`${exam}2025年度${season}: 原図と出典台帳のハッシュが一致する`, () => {
      const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${exam}/2025-${season}.sources.json`), "utf8")) as {
        figures: { path: string; sha256: string }[];
      };
      expect(source.figures).toHaveLength(figures);
      for (const image of source.figures) {
        expect(createHash("sha256").update(readFileSync(path.join(process.cwd(), image.path))).digest("hex")).toBe(image.sha256);
      }
      for (const q of questions.filter((row) => /下図/.test(row.question))) {
        expect(q.hasImage, q.id).toBe(true);
        expect(q.imageUrls?.length, q.id).toBe(1);
        expect(q.imageAltTexts?.length, q.id).toBe(1);
      }
    });
  }

  it("同期・遅延ローダーから同じ問題を取得し、全問のURLを一意に解決する", async () => {
    expect(QUESTIONS_BY_EXAM["kikai-hozen3"]).toEqual(KIKAI_HOZEN3_QUESTIONS);
    expect(await getQuestionsForExam("kikai-hozen3")).toEqual(KIKAI_HOZEN3_QUESTIONS);
    expect(QUESTIONS_BY_EXAM["kikai-hozen-denki3"]).toEqual(KIKAI_HOZEN_DENKI3_QUESTIONS);
    expect(await getQuestionsForExam("kikai-hozen-denki3")).toEqual(KIKAI_HOZEN_DENKI3_QUESTIONS);
    const all: Question[] = [...KIKAI_HOZEN3_QUESTIONS, ...KIKAI_HOZEN_DENKI3_QUESTIONS];
    expect(new Set(all.map((q) => q.id)).size).toBe(all.length);
    expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
    for (const q of all) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(all, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("第1回の共通15問は検品済み原稿を再利用する", () => {
    for (let i = 0; i < 15; i++) {
      const mechanical = KIKAI_HOZEN3_QUESTIONS[i]!;
      const electrical = KIKAI_HOZEN_DENKI3_QUESTIONS[i]!;
      expect(electrical.question).toBe(mechanical.question);
      expect(electrical.officialAnswerNumber).toBe(mechanical.officialAnswerNumber);
      expect(electrical.choiceExplanations).toEqual(mechanical.choiceExplanations);
    }
  });
});
