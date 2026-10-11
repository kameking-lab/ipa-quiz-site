import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Question } from "@/lib/questions/types";
import { SHAROUSHI_QUESTIONS } from "@/data/questions/sharoushi";
import { ALL_QUESTIONS } from "@/data/questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute } from "@/lib/seo/question-url";
import { getSitemapQuestions } from "@/lib/seo/sitemap-pagination";
import recovered from "@/docs/candidates/sharoushi-latest-two-20261011/questions.json";
import manifest from "@/docs/candidates/sharoushi-latest-two-20261011/manifest.json";
import baseline from "@/docs/candidates/sharoushi-latest-two-20261011/baseline.json";
import literalQa from "@/docs/candidates/sharoushi-latest-two-20261011/source-literal-qa.json";
import official from "@/docs/candidates/sharoushi-latest-two-20261011/official-answer-tables.json";
import ready from "@/data/questions/sharoushi/remaining-verified-20261011.json";

const hash = (s: string) => createHash("sha256").update(s).digest("hex");
const kana = ["ア", "イ", "ウ", "エ", "オ"];

describe("Sharoushi saved-original recovery", () => {
  it("adds source-verified originals without changing the baseline 123", () => {
    expect(SHAROUSHI_QUESTIONS).toHaveLength(117);
    for (const file of baseline.publicFiles) {
      expect(hash(readFileSync(file.path, "utf8").replace(/\r\n/g, "\n")), file.path).toBe(file.sha256);
    }
    expect(hash(readFileSync("data/questions/sharoushi/sentaku/originals.json", "utf8").replace(/\r\n/g, "\n"))).toBe(baseline.native16FileSha256);
    expect(ready.map(q => q.id)).toEqual(["sharoushi-2025-annual-ippan-q10", "sharoushi-2025-annual-kounen-q6", "sharoushi-2025-annual-kounen-q8", "sharoushi-2025-annual-kounen-q9", "sharoushi-2026-annual-ippan-q4", "sharoushi-2026-annual-koyou-q3", "sharoushi-2026-annual-koyou-q4", "sharoushi-2026-annual-koyou-q10", "sharoushi-2026-annual-rousai-q6", "sharoushi-2026-annual-rousai-q7"]);
    expect(ready.map(q => q.officialAnswerNumber)).toEqual(["D", "D", "E", "C", "D", "B", "B", "C", "C", "A"]);
    for (const question of ready as Question[]) {
      const row = manifest.rows.find(row => row.id === question.id);
      expect(row?.status).toBe("READY_FOR_INDEPENDENT_REVIEW");
      expect(row?.remainingIssue).toEqual([]);
      expect(row?.allChoicePrimaryVerified).toBe(true);
      expect(row?.publicationReady).toBe(false);
      expect(row?.independentReviewPending).toBe(true);
      expect(isPracticeReadyQuestion(question)).toBe(true);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(kana);
      expect(findQuestionByRoute(ALL_QUESTIONS, {exam: "sharoushi", yearSeason: `${question.year}-annual`, section: question.session, qnum: `q${question.qNumber}`})?.id).toBe(question.id);
      expect(getSitemapQuestions().some(q => q.id === question.id)).toBe(true);
    }
  });

  it("accounts for all 156 originals and excludes the separate PR 680", () => {
    expect(manifest.publicOriginalsAtBase + manifest.separatePendingPrOriginals + manifest.remainingOriginals).toBe(156);
    expect(manifest.newSourceVerifiedOriginals + manifest.remainingSourceHoldOriginals).toBe(30);
    const newIds = [...ready, ...recovered].map(q => q.id);
    expect(new Set(newIds).size).toBe(28);
    expect(newIds.every(id => !baseline.publicIds.includes(id) && !baseline.pendingPr.originals.includes(id))).toBe(true);
    const owned = manifest.rows.map(q => q.id);
    expect(new Set([...baseline.publicIds, ...baseline.pendingPr.originals, ...owned]).size).toBe(140);
  });

  it("keeps the unresolved 18 and stopped two out of public routes and sitemap", () => {
    expect(recovered).toHaveLength(18);
    const publicIds = new Set(ALL_QUESTIONS.map(q => q.id));
    const sitemapIds = new Set(getSitemapQuestions().map(q => q.id));
    for (const question of recovered as Question[]) {
      expect(question.needsReview).toBe(true);
      expect(isPracticeReadyQuestion(question)).toBe(false);
      expect(publicIds.has(question.id)).toBe(false);
      expect(sitemapIds.has(question.id)).toBe(false);
      expect(Object.keys(question.choices ?? {})).toEqual(kana);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(kana);
    }
    const stopped = manifest.rows.filter(q => !q.recoveredPayload);
    expect(stopped.map(q => q.id).sort()).toEqual(["sharoushi-2025-annual-ippan-q5", "sharoushi-2026-annual-ippan-q5"]);
    for (const row of stopped) {
      expect(publicIds.has(row.id)).toBe(false);
      expect(recovered.some(q => q.id === row.id)).toBe(false);
    }
    expect(manifest.externalSendStoppedChoices).toHaveLength(3);
    expect(manifest.additionalSameReasonStopsPreserved).toEqual(["sharoushi-2025-annual-koyou-q2:dated-manual", "sharoushi-2026-annual-kounen-q4:E-period"]);
  });

  it("pins the official answer of every recovered original and checks literal QA", () => {
    for (const question of [...ready, ...recovered]) {
      const table = official.tables[String(question.year) as "2025" | "2026"];
      const expected = table[question.session as keyof typeof table][question.qNumber - 1];
      expect(question.officialAnswerNumber, question.id).toBe(expected);
      expect(question.answer).toBe(kana["ABCDE".indexOf(question.officialAnswerNumber)]);
      expect(question.lawReferenceDate).toBe(question.year === 2025 ? "2025-04-11" : "2026-04-10");
    }
    expect(literalQa).toHaveLength(28);
    expect(literalQa.every(q => q.allLiteralMatch)).toBe(true);
    expect(literalQa.every(q => Object.values(q.parts).length === 6)).toBe(true);
  });
});
