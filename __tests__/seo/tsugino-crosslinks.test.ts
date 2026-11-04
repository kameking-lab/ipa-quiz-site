import { expect, it } from "vitest";
import links from "@/__tests__/fixtures/tsugino-crosslinks-20261104.json";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import { findQualificationHub } from "@/lib/exam-qualification-hubs";
import { getQualificationHubEntries } from "@/lib/exam-qualification-hub-data";
import { getExamPaperStats } from "@/lib/exam-library-papers";
import { getAvailableExams, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import type { ExamCode } from "@/lib/questions/types";
import { referralPracticeHref } from "@/lib/questions/referral-practice";

it("resolves every XL1 published referral to its exact qualification/subject and a playable first question locally", () => {
  expect(links.mappings).toHaveLength(104);
  const available = getAvailableExams();
  for (const link of links.mappings) {
    const url = new URL(link.url);
    expect(url.hostname).toBe("www.kakomon-ai.jp");
    if (url.pathname === "/e-learning/exams") {
      const entries = EXAM_CATALOG.filter(entry => entry.group === url.searchParams.get("group") && entry.subject === url.searchParams.get("subject"));
      expect(entries.length, link.scope).toBeGreaterThan(0);
      expect(entries.some(entry => (getExamPaperStats(entry.id)?.questionCount ?? 0) > 0), link.scope).toBe(true);
    } else if (url.pathname.startsWith("/e-learning/exams/qualifications/")) {
      const hub = findQualificationHub(url.pathname.split("/").at(-1)!);
      expect(hub, link.scope).toBeDefined();
      expect(getQualificationHubEntries(hub!).some(entry => (getExamPaperStats(entry.id)?.questionCount ?? 0) > 0), link.scope).toBe(true);
    } else if (url.pathname !== "/chusho-secondary") {
      const exam = url.pathname.slice(1) as ExamCode;
      expect(available, link.scope).toContain(exam);
      const questions = getQuestionsByExamStrict(exam);
      const href = referralPracticeHref(questions, url.pathname);
      expect(href, link.scope).not.toBeNull();
      expect(new URL(href!, url).searchParams.get("exam"), link.scope).toBe(exam);
    }
  }
});
