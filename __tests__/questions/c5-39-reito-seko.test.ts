// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { REITO_SEKO1_QUESTIONS } from "@/data/questions/reito-seko1";
import { REITO_SEKO2_QUESTIONS } from "@/data/questions/reito-seko2";
import { REITO_SEKO3_QUESTIONS } from "@/data/questions/reito-seko3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import { examLabel } from "@/lib/utils";
import type { ChoiceKey } from "@/lib/questions/types";

// Printed order, independently transcribed from the three official answer PDFs.
const editions = [
  { code: "reito-seko1", rows: REITO_SEKO1_QUESTIONS,
    a: "○○○○× ○○×○○ ×○××× ○×○○× ×○○○○", b: "ニロイロロ ロイハロハ イイロイロ ハニロロハ ニニイイハ", figures: [23, 47, 48] },
  { code: "reito-seko2", rows: REITO_SEKO2_QUESTIONS,
    a: "×○××× ○○×○○ ○×○×× ××××× ××○○○", b: "ロハイロロ ロイハロロ ニニイハロ ニニイハイ ハハロイハ", figures: [32, 47] },
  { code: "reito-seko3", rows: REITO_SEKO3_QUESTIONS,
    a: "×××○× ×○×○○ ×○○○○ ×○××○ ××××○ ×××○○", b: "", figures: [28] },
] as const;

for (const { code, rows: corpus, a, b, figures } of editions) {
  const rows = corpus.filter(q => q.year === 2024 && q.season === "late");
  describe(`${code} 2024年度後期`, () => {
    const official = (a + b).replaceAll(" ", "");
    const tfCount = b ? 25 : 30;
    it("preserves official answers, group numbers, printed choice order and question routes", () => {
      expect(rows).toHaveLength(official.length);
      expect(new Set(rows.map(q => q.id)).size).toBe(rows.length);
      expect(new Set(rows.map(questionPagePath)).size).toBe(rows.length);
      rows.forEach((q, i) => {
        const isTf = i < tfCount;
        expect(q.year).toBe(2024);
        expect(q.season).toBe("late");
        expect(q.qNumber).toBe(i + 1);
        expect(q.officialAnswerNumber).toBe(official[i]);
        expect(q.answer).toBe(isTf ? (official[i] === "○" ? "ア" : "イ") : "アイウエ"["イロハニ".indexOf(official[i])]);
        expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official[i]);
        expect(questionNumberLabel(q)).toBe(b ? `${isTf ? "A" : "B"}群 ${isTf ? i + 1 : i - 24}` : String(i + 1));
        expect(questionSourceEdition(q)).toBe("2024年度後期");
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        expect(Object.keys(q.choices!)).toEqual(isTf ? ["ア", "イ"] : ["ア", "イ", "ウ", "エ"]);
        expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
        for (const key of Object.keys(q.choices!) as ChoiceKey[]) {
          expect(q.choiceExplanations?.[key]).toMatch(key === q.answer ? /^正解。/ : /^不正解。/);
          if (!isTf) expect(choiceDisplayLabel(code, key)).toBe("イロハニ"["アイウエ".indexOf(key)]);
        }
        const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(rows, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
      });
    });
    it("publishes the correct qualification name, configuration, web and mobile content", async () => {
      expect(await getQuestionsForExam(code)).toEqual(corpus);
      expect(await examContent(code)).toEqual(corpus);
      const catalog = JSON.parse(readFileSync("mobile/src/generated/catalog.json", "utf8"));
      expect(catalog.exams.find((entry: {code: string}) => entry.code === code)).toEqual(await examCatalog(code));
      expect(examLabel(code)).toBe(`冷凍空気調和機器施工技能士 ${code.at(-1)}級（冷凍空気調和機器施工作業）`);
      expect(getQualificationByExamCode(code)?.shortName).toBe(examLabel(code));
      expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(rows.length);
      expect(EXAM_CONFIGS[code].seasons).toEqual(["late"]);
      expect(EXAM_CONFIGS[code].yearRange.start).toBeLessThanOrEqual(2024);
      expect(EXAM_CONFIGS[code].yearRange.end).toBeGreaterThanOrEqual(2024);
      rows.forEach(q => {
        expect(EXAM_CONFIGS[code].sessions[0].categories).toContain(q.category);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: code })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(q.officialAnswerNumber);
      });
    });
    it("includes every original figure with the original source page and answer URL", () => {
      const source = JSON.parse(readFileSync(`data/questions/${code}/2024-late.sources.json`, "utf8"));
      expect(source.review).toHaveLength(rows.length);
      expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      rows.forEach((q, i) => {
        expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/R06-2-.*#page=\d+$/);
        expect(q.sourceAnswerUrl).toBe(source.sources[1].url);
        expect(source.review[i].pdfPage).toBe(Number(q.sourcePdfUrl!.split("#page=")[1]));
        if (q.hasImage) {
          const png = readFileSync(`public${q.imageUrls![0]}`);
          expect(png.readUInt32BE(16)).toBeGreaterThan(100);
          expect(png.readUInt32BE(20)).toBeGreaterThan(50);
          expect(q.imageAltTexts![0].length).toBeGreaterThan(5);
        }
      });
    });
  });
}

it("retains the official statement even when it contains a false value", () => {
  const thirdGrade = REITO_SEKO3_QUESTIONS.filter(q => q.year === 2024 && q.season === "late");
  const secondGrade = REITO_SEKO2_QUESTIONS.filter(q => q.year === 2024 && q.season === "late");
  expect(thirdGrade[1].question).toContain("約273K");
  expect(thirdGrade[1].explanation).toContain("約373K");
  expect(thirdGrade[25].question).toContain("100cm");
  expect(thirdGrade[25].explanation).toContain("1cm");
  expect(secondGrade[42].choices?.["ア"]).toContain("酸素");
  expect(secondGrade[42].officialAnswerNumber).toBe("イ");
});
