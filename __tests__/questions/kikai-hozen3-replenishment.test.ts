import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KIKAI_HOZEN3_QUESTIONS } from "@/data/questions/kikai-hozen3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Independently read from the rendered official answer sheet, in printed order.
const ANSWERS = { round1: "××○××○○×○×○×○××○××○○×○○×××○○○○" };

describe("機械保全3級の原問・正答・配信経路", () => {
  for (const [season, answers] of Object.entries(ANSWERS)) {
    const questions = KIKAI_HOZEN3_QUESTIONS.filter((q) => q.season === season);
    it(`機械系2025年度${season}: 全30問を公式正答で採点できる`, () => {
      expect(questions).toHaveLength(30);
      expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
      expect(questions.map((q) => q.officialAnswerNumber).join("")).toBe(answers);
      for (const q of questions) {
        expect(q.answer, q.id).toBe(answers[q.qNumber - 1] === "○" ? "ア" : "イ");
        expect(formatQuestionAnswerForDisplay(q, q.answer as ChoiceKey), q.id).toBe(q.officialAnswerNumber);
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(["ア", "イ"]);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      }
    });
  }

  it("同期・遅延ローダーから同じ問題を取得し、全問のURLを一意に解決する", async () => {
    expect(QUESTIONS_BY_EXAM["kikai-hozen3"]).toEqual(KIKAI_HOZEN3_QUESTIONS);
    expect(await getQuestionsForExam("kikai-hozen3")).toEqual(KIKAI_HOZEN3_QUESTIONS);
    const all: Question[] = [...KIKAI_HOZEN3_QUESTIONS];
    expect(new Set(all.map((q) => q.id)).size).toBe(all.length);
    expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
    for (const q of all) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(all, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("原図を出典台帳のハッシュと照合し、図参照のある問題には画像がある", () => {
    const source = JSON.parse(readFileSync(path.join(process.cwd(), "data/questions/kikai-hozen3/2025-round1.sources.json"), "utf8")) as {
      figures: { path: string; sha256: string }[];
    };
    expect(source.figures).toHaveLength(3);
    for (const image of source.figures) {
      expect(createHash("sha256").update(readFileSync(path.join(process.cwd(), image.path))).digest("hex")).toBe(image.sha256);
    }
    for (const q of KIKAI_HOZEN3_QUESTIONS.filter((row) => /下図/.test(row.question))) {
      expect(q.hasImage, q.id).toBe(true);
      expect(q.imageUrls?.length, q.id).toBe(1);
      expect(q.imageAltTexts?.length, q.id).toBe(1);
    }
  });
});
