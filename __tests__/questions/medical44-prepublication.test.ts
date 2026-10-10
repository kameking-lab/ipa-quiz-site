import { describe, expect, it } from "vitest";
import { HOKENSHI_QUESTIONS } from "@/data/questions/hokenshi";
import { JOSANSHI_QUESTIONS } from "@/data/questions/josanshi";
import manifest from "@/docs/evidence/medical44-prepublication-20261010/MANIFEST.json";
import { isExamPublished } from "@/lib/qualifications/catalog";

const questions = [...HOKENSHI_QUESTIONS, ...JOSANSHI_QUESTIONS];
const choices = ["ア", "イ", "ウ", "エ", "オ"];

describe("medical Q45–55 prepublication candidate", () => {
  it("preserves the exact two-qualification identity set behind a non-live catalog gate", () => {
    expect(HOKENSHI_QUESTIONS).toHaveLength(22);
    expect(JOSANSHI_QUESTIONS).toHaveLength(22);
    expect(questions).toHaveLength(44);
    expect(new Set(questions.map(question => question.id)).size).toBe(44);
    expect(isExamPublished("hokenshi")).toBe(false);
    expect(isExamPublished("josanshi")).toBe(false);
    expect(manifest.publicationGo).toBe(false);
    expect(manifest.sourceCandidateSha256).toBe("e62cd415676bd9f029f879d39dac22ce436cd719b1ca3d83a8e21448e5766a34");
    expect(questions.map(question => question.id).sort()).toEqual(manifest.questions.map(question => question.id).sort());
  });

  it("retains every official key, all choices, selection count and source", () => {
    const evidence = new Map(manifest.questions.map(row => [row.id, row]));
    for (const question of questions) {
      const source = evidence.get(question.id);
      expect(source, question.id).toBeDefined();
      const answerKeys = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answerKeys.map(key => String(choices.indexOf(key) + 1))).toEqual(source!.answerDigits);
      expect(question.requiredSelections).toBe(source!.requiredSelections);
      expect(answerKeys).toHaveLength(question.requiredSelections ?? 0);
      expect(Object.keys(question.choices ?? {})).toHaveLength(Object.keys(question.choiceExplanations ?? {}).length);
      expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.question.length).toBeGreaterThan(8);
      expect(question.explanation.length).toBeGreaterThan(8);
      expect(question.needsReview).toBe(source!.targetedReviewPending);
    }
    expect(questions.filter(question => question.needsReview)).toHaveLength(10);
    expect(questions.filter(question => !question.needsReview)).toHaveLength(34);
  });

  it("keeps the three required source-page images attached", () => {
    const pictured = questions.filter(question => question.hasImage);
    expect(pictured).toHaveLength(3);
    expect(pictured.map(question => question.id).sort()).toEqual(
      manifest.figurePages.map(page => page.id).sort(),
    );
    for (const question of pictured) {
      expect(question.imageUrls).toHaveLength(1);
      expect(question.imageAltTexts).toHaveLength(1);
    }
  });
});
