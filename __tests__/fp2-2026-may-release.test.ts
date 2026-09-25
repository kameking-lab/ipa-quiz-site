import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { FP2_2026_MAY_COVERAGE, FP2_QUESTIONS } from "@/data/questions/fp2";
import released from "@/data/questions/fp2/academic-2026-may.json";
import figures from "@/data/questions/fp2/academic-figures-2026-may.json";
import extraction from "@/docs/evidence/fp2-2026-may/extraction.json";
import summary from "@/docs/evidence/fp2-2026-may/summary.json";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

const ROOT = path.resolve(__dirname, "..");
const EVIDENCE = path.join(ROOT, "docs/evidence/fp2-2026-may");
const KEYS = ["ア", "イ", "ウ", "エ"] as const;
const PDF_SHA256 = "525d190bb489b4187d39d6782eac999fc4b14bfdd1f489842b96685465b804ef";
const TERMS_SHA256 = "db604850c3f14cab982bedf622beae6f33d0624dd79f8dc8f9baaa979e00df45";

interface Receipt {
  question: number;
  status: "VERIFIED" | "HOLD";
  holdReasons: string[];
  released: boolean;
  source: { sha256: string; pdfUrl: string };
  officialAnswer: { key: string };
  figure: { required: boolean; imageUrls: string[] };
  lawReferenceDate: { value: string };
  judgment: { reviewVerdicts: string[] };
  modelCalls: Array<{ file: string; stage: string; requestedModel: string; modelUsage: Record<string, { outputTokens: number }>; opusOnly: boolean }>;
}

function receipt(n: number): Receipt {
  return JSON.parse(readFileSync(path.join(EVIDENCE, "receipts", `q${String(n).padStart(2, "0")}.json`), "utf8")) as Receipt;
}

const sourceByNumber = new Map(extraction.questions.map((q) => [q.number, q]));

