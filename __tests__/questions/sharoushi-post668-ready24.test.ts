import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";
import proof from "@/docs/evidence/sharoushi-post668-ready24-20261010/INTEGRATION.json";

const canonical = (v: unknown): unknown => Array.isArray(v) ? v.map(canonical) : v && typeof v === "object"
  ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([k, x]) => [k, canonical(x)])) : v;
const hash = (v: unknown) => createHash("sha256").update(JSON.stringify(canonical(v))).digest("hex");
const expectedChoiceKeys = ["ア", "イ", "ウ", "エ", "オ"];

describe("social insurance post-668 GO-only delta", () => {
  it("keeps all 62 published originals byte-identical as objects", () => {
    expect(proof.previousMcObjectHashes).toHaveLength(62);
    for (const prior of proof.previousMcObjectHashes) {
      const row = SHAROUSHI_QUESTIONS.find((q) => q.id === prior.id);
      expect(row, prior.id).toBeDefined();
      expect(hash(row), prior.id).toBe(prior.sha256);
    }
  });

  it("registers precisely 24 new official five-choice originals on unique subject routes", () => {
    expect(proof.added).toHaveLength(24);
    expect(proof.skippedPublishedCandidateIds).toHaveLength(19);
    expect(SHAROUSHI_QUESTIONS).toHaveLength(101);
    expect(new Set(SHAROUSHI_QUESTIONS.map((q) => q.id)).size).toBe(101);
    expect(SHAROUSHI_QUESTIONS.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0)).toBe(505);
    const sitemapIds = new Set(getSitemapQuestions().map((q) => q.id));
    for (const addition of proof.added) {
      const q = SHAROUSHI_QUESTIONS.find((row) => row.id === addition.id);
      expect(q, addition.id).toBeDefined();
      expect(hash(q), addition.id).toBe(addition.siteObjectSha256);
      expect(q?.officialAnswerNumber).toBe(addition.officialKey);
      expect(Object.keys(q?.choices ?? {})).toEqual(expectedChoiceKeys);
      expect(Object.keys(q?.choiceExplanations ?? {})).toEqual(expectedChoiceKeys);
      expect(q?.lawReferenceDate).toBe(addition.year === 2025 ? "2025-04-11" : "2026-04-10");
      expect(isPracticeReadyQuestion(q!)).toBe(true);
      expect(questionPagePath(q!)).toBe(`/q/sharoushi/${addition.year}-annual/${addition.session}/q${addition.qNumber}`);
      expect(findQuestionByRoute(ALL_QUESTIONS, {
        exam: "sharoushi", yearSeason: `${addition.year}-annual`, section: addition.session,
        qnum: `q${addition.qNumber}`,
      })?.id).toBe(addition.id);
      expect(sitemapIds.has(addition.id)).toBe(true);
    }
    expect(SHAROUSHI_QUESTIONS.some((q) => q.id === "sharoushi-2025-annual-koyou-q1")).toBe(false);
  });
});
