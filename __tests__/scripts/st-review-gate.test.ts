import { describe, expect, it } from "vitest";
import {
  isStReviewReceiptAccepted,
  stReviewDigest,
  stReviewInputHash,
  type StReviewGateReceipt,
  type StReviewInput,
} from "@/scripts/lib/st-review-gate";

const input: StReviewInput = {
  question: "問い",
  choices: { ア: "選択肢A", イ: "選択肢B" },
  officialAnswer: "ア",
  existingNarrative: "総合解説",
  hasImage: false,
  imageUrls: [],
};
const candidateHash = stReviewDigest({ ア: "正しいです。", イ: "誤りです。" });
const evidenceHash = stReviewDigest([{ url: "https://www.ipa.go.jp/example.pdf", sha256: "a".repeat(64) }]);

function receipt(overrides: Partial<StReviewGateReceipt> = {}): StReviewGateReceipt {
  return {
    status: "PASS",
    issues: [],
    inputHash: stReviewInputHash(input),
    candidateHash,
    acceptedHash: candidateHash,
    evidenceHash,
    ...overrides,
  };
}

function accepted(
  candidate: StReviewGateReceipt,
  currentInput: StReviewInput = input,
  batchValid = true,
): boolean {
  return isStReviewReceiptAccepted(candidate, {
    input: currentInput,
    candidateHash,
    evidenceHash,
    mixedBatch: false,
    batchValid,
  });
}

describe("ST review receipt gate", () => {
  it("accepts only an exact full-input PASS receipt from a valid model batch", () => {
    expect(accepted(receipt())).toBe(true);
  });

  it.each([
    ["question", { ...input, question: `${input.question}変更` }],
    ["choices", { ...input, choices: { ...input.choices, イ: "変更後" } }],
    ["answer", { ...input, officialAnswer: "イ" }],
    ["narrative", { ...input, existingNarrative: `${input.existingNarrative}変更` }],
    ["hasImage", { ...input, hasImage: true }],
    ["imageUrls", { ...input, imageUrls: ["/images/changed.png"] }],
  ] satisfies Array<[string, StReviewInput]>)("makes a single %s change pending", (_field, changed) => {
    expect(accepted(receipt(), changed)).toBe(false);
  });

  it("rejects the three-field legacy input hash", () => {
    const legacyHash = stReviewDigest({
      question: input.question,
      choices: input.choices,
      officialAnswer: input.officialAnswer,
    });
    expect(accepted(receipt({ inputHash: legacyHash }))).toBe(false);
  });

  it("rejects FIX, issues, candidate drift, accepted drift, and invalid model batches", () => {
    expect(accepted(receipt({ status: "FIX" }))).toBe(false);
    expect(accepted(receipt({ issues: ["要修正"] }))).toBe(false);
    expect(accepted(receipt({ candidateHash: "b".repeat(64) }))).toBe(false);
    expect(accepted(receipt({ acceptedHash: "c".repeat(64) }))).toBe(false);
    expect(accepted(receipt(), input, false)).toBe(false);
  });
});
