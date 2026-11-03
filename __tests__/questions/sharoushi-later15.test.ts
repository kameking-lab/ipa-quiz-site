import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { isAcceptedAnswer, requiredSelectionCount } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { PUBLISHED_SENTAKU } from "@/lib/sharoushi/sentaku";
import baseline from "@/docs/evidence/sharoushi-later15-20261010/BASELINE-102.json";
import ippan from "@/docs/evidence/sharoushi-later15-20261010/IPPAN5-SOURCE-MAP.json";
import kokunen from "@/docs/evidence/sharoushi-later15-20261010/KOKUNEN14-INTEGRATION.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object"
  ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const sha = (value: string) => createHash("sha256").update(value).digest("hex");
const byId = new Map(SHAROUSHI_QUESTIONS.map(question => [question.id, question]));
const letterToChoice = { A: "ア", B: "イ", C: "ウ", D: "エ", E: "オ" } as const;

describe("frozen later 15 social-insurance originals", () => {
  it("preserves all 102 prior originals and registers exactly 15 new MC originals", () => {
    expect(baseline.baseCommit).toBe("aaf7bc1c3216c93caba828edf88d5c327c70a075");
    expect(baseline.previousMcObjectHashes).toHaveLength(86);
    for (const prior of baseline.previousMcObjectHashes) {
      const question = byId.get(prior.id);
      expect(question, prior.id).toBeDefined();
      expect(sha(JSON.stringify(canonical(question))), prior.id).toBe(prior.sha256);
    }
    const nativeFile = readFileSync("data/questions/sharoushi/sentaku/originals.json", "utf8").replace(/\r\n/g, "\n");
    expect(sha(nativeFile)).toBe(baseline.native16FileSha256);
    expect(PUBLISHED_SENTAKU).toHaveLength(16);
    expect(SHAROUSHI_QUESTIONS.length).toBeGreaterThanOrEqual(101);
    expect(byId.size).toBe(SHAROUSHI_QUESTIONS.length);
    expect(SHAROUSHI_QUESTIONS.reduce((count, question) => count + Object.keys(question.choices ?? {}).length, 0)).toBeGreaterThanOrEqual(505);
    expect(ippan).toHaveLength(5);
    expect(kokunen.manifestGoOriginals).toBe(14);
    expect(kokunen.overlapsPreserved).toHaveLength(4);
    expect(kokunen.added).toHaveLength(10);
    expect(new Set([...ippan.map(row => row.registryId), ...kokunen.added.map(row => row.registryId)]).size).toBe(15);
  });

  it("retains source question, all five choices, official key, law date and explanation for each new original", () => {
    for (const row of [...ippan, ...kokunen.added]) {
      const question = byId.get(row.registryId);
      expect(question, row.registryId).toBeDefined();
      expect(question?.exam).toBe("sharoushi");
      expect(question?.question).toBe(row.sourceStem);
      expect(question?.choices).toEqual(Object.fromEntries(Object.entries(row.sourceChoices).map(([key, text]) => [letterToChoice[key as keyof typeof letterToChoice], text])));
      const acceptedKeys = "officialKey" in row ? [row.officialKey] : Array.isArray(row.officialAnswer) ? row.officialAnswer : [row.officialAnswer];
      expect(question?.officialAnswerNumber).toBe(acceptedKeys.join("/"));
      expect(question?.answer).toEqual(acceptedKeys.length > 1 ? acceptedKeys.map(key => letterToChoice[key as keyof typeof letterToChoice]) : letterToChoice[acceptedKeys[0] as keyof typeof letterToChoice]);
      expect(question?.lawReferenceDate).toBe(row.lawAsOf);
      expect(question?.sourcePdfUrl).toContain(`#page=${row.sourcePdfPhysicalPage}`);
      expect(question?.sourceAnswerUrl).toBe(row.officialAnswerUrl);
      expect(question?.sourcePdfUrl).toContain("sharosi-siken.or.jp");
      expect(question?.sourceAnswerUrl).toContain("sharosi-siken.or.jp");
      expect(question?.needsReview).toBe(false);
      expect(Object.keys(question?.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(Object.keys(question?.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
      expect(Object.values(question?.choiceExplanations ?? {}).every(value => value.trim().length > 0)).toBe(true);
      expect(isPracticeReadyQuestion(question!)).toBe(true);
    }
  });

  it("accepts either D or E alone for corrected 2026 general-knowledge Q9", () => {
    const question = byId.get("sharoushi-2026-annual-ippan-q9")!;
    expect(question.officialAnswerNumber).toBe("D/E");
    expect(question.answer).toEqual(["エ", "オ"]);
    expect(requiredSelectionCount(question)).toBe(1);
    expect(isAcceptedAnswer(question.answer, "エ")).toBe(true);
    expect(isAcceptedAnswer(question.answer, "オ")).toBe(true);
    expect(isAcceptedAnswer(question.answer, "ウ")).toBe(false);
    expect(question.officialReferenceUrls?.some(url => url.includes("sharosi-siken.or.jp") && url.includes("2026/09"))).toBe(true);
  });

  it("keeps unrelated unpublished originals out of this frozen batch", () => {
    for (const id of ["sharoushi-2025-annual-ippan-q4", "sharoushi-2026-annual-ippan-q4"]) {
      expect(byId.has(id), id).toBe(false);
    }
  });
});
