import { describe, expect, it } from "vitest";
import { KENCHIKU_SETSUBISHI_QUESTIONS, KENCHIKU_SETSUBISHI_STUDY_QUESTIONS, KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS } from "@/data/questions/kenchiku-setsubishi";
import { readKenchikuSavedSource } from "@/data/questions/kenchiku-setsubishi/saved-source-reader";
import { validateKenchikuIngestion } from "../../scripts/validate-qkensetsu";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";

describe("Building equipment engineer: two actual first examinations", () => {
  it("binds all originals, official answers, reasons, assets and reused acceptance to fixed hashes", () => {
    expect(validateKenchikuIngestion()).toMatchObject({ status: "PASS", materials: 210, study: 209, referenceOnly: 1, choiceReasons: 840, imageAssets: 32 });
  });
  it("keeps disputed 2026 building law Q18 outside the normal study pool", () => {
    const [q] = KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS;
    expect(isReferenceOnlyQuestionId(q.id)).toBe(true);
    expect(q.needsReview).toBe(true);
    expect(q.officialAnswerNumber).toBe("1");
    expect(q.questionNotice).toBeTruthy();
    expect(KENCHIKU_SETSUBISHI_STUDY_QUESTIONS.some((item) => isReferenceOnlyQuestionId(item.id))).toBe(false);
    expect(() => readKenchikuSavedSource([{ ...q, assessmentMode: undefined }])).toThrow();
    expect(() => readKenchikuSavedSource([{ ...q, needsReview: false }])).toThrow();
  });
  it("rejects missing choice reasons and mismatched official answer numbers", () => {
    const q = KENCHIKU_SETSUBISHI_QUESTIONS[0];
    expect(() => readKenchikuSavedSource([{ ...q, choiceExplanations: {} }])).toThrow();
    expect(() => readKenchikuSavedSource([{ ...q, officialAnswerNumber: q.officialAnswerNumber === "1" ? "2" : "1" }])).toThrow();
    expect(() => readKenchikuSavedSource([{ ...q, sourceAnswerUrl: "https://example.com/unofficial.pdf" }])).toThrow();
    expect(() => readKenchikuSavedSource([{ ...q, assessmentMode: "reference-only" }])).toThrow();
  });
});
