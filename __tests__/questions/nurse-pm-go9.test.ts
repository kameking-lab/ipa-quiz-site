import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-pm-go9-20261010/INTEGRATION.json";
import pm4 from "@/docs/evidence/nurse-pm4-followup-20261010/INTEGRATION.json";
import candidates from "@/docs/evidence/nurse-pm-go9-20261010/SOURCE-CANDIDATES.json";
import receipts from "@/docs/evidence/nurse-pm-go9-20261010/SOURCE-RECEIPTS.json";
import { nurseObjectHash } from "./nurse-pm-category-hash";
import lineEndingProof from "@/docs/evidence/next75-line-ending-reconciliation-20261010.json";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));
const expectedIds = [
  "kangoshi-2024-annual-pm-q43", "kangoshi-2024-annual-pm-q20", "kangoshi-2024-annual-pm-q56",
  "kangoshi-2025-annual-pm-q98", "kangoshi-2025-annual-pm-q97", "kangoshi-2025-annual-pm-q99",
  "kangoshi-2025-annual-pm-q105", "kangoshi-2025-annual-pm-q100", "kangoshi-2025-annual-pm-q120",
];

describe("nine separately verified nursing PM originals", () => {
  it("keeps all 442 prior objects intact and adds only nine frozen IDs", () => {
    expect(proof.baseCommit).toBe("b6943bc5aa3c031f836d737abcec26ed5c03455f");
    expect(proof.previous442ObjectHashes).toHaveLength(442);
    for (const old of proof.previous442ObjectHashes) {
      expect(nurseObjectHash(byId.get(old.id)), old.id).toBe(old.sha256);
    }
    expect(proof.addedIds).toEqual(expectedIds);
    expect(candidates.map(question => question.id)).toEqual(expectedIds);
    expect(receipts.map(receipt => receipt.id)).toEqual(expectedIds);
    expect(KANGOSHI_QUESTIONS).toHaveLength(pm4.totalOriginals + 2);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(pm4.totalOriginals + 2);
    expect(KANGOSHI_QUESTIONS.reduce((sum, question) => sum + Object.keys(question.choices ?? {}).length, 0)).toBe(pm4.totalChoices + 8);
    expect(proof.totalOriginals).toBe(451);
    expect(proof.totalChoices).toBe(1863);
    expect(KANGOSHI_QUESTIONS.filter(question => question.numericAnswer)).toHaveLength(2);
    for (const id of proof.keptUnregistered) expect(byId.has(id), id).toBe(false);
  });

  it("matches official original text, all choices, accepted keys, section and source per ID", () => {
    expect(proof.sourceChecks).toHaveLength(9);
    for (const check of proof.sourceChecks) {
      const question = byId.get(check.id)!;
      const source = candidates.find(candidate => candidate.id === check.id)!;
      const receipt = receipts.find(item => item.id === check.id)!;
      expect(nurseObjectHash(question), check.id).toBe(check.objectSha256);
      expect(question).toEqual(source);
      expect(receipt.goCandidateSha256).toBe(check.candidateFileSha256);
      expect(receipt.sourcePacketSha256).toBe(check.sourcePacketSha256);
      expect(receipt.sourcePdfSha256).toBe(check.sourcePdfSha256);
      expect(receipt.sourceAnswerPdfSha256).toBe(check.officialAnswerPdfSha256);
      expect(receipt.sourcePageImageSha256).toBe(check.sourcePageImageSha256);
      expect(question.year).toBe(check.year);
      expect(question.session).toBe("pm");
      expect(question.qNumber).toBe(check.qNumber);
      expect(question.category).toBe(check.category);
      expect(question.subject).toBe(`午後（${check.category}）`);
      expect(question.topicTags?.[0]).toBe(check.category);
      expect(question.question).toBe(check.sourceStem);
      expect(Object.values(question.choices ?? {})).toEqual(check.sourceChoices);
      expect(question.officialAnswerNumber).toBe(check.officialKey.join(""));
      expect(question.answer).toBe(Object.keys(question.choices ?? {})[Number(check.officialKey[0]) - 1]);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(question.officialReferenceUrls).toEqual(check.primaryReferenceUrls);
      expect(question.sourcePdfUrl).toContain(`#page=${check.physicalPage}`);
      expect(question.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(question.hasImage).toBe(false);
      expect(isPracticeReadyQuestion(question)).toBe(true);
    }
    for (const check of proof.sourceChecks) {
      if (!check.repairedSourcePacketFile) continue;
      const path = `docs/evidence/nurse-pm-go9-20261010/${check.repairedSourcePacketFile}`;
      const bytes = readFileSync(path);
      const recorded = lineEndingProof.files.find(file => file.path === path)!;
      expect(recorded.originalWorkingSha256, check.id).toBe(check.repairedSourcePacketSha256);
      expect(createHash("sha256").update(bytes.toString("utf8").replace(/\r\n/g, "\n")).digest("hex"), check.id)
        .toBe(recorded.gitBlobSha256);
      const repaired = JSON.parse(bytes.toString("utf8")) as {
        originalSourcePacketSha256: string;
        question: { sharedCaseText?: string; stem: string; choices: string[] };
      };
      expect(repaired.originalSourcePacketSha256).toBe(check.sourcePacketSha256);
      expect(`${repaired.question.sharedCaseText}\n\n${repaired.question.stem}`).toBe(check.sourceStem);
      expect(repaired.question.choices).toEqual(check.sourceChoices);
    }
    for (const number of [97, 98, 99]) expect(byId.get(`kangoshi-2025-annual-pm-q${number}`)?.question).toContain("次の文を読み97～99 の問いに答えよ。");
    expect(byId.get("kangoshi-2025-annual-pm-q100")?.question).toContain("次の文を読み100～102 の問いに答えよ。");
    expect(byId.get("kangoshi-2025-annual-pm-q105")?.question).toContain("次の文を読み103～105 の問いに答えよ。");
    expect(byId.get("kangoshi-2025-annual-pm-q120")?.question).toContain("次の文を読み118～120 の問いに答えよ。");
  });

  it("shows exact partial coverage and continues to exclude the officially unscored original", () => {
    const home = readFileSync("app/[exam]/page.tsx", "utf8");
    expect(home).toContain("午前235問と午後228問");
    expect(home).toContain("計463原問");
    expect(home).toContain("全1914肢");
    expect(home).toContain("第115回は午前117問・午後115問、第114回は午前118問・午後113問");
    expect(home).toContain("第115回午前 問32は厚生労働省が採点対象から除外");
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2025 && q.session === "pm")).toHaveLength(115);
    expect(KANGOSHI_QUESTIONS.filter(q => q.year === 2024 && q.session === "pm")).toHaveLength(113);
  });
});
