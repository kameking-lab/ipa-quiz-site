import followup from "@/docs/evidence/nurse-latest-two-followup-20261011/INTEGRATION.json";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import integration from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
import candidates from "@/docs/evidence/nurse-pm4-followup-20261010/GO-CANDIDATES.json";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("four independently verified nursing PM originals", () => {
  it("preserves every previous object and registers exactly four new originals", () => {
    expect(integration.baseCommit).toBe("f6bf8e12223311ececebc10d7ae7f386bd0f4c4e");
    expect(integration.previous457ObjectHashes).toHaveLength(457);
    for (const old of integration.previous457ObjectHashes) {
      expect(nurseObjectHash(byId.get(old.id)), old.id).toBe(old.sha256);
    }
    expect(candidates.map(question => question.id)).toEqual(integration.addedIds);
    expect(integration.addedIds).toEqual([
      "kangoshi-2024-annual-pm-q3",
      "kangoshi-2024-annual-pm-q61",
      "kangoshi-2025-annual-pm-q78",
      "kangoshi-2025-annual-pm-q83",
    ]);
    expect(KANGOSHI_QUESTIONS).toHaveLength(followup.registeredAfter);
    expect(integration.totalOriginals).toBe(integration.previousOriginals + integration.addedOriginals);
    expect(integration.totalChoices).toBe(integration.previousChoices + integration.addedChoices);
    expect(integration.addedChoices).toBe(18);
    expect(KANGOSHI_QUESTIONS.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0)).toBe(followup.registeredChoiceCountAfter);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(followup.registeredAfter);
    expect(KANGOSHI_QUESTIONS.filter(question => question.numericAnswer)).toHaveLength(2);
    for (const id of integration.heldIdsUnchanged) if (!followup.addedIds.includes(id)) expect(byId.has(id), id).toBe(false);
  });

  it("keeps the exact official stems, all choices, keys, source pages, and saved explanations", () => {
    expect(integration.sourceChecks).toHaveLength(4);
    for (const check of integration.sourceChecks) {
      const actual = byId.get(check.id)!;
      const candidate = candidates.find(question => question.id === check.id)!;
      expect(actual).toEqual(candidate);
      expect(nurseObjectHash(actual), check.id).toBe(check.objectSha256);
      expect(actual.id).toBe(`kangoshi-${check.year}-annual-pm-q${check.qNumber}`);
      expect(actual.year).toBe(check.year);
      expect(actual.session).toBe("pm");
      expect(actual.qNumber).toBe(check.qNumber);
      expect(actual.question).toBe(check.officialStem);
      expect(Object.values(actual.choices ?? {})).toEqual(check.officialChoices);
      expect(actual.officialAnswerNumber).toBe(check.officialKey.join(""));
      const selected = Array.isArray(actual.answer) ? actual.answer : [actual.answer];
      expect(selected.map(answer => String(Object.keys(actual.choices ?? {}).indexOf(answer as string) + 1))).toEqual(check.officialKey);
      expect(actual.requiredSelections ?? 1).toBe(check.requiredSelections);
      expect(Object.keys(actual.choiceExplanations ?? {}).sort()).toEqual(Object.keys(actual.choices ?? {}).sort());
      expect(actual.hasImage).toBe(false);
      expect(actual.sourcePdfUrl).toContain(`#page=${check.physicalPage}`);
      expect(actual.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(isPracticeReadyQuestion(actual)).toBe(true);
    }
  });

  it("preserves the official two-selection answer on 115 PM Q83 and measured section totals", () => {
    const q83 = byId.get("kangoshi-2025-annual-pm-q83")!;
    expect(q83.officialAnswerNumber).toBe("23");
    expect(q83.requiredSelections).toBe(2);
    expect(q83.answer).toHaveLength(2);
    for (const [year, session, count] of [[2024, "am", 119], [2024, "pm", 117], [2025, "am", 118], [2025, "pm", 118]] as const) {
      expect(KANGOSHI_QUESTIONS.filter(question => question.year === year && question.session === session), `${year}-${session}`).toHaveLength(count);
    }
  });
});
