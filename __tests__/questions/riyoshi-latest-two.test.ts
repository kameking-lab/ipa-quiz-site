import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { RIYOSHI_CANDIDATES, RIYOSHI_QUESTIONS } from "@/data/questions/riyoshi";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import crops from "@/docs/evidence/riyoshi-latest-two-20261011/image-crops.json";

const officialKeys = {
  first: [2,4,4,1,3,3,2,2,2,1,3,2,2,3,4,1,4,4,1,3,2,1,3,2,4,2,4,1,3,4,2,3,1,4,2,4,2,1,2,3,3,1,4,3,3,1,3,1,4,2,2,4,1,3,4],
  second: [3,4,3,2,1,1,4,3,3,1,1,2,3,4,2,3,4,2,2,1,2,3,2,1,4,1,1,3,4,4,4,3,1,3,2,4,1,2,2,4,1,2,3,1,2,4,3,1,2,4,4,4,2,3,3],
} as const;
describe("Riyoshi latest two official papers", () => {
  it("preserves all 55 originals and official keys for each sitting", () => {
    expect(RIYOSHI_CANDIDATES).toHaveLength(110);
    expect(new Set(RIYOSHI_CANDIDATES.map(q => [q.exam,q.year,q.season,q.session,q.qNumber].join("/"))).size).toBe(110);
    for (const season of ["first", "second"] as const) {
      const qs=RIYOSHI_CANDIDATES.filter(q=>q.season===season);
      expect(qs.map(q=>q.qNumber)).toEqual(Array.from({length:55},(_,i)=>i+1));
      expect(qs.map(q=>Number(q.officialAnswerNumber))).toEqual(officialKeys[season]);
      for(const q of qs) {
        expect(choiceDisplayLabel(q.exam,q.answer as "ア" | "イ" | "ウ" | "エ")).toBe(q.officialAnswerNumber);
        expect(Object.keys(q.choices ?? {})).toEqual(["ア","イ","ウ","エ"]);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア","イ","ウ","エ"]);
        expect(Object.values(q.choiceExplanations ?? {}).every(s=>s.trim().length>=10)).toBe(true);
        expect(q.explanationCoverage).toBe("full");
        expect(q.needsReview).toBe(false);
        expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.rbc\.or\.jp\/.*\.pdf#page=\d+$/);
        expect(q.lawReferenceDate).toBeUndefined();
      }
    }
  });
  it("keeps both complete candidate papers out of public pools until release", async () => {
    expect(isExamPublished("riyoshi")).toBe(false);
    expect(RIYOSHI_QUESTIONS).toEqual([]);
    expect(await getQuestionsForExam("riyoshi")).toEqual([]);
    expect(getRegisteredExamCodes()).not.toContain("riyoshi");
    expect(ALL_EXAM_CODES).not.toContain("riyoshi");
    expect(EXAM_CONFIGS.riyoshi.sessions[0]?.expectedQuestions).toBe(55);
  });
  it("uses official edition and numbered options", () => {
    expect(usesNumberedChoices("riyoshi")).toBe(true);
    for(const q of RIYOSHI_CANDIDATES)expect(questionSourceEdition(q)).toContain(q.season==="first"?"第53回":"第54回");
  });
  it("preserves seven exact figure crops, including all four diagram options", () => {
    expect(RIYOSHI_CANDIDATES.filter(q=>q.hasImage)).toHaveLength(4);
    expect(crops.images).toHaveLength(7);
    for(const image of crops.images) {
      const bytes=readFileSync(join(process.cwd(),"public",image.url));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(image.sha256);
      expect(bytes.readUInt32BE(16)).toBe(image.size[0]);
      expect(bytes.readUInt32BE(20)).toBe(image.size[1]);
    }
    const diagram=RIYOSHI_CANDIDATES.find(q=>q.season==="second"&&q.qNumber===48);
    expect(Object.keys(diagram?.choiceImageUrls ?? {})).toEqual(["ア","イ","ウ","エ"]);
  });
  it("explains dilution with consistent percentage units and distinguishes cystine", () => {
    const dilution=RIYOSHI_CANDIDATES.find(q=>q.season==="first"&&q.qNumber===25);
    expect(dilution?.choiceExplanations?.エ).toContain("10×5=0.1×V");
    expect(dilution?.choiceExplanations?.エ).toContain("全量500mL");
    const redox=RIYOSHI_CANDIDATES.find(q=>q.season==="second"&&q.qNumber===40);
    expect(redox?.question).toContain("システインを酸化する");
    expect(redox?.explanation).toContain("シスチンのジスルフィド結合を還元");
  });
});
