import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { SOKURYOSHI_STAGED_QUESTIONS, SOKURYOSHI_STAGING } from "@/data/qualification-staging/sokuryoshi";
import source from "@/data/qualification-staging/sokuryoshi/source-manifest.json";
import keys from "@/data/qualification-staging/sokuryoshi/official-answer-keys.json";
import { validateSokuryoshiStaging } from "@/scripts/qualification-ingestion/validate-sokuryoshi";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getRegisteredExamCodes } from "@/lib/questions/get-questions";

// Independently fixed against the official one-page answer PDFs, not generated from question records.
const official2025 = [2,4,1,2,2,2,3,1,5,4,2,5,5,3,2,1,3,3,3,4,4,5,4,2,2,4,3,2];
const official2026 = [4,4,4,4,3,5,3,5,3,4,3,1,4,2,2,1,2,1,2,3,4,5,3,3,4,5,5,2];

describe("sokuryoshi: two complete private source-image rounds", () => {
  it("matches 56 official answers and covers every original exactly once", () => {
    expect(SOKURYOSHI_STAGED_QUESTIONS).toHaveLength(66);
    expect(new Set(SOKURYOSHI_STAGED_QUESTIONS.map(q=>q.id)).size).toBe(66);
    for (const [year, answers] of [[2025,official2025],[2026,official2026]] as const) {
      const questions = SOKURYOSHI_STAGED_QUESTIONS.filter(q=>q.year===year);
      const am = questions.filter(q=>q.type==="multiple-choice");
      expect(am.map(q=>q.officialQuestionNumber)).toEqual(Array.from({length:28},(_,i)=>i+1));
      expect(am.map(q=>q.officialAnswerNumber)).toEqual(answers);
      expect(keys[String(year) as keyof typeof keys].answers).toEqual(answers);
      expect(questions.filter(q=>q.type==="descriptive").map(q=>q.officialQuestionNumber)).toEqual([1,2,3,4,5]);
      for (const q of am) {
        expect(q.choices!.map(c=>c.officialNumber)).toEqual([1,2,3,4,5]);
        expect(new Set(q.choices!.map(c=>c.explanation)).size).toBe(5);
        for (const c of q.choices!) expect(c.explanation.length).toBeGreaterThan(25);
      }
    }
  });

  it("keeps questions, maps and answer diagrams out of public registries", () => {
    expect(SOKURYOSHI_STAGING.publicAllowed).toBe(false);
    for (const q of SOKURYOSHI_STAGED_QUESTIONS) {
      expect(q.publicAllowed).toBe(false);
      expect(q.needsReview).toBe(true); // human source review remains a separate publication prerequisite
    }
    expect(QUALIFICATION_CATALOG.some(q=>q.slug==="sokuryoshi")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES as readonly string[]).not.toContain("sokuryoshi");
    expect(getRegisteredExamCodes()).not.toContain("sokuryoshi");
    for (const p of ["public/questions/sokuryoshi","public/exam-library/sokuryoshi"]) expect(existsSync(p)).toBe(false);
    for (const file of ["data/questions/index.ts","lib/questions/get-questions.ts","lib/exam-library-catalog.ts"]) {
      expect(readFileSync(file,"utf8")).not.toContain("qualification-staging/sokuryoshi");
    }
  });

  it("verifies all 186 lossless source pages, retrieval records and page mappings", () => {
    expect(source.documents).toHaveLength(13);
    expect(source.documents.reduce((n,d)=>n+d.pages.length,0)).toBe(186);
    expect(source.missingPdfUrls).toEqual([]);
    expect(validateSokuryoshiStaging()).toEqual({count:66,errors:[]});
    const q21 = SOKURYOSHI_STAGED_QUESTIONS.filter(q=>q.session==="am"&&q.officialQuestionNumber===21);
    for (const q of q21) expect(q.originalQuestion.sourcePages).toHaveLength(2);
    for (const year of [2025,2026]) {
      const q3 = SOKURYOSHI_STAGED_QUESTIONS.find(q=>q.year===year&&q.session==="pm"&&q.officialQuestionNumber===3)!;
      expect(new Set(q3.originalQuestion.sourcePages.map(p=>p.documentId)).size).toBe(2);
    }
  });

  it("preserves descriptive answers as official examples with every question's two answer pages", () => {
    const pm = SOKURYOSHI_STAGED_QUESTIONS.filter(q=>q.type==="descriptive");
    expect(pm).toHaveLength(10);
    for (const q of pm) {
      expect(q.automaticScoringAllowed).toBe(false);
      expect(q.originalAnswer.format).toBe("official-example-images");
      expect(q.originalAnswer.sourcePages.map(p=>p.page)).toEqual([2*q.officialQuestionNumber-1,2*q.officialQuestionNumber]);
      expect(q.answerSheetPages).toHaveLength(2);
      expect(q.explanationSections!.length).toBeGreaterThanOrEqual(8);
      expect(q).not.toHaveProperty("officialAnswerNumber");
      expect(q).not.toHaveProperty("choices");
    }
    for (const round of SOKURYOSHI_STAGING.rounds) expect(round.instructions).toEqual({
      morningQuestionCount:28,mandatoryAfternoonNumber:1,optionalAfternoonNumbers:[2,3,4,5],requiredOptionalCount:2,
    });
  });

  it("retains no downloaded PDF binaries in the staging archive", () => {
    const files = readdirSync(join(process.cwd(),"data/qualification-staging/sokuryoshi"),{recursive:true});
    expect(files.filter(f=>String(f).endsWith(".pdf"))).toEqual([]);
  });
});
