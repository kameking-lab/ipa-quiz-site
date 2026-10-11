import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { TSUSHIN1_QUESTIONS } from "@/data/questions/tsushin1";
import source from "@/data/questions/tsushin1/2026-september.json";
import answers from "@/docs/evidence/tsushin1-2026/complete/OFFICIAL-ANSWERS.json";
import crops from "@/docs/evidence/tsushin1-2026/complete/CROP-RECEIPTS.json";
import { defaultPracticeSession } from "@/lib/questions/practice-session";
import { isExamPublished } from "@/lib/qualifications/catalog";

const yearQuestions = TSUSHIN1_QUESTIONS.filter((q) => q.year === 2026);

describe("1級電気通信工事 令和8年度第一次検定全90原問", () => {
  it("A55問・B35問を年度/冊子/問番号ごとに一意に保持する", () => {
    expect(source.papers.map((paper) => paper.officialQuestionCount)).toEqual([55, 35]);
    expect(source.papers.map((paper) => paper.publishedCount)).toEqual([55, 35]);
    expect(yearQuestions).toHaveLength(90);
    expect(new Set(yearQuestions.map((q) => q.id)).size).toBe(90);
    for (const paper of source.papers) {
      expect(paper.questions.map((q) => q.number)).toEqual(Array.from({ length: paper.officialQuestionCount }, (_, n) => n + 1));
    }
    expect(defaultPracticeSession("tsushin1")).toBe("mondai-a");
    expect(isExamPublished("tsushin1")).toBe(true);
  });

  it("全問の公式正答の順序と四肢・全肢解説を保持する", () => {
    const keys = ["ア", "イ", "ウ", "エ"];
    for (const question of yearQuestions) {
      const session = question.session as keyof typeof answers;
      expect(question.answer).toBe(keys[answers[session][question.qNumber - 1]! - 1]);
      expect(question.officialAnswerNumber).toBe(String(answers[session][question.qNumber - 1]));
      expect(question.requiredSelections).toBeUndefined();
      expect(Object.values(question.choices ?? {})).toHaveLength(4);
      expect(new Set(Object.values(question.choices ?? {})).size).toBe(4);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(keys);
      expect(Object.values(question.choiceExplanations ?? {}).every((value) => value && value.trim().length > 0)).toBe(true);
      expect(question.explanationCoverage).toBe("full");
      expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.jctc\.jp\//);
      expect(JSON.stringify(question.choices)).not.toContain("※ 問題番号");
    }
  });

  it("図表画像を原本クロップのSHA-256と照合する", () => {
    for (const crop of crops) {
      const question = yearQuestions.find((q) => q.session === crop.session && q.qNumber === crop.number);
      expect(question?.hasImage).toBe(true);
      expect(question?.imageUrls).toHaveLength(crop.images.length);
      expect(question?.imageAltTexts).toHaveLength(crop.images.length);
      for (const receipt of crop.images) {
        const file = resolve(process.cwd(), "public/images/tsushin1/2026", receipt.file);
        expect(existsSync(file)).toBe(true);
        expect(createHash("sha256").update(readFileSync(file)).digest("hex")).toBe(receipt.sha256);
      }
    }
  });

  it("失われやすい指数・否定式・周波数添字を復元する", () => {
    const findA = (number: number) => yearQuestions.find((q) => q.session === "mondai-a" && q.qNumber === number)!;
    expect(findA(1).choices?.エ).toContain("10⁻¹");
    expect(findA(9).choices?.ウ).toContain("B̄");
    expect(findA(19).choices?.ア).toContain("G₁G₂");
    expect(findA(29).choices?.イ).toContain("f₂");
    expect(findA(29).choices?.イ).toContain("f₄");
    expect(findA(55).choices?.エ).toContain("竪穴区画");
  });
});
