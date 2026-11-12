import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";

const sets: {code: ExamCode; year: number; count: number}[] = [
  {code: "kikai-hozen-denki3", year: 2025, count: 30},
  {code: "kikai-hozen-kikai1", year: 2024, count: 49},
];

describe.each(sets)("c4-11 $code $year round2", ({code, year, count}) => {
  const source = JSON.parse(readFileSync(`data/questions/${code}/sources-${year}-round2.json`, "utf8"));
  const questions = QUESTIONS_BY_EXAM[code]!.filter(q => q.year === year && q.season === "round2");

  it("loads every official question through the practice loader and lists the sitting", async () => {
    const loaded = (await getQuestionsForExam(code)).filter(q => q.year === year && q.season === "round2");
    expect(loaded).toEqual(questions);
    expect(questions).toHaveLength(count);
    const missing = new Set((source.missingQuestions ?? []).map((q: {qNumber: number}) => q.qNumber));
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({length: source.originalQuestionCount ?? count}, (_, i) => i + 1).filter(n => !missing.has(n)));
    expect(EXAM_CONFIGS[code].seasons).toContain("round2");
    expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(year);
    for (const q of questions) expect(isPracticeReadyQuestion(q), q.id).toBe(true);
  });

  it("keeps official answers, full option explanations and original figures intact", () => {
    for (const q of questions) {
      expect(q.officialAnswerNumber, q.id).toBe(source.officialAnswers[q.qNumber - 1]);
      const official = String(q.officialAnswerNumber);
      expect(q.answer, q.id).toBe(official === "○" ? "ア" : official === "×" ? "イ" : official);
      expect(Object.keys(q.choiceExplanations!), q.id).toEqual(Object.keys(q.choices!));
      for (const [k, text] of Object.entries(q.choiceExplanations!)) {
        expect(text!.length, q.id).toBeGreaterThan(30);
        expect(text!.startsWith(k === q.answer ? "正解。" : "不正解。"), q.id).toBe(true);
      }
      if (/下図|次の図/.test(q.question)) expect(q.hasImage, q.id).toBe(true);
    }
    expect(questions.filter(q => q.hasImage)).toHaveLength(source.figures.length);
    for (const f of source.figures) {
      const data = readFileSync(path.join("public", f.url));
      expect(createHash("sha256").update(data).digest("hex")).toBe(f.sha256);
      expect(questions.some(q => q.imageUrls?.includes(f.url))).toBe(true);
    }
  });
});

it("keeps the officially deleted question absent and preserves the remaining numbers", () => {
  const rows = QUESTIONS_BY_EXAM["kikai-hozen-kikai1"]!;
  expect(rows.some(q => q.qNumber === 40)).toBe(false);
  expect(rows.find(q => q.qNumber === 46)?.answer).toBe("ウ");
  expect(350 * 9.8 / 8).toBeCloseTo(429, 0);
  expect(rows.find(q => q.qNumber === 48)?.answer).toBe("イ");
  expect(Math.sqrt(2 * 6280 / (Math.PI * 10))).toBeCloseTo(20, 0);
});

it("keeps the series circuit calculation and PNP arrow consistent with the original", () => {
  const rows = QUESTIONS_BY_EXAM["kikai-hozen-denki3"]!.filter(q => q.year === 2025 && q.season === "round2");
  expect(rows[2].explanation).toContain("15V");
  expect(rows[2].answer).toBe("イ");
  expect(rows[29].answer).toBe("ア");
  expect(rows[29].explanation).toContain("PNP");
});
