import { describe, expect, it } from "vitest";
import { FORESTRY_CABLE_QUESTIONS } from "@/data/questions/forestry-cable";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const OFFICIAL_ANSWERS = {"autumn": [2, 3, 1, 4, 1, 4, 2, 2, 3, 1, 3, 3, 5, 2, 2, 1, 2, 3, 4, 1, 2, 1, 5, 1, 1, 5, 4, 3, 2, 5, 5, 2, 4, 4, 1, 2, 3, 3, 3, 2], "spring": [4, 3, 3, 5, 2, 4, 3, 3, 4, 3, 4, 3, 5, 4, 3, 2, 5, 3, 4, 1, 2, 1, 5, 3, 2, 1, 2, 5, 2, 5, 3, 3, 4, 1, 4, 4, 1, 2, 2, 1]};

describe("forestry-cable official latest two publications in staging", () => {
  it("keeps all 80 original questions and official answers", () => {
    expect(FORESTRY_CABLE_QUESTIONS).toHaveLength(80);
    expect(new Set(FORESTRY_CABLE_QUESTIONS.map(q => q.id)).size).toBe(80);
    for (const [season, paper, month] of [["autumn", "LC20262113", 10], ["spring", "LC20260413-1", 4]] as const) {
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/exam-library/papers/lckohyo-${paper}.json`), "utf8"));
      const questions = FORESTRY_CABLE_QUESTIONS.filter(q => q.season === season);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({length:40}, (_, i) => i+1));
      for (const q of questions) {
        expect(q.officialAnswerNumber).toBe(String(OFFICIAL_ANSWERS[season][q.qNumber - 1]));
        expect(q.officialAnswerNumber).toBe(String(source[q.qNumber-1].correctChoice));
        expect(q.answer).toBe("アイウエオ"[source[q.qNumber-1].correctChoice-1]);
        expect(Object.keys(q.choices!)).toEqual([..."アイウエオ"]);
        expect(Object.values(q.choices!).every(t => t!.length > 0)).toBe(true);
        expect(q.question.length).toBeGreaterThan(15);
        expect(q.question).not.toMatch(/[○〇◯]/);
        expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
        expect(q.sourcePdfUrl).toContain(`/2026/${String(month).padStart(2, "0")}/${paper}.pdf`);
        expect(questionSourceEdition(q)).toBe(`2026年${month}月公表問題`);
        expect(q.explanation).toContain("出題時点");
        expect(q.hasImage).toBe(!!q.imageUrls?.length);
        for (const url of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
      }
    }
  });
  it("withholds public registries and loaders", async () => {
    expect(isExamPublished("forestry-cable")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("forestry-cable");
    expect(QUESTIONS_BY_EXAM["forestry-cable"]).toBeUndefined();
    expect(await getQuestionsForExam("forestry-cable")).toEqual([]);
  });
});
