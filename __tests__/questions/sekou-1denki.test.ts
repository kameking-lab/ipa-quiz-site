import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DENKI1_QUESTIONS, DENKI1_2025_QUESTIONS, DENKI1_2026_QUESTIONS } from "@/data/qualification-staging/sekou-1denki";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS, buildPdfUrl } from "@/lib/exam-config";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, usesNumberedChoices } from "@/lib/questions/display";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { filterQuestions, shuffleChoices } from "@/lib/questions/filter";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently transcribed from the official final-page answer tables, by row.
const official2026 = ["323222", "143411", "3344124134", "2424233241", "3143122241", "33", "12242323", "12", "431234", "4314123", "341341243", "1224134141", "324"].join("");
const official2025 = ["332223", "421113", "1313341441", "2321221133", "2434212343", "41", "42444134", "21", "354534", "4433344", "111243311", "2231132432", "414"].join("");

describe("1級電気工事施工管理 第一次 未公開ステージング", () => {
  it("keeps two complete annual papers with the original numbering", () => {
    expect(DENKI1_QUESTIONS).toHaveLength(178);
    expect(new Set(DENKI1_QUESTIONS.map(q => q.id)).size).toBe(178);
    for (const paper of [DENKI1_2026_QUESTIONS, DENKI1_2025_QUESTIONS]) {
      expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: 89 }, (_, i) => i + 1));
      expect(paper.every(q => q.exam === "denki1" && q.session === "gakka" && q.season === "annual")).toBe(true);
    }
    expect(EXAM_CONFIGS.denki1.sessions[0].expectedQuestions).toBe(89);
    expect(defaultPracticeSession("denki1")).toBe("gakka");
    expect(buildPdfUrl(EXAM_CONFIGS.denki1, 2026, "annual", EXAM_CONFIGS.denki1.sessions[0], "qs")).toBe("https://www.fcip-shiken.jp/pdf/r08_1dg_mondai.pdf");
    expect(buildPdfUrl(EXAM_CONFIGS.denki1, 2025, "annual", EXAM_CONFIGS.denki1.sessions[0], "ans")).toBe("https://www.fcip-shiken.jp/pdf/r07_1dg_mondai.pdf");
  });

  it("matches all 178 official answers and preserves four/five choice banks", () => {
    expect(DENKI1_2026_QUESTIONS.map(q => q.officialAnswerNumber).join("")).toBe(official2026);
    expect(DENKI1_2025_QUESTIONS.map(q => q.officialAnswerNumber).join("")).toBe(official2025);
    for (const q of DENKI1_QUESTIONS) {
      const keys = Object.keys(q.choices!);
      expect(keys).toHaveLength(q.qNumber >= 55 && q.qNumber <= 60 ? 5 : 4);
      expect(keys).toContain(q.answer);
      expect(choiceDisplayLabel(q.exam, q.answer as ChoiceKey)).toBe(q.officialAnswerNumber);
      expect(Object.keys(q.choiceExplanations!)).toEqual(keys);
      expect(Object.values(q.choiceExplanations!).every(reason => reason!.length > 10)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(hasUnrenderableContent(q), q.id).toBe(false);
    }
  });

  it("batch1公開後: excludes the new exam from every public registry and lazy loader", async () => {
    expect(getQualificationByExamCode("denki1")?.status).toBe("live");
    expect(isExamPublished("denki1")).toBe(true);
    expect(QUESTIONS_BY_EXAM.denki1).toBeDefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "denki1")).toBe(true);
    expect(ALL_QUIZ_EXAM_CODES).toContain("denki1");
    expect(ALL_EXAM_CODES).not.toContain("denki1");
    expect(getRegisteredExamCodes()).toContain("denki1");
    expect((await getQuestionsForExam("denki1")).length).toBeGreaterThan(0);
  });

  it("retains cropped figures, accessible descriptions and source-page attribution", () => {
    expect(DENKI1_QUESTIONS.filter(q => q.hasImage)).toHaveLength(21);
    for (const q of DENKI1_QUESTIONS) {
      expect(q.question).not.toMatch(/\uFFFD/);
      expect(q.sourcePdfUrl).toBe(`https://www.fcip-shiken.jp/pdf/r0${q.year - 2018}_1dg_mondai.pdf`);
      expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
      expect(q.sourceAttribution).toContain("一般財団法人建設業振興基金");
      expect(q.sourceAttribution).toContain(`No.${q.qNumber}`);
      expect(q.sourceAttribution).toContain(q.year === 2026 ? "正答 44ページ" : "正答 43ページ");
      if (q.hasImage) {
        expect(q.imageUrls).toHaveLength(1);
        expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
        expect(existsSync(join(process.cwd(), "public", q.imageUrls![0]))).toBe(true);
      }
    }
  });

  it("retains repaired formulas and explicit diagram-choice positions", () => {
    expect(DENKI1_2026_QUESTIONS[0].choices?.ウ).toBe("800ε₀〔F〕");
    expect(DENKI1_2026_QUESTIONS[17].choices?.イ).toContain("WS²/(8T)");
    expect(DENKI1_2025_QUESTIONS[11].choices?.ウ).toContain("1/3");
    expect(Object.values(DENKI1_2026_QUESTIONS[72].choices!)).toHaveLength(4);
    expect(DENKI1_2025_QUESTIONS[50].choices?.ウ).toContain("上から3段目");
    expect(DENKI1_2026_QUESTIONS[38].question).toContain("0.5 dB/m\n2 分岐器");
    expect(DENKI1_2026_QUESTIONS[38].question).not.toContain("dB/m²");
  });

  it("formats choices and answer feedback consistently as original numbers", () => {
    expect(usesNumberedChoices("denki1")).toBe(true);
    for (const question of [DENKI1_2026_QUESTIONS[0], DENKI1_2025_QUESTIONS[55]]) {
      expect(formatQuestionAnswerForDisplay(question, question.answer)).toBe(question.officialAnswerNumber);
    }
    for (const question of DENKI1_QUESTIONS) {
      expect(shuffleChoices(question), question.id).toBe(question);
    }
    expect(filterQuestions(DENKI1_QUESTIONS, { mode:"year", exam:"denki1", year:2026, inOrder:true })).toHaveLength(89);
  });

  it("attributes the question to FCIP without inventing a public reuse license", () => {
    const q=DENKI1_QUESTIONS[0];
    const structured=JSON.stringify(buildQuestionJsonLd({ question:q, pageUrlAbs:`https://example.test/q/${q.id}`, title:"test" }));
    expect(structured).toContain("一般財団法人建設業振興基金");
    expect(structured).not.toContain("ipa.go.jp");
    expect(q.license).toBe("FCIP-owner-confirmed");
  });
});
