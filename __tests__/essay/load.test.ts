import { describe, it, expect } from "vitest";
import {
  ESSAY_EXAM_CODES,
  getEssayQuestionsByExam,
  findEssayQuestion,
  getAllEssayQuestions,
  type EssayExamCode,
} from "@/lib/essay/load";
import { ALL_ESSAY_QUESTIONS } from "@/data/questions/essay";

/**
 * Characterization tests for the essay (論文添削 C軸) question accessors.
 * Assertions are derived from the live corpus and pin ordering/partition
 * invariants rather than brittle exact counts, so they survive data additions
 * but fail if the accessor contract (exam filter, sort order, copy semantics,
 * id lookup) regresses. Distinct from lib/essays/load.ts (the SC-corpus essay
 * loader) — this is the multi-exam ST/SA/PM/SM/AU论文 source.
 */

describe("essay/load ESSAY_EXAM_CODES", () => {
  it("lists exactly the exam codes present in the corpus", () => {
    const codesInData = new Set(ALL_ESSAY_QUESTIONS.map((q) => q.exam));
    // constant <-> data agree both ways (no orphan code, no missing code).
    expect(new Set(ESSAY_EXAM_CODES)).toEqual(codesInData);
    expect(ESSAY_EXAM_CODES).toEqual(["st", "sa", "pm", "sm", "au"]);
  });

  it("has no duplicate codes", () => {
    expect(new Set(ESSAY_EXAM_CODES).size).toBe(ESSAY_EXAM_CODES.length);
  });
});

describe("essay/load getEssayQuestionsByExam", () => {
  it("returns only the requested exam's questions, matching a direct filter", () => {
    for (const exam of ESSAY_EXAM_CODES) {
      const got = getEssayQuestionsByExam(exam);
      const expected = ALL_ESSAY_QUESTIONS.filter((q) => q.exam === exam);
      expect(got.length).toBe(expected.length);
      expect(got.every((q) => q.exam === exam)).toBe(true);
    }
  });

  it("sorts by year desc, then season asc, then qNumber asc", () => {
    for (const exam of ESSAY_EXAM_CODES) {
      const list = getEssayQuestionsByExam(exam);
      for (let i = 1; i < list.length; i++) {
        const prev = list[i - 1];
        const cur = list[i];
        if (prev.year !== cur.year) {
          // newer years first
          expect(prev.year).toBeGreaterThan(cur.year);
        } else if (prev.season !== cur.season) {
          // same year: season ascending by locale order
          expect(prev.season.localeCompare(cur.season)).toBeLessThan(0);
        } else {
          // same year+season: qNumber ascending
          expect(prev.qNumber).toBeLessThanOrEqual(cur.qNumber);
        }
      }
    }
  });

  it("partitions the corpus exactly across all exam codes", () => {
    const total = ESSAY_EXAM_CODES.reduce(
      (sum, exam) => sum + getEssayQuestionsByExam(exam).length,
      0,
    );
    expect(total).toBe(ALL_ESSAY_QUESTIONS.length);
  });

  it("returns an empty list for an exam code with no questions", () => {
    // ip never appears in the essay corpus.
    expect(getEssayQuestionsByExam("ip" as EssayExamCode)).toEqual([]);
  });
});

describe("essay/load findEssayQuestion", () => {
  it("finds an existing question by id", () => {
    const sample = ALL_ESSAY_QUESTIONS[0];
    const found = findEssayQuestion(sample.id);
    expect(found).toBeDefined();
    expect(found?.id).toBe(sample.id);
  });

  it("returns undefined for an unknown id", () => {
    expect(findEssayQuestion("does-not-exist-q999")).toBeUndefined();
  });
});

describe("essay/load getAllEssayQuestions", () => {
  it("returns every question as a fresh array (caller cannot mutate the source)", () => {
    const all = getAllEssayQuestions();
    expect(all.length).toBe(ALL_ESSAY_QUESTIONS.length);
    expect(all).not.toBe(ALL_ESSAY_QUESTIONS);
    all.pop();
    // mutating the returned copy must not shrink the underlying corpus.
    expect(getAllEssayQuestions().length).toBe(ALL_ESSAY_QUESTIONS.length);
  });

  it("has unique ids across the whole corpus", () => {
    const ids = getAllEssayQuestions().map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
