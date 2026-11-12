import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import type { ExamCode } from "@/lib/questions/types";

// Independently transcribed from the rendered official answer sheet.
const sets: { code: ExamCode; year: number; answers: string }[] = [
  { code: "kikai-hozen3", year: 2024, answers: "×○×××○×○×○○××○○○○××××○×○○○○×××" },
];

describe.each(sets)("c4-13 $code $year round2", ({ code, year, answers }) => {
  const manifest = JSON.parse(readFileSync(`data/questions/${code}/sources-${year}-round2.json`, "utf8"));
  const questions = QUESTIONS_BY_EXAM[code]!.filter(q => q.year === year && q.season === "round2");

  it("serves the complete sitting through both loaders and makes every question usable", async () => {
    expect(questions).toHaveLength(answers.length);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: answers.length }, (_, i) => i + 1));
    expect(new Set(questions.map(q => q.id)).size).toBe(answers.length);
    expect((await getQuestionsForExam(code)).filter(q => q.year === year && q.season === "round2")).toEqual(questions);
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(year);
    expect(EXAM_CONFIGS[code].seasons).toContain("round2");
    for (const q of questions) expect(isPracticeReadyQuestion(q), q.id).toBe(true);
  });

  it("preserves every official answer and provides explanations for every option", () => {
    expect(questions.map(q => q.officialAnswerNumber).join("")).toBe(answers);
    expect(manifest.officialAnswers.join("")).toBe(answers);
    for (const q of questions) {
      const official = answers[q.qNumber - 1];
      expect(q.answer, q.id).toBe(official === "○" ? "ア" : official === "×" ? "イ" : official);
      expect(Object.keys(q.choiceExplanations!), q.id).toEqual(Object.keys(q.choices!));
      for (const [key, explanation] of Object.entries(q.choiceExplanations!)) {
        expect(explanation!.startsWith(key === q.answer ? "正解。" : "不正解。"), q.id).toBe(true);
        expect(explanation!.length, q.id).toBeGreaterThan(30);
      }
      if (/下図|次の図/.test(q.question)) expect(q.hasImage, q.id).toBe(true);
    }
  });

  it("retains the verified original figure bytes and their source coordinates", () => {
    expect(questions.filter(q => q.hasImage)).toHaveLength(manifest.figures.length);
    for (const figure of manifest.figures) {
      const bytes = readFileSync(path.join("public", figure.url));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
      expect(figure.cropPdfPoints).toHaveLength(4);
      expect(questions.some(q => q.imageUrls?.includes(figure.url))).toBe(true);
    }
  });
});

it("distinguishes the lathe, histogram, series circuit and leader line from other sittings", () => {
  const questions = QUESTIONS_BY_EXAM["kikai-hozen3"]!;
  expect(questions[0].explanation).toContain("旋盤");
  expect(questions[2].explanation).toContain("15V");
  expect(questions[8].explanation).toContain("ヒストグラム");
  expect(questions[29].explanation).toContain("引出線");
  expect(questions[18].answer).toBe("イ");
  expect(questions[18].explanation).toContain("電食");
  expect(choiceDisplayLabel("kikai-hozen3", "ア")).toBe("○");
  expect(formatQuestionAnswerForDisplay(questions[0], questions[0].answer)).toBe("×");
});
