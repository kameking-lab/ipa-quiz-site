import { describe, expect, it } from "vitest";
import { HOSHASEN_STAGED_QUESTIONS } from "@/data/questions/hoshasen";
import audit from "@/data/questions/hoshasen/source-audit.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { existsSync } from "node:fs";
import held from "@/data/questions/hoshasen/held-2026-2-kagaku-q9.json";

describe("hoshasen unpublished source staging", () => {
  it("retains the distinct source sessions without publishing candidates", () => {
    expect(HOSHASEN_STAGED_QUESTIONS).toHaveLength(289);
    expect(new Set(HOSHASEN_STAGED_QUESTIONS.map(q => q.id)).size).toBe(289);
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "hoshasen");
    expect(entry?.status).toBe("ready-to-ingest");
    expect(entry?.examCode).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.id.startsWith("hoshasen-"))).toBe(false);
  });

  it("matches the separately transcribed official keys for all source sessions", () => {
    for (const [session, answers] of Object.entries(audit.answerKeys)) {
      const [yearText, gradeText, subjectCode] = session.split("-");
      const year = Number(yearText);
      const grade = Number(gradeText);
      const subject = subjectCode === "hourei" ? "法令" : subjectCode === "kagaku" ? "化学" : subjectCode === "seibutsu" ? "生物学" : subjectCode === "jitsumu" ? "実務" : "物理学";
      const questions = HOSHASEN_STAGED_QUESTIONS.filter(q => q.year === year && q.grade === grade && q.subject === subject);
      expect(questions.map(q => q.number)).toEqual(audit.stagedCoverage.find(c => c.year === year && c.grade === grade && c.subject === subject)?.numbers);
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

  it("keeps the disputed source question out of candidates without changing its official key", () => {
    expect(held.status).toBe("on-hold");
    expect(held.question.officialAnswerNumber).toBe(5);
    expect(HOSHASEN_STAGED_QUESTIONS.some(q => q.id === held.question.id)).toBe(false);
    expect(audit.heldQuestionIds).toEqual([held.question.id]);
  });

  it("retains the required diagram in private data and keeps subject IDs distinct", () => {
    for (const q of HOSHASEN_STAGED_QUESTIONS) {
      expect(q.id).toBe(`hoshasen-${q.grade}-${q.year}-${q.subject === "法令" ? "hourei" : q.subject === "化学" ? "kagaku" : q.subject === "生物学" ? "seibutsu" : q.subject === "実務" ? "jitsumu" : "butsuri"}-q${q.number}`);
      if (q.hasImage) {
        expect(q.imagePath).toMatch(/^data\/questions\/hoshasen\/figures\//);
        expect(existsSync(q.imagePath!)).toBe(true);
        expect(q.imageAltText!.length).toBeGreaterThan(10);
      }
    }
  });
});
