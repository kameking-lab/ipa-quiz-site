import { describe, expect, it } from "vitest";
import { EXAM_CONFIGS, ALL_EXAM_CODES } from "@/lib/exam-config";
import { isExamPublished, getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { GENGO_CHOKAKUSHI_PUBLISHED_QUESTIONS, GENGO_CHOKAKUSHI_QUESTIONS } from "@/data/questions/gengo-chokakushi";
import { examMetaDescription } from "@/lib/seo/exam-meta";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { examLabel } from "@/lib/utils";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";

const exam = "gengo-chokakushi" as const;

describe("speech-language-hearing therapist registration", () => {
  it("uses a separate medical exam code with two annual 100-question sessions", () => {
    const config = EXAM_CONFIGS[exam];
    expect(config.nameFull).toBe("言語聴覚士国家試験");
    expect(config.seasons).toEqual(["annual"]);
    expect(config.yearRange).toEqual({ start: 2023, end: 2026 });
    expect(config.sessions.map(({ session, expectedQuestions }) => [session, expectedQuestions])).toEqual([["am", 100], ["pm", 100]]);
    expect(examLabel(exam)).toBe("言語聴覚士");
    expect(ALL_EXAM_CODES).not.toContain(exam);
  });

  it("serves the three approved notices and excludes the later staging manuscript", async () => {
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(isExamPublished(exam)).toBe(true);
    const released = await getQuestionsForExam(exam);
    expect(released).toEqual(GENGO_CHOKAKUSHI_PUBLISHED_QUESTIONS);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(released);
    expect(examMetaDescription(exam, released.length)).toContain("第25・26回の公式採点通知から3問");
    expect(released.map(q => [q.id, q.officialAnswerNumber])).toEqual([
      ["gengo-chokakushi-2024-annual-am-q44", "3または4"],
      ["gengo-chokakushi-2024-annual-am-q96", "3または4"],
      ["gengo-chokakushi-2023-annual-am-q92", "4または5"],
    ]);
    const stagedIds = new Set(GENGO_CHOKAKUSHI_QUESTIONS.map(q => q.id));
    for (const q of released) {
      expect(stagedIds.has(q.id), q.id).toBe(false);
      expect(q.sourceAnswerUrl, q.id).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(q.requiredSelections).toBe(1);
      const choices = q.answer as string[];
      for (const choice of choices) expect(isCompleteSelectionCorrect(q.answer, [choice], q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, choices, q.requiredSelections)).toBe(false);
    }
  });

  it.each([
    [2025, "27A40", "第27回（2025年実施）"],
    [2026, "28A14", "第28回（2026年実施）"],
    [2026, "28A35", "第28回（2026年実施）"],
    [2026, "28A69", "第28回（2026年実施）"],
    [2026, "28A83", "第28回（2026年実施）"],
  ] as const)("labels only a verified official notice for %i", (year, pdf, expected) => {
    const url = `https://www.mhlw.go.jp/general/sikaku/successlist/${year}/siken21/dl/${pdf}.pdf`;
    expect(questionSourceEdition({ year, season: "annual", sourcePdfUrl: url })).toBe(expected);
    expect(questionSourceEdition({ year, season: "annual", sourcePdfUrl: url.replace("www.mhlw.go.jp", "example.com") })).not.toBe(expected);
    expect(questionSourceEdition({ year, season: "annual", sourcePdfUrl: url.replace(pdf, "27A41") })).not.toBe(expected);
    expect(questionSourceEdition({ year: year + 1, season: "annual", sourcePdfUrl: url })).not.toBe(expected);
  });
});
