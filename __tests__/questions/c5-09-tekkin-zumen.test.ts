import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TEKKIN_ZUMEN2_QUESTIONS } from "@/data/questions/tekkin-zumen2";
import { TEKKIN_ZUMEN1_QUESTIONS } from "@/data/questions/tekkin-zumen1";
import { TEKKIN_ZUMEN3_QUESTIONS } from "@/data/questions/tekkin-zumen3";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { ChoiceKey, Question } from "@/lib/questions/types";

// Read independently from the three official answer-table images (five per group).
const editions = [
  { exam: "tekkin-zumen1", year: 2023, corpus: TEKKIN_ZUMEN1_QUESTIONS, a: "○××○× ××○○○ ××××○ ○○××○ ×○××○", b: "ハロニハイ イイハニイ ハハロロニ ロイイロハ ニハイロイ", figures: [6, 9, 10, 11, 23, 24, 29, 33, 45] },
  { exam: "tekkin-zumen2", year: 2023, corpus: TEKKIN_ZUMEN2_QUESTIONS, a: "×○×○○ ○○○○× ○××○× ××○○○ ××○××", b: "イハロハハ イニロニニ ニロロニイ イロロニニ イロハニニ", figures: [5, 9, 10, 15, 18, 19, 21, 28, 30, 33, 34, 36, 38, 41, 45, 49] },
  { exam: "tekkin-zumen3", year: 2024, corpus: TEKKIN_ZUMEN3_QUESTIONS, a: "○×××× ○○×○○ ×○○×○ ○×××○ ○○××× ×○○×○", b: "", figures: [4, 6, 10, 11, 15, 19, 21, 23, 24, 26] },
] as const;

for (const { exam, year, corpus, a, b, figures } of editions) {
  const all = corpus.filter(q => q.year === year && q.season === "late");
  const official = (a + b).replaceAll(" ", "");
  describe(`${exam} ${year}年度後期`, () => {
    it("keeps every official answer through scoring, labels and distinct A/B routes", () => {
      expect(all).toHaveLength(b ? 50 : 30);
      expect(official).toHaveLength(all.length);
      expect(new Set(all.map(q => q.id)).size).toBe(all.length);
      expect(new Set(all.map(questionPagePath)).size).toBe(all.length);
      all.forEach((q, i) => {
        const isB = Boolean(b) && i >= 25;
        const n = isB ? i - 24 : i + 1;
        const label = b ? `${isB ? "B" : "A"}群 ${n}` : String(n);
        expect(q.qNumber).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(label);
        expect(q.officialAnswerNumber, q.id).toBe(official[i]);
        expect(q.answer, q.id).toBe(isB ? "アイウエ"["イロハニ".indexOf(official[i])] : official[i] === "○" ? "ア" : "イ");
        expect(formatQuestionAnswerForDisplay(q, q.answer), q.id).toBe(official[i]);
        expect(Object.keys(q.choices ?? {})).toEqual(isB ? ["ア", "イ", "ウ", "エ"] : ["ア", "イ"]);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
        for (const key of Object.keys(q.choices ?? {})) {
          expect(q.choiceExplanations?.[key as ChoiceKey], q.id).toMatch(key === q.answer ? /^正解。/ : /^不正解。/);
          if (isB) expect(choiceDisplayLabel(exam, key as ChoiceKey)).toBe("イロハニ"["アイウエ".indexOf(key)]);
        }
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        expect(questionSourceEdition(q)).toBe(`${year}年度後期`);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
      });
    });

    it("serves the complete edition from synchronous, lazy and mobile loaders", async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(corpus);
      expect(await getQuestionsForExam(exam)).toEqual(corpus);
      expect(await examContent(exam)).toEqual(corpus as Question[]);
      const generated = JSON.parse(readFileSync(join(process.cwd(), "mobile/src/generated/catalog.json"), "utf8"));
      expect(generated.exams.find((e: { code: string }) => e.code === exam)).toEqual(await examCatalog(exam));
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(b ? 50 : 30);
      expect(EXAM_CONFIGS[exam].seasons).toContain("late");
      expect(EXAM_CONFIGS[exam].nameFull).toContain("鉄筋施工（鉄筋施工図作成作業）");
      expect(all.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    });

    it("links each answer and required original figure to the reviewed official page", () => {
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/${year}-late.sources.json`), "utf8"));
      expect(source.review).toHaveLength(all.length);
      expect(source.choiceExplanationCount).toBe(all.reduce((sum, q) => sum + Object.keys(q.choices ?? {}).length, 0));
      expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && /^[a-f0-9]{64}$/.test(s.sha256))).toBe(true);
      expect(all.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      all.forEach((q, i) => {
        const review = source.review[i];
        expect(review.id).toBe(q.id);
        expect(review.officialAnswer).toBe(official[i]);
        expect(review.internalAnswer).toBe(q.answer);
        expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        expect(review.pdfPage).toBe(Number(q.sourcePdfUrl.split("#page=")[1]));
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: exam })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(official[i]);
        if (q.hasImage) {
          expect(q.imageUrls).toHaveLength(1);
          expect(q.imageAltTexts).toHaveLength(1);
          expect(q.imageAltTexts![0].length).toBeGreaterThan(5);
          const path = join(process.cwd(), "public", q.imageUrls![0]);
          expect(existsSync(path), q.id).toBe(true);
          const png = readFileSync(path);
          expect(png.readUInt32BE(16), q.id).toBeGreaterThan(100);
          expect(png.readUInt32BE(20), q.id).toBeGreaterThan(50);
        }
      });
    });
  });
}

it("checks independent bending, productivity and clear-spacing calculations", () => {
  expect(30 * 2).toBe(60);
  expect(TEKKIN_ZUMEN1_QUESTIONS[5].explanation).toContain("60N・m");
  expect(49 / (7 * 10)).toBeCloseTo(0.7);
  expect(TEKKIN_ZUMEN1_QUESTIONS[36].answer).toBe("ウ");
  expect(Math.max(25 * 1.5, 20 * 1.25, 25)).toBe(37.5);
  expect(TEKKIN_ZUMEN2_QUESTIONS[33].explanation).toContain("37.5");
});

it("keeps the official figure and answer for the ambiguous door symbol with a short note", () => {
  const q = TEKKIN_ZUMEN3_QUESTIONS[22];
  expect(q.officialAnswerNumber).toBe("×");
  expect(q.answer).toBe("イ");
  expect(q.hasImage).toBe(true);
  expect(q.explanation).toContain("注：");
});
