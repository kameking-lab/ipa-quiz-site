import { describe, expect, it } from "vitest";
import receipts from "@/docs/evidence/st-choice-explanations-2024-2025/review-receipts.json";
import { ST_QUESTIONS } from "@/data/questions/st";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { stReviewDigest, stReviewInputHash } from "@/scripts/lib/st-review-gate";

const EXPECTED_PAPERS: Record<string, number> = {
  "2024/spring/am1": 30,
  "2024/spring/am2": 25,
  "2025/spring/am1": 30,
  "2025/spring/am2": 25,
};

// IPA official answer PDFs retrieved and text-extracted on 2026-09-24.
const OFFICIAL_ANSWER_SEQUENCES: Record<string, string> = {
  "2024/spring/am1": "エエエウウイウエアイエイイイアイウアアエアウエエエエアアウウ",
  "2024/spring/am2": "アエエウエイアウウアエイエエウアエイイウイウウエイ",
  "2025/spring/am1": "アイウウイウウウイアイウイイウアイイエイウウイエイウイエウイ",
  "2025/spring/am2": "エウエアエアウイエウエアウイアウウウエアイエエウエ",
};

const questions = ST_QUESTIONS.filter((question) =>
  [2024, 2025].includes(question.year)
  && question.type === "multiple-choice"
  && question.choices,
);

describe("ST 2024/2025 all-choice explanations", () => {
  it("keeps morning I and morning II as four distinct official papers", () => {
    const actual: Record<string, number> = {};
    for (const question of questions) {
      const key = `${question.year}/${question.season}/${question.session}`;
      actual[key] = (actual[key] ?? 0) + 1;
    }
    expect(actual).toEqual(EXPECTED_PAPERS);
    expect(questions).toHaveLength(110);
  });

  it("publishes every official question in the interactive practice pool", () => {
    const practiceCounts: Record<string, number> = {};
    for (const question of questions.filter(isPracticeReadyQuestion)) {
      const key = `${question.year}/${question.season}/${question.session}`;
      practiceCounts[key] = (practiceCounts[key] ?? 0) + 1;
    }
    expect(practiceCounts).toEqual(EXPECTED_PAPERS);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(110);
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

  it("uses current official IPA question and answer PDFs for each paper", () => {
    for (const question of questions) {
      expect(question.sourcePdfUrl, question.id).toMatch(/^https:\/\/www\.ipa\.go\.jp\/shiken\/mondai-kaiotu\/.*_qs\.pdf$/u);
      expect(getOfficialAnswerPdfUrl(question.sourcePdfUrl, question.sourceAnswerUrl), question.id)
        .toMatch(/^https:\/\/www\.ipa\.go\.jp\/shiken\/mondai-kaiotu\/.*_ans\.pdf$/u);
    }
  });

  it("matches every official answer in all four IPA answer PDFs", () => {
    for (const [paper, expected] of Object.entries(OFFICIAL_ANSWER_SEQUENCES)) {
      const actual = questions
        .filter((question) => `${question.year}/${question.season}/${question.session}` === paper)
        .sort((a, b) => a.qNumber - b.qNumber)
        .map((question) => Array.isArray(question.answer) ? question.answer.join("") : question.answer)
        .join("");
      expect(actual, paper).toBe(expected);
    }
    expect(questions.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0)).toBe(440);
  });

  it("has an exact source-pinned Opus 5.5 PASS receipt for all 110 questions and 440 choices", () => {
    expect(receipts.scope).toEqual({ exam: "st", years: [2024, 2025], totalQuestions: 110, totalChoices: 440 });
    expect(Object.keys(receipts.questions)).toHaveLength(110);
    expect(Object.keys(receipts.evidence)).toHaveLength(8);

    for (const question of questions) {
      const receipt = receipts.questions[question.id as keyof typeof receipts.questions];
      expect(receipt, question.id).toBeDefined();
      expect(receipt.paper, question.id).toBe(`${question.year}/${question.season}/${question.session}`);
      expect(receipt.status, question.id).toBe("PASS");
      expect(receipt.issues, question.id).toEqual([]);
      expect(receipt.inputHash, question.id).toBe(stReviewInputHash({
        question: question.question,
        choices: question.choices ?? {},
        officialAnswer: question.answer,
        existingNarrative: question.explanation,
        hasImage: question.hasImage,
        imageUrls: question.imageUrls ?? [],
      }));
      const candidateHash = stReviewDigest(question.choiceExplanations);
      expect(receipt.candidateHash, question.id).toBe(candidateHash);
      expect(receipt.acceptedHash, question.id).toBe(candidateHash);
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
      expect(batch.modelUsage.canonicalModel).toBe("claude-opus-5-5");
      expect(batch.modelUsage.provider).toBe("firstParty");
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
    for (const [batch, papers] of papersByBatch) expect([...papers], batch).toHaveLength(1);
  });
});
