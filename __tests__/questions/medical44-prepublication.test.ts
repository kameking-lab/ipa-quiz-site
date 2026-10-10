import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { HOKENSHI_QUESTIONS } from "@/data/questions/hokenshi";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { JOSANSHI_QUESTIONS } from "@/data/questions/josanshi";
import manifest from "@/docs/evidence/medical44-prepublication-20261010/MANIFEST.json";
import hokenshiRaw from "@/data/questions/hokenshi/medical44-prepublication.json";
import josanshiRaw from "@/data/questions/josanshi/medical44-prepublication.json";
import { isExamPublished } from "@/lib/qualifications/catalog";

const questions = [...hokenshiRaw, ...josanshiRaw];
const gateReady = [...HOKENSHI_QUESTIONS, ...JOSANSHI_QUESTIONS];
const choices = ["ア", "イ", "ウ", "エ", "オ"];

describe("medical Q45–55 prepublication candidate", () => {
  it("preserves the exact two-qualification identity set with an unchanged historical source manifest", () => {
    expect(hokenshiRaw).toHaveLength(22);
    expect(josanshiRaw).toHaveLength(22);
    expect(questions).toHaveLength(44);
    expect(new Set(questions.map(question => question.id)).size).toBe(44);
    expect(isExamPublished("hokenshi")).toBe(true);
    expect(isExamPublished("josanshi")).toBe(true);
    expect(manifest.publicationGo).toBe(false);
    expect(manifest.sourceCandidateSha256).toBe("e62cd415676bd9f029f879d39dac22ce436cd719b1ca3d83a8e21448e5766a34");
    expect(questions.map(question => question.id).sort()).toEqual(manifest.questions.map(question => question.id).sort());
  });

  it("stages only the 34 structurally ready originals in the partial live registry", () => {
    expect(HOKENSHI_QUESTIONS).toHaveLength(16);
    expect(JOSANSHI_QUESTIONS).toHaveLength(18);
    expect(gateReady).toHaveLength(34);
    expect(gateReady.every(question => question.needsReview === false)).toBe(true);
    expect(gateReady.filter(question => question.hasImage)).toHaveLength(0);
    expect(gateReady.map(question => question.id).sort()).toEqual(
      questions.filter(question => !question.needsReview).map(question => question.id).sort(),
    );
    for (const question of gateReady) {
      expect(question).toEqual(questions.find(source => source.id === question.id));
    }
    expect(isExamPublished("hokenshi")).toBe(true);
    expect(isExamPublished("josanshi")).toBe(true);
    expect(QUESTIONS_BY_EXAM.hokenshi?.map(question => question.id)).toEqual(HOKENSHI_QUESTIONS.map(question => question.id));
    expect(QUESTIONS_BY_EXAM.josanshi?.map(question => question.id)).toEqual(JOSANSHI_QUESTIONS.map(question => question.id));
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

  it("retains historical image references while excluding held assets from the live branch", () => {
    const pictured = questions.filter(question => question.hasImage);
    expect(pictured).toHaveLength(3);
    expect(pictured.map(question => question.id).sort()).toEqual(
      manifest.figurePages.map(page => page.id).sort(),
    );
    for (const question of pictured) {
      expect(question.imageUrls).toHaveLength(1);
      expect(question.imageAltTexts).toHaveLength(1);
      for (const imageUrl of question.imageUrls ?? []) {
        expect(existsSync(resolve(process.cwd(), "public", imageUrl.replace(/^\//, "")))).toBe(false);
      }
    }
  });

  it("keeps held originals out of the runtime import graph and global question pool", () => {
    const heldIds = new Set(questions.filter(question => question.needsReview).map(question => question.id));
    for (const question of ALL_QUESTIONS) {
      expect(heldIds.has(question.id)).toBe(false);
    }
    for (const slug of ["hokenshi", "josanshi"]) {
      const moduleSource = readFileSync(resolve(process.cwd(), "data/questions", slug, "index.ts"), "utf8");
      expect(moduleSource).toContain("./medical34-live.json");
      expect(moduleSource).not.toContain("./medical44-prepublication.json");
    }
  });
});
