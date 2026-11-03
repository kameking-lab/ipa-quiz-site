import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { DIVER_QUESTIONS } from "@/data/questions/diver";
import sources from "@/data/questions/diver/sources.json";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { formatYearSeason } from "@/lib/utils";

describe("diver official latest two publications, staged", () => {
  it("preserves every question and marked answer from both papers", () => {
    expect(DIVER_QUESTIONS).toHaveLength(80);
    expect(new Set(DIVER_QUESTIONS.map(q => q.id)).size).toBe(80);
    for (const source of sources) {
      const paper = DIVER_QUESTIONS.filter(q => q.sourcePdfUrl === source.url);
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({length: 40}, (_, i) => i + 1));
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
    expect(isExamPublished("diver")).toBe(false);
    expect(ALL_QUESTIONS.some(q => q.exam === "diver")).toBe(false);
    expect(await getQuestionsForExam("diver")).toEqual([]);
  });
});
