import { describe, expect, it } from "vitest";
import basic from "@/data/questions/fp1/2026-september-q36-q50.json";
import applied from "@/data/questions/fp1/applied-2026-september-q61-q65.json";
import mayLaunch from "@/data/questions/fp1/launch.json";
import mayAddition from "@/data/questions/fp1/2026-may-addition.json";
import { FP1_QUESTIONS } from "@/data/questions/fp1";
import { parseQuestionBlocks } from "@/components/quiz/QuestionBody";
import { parseFp1AppliedExtension } from "@/lib/fp1/applied-extension";
import { getFp1ExtensionQuestions } from "@/lib/fp1/published-extension";
import { renderFpPracticalSitemapXml } from "@/lib/seo/sitemap-xml";

const letters = ["ア", "イ", "ウ", "エ"] as const;
const official = [3, 1, 4, 1, 4, 4, 4, 3, 4, 1, 4, 2, 1, 2, 4];

describe("FP1 September 2026 finite sourced addition", () => {
  it("includes basic questions 36–50, preserving all 50 May objects", () => {
    expect(basic.map((q) => q.qNumber)).toEqual(Array.from({ length: 15 }, (_, i) => 36 + i));
    expect(FP1_QUESTIONS.filter((q) => q.year === 2026 && q.season === "may")).toEqual([...mayLaunch, ...mayAddition].sort((a, b) => a.qNumber - b.qNumber));
    const septemberNumbers = new Set(FP1_QUESTIONS.filter((q) => q.year === 2026 && q.season === "september").map((q) => q.qNumber));
    expect(basic.every((q) => septemberNumbers.has(q.qNumber))).toBe(true);
    expect(new Set(FP1_QUESTIONS.map((q) => q.id)).size).toBe(FP1_QUESTIONS.length);
  });

  it("binds all 15 official answers and all 60 distinct choice explanations", () => {
    for (const [index, q] of basic.entries()) {
      expect(Number(q.officialAnswerNumber)).toBe(official[index]);
      expect(q.answer).toBe(letters[official[index]! - 1]);
      expect(Object.keys(q.choices)).toEqual([...letters]);
      expect(Object.keys(q.choiceExplanations)).toEqual([...letters]);
      expect(Object.values(q.choiceExplanations).every((x) => x.length >= 20)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.lawReferenceDate).toBe("2026-04-01");
      expect(q.sourcePdfUrl).toContain("/202609/fp01_g_kiso.pdf");
    }
  });

  it("keeps Q47's five-row gift table readable by the existing renderer", () => {
    const q47 = basic.find((q) => q.qNumber === 47)!;
    const table = parseQuestionBlocks(q47.question).find((block) => block.kind === "table");
    expect(table?.header).toHaveLength(5);
    expect(table?.rows).toHaveLength(5);
    expect(q47.question).toContain("|2025-12-30|二男C|現金|相続時精算課税|500万円|");
    expect(q47.answer).toBe("イ");
  });

  it("publishes the applied 5 originals and 18 official slots outside the basic pool", () => {
    const data = parseFp1AppliedExtension(applied);
    expect(data.edition).toBe("202609");
    expect(data.questions.map((q) => q.number)).toEqual([61, 62, 63, 64, 65]);
    expect(data.questions.reduce((sum, q) => sum + (q.type === "originalmixedcloze" ? q.fields.length : q.answers.length), 0)).toBe(18);
    const publishedNumbers = new Set(getFp1ExtensionQuestions("202609").map((q) => q.number));
    expect([61, 62, 63, 64, 65].every((number) => publishedNumbers.has(number))).toBe(true);
    expect(FP1_QUESTIONS.every((q) => q.qNumber <= 50)).toBe(true);
    const q64 = data.questions.find((q) => q.number === 64)!;
    expect(q64.law.evidenceUrls).toContain("https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka/kaisei/260300/01.htm");
    expect(q64.law.evidenceUrls).toContain("https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka_new/08/04.htm");
  });

  it("includes all five Q61–65 September applied questions in the sitemap", () => {
    const xml = renderFpPracticalSitemapXml();
    for (const n of [61, 62, 63, 64, 65]) expect(xml).toContain(`/fp1/applied/202609/${n}`);
  });
});
