import { describe, expect, it } from "vitest";
import { RINSHO_KENSAGISHI_QUESTIONS } from "@/data/questions/rinsho-kensagishi";
import batch2 from "@/data/questions/rinsho-kensagishi/2025-annual-pm-batch2.json";
import receipt from "@/data/questions/rinsho-kensagishi/source-manifest-batch2.json";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

const official: Record<number, string> = { 32: "4", 35: "3", 36: "3", 39: "4", 41: "24", 44: "1", 45: "2" };
const kana = ["ア", "イ", "ウ", "エ", "オ"];
const lab2025 = RINSHO_KENSAGISHI_QUESTIONS.filter(q => q.year === 2025);

describe("lab71 seven remaining safe saved originals", () => {
  it("adds only the leased seven IDs to the ten prior originals", async () => {
    expect(batch2.map(q => q.qNumber)).toEqual([32, 35, 36, 39, 41, 44, 45]);
    expect(batch2.map(q => q.id)).toEqual(Object.keys(official).map(n => `rinsho-kensagishi-2025-annual-pm-q${n}`));
    expect(lab2025).toHaveLength(17);
    expect(new Set(lab2025.map(q => q.id)).size).toBe(17);
    expect(await getQuestionsForExam("rinsho-kensagishi")).toEqual(RINSHO_KENSAGISHI_QUESTIONS);
    expect(receipt.individualHoldReleaseCount).toBe(0);
    expect(receipt.originals).toBe(7);
    expect(receipt.choiceExplanationFields).toBe(35);
    expect(receipt.publicationGo).toBe(0);
    expect(receipt.currentPublishedOriginals).toBe(0);
  });

  it("preserves the independently read final keys, original five choices and metadata", () => {
    for (const q of batch2) {
      const key = official[q.qNumber];
      const answer = Array.isArray(q.answer) ? q.answer : [q.answer];
      expect(answer.map(k => kana.indexOf(k) + 1).join(""), q.id).toBe(key);
      expect(q.officialAnswerNumber, q.id).toBe(key);
      expect(q.requiredSelections, q.id).toBe(key.length);
      expect(Object.keys(q.choices), q.id).toEqual(kana);
      expect(Object.keys(q.choiceExplanations), q.id).toEqual(kana);
      expect(q.examDate, q.id).toBe("2025-02-19");
      expect(q.year, q.id).toBe(2025);
      expect(q.hasImage, q.id).toBe(false);
      expect(q.needsReview, q.id).toBe(false);
      expect(q.sourcePdfUrl, q.id).toContain("tp250428-07b_01.pdf");
      expect(q.sourceAnswerUrl, q.id).toContain("tp250428-07seitou.pdf");
    }
    expect(batch2.find(q => q.qNumber === 41)?.answer).toEqual(["イ", "エ"]);
    expect(batch2.find(q => q.qNumber === 45)?.choices.オ).toBe("ミクロトーム刀の滑走速度を速くする。");
  });

  it("distinguishes saved Opus authorship from CLI verification and rejects unnecessary rewriting", () => {
    const rows = Object.values(receipt.sourceReceipts);
    expect(rows).toHaveLength(7);
    for (const r of rows) {
      expect(r.authorModel).toBe("claude-opus-5-5");
      expect(r.verificationModel).toBe("gpt-5.6-sol");
      expect(r.cliRawFinalSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(r.firstPartyOpusReceiptSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(r.savedExplanationRewritten).toBe(false);
      expect(r.directOriginalPdfTextRecheck).toBe(true);
      expect(r.directFinalKeyPdfRecheck).toBe(true);
      expect(r.publicationGo).toBe(0);
      if (r.identity.endsWith("-44") || r.identity.endsWith("-45")) expect(r.cliProseAccepted).toBe(false);
      if (r.identity.endsWith("-45")) expect(r.cliChoiceOverrideRejected).toBe(true);
    }
  });
});
