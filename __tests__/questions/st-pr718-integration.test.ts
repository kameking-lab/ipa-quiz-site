// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { ST_QUESTIONS, ST_PR718_ADOPTED_IDS, ST_PR757_ADOPTED_IDS } from "@/data/questions/st";
import { SC_ST_TRANSCRIPTIONS } from "@/data/questions/corrections/sc-st-transcriptions-20261119";
import { BY_YEAR_QUESTIONS } from "@/data/questions/st/by-year";
import corrections from "@/docs/evidence/st-residual11-20261011/source-corrections.json";
import receipt from "@/docs/evidence/st-all-choice-explanations-20261011/RECHECK-20261110.json";
import official from "@/docs/evidence/st-all-choice-explanations-20261011/official-keys.json";
import releaseRuntimePins from "@/__tests__/fixtures/cx-release-20261110-runtime-pins.json";

const hash = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
describe("PR718 gap-only adoption on current main", () => {
  it("preserves every original and all previously reviewed explanations", () => {
    const receiptQuestions = ST_QUESTIONS.filter(q => q.session === "am1" || q.session === "am2");
    expect(receiptQuestions).toHaveLength(879);
    expect(new Set(ST_QUESTIONS.map(q => q.id)).size).toBe(ST_QUESTIONS.length);
    const residual = new Set(ST_PR757_ADOPTED_IDS);
    const historicalStems = new Map<string, string>();
    for (const id of ["st-2011a-am1-q29", "st-2013h-am1-q29"]) {
      const original = BY_YEAR_QUESTIONS.find(q => q.id === id)!;
      const published = receiptQuestions.find(q => q.id === id)!;
      const transcription = SC_ST_TRANSCRIPTIONS[id];
      expect(published.question, id).toBe(transcription.question);
      expect(published.question, id).toContain("| 継続的投資 | 100 | 200 | 300 |");
      expect(published.sourceAnswerUrl, id).toBe(transcription.sourceAnswerUrl);
      expect(published.answer, id).toBe("エ");
      historicalStems.set(id, original.question);
    }
    const previousCore = receiptQuestions.map(q => {
      const before = residual.has(q.id) ? corrections.find(row => row.id === q.id)?.before : undefined;
      const { id, type, question, choices, answer } = { ...q, ...before };
      return { id, type, question: historicalStems.get(id) ?? question, choices, answer };
    });
    expect(hash(previousCore)).toBe(receipt.coreSha256);
    const adopted = new Set(ST_PR718_ADOPTED_IDS);
    expect(adopted.size).toBe(412);
    expect([...adopted].sort()).toEqual([...receipt.adoptedIds].sort());
    // k8st refines two SCOR reasons in accepted399 after the PR718 receipt.
    // Preserve that historical receipt and pin the integrated reviewed result.
    expect(hash(receiptQuestions.filter(q => !adopted.has(q.id) && !residual.has(q.id) && q.choiceExplanations))).toBe(releaseRuntimePins.stExistingExplainedSha256);
  });
  it("binds all adopted explanation targets to official keys", () => {
    for (const id of ST_PR718_ADOPTED_IDS) {
      const q = ST_QUESTIONS.find(q => q.id === id)!;
      const paper = `${q.year}/${q.season}/${q.session}` as keyof typeof official;
      expect(q.answer, id).toBe(official[paper].answers[q.qNumber - 1]);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      for (const text of Object.values(q.choiceExplanations ?? {})) expect(text!.length).toBeGreaterThanOrEqual(40);
    }
  });
});
