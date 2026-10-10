import { describe, expect, it } from "vitest";
import { EXAM_CONFIGS, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG, getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { KANRI_EIYOSHI_QUESTIONS } from "@/data/questions/kanri-eiyoshi";
import { KANRI_QUESTIONS } from "@/data/questions/kanri";

// The new occupation has no publishable fixed-ready question yet. The existing
// `kanri` code is a different qualification and must not be reused as an alias.
describe("kanri-eiyoshi publication gate", () => {
  it("keeps the new examination unlisted and its question pool empty", async () => {
    expect(getQualificationByExamCode("kanri-eiyoshi")?.status).toBe("terms-review-required");
    expect(isExamPublished("kanri-eiyoshi")).toBe(false);
    expect(KANRI_EIYOSHI_QUESTIONS).toEqual([]);
    expect(await getQuestionsForExam("kanri-eiyoshi")).toEqual([]);
    expect(getRegisteredExamCodes()).not.toContain("kanri-eiyoshi");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("kanri-eiyoshi");
    expect(QUALIFICATION_CATALOG.filter((entry) => entry.examCode === "kanri-eiyoshi")).toHaveLength(1);
    expect(EXAM_CONFIGS["kanri-eiyoshi"].sessions[0]?.expectedQuestions).toBe(97);
  });

  it("preserves the separately published building management qualification", async () => {
    expect(getQualificationByExamCode("kanri")?.shortName).toBe("管理業務主任者");
    expect(isExamPublished("kanri")).toBe(true);
    expect(KANRI_QUESTIONS).toHaveLength(100);
    expect(await getQuestionsForExam("kanri")).toHaveLength(100);
  });
});