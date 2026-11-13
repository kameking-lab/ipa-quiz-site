import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import type { ExamCode } from "@/lib/questions/types";

const sets: { code: ExamCode; year: number; season: string; count: number; figures: number }[] = [
  { code: "kikai-hozen-denki3", year: 2026, season: "round1", count: 30, figures: 5 },
  { code: "kikai-hozen-denki1", year: 2025, season: "round2", count: 50, figures: 9 },
  { code: "kikai-hozen-setsubi1", year: 2025, season: "round2", count: 50, figures: 6 },
];

describe.each(sets)("c4-09 $code", ({ code, year, season, count, figures }) => {
  const allQuestions = QUESTIONS_BY_EXAM[code]!;
  const questions = allQuestions.filter(q => q.year === year && q.season === season);
  const source = JSON.parse(readFileSync(path.join(process.cwd(), `data/questions/${code}/sources-${year}-${season}.json`), "utf8"));

  it("loads the complete sitting through both application entry points", async () => {
    expect(questions).toHaveLength(count);
    expect(await getQuestionsForExam(code)).toEqual(allQuestions);
    expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(count);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(count);
    for (const q of questions) expect(isPracticeReadyQuestion(q), q.id).toBe(true);
  });

  it("preserves every official answer and supplies explanations for all options", () => {
    for (const [i, q] of questions.entries()) {
      if (typeof q.answer !== "string") throw new Error(`Expected a single official answer: ${q.id}`);
      expect(q.officialAnswerNumber, q.id).toBe(source.officialAnswers[i]);
      const mapping = source.choiceMapping.trueFalse
        ? (q.qNumber <= 25 ? source.choiceMapping.trueFalse : source.choiceMapping.multipleChoice)
        : source.choiceMapping;
      expect(mapping[q.answer], q.id).toBe(q.officialAnswerNumber);
      expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(String(q.officialAnswerNumber).replace("〇", "○"));
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(q.explanation).toContain(`公式正答は${q.officialAnswerNumber}です。`);
      for (const [key, explanation] of Object.entries(q.choiceExplanations!)) {
        expect(explanation!.length, `${q.id} ${key}`).toBeGreaterThan(30);
        expect(explanation!.startsWith(key === q.answer ? "正解。" : "不正解。")).toBe(true);
      }
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.kikaihozenshi\.jp\/pdf\//);
      const content = [q.question, q.explanation, ...Object.values(q.choices!), ...Object.values(q.choiceExplanations!)];
      for (const text of content) expect(text, q.id).not.toContain("?");
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

it("reuses the 25 common originals after verifying both official sittings", () => {
  const electrical = QUESTIONS_BY_EXAM["kikai-hozen-denki1"]!.slice(0, 25);
  const diagnostic = QUESTIONS_BY_EXAM["kikai-hozen-setsubi1"]!.slice(0, 25);
  for (const [i, q] of diagnostic.entries()) {
    const original = electrical[i];
    expect(q.id).not.toBe(original.id);
    expect(q.question).toBe(original.question);
    expect(q.choices).toBe(original.choices);
    expect(q.choiceExplanations).toBe(original.choiceExplanations);
    expect(q.imageUrls).toBe(original.imageUrls);
    expect(q.officialAnswerNumber).toBe(original.officialAnswerNumber);
    expect(q.sourcePdfUrl).toContain("2025_1kyu_setubi_mondai.pdf");
  }
});

it("keeps fraction, square-root and squared terms from the original formula options", () => {
  const diagnostic = QUESTIONS_BY_EXAM["kikai-hozen-setsubi1"]!;
  expect(diagnostic[42].choices?.ウ).toBe("①：(1/(2π))√(k/m) ②：90° ③：180°");
  expect(diagnostic[45].choices?.イ).toBe("(D・fᵣ/(2d))(1－(d²/D²)cos²α)");
  expect(diagnostic[41].answer).toBe("ウ");
  // v_rms = 2πfA/√2; the original supplies peak-to-peak displacement.
  expect(Math.sqrt(2) * 5.88 / (2 * Math.PI * 0.106e-3 / 2) / 1_000).toBeCloseTo(25, 0);
});
