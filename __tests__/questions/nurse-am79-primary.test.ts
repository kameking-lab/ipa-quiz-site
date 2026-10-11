import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import candidate from "@/docs/evidence/nurse-am79-20261011/CANDIDATE.json";
import review from "@/docs/evidence/nurse-am79-20261011/INDEPENDENT-REVIEW.json";
import proof from "@/docs/evidence/nurse-am79-20261011/INTEGRATION.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("nursing 115AM79: one bounded primary-source resolution", () => {
  it("adopts only the independently accepted content and preserves the official single answer", () => {
    const actual = byId.get(candidate.id)!;
    expect(actual).toEqual({ ...candidate, needsReview: false });
    const snapshot = Object.fromEntries(proof.reviewedFields.map(field => [field, actual[field as keyof typeof actual]]));
    expect(nurseObjectHash(snapshot)).toBe(proof.acceptedReviewedFieldsSha256);
    expect(review.item.verdict).toBe("GO");
    expect(review.item.acceptedMinimalDifference.acceptedReviewedFieldsSha256).toBe(proof.acceptedReviewedFieldsSha256);
    expect(actual.answer).toBe("オ");
    expect(actual.officialAnswerNumber).toBe("5");
    expect(actual.requiredSelections).toBe(1);
    expect(actual.sourcePdfUrl).toContain("tp260424-05a_01.pdf#page=30");
    expect(actual.sourceAnswerUrl).toContain("tp260424-05seitou.pdf#page=1");
    expect(Object.keys(actual.choiceExplanations ?? {})).toEqual(Object.keys(actual.choices ?? {}));
    expect(isPracticeReadyQuestion(actual)).toBe(true);
  });

  it("keeps the dated 468 figure assigned to public health offices without inventing a municipal-center total", () => {
    expect(proof.sourceTable).toMatchObject({ asOf: "2024-04-01", institution: "保健所", nationalCount: 468, physicalPage: 31, printedPage: 57 });
    expect(proof.sourceTable.pdfSha256).toBe("05d7df810592b3dbd6d0f0f36cb472c902c3968225c9d9c54f779614e84b7685");
    expect(proof.officialAnswer).toMatchObject({ row: "A079", value: "5" });
    expect(candidate.choiceExplanations.エ).toContain("保健所の総数");
    expect(candidate.choices.エ).toBe("令和6年（2024年）の全国の設置数は468か所である。");
    expect(candidate.choiceExplanations.エ).not.toContain("2千か所台");
  });

  it("preserves all previous 472 objects and eight-question receipts while retaining the other four STOPs", () => {
    for (const previous of proof.previous472ObjectHashes) expect(nurseObjectHash(byId.get(previous.id)), previous.id).toBe(previous.sha256);
    const bytes = readFileSync(proof.previousEightFile, "utf8").replace(/\r\n/g, "\n");
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(proof.previousEightSha256Lf);
    expect(proof.resolvedStopIds).toEqual([candidate.id]);
    expect(proof.remainingStopIds).toHaveLength(4);
    for (const id of proof.remainingStopIds) expect(byId.has(id), id).toBe(false);
    expect(KANGOSHI_QUESTIONS).toHaveLength(473);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => `${question.year}:${question.session}:${question.qNumber}`)).size).toBe(473);
    expect(proof.expectedCombinedWithPr683).toBe(476);
    expect(proof.mergePerformed).toBe(false);
    expect(proof.deployed).toBe(false);
  });
});
