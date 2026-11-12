import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import evidence from "@/__tests__/fixtures/kashikin-2023-source.json";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { KASHIKIN_QUESTIONS } from "@/data/questions/kashikin";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const paper = KASHIKIN_QUESTIONS.filter((q) => q.year === 2023);
const officialAnswers = [
  2, 3, 3, 1, 4, 3, 2, 2, 4, 3, 2, 1, 4, 4, 1, 1, 4, 1, 2, 2, 3, 3, 1, 1, 3,
  3, 4, 3, 4, 4, 1, 3, 2, 1, 2, 4, 3, 2, 1, 4, 1, 4, 3, 1, 3, 1, 2, 3, 4, 2,
];
const textHash = (text: string) => createHash("sha256")
  .update(text.normalize("NFKC").replace(/\s+/gu, ""))
  .digest("hex");

describe("貸金業務取扱主任者 2023年度（第18回）", () => {
  it("公式50問を一意なIDで出題データと年度選択に接続する", () => {
    expect(paper.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    expect(new Set(KASHIKIN_QUESTIONS.map((q) => q.id)).size).toBe(150);
    expect(EXAM_CONFIGS.kashikin.yearRange).toEqual({ start: 2023, end: 2025 });
    expect((QUESTIONS_BY_EXAM.kashikin ?? []).filter((q) => q.year === 2023)).toEqual(paper);
    for (const q of paper) {
      expect(q.id).toBe(`kashikin-2023-annual-gakka-q${q.qNumber}`);
      expect(ALL_QUESTIONS.find((item) => item.id === q.id)).toBe(q);
      expect(isPracticeReadyQuestion(q)).toBe(true);
    }
  });

  it("本文・全選択肢・注記を二系統抽出済みの公式PDF転記と照合する", () => {
    expect(evidence.independentExtractionDifferences).toEqual([]);
    expect(evidence.questions).toHaveLength(50);
    for (const q of paper) {
      const receipt = evidence.questions[q.qNumber - 1];
      expect(receipt.number).toBe(q.qNumber);
      expect(receipt.page).toBe(q.qNumber + 1);
      const text = [q.question, ...keys.map((k) => q.choices?.[k])].join("\n");
      expect(textHash(text), q.id).toBe(receipt.textSha256);
      expect(q.question).not.toMatch(/DKIH-|\.indd|【問題/u);
    }
    // Notes printed below the choices must remain part of the stem.
    for (const number of [4, 23, 25, 45]) {
      expect(paper[number - 1].question).toContain("注");
      expect(paper[number - 1].choices?.エ).not.toMatch(/(?:^|\n)\(注/u);
    }
  });

  it("公式正答表の50問を変更せず保持する", () => {
    expect(evidence.questions.map((q) => q.officialAnswer)).toEqual(officialAnswers);
    expect(paper.map((q) => q.answer)).toEqual(officialAnswers.map((n) => keys[n - 1]));
    expect(paper.map((q) => q.officialAnswerNumber)).toEqual(officialAnswers.map(String));
  });

  it("法令基準日・出典・全200肢の理由を保持する", () => {
    for (const q of paper) {
      expect(q.lawReferenceDate).toBe("2023-04-01");
      expect(q.sourcePdfUrl).toBe(evidence.paperUrl);
      expect(q.sourceAnswerUrl).toBe(evidence.answerUrl);
      expect(q.sourceAttribution).toContain(`問${q.qNumber}。`);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
      expect(q.explanation.length).toBeGreaterThan(80);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(keys);
      for (const key of keys) expect(q.choiceExplanations?.[key]?.length).toBeGreaterThanOrEqual(20);
      const expectedCategory = EXAM_CONFIGS.kashikin.sessions[0].categories[
        q.qNumber <= 27 ? 0 : q.qNumber <= 42 ? 1 : q.qNumber <= 47 ? 2 : 3
      ];
      expect(q.category).toBe(expectedCategory);
    }
    for (const source of Object.values(evidence.lawSources)) {
      expect(source.enforcementDate <= "2023-04-01").toBe(true);
      expect(source.url).toContain(source.revisionId.replace("_", "/"));
    }
  });
});
