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
  { code: "kikai-hozen-denki3", year: 2024, answers: "×○×××○×○×○○××○○×○×○○××○×○○×○○×" },
  { code: "kikai-hozen1", year: 2023, answers: "○○○××××○○××○×○○××××××○○×○アエエイエイウイアエウウエアアアイイイエイエアウエ" },
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

it("shares the verified common 15 questions without losing the electrical source", () => {
  const mechanical = QUESTIONS_BY_EXAM["kikai-hozen3"]!.filter(q => q.year === 2024 && q.qNumber <= 15);
  const electrical = QUESTIONS_BY_EXAM["kikai-hozen-denki3"]!.filter(q => q.year === 2024 && q.qNumber <= 15);
  expect(electrical).toHaveLength(15);
  for (const [index, q] of electrical.entries()) {
    expect(q.question).toBe(mechanical[index].question);
    expect(q.choices).toBe(mechanical[index].choices);
    expect(q.choiceExplanations).toBe(mechanical[index].choiceExplanations);
    expect(q.imageUrls).toBe(mechanical[index].imageUrls);
    expect(q.officialAnswerNumber).toBe(mechanical[index].officialAnswerNumber);
    expect(q.sourcePdfUrl).toContain("2024_3kyu_denki_mondai_2.pdf");
  }
  const questions = QUESTIONS_BY_EXAM["kikai-hozen-denki3"]!.filter(q => q.year === 2024);
  expect(questions[21].explanation).toContain("100W");
  expect(questions[26].answer).toBe("イ");
  expect(questions[26].explanation).toContain("平らな面同士");
  expect(questions[29].answer).toBe("イ");
  expect(questions[29].explanation).toContain("WL→YL→GL");
});

it("keeps the 2023 calculations, drawing labels and official wording intact", () => {
  const questions = QUESTIONS_BY_EXAM["kikai-hozen1"]!.filter(q => q.year === 2023);
  expect(questions[2].explanation).toContain("2A");
  expect(questions[15].explanation).toContain("2g");
  expect(questions[27].choices?.エ).toBe("16と48");
  expect(5 * (16 + 48) / 2).toBe(160);
  expect(48 / 16).toBe(3);
  expect(questions[45].explanation).toContain("20.46kN");
  expect(3600 * 9.8 * 1.16 / 2 / 1000).toBeCloseTo(20.4624);
  expect(questions[46].explanation).toContain("5mm");
  expect(questions[47].choices?.イ).toContain("線①");
  expect(questions[47].choices?.イ).toContain("線②");
  expect(questions[49].choices).toEqual({ ア: "原図のア", イ: "原図のイ", ウ: "原図のウ", エ: "原図のエ" });
  expect(questions[49].answer).toBe("エ");
  // Preserve potentially ambiguous original wording and the published answer.
  expect(questions[32].question).toContain("高速回転");
  expect(questions[32].question).toContain("反復式");
  expect(questions[32].answer).toBe("イ");
  expect(questions[36].choices?.イ).toContain("高温で溶ける");
  expect(questions[36].answer).toBe("ウ");
  expect(formatQuestionAnswerForDisplay(questions[0], questions[0].answer)).toBe("○");
  expect(formatQuestionAnswerForDisplay(questions[27], questions[27].answer)).toBe("エ");
});
