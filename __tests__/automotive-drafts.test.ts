// @vitest-environment node
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { getAutomotiveOriginalKey, getAutomotiveWrittenDrafts } from "@/lib/automotive/get-drafts";
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
