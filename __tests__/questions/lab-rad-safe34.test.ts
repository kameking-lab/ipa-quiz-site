import { describe, expect, it } from "vitest";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import { SHINRYO_HOSHASENGISHI_QUESTIONS } from "@/data/questions/shinryo-hoshasengishi";
import lab72 from "@/data/questions/rinsho-kensagishi/2026-annual-pm-batch1.json";
import rad77 from "@/data/questions/shinryo-hoshasengishi/2025-annual-pm-batch2.json";
import rad78 from "@/data/questions/shinryo-hoshasengishi/2026-annual-pm-batch1.json";
import receipt from "@/docs/evidence/lab-rad-cli-safe34-20261011/INTEGRATION.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { EXAM_CONFIGS } from "@/lib/exam-config";

const suites = [
  { qual: "rinsho-kensagishi", edition: 72, year: 2026, date: "2026-02-18", questions: lab72, paper: "tp260424-07b_01.pdf", keys: { 1: "2", 2: "4", 4: "5", 7: "1", 12: "3", 13: "4", 15: "1", 19: "4", 24: "5", 29: "3", 32: "2", 34: "1", 37: "12", 40: "2", 41: "13", 43: "2", 44: "5", 47: "5" } },
  { qual: "shinryo-hoshasengishi", edition: 77, year: 2025, date: "2025-02-20", questions: rad77, paper: "tp250428-06b_01.pdf", keys: { 40: "2", 43: "3", 46: "5", 47: "5" } },
  { qual: "shinryo-hoshasengishi", edition: 78, year: 2026, date: "2026-02-19", questions: rad78, paper: "tp260424-06b_01.pdf", keys: { 3: "1", 11: "4", 16: "34", 17: "5", 25: "2", 26: "5", 36: "2", 37: "3", 40: "23", 42: "1", 43: "2", 46: "5" } },
] as const;
const kana = ["ア", "イ", "ウ", "エ", "オ"];

describe("remaining safe34 saved lab/radiology originals", () => {
  it("loads exact additive IDs with no prior-original loss or duplicate", async () => {
    expect(RINSHO_KENSAGISHI_QUESTIONS).toHaveLength(35);
    expect(SHINRYO_HOSHASENGISHI_QUESTIONS).toHaveLength(26);
    for (const suite of suites) {
      expect(suite.questions.map(q => q.qNumber)).toEqual(Object.keys(suite.keys).map(Number));
      expect(suite.questions.map(q => q.id)).toEqual(Object.keys(suite.keys).map(n => `${suite.qual}-${suite.year}-annual-pm-q${n}`));
      const loaded = await getQuestionsForExam(suite.qual);
      expect(new Set(loaded.map(q => q.id)).size).toBe(loaded.length);
      for (const q of suite.questions) expect(loaded.find(r => r.id === q.id)).toEqual(q);
      expect(EXAM_CONFIGS[suite.qual].yearRange).toEqual({ start: 2025, end: 2026 });
    }
    expect(receipt.originals).toBe(34);
    expect(receipt.choiceExplanationFields).toBe(170);
    expect(receipt.requiredAnswerSelections).toBe(38);
    expect(receipt.publicationGo).toBe(0);
    expect(receipt.individualHoldReleaseCount).toBe(0);
  });

  it("preserves independently checked final cells, all five reasons, dates and editions", () => {
    for (const suite of suites) {
      const official: Record<number, string> = suite.keys;
      for (const q of suite.questions) {
        expect(q.examDate, q.id).toBe(suite.date);
        expect(q.year, q.id).toBe(suite.year);
        expect(q.officialAnswerNumber, q.id).toBe(official[q.qNumber]);
        const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
        expect(answer.map(k => kana.indexOf(k) + 1).join(""), q.id).toBe(official[q.qNumber]);
        expect(q.requiredSelections, q.id).toBe(official[q.qNumber]!.length);
        expect(Object.keys(q.choices), q.id).toEqual(kana);
        expect(Object.keys(q.choiceExplanations), q.id).toEqual(kana);
        for (const reason of Object.values(q.choiceExplanations)) expect(reason.trim().length).toBeGreaterThan(10);
        expect(q.hasImage, q.id).toBe(false);
        expect(q.needsReview, q.id).toBe(false);
        expect(q.sourcePdfUrl, q.id).toContain(suite.paper);
        expect(questionSourceEdition({ year: q.year, season: "annual", sourcePdfUrl: q.sourcePdfUrl }), q.id).toBe(`第${suite.edition}回（${suite.year}年実施）`);
        expect(questionSourceEdition({ year: q.year, season: "annual", sourcePdfUrl: `${q.sourcePdfUrl}#page=5` }), q.id).toBe(`第${suite.edition}回（${suite.year}年実施）`);
      }
    }
  });

  it("retains Opus authorship and rejects CLI full rewrites, with one explicit local reason correction", () => {
    const rows = Object.values(receipt.sourceReceipts);
    expect(rows).toHaveLength(34);
    for (const r of rows) {
      expect(r.authorModel).toBe("claude-opus-5-5");
      expect(r.verificationModel).toBe("gpt-5.6-sol");
      expect(r.cliRawFinalSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(r.firstPartyOpusReceiptSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(r.originalStemAndFiveChoicesWhitespaceNfkcMatch).toBe(true);
      expect(r.directFinalKeyPdfRecheck).toBe(true);
      expect(r.cliFullRewriteAccepted).toBe(false);
      expect(r.publicationGo).toBe(0);
    }
    expect(receipt.originalStemChoicesChanged).toBe(0);
    expect(receipt.savedProseFieldsChanged).toBe(1);
    const changed = rows.filter(r => r.savedExplanationRewritten);
    expect(changed.map(r => r.identity)).toEqual(["shinryo-hoshasengishi-78-pm-3"]);
    expect(rad78.find(q => q.qNumber === 3)?.choiceExplanations.オ).toContain("粒子を遮ることはあっても酸素を補うことはできず");
    expect(rad78.find(q => q.qNumber === 3)?.choiceExplanations.オ).not.toContain("ガスや粒子を除けても");
  });
});
