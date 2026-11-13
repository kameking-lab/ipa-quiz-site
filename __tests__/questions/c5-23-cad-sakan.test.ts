import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examCatalog, examContent } from "@/mobile/shared/catalog-source";
import type { ChoiceKey } from "@/lib/questions/types";

// Independently read from the official answer tables, in printed order.
const editions = [
  { code: "kikai-seizu-cad2", year: 2023, season: "late", a: "××○○× ×○○○○ ××××× ○○○○○ ○○○×○", b: "ロニニニハ イニニイイ イハイロニ イニハハニ ニハハロイ", figures: [4,9,10,14,22,33,36] },
  { code: "kikai-seizu-cad3", year: 2023, season: "late", a: "○×××× ×○×○× ×○×○○ ×○○○○ ×○○×× ○○×××", b: "", figures: [2,8,11] },
] as const;

for (const { code, year, season, a, b, figures } of editions) {
  describe(`${code} ${year}年度${season}`, () => {
    const rows = QUESTIONS_BY_EXAM[code]!;
    const official = (a + b).replaceAll(" ", "");
    const tfCount = b ? 25 : 30;
    it("keeps every official answer, printed group number and fixed choice order", () => {
      expect(rows).toHaveLength(official.length);
      expect(new Set(rows.map(questionPagePath)).size).toBe(rows.length);
      rows.forEach((q, i) => {
        const isTf = i < tfCount;
        expect(q.qNumber).toBe(i + 1);
        expect(q.officialAnswerNumber).toBe(official[i]);
        expect(q.answer).toBe(isTf ? (official[i] === "○" ? "ア" : "イ") : "アイウエ"["イロハニ".indexOf(official[i])]);
        expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official[i]);
        expect(questionNumberLabel(q)).toBe(b ? `${isTf ? "A" : "B"}群 ${isTf ? i + 1 : i - 24}` : String(i + 1));
        expect(questionSourceEdition(q)).toBe(`${year}年度${season === "late" ? "後期" : "前期"}`);
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(shuffleChoices(q)).toBe(q);
        for (const key of Object.keys(q.choices ?? {}) as ChoiceKey[]) {
          expect(q.choiceExplanations?.[key]).toMatch(key === q.answer ? /^正解。/ : /^不正解。/);
          if (!isTf) expect(choiceDisplayLabel(code, key)).toBe("イロハニ"["アイウエ".indexOf(key)]);
        }
        const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(rows, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
      });
    });
    it("delivers the edition through web and mobile and attributes its structured data", async () => {
      expect(await getQuestionsForExam(code)).toEqual(rows);
      expect(await examContent(code)).toEqual(rows);
      const catalog = JSON.parse(readFileSync("mobile/src/generated/catalog.json", "utf8"));
      expect(catalog.exams.find((entry: {code: string}) => entry.code === code)).toEqual(await examCatalog(code));
      expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(rows.length);
      expect(EXAM_CONFIGS[code].seasons).toContain(season);
      expect(EXAM_CONFIGS[code].yearRange.start).toBe(year);
      rows.forEach(q => {
        expect(EXAM_CONFIGS[code].sessions[0].categories).toContain(q.category);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: code })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(q.officialAnswerNumber);
      });
    });
    it("includes each required original figure and records its source page", () => {
      const source = JSON.parse(readFileSync(`data/questions/${code}/${year}-${season}.sources.json`, "utf8"));
      expect(source.review).toHaveLength(rows.length);
      expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      rows.forEach((q, i) => {
        expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        expect(source.review[i].pdfPage).toBe(Number(q.sourcePdfUrl.split("#page=")[1]));
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

it("derives the lifting force, gear diameters and synchronous speed from the question values", () => {
  const rows = QUESTIONS_BY_EXAM["kikai-seizu-cad2"]!;
  expect(100 * (9.8 + 0.2)).toBe(1000);
  expect(rows[14].explanation).toContain("1000N");
  expect([1 * (60 + 2), 2 * (30 + 2), 3 * (20 + 2), 4 * (15 + 2)]).toEqual([62,64,66,68]);
  expect(rows[39].choiceExplanations?.エ).toContain("68mm");
  expect(120 * 60 / 6).toBe(1200);
  expect(rows[45].choiceExplanations?.エ).toContain("1200min⁻¹");
});
