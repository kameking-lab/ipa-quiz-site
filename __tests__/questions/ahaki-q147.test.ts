import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { AHAKI_ANMA_QUESTIONS, AHAKI_HARI_KYUU_QUESTIONS } from "@/data/questions/ahaki";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { filterQuestions } from "@/lib/questions/filter";
import { questionPagePath } from "@/lib/seo/question-url";
import frozen from "@/docs/evidence/ahaki-q147-20261010/PREVIOUS-OBJECT-HASHES.json";
import original from "@/docs/evidence/ahaki-q147-20261010/SOURCE-QUESTION.json";

const all = [...AHAKI_ANMA_QUESTIONS, ...AHAKI_HARI_KYUU_QUESTIONS];
const q147 = all.find((question) => question.id === "ahaki-anma-2026-annual-pm-q147")!;
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonical(record[key])}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

describe("Ahaki Q147 official alternative-key adoption", () => {
  it("retains all 677 previously registered full question objects", () => {
    const byId = new Map(all.map((question) => [question.id, question]));
    expect(Object.keys(frozen)).toHaveLength(677);
    for (const [id, expected] of Object.entries(frozen)) {
      expect(byId.has(id), id).toBe(true);
      expect(createHash("sha256").update(canonical(byId.get(id))).digest("hex"), id).toBe(expected);
    }
    expect(all).toHaveLength(678);
    expect(all.filter((question) => !Object.hasOwn(frozen, question.id)).map((question) => question.id)).toEqual([q147.id]);
  });

  it("accepts exactly one of all four official keys without requiring four selections", () => {
    expect(q147.answer).toEqual(["ア", "イ", "ウ", "エ"]);
    expect(q147.officialAnswerNumber).toBe("1,2,3,4");
    expect(requiredSelectionCount(q147)).toBe(1);
    for (const key of ["ア", "イ", "ウ", "エ"]) {
      expect(isCompleteSelectionCorrect(q147.answer, [key], q147.requiredSelections), key).toBe(true);
    }
    for (const selected of [[], ["オ"], ["ア", "イ"], ["ア", "イ", "ウ", "エ"]]) {
      expect(isCompleteSelectionCorrect(q147.answer, selected, q147.requiredSelections)).toBe(false);
    }
  });

  it("makes the full 34th-round PM pool available and preserves the official shared case once", () => {
    expect(filterQuestions(AHAKI_ANMA_QUESTIONS, { exam: "ahaki-anma", mode: "year", year: 2026, session: "pm" })).toHaveLength(80);
    expect(q147.question).toBe(original.sharedCaseText.replace(/\n /g, "\n").replace("病院では\nサルコペニア", "病院ではサルコペニア") + "\n\n" + original.stem);
    expect(q147.question.split("80 歳の女性")).toHaveLength(2);
    expect(Object.values(q147.choices!)).toEqual(original.choices);
    expect(q147.hasImage).toBe(false);
    expect(q147.needsReview).not.toBe(true);
    expect(questionPagePath(q147)).toContain("147");
    expect(q147.explanation).toContain("公式の採点扱いと医学的な評価項目を区別");
    expect(q147.explanation).toContain("2018年改訂合意");
    expect(q147.officialReferenceUrls).toContain("https://pmc.ncbi.nlm.nih.gov/articles/PMC6322506/");
  });
});
