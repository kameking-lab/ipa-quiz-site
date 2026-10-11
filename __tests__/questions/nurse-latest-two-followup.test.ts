import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import additions from "@/data/questions/kangoshi/followup-20261011.json";
import candidates from "@/docs/evidence/nurse-latest-two-followup-20261011/CANDIDATE-QUESTIONS.json";
import saved from "@/docs/evidence/nurse-latest-two-followup-20261011/SAVED-DRAFTS.json";
import proof from "@/docs/evidence/nurse-latest-two-followup-20261011/INTEGRATION.json";
import review from "@/docs/evidence/nurse-latest-two-followup-20261011/INDEPENDENT-REVIEW.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { nurseObjectHash } from "./nurse-pm-category-hash";

const byId = new Map(KANGOSHI_QUESTIONS.map(q => [q.id, q]));
const sha = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");

describe("nursing latest two examinations: eight saved-draft follow-ups", () => {
  it("preserves all 464 existing originals and excludes PR683 and every individual STOP", () => {
    expect(KANGOSHI_QUESTIONS).toHaveLength(472);
    expect(new Set(KANGOSHI_QUESTIONS.map(q => q.id)).size).toBe(472);
    expect(new Set(KANGOSHI_QUESTIONS.map(q => `${q.year}:${q.session}:${q.qNumber}`)).size).toBe(472);
    for (const row of proof.previous464ObjectHashes) expect(nurseObjectHash(byId.get(row.id)), row.id).toBe(row.sha256);
    for (const row of proof.originalFileHashes) expect(sha(readFileSync(row.path)), row.path).toBe(row.sha256);
    for (const id of [...proof.existingPr683Ids, ...proof.stopIdsUnchanged]) expect(byId.has(id), id).toBe(false);
    expect(additions).toHaveLength(8);
    expect(additions.reduce((n,q) => n+Object.keys(q.choices).length,0)).toBe(35);
    expect(KANGOSHI_QUESTIONS.reduce((n,q) => n+Object.keys(q.choices ?? {}).length,0)).toBe(1953);
    for (const [year,session,count] of [[2024,"am",119],[2024,"pm",117],[2025,"am",118],[2025,"pm",118]] as const)
      expect(KANGOSHI_QUESTIONS.filter(q => q.year===year && q.session===session)).toHaveLength(count);
  });

  it("imports exactly the independently accepted content with only needsReview cleared", () => {
    expect(sha(readFileSync("docs/evidence/nurse-latest-two-followup-20261011/CANDIDATE-QUESTIONS.json"))).toBe(review.finalEightCandidateReview.fileSha256);
    expect(review.finalEightCandidateReview.verdict).toBe("PASS_LOCAL_CONTENT");
    expect(additions.map(q => q.id)).toEqual(proof.addedIds);
    for (const candidate of candidates) {
      const actual=byId.get(candidate.id)!;
      expect(actual).toEqual({...candidate,needsReview:false});
      const semantic = Object.fromEntries(Object.entries(actual).filter(([key]) => key !== "needsReview"));
      expect(nurseObjectHash(semantic)).toBe(review.finalEightCandidateReview.perQuestionSemanticHashesExcludingNeedsReview.find(r => r.id===actual.id)?.sha256);
      expect(isPracticeReadyQuestion(actual),actual.id).toBe(true);
      expect(actual.explanationCoverage).toBe("full");
      expect(Object.keys(actual.choiceExplanations ?? {})).toEqual(Object.keys(actual.choices ?? {}));
      for (const text of Object.values(actual.choiceExplanations ?? {})) expect(text.length).toBeGreaterThan(40);
    }
  });

  it("retains saved original stems, all choices, official answers, shared cases and correct source pages", () => {
    for (const draft of saved) {
      const actual=byId.get(draft.id)!;
      for (const field of ["id","year","session","qNumber","question","choices","answer","requiredSelections","hasImage","sourcePdfUrl","license","sourceAttribution"] as const)
        expect(actual[field],`${actual.id}:${field}`).toEqual(draft.question[field]);
      expect(actual.officialAnswerNumber).toBe(draft.source.officialAcceptedAnswerNumbers.join(""));
      const keys=Object.keys(actual.choices ?? {});
      const selected=Array.isArray(actual.answer)?actual.answer:[actual.answer];
      expect(selected.map(k => String(keys.indexOf(k as string)+1)).join("")).toBe(actual.officialAnswerNumber);
      expect(selected).toHaveLength(actual.requiredSelections ?? 1);
      expect(actual.sourcePdfUrl).toContain(`#page=${draft.source.physicalPage}`);
      expect(draft.source.figurePresent).toBe(false);
      expect(draft.source.questionPdfSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(draft.source.answerPdfSha256).toMatch(/^[a-f0-9]{64}$/);
      if(actual.session==="pm" && actual.qNumber>80) expect(actual.sourceAnswerUrl).toContain("#page=2");
    }
    expect(byId.get("kangoshi-2024-annual-am-q98")?.question).toContain("50 歳");
    expect(byId.get("kangoshi-2025-annual-am-q103")?.question).toContain("10 歳");
    expect(byId.get("kangoshi-2024-annual-pm-q60")?.category).toBe("一般問題");
    expect(byId.get("kangoshi-2024-annual-pm-q62")?.category).toBe("一般問題");
  });

  it("keeps explicit learning notes where official scoring and explanatory sources differ", () => {
    expect(proof.retainedEvidenceLimits).toHaveLength(3);
    for(const row of proof.retainedEvidenceLimits) {
      expect(byId.get(row.id)?.explanation).toContain(row.note);
      expect(row.officialAnswerChanged).toBe(false);
      expect(row.clinicalOrScientificCorrespondenceResolved).toBe(false);
    }
    expect(byId.get("kangoshi-2025-annual-am-q103")?.choiceExplanations?.ウ).toContain("大発作を除外できるという意味ではありません");
    expect(byId.get("kangoshi-2024-annual-am-q98")?.choiceExplanations?.ア).toContain("常に禁忌");
    expect(byId.get("kangoshi-2025-annual-pm-q87")?.choiceExplanations?.オ).toContain("個人");
    expect(byId.get("kangoshi-2025-annual-pm-q88")?.choiceExplanations?.ア).toContain("全員");
    expect(proof.mergePerformed).toBe(false);
    expect(proof.deployed).toBe(false);
  });
});
