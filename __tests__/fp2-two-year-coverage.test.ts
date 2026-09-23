import { describe, expect, it } from "vitest";
import academic from "@/docs/evidence/fp2-two-year/gakka-extraction.json";
import academicPublished from "@/data/questions/fp2/academic-2024-2025.json";
import academicFigures from "@/data/questions/fp2/academic-figures-2024-2025.json";
import { FP2_QUESTIONS } from "@/data/questions/fp2";
import practical from "@/data/questions/fp2/practical-2024-2025.json";
import practicalExplanations from "@/data/questions/fp2/practical-explanations-2024-2025.json";
import figures from "@/data/questions/fp2/practical-figures-2024-2025.json";
import sharedCases from "@/data/questions/fp2/practical-shared-context-2024-2025.json";
import manifest from "@/docs/evidence/fp2-two-year/manifest.json";

const editions = ["202405", "202409", "202501", "202505"] as const;

describe("FP2 official 2024–2025 corpus", () => {
  it("holds four complete academic papers with all choices and official answers", () => {
    for (const edition of editions) {
      const questions = academic[edition].questions;
      expect(questions).toHaveLength(60);
      expect(questions.map((q) => q.number)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
      for (const q of questions) {
        expect(q.stem.trim().length).toBeGreaterThan(10);
        expect(q.choices).toHaveLength(4);
        expect(q.choices.every((choice) => choice.trim().length > 0)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(1);
        expect(q.answer).toBeLessThanOrEqual(4);
      }
    }
  });

  it("publishes each 2024–2025 academic question with the official answer and four choice reasons", () => {
    expect(academicPublished).toHaveLength(240);
    expect(FP2_QUESTIONS).toHaveLength(250); // Includes the separate 2026 Q1–10 pilot.
    expect(academicPublished.filter((q) => q.needsReview)).toHaveLength(0);
    for (const edition of editions) {
      const original = academic[edition].questions;
      const published = academicPublished.filter((q) => q.id.startsWith(`fp2-${edition}-`));
      expect(published).toHaveLength(60);
      expect(published.map((q) => q.qNumber)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
      for (const q of published) {
        const source = original[q.qNumber - 1];
        expect(q.answer).toBe("アイウエ"[source.answer - 1]);
        expect(Object.keys(q.choices)).toEqual(["ア", "イ", "ウ", "エ"]);
        expect(Object.keys(q.choiceExplanations)).toEqual(["ア", "イ", "ウ", "エ"]);
        expect(Object.values(q.choiceExplanations).every((reason) => reason.trim().length > 10)).toBe(true);
        expect(q.question.trim().length).toBeGreaterThan(10);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.jafp\.or\.jp\/exam\/mohan\/files\//);
        expect(q.officialReferenceUrls?.every((url) => /^https:\/\/(?:laws\.e-gov\.go\.jp|[a-z.]+\.go\.jp)\//.test(url)) ?? true).toBe(true);
        expect(q.imageUrls?.length ?? 0).toBe((academicFigures[edition] as Record<string, unknown[]>)[String(q.qNumber)]?.length ?? 0);
      }
    }
  });

  it("pairs every practical prompt with its exact answer and shows images only for diagrams or tables", () => {
    for (const edition of editions) {
      const questions = practical[edition].questions;
      expect(questions).toHaveLength(40);
      expect(questions.map((q) => q.number)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
      for (const q of questions) {
        expect(q.body.trim().length).toBeGreaterThan(10);
        expect(q.body, `${edition} Q${q.number} contains the next section's shared case`).not.toContain("<設例>");
        expect(q.modelAnswer.trim()).not.toBe("");
        expect((figures[edition] as Record<string, unknown[]>)[String(q.number)]).toBeDefined();
      }
      expect((figures[edition] as Record<string, unknown[]>)["1"]).toHaveLength(0);
    }
  });

  it("includes a reviewed solution for all 160 practical questions and every numeric option", () => {
    for (const edition of editions) {
      const source = practical[edition].questions;
      const solutions = practicalExplanations[edition] as Record<string, {
        explanation: string;
        choiceExplanations: Record<string, string>;
        governmentReferenceUrls: string[];
        needsReview: boolean;
      }>;
      expect(Object.keys(solutions)).toHaveLength(40);
      for (const q of source) {
        const solution = solutions[String(q.number)];
        expect(solution, `${edition} Q${q.number}`).toBeDefined();
        expect(solution.explanation.trim().length).toBeGreaterThan(20);
        expect(solution.needsReview, `${edition} Q${q.number} still needs review`).toBe(false);
        const numeric = /^[1-4]$/.test(q.modelAnswer);
        if (numeric) expect(Object.keys(solution.choiceExplanations)).toEqual(["1", "2", "3", "4"]);
        expect(Object.values(solution.choiceExplanations).every((reason) => reason.trim().length > 10)).toBe(true);
        expect(solution.governmentReferenceUrls.every((url) => /^https:\/\/(?:laws\.e-gov\.go\.jp|[a-z.]+\.go\.jp)\//.test(url))).toBe(true);
      }
    }
  });

  it("keeps the preceding shared case visible for practical questions that depend on it", () => {
    expect(sharedCases["202405"]["31"].text).toContain("学資保険C");
    expect(sharedCases["202405"]["31"].text).toContain("菜々美");
    expect(sharedCases["202409"]["30"].sourcePages).toEqual([26]);
    expect(sharedCases["202501"]["35"].sourcePages).toEqual([32]);
    expect((figures["202405"] as Record<string, unknown[]>)["23"].length).toBeGreaterThan(0);
    expect((figures["202409"] as Record<string, unknown[]>)["24"].length).toBeGreaterThan(0);
    expect((figures["202501"] as Record<string, unknown[]>)["24"].length).toBeGreaterThan(0);
  });

  it("pins all original PDFs and the four different legal reference dates", () => {
    expect(manifest.editions.map((edition) => edition.edition)).toEqual(editions);
    expect(manifest.editions.map((edition) => edition.lawReferenceDate)).toEqual([
      "2023-10-01", "2024-04-01", "2024-10-01", "2024-04-01",
    ]);
    for (const edition of manifest.editions) {
      expect(edition.expectedGakkaQuestions).toBe(60);
      expect(edition.extractedGakkaQuestions).toBe(60);
      expect(edition.expectedJitsugiQuestions).toBe(40);
      expect(edition.extractedJitsugiAnswers).toBe(40);
      for (const file of Object.values(edition.files)) {
        expect(file.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(file.url).toMatch(/^https:\/\/www\.jafp\.or\.jp\/exam\/mohan\/files\//);
      }
    }
  });
});
