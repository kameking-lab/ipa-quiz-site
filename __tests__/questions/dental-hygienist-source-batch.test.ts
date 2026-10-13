import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { inspectDentalSourceBatch, type DentalOfficialAnswer, type DentalRecoveredDraft } from "@/scripts/lib/dental-hygienist-source-batch";

const directory = path.resolve("docs/evidence/dental-hygienist-latest-two-20261011");
function fixture() {
  return {
    answers: JSON.parse(readFileSync(path.join(directory, "official-answers.json"), "utf8")) as DentalOfficialAnswer[],
    receipts: JSON.parse(readFileSync(path.join(directory, "source-receipts.json"), "utf8")) as unknown,
    drafts: JSON.parse(readFileSync(path.join(directory, "recovered-drafts.json"), "utf8")) as DentalRecoveredDraft[],
  };
}
function original(drafts: DentalRecoveredDraft[], round: number, session: string, qNumber: number) {
  const result = drafts.find((row) => row.round === round && row.session === session && row.qNumber === qNumber);
  if (!result) throw new Error("Missing test original");
  return result;
}

describe("歯科衛生士35/34の公式原本・採点台帳", () => {
  it("accounts for all 440 unique official identities and preserves 435 scored questions", () => {
    const { answers, drafts, receipts } = fixture();
    const result = inspectDentalSourceBatch(answers, drafts, receipts);
    expect(result).toMatchObject({ officialAnswerRows: 440, officialScoredQuestions: 435, recoveredOriginals: 8, missingOriginals: 432, completeOriginals: 7, fullChoiceExplanationDrafts: 7, sitePublishedIncrement: 0 });
    expect(new Set(result.items.map((item) => item.key)).size).toBe(440);
  });
  it("preserves scoring holds after the three scholarly checks are resolved", () => {
    const { answers, drafts, receipts } = fixture();
    const result = inspectDentalSourceBatch(answers, drafts, receipts);
    for (const key of ["34-am-8", "34-am-10", "34-pm-37"]) {
      const draft = drafts.find((row) => `${row.round}-${row.session}-${row.qNumber}` === key);
      const item = result.items.find((row) => row.key === key);
      expect(draft?.needsReviewReasons).toEqual([]);
      expect(draft?.referenceUrls.length).toBeGreaterThan(0);
      expect(item).toMatchObject({ fullChoiceExplanations: true, candidateForQuestionImport: false });
      expect(item?.holds).toEqual([key === "34-pm-37" ? "official-all-correct-no-academic-answer" : "official-excluded-no-academic-answer"]);
    }
    expect(result.candidateQuestions).toBe(1);
    expect(result.sitePublishedIncrement).toBe(0);
  });
  it("rejects both duplicate official keys and missing rows", () => {
    const { answers, drafts, receipts } = fixture();
    expect(() => inspectDentalSourceBatch([...answers.slice(1), answers[1]], drafts, receipts)).toThrow(/Duplicate official question/);
    expect(() => inspectDentalSourceBatch(answers.slice(1), drafts, receipts)).toThrow(/Expected 440/);
  });
  it("rejects an invented answer for excluded and all-correct questions", () => {
    for (const scoring of ["excluded", "all-correct"] as const) {
      const { answers, drafts, receipts } = fixture();
      const row = answers.find((answer) => answer.scoring === scoring);
      if (!row) throw new Error("Missing test scoring case");
      row.acceptedChoices = ["b"];
      expect(() => inspectDentalSourceBatch(answers, drafts, receipts)).toThrow(/Do not fabricate/);
    }
  });
  it("does not turn official alternatives a OR c into a two-choice question", () => {
    const { answers, drafts, receipts } = fixture();
    original(drafts, 34, "am", 14).requiredSelections = 2;
    expect(() => inspectDentalSourceBatch(answers, drafts, receipts)).toThrow(/require one selection/);
  });
  it("holds the absent original photograph regardless of official answer availability", () => {
    const { answers, drafts, receipts } = fixture();
    const draft = original(drafts, 35, "am", 97);
    draft.choiceExplanations = { a: "仮の解説", b: "仮の解説", c: "仮の解説", d: "仮の解説" };
    const row = inspectDentalSourceBatch(answers, drafts, receipts).items.find((item) => item.key === "35-am-97");
    expect(row).toMatchObject({ candidateForQuestionImport: false, fullChoiceExplanations: true });
    expect(row?.holds).toContain("official-figure-missing");
  });
  it("requires all four choice explanations and retains local review holds", () => {
    const { answers, drafts, receipts } = fixture();
    const draft = original(drafts, 34, "am", 14);
    draft.needsReviewReasons = [];
    expect(inspectDentalSourceBatch(answers, drafts, receipts).candidateQuestions).toBe(1);
    delete draft.choiceExplanations.d;
    expect(inspectDentalSourceBatch(answers, drafts, receipts).candidateQuestions).toBe(0);
  });
  it("rejects a local complete flag that claims the missing No.29 photograph exists", () => {
    const { answers, drafts, receipts } = fixture();
    const draft = original(drafts, 35, "am", 97);
    draft.sourceQuestionStatus = "complete";
    draft.missingFigureReferences = [];
    expect(() => inspectDentalSourceBatch(answers, drafts, receipts)).toThrow(/omits the referenced photograph/);
  });
  it("rejects a recovered PDF checksum that differs from the official acquisition receipt", () => {
    const { answers, drafts, receipts } = fixture();
    original(drafts, 34, "am", 14).sourcePdfSha256 = "0".repeat(64);
    expect(() => inspectDentalSourceBatch(answers, drafts, receipts)).toThrow(/PDF checksum mismatch/);
  });
  it("keeps excluded and all-correct items out of candidates even with complete originals and explanations", () => {
    const { answers, drafts, receipts } = fixture();
    for (const draft of drafts) draft.needsReviewReasons = [];
    const items = inspectDentalSourceBatch(answers, drafts, receipts).items;
    expect(items.filter((item) => item.scoring === "excluded" || item.scoring === "all-correct").every((item) => !item.candidateForQuestionImport)).toBe(true);
  });
  it("rejects conflicting recovered identities, answer changes and source substitutions", () => {
    const { answers, drafts, receipts } = fixture();
    expect(() => inspectDentalSourceBatch(answers, [...drafts, drafts[0]], receipts)).toThrow(/Duplicate recovered/);
    const first = answers[0];
    if (!first) throw new Error("Missing first answer");
    first.acceptedChoices = ["d"];
    expect(() => inspectDentalSourceBatch(answers, drafts, receipts)).toThrow(/Official answer mismatch/);
    first.acceptedChoices = ["a"];
    original(drafts, 34, "am", 14).sourcePdfUrl = "https://example.com/question.pdf";
    expect(() => inspectDentalSourceBatch(answers, drafts, receipts)).toThrow(/original source mismatch/);
  });
});
