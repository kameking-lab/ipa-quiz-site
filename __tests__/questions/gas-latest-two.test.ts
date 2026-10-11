import { describe, it, expect } from "vitest";
import { GAS_EXAMS, getGasEssays } from "@/data/questions/gas/essays";
import { EXAM_CONFIGS, ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getAvailableExams, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { practiceSessionLabel } from "@/lib/questions/practice-session";

describe("Gas latest two complete original papers", () => {
  for (const exam of GAS_EXAMS) {
    it(`${exam}: all 116 original questions reach the native learning pool`, () => {
      const questions = getQuestionsByExamStrict(exam);
      expect(questions).toHaveLength(116);
      expect(new Set(questions.map(q => q.id)).size).toBe(116);
      for (const year of [2026, 2025]) {
        for (const [session, total] of [["gas-law",16],["gas-basic",15],["gas-technology",27]] as const) {
          const group = questions.filter(q => q.year === year && q.session === session);
          expect(group.map(q => q.qNumber).sort((a,b) => a-b)).toEqual(Array.from({length:total}, (_,i) => i+1));
          expect(group.every(q => q.needsReview === false && q.explanationCoverage === "full")).toBe(true);
        }
      }
    });
    it(`${exam}: non-IPA qualification and all offered optional questions are configured`, () => {
      expect(ALL_EXAM_CODES).not.toContain(exam);
      expect(ALL_QUIZ_EXAM_CODES).toContain(exam);
      expect(getAvailableExams()).toContain(exam);
      expect(EXAM_CONFIGS[exam].sessions.map(s => s.expectedQuestions)).toEqual([16,15,27]);
      expect(EXAM_CONFIGS[exam].yearRange).toEqual({start:2025,end:2026});
    });
    it(`${exam}: independent essay examples include each offered subject in both years`, () => {
      const questions = getGasEssays(exam);
      expect(questions).toHaveLength(8);
      for (const year of [2026,2025]) {
        expect(questions.filter(q=>q.year===year).map(q=>q.subject)).toEqual(["law","manufacturing","supply","consumption"]);
      }
      expect(questions.every(q=>q.officialAnswerPublished===false && q.answerKind==="independent-model")).toBe(true);
    });
  }
  it("gas subject labels distinguish reset question numbers",()=>{
    expect(practiceSessionLabel("gas-law")).toBe("法令");
    expect(practiceSessionLabel("gas-basic")).toBe("基礎");
    expect(practiceSessionLabel("gas-technology")).toBe("ガス技術");
  });
});
