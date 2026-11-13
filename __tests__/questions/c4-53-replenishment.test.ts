import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KIKAI_KENSA3_QUESTIONS } from "@/data/questions/kikai-kensa3";
import { KIKAI_KENSA1_QUESTIONS } from "@/data/questions/kikai-kensa1";
import { KATAWAKU3_QUESTIONS } from "@/data/questions/katawaku3";
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
  { exam: "kikai-kensa3", all: KIKAI_KENSA3_QUESTIONS, a: "××××○ ○×○○○ ××○○○ ××××○ ○○×○○ ○××○○", b: "", figures: [] },
  { exam: "kikai-kensa1", all: KIKAI_KENSA1_QUESTIONS, a: "○○××× ××○○× ××○×○ ○○○○× ○×○○×", b: "イロニロハ ロロイニハ ニイイニニ イハロイロ ニロロロニ", figures: [36, 48, 49] },
  { exam: "katawaku3", all: KATAWAKU3_QUESTIONS, a: "○○○○○ ×○○×× ××○○× ○×○×○ ○××○○ ×○○××", b: "", figures: [2, 3, 12, 25, 26] },
] as const;

for (const { exam, all: corpus, a, b, figures } of editions) {
  const all = corpus.filter(q => q.year === 2025 && q.season === "late");
  const official = (a + b).replaceAll(" ", "");
  describe(`${exam} 2025年度後期`, () => {
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
        expect(questionSourceEdition(q)).toBe("2025年度後期");
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
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(all.length);
      expect(EXAM_CONFIGS[exam].seasons).toContain("late");
      expect(all.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    });

    it("links each answer and required original figure to the reviewed official page", () => {
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/2025-late.sources.json`), "utf8"));
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
          expect(q.imageAltTexts![0].length).toBeGreaterThan(10);
          const path = join(process.cwd(), "public", q.imageUrls![0]);
          expect(existsSync(path), q.id).toBe(true);
          const png = readFileSync(path);
          expect(png.readUInt32BE(16), q.id).toBeGreaterThan(200);
          expect(png.readUInt32BE(20), q.id).toBeGreaterThan(50);
        }
      });
    });
  });
}

it("retains the individual X chart and the official R-chart error in B14", () => {
  const q = KIKAI_KENSA1_QUESTIONS.find(q => q.year === 2025 && q.season === "late" && q.qNumber === 39)!;
  expect(q.choices?.ア).toMatch(/^X管理図：/);
  expect(q.choiceExplanations?.ア).toContain("正しい");
  expect(q.choiceExplanations?.エ).toContain("範囲R");
  expect(q.officialAnswerNumber).toBe("ニ");
});

it("checks the numeric reasoning against the given loads, dimensions and circuit", () => {
  expect(30.18 - (30.03 - 30)).toBeCloseTo(30.15);
  expect(50.04 - (50.03 - 50.05)).toBeCloseTo(50.06);
  expect(Math.max(4 + 3 + 5 + 3, 4 + 5 + 3)).toBe(15);
  expect(500 / (Math.PI * 40 ** 2 / 4)).toBeCloseTo(0.398, 3);
  const parallel = 12 / 2.4 - 4;
  expect(1 / (1 / parallel - 1 / 2)).toBe(2);
  expect(KATAWAKU3_QUESTIONS.find(q => q.year === 2025 && q.season === "late" && q.qNumber === 12)!.explanation).toContain("15日");
  expect(KIKAI_KENSA1_QUESTIONS.find(q => q.year === 2025 && q.season === "late" && q.qNumber === 47)!.explanation).toContain("0.398");
  expect(KIKAI_KENSA1_QUESTIONS.find(q => q.year === 2025 && q.season === "late" && q.qNumber === 49)!.explanation).toContain("Bは2 Ω");
});
