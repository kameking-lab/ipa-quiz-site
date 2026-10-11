import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { ZOEN2_QUESTIONS } from "@/data/questions/zoen2";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import garden from "@/data/questions/zoen2/2026-early.json";
import garden2025 from "@/data/questions/zoen2/2025-late.json";
import telecom from "@/data/questions/tsushin2/2026-early.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";
import answers2025 from "@/docs/evidence/zoen2-latest-two-20261011/official-answers-2025.json";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";

const keys = ["ア", "イ", "ウ", "エ"] as const;
const allNumbers = Array.from({ length: 40 }, (_, index) => index + 1);

describe("JCTC first-stage questions with official provenance", () => {
  it.each([
    ["zoen2", garden, ZOEN2_QUESTIONS.filter((q) => q.year === 2026), 40, 40],
    ["tsushin2", telecom, TSUSHIN2_QUESTIONS, 65, 5],
  ] as const)("%s retains original PDF hashes and all official answers", (exam, source, questions, officialCount, count) => {
    expect(source.officialQuestionCount).toBe(officialCount);
    expect(source.publishedCount).toBe(count);
    expect(questions).toHaveLength(count);
    expect(source.questions).toHaveLength(count);
    for (const kind of ["question", "answer"] as const) {
      const pdf = readFileSync(join(process.cwd(), "docs/evidence/zoen2-tsushin2/input", `${exam}-2026-${kind === "question" ? "q" : "a"}.pdf`));
      expect(createHash("sha256").update(pdf).digest("hex")).toBe(source[`${kind}Sha256`]);
    }
    for (const question of questions) {
      const expected = answers[exam][question.qNumber - 1];
      const expectedKeys = expected.map((number) => keys[number - 1]);
      expect(question.answer).toEqual(expectedKeys.length === 1 ? expectedKeys[0] : expectedKeys);
      expect(question.officialAnswerNumber).toBe(expected.join("・"));
      expect(question.sourcePdfUrl).toBe(source.questionUrl);
      expect(question.sourceAnswerUrl).toBe(source.answerUrl);
      expect(Object.values(question.choiceExplanations ?? {}).filter(Boolean)).toHaveLength(4);
    }
  });

  it("keeps telecom questions with missing diagrams outside its pool", () => {
    expect(TSUSHIN2_QUESTIONS.map((q) => q.qNumber)).toEqual([4, 7, 8, 9, 10]);
    expect(telecom.deferred.map((q) => q.number)).toEqual([1, 2, 3, 5, 6]);
  });

  it("covers both gardening sittings completely, without duplicate question IDs", () => {
    expect(ZOEN2_QUESTIONS).toHaveLength(80);
    expect(new Set(ZOEN2_QUESTIONS.map((q) => q.id)).size).toBe(80);
    for (const source of [garden, garden2025]) {
      const selected = ZOEN2_QUESTIONS.filter((q) => q.year === source.year && q.season === source.season);
      expect(source.publishedCount).toBe(40);
      expect(source.questions.map((q) => q.number)).toEqual(allNumbers);
      expect(selected.map((q) => q.qNumber)).toEqual(allNumbers);
      expect(source.deferred).toEqual([]);
      for (const q of selected) {
        expect(Object.values(q.choices ?? {}).filter(Boolean)).toHaveLength(4);
        expect(Object.values(q.choiceExplanations ?? {}).filter(Boolean)).toHaveLength(4);
        expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
        for (const url of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
      }
    }
  });

  it("checks all 2025 late answers, including multiple selections, against the official table", () => {
    const selected = ZOEN2_QUESTIONS.filter((q) => q.year === 2025);
    for (const kind of ["question", "answer"] as const) {
      const suffix = kind === "question" ? "q" : "a";
      const pdf = readFileSync(join(process.cwd(), "docs/evidence/zoen2-2025/input", `zoen2-2025-${suffix}.pdf`));
      expect(createHash("sha256").update(pdf).digest("hex")).toBe(garden2025[`${kind}Sha256`]);
    }
    for (const q of selected) {
      const expected = answers2025.answers[q.qNumber - 1];
      const expectedKeys = expected.map((number) => keys[number - 1]);
      expect(q.officialAnswerNumber).toBe(expected.join("・"));
      expect(q.answer).toEqual(expectedKeys.length === 1 ? expectedKeys[0] : expectedKeys);
      expect(q.sourcePdfUrl).toBe(garden2025.questionUrl);
      expect(q.sourceAnswerUrl).toBe(garden2025.answerUrl);
    }
    for (const q of ZOEN2_QUESTIONS.filter((q) => q.qNumber >= 37)) {
      expect(Array.isArray(q.answer)).toBe(true);
      expect(q.requiredSelections).toBe(q.answer.length);
      expect(q.question).toContain("全て");
      if (!Array.isArray(q.answer)) throw new Error("Expected multiple official answers");
      expect(isCompleteSelectionCorrect(q.answer, [...q.answer].reverse(), q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, q.answer.slice(0, -1), q.requiredSelections)).toBe(false);
      const wrong = keys.find((key) => !q.answer.includes(key))!;
      expect(isCompleteSelectionCorrect(q.answer, [...q.answer.slice(0, -1), wrong], q.requiredSelections)).toBe(false);
    }
  });

  it("retains unit superscripts and the corrected daily inspection explanation", () => {
    const get = (number: number) => garden.questions.find((q) => q.number === number)!;
    expect(get(17).question).toContain("7,200 m³");
    expect(get(17).choices).toEqual(["5,400 m³", "8,000 m³", "8,640 m³", "9,600 m³"]);
    expect(get(25).question).toContain("10 m³");
    expect(get(32).choiceExplanations[1]).toContain("その日の作業開始前");
    expect(get(16).choiceExplanations[1]).toContain("350mmを基準");
    expect(get(28).pdfPage).toBe(12);
    expect(get(31).pdfPage).toBe(14);
    expect(get(39).pdfPage).toBe(17);
  });

  it("does not assert reuse permission for newly restored material", () => {
    const added2025 = new Set([9,16,17,20,22,24,27,28,29,37,38,39,40]);
    const added = ZOEN2_QUESTIONS.filter((q) => q.year === 2026 ? q.qNumber >= 11 : added2025.has(q.qNumber));
    expect(added).toHaveLength(43);
    expect(added.every((q) => q.license === "JCTC-attributed")).toBe(true);
    expect(garden.releaseStatus).toBe("DRAFT_IMPLEMENTATION_COMPLETE");
    expect(garden2025.releaseStatus).toBe("DRAFT_IMPLEMENTATION_COMPLETE");
  });
});
