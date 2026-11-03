import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { BLASTER_QUESTIONS } from "@/data/questions/blaster";
import sources from "@/data/questions/blaster/sources.json";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatYearSeason } from "@/lib/utils";

describe("blaster official latest two publications, staged", () => {
  it("preserves every question and marked answer from both papers", () => {
    expect(BLASTER_QUESTIONS).toHaveLength(40);
    expect(new Set(BLASTER_QUESTIONS.map(q => q.id)).size).toBe(40);
    for (const source of sources) {
      const paper = BLASTER_QUESTIONS.filter(q => q.sourcePdfUrl === source.url);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({length: 20}, (_, i) => i + 1));
      expect(paper.map(q => Number(q.officialAnswerNumber))).toEqual(source.answers);
      for (const q of paper) {
        expect(q.answer).toBe("アイウエオ"[Number(q.officialAnswerNumber) - 1]);
        expect(Object.keys(q.choices!)).toEqual([..."アイウエオ"]);
        expect(q.question.length).toBeGreaterThan(10);
        expect(q.sourceAnswerUrl).toBe(source.url);
        expect(q.explanationCoverage).toBe("official-summary");
        if (q.hasImage) {
          expect(q.imageUrls?.length).toBeGreaterThan(0);
          for (const url of q.imageUrls!) expect(existsSync(`public${url}`)).toBe(true);
        }
      }
    }
    expect(formatYearSeason(2026, "published-april")).toBe("2026年4月公表問題");
    expect(formatYearSeason(2026, "published-october")).toBe("2026年10月公表問題");
  });
  it("does not expose staged data through public registries or loaders", async () => {
    expect(isExamPublished("blaster")).toBe(false);
    expect(ALL_QUESTIONS.some(q => q.exam === "blaster")).toBe(false);
    expect(await getQuestionsForExam("blaster")).toEqual([]);
  });
});

it("preserves the publisher correction note separately from the fifth choice", () => {
  const q = BLASTER_QUESTIONS.find(q => q.season === "published-april" && q.qNumber === 18)!;
  expect(q.question).toContain("修正し、公表しています");
  expect(q.choices?.オ).not.toContain("※");
  expect(q.answer).toBe("イ");
});
