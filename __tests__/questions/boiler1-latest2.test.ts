import { describe, expect, it } from "vitest";
import { BOILER1_QUESTIONS } from "@/data/questions/boiler1";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import spring from "@/data/exam-library/papers/lckohyo-LC20260402-1.json";
import autumn from "@/data/exam-library/papers/lckohyo-LC20262102.json";
import { existsSync } from "node:fs";

describe("boiler1 official latest two publications staging", () => {
  it("keeps both complete official keys with source links and text", () => {
    expect(BOILER1_QUESTIONS).toHaveLength(80);
    expect(new Set(BOILER1_QUESTIONS.map(q => q.id)).size).toBe(80);
    for (const [season, paper] of [["spring", spring], ["autumn", autumn]] as const) {
      const qs = BOILER1_QUESTIONS.filter(q => q.season === season);
      expect(qs).toHaveLength(40);
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
    expect(isExamPublished("boiler1")).toBe(false);
    expect(await getQuestionsForExam("boiler1")).toEqual([]);
  });
});
