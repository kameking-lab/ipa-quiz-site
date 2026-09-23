import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { DENKO2_QUESTIONS } from "@/data/questions/denko2";
import { DENKO2_SKILL_PROBLEMS } from "@/lib/denko2/skills";
import { FP2_QUESTIONS } from "@/data/questions/fp2";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import fp2Practical from "@/data/questions/fp2/practical-2024-2025.json";
import fp2PracticalExplanations from "@/data/questions/fp2/practical-explanations-2024-2025.json";
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
  it("holds all four electrician academic papers and eight practical days behind the release gate", () => {
    const status = QUALIFICATION_CATALOG.find((item) => item.examCode === "denko2")?.status;
    expect(status).toBe("notification-required");
    expect(DENKO2_QUESTIONS).toHaveLength(200);
    for (const year of [2024, 2025]) {
      for (const season of ["first", "second"] as const) {
        const paper = DENKO2_QUESTIONS.filter((item) => item.year === year && item.season === season);
        expect(paper, `${year}-${season}`).toHaveLength(50);
        expect(paper.map((item) => item.qNumber)).toEqual(Array.from({ length: 50 }, (_, index) => index + 1));
        for (const question of paper) {
          expect(Object.keys(question.choices ?? {})).toHaveLength(4);
          expect(Object.keys(question.choiceExplanations ?? {})).toHaveLength(4);
          expect(Object.values(question.choiceExplanations ?? {}).every((reason) => reason.trim().length > 10)).toBe(true);
          expect(question.needsReview).toBe(false);
          expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.shiken\.or\.jp\/construction\/upload\//);
          expect(question.sourceAnswerUrl).toMatch(/^https:\/\/www\.shiken\.or\.jp\/construction\/upload\//);
          for (const image of [...(question.imageUrls ?? []), ...Object.values(question.choiceImageUrls ?? {})]) {
            expect(existsSync(join(process.cwd(), "public", image!.replace(/^\//, ""))), `${question.id}: ${image}`).toBe(true);
          }
        }
      }
    }
    expect(DENKO2_SKILL_PROBLEMS).toHaveLength(104);
    const dates = [...new Set(DENKO2_SKILL_PROBLEMS.map((item) => item.date))];
    expect(dates).toHaveLength(8);
    for (const date of dates) {
      const day = DENKO2_SKILL_PROBLEMS.filter((item) => item.date === date);
      expect(day, date).toHaveLength(13);
      expect(day.map((item) => item.number)).toEqual(Array.from({ length: 13 }, (_, index) => index + 1));
      for (const problem of day) {
        expect(problem.instructionText.trim().length).toBeGreaterThan(20);
        expect(problem.conditionsText.trim().length).toBeGreaterThan(20);
        expect(problem.questionPdfUrl).toMatch(/^https:\/\/www\.shiken\.or\.jp\/construction\/upload\//);
        expect(problem.answerPdfUrl).toMatch(/^https:\/\/www\.shiken\.or\.jp\/construction\/upload\//);
        for (const image of [problem.diagramImage, problem.secondFigureImage, problem.answerConceptImage,
          problem.answerWiringImage, problem.answerExampleImage].filter((item): item is string => Boolean(item))) {
          expect(existsSync(join(process.cwd(), "public", image.replace(/^\//, ""))), `${problem.id}: ${image}`).toBe(true);
        }
      }
    }
  });

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

  it("covers all four FP2 practical papers with reviewed solutions and every numeric choice reason", () => {
    expect(Object.keys(fp2Practical).sort()).toEqual(["202405", "202409", "202501", "202505"]);
    for (const [edition, paper] of Object.entries(fp2Practical)) {
      expect(paper.questions).toHaveLength(40);
      expect(paper.questions.map((question) => question.number)).toEqual(Array.from({ length: 40 }, (_, index) => index + 1));
      const solutions = fp2PracticalExplanations[edition as keyof typeof fp2PracticalExplanations];
      expect(Object.keys(solutions)).toHaveLength(40);
      for (const question of paper.questions) {
        expect(question.body.trim().length).toBeGreaterThan(10);
        expect(question.modelAnswer.trim().length).toBeGreaterThan(0);
        const solution = solutions[String(question.number) as keyof typeof solutions];
        expect(solution, `${edition} Q${question.number}`).toBeDefined();
        expect(solution.needsReview, `${edition} Q${question.number}`).toBe(false);
        expect(solution.explanation.trim().length, `${edition} Q${question.number}`).toBeGreaterThan(20);
        if (/^[1-4]$/.test(question.modelAnswer)) {
          expect(Object.keys(solution.choiceExplanations).sort(), `${edition} Q${question.number}`).toEqual(["1", "2", "3", "4"]);
          expect(Object.values(solution.choiceExplanations).every((reason) => reason.trim().length > 10), `${edition} Q${question.number}`).toBe(true);
        }
      }
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
