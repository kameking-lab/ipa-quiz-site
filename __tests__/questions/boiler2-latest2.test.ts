import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { BOILER2_QUESTIONS } from "@/data/questions/boiler2";
import { ALL_QUESTIONS } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import { choiceDisplayLabel } from "@/lib/questions/display";

const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;
// Independent pdftotext -layout snapshots, including the official ○ answer marks.
const normalize = (s: string) => s.replace(/[\s□]/g, "");
describe("boiler2 latest official publications", () => {
  it.each([
    ["spring", "april", "https://www.exam.or.jp/wp-content/uploads/2026/09/LC20260403.pdf"],
    ["autumn", "october", "https://www.exam.or.jp/wp-content/uploads/2026/10/LC20262103.pdf"],
  ])("preserves all 40 prompts, 200 choices and official marks: %s", (season, month, url) => {
    const raw = readFileSync(`__tests__/fixtures/boiler2/2026-${month}.txt`, "utf8")
      .replace(/二ボ\s+\d+\/19/g, "").replace(/\f/g, "\n")
      .replace(/〔[^〕]+〕/g, "").replace(/（終\s*り）/g, "")
      .replace(/^\s*せい\s+せい\s*$/gm, "");
    const starts = [...raw.matchAll(/^問\s*([０-９]+)\s+/gm)];
    const questions = BOILER2_QUESTIONS.filter(q => q.season === season);
    expect(starts).toHaveLength(40);
    expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
    starts.forEach((m, i) => {
      const block = raw.slice(m.index! + m[0].length, starts[i + 1]?.index);
      const options = [...block.matchAll(/^\s*(○)?（([１-５])）/gm)];
      const q = questions[i];
      expect(options).toHaveLength(5);
      expect(normalize(q.question)).toBe(normalize(block.slice(0, options[0].index)));
      options.forEach((o, j) => {
        const text = block.slice(o.index! + o[0].length, options[j + 1]?.index);
        expect(normalize(q.choices![keys[j]]!)).toBe(normalize(text));
        expect(q.choiceExplanations![keys[j]]!.length).toBeGreaterThan(40);
      });
      const answerIndex = options.findIndex(o => o[1] === "○");
      expect(q.answer).toBe(keys[answerIndex]);
      expect(q.officialAnswerNumber).toBe(String(answerIndex + 1));
      expect(q.sourcePdfUrl).toBe(url);
      expect(q.sourceAnswerUrl).toBe(url);
      expect(q.hasImage).toBe(false);
      expect(q.explanation).toContain(`正答は（${answerIndex + 1}）`);
    });
  });

  it("keeps two distinct periods and gates public lists and lazy loading", async () => {
    expect(new Set(BOILER2_QUESTIONS.map(q => q.id)).size).toBe(80);
    expect(EXAM_CONFIGS.boiler2.seasons).toEqual(["spring", "autumn"]);
    expect(isExamPublished("boiler2")).toBe(false);
    expect(JSON.stringify(getHomeDirectory())).not.toContain('"/boiler2"');
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("boiler2");
    expect(ALL_EXAM_CODES).not.toContain("boiler2");
    expect(getAvailableExams()).not.toContain("boiler2");
    expect(getRegisteredExamCodes()).not.toContain("boiler2");
    expect(ALL_QUESTIONS.some(q => q.exam === "boiler2")).toBe(false);
    expect(await getQuestionsForExam("boiler2")).toEqual([]);
    expect(choiceDisplayLabel("boiler2", "オ")).toBe("(5)");
  });
});
