import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import type { ExamCode } from "@/lib/questions/types";

const sets: { code: ExamCode; year: number; season: string; count: number; figures: number }[] = [
  { code: "kikai-hozen-denki3", year: 2026, season: "round1", count: 30, figures: 5 },
];

describe.each(sets)("c4-09 $code", ({ code, year, season, count, figures }) => {
  const questions = QUESTIONS_BY_EXAM[code]!;
  const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${code}/sources-${year}-${season}.json`), "utf8"));

  it("loads the complete sitting through both application entry points", async () => {
    expect(questions).toHaveLength(count);
    expect(await getQuestionsForExam(code)).toEqual(questions);
    expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(count);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(count);
  });

  it("preserves every official answer and supplies explanations for all options", () => {
    for (const [i, q] of questions.entries()) {
      expect(q.officialAnswerNumber, q.id).toBe(source.officialAnswers[i]);
      expect(source.choiceMapping[q.answer], q.id).toBe(q.officialAnswerNumber);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices));
      expect(q.explanation).toContain(`公式正答は${q.officialAnswerNumber}です。`);
      for (const [key, explanation] of Object.entries(q.choiceExplanations!)) {
        expect(explanation!.length, `${q.id} ${key}`).toBeGreaterThan(30);
        expect(explanation!.startsWith(key === q.answer ? "正解。" : "不正解。")).toBe(true);
      }
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kikaihozenshi\.jp\/pdf\//);
    }
  });

  it("keeps every required original figure available with matching checksums", () => {
    expect(source.figures).toHaveLength(figures);
    expect(questions.filter(q => q.hasImage)).toHaveLength(figures);
    for (const figure of source.figures) {
      const file = path.join(process.cwd(), "public", figure.url);
      expect(existsSync(file), figure.url).toBe(true);
      expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(figure.sha256);
      expect(questions.some(q => q.imageUrls?.includes(figure.url))).toBe(true);
    }
    for (const q of questions.filter(q => /下図|次の図/.test(q.question))) expect(q.hasImage, q.id).toBe(true);
  });
});
