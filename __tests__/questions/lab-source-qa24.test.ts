import { describe, expect, it } from "vitest";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import batch2025 from "@/data/questions/rinsho-kensagishi/2025-annual-pm-batch3.json";
import batch2026 from "@/data/questions/rinsho-kensagishi/2026-annual-pm-batch2.json";
import receipt from "@/docs/evidence/lab-saved-source-qa24-20261011/INTEGRATION.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { questionSourceEdition } from "@/lib/questions/source-label";
const kana = ["ア", "イ", "ウ", "エ", "オ"];
const keys: Record<number, Record<number, string>> = { 2025: { 3:"1",6:"5",8:"2",9:"4",15:"2",25:"3",33:"4",34:"14",37:"4",40:"13",42:"1",48:"5" }, 2026: { 6:"5",11:"3",14:"3",16:"4",20:"4",25:"4",30:"2",33:"5",36:"5",39:"2",45:"3",48:"3" } };
const batch = [...batch2025, ...batch2026];
describe("lab saved source-QA24 additions", () => {
  it("adds only 24 exact IDs and retains every previously accepted original", async () => {
    expect(batch).toHaveLength(24);
    for (const year of [2025,2026]) expect(batch.filter(q => q.year === year).map(q => q.qNumber)).toEqual(Object.keys(keys[year]!).map(Number));
    expect(RINSHO_KENSAGISHI_QUESTIONS).toHaveLength(59);
    expect(new Set(RINSHO_KENSAGISHI_QUESTIONS.map(q => q.id)).size).toBe(59);
    expect(await getQuestionsForExam("rinsho-kensagishi")).toEqual(RINSHO_KENSAGISHI_QUESTIONS);
    for (const q of batch) expect(RINSHO_KENSAGISHI_QUESTIONS.find(r => r.id === q.id)).toEqual(q);
    expect(receipt.originals).toBe(24);
    expect(receipt.choiceExplanationFields).toBe(120);
    expect(receipt.answerSelections).toBe(26);
    expect(receipt.individualQaHoldsResolved).toBe(24);
    expect(receipt.individualRefusalOrStopHoldsReleased).toBe(0);
    expect(receipt.publicationGo).toBe(0);
  });
  it("preserves final-key cells, full five-choice coverage and source metadata", () => {
    for (const q of batch) {
      expect(q.officialAnswerNumber,q.id).toBe(keys[q.year]![q.qNumber]);
      const answers = Array.isArray(q.answer) ? q.answer : [q.answer];
      expect(answers.map(k => kana.indexOf(k)+1).join(""),q.id).toBe(keys[q.year]![q.qNumber]);
      expect(q.requiredSelections,q.id).toBe(keys[q.year]![q.qNumber]!.length);
      expect(Object.keys(q.choices),q.id).toEqual(kana);
      expect(Object.keys(q.choiceExplanations),q.id).toEqual(kana);
      expect(q.explanationCoverage).toBe("full");
      expect(q.hasImage).toBe(false);
      expect(q.needsReview).toBe(false);
      expect(questionSourceEdition({ year:q.year, season:"annual", sourcePdfUrl:q.sourcePdfUrl })).toBe(`第${q.year===2025?71:72}回（${q.year}年実施）`);
    }
    for (const r of Object.values(receipt.sourceReceipts)) {
      expect(r.savedAuthorModel).toBe("claude-opus-5-5");
      expect(r.savedQuestionChoicesProseChanged).toBe(0);
      expect(r.firstPartyReceiptSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(r.originalPngLayoutQa).toContain("PASS");
      expect(r.publicationGo).toBe(0);
    }
  });
});
