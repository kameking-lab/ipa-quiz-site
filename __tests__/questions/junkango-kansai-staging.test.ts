import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  JUNKANGO_KANSAI_REGISTRATION,
  JUNKANGO_KANSAI_STAGED_QUESTIONS as questions,
  JunkangoStagedQuestionSchema,
  scoreJunkangoStagedQuestion,
} from "@/data/qualification-staging/junkango-kansai";
import { validateJunkangoKansai } from "@/scripts/validate-junkango-kansai";
import { ALL_QUESTIONS } from "@/data/questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

// Transcribed independently by reading the two retained official answer-sheet images.
const expectedAnswers = {
  2026: `
    3 4 1 4 2 - 4 4 1 1
    4 2 1 4 1 2 1 4 3 2
    1 2 4 3 1 4 2 4 3 3
    1 3 4 1 1 3 3 1 4 3
    1 4 1 4 2 2 1 3 3 4
    4 2 3 2 2 3 4 1 4 4
    2 3 3 3 1 4 3 4 1 2
    2 4 1 1 3 4 3 1 3 2
    4 1 3 2 3 4 1 3 4 3
    1 4 1 2 4 3 3 4 3 1
    2 2 4 3 2 1 4 2 2 2
    3 2 4 2 3 2 1 3 2 2
    3 1 4 2 2 1 2 3 1 2
    2 3 1 1 4 3 1 4 2・4 4
    3 2 1 4 1 2 3 4 3 2
  `.trim().split(/\s+/),
  2025: `
    3 3 4 2 1 1 1 2 3 2
    3 1 2 2 4 1 3 1 2 4
    1 3 3 4 1 1 1 2 3 4
    1 4 1 4 2 1 2 2 3 3
    3 4 1 4 3 3 3 4 1 4
    1 3 1 1 4 4 4 3 2 4
    2 1 2 4 2 3 2 4 4 1
    3 3 4 4 3 3 3 1 2 3
    4 2 2 1 1 4 2 3 4 1
    4 2 3 2 2 4 1 4 4 1
    4 2 4 2 2 3 1 2 3 1
    2 2 3 4 2 4 2 4 3 3
    1 3 2 1 4 1 3 4 2 2
    4 2 1 3 3 3 2 2 1 3
    4 4 3 2 1 2 3 1 1 4
  `.trim().split(/\s+/),
};
const find = (year: number, qNumber: number) => questions.find(q => q.year === year && q.qNumber === qNumber)!;

