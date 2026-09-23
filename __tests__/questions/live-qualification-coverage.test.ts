import { describe, expect, it } from "vitest";
import { FP2_QUESTIONS } from "@/data/questions/fp2";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import fp2Practical from "@/data/questions/fp2/practical-2024-2025.json";
import fp3Practical from "@/data/questions/fp3/practical-2024-2025.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

const completePapers = [
  { exam: "fp2", questions: FP2_QUESTIONS, academic: [
    { prefix: "fp2-202405-gakka-", year: 2024, count: 60 },
    { prefix: "fp2-202409-gakka-", year: 2024, count: 60 },
    { prefix: "fp2-202501-gakka-", year: 2025, count: 60 },
    { prefix: "fp2-202505-gakka-", year: 2025, count: 60 },
  ] },
  { exam: "fp3", questions: FP3_QUESTIONS, academic: [
    { prefix: "fp3-2024-published-gakka-", year: 2024, count: 60 },
    { prefix: "fp3-2025-published-gakka-", year: 2025, count: 60 },
  ] },
] as const;

describe("live external qualification two-year publication gate", () => {
  it.each(completePapers)("$exam includes every academic choice and independently reviewed reason for two complete years", ({ exam, questions, academic }) => {
    expect(QUALIFICATION_CATALOG.find((item) => item.examCode === exam)?.status).toBe("live");
    expect(new Set(academic.map((paper) => paper.year))).toEqual(new Set([2024, 2025]));
    for (const paper of academic) {
      const published = questions.filter((question) => question.id.startsWith(paper.prefix));
      expect(published, paper.prefix).toHaveLength(paper.count);
      expect(published.map((question) => question.qNumber), paper.prefix)
        .toEqual(Array.from({ length: paper.count }, (_, index) => index + 1));
      for (const question of published) {
        const choices = Object.keys(question.choices ?? {}).sort();
        expect(choices.length, question.id).toBeGreaterThanOrEqual(2);
        expect(choices.length, question.id).toBeLessThanOrEqual(5);
        expect(Object.keys(question.choiceExplanations ?? {}).sort(), question.id).toEqual(choices);
        expect(Object.values(question.choiceExplanations ?? {}).every((reason) => reason.trim().length > 10), question.id).toBe(true);
        expect(question.needsReview, question.id).toBe(false);
        expect(question.sourcePdfUrl, question.id).toMatch(/^https:\/\/www\.jafp\.or\.jp\/exam\/mohan\/files\//);
      }
    }
  });

  it("covers all four FP2 practical papers and every official model answer", () => {
    expect(Object.keys(fp2Practical).sort()).toEqual(["202405", "202409", "202501", "202505"]);
    for (const edition of Object.values(fp2Practical)) {
      expect(edition.questions).toHaveLength(40);
      expect(edition.questions.map((question) => question.number)).toEqual(Array.from({ length: 40 }, (_, index) => index + 1));
      expect(edition.questions.every((question) => question.body.trim() && question.modelAnswer.trim())).toBe(true);
    }
  });

  it("covers both FP3 practical papers with the official answer and all three option reasons", () => {
    expect(Object.keys(fp3Practical).sort()).toEqual(["202405", "202505"]);
    for (const edition of Object.values(fp3Practical)) {
      expect(edition.questions).toHaveLength(20);
      expect(edition.questions.map((question) => question.number)).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
      for (const question of edition.questions) {
        expect(question.choices, `FP3 Q${question.number}`).toHaveLength(3);
        expect(Object.keys(question.choiceExplanations).sort(), `FP3 Q${question.number}`).toEqual(["ア", "イ", "ウ"]);
        expect(Object.values(question.choiceExplanations).every((reason) => reason.trim().length > 10), `FP3 Q${question.number}`).toBe(true);
        expect(question.needsReview, `FP3 Q${question.number}`).toBe(false);
      }
    }
  });
});
