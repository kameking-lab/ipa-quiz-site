import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import extraction from "@/docs/evidence/fp2-2026-may/extraction.json";
import coverage from "@/docs/evidence/fp2-2026-may/coverage.json";
import ledger from "@/docs/evidence/fp2-2026-may/review-ledger.json";
import receiptIndex from "@/docs/evidence/fp2-2026-may/receipts/index.json";
import { FP2_2026_MAY_QUESTIONS, FP2_2026_MAY_TOTAL, fp2May2026CoverageLabel } from "@/data/questions/fp2";

const KEYS = ["ア", "イ", "ウ", "エ"] as const;
const PAPER_URL = "https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf";
const reviewed = FP2_2026_MAY_QUESTIONS.filter((q) => q.qNumber >= 11);
const ledgerRows = ledger.questions as Record<string, { status: string }>;
const receipts = receiptIndex as Record<string, { kind: string; questions: number[]; requestedModel: string; receiptSha256: string }>;

describe("FP2 2026年5月公表 学科", () => {
  it("extracts the full official paper with its law reference date and hash", () => {
    expect(extraction.source.paperUrl).toBe(PAPER_URL);
    expect(extraction.source.paperSha256).toMatch(/^[0-9a-f]{64}$/);
    expect(extraction.lawReferenceDate).toBe("2025-04-01");
    expect(extraction.questions.map((q) => q.number)).toEqual(Array.from({ length: FP2_2026_MAY_TOTAL }, (_, i) => i + 1));
    for (const q of extraction.questions) {
      expect(q.stem.length, `Q${q.number}`).toBeGreaterThan(10);
      expect(q.choices).toHaveLength(4);
      expect(q.answer).toBeGreaterThanOrEqual(1);
      expect(q.answer).toBeLessThanOrEqual(4);
    }
  });

  it("publishes one contiguous range from Q1 and derives the displayed label from it", () => {
    const numbers = FP2_2026_MAY_QUESTIONS.map((q) => q.qNumber);
    expect(numbers).toEqual(Array.from({ length: numbers.length }, (_, i) => i + 1));
    expect(coverage.publishedCount).toBe(reviewed.length);
    expect(coverage.publishedRange?.[1] ?? 10).toBe(numbers.length);
    expect(fp2May2026CoverageLabel()).toBe(numbers.length >= FP2_2026_MAY_TOTAL ? "全60問" : `問1〜${numbers.length}`);
    if (coverage.holds.length) expect(numbers.length + 1).toBe(coverage.holds[0]!.number);
  });

  it.each(reviewed)("$id matches the official stem, choices, answer and figure", (q) => {
    const source = extraction.questions[q.qNumber - 1]!;
    expect(q.question).toBe(source.stem);
    expect(KEYS.map((key) => q.choices?.[key])).toEqual(source.choices);
    expect(q.answer).toBe(KEYS[source.answer - 1]);
    expect(Object.keys(q.choiceExplanations ?? {})).toEqual([...KEYS]);
    expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.trim().length > 10)).toBe(true);
    expect(q.lawReferenceDate).toBe(extraction.lawReferenceDate);
    expect(q.sourcePdfUrl).toBe(PAPER_URL);
    expect(q.sourceAnswerUrl).toBe(PAPER_URL);
    expect(q.sourceAttribution).toContain("日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）");
    const figure = "figure" in source ? source.figure : undefined;
    expect(q.hasImage).toBe(Boolean(figure));
    expect(q.imageUrls ?? []).toEqual(figure ? [figure.url] : []);
    if (figure) {
      expect(q.sourceAttribution).toContain("図表は原典の該当箇所を画像化");
      expect(existsSync(join(process.cwd(), "public", figure.url.replace(/^\//, "")))).toBe(true);
    }
    for (const url of q.officialReferenceUrls ?? []) expect(url).toMatch(/^https:\/\/laws\.e-gov\.go\.jp\/law\/\w+\?occasion_date=20250401$/);
    expect(ledgerRows[String(q.qNumber)]?.status).toBe("accepted");
  });

  it("backs every reviewed question with raw first-party claude-opus-5-5 solve and explain receipts", () => {
    for (const q of reviewed) {
      for (const kind of ["solve", "explain"]) {
        const name = Object.keys(receipts).find((file) => receipts[file]!.kind === kind && receipts[file]!.questions.includes(q.qNumber));
        expect(name, `Q${q.qNumber} ${kind}`).toBeDefined();
        const text = readFileSync(join(process.cwd(), "docs/evidence/fp2-2026-may/receipts", name!), "utf8");
        expect(createHash("sha256").update(text).digest("hex")).toBe(receipts[name!]!.receiptSha256);
        const raw = JSON.parse(text) as { modelUsage: Record<string, { provider: string; outputTokens: number }> };
        expect(raw.modelUsage["claude-opus-5-5"]?.provider).toBe("firstParty");
        expect(raw.modelUsage["claude-opus-5-5"]!.outputTokens).toBeGreaterThan(0);
        expect(receipts[name!]!.requestedModel).toBe("claude-opus-5-5");
      }
    }
  });
});
