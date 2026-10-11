import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import labBatch1 from "@/data/questions/rinsho-kensagishi/2025-annual-pm-batch1.json";
import type { Question } from "@/lib/questions/types";
import radBatch1 from "@/data/questions/shinryo-hoshasengishi/2025-annual-pm-batch1.json";
import labManifest from "@/data/questions/rinsho-kensagishi/source-manifest.json";
import radManifest from "@/data/questions/shinryo-hoshasengishi/source-manifest.json";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { examMetaDescription } from "@/lib/seo/exam-meta";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import ExamTopPage, { generateStaticParams } from "@/app/[exam]/page";

// These printed cells were independently read on the two official final-key PNGs.
const suites = [
  {
    exam: "rinsho-kensagishi", label: "臨床検査技師", round: 71, date: "2025-02-19",
    questions: labBatch1 as Question[], manifest: labManifest,
    official: { 2: "5", 4: "5", 10: "1", 11: "3", 13: "3", 14: "2", 21: "1", 24: "1", 27: "4", 29: "4" },
  },
  {
    exam: "shinryo-hoshasengishi", label: "診療放射線技師", round: 77, date: "2025-02-20",
    questions: radBatch1 as Question[], manifest: radManifest,
    official: { 11: "3", 17: "5", 19: "5", 22: "1", 23: "25", 25: "14", 28: "13", 30: "3", 37: "4", 38: "3" },
  },
] as const;
const keys = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("saved lab/radiology first twenty original questions", () => {
  for (const suite of suites) {
    it(`${suite.exam}: imports exactly the fixed ten originals through both loaders`, async () => {
      expect(await getQuestionsForExam(suite.exam)).toEqual(ALL_QUESTIONS.filter(q => q.exam === suite.exam));
      expect(suite.questions).toHaveLength(10);
      expect(suite.questions.map(q => q.qNumber)).toEqual(Object.keys(suite.official).map(Number));
      expect(new Set(suite.questions.map(q => q.id)).size).toBe(10);
      expect(ALL_QUESTIONS.filter(q => q.exam === suite.exam && suite.questions.some(original => original.id === q.id))).toEqual(suite.questions);
      const imported = new Set(suite.questions.map(q => `${suite.exam}-${suite.round}-pm-${q.qNumber}`));
      for (const held of suite.manifest.unimportedSavedIdentities) expect(imported.has(held), held).toBe(false);
      expect(suite.manifest.latestTwoRoundsComplete).toBe(false);
      expect(suite.manifest.currentPublishedOriginals).toBe(0);
      expect(suite.manifest.publicationGo).toBe(0);
      expect(suite.manifest.localPrimaryQaOriginals + suite.manifest.unimportedSavedOriginals).toBe(suite.manifest.storedCompleteDraftOriginals);
      expect(ALL_QUIZ_EXAM_CODES).toContain(suite.exam);
      expect(ALL_EXAM_CODES).not.toContain(suite.exam);
    });

    it(`${suite.exam}: retains official answer cells, five explanations, dates and original numbers`, () => {
      for (const q of suite.questions) {
        const official = suite.official[q.qNumber as keyof typeof suite.official];
        const receipt = Object.values(suite.manifest.sourceReceipts).find(r => r.questionId === q.id);
        expect(receipt, q.id).toBeDefined();
        expect(q.officialAnswerNumber, q.id).toBe(official);
        expect(receipt?.officialKeyCellLiteral, q.id).toBe(official);
        const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
        expect(answer.map(key => keys.indexOf(key as typeof keys[number]) + 1).join(""), q.id).toBe(official);
        expect(q.requiredSelections, q.id).toBe(String(official).length);
        expect(q.choices && Object.keys(q.choices), q.id).toEqual(keys);
        expect(q.choiceExplanations && Object.keys(q.choiceExplanations), q.id).toEqual(keys);
        for (const key of keys) expect(q.choiceExplanations?.[key]?.trim().length, `${q.id}/${key}`).toBeGreaterThan(10);
        expect(q.session, q.id).toBe("pm");
        expect(q.examDate, q.id).toBe(suite.date);
        expect(q.year, q.id).toBe(2025);
        expect(q.sourcePdfUrl, q.id).toMatch(/tp250428-(06|07)b_01\.pdf$/);
        expect(q.sourceAnswerUrl, q.id).toMatch(/tp250428-(06|07)seitou\.pdf$/);
        expect(q.sourceAttribution, q.id).toContain(`第${suite.round}回`);
        expect(q.sourceAttribution, q.id).toContain(`午後 問${q.qNumber}`);
        expect(q.explanationCoverage, q.id).toBe("full");
        expect(q.needsReview, q.id).toBe(false);
        expect(q.hasImage, q.id).toBe(false);
        expect(receipt?.savedExplanationRewritten, q.id).toBe(false);
        expect(receipt?.directOriginalPdfTextRecheck, q.id).toBe(true);
        expect(receipt?.directFinalKeyPdfRecheck, q.id).toBe(true);
      }
      expect(choiceDisplayLabel(suite.exam, "ア")).toBe("1");
      expect(choiceDisplayLabel(suite.exam, "オ")).toBe("5");
      expect(suite.manifest.choiceExplanationFields).toBe(50);
    });

    it(`${suite.exam}: exposes correct names and partial coverage on the hub, static question and quiz card`, async () => {
      expect(await generateStaticParams()).toContainEqual({ exam: suite.exam });
      const q = suite.questions[0]!;
      const edition = `第${suite.round}回（2025年実施）`;
      expect(questionSourceEdition(q)).toBe(edition);
      expect(questionSourceEdition({ ...q, sourcePdfUrl: `${q.sourcePdfUrl}#page=5` })).toBe(edition);
      const html = renderToStaticMarkup(await QuestionPage({ params: Promise.resolve({ exam: suite.exam, yearSeason: "2025-annual", section: "pm", qnum: `q${q.qNumber}` }) }));
      expect(html).toContain(suite.label);
      expect(html).toContain(edition);
      expect(html).toContain(q.sourcePdfUrl);
      expect(renderToStaticMarkup(<QuestionCard question={q} />)).toContain(edition);
      const hub = renderToStaticMarkup(await ExamTopPage({ params: Promise.resolve({ exam: suite.exam }) }));
      expect(hub).toContain(`${(await getQuestionsForExam(suite.exam)).length}原問を部分収録`);
      expect(hub).toContain("全問は未完備");
      for (const mode of [undefined, "year", "topic"] as const) {
        const description = examMetaDescription(suite.exam, 10, mode);
        expect(description).toContain("10原問を部分収録");
        expect(description).toContain("全問は未完備");
        expect(description).not.toContain("全1期分");
      }
    });
  }
});
