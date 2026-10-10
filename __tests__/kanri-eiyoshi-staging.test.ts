import { describe, expect, it } from "vitest";
import { EXAM_CONFIGS, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG, getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { KANRI_EIYOSHI_QUESTIONS } from "@/data/questions/kanri-eiyoshi";
import { KANRI_QUESTIONS } from "@/data/questions/kanri";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { getIndexableQuestions, getSitemapQuestions } from "@/lib/seo/sitemap-pagination";

// `kanri` is a separate qualification and must not be reused as an alias.
describe("kanri-eiyoshi publication gate", () => {
  it("registers only the 17 source-verified originals from round 40 AM", async () => {
    expect(getQualificationByExamCode("kanri-eiyoshi")?.status).toBe("live");
    expect(isExamPublished("kanri-eiyoshi")).toBe(true);
    expect(KANRI_EIYOSHI_QUESTIONS).toHaveLength(17);
    expect(await getQuestionsForExam("kanri-eiyoshi")).toHaveLength(17);
    expect(getRegisteredExamCodes()).toContain("kanri-eiyoshi");
    expect(ALL_QUIZ_EXAM_CODES).toContain("kanri-eiyoshi");
    expect(QUALIFICATION_CATALOG.filter((entry) => entry.examCode === "kanri-eiyoshi")).toHaveLength(1);
    expect(EXAM_CONFIGS["kanri-eiyoshi"].sessions[0]?.expectedQuestions).toBe(97);
    const homeEntries = getHomeDirectory().flatMap((domain) => [...domain.featured, ...domain.compact]);
    expect(homeEntries.filter((entry) => entry.key === "kanri-eiyoshi")).toHaveLength(1);
    expect(homeEntries.find((entry) => entry.key === "kanri-eiyoshi")?.questionCount).toBe(17);
    expect(getIndexableQuestions().filter((question) => question.exam === "kanri-eiyoshi")).toHaveLength(17);
    expect(getSitemapQuestions().filter((question) => question.exam === "kanri-eiyoshi")).toHaveLength(17);
    expect(KANRI_EIYOSHI_QUESTIONS.map((question) => question.qNumber)).toEqual([7, 17, 20, 22, 28, 30, 32, 34, 35, 38, 70, 71, 73, 74, 75, 77, 81]);
    for (const question of KANRI_EIYOSHI_QUESTIONS) {
      expect(Object.keys(question.choices ?? {})).toHaveLength(5);
      expect(Object.keys(question.choiceExplanations ?? {})).toHaveLength(5);
      expect(Object.keys(question.choices ?? {})).toContain(question.answer);
      expect(question.hasImage).toBe(false);
      expect(question.sourcePdfUrl).toBe("https://www.mhlw.go.jp/content/10900000/001663681.pdf");
      expect(question.sourceAnswerUrl).toBe("https://www.mhlw.go.jp/content/10900000/001683038.pdf");
    }
  });

  it("preserves the separately published building management qualification", async () => {
    expect(getQualificationByExamCode("kanri")?.shortName).toBe("管理業務主任者");
    expect(isExamPublished("kanri")).toBe(true);
    expect(KANRI_QUESTIONS).toHaveLength(100);
    expect(await getQuestionsForExam("kanri")).toHaveLength(100);
  });
});
