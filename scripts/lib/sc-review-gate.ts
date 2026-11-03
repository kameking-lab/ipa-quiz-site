import { createHash } from "node:crypto";

export interface ScReviewInput {
  question: string;
  choices: Record<string, string>;
  officialAnswer: string | string[];
  existingNarrative: string;
  hasImage: boolean;
  imageUrls: string[];
}

export interface ScReviewGateReceipt {
  status: "PASS" | "FIX";
  issues: string[];
  inputHash: string;
  acceptedHash: string;
  evidenceHash: string;
}

export interface ScReviewGateExpectation {
  input: ScReviewInput;
  acceptedHash: string;
  evidenceHash: string;
  mixedBatch: boolean;
}

export function scReviewDigest(value: unknown): string {
  const input = typeof value === "string" || Buffer.isBuffer(value)
    ? value
    : JSON.stringify(value);
  return createHash("sha256").update(input).digest("hex");
}

export function scReviewInputHash(input: ScReviewInput): string {
  return scReviewDigest(input);
}

export function isScReviewReceiptAccepted(
  receipt: ScReviewGateReceipt | undefined,
  expected: ScReviewGateExpectation,
): boolean {
  return receipt !== undefined
    && receipt.status === "PASS"
    && receipt.issues.length === 0
    && !expected.mixedBatch
    && receipt.inputHash === scReviewInputHash(expected.input)
    && receipt.acceptedHash === expected.acceptedHash
    && receipt.evidenceHash === expected.evidenceHash;
}
