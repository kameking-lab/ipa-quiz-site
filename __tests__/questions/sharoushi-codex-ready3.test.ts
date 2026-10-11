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
import baseline from "@/docs/evidence/sharoushi-codex-ready3-20261010/BASELINE-123.json";
import proof from "@/docs/evidence/sharoushi-codex-ready3-20261010/INTEGRATION-3.json";
import ownership from "@/docs/evidence/sharoushi-codex-ready3-20261010/OWNERSHIP-33.json";
import literal from "@/docs/evidence/sharoushi-codex-ready3-20261010/SOURCE-LITERAL-QA.json";
import primary from "@/docs/evidence/sharoushi-codex-ready3-20261010/PRIMARY-EXCERPTS.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object"
  ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
const sha = (value: string) => createHash("sha256").update(value).digest("hex");
const byId = new Map(SHAROUSHI_QUESTIONS.map(question => [question.id, question]));
const labels = { A: "ア", B: "イ", C: "ウ", D: "エ", E: "オ" } as const;
const expectedIds = ["sharoushi-2025-annual-koyou-q8", "sharoushi-2026-annual-koyou-q8", "sharoushi-2026-annual-ippan-q8"];

describe("bounded recovery of three saved social-insurance originals", () => {
  it("preserves all 123 prior originals and adds only the three frozen subject IDs", () => {
    expect(baseline.previousMcObjectHashes).toHaveLength(107);
    for (const row of baseline.previousMcObjectHashes) {
      expect(sha(JSON.stringify(canonical(byId.get(row.id)))), row.id).toBe(row.sha256);
    }
    const previous = new Set(baseline.previousMcObjectHashes.map(row => row.id));
    expect(SHAROUSHI_QUESTIONS.filter(question => !previous.has(question.id)).map(question => question.id).toSorted()).toEqual(expectedIds.toSorted());
    expect(byId.size).toBe(110);
    expect(SHAROUSHI_QUESTIONS.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0)).toBe(550);
    expect(sha(readFileSync("data/questions/sharoushi/sentaku/originals.json", "utf8").replace(/\r\n/g, "\n"))).toBe(baseline.native16FileSha256);
    expect(PUBLISHED_SENTAKU).toHaveLength(16);
  });

  it("preserves official text and keys and reaches practice, subject routes, and sitemap", () => {
    const sitemap = new Set(getSitemapQuestions().map(question => question.id));
    expect(proof.added.map(row => row.registryId).toSorted()).toEqual(expectedIds.toSorted());
    expect(proof.added.map(row => row.officialKey)).toEqual(["E", "E", "B"]);
    expect(literal).toHaveLength(3);
    for (const row of proof.added) {
      const question = byId.get(row.registryId)!;
      expect(question.question).toBe(row.sourceStem);
      expect(question.choices).toEqual(Object.fromEntries(Object.entries(row.sourceChoices).map(([key, value]) => [labels[key as keyof typeof labels], value])));
      expect(question.officialAnswerNumber).toBe(row.officialKey);
      expect(question.answer).toBe(labels[row.officialKey as keyof typeof labels]);
      expect(question.lawReferenceDate).toBe(row.lawAsOf);
      expect(question.explanationCoverage).toBe("full");
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(Object.values(labels));
      expect(Object.values(literal.find(check => check.id === row.registryId)!.stemAndAllChoicesLiteral).every(Boolean)).toBe(true);
      expect(isPracticeReadyQuestion(question)).toBe(true);
      expect(questionPagePath(question)).toBe(`/q/sharoushi/${question.year}-annual/${question.session}/q8`);
      expect(findQuestionByRoute(ALL_QUESTIONS, { exam: "sharoushi", yearSeason: `${question.year}-annual`, section: question.session, qnum: "q8" })?.id).toBe(question.id);
      expect(sitemap.has(question.id)).toBe(true);
    }
  });

  it("keeps the three blocked choices and 30 unresolved originals outside the registry", () => {
    expect(ownership.rows).toHaveLength(33);
    expect(new Set(ownership.rows.map(row => row.id)).size).toBe(33);
    expect(ownership.rows.filter(row => row.status === "READY_FOR_INDEPENDENT_REVIEW").map(row => row.id).toSorted()).toEqual(expectedIds.toSorted());
    for (const row of ownership.rows.filter(row => row.status !== "READY_FOR_INDEPENDENT_REVIEW")) expect(byId.has(row.id), row.id).toBe(false);
    expect(ownership.externalSendStoppedChoices).toEqual(["sharoushi-2025-annual-ippan-q5:B", "sharoushi-2026-annual-ippan-q5:B", "sharoushi-2026-annual-ippan-q5:C"]);
    expect(ownership.rows.find(row => row.id === "sharoushi-2026-annual-ippan-q4")?.officialAnswer).toBe("D");
    expect(proof.newClaudeRequests).toBe(0);
    expect(proof.fullDraftRegenerations).toBe(0);
    expect(proof.savedOriginalsReused).toBe(3);
    expect(proof.publicationVerified).toBe(false);
  });

  it("retains as-of statute evidence for the corrected deadline and distinct insurance systems", () => {
    const law2025 = primary.find(row => row.lawAsOf === "2025-04-11" && row.sourceLocalPath?.includes("collection-act"))!;
    const rule2026 = primary.find(row => row.lawAsOf === "2026-04-10" && row.sourceLocalPath?.includes("collection-rule"))!;
    const healthRule = primary.find(row => row.sourceLocalPath?.includes("regulation-20260401"))!;
    expect(law2025.articles?.["15"]).toContain("その通知を受けた日から十五日以内");
    expect(rule2026.articles?.["78"]).toContain("有期事業以外の事業に係るもの");
    expect(healthRule.articles?.["2"]).toContain("十日以内");
    expect(healthRule.articles?.["1_3"]).toContain("保険者が二以上あるとき");
    expect(healthRule.articles?.["2"]).toContain("全国健康保険協会");
    expect(healthRule.articles?.["2"]).toContain("健康保険組合を選択しようとするとき");
    expect(byId.get(expectedIds[0]!)?.choiceExplanations?.["エ"]).toContain("受領日は示していない");
    expect(byId.get(expectedIds[2]!)?.choiceExplanations?.["エ"]).toContain("国民健康保険組合とは異なる");
  });

  it("exposes exact SSR year/subject pools and consistent partial coverage totals", async () => {
    for (const [year, session] of [[2025, "koyou"], [2026, "koyou"], [2026, "ippan"]] as const) {
      const questions = SHAROUSHI_QUESTIONS.filter(question => question.year === year && question.session === session);
      const page = await QuizPage({ searchParams: Promise.resolve({ exam: "sharoushi", mode: "year", year: `${year}`, season: "annual", session }) });
      const client = Children.toArray(page.props.children).find(node => isValidElement<{ poolIds?: string[] }>(node) && node.props.poolIds);
      if (!isValidElement<{ poolIds: string[] }>(client)) throw Error("missing subject quiz client");
      expect(client.props.poolIds.toSorted()).toEqual(questions.map(question => question.id).toSorted());
    }
    const catalog = QUALIFICATION_CATALOG.find(row => row.slug === "sharoushi")!;
    expect(catalog.reuseSummary).toContain("択一式110原問・全550肢");
    expect(catalog.reuseSummary).toContain("全156原問中126原問");
    expect(catalog.reuseSummary).toContain("選択式16原問・80空欄");
    expect(catalog.remainingWork).toContain("未収録30原問（択一式のみ）の原典・正答・試験時点資料を確認");
  });
});
