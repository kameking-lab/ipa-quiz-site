import { describe, it, expect } from "vitest";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { existsSync } from "node:fs";
import { CARGO_WINCH_QUESTIONS as questions } from "@/data/questions/cargo-winch";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("cargo-winch official latest two publications", () => {
  it("keeps both complete papers staged", async () => {
    expect(questions).toHaveLength(80);
    expect(isExamPublished("cargo-winch")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("cargo-winch");
    expect(QUESTIONS_BY_EXAM["cargo-winch"]).toBeUndefined();
    expect(await getQuestionsForExam("cargo-winch")).toEqual([]);
  });
  it("matches the official PDF answer marks independently", () => {
    const keys = {"october": [2, 5, 3, 2, 3, 1, 5, 4, 2, 3, 4, 3, 5, 1, 5, 3, 2, 3, 4, 2, 1, 3, 2, 4, 2, 5, 5, 4, 3, 1, 5, 2, 1, 4, 3, 3, 5, 5, 3, 2], "first": [5, 3, 3, 1, 4, 2, 2, 4, 1, 3, 3, 4, 4, 4, 3, 1, 5, 3, 1, 2, 2, 2, 1, 5, 3, 3, 2, 5, 1, 4, 3, 4, 5, 2, 2, 2, 4, 4, 1, 3]};
    for (const season of ["october", "first"] as const) expect(questions.filter(q => q.season === season).map(q => Number(q.officialAnswerNumber))).toEqual(keys[season]);
  });
  it("retains numbering, official answer keys, text and figure assets", () => {
    for (const season of ["october", "first"]) {
      const paper = questions.filter(q => q.season === season);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({length:40}, (_,i)=>i+1));
      for (const q of paper) {
        expect(Object.keys(q.choices!)).toHaveLength(5);
        expect(choiceDisplayLabel(q.exam, q.answer as "ア")).toBe(q.officialAnswerNumber);
        expect(q.answer).toBe("アイウエオ"[Number(q.officialAnswerNumber)-1]);
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www.exam.or.jp\//);
        expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
        expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
        for (const src of q.imageUrls ?? []) expect(existsSync(`public${src}`)).toBe(true);
        if(q.category === "関係法令") expect(q.explanation).toContain("出題時点");
      }
    }
  });
});
