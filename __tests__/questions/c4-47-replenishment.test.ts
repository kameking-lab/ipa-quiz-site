import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KAGAKU_BUNSEKI1_QUESTIONS } from "@/data/questions/kagaku-bunseki1";
import { KAGAKU_BUNSEKI3_QUESTIONS } from "@/data/questions/kagaku-bunseki3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ChoiceKey, ExamCode, Question } from "@/lib/questions/types";

// Read independently from the official answer-table images, five answers per group.
const editions: { exam: ExamCode; year: number; questions: Question[]; a: string; b: string }[] = [
  { exam: "kagaku-bunseki1", year: 2025, questions: KAGAKU_BUNSEKI1_QUESTIONS, a: "○○×○○ ×○×○○ ○××○× ×○○○○ ×○○×○", b: "イニニニニ ニニハハイ ニイロイハ ハハロハハ ニニニイロ" },
  { exam: "kagaku-bunseki3", year: 2025, questions: KAGAKU_BUNSEKI3_QUESTIONS, a: "○○○○× ××○○○ ×○××○ ○×○○× ○×○○× ×○×○○", b: "" },
];
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];

for (const { exam, year, questions: all, a, b } of editions) {
  const questions = all.filter(q => q.year === year);
  const tfOnly = exam.endsWith("3");
  describe(`${exam} ${year}年度前期`, () => {
    it("preserves each official answer and numbering through scoring, display and routes", () => {
      const count = tfOnly ? 30 : 50;
      const officialAnswers = (a + b).replaceAll(" ", "");
      expect(officialAnswers).toHaveLength(count);
      expect(questions).toHaveLength(count);
      expect(new Set(questions.map(q => q.id)).size).toBe(count);
      expect(new Set(questions.map(questionPagePath)).size).toBe(count);
      for (const [i, q] of questions.entries()) {
        const tf = tfOnly || i < 25;
        const n = tf ? i + 1 : i - 24;
        const group = tf ? "a" : "b";
        const official = officialAnswers[i];
        expect(q.id).toBe(`${exam}-${year}-early-gakka-${group}-${String(n).padStart(3, "0")}`);
        expect(q.qNumber).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(tfOnly ? `${n}` : `${group.toUpperCase()}群 ${n}`);
        expect(q.officialAnswerNumber, q.id).toBe(official);
        expect(q.answer, q.id).toBe(tf ? (official === "○" ? "ア" : "イ") : keys["イロハニ".indexOf(official)]);
        expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(official);
        expect(Object.keys(q.choices ?? {})).toHaveLength(tf ? 2 : 4);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
        expect(Object.values(q.choiceExplanations ?? {}).every(text => text!.length > 12), q.id).toBe(true);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        expect(questionSourceEdition(q)).toBe(`${year}年度前期`);
        expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(questions, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      }
      expect(questions.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0)).toBe(tfOnly ? 60 : 150);
    });

    it("connects loading, filters and original answer/source labels", async () => {
      expect(QUESTIONS_BY_EXAM[exam]?.filter(q => q.year === year)).toEqual(questions);
      expect((await getQuestionsForExam(exam)).filter(q => q.year === year)).toEqual(questions);
      expect(keys.slice(0, tfOnly ? 2 : 4).map(k => choiceDisplayLabel(exam, k)).join("")).toBe(tfOnly ? "○×" : "イロハニ");
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(tfOnly ? 30 : 50);
      expect(questions.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category!))).toBe(true);
      expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
      expect(EXAM_CONFIGS[exam].yearRange.end).toBeGreaterThanOrEqual(year);
      expect(questions.some(q => q.hasImage)).toBe(false);
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/${year}-early.sources.json`), "utf8"));
      expect(source.review).toHaveLength(questions.length);
      expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && s.sha256.length === 64)).toBe(true);
      for (const [i, entry] of source.review.entries()) {
        expect(entry.officialAnswer).toBe(questions[i].officialAnswerNumber);
        expect(entry.internalAnswer).toBe(questions[i].answer);
        expect(entry.pdfPage).toBe(Number(questions[i].sourcePdfUrl!.split("#page=")[1]));
        const graph = buildQuestionJsonLd({ question: questions[i], pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(questions[i])}`, title: "化学分析" })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(questions[i].officialAnswerNumber);
      }
    });
  });
}

it("preserves the 2025 grade-1 underlined alternatives, source wording and hydrate calculation", () => {
  const q = KAGAKU_BUNSEKI1_QUESTIONS.filter(q => q.year === 2025);
  expect(q[30].question).toContain("（ニ）数");
  expect(q[31].choices?.ウ).toContain("硫化銅（Ⅱ）・五水和物");
  expect(q[31].choiceExplanations?.ウ).toContain("原文のまま");
  expect(q[45].choices?.エ).toContain("下線：Cl₂");
  expect(q[49].question).toContain("CuSO₄=160");
  expect(q[49].choiceExplanations?.イ).toContain("121.6");
});

it("preserves the 2025 grade-3 concentration ratio, significant figures and false statements", () => {
  expect(KAGAKU_BUNSEKI3_QUESTIONS[13].question).toContain("C_Fe²⁺ / C_Fe³⁺");
  expect(KAGAKU_BUNSEKI3_QUESTIONS[16].question).toContain("1.9983 mol");
  expect(KAGAKU_BUNSEKI3_QUESTIONS[16].explanation).toContain("2.0 mol");
  expect(KAGAKU_BUNSEKI3_QUESTIONS[19].question).toContain("強酸性");
  expect(KAGAKU_BUNSEKI3_QUESTIONS[27].question).toContain("溶解度が低い塩ほど大きくなる");
});
