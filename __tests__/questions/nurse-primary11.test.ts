import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import addition from "@/data/questions/kangoshi/primary-followup-20261011.json";
import proof from "@/docs/evidence/nurse-primary11-20261011/INTEGRATION.json";
import saved from "@/docs/evidence/nurse-primary11-20261011/SAVED-DRAFTS.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isCompleteSelectionCorrect } from "@/lib/questions/answers";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("three saved nurse originals after primary-source follow-up", () => {
  it("preserves every baseline object and both original annual files without deletion", () => {
    expect(proof.baseCommit).toBe("b98cc8d7b3bef7fc0dcb6204f6f56d111e10dfa8");
    expect(proof.previous464ObjectHashes).toHaveLength(464);
    for (const previous of proof.previous464ObjectHashes) {
      expect(byId.has(previous.id), previous.id).toBe(true);
      expect(nurseObjectHash(byId.get(previous.id)), previous.id).toBe(previous.sha256);
    }
    for (const file of proof.originalFileHashes) {
      const bytes = readFileSync(path.join(process.cwd(), file.path), "utf8").replace(/\r\n/g, "\n");
      expect(createHash("sha256").update(bytes).digest("hex"), file.path).toBe(file.sha256);
    }
    expect(KANGOSHI_QUESTIONS).toHaveLength(467);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(467);
  });

  it("adds only the three owned saved IDs with the original case, choices, key and source", () => {
    expect(saved).toHaveLength(11);
    expect(addition.map(question => question.id).sort()).toEqual(proof.addedIds);
    expect(addition.reduce((sum, question) => sum + Object.keys(question.choices).length, 0)).toBe(13);
    for (const question of addition as Question[]) {
      const original = saved.find(draft => draft.id === question.id)!;
      const registered = byId.get(question.id)!;
      expect(original, question.id).toBeDefined();
      expect(nurseObjectHash(original.question), question.id).toBe(original.originalQuestionObjectSha256);
      const before = original.question as unknown as Record<string, unknown>;
      const after = registered as unknown as Record<string, unknown>;
      for (const field of proof.originalContentFieldsPreserved) expect(after[field], `${question.id}:${field}`).toEqual(before[field]);
      const source = proof.sourceChecks.find(check => check.id === question.id)!;
      expect(nurseObjectHash(registered), question.id).toBe(source.objectSha256);
      const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answers.map(answer => String(Object.keys(question.choices ?? {}).indexOf(answer) + 1))).toEqual(source.source.officialAcceptedAnswerNumbers);
      expect(question.officialAnswerNumber).toBe(source.source.officialAcceptedAnswerNumbers.join(""));
      expect(question.requiredSelections ?? 1).toBe(source.source.requiredSelections);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(Object.keys(question.choices ?? {}).sort());
      for (const reason of Object.values(question.choiceExplanations ?? {})) expect(reason!.trim().length).toBeGreaterThan(30);
      expect(question.needsReview).toBe(false);
      expect(question.explanationCoverage).toBe("full");
      expect(isPracticeReadyQuestion(question), question.id).toBe(true);
    }
    const q82 = byId.get("kangoshi-2025-annual-pm-q82")!;
    const answers = q82.answer as ChoiceKey[];
    expect(isCompleteSelectionCorrect(answers, [...answers].reverse())).toBe(true);
    expect(isCompleteSelectionCorrect(answers, answers.slice(0, 1))).toBe(false);
    expect(byId.get("kangoshi-2024-annual-pm-q38")!.category).toBe("一般問題");
  });

  it("keeps eight unresolved originals and all five separate STOP IDs outside practice", () => {
    expect(proof.heldIds).toHaveLength(8);
    expect(proof.stopIdsUnchanged).toHaveLength(5);
    expect(proof.holdDetails.map(hold => hold.id)).toEqual(proof.heldIds);
    for (const id of [...proof.heldIds, ...proof.stopIdsUnchanged]) expect(byId.has(id), id).toBe(false);
    expect(proof.centralIndependentReview).toBe("PENDING");
    expect(proof.publicVerifiedWritten).toBe(false);
    expect(proof.newGeneratedOriginals).toBe(0);
    expect(proof.newPaidApiCalls).toBe(0);
  });
});
