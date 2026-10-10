import { describe, expect, it } from "vitest";
import { historicalNurseHash } from "./nurse-pm-category-hash";
import { KANGOSHI_QUESTIONS } from "@/data/questions/kangoshi";
import go9 from "@/docs/evidence/nurse-pm-go9-20261010/INTEGRATION.json";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import proof from "@/docs/evidence/nurse-afternoon-go-20261010/INTEGRATION.json";
import sourceCandidates from "@/docs/evidence/nurse-afternoon-go-20261010/SOURCE-CANDIDATES.json";
import laterProof from "@/docs/evidence/nurse-afternoon-nine-go-20261010/INTEGRATION.json";
import latestProof from "@/docs/evidence/nurse-afternoon-three-go-20261010/INTEGRATION.json";
import laterThree from "@/docs/evidence/nurse-pm-three-later-20261010/INTEGRATION.json";
import laterFour from "@/docs/evidence/nurse-pm-four-later-20261010/INTEGRATION.json";
import laterFive from "@/docs/evidence/nurse-pm-five-next-20261010/INTEGRATION.json";

const byId = new Map(KANGOSHI_QUESTIONS.map(question => [question.id, question]));

describe("nursing afternoon post-PR662 GO delta", () => {
  it("retains all 387 originals unchanged and registers only the 29 frozen GO IDs", () => {
    expect(proof.baseCommit).toBe("295e4d9eb466a71f813c62e46bd826f2f96ef9a2");
    expect(proof.previous387ObjectHashes).toHaveLength(387);
    for (const old of proof.previous387ObjectHashes) expect(historicalNurseHash(byId.get(old.id), old.id), old.id).toBe(old.sha256);
    expect(KANGOSHI_QUESTIONS).toHaveLength(461);
    expect(new Set(KANGOSHI_QUESTIONS.map(question => question.id)).size).toBe(461);
    expect(proof.addedIds).toHaveLength(29);
    expect(sourceCandidates.map(question => question.id).sort()).toEqual(proof.addedIds);
    expect(sourceCandidates.reduce((count, question) => count + Object.keys(question.choices).length, 0)).toBe(118);
  });

  it("preserves original stem, every choice, the official key, shared case and source on each addition", () => {
    for (const batch of proof.batches) for (const check of batch.sourceChecks) {
      const question = byId.get(check.id);
      expect(question, check.id).toBeDefined();
      expect(historicalNurseHash(question, check.id), check.id).toBe(check.objectSha256);
      expect(question?.session).toBe("pm");
      expect(question?.year).toBe(check.id.includes("-2024-") ? 2024 : 2025);
      expect(question?.question.endsWith(check.sourceStem)).toBe(true);
      expect(Object.values(question?.choices ?? {})).toEqual(check.sourceChoices);
      expect(question?.officialAnswerNumber).toBe(check.officialAnswerNumbers.join(""));
      const answers = Array.isArray(question?.answer) ? question.answer : [question?.answer];
      expect(answers.map(answer => String(Object.keys(question?.choices ?? {}).indexOf(answer as string) + 1))).toEqual(check.officialAnswerNumbers);
      expect(Object.keys(question?.choiceExplanations ?? {}).sort()).toEqual(Object.keys(question?.choices ?? {}).sort());
      expect(question?.sourcePdfUrl).toContain("mhlw.go.jp");
      expect(question?.sourceAnswerUrl).toContain("mhlw.go.jp");
      expect(question?.hasImage).toBe(false);
      expect(isPracticeReadyQuestion(question!)).toBe(true);
    }
    const multi = byId.get("kangoshi-2024-annual-pm-q95");
    expect(multi?.answer).toEqual(["エ", "オ"]);
    expect(multi?.requiredSelections).toBe(2);
    expect(multi?.officialAnswerNumber).toBe("45");
  });

  it("keeps every unresolved and figure-dependent original out of the quiz registry", () => {
    const laterPm4GoIds = new Set([
      "kangoshi-2024-annual-pm-q3",
      "kangoshi-2024-annual-pm-q61",
      "kangoshi-2025-annual-pm-q78",
      "kangoshi-2025-annual-pm-q83",
    ]); // Source and official-key checks are in nurse-pm4-followup.test.ts.
    for (const held of proof.remainingHeldByScope) {
      const year = held.scope.startsWith("114-") ? 2024 : 2025;
      for (const qNumber of held.questionNumbers) {
        const id = `kangoshi-${year}-annual-pm-q${qNumber}`;
        if ((year === 2024 && qNumber === 19) || (year === 2025 && qNumber === 58) || laterProof.sourceChecks.some(check => check.id === id) || latestProof.sourceChecks.some(check => check.id === id) || laterThree.sourceChecks.some(check => check.id === id) || laterFour.sourceChecks.some(check => check.id === id) || laterFive.addedIds.includes(id) || go9.addedIds.includes(id) || laterPm4GoIds.has(id)) continue; // Verified follow-up originals, each checked against its source by dedicated tests.
        expect(byId.has(`kangoshi-${year}-annual-pm-q${qNumber}`)).toBe(false);
      }
    }
    for (const id of proof.sourceConflictWithoutDraft) expect(byId.has(id)).toBe(false);
  });
});
