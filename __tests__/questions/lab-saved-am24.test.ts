import { describe, expect, it } from "vitest";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import am71 from "@/data/questions/rinsho-kensagishi/2025-annual-am-batch1.json";
import am72 from "@/data/questions/rinsho-kensagishi/2026-annual-am-batch1.json";
import receipt from "@/docs/evidence/lab-saved-am24-20261011/INTEGRATION.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { questionSourceEdition } from "@/lib/questions/source-label";
const kana = ["ア", "イ", "ウ", "エ", "オ"];
const keys: Record<number, Record<number, string>> = {
  2025: { 1:"3",2:"2",3:"4",6:"3",7:"5",11:"2",12:"4",13:"1",15:"4",16:"3",19:"4" },
  2026: { 1:"34",2:"5",5:"5",9:"24",10:"2",11:"3",12:"4",13:"5",14:"4",16:"2",18:"3",19:"4",20:"2" },
};
const batch = [...am71, ...am72];
describe("clinical laboratory saved AM24 source integration", () => {
  it("adds exact morning IDs, preserves prior afternoon originals and rejects duplicates", async () => {
    expect(am71.map(q => q.qNumber)).toEqual(Object.keys(keys[2025]!).map(Number));
    expect(am72.map(q => q.qNumber)).toEqual(Object.keys(keys[2026]!).map(Number));
    expect(batch).toHaveLength(24);
    expect(RINSHO_KENSAGISHI_QUESTIONS.filter(q => q.session === "pm")).toHaveLength(59);
    expect(RINSHO_KENSAGISHI_QUESTIONS.filter(q => batch.some(a => a.id === q.id))).toHaveLength(24);
    expect(new Set(RINSHO_KENSAGISHI_QUESTIONS.map(q => q.id)).size).toBe(RINSHO_KENSAGISHI_QUESTIONS.length);
    expect(await getQuestionsForExam("rinsho-kensagishi")).toEqual(RINSHO_KENSAGISHI_QUESTIONS);
    expect(receipt.originals).toBe(24);
    expect(receipt.answerSelections).toBe(26);
    expect(receipt.choiceExplanationFields).toBe(120);
    expect(receipt.holdsNotReleased).toHaveLength(9);
    expect(receipt.publicationGo).toBe(0);
    for (const hold of receipt.holdsNotReleased) {
      const [round,session,number] = hold.identity.split("-").slice(-3);
      const year = round === "71" ? 2025 : 2026;
      expect(batch.some(q => q.id === `rinsho-kensagishi-${year}-annual-${session}-q${number}`)).toBe(false);
    }
  });
  it("retains all key cells and five reasons with the exact first-party author", () => {
    for (const q of batch) {
      expect(q.officialAnswerNumber,q.id).toBe(keys[q.year]![q.qNumber]);
      expect(q.requiredSelections,q.id).toBe(keys[q.year]![q.qNumber]!.length);
      const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
      expect(answer.map(k => kana.indexOf(k)+1).join(""),q.id).toBe(keys[q.year]![q.qNumber]);
      expect(Object.keys(q.choices),q.id).toEqual(kana);
      expect(Object.keys(q.choiceExplanations),q.id).toEqual(kana);
      expect(q.explanationCoverage).toBe("full");
      expect(q.hasImage).toBe(false);
      expect(questionSourceEdition({year:q.year,season:"annual",sourcePdfUrl:q.sourcePdfUrl})).toBe(`第${q.year===2025?71:72}回（${q.year}年実施）`);
    }
    expect(receipt.savedAuthorProseChanged).toBe(0);
    expect(receipt.firstPartyRawOrReceiptsChanged).toBe(0);
    for (const r of Object.values(receipt.sourceReceipts)) {
      expect(r.savedAuthorModel).toBe("claude-sonnet-5-5");
      expect(r.savedExplanationProseChanged).toBe(0);
      expect(r.sourceQuestionWordsChanged).toBe(0);
      expect(r.firstPartyReceiptSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(r.originalPngLayoutQa).toContain("PASS");
      expect(r.publicGo).toBe(0);
    }
    const correctionCount = Object.values(receipt.sourceReceipts).reduce((total,r) => total+r.sourcePacketTranscriptionCorrections.length,0);
    expect(correctionCount).toBe(4);
    expect(am71.find(q => q.qNumber===6)?.choices.ウ).toBe("腟分泌物から囊子が検出される。");
    expect(am72.find(q => q.qNumber===18)?.choices.ア).toBe("肝囊胞");
    expect(receipt.reviewMetadataReassignment.to).toEqual(["rinsho-kensagishi-72-am-4","rinsho-kensagishi-72-am-7","rinsho-kensagishi-72-am-8"]);
  });
});
