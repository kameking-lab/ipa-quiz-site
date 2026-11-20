import { describe, expect, it } from "vitest";
import { HOSHASEN_STAGED_QUESTIONS, HoshasenStagedQuestionSchema } from "@/data/questions/hoshasen";
import audit from "@/data/questions/hoshasen/source-audit.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { existsSync } from "node:fs";
import held from "@/data/questions/hoshasen/held-2026-2-kagaku-q9.json";

describe("hoshasen unpublished source staging", () => {
  it("batch1公開後: retains the distinct source sessions without publishing candidates", () => {
    expect(HOSHASEN_STAGED_QUESTIONS.filter(q => q.format !== "multi-part")).toHaveLength(703);
    expect(HOSHASEN_STAGED_QUESTIONS.filter(q => q.format === "multi-part")).toHaveLength(60);
    expect(HOSHASEN_STAGED_QUESTIONS).toHaveLength(audit.stagedQuestions);
    expect(new Set(HOSHASEN_STAGED_QUESTIONS.map(q => q.id)).size).toBe(audit.stagedQuestions);
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "hoshasen");
    expect(entry?.status).toBe("ready-to-ingest");
    expect(entry?.examCode).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.id.startsWith("hoshasen-"))).toBe(true);
  });

  it("matches the separately transcribed official keys for all source sessions", () => {
    for (const [session, answers] of Object.entries(audit.answerKeys)) {
      const [yearText, gradeText, subjectCode] = session.split("-");
      const year = Number(yearText);
      const grade = Number(gradeText);
      const subject = subjectCode === "hourei" ? "法令" : subjectCode === "kagaku" ? "化学" : subjectCode === "seibutsu" ? "生物学" : subjectCode === "jitsumu" ? "実務" : "物理学";
      const questions = HOSHASEN_STAGED_QUESTIONS.filter(q => q.format !== "multi-part").filter(q => q.year === year && q.grade === grade && q.subject === subject);
      const allNumbers = HOSHASEN_STAGED_QUESTIONS.filter(q => q.year === year && q.grade === grade && q.subject === subject).map(q => q.number).sort((a,b) => a-b);
      expect(allNumbers).toEqual(audit.stagedCoverage.find(c => c.year === year && c.grade === grade && c.subject === subject)?.numbers);
      expect(questions.map(q => q.officialAnswerNumber)).toEqual(answers);
      for (const q of questions) {
        expect(q.sourcePdfUrl).toContain(`R0${year - 2018}_${grade}_`);
        expect(q.sourceAnswerUrl).toContain(`R0${year - 2018}_${grade}seitou.pdf`);
      }
    }
  });

  it("preserves source acquisition evidence and reports incomplete coverage", () => {
    expect(audit.files).toHaveLength(36);
    expect(audit.files.every(f => f.bytes > 0 && /^[a-f0-9]{64}$/.test(f.sha256))).toBe(true);
    expect(audit.stagedQuestions).toBe(HOSHASEN_STAGED_QUESTIONS.length);
    expect(audit.stagedChoiceExplanations).toBe(HOSHASEN_STAGED_QUESTIONS.reduce((n,q) => n+(q.format === "multi-part" ? q.blanks.reduce((m,b) => m+b.choiceExplanations.length,0) : q.choiceExplanations.length),0));
    expect(audit.remainingPrimaryQuestions + audit.stagedQuestions).toBe(audit.officialPrimaryQuestions);
    expect(audit.unavailableRounds).toEqual([]);
  });

  it("preserves every multi-part blank and independently transcribed official key", () => {
    const multi = HOSHASEN_STAGED_QUESTIONS.filter(q => q.format === "multi-part");
    expect(multi.reduce((n,q) => n+q.blanks.length,0)).toBe(766);
    expect(multi.map(q => q.id).sort()).toEqual(Object.keys(audit.multiPartAnswerKeys).sort());
    for (const q of multi) {
      const expected = audit.multiPartAnswerKeys[q.id as keyof typeof audit.multiPartAnswerKeys];
      expect(Object.fromEntries(q.blanks.map(b => [b.id,b.officialAnswerNumber]))).toEqual(expected);
      const labels = [...q.question.matchAll(/\[([A-Z]|[ア-ン])\]/g)].map(m => m[1]);
      expect(new Set(labels)).toEqual(new Set(q.blanks.map(b => b.id)));
      expect(new Set(q.blanks.map(b => b.groupId))).toEqual(new Set(q.answerGroups.map(g => g.id)));
      const invalidKey = structuredClone(q);
      invalidKey.blanks[0].officialAnswerNumber = 100;
      expect(HoshasenStagedQuestionSchema.safeParse(invalidKey).success).toBe(false);
      const missingExplanation = structuredClone(q);
      missingExplanation.blanks[0].choiceExplanations.pop();
      expect(HoshasenStagedQuestionSchema.safeParse(missingExplanation).success).toBe(false);
      const missingGroup = structuredClone(q);
      missingGroup.blanks[0].groupId = "missing-group";
      expect(HoshasenStagedQuestionSchema.safeParse(missingGroup).success).toBe(false);
    }
  });

  it("covers first-grade papers and accounts for the unscored question", () => {
    for (const year of [2024, 2025, 2026]) {
      const first = HOSHASEN_STAGED_QUESTIONS.filter(q => q.year === year && q.grade === 1);
      expect(first).toHaveLength(year === 2024 ? 131 : 132);
      for (const [subject, count] of [["物理学", 32], ["化学", 32], ["生物学", 32], ["法令", 30], ["実務", 6]] as const) {
        const numbers = Array.from({ length: count }, (_, i) => i + 1)
          .filter(number => year !== 2024 || subject !== "生物学" || number !== 17);
        expect(first.filter(q => q.subject === subject).map(q => q.number).sort((a,b) => a-b)).toEqual(numbers);
      }
    }
    expect(audit.stagedQuestions).toBe(763);
    expect(audit.remainingPrimaryQuestions).toBe(7);
    expect(audit.heldPrimaryQuestions).toBe(1);
  });

  it("preserves the official all-answers-accepted ruling without a fictitious key", () => {
    const allScored = HOSHASEN_STAGED_QUESTIONS.find(q => q.id === "hoshasen-1-2023-butsuri-q18");
    expect(allScored).toMatchObject({ allAnswersAccepted: true, officialAnswerNumber: null });
    expect(HoshasenStagedQuestionSchema.safeParse({ ...allScored, officialAnswerNumber: 5 }).success).toBe(false);
    expect(HoshasenStagedQuestionSchema.safeParse({ ...allScored, allAnswersAccepted: false }).success).toBe(false);
    const accepted = HOSHASEN_STAGED_QUESTIONS.flatMap(q => q.format === "multi-part"
      ? q.blanks.filter(b => b.allAnswersAccepted).map(b => ({ q, b })) : []);
    expect(accepted.map(({ q, b }) => [q.id, b.id])).toEqual([["hoshasen-1-2025-kagaku-q31", "F"]]);
    const { q, b } = accepted[0]!;
    expect(b.officialAnswerNumber).toBeNull();
    expect(HoshasenStagedQuestionSchema.safeParse(q).success).toBe(true);
    const fictitiousKey = structuredClone(q);
    fictitiousKey.blanks.find(blank => blank.id === "F")!.officialAnswerNumber = 8;
    expect(HoshasenStagedQuestionSchema.safeParse(fictitiousKey).success).toBe(false);
    const unmarkedNull = structuredClone(q);
    unmarkedNull.blanks.find(blank => blank.id === "F")!.allAnswersAccepted = false;
    expect(HoshasenStagedQuestionSchema.safeParse(unmarkedNull).success).toBe(false);
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
