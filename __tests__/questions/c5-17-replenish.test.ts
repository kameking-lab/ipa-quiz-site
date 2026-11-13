import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

// Official answer-table images, independently read in groups of five.
const editions: { exam: ExamCode; year: number; season: "early" | "late"; a: string; b: string; figures: number[] }[] = [
  { exam: "bousui-frp2", year: 2023, season: "early", a: "○××○○ ○×○○× ○○×○× ○×○○× ○○○×○", b: "ロニハイイ イハニイロ ロハハイハ イロニロニ イロイニイ", figures: [3, 26, 27, 28] },
  { exam: "pan-seizo1", year: 2024, season: "late", a: "×○○○× ×○×○× ××○×○ ××○×○ ×○○○×", b: "ロイニハハ ニハハニハ ロイニロイ ロハイイロ ハイハニイ", figures: [] },
];

for (const { exam, year, season, a, b, figures } of editions) {
  const tfOnly = !b;
  const count = tfOnly ? 30 : 50;
  const official = (a + b).replaceAll(" ", "");
  const corpus = QUESTIONS_BY_EXAM[exam]!;
  const rows = corpus.filter(q => q.year === year && q.season === season);
  describe(`${exam} ${year}年度${season === "early" ? "前期" : "後期"}`, () => {
    it("keeps every official answer and preserves scoring, numbering and routes", () => {
      expect(rows).toHaveLength(count);
      expect(official).toHaveLength(count);
      expect(new Set(rows.map(q => q.id)).size).toBe(count);
      expect(new Set(rows.map(questionPagePath)).size).toBe(count);
      rows.forEach((q, i) => {
        const isB = !tfOnly && i >= 25;
        expect(q.qNumber).toBe(i + 1);
        expect(questionNumberLabel(q)).toBe(tfOnly ? `${i + 1}` : `${isB ? "B" : "A"}群 ${isB ? i - 24 : i + 1}`);
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
        expect(questionSourceEdition(q)).toBe(`${year}年度${season === "early" ? "前期" : "後期"}`);
        const [, , routeExam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(rows, { exam: routeExam, yearSeason, section, qnum })?.id).toBe(q.id);
      });
    });

    it("connects web and mobile loaders with matching counts, years and categories", async () => {
      expect(await getQuestionsForExam(exam)).toEqual(corpus);
      expect(await examContent(exam)).toEqual(corpus);
      const generated = JSON.parse(readFileSync(join(process.cwd(), "mobile/src/generated/catalog.json"), "utf8"));
      expect(generated.exams.find((e: { code: string }) => e.code === exam)).toEqual(await examCatalog(exam));
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(count);
      expect(EXAM_CONFIGS[exam].yearRange.start).toBeLessThanOrEqual(year);
      expect(rows.every(q => EXAM_CONFIGS[exam].sessions[0].categories.includes(q.category))).toBe(true);
    });

    it("links official question pages, answer sources and complete original figures", () => {
      const source = JSON.parse(readFileSync(join(process.cwd(), `data/questions/${exam}/${year}-${season}.sources.json`), "utf8"));
      expect(source.review).toHaveLength(count);
      expect(source.choiceExplanationCount).toBe(tfOnly ? 60 : 150);
      expect(source.sources.every((s: { httpStatus: number; sha256: string }) => s.httpStatus === 200 && /^[a-f0-9]{64}$/.test(s.sha256))).toBe(true);
      expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      rows.forEach((q, i) => {
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
