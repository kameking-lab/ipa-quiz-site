import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { QUALIFICATION_CATALOG, getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { filterQuestions } from "@/lib/questions/filter";
import { getPoolIds } from "@/lib/questions/pool-server";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const groups = [
  { alias: "haidenban-kumitate3", canonical: "haiden-seigyo3", count: 90 },
  { alias: "haikan-plant1", canonical: "plant-haikan1", count: 150 },
  { alias: "haikan-plant2", canonical: "plant-haikan2", count: 150 },
] as const;

describe.each(groups)("release qualification consolidation: $canonical", ({ alias, canonical, count }) => {
  const questions = QUESTIONS_BY_EXAM[canonical]!;

  it("publishes all three editions once and keeps legacy ID and loader lookups", async () => {
    expect(questions).toHaveLength(count);
    expect([...new Set(questions.map(q => q.year))].sort()).toEqual([2023, 2024, 2025]);
    expect(questions.every(q => q.exam === canonical)).toBe(true);
    expect(new Set(questions.map(q => q.id)).size).toBe(count);
    expect(ALL_QUESTIONS.filter(q => q.exam === canonical)).toEqual(questions);
    expect(QUESTIONS_BY_EXAM[alias]).toBe(questions);
    expect(await getQuestionsForExam(alias)).toBe(questions);
    expect(await getQuestionsForExam(canonical)).toBe(questions);
    expect(getRegisteredExamCodes()).toContain(canonical);
    expect(getRegisteredExamCodes()).not.toContain(alias);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain(alias);
    expect(Object.keys(QUESTIONS_BY_EXAM)).not.toContain(alias);
  });

  it("offers one home card and catalog entry with every year accessible", () => {
    const cards = getHomeDirectory().flatMap(domain => [...domain.featured, ...domain.compact]);
    expect(cards.filter(card => card.key === canonical)).toHaveLength(1);
    expect(cards.find(card => card.key === canonical)).toMatchObject({ questionCount: count, periodLabel: "3期分" });
    expect(cards.some(card => card.key === alias)).toBe(false);
    const qualification = getQualificationByExamCode(canonical)!;
    expect(getQualificationByExamCode(alias)).toBe(qualification);
    expect(QUALIFICATION_CATALOG.filter(entry => entry.fullName === qualification.fullName)).toHaveLength(1);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(exam).toBe(canonical);
      expect(findQuestionByRoute(questions, { exam: alias, yearSeason, section, qnum })?.id).toBe(q.id);
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    }
  });

  it("keeps legacy quiz filters usable and counts a mixed-code group once", async () => {
    const expected = new Set(questions.map(q => q.id));
    expect(new Set(filterQuestions(ALL_QUESTIONS, { exam: alias, mode: "random" }).map(q => q.id))).toEqual(expected);
    const group = { examGroup: [alias, canonical], mode: "random" as const };
    const local = filterQuestions(ALL_QUESTIONS, group);
    const remote = await getPoolIds(group);
    expect(local).toHaveLength(count);
    expect(remote).toHaveLength(count);
    expect(new Set(remote)).toEqual(expected);
  });
});
