import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DOKUGEKI_CHIBA_REGISTRATION as corpus, scoreDokugekiChibaQuestion } from "@/data/qualification-staging/dokugeki-chiba";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { ALL_QUESTIONS } from "@/data/questions";
import { validateDokugekiChiba } from "@/scripts/validate-dokugeki-chiba";

// A second extraction with pdfplumber, independent of the PyMuPDF ingester.
// Exact printed order, including every cloze answer column in the agriculture papers.
const keys = {
  "2025-ippan": "51142313534434535235434432314142352514352145351342315245412324153345124215315432",
  "2025-nougyou": "51142313534434535235434432314142352514354513435121532412533442552143455413421415",
  "2025-tokutei": "51142313534434535235434432314142352514351354221541432524315141524215314532453211",
  "2026-ippan": "33222442345511453444224531255312141232445231425413342151524323145514353142251432",
  "2026-nougyou": "33222442345511453444224531255312141232442143541351241423541243254132521253543312",
  "2026-tokutei": "33222442345511453444224531255312141232444321513455124352143415431432534125215432",
};

describe("Chiba poison/deleterious substances private staging", () => {
  it.each(Object.entries(keys))("retains all 80 originals and the exact official key for %s", (edition, key) => {
    const rows = corpus.questions.filter(q => `${q.year}-${q.track}` === edition);
    expect(rows).toHaveLength(80);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 80 }, (_, i) => i+1));
    expect(rows.map(q => q.officialAnswerNumber).join("")).toBe(key);
    for (const q of rows) {
      expect(q.choices).toHaveLength(5);
      expect(q.choiceExplanations).toHaveLength(5);
      expect(new Set(q.choiceExplanations).size).toBe(5);
      for (let selected=1; selected<=5; selected++) {
        expect(scoreDokugekiChibaQuestion(q, selected)).toBe(selected === Number(key[q.qNumber-1]));
      }
      for (const invalid of [null, 0, 6, 1.5, NaN]) expect(scoreDokugekiChibaQuestion(q, invalid)).toBe(false);
      expect(q.explanation).toBe(q.choiceExplanations[q.officialAnswerNumber-1].replace(/^正解。/, ""));
      expect(q.sourceAttribution).toContain(q.trackLabel);
      expect(q.sourceAttribution).toContain(`（${q.qNumber}）`);
      expect(q.publicAllowed).toBe(false);
      expect(q.lawReferenceDate).toBeNull();
    }
  });

  it("keeps all 12 source receipts and 228 lossless pages out of public/", () => {
    expect(() => validateDokugekiChiba()).not.toThrow();
    expect(corpus.sources.unavailablePdfUrls).toEqual([]);
    for (const asset of corpus.sources.assets) {
      expect(asset.path).toMatch(/^data\/qualification-staging\/dokugeki-chiba\/assets\//);
      expect(existsSync(join(process.cwd(), "public", asset.path))).toBe(false);
      expect(createHash("sha256").update(readFileSync(join(process.cwd(), asset.path))).digest("hex")).toBe(asset.sha256);
    }
  });

  it("retains the multiple choice banks and continuation pages of original cloze questions", () => {
    const cloze = corpus.questions.filter(q => q.targetBlankNumber !== null);
    expect(cloze.map(q => `${q.year}/${q.qNumber}`)).toEqual([
      ...Array.from({ length: 13 }, (_,i) => `2025/${i+68}`),
      "2026/59", "2026/60", ...Array.from({ length: 6 }, (_,i) => `2026/${i+75}`),
    ]);
    for (const q of cloze) {
      expect(q.track).toBe("nougyou");
      expect(q.targetBlankNumber).toBe(q.qNumber);
      expect(q.sharedPrompt).toMatch(new RegExp(`[（(]\\s*${q.qNumber}\\s*[）)]`));
    }
    const q73 = cloze.find(q => q.year === 2025 && q.qNumber === 73)!;
    expect(q73.sourcePages).toEqual([40,41]);
    expect(q73.sharedPrompt).toContain("塩素酸ナトリウム");
    expect(q73.choices[0]).toContain("掃き集め");
    const q78 = cloze.find(q => q.year === 2025 && q.qNumber === 78)!;
    expect(q78.sourcePages).toEqual([42,43]);
    expect(q78.choices).toEqual(["黄緑色", "黒色", "白色", "赤色", "青色"]);
    expect(q78.officialAnswerNumber).toBe(4);
  });

  it("preserves combination column headings and footnotes rather than flattening the originals", () => {
    const combo = corpus.questions.find(q => q.year === 2026 && q.track === "ippan" && q.qNumber === 40)!;
    expect(combo.choiceHeader.replace(/\s/g, "")).toBe("アイウ");
    expect(combo.question).toContain("NaNO3");
    expect(combo.choiceExplanations[3]).toContain("Na₂SO₄");
    const q51 = corpus.questions.find(q => q.year === 2026 && q.track === "ippan" && q.qNumber === 51)!;
    expect(q51.postOptionContent).toContain("ジピリジリウム");
    expect(q51.originalText).toContain("※");
    expect(q51.sharedPrompt).toContain("問５");
  });

  it("separates official scoring from documented source wording issues", () => {
    const issue = corpus.questions.filter(q => q.needsReview);
    expect(issue).toHaveLength(6);
    for (const q of issue) expect(q.sourceIssue).toContain("原文");
    const sulfate = issue.filter(q => q.year === 2026);
    for (const q of sulfate) {
      expect(q.question).toContain("硫酸の官能基");
      expect(q.officialAnswerNumber).toBe(4);
      expect(q.explanation).toContain("スルホン酸");
      expect(scoreDokugekiChibaQuestion(q, 4)).toBe(true);
    }
    for (const q of issue.filter(q => q.year === 2025)) {
      expect(q.question).toContain("化学変化");
      expect(q.explanation).toContain("物理変化");
    }
  });

  it("keeps the slug unregistered and the catalog permission gate closed", () => {
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "dokugeki-chiba");
    expect(entry?.status).toBe("permission-required");
    expect(entry?.examCode).toBeUndefined();
    expect(entry?.stagingDataPath).toBe("data/qualification-staging/dokugeki-chiba");
    expect(corpus.publicAllowed).toBe(false);
    expect(Object.keys(EXAM_CONFIGS)).not.toContain("dokugeki-chiba");
    expect(ALL_QUESTIONS.some(q => String(q.exam) === "dokugeki-chiba")).toBe(false);
  });
});
