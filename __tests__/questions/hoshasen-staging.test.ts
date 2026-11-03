import { describe, expect, it } from "vitest";
import { HOSHASEN_STAGED_QUESTIONS } from "@/data/questions/hoshasen";
import audit from "@/data/questions/hoshasen/source-audit.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";

describe("hoshasen unpublished source staging", () => {
  it("retains the four distinct source sessions without publishing candidates", () => {
    expect(HOSHASEN_STAGED_QUESTIONS).toHaveLength(40);
    expect(new Set(HOSHASEN_STAGED_QUESTIONS.map(q => q.id)).size).toBe(40);
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "hoshasen");
    expect(entry?.status).toBe("ready-to-ingest");
    expect(entry?.examCode).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.id.startsWith("hoshasen-"))).toBe(false);
  });

  it("matches the separately transcribed official keys for all four sessions", () => {
    for (const [session, answers] of Object.entries(audit.answerKeys)) {
      const [year, grade] = session.split("-").map(Number);
      const questions = HOSHASEN_STAGED_QUESTIONS.filter(q => q.year === year && q.grade === grade);
      expect(questions.map(q => q.number)).toEqual([1,2,3,4,5,6,7,8,9,10]);
      expect(questions.map(q => q.officialAnswerNumber)).toEqual(answers);
      for (const q of questions) {
        expect(q.sourcePdfUrl).toContain(`R0${year - 2018}_${grade}_`);
        expect(q.sourceAnswerUrl).toContain(`R0${year - 2018}_${grade}seitou.pdf`);
      }
    }
  });

  it("preserves source acquisition evidence and reports incomplete coverage", () => {
    expect(audit.files).toHaveLength(20);
    expect(audit.files.every(f => f.bytes > 0 && /^[a-f0-9]{64}$/.test(f.sha256))).toBe(true);
    expect(audit.stagedQuestions).toBe(HOSHASEN_STAGED_QUESTIONS.length);
    expect(audit.stagedChoiceExplanations).toBe(HOSHASEN_STAGED_QUESTIONS.reduce((n,q) => n+q.choiceExplanations.length,0));
    expect(audit.remainingPrimaryQuestions + audit.stagedQuestions).toBe(audit.officialPrimaryQuestions);
    expect(audit.unavailableRounds).toEqual([]);
  });
});
