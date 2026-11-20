import { displayQuestionExplanation } from "@/lib/questions/explanation-display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { QuestionSourcePresentation } from "@/components/quiz/QuestionSourcePresentation";
import { ExplanationCard } from "@/components/quiz/ExplanationCard";
import { KANTEISHI_QUESTIONS } from "@/data/questions/kanteishi";
import { KAIKEISHI_QUESTIONS } from "@/data/questions/kaikeishi";
import reviewedManifest from "@/data/questions/pdl-reviewed-manifest.json";
import { isAcceptedAnswer } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isOfficialPastOnlyRequest } from "@/lib/questions/past-question-policy";
import { normalizePublicPdlQuestion } from "@/lib/questions/pdl-public";
import { findQuestionByRoute, parseQuestionRoute, parseQuestionYearSeason, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Keep the reviewed sessions separate from the added historical cohorts.
const reviewedAppraisal = KANTEISHI_QUESTIONS.filter((q) => q.year === 2025 || q.year === 2026);
const reviewedAccounting = KAIKEISHI_QUESTIONS.filter((q) => q.year === 2026);
const questions = [...reviewedAppraisal, ...reviewedAccounting];
const numberedKeys: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ"];

function sourceMarkup(question: Question, phase: "before" | "after"): string {
  return renderToStaticMarkup(<QuestionSourcePresentation question={question} phase={phase} />);
}

function explanationMarkup(question: Question): string {
  return renderToStaticMarkup(<ExplanationCard question={question} selected={String(question.answer)} isCorrect onNext={() => {}} />);
}

describe("locally connected PDL question data", () => {
  it("joins exactly the two screened exams and their actual sessions", () => {
    expect(reviewedAppraisal).toHaveLength(160);
    expect(reviewedAccounting).toHaveLength(186);
    expect(new Set(questions.map((q) => q.id)).size).toBe(346);
    expect(reviewedAppraisal.filter((q) => q.year === 2025)).toHaveLength(80);
    expect(reviewedAppraisal.filter((q) => q.year === 2026)).toHaveLength(80);
    expect(reviewedAppraisal.filter((q) => q.session === "gyosei")).toHaveLength(80);
    expect(reviewedAppraisal.filter((q) => q.session === "riron")).toHaveLength(80);
    expect(reviewedAccounting.filter((q) => q.season === "round1")).toHaveLength(93);
    expect(reviewedAccounting.filter((q) => q.season === "round2")).toHaveLength(93);
    expect(reviewedAccounting.filter((q) => q.session === "kigyo")).toHaveLength(40);
    expect(reviewedAccounting.filter((q) => q.session === "kanri")).toHaveLength(36);
    expect(reviewedAccounting.filter((q) => q.session === "kansa")).toHaveLength(40);
    expect(reviewedAccounting.filter((q) => q.session === "zaimu")).toHaveLength(70);
    const reviewedIds = new Set(questions.map((q) => q.id));
    expect(reviewedManifest.questions.filter(({ id }) => reviewedIds.has(id))).toHaveLength(346);
    expect(reviewedManifest.assets).toHaveLength(56);
  });

  it("preserves every numbered choice, reason and official grading key", () => {
    let appraisalReasons = 0;
    let accountingReasons = 0;
    let appraisalSections = 0;
    let accountingSections = 0;
    let appraisalTables = 0;
    let accountingStimulusQuestions = 0;
    let gridChoiceCount = 0;
    for (const q of questions) {
      const keys = Object.keys(q.choices ?? {}) as ChoiceKey[];
      expect(keys, q.id).toEqual(numberedKeys.slice(0, keys.length));
      expect(keys.length, q.id).toBe(q.exam === "kanteishi" ? 5 : keys.length);
      expect(keys.length, q.id).toBeGreaterThanOrEqual(5);
      expect(keys.length, q.id).toBeLessThanOrEqual(6);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(keys);
      expect(keys.every((key) => Boolean(q.choiceExplanations?.[key]?.trim())), q.id).toBe(true);
      expect(keys.includes(q.answer as ChoiceKey), q.id).toBe(true);
      expect(isAcceptedAnswer(q.answer, q.answer as string), q.id).toBe(true);
      expect(keys.filter((key) => isAcceptedAnswer(q.answer, key)), q.id).toEqual([q.answer]);
      expect(choiceDisplayLabel(q.exam, q.answer as ChoiceKey), q.id).toBe(String(keys.indexOf(q.answer as ChoiceKey) + 1));
      expect(q.originalContent?.choices && Object.keys(q.originalContent.choices), q.id).toEqual(keys);
      expect(q.needsReview, q.id).toBe(false);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      if (q.exam === "kanteishi") {
        appraisalReasons += keys.length;
        appraisalSections += q.explanationSections?.length ?? 0;
        appraisalTables += q.originalContent?.tables?.length ?? 0;
      } else {
        accountingReasons += keys.length;
        accountingSections += q.explanationSections?.length ?? 0;
        if (q.originalContent?.sharedPassages?.length) accountingStimulusQuestions++;
        gridChoiceCount += keys.filter((key) => q.choices?.[key]?.includes("| --- |")).length;
      }
    }
    expect(appraisalReasons).toBe(800);
    expect(accountingReasons).toBe(1106);
    expect(appraisalSections).toBe(70);
    expect(accountingSections).toBe(725);
    expect(appraisalTables).toBe(6);
    expect(accountingStimulusQuestions).toBe(24);
    expect(gridChoiceCount).toBe(30);
  });

  it("keeps 56 reviewed assets linked only through the manifest and image metadata", () => {
    const reviewed = new Map(reviewedManifest.questions.map((row) => [row.id, row]));
    const assetUrls = new Set(reviewedManifest.assets.map((asset) => asset.url));
    expect(assetUrls.size).toBe(56);
    for (const asset of reviewedManifest.assets) expect(asset.sha256).toMatch(/^[a-f0-9]{64}$/);
    for (const q of questions) {
      const row = reviewed.get(q.id);
      expect(row, q.id).toBeDefined();
      expect(q.sourcePdfUrl, q.id).toBe(row?.sourcePdfUrl);
      expect(q.sourceAnswerUrl, q.id).toBe(row?.sourceAnswerUrl);
      expect(q.license, q.id).toBe(row?.license);
      expect(q.imageUrls ?? [], q.id).toEqual(row?.images);
      expect(q.hasImage, q.id).toBe((row?.images.length ?? 0) > 0);
      expect(q.imageAltTexts?.length ?? 0, q.id).toBe(row?.images.length ?? 0);
      for (const url of q.imageUrls ?? []) expect(assetUrls.has(url), q.id).toBe(true);
    }
  });

  it("shows Q19's printed wording notice before and after the answer without changing official scoring", () => {
    const q = KANTEISHI_QUESTIONS.find((item) => item.id === "kanteishi-2025-gyosei-q19")!;
    expect(q.answer).toBe("オ");
    expect(choiceDisplayLabel(q.exam, q.answer as ChoiceKey)).toBe("5");
    expect(q.choiceFactTruth?.エ).toBeNull();
    expect(q.originalContent?.choices?.エ).toContain("景観区域内");
    expect(q.questionNotice).toContain("景観区域内");
    for (const phase of ["before", "after"] as const) {
      const html = sourceMarkup(q, phase);
      expect(html).toContain("景観区域内");
      expect(html).toContain("国土交通省");
      expect(html).toContain("過去問AI");
    }
    expect(explanationMarkup(q)).toContain(q.sourcePdfUrl);
    expect(explanationMarkup(q)).toContain(q.sourceAnswerUrl);
  });

  it("renders original tables and shared facts before answering and authored sections afterward", () => {
    const appraisal = KANTEISHI_QUESTIONS.find((q) => q.id === "kanteishi-2025-riron-q39")!;
    const accounting = KAIKEISHI_QUESTIONS.find((q) => q.id === "kaikeishi-2026-II-zaimu-q24")!;
    expect(appraisal.originalContent?.tables).toHaveLength(2);
    expect(sourceMarkup(appraisal, "before")).toContain("<table");
    expect(accounting.originalContent?.sharedPassages?.length).toBeGreaterThan(0);
    expect(sourceMarkup(accounting, "before")).toContain("共通設例");
    expect(sourceMarkup(accounting, "after")).toContain("独自に作成");
    expect(accounting.sourcePresentation?.originalAuthor).toBe("公認会計士・監査審査会");
    expect(accounting.sourcePresentation?.processor).toBe("過去問AI");
    expect(accounting.sourcePresentation?.processedParts.length).toBeGreaterThanOrEqual(3);
    const explanation = explanationMarkup(accounting);
    expect(explanation).toContain(accounting.sourcePdfUrl);
    expect(explanation).toContain(accounting.sourceAnswerUrl);
  });
});

describe("PDL route and admission boundaries", () => {
  it("parses both 2026 CPA rounds and keeps these IDs in past-question-only requests", () => {
    for (const q of reviewedAccounting.filter((item) => item.qNumber === 1)) {
      const path = questionPagePath(q);
      const [, , exam, yearSeason, section, qnum] = path.split("/");
      expect(parseQuestionRoute({ exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })).toMatchObject({
        exam: "kaikeishi", year: 2026, season: q.season, session: q.session, qNumber: 1,
      });
      expect(isOfficialPastOnlyRequest(q.exam, q.id)).toBe(true);
    }
    expect(findQuestionByRoute(KAIKEISHI_QUESTIONS, { exam: "kaikeishi", yearSeason: "2026-round3", section: "zaimu", qnum: "q1" })).toBeUndefined();
    expect(isOfficialPastOnlyRequest("kanteishi", "kanteishi-2025-riron-q01")).toBe(true);
  });

  it("recognizes both CPA rounds in the shared year and question parsers", () => {
    expect(parseQuestionYearSeason("2026-round1")).toEqual({ year: 2026, season: "round1" });
    expect(parseQuestionYearSeason("2026-round2")).toEqual({ year: 2026, season: "round2" });
  });

  it("rejects a new ID, image, URL, blank reason, or pending-review flag", () => {
    const seed = reviewedAppraisal[0]!;
    const changes: Array<(q: Question) => void> = [
      (q) => { q.id = "kanteishi-2025-gyosei-q99"; },
      (q) => { q.imageUrls = ["/questions/kanteishi/unreviewed.png"]; q.imageAltTexts = ["未確認図"]; q.hasImage = true; },
      (q) => { q.sourcePdfUrl = "https://example.invalid/unreviewed.pdf"; },
      (q) => { q.sourceAnswerUrl = "https://example.invalid/unreviewed-answer.pdf"; },
      (q) => { q.choiceExplanations!.ア = ""; },
      (q) => { q.needsReview = true; },
    ];
    for (const change of changes) {
      const changed = structuredClone(seed);
      change(changed);
      expect(() => normalizePublicPdlQuestion(changed)).toThrow();
    }
    expect(normalizePublicPdlQuestion(seed)).toBe(seed);
  });

  it("fails closed if Q19's official answer, unknown fact, or notice is altered", () => {
    const q19 = KANTEISHI_QUESTIONS.find((q) => q.id === "kanteishi-2025-gyosei-q19")!;
    const wrongAnswer = structuredClone(q19);
    wrongAnswer.answer = "エ";
    const wrongFact = structuredClone(q19);
    wrongFact.choiceFactTruth = { エ: true };
    const missingNotice = structuredClone(q19);
    missingNotice.questionNotice = "";
    for (const changed of [wrongAnswer, wrongFact, missingNotice]) {
      expect(() => normalizePublicPdlQuestion(changed)).toThrow();
    }
  });

  it("exposes the two chunks via the lazy registry only when published", async () => {
    const registered = getRegisteredExamCodes();
    for (const [exam, expected] of [["kanteishi", reviewedAppraisal], ["kaikeishi", reviewedAccounting]] as const) {
      const loaded = await getQuestionsForExam(exam);
      const years = new Set(expected.map((question) => question.year));
      const reviewed = loaded.filter((question) => years.has(question.year));
      expect(new Set(reviewed.map((question) => question.id))).toEqual(
        new Set(registered.includes(exam) ? expected.map((question) => question.id) : []),
      );
    }
  });
});

describe("published accounting commentary", () => {
  it("keeps authored bytes while displaying the accepted reader-facing pointer", () => {
    const needle = "個々の根拠はstatementAssessmentsを参照。";
    const authored = reviewedAccounting.flatMap((q) => Object.values(q.choiceExplanations ?? {}));
    expect(authored.filter((text) => text?.includes(needle))).toHaveLength(204);
    for (const q of KAIKEISHI_QUESTIONS) {
      for (const text of [q.explanation, ...Object.values(q.choiceExplanations ?? {})]) {
        expect(displayQuestionExplanation(q.exam, text)).not.toContain("statementAssessments");
      }
    }
    expect(displayQuestionExplanation("ap", needle)).toBe(needle);
  });
});
