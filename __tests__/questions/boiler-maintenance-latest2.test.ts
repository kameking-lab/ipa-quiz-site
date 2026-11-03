import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { describe, expect, it } from "vitest";
import { BOILER_MAINTENANCE_QUESTIONS } from "@/data/questions/boiler-maintenance";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import spring from "@/data/exam-library/papers/lckohyo-LC20260406.json";
import autumn from "@/data/exam-library/papers/lckohyo-LC20262106.json";
import { existsSync } from "node:fs";

describe("boiler-maintenance official latest two publications staging", () => {
  it("keeps both complete official keys with source links and text", () => {
    expect(BOILER_MAINTENANCE_QUESTIONS).toHaveLength(60);
    expect(new Set(BOILER_MAINTENANCE_QUESTIONS.map(q => q.id)).size).toBe(60);
    for (const [season, paper] of [["spring", spring], ["autumn", autumn]] as const) {
      const qs = BOILER_MAINTENANCE_QUESTIONS.filter(q => q.season === season);
      expect(qs).toHaveLength(30);
      for (const source of paper) {
        const q = qs.find(q => q.qNumber === source.number)!;
        expect(q.officialAnswerNumber).toBe(String(source.correctChoice));
        expect(q.answer).toBe(["ア", "イ", "ウ", "エ", "オ"][source.correctChoice! - 1]);
        expect(q.question.length).toBeGreaterThan(15);
        expect(Object.keys(q.choices!)).toHaveLength(5);
        expect(Object.values(q.choices!).join("")).not.toContain("図の（");
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www.exam.or.jp\//);
        expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
        for (const url of q.imageUrls ?? []) expect(existsSync(`public${url}`)).toBe(true);
      }
    }
  });
  it("stays inaccessible through the public question loader", async () => {
    for (const code of ["boiler1", "boiler-special", "boiler-maintenance"]) {
      expect(ALL_EXAM_CODES).not.toContain(code);
      expect(ALL_QUIZ_EXAM_CODES).not.toContain(code);
    }
    expect(isExamPublished("boiler-maintenance")).toBe(false);
    expect(await getQuestionsForExam("boiler-maintenance")).toEqual([]);
  });
});
