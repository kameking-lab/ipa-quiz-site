import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import go9 from "@/docs/evidence/nurse-pm-go9-20261010/INTEGRATION.json";
import pm4 from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-pm-three-later-20261010/INTEGRATION.json";
import candidates from "@/docs/evidence/nurse-pm-three-later-20261010/SOURCE-CANDIDATES.json";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("three later primary-verified nursing PM originals", () => {
  it("retains every corrected 430 object byte-for-byte and adds exactly three originals", () => {
    expect(proof.baseCommit).toBe("669b9da832b6980a10303ec76a407766c51f71e5");
    expect(proof.previous430ObjectHashes).toHaveLength(430);
    for (const old of proof.previous430ObjectHashes) expect(nurseObjectHash(byId.get(old.id)), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(pm4.totalOriginals);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(pm4.totalOriginals);
    expect(KANGOSHI_QUESTIONS.reduce((total, question) => total + Object.keys(question.choices ?? {}).length, 0)).toBe(pm4.totalChoices);
    expect(KANGOSHI_QUESTIONS.filter(question => question.numericAnswer)).toHaveLength(2);
    expect(candidates.map(question => question.id).sort()).toEqual(proof.sourceChecks.map(check => check.id).sort());
  });

  it("retains each official stem, every choice, accepted key and full option explanations", () => {
    expect(proof.sourceChecks).toHaveLength(3);
    for (const check of proof.sourceChecks) {
      const question = byId.get(check.id)!;
      expect(nurseObjectHash(question), check.id).toBe(check.objectSha256);
      expect(question.year).toBe(check.year);
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
    for (const id of proof.keptUnregistered) if (!go9.addedIds.includes(id)) expect(byId.has(id), id).toBe(false);
  });

  it("shows the matching partial-collection counts on the exam home", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    expect(home).toContain("午前233問と午後228問");
    expect(home).toContain("計461原問");
    expect(home).toContain("全1906肢");
    expect(home).toContain("第115回は午前116問・午後115問、第114回は午前117問・午後113問");
  });
});
