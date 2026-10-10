import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-pm-five-next-20261010/INTEGRATION.json";
import sourcePacket from "@/docs/evidence/nurse-pm-five-next-20261010/SOURCE-PACKET-Q47-RUBY-REPAIRED.json";
import candidates from "@/docs/evidence/nurse-pm-five-next-20261010/SOURCE-CANDIDATES.json";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("five additional primary-verified nursing PM originals", () => {
  it("preserves all 437 prior objects and adds exactly five documented originals", () => {
    expect(proof.baseCommit).toBe("33728f49d5ce70c2265fe570f0155bf69c1bd0d0");
    expect(proof.previous437ObjectHashes).toHaveLength(437);
    for (const old of proof.previous437ObjectHashes) expect(nurseObjectHash(byId.get(old.id)), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(442);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(442);
    expect(KANGOSHI_QUESTIONS.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0)).toBe(1827);
    expect(KANGOSHI_QUESTIONS.filter(question => question.numericAnswer)).toHaveLength(2);
    expect(candidates.map(question => question.id)).toEqual(proof.addedIds);
    expect(proof.addedIds).toEqual([39, 40, 42, 47, 49].map(qNumber => `kangoshi-2024-annual-pm-q${qNumber}`));
  });

  it("checks source stem, all choices, official key, all explanations and eligibility", () => {
    expect(proof.sourceChecks).toHaveLength(5);
    for (const check of proof.sourceChecks) {
      const question = byId.get(check.id)!;
      expect(nurseObjectHash(question), check.id).toBe(check.objectSha256);
      expect(question.year).toBe(2024);
      expect(question.session).toBe("pm");
      expect(question.qNumber).toBe(check.qNumber);
      expect(question.question).toBe(check.sourceStem);
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

  it("repairs only the Q47 ruby transcription against the rendered official page", () => {
    const q47 = sourcePacket.questions.find(question => question.question === 47)!;
    expect(q47.stem).toBe("乳房温存療法で放射線治療を受ける乳癌患者への説明で適切なのはどれか。");
    expect(q47.stem).toBe(proof.q47Repair.after);
    expect(proof.q47Repair.before).toContain("\nbreast cancer\n");
    expect(q47.choices).toEqual(proof.sourceChecks.find(check => check.qNumber === 47)!.sourceChoices);
    expect(q47.officialAcceptedAnswerNumbers).toEqual(["3"]);
    expect(q47.sourcePageImage.sha256).toBe(proof.sourceChecks.find(check => check.qNumber === 47)!.sourcePageImageSha256);
  });

  it("shows precise partial totals and the official excluded-original caveat", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    expect(home).toContain("午前227問と午後215問");
    expect(home).toContain("午後215原問を加え、計442原問");
    expect(home).toContain("全1827肢");
    expect(home).toContain("第115回は午前114問・午後107問、第114回は午前113問・午後108問");
    expect(home).toContain("第115回午前 問32は厚生労働省が採点対象から除外");
  });
});
