import { describe, expect, it } from "vitest";
import receipts from "@/docs/evidence/sc-choice-explanations-2024-2025/review-receipts.json";
import { SC_QUESTIONS } from "@/data/questions/sc";
import type { ChoiceKey } from "@/lib/questions/types";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const EXPECTED_PAPERS: Record<string, number> = {
  "2024/spring/am1": 30,
  "2024/spring/am2": 25,
  "2024/autumn/am1": 30,
  "2024/autumn/am2": 25,
  "2025/spring/am1": 30,
  "2025/spring/am2": 25,
  "2025/autumn/am1": 30,
  "2025/autumn/am2": 25,
};

const questions = SC_QUESTIONS.filter((question) =>
  [2024, 2025].includes(question.year)
  && question.type === "multiple-choice"
  && question.choices,
);

describe("SC 2024/2025 all-choice explanations", () => {
  it("keeps morning I and morning II as eight distinct official papers", () => {
    const actual: Record<string, number> = {};
    for (const question of questions) {
      const key = `${question.year}/${question.season}/${question.session}`;
      actual[key] = (actual[key] ?? 0) + 1;
    }
    expect(actual).toEqual(EXPECTED_PAPERS);
    expect(questions).toHaveLength(220);
  });

  it("publishes every official question in the interactive practice pool", () => {
    const practiceCounts: Record<string, number> = {};
    for (const question of questions.filter(isPracticeReadyQuestion)) {
      const key = `${question.year}/${question.season}/${question.session}`;
      practiceCounts[key] = (practiceCounts[key] ?? 0) + 1;
    }
    expect(practiceCounts).toEqual(EXPECTED_PAPERS);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(220);
  });

  it("covers every displayed choice with a distinct correct/wrong reason", () => {
    for (const question of questions) {
      const choiceKeys = Object.keys(question.choices ?? {}).sort() as ChoiceKey[];
      const explanationKeys = Object.keys(question.choiceExplanations ?? {}).sort() as ChoiceKey[];
      expect(explanationKeys, question.id).toEqual(choiceKeys);
      const correct = new Set(Array.isArray(question.answer) ? question.answer : [question.answer]);
      const reasons = choiceKeys.map((key) => question.choiceExplanations?.[key]?.trim() ?? "");
      expect(new Set(reasons).size, question.id).toBe(reasons.length);
      for (const [index, key] of choiceKeys.entries()) {
        const reason = reasons[index]!;
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(55);
        expect(reason.startsWith(correct.has(key) ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
      }
    }
  });

  it("has a source-pinned real Opus 5.5 receipt for every question", () => {
    expect(receipts.scope).toEqual({ exam: "sc", years: [2024, 2025], totalQuestions: 220, totalChoices: 880 });
    expect(Object.keys(receipts.questions)).toHaveLength(220);
    expect(Object.keys(receipts.evidence)).toHaveLength(16);

    for (const question of questions) {
      const receipt = receipts.questions[question.id as keyof typeof receipts.questions];
      expect(receipt, question.id).toBeDefined();
      expect(receipt.paper, question.id).toBe(`${question.year}/${question.season}/${question.session}`);
      expect(receipt.status, question.id).toBe("PASS");
      expect(receipt.issues, question.id).toEqual([]);
      expect(receipt.officialQuestionUrl, question.id).toMatch(/^https:\/\/(?:www\.)?ipa\.go\.jp\//u);
      expect(receipt.officialAnswerUrl, question.id).toMatch(/^https:\/\/(?:www\.)?ipa\.go\.jp\//u);
      for (const hash of [receipt.inputHash, receipt.candidateHash, receipt.evidenceHash, receipt.acceptedHash]) {
        expect(hash, question.id).toMatch(/^[0-9a-f]{64}$/u);
      }
      const batch = receipts.batches[receipt.batch as keyof typeof receipts.batches];
      expect(batch, receipt.batch).toBeDefined();
      expect(batch.requestedModel).toBe("claude-opus-5-5");
      expect(batch.canonicalModel).toBe("claude-opus-5-5");
      expect(batch.provider).toBe("firstParty");
      expect(batch.modelUsage.outputTokens).toBeGreaterThan(0);
    }
  });

  it("never mixes AM1 and AM2 inside one review batch", () => {
    const papersByBatch = new Map<string, Set<string>>();
    for (const receipt of Object.values(receipts.questions)) {
      const papers = papersByBatch.get(receipt.batch) ?? new Set<string>();
      papers.add(receipt.paper);
      papersByBatch.set(receipt.batch, papers);
    }
    for (const [batch, papers] of papersByBatch) {
      expect([...papers], batch).toHaveLength(1);
    }
  });
});
