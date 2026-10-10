import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { historicalNurseHash } from "./nurse-pm-category-hash";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-afternoon-three-go-20261010/INTEGRATION.json";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("nursing PM three primary-evidence originals", () => {
  it("preserves the previous 427 question objects and the excluded originals", () => {
    expect(proof.baseCommit).toBe("7a6aa981");
    expect(proof.previous427ObjectHashes).toHaveLength(427);
    for (const old of proof.previous427ObjectHashes) expect(historicalNurseHash(byId.get(old.id), old.id), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(442);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(442);
    expect(KANGOSHI_QUESTIONS.reduce((n, q) => n + Object.keys(q.choices ?? {}).length, 0)).toBe(1827);
    expect(KANGOSHI_QUESTIONS.filter(q => q.numericAnswer)).toHaveLength(2);
    for (const id of proof.keptUnregistered) expect(byId.has(id), id).toBe(false);
  });

  it("keeps the exact official stems, choices, keys and PM year", () => {
    expect(proof.sourceChecks).toHaveLength(3);
    for (const check of proof.sourceChecks) {
      const q = byId.get(check.id)!;
      expect(historicalNurseHash(q, check.id), check.id).toBe(check.objectSha256);
      expect(q.year).toBe(check.year);
      expect(q.session).toBe("pm");
      expect(q.qNumber).toBe(check.qNumber);
      expect(q.question).toBe(check.sourceStem);
      expect(Object.values(q.choices ?? {})).toEqual(check.sourceChoices);
      const selected = Array.isArray(q.answer) ? q.answer : [q.answer];
      expect(selected.map(answer => String(Object.keys(q.choices ?? {}).indexOf(answer as string) + 1))).toEqual(check.officialKey);
      expect(q.requiredSelections ?? 1).toBe(check.officialKey.length);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      expect(q.sourcePdfUrl).toContain(`page=${check.sourcePdfPhysicalPage}`);
      expect(q.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(isPracticeReadyQuestion(q)).toBe(true);
    }
    expect(byId.get("kangoshi-2024-annual-pm-q63")?.choices?.ウ).toContain("法律〈男女\n雇用機会均等法〉");
    expect(byId.get("kangoshi-2025-annual-pm-q86")?.answer).toEqual(["ア", "ウ"]);
    expect(byId.get("kangoshi-2025-annual-pm-q86")?.requiredSelections).toBe(2);
  });

  it("presents the updated partial-collection numbers on the exam home", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    expect(home).toContain("午前227問と午後215問");
    expect(home).toContain("計442原問");
    expect(home).toContain("全1827肢");
    expect(home).toContain("午前 問32は厚生労働省が採点対象から除外");
  });
});
