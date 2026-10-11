import { describe, expect, it } from "vitest";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { KISHO_PRACTICAL_FIELD_IDS, KISHO_PUBLICATION, KISHO_REQUIRED_ORIGINALS, KISHO_SITTINGS } from "@/lib/kisho/scope";
import { inspectKishoAnswerFields, inspectKishoDraftCoverage, kishoDraftCollectionSchema, kishoDraftQuestionSchema, verifyKishoOfficialAnswers } from "@/lib/kisho/schema";

// Synthetic strings; these fixtures contain no official question text or answer table.
function fixture() {
  const texts = { ア: "synthetic A", イ: "synthetic B", ウ: "synthetic C", エ: "synthetic D", オ: "synthetic E" };
  return {
    id: "kisho-66-ippan-q01", exam: "kisho", session: "ippan", year: 2026, fiscalYear: 2026, season: "first",
    qNumber: 1, type: "multiple-choice", category: "synthetic", topicTags: ["synthetic"], difficulty: 1,
    question: "Synthetic question", answer: "オ", explanation: "Synthetic rationale",
    choices: texts, choiceExplanations: texts, officialAnswerNumber: "5", explanationCoverage: "full",
    hasImage: false, imageUrls: [], imageAltTexts: [],
    sourcePdfUrl: KISHO_SITTINGS[0].sourceZipUrl, sourceAnswerUrl: KISHO_SITTINGS[0].sourceZipUrl,
    sourceAttribution: "Synthetic source binding", officialReferenceUrls: [KISHO_SITTINGS[0].sourceZipUrl],
    license: "JMBSC-permission-required", lastUpdated: "2026-10-11", needsReview: false,
  };
}

describe("Kisho private preparation", () => {
  it("counts each practical original once and keeps publication inactive", () => {
    expect(KISHO_REQUIRED_ORIGINALS).toBe(78);
    expect(KISHO_SITTINGS.map((sitting) => Object.values(sitting.sections).reduce((sum, n) => sum + n, 0))).toEqual([38, 40]);
    expect(KISHO_PUBLICATION.permissionVerified).toBe(false);
    const catalog = QUALIFICATION_CATALOG.find((entry) => entry.slug === "kisho");
    expect(catalog?.status).toBe("permission-required");
    expect(catalog?.examCode).toBeUndefined();
  });
  it("requires five complete explanations and consistent internal answer mapping", () => {
    expect(kishoDraftQuestionSchema.safeParse(fixture()).success).toBe(true);
    expect(kishoDraftQuestionSchema.safeParse({ ...fixture(), answer: "ア" }).success).toBe(false);
    expect(kishoDraftQuestionSchema.safeParse({ ...fixture(), choiceExplanations: { ア: "Only one" } }).success).toBe(false);
  });
  it("rejects duplicate originals, wrong fiscal years and out-of-scope numbers", () => {
    expect(kishoDraftCollectionSchema.safeParse([fixture(), fixture()]).success).toBe(false);
    expect(kishoDraftQuestionSchema.safeParse({ ...fixture(), fiscalYear: 2025 }).success).toBe(false);
    expect(kishoDraftQuestionSchema.safeParse({ ...fixture(), id: "kisho-66-ippan-q16", qNumber: 16 }).success).toBe(false);
    expect(kishoDraftQuestionSchema.safeParse({ ...fixture(), examDate: "2026-01-25" }).success).toBe(false);
  });
  it("requires practical answers, scoring criteria and paired image alternatives", () => {
    const practical = { ...fixture(), id: "kisho-66-pm1-q01", session: "pm1", type: "descriptive", choices: undefined,
      choiceExplanations: undefined, officialAnswerNumber: undefined, modelAnswer: "Synthetic answer", scoringCriteria: "Synthetic rubric" };
    expect(kishoDraftQuestionSchema.safeParse(practical).success).toBe(true);
    expect(kishoDraftQuestionSchema.safeParse({ ...practical, modelAnswer: undefined }).success).toBe(false);
    expect(kishoDraftQuestionSchema.safeParse({ ...practical, hasImage: true, imageUrls: ["figure.png"] }).success).toBe(false);
  });
  it("keeps stored, reviewed and published counts distinct", () => {
    expect(inspectKishoDraftCoverage([fixture()])).toMatchObject({ storedOriginals: 1, preparedOriginals: 1, publishedOriginals: 0, complete: false });
    expect(inspectKishoDraftCoverage([{ ...fixture(), needsReview: undefined }]).preparedOriginals).toBe(0);
    expect(inspectKishoDraftCoverage([{ ...fixture(), needsReview: true }]).preparedOriginals).toBe(0);
    expect(kishoDraftQuestionSchema.safeParse({ ...fixture(), question: "UNMAPPED-CID-123" }).success).toBe(false);
  });
  it("requires a separate rationale for every practical answer field", () => {
    const practical = { ...fixture(), id: "kisho-66-pm1-q01", session: "pm1", type: "descriptive", choices: undefined,
      choiceExplanations: undefined, officialAnswerNumber: undefined, modelAnswer: "Synthetic answer", scoringCriteria: "Synthetic rubric" };
    const questions = kishoDraftCollectionSchema.parse([practical]);
    const fields = (KISHO_PRACTICAL_FIELD_IDS[practical.id] ?? []).map((field) => ({ questionId: practical.id, field, officialAnswer: "Synthetic", explanation: "Synthetic reasoning" }));
    expect(inspectKishoAnswerFields(questions, fields)).toMatchObject({ complete: true, expectedAnswerFields: 24, explainedAnswerFields: 24 });
    expect(inspectKishoAnswerFields(questions, fields.map((field, index) => index === 0 ? { ...field, explanation: undefined } : field)).complete).toBe(false);
    expect(inspectKishoAnswerFields(questions, [...fields, fields[0]]).complete).toBe(false);
    expect(inspectKishoAnswerFields(questions, fields.map((field, index) => index === 0 ? { ...field, field: "not-an-official-field" } : field)).complete).toBe(false);
  });
  it("compares academic answers with a separate private official-key artifact", () => {
    const syntheticKey = { ippan: Array<number>(15).fill(1), senmon: Array<number>(15).fill(1) };
    const questions = kishoDraftCollectionSchema.parse([fixture()]);
    expect(verifyKishoOfficialAnswers(questions, { "65": syntheticKey, "66": syntheticKey })).toHaveLength(1);
    const matching = { ...syntheticKey, ippan: [5, ...Array<number>(14).fill(1)] };
    expect(verifyKishoOfficialAnswers(questions, { "65": syntheticKey, "66": matching })).toEqual([]);
  });
});
