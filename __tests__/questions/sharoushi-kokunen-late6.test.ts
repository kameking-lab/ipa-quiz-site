import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { Children, isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";
vi.mock("@/app/quiz/QuizClient", () => ({ QuizClient: () => null }));
import QuizPage from "@/app/quiz/page";
import { ALL_QUESTIONS } from "@/data/questions";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { PUBLISHED_SENTAKU } from "@/lib/sharoushi/sentaku";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import baseline from "@/docs/evidence/sharoushi-kokunen-late6-20261010/BASELINE-117.json";
import proof from "@/docs/evidence/sharoushi-kokunen-late6-20261010/KOKUNEN6-INTEGRATION.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object"
  ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const sha = (value: string) => createHash("sha256").update(value).digest("hex");
const byId = new Map(SHAROUSHI_QUESTIONS.map(question => [question.id, question]));
const labels = { A: "ア", B: "イ", C: "ウ", D: "エ", E: "オ" } as const;
const expectedIds = ["sharoushi-2025-annual-kokunen-q5", "sharoushi-2025-annual-kokunen-q7", "sharoushi-2026-annual-kokunen-q3", "sharoushi-2026-annual-kokunen-q4", "sharoushi-2026-annual-kokunen-q6", "sharoushi-2026-annual-kokunen-q7"];

describe("immutable late six national-pension originals", () => {
  it("preserves every prior MC object and native original, adding exactly the six frozen IDs", () => {
    expect(baseline.baseCommit).toBe("f2f550aaff05b39eb149b168d17b5ec810dc9b2e");
    expect(baseline.previousMcObjectHashes).toHaveLength(101);
    for (const prior of baseline.previousMcObjectHashes) {
      expect(byId.has(prior.id), prior.id).toBe(true);
      expect(sha(JSON.stringify(canonical(byId.get(prior.id)))), prior.id).toBe(prior.sha256);
    }
    const priorIds = new Set(baseline.previousMcObjectHashes.map(question => question.id));
    expect(SHAROUSHI_QUESTIONS.filter(question => !priorIds.has(question.id)).map(question => question.id).toSorted()).toEqual(expectedIds.toSorted());
    expect(SHAROUSHI_QUESTIONS).toHaveLength(107);
    expect(byId.size).toBe(107);
    expect(SHAROUSHI_QUESTIONS.reduce((count, question) => count + Object.keys(question.choices ?? {}).length, 0)).toBe(535);
    expect(sha(readFileSync("data/questions/sharoushi/sentaku/originals.json", "utf8").replace(/\r\n/g, "\n"))).toBe(baseline.native16FileSha256);
    expect(PUBLISHED_SENTAKU).toHaveLength(16);
  });

  it("copies the six source stems, five choices, official keys and all saved learning prose verbatim", () => {
    expect(proof.manifestSha256).toBe("1f23661972673dd3f850674aee231bd5070595e091e02438eda72cdf750165ce");
    expect(proof.added.map(row => row.registryId).toSorted()).toEqual(expectedIds.toSorted());
    const sitemapIds = new Set(getSitemapQuestions().map(question => question.id));
    for (const row of proof.added) {
      const question = byId.get(row.registryId)!;
      expect(question.question).toBe(row.sourceStem);
      expect(question.choices).toEqual(Object.fromEntries(Object.entries(row.sourceChoices).map(([key, value]) => [labels[key as keyof typeof labels], value])));
      expect(question.officialAnswerNumber).toBe(row.officialKey);
      expect(question.answer).toBe(labels[row.officialKey as keyof typeof labels]);
      expect(sha(question.explanation)).toBe(row.savedExplanationSha256);
      expect(question.choiceExplanations).toEqual(Object.fromEntries(Object.entries(row.savedChoiceExplanations).map(([key, value]) => [labels[key as keyof typeof labels], value])));
      expect(question.lawReferenceDate).toBe(row.lawAsOf);
      expect(question.sourcePdfUrl).toBe(`${row.sourceUrl}#page=${row.sourcePdfPhysicalPage}`);
      expect(question.sourceAnswerUrl).toBe(row.officialAnswerUrl);
      expect(question.needsReview).toBe(false);
      expect(isPracticeReadyQuestion(question)).toBe(true);
      expect(questionPagePath(question)).toBe(`/q/sharoushi/${question.year}-annual/kokunen/q${question.qNumber}`);
      expect(findQuestionByRoute(ALL_QUESTIONS, { exam: "sharoushi", yearSeason: `${question.year}-annual`, section: "kokunen", qnum: `q${question.qNumber}` })?.id).toBe(question.id);
      expect(sitemapIds.has(question.id)).toBe(true);
    }
  });

  it("exposes the complete ten original numbers in each national-pension year and exact SSR quiz pools", async () => {
    const all = SHAROUSHI_QUESTIONS.filter(question => question.session === "kokunen");
    expect(all).toHaveLength(20);
    for (const year of [2025, 2026]) {
      const questions = all.filter(question => question.year === year);
      expect(questions.map(question => question.qNumber).toSorted((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      const page = await QuizPage({ searchParams: Promise.resolve({ exam: "sharoushi", mode: "year", year: `${year}`, season: "annual", session: "kokunen" }) });
      const client = Children.toArray(page.props.children).find(node => isValidElement<{ poolIds?: string[] }>(node) && node.props.poolIds);
      if (!isValidElement<{ poolIds: string[] }>(client)) throw Error("missing national-pension quiz client");
      expect(client.props.poolIds.toSorted()).toEqual(questions.map(question => question.id).toSorted());
    }
  });

  it("states the qualification partial total and national-pension completion precisely", () => {
    const catalog = QUALIFICATION_CATALOG.find(row => row.slug === "sharoushi")!;
    expect(catalog.reuseSummary).toContain("択一式107原問・全535肢");
    expect(catalog.reuseSummary).toContain("全156原問中123原問");
    expect(catalog.reuseSummary).toContain("国民年金法20原問");
    expect(catalog.reuseSummary).toContain("両年度各10原問が揃っています");
    expect(catalog.remainingWork).toContain("未収録33原問（択一式のみ）の原典・正答・試験時点資料を確認");
  });
});