describe("FP2 2026年5月公表 Q11–60 release gate", () => {
  it("pins the official question/answer PDF and reuse terms by hash", () => {
    expect(extraction.source.questionAnswerPdf.url).toBe("https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf");
    expect(extraction.source.questionAnswerPdf.sha256).toBe(PDF_SHA256);
    expect(extraction.source.reuseTerms.url).toBe("https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf");
    expect(extraction.source.reuseTerms.sha256).toBe(TERMS_SHA256);
    expect(extraction.coverStatement.lawReferenceDate).toBe("2025-04-01");
    expect(extraction.questions.map((q) => q.number)).toEqual(Array.from({ length: 50 }, (_, i) => i + 11));
  });

  it("releases only the contiguous verified run starting at Q11 and stops at the first HOLD", () => {
    const numbers = released.map((q) => q.qNumber);
    expect(numbers).toEqual(Array.from({ length: numbers.length }, (_, i) => i + 11));
    expect(summary.released).toEqual(numbers);
    for (const n of numbers) {
      const r = receipt(n);
      expect(r.status, `Q${n}`).toBe("VERIFIED");
      expect(r.released).toBe(true);
      expect(r.holdReasons).toEqual([]);
    }
    const next = 11 + numbers.length;
    if (next <= 60) expect(receipt(next).status).toBe("HOLD");
    expect(FP2_2026_MAY_COVERAGE.last).toBe(10 + numbers.length);
    expect(FP2_2026_MAY_COVERAGE.count).toBe(10 + numbers.length);
    expect(FP2_2026_MAY_COVERAGE.complete).toBe(FP2_2026_MAY_COVERAGE.last === 60);
    expect(FP2_2026_MAY_COVERAGE.label).toBe(FP2_2026_MAY_COVERAGE.complete ? "全60問" : `60問のうち問1〜${FP2_2026_MAY_COVERAGE.last}`);
  });

  it.each(released)("$id matches the official stem, four choices, answer and figure", (q) => {
    const source = sourceByNumber.get(q.qNumber)!;
    expect(q.question).toBe(source.stem);
    // The question sentence precedes any figure transcription and is never cut at a figure mention.
    expect(q.question.split("\n")[0]).toMatch(/どれか。/);
    expect(Object.keys(q.choices)).toEqual([...KEYS]);
    expect(Object.values(q.choices)).toEqual(source.choices);
    expect(q.answer).toBe(KEYS[source.answer - 1]);
    expect(Object.values(source.extractorChecks).every(Boolean)).toBe(true);
    expect(Object.keys(q.choiceExplanations)).toEqual([...KEYS]);
    expect(Object.values(q.choiceExplanations).every((text) => text.trim().length > 10)).toBe(true);
    expect(q.lawReferenceDate).toBe("2025-04-01");
    expect(q.sourcePdfUrl).toBe(extraction.source.questionAnswerPdf.url);
    expect(q.sourceAnswerUrl).toBe(extraction.source.questionAnswerPdf.url);
    expect(q.sourceAttribution).toMatch(/^出典：日本FP協会 2級ファイナンシャル・プランニング技能検定 学科試験（2026年5月公表分）を加工して作成。/);
    expect(q.license).toBe("JAFP-reuse-with-attribution");
    const figureUrls = ((figures as Record<string, Array<{ url: string }>>)[String(q.qNumber)] ?? []).map((f) => f.url);
    expect((q as { imageUrls?: string[] }).imageUrls ?? []).toEqual(figureUrls);
    expect(q.hasImage).toBe(figureUrls.length > 0);
    expect(source.figure).toBe(figureUrls.length > 0);
    for (const url of figureUrls) expect(existsSync(path.join(ROOT, "public", url))).toBe(true);
    for (const url of (q as { officialReferenceUrls?: string[] }).officialReferenceUrls ?? []) {
      expect(new URL(url).hostname).toMatch(/\.go\.jp$/);
    }
  });

  it.each(released)("$id has raw claude-opus-5-5 modelUsage for every judgment call and a final PASS", (q) => {
    const r = receipt(q.qNumber);
    expect(r.source.sha256).toBe(PDF_SHA256);
    expect(r.officialAnswer.key).toBe(q.answer);
    expect(r.judgment.reviewVerdicts.at(-1)).toBe("PASS");
    const stages = r.modelCalls.map((c) => c.stage);
    expect(stages.slice(0, 3)).toEqual(["1-solve", "2-draft", "3-review-r1"]);
    for (const call of r.modelCalls) {
      const prompt = (JSON.parse(readFileSync(path.join(EVIDENCE, call.file), "utf8")) as { request: { prompt: string } }).request.prompt;
      expect(prompt, `${call.file} judged the current stem`).toContain(q.question);
      const raw = JSON.parse(readFileSync(path.join(EVIDENCE, call.file), "utf8")) as {
        request: { model: string };
        modelUsage: Record<string, { outputTokens: number }>;
        is_error: boolean;
      };
      expect(raw.request.model).toBe("claude-opus-5-5");
      expect(Object.keys(raw.modelUsage)).toEqual(["claude-opus-5-5"]);
      expect(raw.modelUsage["claude-opus-5-5"]!.outputTokens).toBeGreaterThan(0);
      expect(raw.is_error).toBe(false);
      expect(call.modelUsage).toEqual(raw.modelUsage);
      expect(call.opusOnly).toBe(true);
    }
  });

  it("places the released questions in the FP2 corpus after Q1–10", () => {
    const may2026 = FP2_QUESTIONS.filter((q) => q.year === 2026 && q.season === "published");
    expect(may2026.map((q) => q.qNumber)).toEqual(Array.from({ length: FP2_2026_MAY_COVERAGE.count }, (_, i) => i + 1));
    expect(FP2_QUESTIONS).toHaveLength(240 + FP2_2026_MAY_COVERAGE.count);
  });

  it("keeps the catalog's remaining-work note consistent with the released range", () => {
    const work = getQualificationByExamCode("fp2")?.remainingWork.join(" ") ?? "";
    if (FP2_2026_MAY_COVERAGE.complete) expect(work).not.toMatch(/問\d+〜60の追加/);
    else expect(work).toContain("2026年5月公表");
  });
});
