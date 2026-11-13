// @vitest-environment node
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { AUTOMOTIVE_QUESTIONS, getAutomotiveQuestions } from "@/data/questions/automotive";
import metadata from "@/data/questions/automotive/qualifications.json";
import reviewed from "@/data/questions/automotive/reviewed.json";
import priorSittings from "@/data/questions/automotive/prior-sittings.json";
import recovery from "@/data/qualification-staging/automotive/latest-two/qa/lq1b-recovery-ledger.json";
import continuation from "@/data/qualification-staging/automotive/latest-two/qa/lq1c-progress.json";
import continuationCandidates from "@/data/qualification-staging/automotive/latest-two/qa/lq1c-candidates.json";
import continuationScope from "@/data/qualification-staging/automotive/latest-two/qa/lq1b-remaining-register.json";
import official from "@/data/qualification-staging/automotive/latest-two/official-answers.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { findQuestionById, getPoolIds } from "@/lib/questions/pool-server";
import { getHomeDirectory } from "@/lib/home/home-directory";
import type { AutomotiveExamCode } from "@/lib/questions/types";

describe("recovered automotive release", () => {
  it("admits the exact continuation candidates only with matching independent PASS receipts", () => {
    const scope = new Set(continuationScope.rows.map((row) => row.id));
    expect(scope.size).toBe(85);
    expect(new Set(continuationCandidates.expectedIds)).toEqual(scope);
    expect(new Set(continuationCandidates.writtenOriginals.map((q) => q.id))).toEqual(scope);
    const admitted = reviewed.filter((q) => scope.has(q.id));
    expect(admitted).toHaveLength(continuation.newGradableOriginals);
    for (const q of admitted) {
      const binding = recovery.rows.find((row) => row.id === q.id)!;
      const receipt = JSON.parse(fs.readFileSync(path.join(process.cwd(), binding.evidencePath), "utf8"));
      expect(receipt.model, q.id).toBe("gpt-6-astra");
      const decision = receipt.rows.find((row: { id: string }) => row.id === q.id);
      expect(decision.verdict, q.id).toBe("PASS");
      expect(decision.candidateSha256, q.id).toBe(binding.candidateSha256);
      expect(decision.answerChecked && decision.allFourExplanationsChecked, q.id).toBe(true);
      expect(decision.sourcePagesChecked, q.id).toEqual(expect.arrayContaining(q.sourcePages));
    }
    for (const id of [...continuation.remainingIds, ...continuation.referenceIds]) {
      expect(admitted.some((q) => q.id === id), id).toBe(false);
    }
    expect(admitted.length + continuation.remainingIds.length + continuation.referenceIds.length).toBe(85);
  });
  it("connects all 11 separate qualifications through eager and lazy registries", async () => {
    expect(metadata).toHaveLength(11);
    const directory = getHomeDirectory().find((domain) => domain.id === "automotive")!;
    const recoveredCodes = new Set(metadata.map(row => row.exam));
    const recoveredCards = [...directory.featured, ...directory.compact].filter(card => recoveredCodes.has(card.key));
    expect(recoveredCards).toHaveLength(11);
    expect(recoveredCards.reduce((sum, card) => sum + card.questionCount, 0)).toBe(recovery.releaseOriginals + priorSittings.length);
    for (const row of metadata) {
      const exam = row.exam as AutomotiveExamCode;
      const questions = getAutomotiveQuestions(exam);
      expect(isExamPublished(exam), exam).toBe(true);
      expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(row.questionsPerPaper);
      expect(ALL_EXAM_CODES as string[]).not.toContain(exam);
      expect(questions, exam).toHaveLength(row.reviewed);
      expect(QUESTIONS_BY_EXAM[exam], exam).toEqual(questions);
      expect(await getQuestionsForExam(exam), exam).toEqual(questions);
      expect(questions.every(isPracticeReadyQuestion), exam).toBe(true);
      expect(defaultPracticeSession(exam), exam).toBe("gakka");
      expect(await getPoolIds({ exam, mode: "random", session: defaultPracticeSession(exam) }), exam).toEqual(questions.map((q) => q.id));
      expect(await findQuestionById(questions[0].id), exam).toEqual(questions[0]);
    }
  });

  it("preserves accepted candidate bytes with matching receipt hashes and excludes unresolved originals", () => {
    expect(recovery.recoveredReviewedOriginals).toBe(385);
    // W2 (2026-11-06) appended the previous sitting of five subjects; see automotive-prior-sittings.test.ts.
    expect(AUTOMOTIVE_QUESTIONS).toHaveLength(recovery.releaseOriginals + priorSittings.length);
    expect(new Set(AUTOMOTIVE_QUESTIONS.map((q) => q.id)).size).toBe(recovery.releaseOriginals + priorSittings.length);
    expect(recovery.notYetReleasedIds).toHaveLength(610 - recovery.releaseOriginals);
    const ids = new Set(AUTOMOTIVE_QUESTIONS.map((q) => q.id));
    for (const id of recovery.notYetReleasedIds) expect(ids.has(id), id).toBe(false);
    for (const q of reviewed) {
      const row = recovery.rows.find((r) => r.id === q.id)!;
      expect(createHash("sha256").update(JSON.stringify(q)).digest("hex"), q.id).toBe(row.candidateSha256);
      expect(createHash("sha256").update(fs.readFileSync(path.join(process.cwd(), row.evidencePath))).digest("hex"), q.id).toBe(row.evidenceSha256);
      if ("supportingEvidence" in row) {
        for (const evidence of row.supportingEvidence ?? []) {
          expect(createHash("sha256").update(fs.readFileSync(path.join(process.cwd(), evidence.path))).digest("hex"), q.id).toBe(evidence.sha256);
        }
      }
    }
  });

  it("matches each official answer and retains all four explanations and required image bytes", () => {
    const tables = official.tables as Record<string, Record<string, { answers: Array<{ qNumber: number; answer: string | string[] }> }>>;
    for (const q of reviewed) {
      const table = tables[`jaspa-${q.fiscalYear}-${q.term}`][q.subject];
      expect(table.answers.find((r) => r.qNumber === q.qNumber)?.answer, q.id).toEqual(q.answer);
      const released = AUTOMOTIVE_QUESTIONS.find((r) => r.id === q.id)!;
      expect(released.question, q.id).toBe(q.question);
      expect(released.choices, q.id).toEqual(q.choices);
      expect(released.choiceExplanations, q.id).toEqual(q.choiceExplanations);
      expect(questionSourceEdition(released), q.id).toContain(q.term === "first" ? "第1回" : "第2回");
      expect(EXAM_CONFIGS[released.exam].sessions[0].categories, q.id).toContain(q.category);
      for (const key of ["ア", "イ", "ウ", "エ"] as const) expect(q.choiceExplanations[key].trim().length, q.id).toBeGreaterThan(0);
      if (q.sourceFigureRequired) expect(released.imageUrls?.length, q.id).toBeGreaterThan(0);
      for (const url of released.imageUrls ?? []) {
        const bytes = fs.readFileSync(path.join(process.cwd(), "public", url));
        expect(createHash("sha256").update(bytes).digest("hex") + ".webp", q.id).toBe(path.basename(url));
      }
    }
  });
});
