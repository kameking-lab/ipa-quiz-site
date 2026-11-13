import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { KINZOKU_PRESS1_QUESTIONS } from "@/data/questions/kinzoku-press1";
import { KINZOKU_PRESS2_QUESTIONS } from "@/data/questions/kinzoku-press2";
import { PLANT_HAIKAN1_QUESTIONS } from "@/data/questions/plant-haikan1";
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

// Independently transcribed from the official answer-table images, in groups of five.
const editions = [
  { exam: "kinzoku-press1", year: 2023, season: "early", corpus: KINZOKU_PRESS1_QUESTIONS, a: "○○××○ ×○○×× ×○○○○ ○○×○× ××○○×", b: "ロハロニロ ハニロニロ ロニハハハ ハロロハニ ニハイニロ", figures: [22, 34, 44, 47] },
  { exam: "kinzoku-press2", year: 2023, season: "early", corpus: KINZOKU_PRESS2_QUESTIONS, a: "○×○×○ ×○○×○ ○○××○ ×○○×○ ○××××", b: "イニロロイ イハニロニ イロロハイ ハロニイイ ハハロニハ", figures: [23, 30, 32, 41, 46, 49] },
  { exam: "plant-haikan1", year: 2025, season: "late", corpus: PLANT_HAIKAN1_QUESTIONS, a: "○○×○× ××○×○ ○××○× ○○○×○ ×○○×○", b: "ロニニロニ イイロイロ ハイハイハ ニニイニニ ニロイハハ", figures: [9, 10, 34] },
] as const;

for (const { exam, year, season, corpus, a, b, figures } of editions) {
  const all = corpus.filter(q => q.year === year && q.season === season);
  const official = (a + b).replaceAll(" ", "");
  const period = season === "early" ? "前期" : "後期";
  describe(`${exam} ${year}年度${period}`, () => {
    it("preserves all official answers in scoring, labels and distinct A/B routes", () => {
      expect(all).toHaveLength(50);
      expect(official).toHaveLength(50);
      expect(new Set(all.map(q => q.id)).size).toBe(50);
      expect(new Set(all.map(questionPagePath)).size).toBe(50);
      all.forEach((q, i) => {
        const isB = i >= 25;
        expect(q.qNumber).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(`${isB ? "B" : "A"}群 ${isB ? i - 24 : i + 1}`);
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
        expect(questionSourceEdition(q)).toBe(`${year}年度${period}`);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(all, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      });
    });

    it("serves the edition from synchronous, lazy and mobile loaders with an accurate catalog", async () => {
      expect(QUESTIONS_BY_EXAM[exam]).toEqual(corpus);
      expect(await getQuestionsForExam(exam)).toEqual(corpus);
      expect(await examContent(exam)).toEqual(corpus as Question[]);
      const generated = JSON.parse(readFileSync(join(process.cwd(), "mobile/src/generated/catalog.json"), "utf8"));
      expect(generated.exams.find((e: { code: string }) => e.code === exam)).toEqual(await examCatalog(exam));
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
      expect(EXAM_CONFIGS[exam].seasons).toContain(season);
      expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
      expect(all.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    });

    it("connects official pages, answers and complete original figures to each question", () => {
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/${year}-${season}.sources.json`), "utf8"));
      expect(source.review).toHaveLength(50);
      expect(source.choiceExplanationCount).toBe(150);
      expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && /^[a-f0-9]{64}$/.test(s.sha256))).toBe(true);
      expect(all.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      all.forEach((q, i) => {
        const work = exam.startsWith("kinzoku-press") ? "金属プレス作業" : "プラント配管作業";
        expect(q.sourceAttribution).toContain(work);
        expect(q.sourceAttribution).toContain(`${year - 2018}年度${period}`);
        expect(q.topicTags).toContain(work);
        expect(source.review[i].officialAnswer).toBe(official[i]);
        expect(source.review[i].internalAnswer).toBe(q.answer);
        expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        expect(source.review[i].pdfPage).toBe(Number(q.sourcePdfUrl.split("#page=")[1]));
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: exam })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(official[i]);
        if (q.hasImage) {
          expect(q.imageUrls).toHaveLength(1);
          expect(q.imageAltTexts?.[0].length).toBeGreaterThan(5);
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

it("explains extension and parallel resistance using independently calculated values", () => {
  expect((60 - 50) / 50 * 100).toBe(20);
  expect(KINZOKU_PRESS1_QUESTIONS[39].answer).toBe("ウ");
  expect(100 + (30 * 20) / (30 + 20)).toBe(112);
  expect(KINZOKU_PRESS1_QUESTIONS[46].explanation).toContain("112Ω");
  expect(100 / 20 + 100 / 30).toBeCloseTo(8.33333);
  const current = KINZOKU_PRESS2_QUESTIONS.find(q => q.year === 2023 && q.qNumber === 49)!;
  expect(current.answer).toBe("エ");
  expect(current.explanation).toContain("8.3A");
});

it("preserves the tensile-guarantee suffix and the official qualified carbon-content answer", () => {
  const steel = KINZOKU_PRESS2_QUESTIONS.find(q => q.year === 2023 && q.qNumber === 12)!;
  expect(steel.question).toContain("SPCCT");
  expect(steel.officialAnswerNumber).toBe("○");
  const carbon = PLANT_HAIKAN1_QUESTIONS[41];
  expect(carbon.officialAnswerNumber).toBe("ニ");
  expect(carbon.choices?.エ).toBe("0.35");
  expect(carbon.explanation).toContain("注：");
});
