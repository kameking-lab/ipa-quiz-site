import { describe, expect, it } from "vitest";
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { getAfternoonQuestions, findAfternoonQuestion } from "@/lib/afternoon/load";
import { getAllEssayQuestions } from "@/lib/essay/load";
import { SC_PM2_QUESTIONS } from "@/data/essays/sc";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";
import { FE_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/fe";
import { ST_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/st";
import { SA_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sa";
import { PM_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/pm";
import { SM_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sm";
import { AU_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/au";
import { NW_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/nw";
import { DB_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/db";
import { ES_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/es";
import { SC_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sc";

const raw: AfternoonQuestion[] = [
  ...AP_AFTERNOON_QUESTIONS, ...FE_AFTERNOON_QUESTIONS, ...ST_AFTERNOON_QUESTIONS,
  ...SA_AFTERNOON_QUESTIONS, ...PM_AFTERNOON_QUESTIONS, ...SM_AFTERNOON_QUESTIONS,
  ...AU_AFTERNOON_QUESTIONS, ...NW_AFTERNOON_QUESTIONS, ...DB_AFTERNOON_QUESTIONS,
  ...ES_AFTERNOON_QUESTIONS, ...SC_AFTERNOON_QUESTIONS,
];

describe("retained original afternoon manuscripts", () => {
  it("keeps the 23 raw questions and 83 subquestions without publishing them", () => {
    expect(raw).toHaveLength(23);
    expect(raw.flatMap((q) => q.subQuestions)).toHaveLength(83);
    expect(raw.every((q) => q.license === "original")).toBe(true);
    for (const q of raw) {
      expect(findAfternoonQuestion(q.id)).toBeUndefined();
      expect(getAfternoonQuestions(q.exam)).not.toContain(q);
    }
    const es = raw.find((q) => q.id === "es-2024h-pm1-q1")!;
    expect(es.subQuestions.filter((s) => s.label.startsWith("設問4"))).toHaveLength(2);
    expect(es.subQuestions.reduce((sum, s) => sum + (s.points ?? 0), 0)).toBe(100);
  });

  it("keeps all 144 industry answers within their raw question bounds", () => {
    const essayQuestions = raw.filter((q) => q.type === "essay" && q.industryVariants);
    expect(essayQuestions).toHaveLength(15);
    const industryAnswers = essayQuestions.flatMap((q) => q.industryVariants ?? []);
    expect(industryAnswers).toHaveLength(120);
    expect(SC_PM2_QUESTIONS.flatMap((q) => q.industries)).toHaveLength(24);
    for (const question of essayQuestions) {
      for (const answer of question.industryVariants ?? []) {
        for (const [i, text] of [answer.essayA, answer.essayI, answer.essayU].entries()) {
          const condition = question.subQuestions[i];
          expect(text.length, `${question.id}/${answer.industryId}/${i}`).toBeGreaterThanOrEqual(condition?.minLength ?? 0);
          expect(text.length, `${question.id}/${answer.industryId}/${i}`).toBeLessThanOrEqual(condition?.maxLength ?? Infinity);
        }
      }
    }
  });

  it("keeps each raw model answer inside its stated limits", () => {
    for (const q of raw) {
      for (const s of q.subQuestions) {
        expect(s.modelAnswer.length).toBeGreaterThanOrEqual(s.minLength ?? 0);
        expect(s.modelAnswer.length).toBeLessThanOrEqual(s.maxLength ?? Infinity);
        const prompt = s.prompt.replaceAll(",", "");
        const max = prompt.match(/(\d+)字以内/);
        const min = prompt.match(/(\d+)字以上/);
        if (max) expect(s.maxLength).toBe(Number(max[1]));
        if (min) expect(s.minLength).toBe(Number(min[1]));
      }
    }
  });

  it("keeps the 12 separate original essay manuscripts with their editorial notes", () => {
    const essays = getAllEssayQuestions();
    expect(essays).toHaveLength(12);
    for (const q of essays) {
      expect(q.license).toBe("original");
      expect(q.editorialReview.length).toBeGreaterThan(0);
      expect(q).not.toHaveProperty("officialReview");
    }
  });
});
