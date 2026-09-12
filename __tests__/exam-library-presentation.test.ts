import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { boilerAnswerPage, parseExamPaper } from "@/lib/exam-library-model";
import { parseExamPresentation } from "@/lib/exam-library-presentation";

const base = join(process.cwd(), "data", "exam-library");
const papers = readdirSync(join(base, "papers")).filter((name) => name.endsWith(".json"));
const read = (path: string): unknown => JSON.parse(readFileSync(path, "utf8"));

describe("safety text presentation", () => {
  it("has a complete source-matched transcription for every question and all five choices", () => {
    let count = 0;
    let choiceCount = 0;
    for (const name of papers) {
      const questions = parseExamPaper(read(join(base, "papers", name)), name.slice(0, -5));
      const overlay = read(join(base, "presentation", name));
      for (const question of questions) {
        const hash = createHash("sha256").update(question.text).digest("hex");
        const presentation = parseExamPresentation(overlay, question, hash);
        expect(presentation, question.id).not.toBeNull();
        expect(parseExamPresentation(overlay, question, "stale-source"), question.id).toBeNull();
        for (const figure of presentation!.figures) {
          expect(existsSync(join(process.cwd(), "public", figure.src)), figure.src).toBe(true);
          expect(question.images).not.toContain(figure.src);
        }
        count += 1;
        if (question.choiceCount === 5) choiceCount += 1;
      }
    }
    expect(count).toBe(1972);
    expect(choiceCount).toBe(1884);
  });

  it("preserves the deliberate wrong axis and wrong chemical structure in the official question", () => {
    const vibration = read(join(base, "presentation", "emkohyo-EM20261801.json")) as Record<string, { choices: { text: string }[] }>;
    expect(vibration["emkohyo-EM20261801-q12"]!.choices[1]!.text).toContain("aₓ²＋aₓ²＋a_z²");
    const chemistry = read(join(base, "presentation", "emkohyo-EM20251807.json")) as Record<string, { choices: { text: string }[] }>;
    expect(chemistry["emkohyo-EM20251807-q15"]!.choices[3]!.text).toContain("−O−C≡N");
  });
  it("restores boiler single-choice questions using the answers printed in each official PDF", () => {
    const keys = {
      "lckohyo-LC20260401-2": [5, 3, 5, 3, 3, 4, 3, 2],
      "lckohyo-LC20251101": [1, 1, 4, 2, 5, 3, 1, 4],
    };
    for (const [id, expected] of Object.entries(keys)) {
      const questions = parseExamPaper(read(join(base, "papers", `${id}.json`)), id);
      const singles = questions.filter((question) => question.choiceCount > 0);
      expect(singles.map((question) => question.number)).toEqual([4, 5, 10, 11, 16, 17, 22, 23]);
      expect(singles.map((question) => question.correctChoice)).toEqual(expected);
      expect(singles.every((question) => question.answerAuthority === "official")).toBe(true);
      expect(questions.filter((question) => question.answerAuthority === "descriptive")).toHaveLength(16);
      for (const question of questions) expect(boilerAnswerPage(id, question.number)).toBeGreaterThan(29);
      const overlay = read(join(base, "presentation", `${id}.json`)) as Record<string, { prompt: string }>;
      for (const number of [3, 9, 15]) {
        expect(overlay[`${id}-q${number}`]!.prompt).toMatch(/［　］.*答えよ。/);
      }
    }
  });

  it("ships every model-answer diagram with dimensions and readable alternative text", () => {
    const figures = read(join(base, "answer-figures.json")) as Record<string, { src: string; alt: string; width: number; height: number }[]>;
    for (const [questionId, items] of Object.entries(figures)) {
      expect(items.length, questionId).toBeGreaterThan(0);
      for (const figure of items) {
        expect(figure.src).toMatch(/^\/exam-library\/[A-Za-z0-9-]+\/answer-[A-Za-z0-9-]+\.(?:svg|webp)$/);
        expect(existsSync(join(process.cwd(), "public", figure.src))).toBe(true);
        expect(figure.alt.length).toBeGreaterThan(5);
        expect(figure.width).toBeGreaterThan(0);
        expect(figure.height).toBeGreaterThan(0);
      }
    }
  });

});
