import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { CRANE_DERRICK_QUESTIONS as questions } from "@/data/questions/crane-derrick";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("crane-derrick official latest two publications", () => {
  it("keeps both complete papers staged", async () => {
    expect(questions).toHaveLength(80);
    expect(isExamPublished("crane-derrick")).toBe(false);
    expect(QUESTIONS_BY_EXAM["crane-derrick"]).toBeUndefined();
    expect(await getQuestionsForExam("crane-derrick")).toEqual([]);
  });
  it("retains numbering, official answer keys, text and figure assets", () => {
    for (const season of ["october", "first"]) {
      const paper = questions.filter(q => q.season === season);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({length:40}, (_,i)=>i+1));
      for (const q of paper) {
        expect(Object.keys(q.choices!)).toHaveLength(5);
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
