// @vitest-environment node
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { getAutomotiveIntegrationReviewManifest, getAutomotiveOriginalKey, getAutomotiveWrittenDrafts } from "@/lib/automotive/get-drafts";
import { getAutomotiveReviewDisposition } from "@/lib/automotive/review-disposition";
import { AUTOMOTIVE_DRAFT_BUNDLE } from "@/data/qualification-staging/automotive/latest-two";

describe("latest two JASPA written drafts", () => {
  it("preserves the fiscal year, date, subject and original number without counting the oral supplement", () => {
    const questions = getAutomotiveWrittenDrafts();
    expect(questions).toHaveLength(610);
    expect(new Set(questions.map(getAutomotiveOriginalKey)).size).toBe(610);
    expect(getAutomotiveWrittenDrafts({ fiscalYear: 2026, term: "first" })).toHaveLength(250);
    const second = getAutomotiveWrittenDrafts({ fiscalYear: 2025, term: "second" });
    expect(second).toHaveLength(360);
    expect(second.every(q => q.year === 2025 && q.examDate === "2026-03-22")).toBe(true);
    expect(getAutomotiveWrittenDrafts({ fiscalYear: 2025, subject: "2-chassis" })).toHaveLength(30);
    expect(AUTOMOTIVE_DRAFT_BUNDLE.oralSupplement.questions).toHaveLength(2);
    expect(AUTOMOTIVE_DRAFT_BUNDLE.oralSupplement.questions.every(q => q.officialAnswer === null)).toBe(true);
  });

  it("keeps all-accepted and inconsistent official-answer explanations out of grading", () => {
    const eligible = getAutomotiveWrittenDrafts({ gradableOnly: true });
    expect(eligible).toHaveLength(608);
    expect(eligible.some(q => q.id === "jidosha-2025-second-2-gasoline-q13")).toBe(false);
    expect(eligible.some(q => q.id === "jidosha-2026-first-2-gasoline-q31")).toBe(false);
    const withdrawn = getAutomotiveWrittenDrafts().find(q => q.id === "jidosha-2025-second-2-gasoline-q13");
    expect(withdrawn?.answer).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(withdrawn?.officialQuestionStatus).toBe("withdrawn-all-accepted");
  });

  it("hands off all 610 original identities while separating grading candidates, official treatment and technical holds", () => {
    const rows = getAutomotiveIntegrationReviewManifest();
    expect(rows).toHaveLength(610);
    expect(new Set(rows.map(row => row.originalKey)).size).toBe(610);
    expect(rows.filter(row => row.disposition === "grading-candidate")).toHaveLength(608);
    expect(rows.filter(row => row.disposition === "official-all-accepted").map(row => row.id)).toEqual(["jidosha-2025-second-2-gasoline-q13"]);
    expect(rows.filter(row => row.disposition === "technical-hold").map(row => row.id)).toEqual(["jidosha-2026-first-2-gasoline-q31"]);
    expect(rows.some(row => row.disposition === "needs-review")).toBe(false);
    expect(getAutomotiveIntegrationReviewManifest({ fiscalYear: 2026 })).toHaveLength(250);
  });

  it("keeps a recorded source conflict out of grading even if the generic review flag is accidentally cleared", () => {
    const question = getAutomotiveWrittenDrafts().find(row => row.id === "jidosha-2026-first-2-gasoline-q31");
    if (!question) throw new Error("Missing preserved conflict original");
    expect(getAutomotiveReviewDisposition({ ...question, needsReview: false })).toBe("technical-hold");
    expect(question.answer).toBe("イ");
    expect(question.officialAnswerNumber).toBe("2");
    expect(question.needsReview).toBe(true);
    expect(question.officialQuestionStatus).toBe("normal");
    const other = getAutomotiveWrittenDrafts({ gradableOnly: true })[0];
    if (!other) throw new Error("Missing grading candidate");
    expect(getAutomotiveReviewDisposition({ ...other, needsReview: true })).toBe("needs-review");
  });

  it("provides all four explanations and the original figure pages as actual files", () => {
    for (const q of getAutomotiveWrittenDrafts()) {
      expect(q.explanationCoverage, q.id).toBe("full");
      for (const key of ["ア", "イ", "ウ", "エ"] as const) {
        expect(q.choices?.[key]?.trim().length, q.id).toBeGreaterThan(0);
        expect(q.choiceExplanations?.[key]?.trim().length, q.id).toBeGreaterThan(0);
      }
      if (q.hasImage) {
        expect(q.sourceFigureAssets.length, q.id).toBeGreaterThan(0);
        for (const asset of q.sourceFigureAssets) {
          expect(fs.existsSync(path.join(process.cwd(), "data/qualification-staging/automotive/latest-two", asset.relativePath)), q.id).toBe(true);
        }
      }
    }
  });

  it("keeps the type-checked payload identical to the portable manuscript and asserts no provider permission", () => {
    const json = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/qualification-staging/automotive/latest-two/latest-two.json"), "utf8"));
    expect(AUTOMOTIVE_DRAFT_BUNDLE).toEqual(json);
    expect(AUTOMOTIVE_DRAFT_BUNDLE.publicGo).toBe(0);
    expect(AUTOMOTIVE_DRAFT_BUNDLE.permissionVerified).toBe(false);
  });
});
