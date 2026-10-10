import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-pm-four-later-20261010/INTEGRATION.json";
import candidates from "@/docs/evidence/nurse-pm-four-later-20261010/SOURCE-CANDIDATES.json";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("four additional primary-verified nursing PM originals", () => {
  it("preserves every earlier 433 object and adds only four separately verified originals", () => {
    expect(proof.baseCommit).toBe("09c9cbded397176332eba2f3dbc175d6d29b9008");
    expect(proof.previous433ObjectHashes).toHaveLength(433);
    for (const old of proof.previous433ObjectHashes) expect(nurseObjectHash(byId.get(old.id)), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(442);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(442);
    expect(KANGOSHI_QUESTIONS.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0)).toBe(1827);
    expect(KANGOSHI_QUESTIONS.filter(question => question.numericAnswer)).toHaveLength(2);
    expect(candidates.map(question => question.id).sort()).toEqual(proof.sourceChecks.map(check => check.id).sort());
  });

  it("retains the official 114th PM stem, four choices, published answer and all explanations", () => {
    expect(proof.sourceChecks).toHaveLength(4);
    for (const check of proof.sourceChecks) {
      const question = byId.get(check.id)!;
      expect(nurseObjectHash(question), check.id).toBe(check.objectSha256);
      expect(question.year).toBe(2024);
      expect(question.session).toBe("pm");
      expect(question.qNumber).toBe(check.qNumber);
      expect(question.question.endsWith(check.sourceStem)).toBe(true);
      expect(Object.values(question.choices ?? {})).toEqual(check.sourceChoices);
      expect(question.officialAnswerNumber).toBe(check.officialKey.join(""));
      const selected = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(selected.map(answer => String(Object.keys(question.choices ?? {}).indexOf(answer as string) + 1))).toEqual(check.officialKey);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(question.subject).toBe("午後（一般問題）");
      expect(question.category).toBe("一般問題");
      expect(question.topicTags?.[0]).toBe("一般問題");
      expect(question.hasImage).toBe(false);
      expect(question.sourcePdfUrl).toContain(`#page=${check.physicalPage}`);
      expect(question.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(isPracticeReadyQuestion(question)).toBe(true);
    }
    for (const id of proof.keptUnregistered) expect(byId.has(id), id).toBe(false);
  });

  it("shows the new partial collection and the official exclusion caveat on the exam home", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    expect(home).toContain("午前227問と午後215問");
    expect(home).toContain("計442原問");
    expect(home).toContain("全1827肢");
    expect(home).toContain("第115回は午前114問・午後107問、第114回は午前113問・午後108問");
    expect(home).toContain("第115回午前 問32は厚生労働省が採点対象から除外");
  });
});
