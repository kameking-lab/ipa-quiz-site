import { createHash } from "node:crypto";

export interface StReviewInput {
  question: string;
  choices: Record<string, string>;
  officialAnswer: string | string[];
  existingNarrative: string;
  hasImage: boolean;
  imageUrls: string[];
}

export interface StReviewGateReceipt {
  status: "PASS" | "FIX";
  issues: string[];
  inputHash: string;
  candidateHash: string;
  acceptedHash: string;
  evidenceHash: string;
}

export interface StReviewGateExpectation {
  input: StReviewInput;
  candidateHash: string;
  evidenceHash: string;
  mixedBatch: boolean;
  batchValid: boolean;
}

export function stReviewDigest(value: unknown): string {
  const input = typeof value === "string" || Buffer.isBuffer(value)
    ? value
    : JSON.stringify(value);
  return createHash("sha256").update(input).digest("hex");
}

export function stReviewInputHash(input: StReviewInput): string {
  return stReviewDigest(input);
}

export function isStReviewReceiptAccepted(
  receipt: StReviewGateReceipt | undefined,
  expected: StReviewGateExpectation,
): boolean {
  return receipt !== undefined
    && receipt.status === "PASS"
    && receipt.issues.length === 0
    && !expected.mixedBatch
    && expected.batchValid
    && receipt.inputHash === stReviewInputHash(expected.input)
    && receipt.candidateHash === expected.candidateHash
    && receipt.acceptedHash === expected.candidateHash
    && receipt.evidenceHash === expected.evidenceHash;
}
