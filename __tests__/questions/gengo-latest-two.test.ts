import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { GENGO_CHOKAKUSHI_CANDIDATES as candidates, GENGO_CHOKAKUSHI_QUESTIONS } from "@/data/questions/gengo-chokakushi";
import excluded from "@/data/questions/gengo-chokakushi/excluded.json";
import hashes from "@/docs/evidence/gengo-latest2/sha256.json";
import { ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { usesNumberedChoices } from "@/lib/questions/display";
import { getHomeDirectory } from "@/lib/home/home-directory";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";

describe("言語聴覚士の公式公開部分と未公開ゲート", () => {
  it("preserves official alternative answers as single selections", () => {
    expect(candidates.map(q => [q.year, q.qNumber, q.officialAnswerNumber, q.answer])).toEqual([
      [2026,14,"4または5",["エ","オ"]], [2026,35,"1または3",["ア","ウ"]],
      [2026,69,"1または2",["ア","イ"]], [2026,83,"1または2",["ア","イ"]],
      [2025,40,"3または4",["ウ","エ"]],
    ]);
    for (const q of candidates) {
      expect(q.requiredSelections).toBe(1);
      expect(q.question.length).toBeGreaterThan(5);
      expect(Object.keys(q.choices!)).toEqual(["ア","イ","ウ","エ","オ"]);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\/.*\.pdf$/);
      expect(q.sourceAnswerUrl).toContain("seitou.pdf");
      expect(q.hasImage).toBe(false);
      expect(q.needsReview).toBe(true);
    }
    expect(usesNumberedChoices("gengo-chokakushi")).toBe(true);
    expect(EXAM_CONFIGS["gengo-chokakushi"].yearRange).toEqual({start:2025,end:2026});
  });
  it("archives excluded questions without fabricating a gradeable answer", () => {
    expect(excluded.map(q => [q.qNumber,q.officialAnswerNumber])).toEqual([[36,"採点除外"],[48,"採点除外"]]);
    for (const q of excluded) {
      expect(q).not.toHaveProperty("answer");
      expect(q.question).not.toBe("");
      expect(Object.keys(q.choices)).toHaveLength(5);
      expect(candidates.some(c => c.year===q.year && c.qNumber===q.qNumber)).toBe(false);
    }
  });
  it("keeps staging out of public readers, routes, and directory", async () => {
    expect(isExamPublished("gengo-chokakushi")).toBe(false);
    expect(GENGO_CHOKAKUSHI_QUESTIONS).toEqual([]);
    expect(await getQuestionsForExam("gengo-chokakushi")).toEqual([]);
    expect(ALL_QUESTIONS.some(q => q.exam==="gengo-chokakushi")).toBe(false);
    expect(ALL_EXAM_CODES).not.toContain("gengo-chokakushi");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("gengo-chokakushi");
    expect(JSON.stringify(getHomeDirectory())).not.toContain('gengo-chokakushi');
    await expect(QuestionPage({params:Promise.resolve({exam:"gengo-chokakushi",yearSeason:"2026-annual",section:"am",qnum:"q14"})})).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
  it("retains the reviewed official PDF bytes", () => {
    expect(hashes).toHaveLength(9);
    for (const entry of hashes) {
      expect(createHash("sha256").update(readFileSync(`docs/evidence/gengo-latest2/${entry.file}`)).digest("hex")).toBe(entry.sha256);
    }
  });
});
