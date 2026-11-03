import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { KENKI1_QUESTIONS } from "@/data/questions/kenki1";
import answers from "@/data/qualification-staging/kenki/level1/official-answers.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";

const keys = ["ア", "イ", "ウ", "エ"];
describe("kenki1 official two-year staging", () => {
  it("retains every original question and its official answer", () => {
    expect(KENKI1_QUESTIONS).toHaveLength(112);
    expect(new Set(KENKI1_QUESTIONS.map(q => q.id)).size).toBe(112);
    for (const year of [2025, 2026] as const) {
      const questions = KENKI1_QUESTIONS.filter(q => q.year === year);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 56 }, (_, i) => i + 1));
      for (const q of questions) {
        const official = answers[year][q.qNumber - 1];
        expect(q.officialAnswerNumber).toBe(String(official));
        expect(q.answer).toBe(keys[official - 1]);
        expect(Object.keys(q.choices ?? {})).toEqual(keys);
        expect(Object.values(q.choiceExplanations ?? {})).toHaveLength(4);
        for (const explanation of Object.values(q.choiceExplanations ?? {})) expect(explanation!.length).toBeGreaterThan(20);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/jcmanet-shiken.jp\/.*\.pdf#page=\d+$/);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\/jcmanet-shiken.jp\/.*\.pdf$/);
        expect([q.question, ...Object.values(q.choices ?? {})].join(" ")).not.toMatch(/\(cid:|方2法/);
      }
    }
  });
  it("keeps the complete figures and corrected units and symbols", () => {
    const figures = KENKI1_QUESTIONS.filter(q => q.hasImage);
    expect(figures).toHaveLength(3);
    for (const q of figures) {
      for (const url of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
    }
    const q52 = KENKI1_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 52)!;
    expect(q52.choices?.ア).toContain("8時間");
    expect(q52.choices?.イ).toContain("8時間");
    expect(KENKI1_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 34)?.choices?.ア).toBe("8日");
  });
  it("keeps both synchronous and lazy public loaders closed", async () => {
    expect(isExamPublished("kenki1")).toBe(false);
    expect(QUESTIONS_BY_EXAM.kenki1).toBeUndefined();
    expect(await getQuestionsForExam("kenki1")).toEqual([]);
  });
});

import { KENKI2_QUESTIONS } from "@/data/questions/kenki2";
import answers2 from "@/data/qualification-staging/kenki/level2/official-answers.json";
import { ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { defaultPracticeSession, parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import { questionPagePath } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

describe("kenki2 complete common and six species papers", () => {
  it("retains all 304 official questions, answers and four explanations", () => {
    expect(KENKI2_QUESTIONS).toHaveLength(304);
    expect(new Set(KENKI2_QUESTIONS.map(q => q.id)).size).toBe(304);
    expect(new Set(KENKI2_QUESTIONS.map(questionPagePath)).size).toBe(304);
    for (const year of [2025, 2026] as const) {
      for (const [i, config] of EXAM_CONFIGS.kenki2.sessions.entries()) {
        const qs = KENKI2_QUESTIONS.filter(q => q.year === year && q.session === config.session);
        expect(qs).toHaveLength(i === 0 ? 32 : 20);
        expect(qs.map(q => q.qNumber)).toEqual(Array.from({ length: config.expectedQuestions }, (_, j) => j + 1));
        const paper = i === 0 ? "共通" : `第${i}種` as keyof typeof answers2[2025];
        for (const q of qs) {
          const official = answers2[year][paper][q.qNumber - 1];
          expect(q.officialAnswerNumber).toBe(String(official));
          expect(q.answer).toBe(keys[official - 1]);
          expect(Object.keys(q.choices ?? {})).toEqual(keys);
          expect(Object.values(q.choiceExplanations ?? {})).toHaveLength(4);
          for (const text of Object.values(q.choiceExplanations ?? {})) expect(text!.length).toBeGreaterThan(20);
          expect(q.sourcePdfUrl).toMatch(/^https:\/\/jcmanet-shiken.jp\/.*\.pdf#page=\d+$/);
          expect(q.sourceAnswerUrl).toMatch(/^https:\/\/jcmanet-shiken.jp\/.*\.pdf$/);
          expect([q.question, ...Object.values(q.choices ?? {})].join(" ")).not.toMatch(/\(cid:|[¸´ˆ]|。\d/);
        }
        expect(parsePracticeSession(config.session)).toBe(config.session);
        expect(practiceSessionLabel(config.session, "kenki2")).toBe(config.label);
      }
    }
  });
  it("preserves figures, fractional conditions and the original calculation inputs", () => {
    const figures = KENKI2_QUESTIONS.filter(q => q.hasImage);
    expect(figures).toHaveLength(4);
    for (const q of figures) {
      expect(q.imageAltTexts?.[0]).toContain("原本");
      for (const url of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
    }
    const find = (year: number, session: string, n: number) => KENKI2_QUESTIONS.find(q => q.year === year && q.session === session && q.qNumber === n)!;
    expect(find(2025, "kenki-type3", 20).question).toContain("敷ならし作業回数：6回");
    expect(find(2025, "kenki-type3", 20).explanation).toContain("1200m²/h");
    expect(find(2025, "kenki-type5", 11).choices?.エ).toContain("0〜5mm");
    expect(find(2026, "kenki-type4", 11).choices?.イ).toContain("1/2");
    expect(find(2026, "kenki-type5", 14).choices?.ア).toContain("2/3〜3/4");
    expect(find(2025, "kyotsu", 31).choices?.イ).toContain("ドラグ・ショベル（バックホウ）");
  });
  it("keeps publication closed while preparing valid sessions and source attribution", async () => {
    expect(isExamPublished("kenki2")).toBe(false);
    expect(QUESTIONS_BY_EXAM.kenki2).toBeUndefined();
    expect(await getQuestionsForExam("kenki2")).toEqual([]);
    expect(ALL_EXAM_CODES).not.toContain("kenki1");
    expect(ALL_EXAM_CODES).not.toContain("kenki2");
    expect(defaultPracticeSession("kenki1")).toBe("gakka");
    expect(defaultPracticeSession("kenki2")).toBe("kyotsu");
    for (const q of [KENKI1_QUESTIONS[0], KENKI2_QUESTIONS[0]]) {
      const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: "出典確認", lastUpdatedISO: "2026-11-03" });
      expect(JSON.stringify(graph)).toContain("一般社団法人日本建設機械施工協会");
      expect(JSON.stringify(graph)).not.toContain("https://www.ipa.go.jp/shiken/faq.html");
    }
  });
});