describe("CQ6 准看護師（関西広域連合）の未公開2回分", () => {
  it("validates 300 originals, 1,200 explanations and every original region", () => {
    expect(validateJunkangoKansai()).toEqual({ questions: 300, choices: 1200, images: 300, publicAllowed: false });
  });

  it.each([2026, 2025] as const)("pins every official final answer for %i and verifies ordinary grading", year => {
    const round = questions.filter(q => q.year === year);
    expect(round).toHaveLength(150);
    expect(expectedAnswers[year]).toHaveLength(150);
    expect(round.map(q => q.officialAnswerNumber)).toEqual(expectedAnswers[year]);
    expect(round.map(q => q.qNumber)).toEqual(Array.from({ length: 150 }, (_, i) => i + 1));
    for (const q of round.filter(q => q.scoring === "single-choice")) {
      for (const response of [null, 0, 1, 2, 3, 4, 5, 2.5]) {
        expect(scoreJunkangoStagedQuestion(q, response)).toBe(response === Number(expectedAnswers[year][q.qNumber - 1]));
      }
      expect(Object.keys(q.choices)).toEqual(["1", "2", "3", "4"]);
      expect(Object.keys(q.choiceExplanations)).toEqual(Object.keys(q.choices));
    }
  });

  it("keeps the official all-correct exception distinct from factual truth or a fabricated answer", () => {
    const q = find(2026, 6);
    expect(q.scoring).toBe("all-correct");
    expect(q.officialAnswerNumber).toBe("-");
    expect(q.acceptedAnswerNumbers).toEqual([]);
    expect(q.scoringNotice).toContain("全員正解");
    for (const response of [null, 1, 2, 3, 4]) expect(scoreJunkangoStagedQuestion(q, response)).toBe(true);
    expect(questions.filter(q => q.scoring === "all-correct")).toHaveLength(1);
  });

  it("accepts 2 or 4 individually for Q139 without requiring both", () => {
    const q = find(2026, 139);
    expect(q.scoring).toBe("accepted-alternatives");
    expect(q.officialAnswerNumber).toBe("2・4");
    expect(q.acceptedAnswerNumbers).toEqual([2, 4]);
    for (const response of [null, 1, 2, 3, 4, 5]) expect(scoreJunkangoStagedQuestion(q, response)).toBe(response === 2 || response === 4);
    expect(q.choiceExplanations["4"]).toContain("2024年4月");
  });

  it("preserves actual years, original numeric labels, semantic small digits and the three diagrams", () => {
    expect(find(2026, 1).fiscalYear).toBe(2025);
    expect(find(2025, 1).fiscalYear).toBe(2024);
    expect(find(2026, 10).choices["2"]).toContain("B1");
    expect(find(2026, 47).choices["4"]).toContain("m2");
    expect(find(2026, 132).choices["4"]).toContain("SpO2");
    expect(find(2025, 58).choices).toEqual({ "1": "a", "2": "b", "3": "c", "4": "d" });
    for (const [year, number] of [[2025, 58], [2026, 50], [2026, 130]]) {
      expect(existsSync(find(year, number).sourceImages[0])).toBe(true);
    }
    expect(find(2026, 130).explanation).toContain("10分以内");
    expect(find(2025, 58).choiceExplanations["3"]).toContain("コマ型浮子の上端");
    expect(questions.every(q => q.lawReferenceDate === null && q.needsReview === true)).toBe(true);
  });

  it("keeps the corpus and all assets outside public registries, routes and catalog", () => {
    expect(JUNKANGO_KANSAI_REGISTRATION.publicAllowed).toBe(false);
    expect(questions.every(q => q.publicAllowed === false && q.publicationStatus === "staging")).toBe(true);
    expect(ALL_QUESTIONS.some(q => q.id.startsWith("junkango-kansai-"))).toBe(true);
    expect(Object.keys(EXAM_CONFIGS)).toContain("junkango-kansai");
    expect(QUALIFICATION_CATALOG.some(q => q.slug === "junkango-kansai")).toBe(true);
    expect(readFileSync("data/exam-library/official-catalog.json", "utf8")).not.toContain('"junkango-kansai"');
    expect(existsSync("public/questions/junkango-kansai")).toBe(false);
    expect(existsSync("app/junkango-kansai")).toBe(false);
    expect(questions.every(q => q.sourceImages.every(path => path.startsWith("data/qualification-staging/")))).toBe(true);
  });

  it("distinguishes acute from delayed chemotherapy nausea without denying symptoms at 5–7 days", () => {
    const q = find(2025, 88);
    expect(q.officialAnswerNumber).toBe("3");
    expect(q.choiceExplanations["2"]).toContain("急性は投与後24時間以内");
    expect(q.choiceExplanations["2"]).toContain("遅発性は24時間以降");
    expect(q.choiceExplanations["2"]).toContain("5〜7日頃の悪心・嘔吐もあり得る");
    expect(q.officialReferenceUrls).toContain("https://www.ncc.go.jp/jp/ncce/division/pharmacy/kouganzai/supportivecare_antiemetic.html");
  });

  it.each([
    ["publicAllowed", true, "publicAllowed"],
    ["choices", { "1": "a", "2": "b", "3": "c" }, "4"],
    ["choiceExplanations", { "1": "短い", "2": "短い", "3": "短い", "4": "短い" }, "20"],
  ] as const)("rejects malformed %s instead of narrowing JSON blindly", (field, value, error) => {
    const bad = { ...find(2026, 1), [field]: value };
    const result = JunkangoStagedQuestionSchema.safeParse(bad);
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.message).toContain(error);
  });

  it("rejects incorrect official keys, omitted originals, swapped regions and untracked source-text changes", () => {
    for (const change of [
      { officialAnswerNumber: "1" },
      { question: "別の問題本文" },
      { sourceImages: [find(2026, 2).sourceImages[0]] },
      { acceptedAnswerNumbers: [1] },
    ]) {
      const mutated = [{ ...find(2026, 1), ...change }, ...questions.slice(1)];
      expect(() => validateJunkangoKansai(mutated)).toThrow();
    }
    expect(() => validateJunkangoKansai(questions.slice(1))).toThrow("300原問");
  });

  it("pins the original downloaded PDFs with SHA-256 receipts", () => {
    const receipts = JSON.parse(readFileSync("data/qualification-staging/junkango-kansai/source-receipts.json", "utf8"));
    const hashes = receipts.map((r: { sha256: string }) => r.sha256);
    expect(hashes).toEqual([
      "54eeef9e3f9f9a866dbc244ffe66745b7fec9debb526de135ec2b0be75086efc",
      "e130bc9a5f19c4ee0d6799019be6f1b8a91cee22c3e015bb769dea1a05ad441c",
      "956f299963268dd83bb319387688e3211f14ae284e7dd818e07bb9b748783d6c",
      "8c205b8ae8a036fb4280143b4e51f5f35ac3c618f0bf618109eb6f624d37308a",
    ]);
  });
});
