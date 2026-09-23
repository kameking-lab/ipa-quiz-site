import { describe, expect, it } from "vitest";
import {
  isScReviewReceiptAccepted,
  scReviewDigest,
  scReviewInputHash,
  type ScReviewGateReceipt,
  type ScReviewInput,
} from "@/scripts/lib/sc-review-gate";

const input: ScReviewInput = {
  question: "問い",
  choices: { ア: "選択肢A", イ: "選択肢B" },
  officialAnswer: "ア",
  existingNarrative: "総合解説",
  hasImage: false,
  imageUrls: [],
};
const acceptedHash = scReviewDigest({ ア: "正しいです。", イ: "誤りです。" });
const evidenceHash = scReviewDigest([{ url: "https://www.ipa.go.jp/example.pdf", sha256: "a".repeat(64) }]);

function receipt(overrides: Partial<ScReviewGateReceipt> = {}): ScReviewGateReceipt {
  return {
    status: "PASS",
    issues: [],
    inputHash: scReviewInputHash(input),
    acceptedHash,
    evidenceHash,
    ...overrides,
  };
}

function accepted(candidate: ScReviewGateReceipt, currentInput: ScReviewInput = input): boolean {
  return isScReviewReceiptAccepted(candidate, {
    input: currentInput,
    acceptedHash,
    evidenceHash,
    mixedBatch: false,
  });
}

describe("SC review receipt gate", () => {
  it("accepts only an exact full-input PASS receipt", () => {
    expect(accepted(receipt())).toBe(true);
  });

  it.each([
    ["question", { ...input, question: `${input.question}変更` }],
    ["choices", { ...input, choices: { ...input.choices, イ: "変更後" } }],
    ["answer", { ...input, officialAnswer: "イ" }],
    ["narrative", { ...input, existingNarrative: `${input.existingNarrative}変更` }],
    ["hasImage", { ...input, hasImage: true }],
    ["imageUrls", { ...input, imageUrls: ["/images/changed.png"] }],
  ] satisfies Array<[string, ScReviewInput]>)("makes a single %s change pending", (_field, changed) => {
    expect(accepted(receipt(), changed)).toBe(false);
  });

  it("rejects the three-field legacy input hash", () => {
    const legacyHash = scReviewDigest({
      question: input.question,
      choices: input.choices,
      officialAnswer: input.officialAnswer,
    });
    expect(accepted(receipt({ inputHash: legacyHash }))).toBe(false);
  });

  it("makes FIX or any recorded issue pending", () => {
    expect(accepted(receipt({ status: "FIX" }))).toBe(false);
    expect(accepted(receipt({ issues: ["要修正"] }))).toBe(false);
  });
});
