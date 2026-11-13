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
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

function registeredQuestions(code: ExamCode) {
  const rows = QUESTIONS_BY_EXAM[code];
  if (!rows) throw new Error(`Missing registered questions: ${code}`);
  return rows;
}

// Official answer tables, transcribed separately from the question data.
const editions = [
  { code: "kikai-seizu2", year: 2025, a: "×○××○ ○○××○ ○○○×○ ○×××× ○×○○○", b: "イロハイイ イハイニハ ハニロニハ ニロロハイ ロニハニイ", figures: [2,4,9,10,11,14,22,25,26,34,36,37] },
  { code: "kikai-seizu3", year: 2025, a: "×○○×○ ○○×○○ ○×○×× ××○×○ ×○○×○ ○○××○", b: "", figures: [4,7,8,11,20,25] },
  { code: "plant-haikan-seizu1", year: 2024, a: "×○○○○ ○○×○○ ×○××○ ×××○○ ×○○○○", b: "ニハイイハ ハロニロロ ニハニハハ ハハニハイ ロイロニイ", figures: [2,4,9,10,26,27,28,40,43] },
] as const;

for (const { code, year, a, b, figures } of editions) {
  const rows = registeredQuestions(code);
  const official = (a + b).replaceAll(" ", "");
  const tfCount = b ? 25 : 30;
  describe(`${code} ${year}年度後期`, () => {
    it("scores every official answer with its original label and a unique resolvable URL", () => {
      expect(rows).toHaveLength(official.length);
      expect(new Set(rows.map(questionPagePath)).size).toBe(rows.length);
      rows.forEach((q, i) => {
        const isTf = i < tfCount;
        expect(q.qNumber).toBe(i + 1);
        expect(q.officialAnswerNumber).toBe(official[i]);
        expect(q.answer).toBe(isTf ? (official[i] === "○" ? "ア" : "イ") : "アイウエ"["イロハニ".indexOf(official[i])]);
        expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official[i]);
        expect(questionNumberLabel(q)).toBe(b ? `${isTf ? "A" : "B"}群 ${isTf ? i + 1 : i - 24}` : String(i + 1));
        expect(questionSourceEdition(q)).toBe(`${year}年度後期`);
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

    it("delivers the edition through web and mobile loaders and publishes its official attribution", async () => {
      expect(await getQuestionsForExam(code)).toEqual(rows);
      expect(await examContent(code)).toEqual(rows);
      const catalog = JSON.parse(readFileSync("mobile/src/generated/catalog.json", "utf8"));
      expect(catalog.exams.find((entry: {code: string}) => entry.code === code)).toEqual(await examCatalog(code));
      expect(EXAM_CONFIGS[code].sessions[0].expectedQuestions).toBe(rows.length);
      expect(EXAM_CONFIGS[code].seasons).toContain("late");
      expect(EXAM_CONFIGS[code].yearRange.start).toBe(year);
      rows.forEach(q => {
        expect(EXAM_CONFIGS[code].sessions[0].categories).toContain(q.category);
        const graph = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: code })["@graph"][0];
        if (!("hasPart" in graph) || !("acceptedAnswer" in graph.hasPart) || Array.isArray(graph.hasPart.acceptedAnswer)) throw new Error("Missing answer");
        expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
        expect(graph.hasPart.acceptedAnswer.text).toContain(q.officialAnswerNumber);
      });
    });

    it("retains complete readable figures and a source-page record for every question", () => {
      const source = JSON.parse(readFileSync(`data/questions/${code}/${year}-late.sources.json`, "utf8"));
      expect(source.review).toHaveLength(rows.length);
      expect(rows.filter(q => q.hasImage).map(q => q.qNumber)).toEqual(figures);
      rows.forEach((q, i) => {
        expect(q.sourcePdfUrl).toMatch(/https:\/\/www\.kentei\.javada\.or\.jp\/pdf\/.*#page=\d+$/);
        expect(source.review[i].pdfPage).toBe(Number(q.sourcePdfUrl.split("#page=")[1]));
        expect(q.sourceAttribution).toContain("機械・プラント製図");
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

it("explains the stress, centroid, parallel circuit and cantilever using independently calculated values", () => {
  const qs = registeredQuestions("kikai-seizu2");
  expect(73500 / 50 ** 2).toBe(29.4);
  expect(qs[7].explanation).toContain("29.4MPa");
  expect((200*5+200*20)/400).toBe(12.5);
  expect(qs[13].explanation).toContain("12.5mm");
  expect(220*330/(220+330)).toBe(132);
  expect(qs[46].explanation).toContain("132Ω");
  expect(1*1 + 2*0.5).toBe(2);
  expect(registeredQuestions("kikai-seizu3")[7].explanation).toContain("2PL");
  expect(2*19.6/9.8).toBe(4);
  expect(registeredQuestions("plant-haikan-seizu1")[13].explanation).toContain("4秒");
});
