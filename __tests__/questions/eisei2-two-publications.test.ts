import { describe, expect, it } from "vitest";

import { EISEI2_QUESTIONS } from "@/data/questions/eisei2";
import source2025 from "@/data/exam-library/papers/lckohyo-LC20252115.json";
import source2026 from "@/data/exam-library/papers/lckohyo-LC20260414-1.json";
import presentation2025 from "@/data/exam-library/presentation/lckohyo-LC20252115.json";
import presentation2026 from "@/data/exam-library/presentation/lckohyo-LC20260414-1.json";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const KEYS = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("second-class health supervisor two publications", () => {
  it.each([
    [2025, source2025, presentation2025, "https://www.exam.or.jp/wp-content/uploads/2025/10/LC20252115.pdf"],
    [2026, source2026, presentation2026, "https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260414-1.pdf"],
  ] as const)("matches all official answers and five choices for %i", (year, source, presentation, pdfUrl) => {
    const questions = EISEI2_QUESTIONS.filter((q) => q.year === year);
    expect(questions).toHaveLength(30);
    expect(questions.map((q) => q.qNumber).sort((a, b) => a - b)).toEqual(
      Array.from({ length: 30 }, (_, i) => i + 1),
    );
    for (const original of source) {
      const q = questions.find((item) => item.qNumber === original.number);
      const displayed = (presentation as Record<string, { prompt: string; choices: { text: string }[] }>)[original.id];
      expect(q, original.id).toBeDefined();
      expect(displayed, original.id).toBeDefined();
      if ((year === 2025 && original.number !== 23) || (year === 2026 && original.number !== 11)) {
        expect(q?.question).toBe(displayed.prompt);
      }
      expect(q?.answer).toBe(KEYS[original.correctChoice - 1]);
      expect(q?.officialAnswerNumber).toBe(String(original.correctChoice));
      expect(q?.sourcePdfUrl).toBe(pdfUrl);
      expect(q?.sourceAnswerUrl).toBe(pdfUrl);
      expect(q?.explanationCoverage).toBe("full");
      expect(q?.needsReview).toBe(false);
      expect(q && isPracticeReadyQuestion(q)).toBe(true);
      expect(Object.keys(q?.choices ?? {})).toEqual(KEYS);
      expect(Object.keys(q?.choiceExplanations ?? {})).toEqual(KEYS);
      for (const key of KEYS) {
        if (!(year === 2025 && original.number === 23)) {
          expect(q?.choices?.[key]).toBe(displayed.choices[KEYS.indexOf(key)]?.text);
        }
        expect(q?.choiceExplanations?.[key]?.length).toBeGreaterThan(20);
      }
    }
  });

  it("preserves the two source tables and original numeric option labels", () => {
    const hormone = EISEI2_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === 23);
    const screen = EISEI2_QUESTIONS.find((q) => q.year === 2026 && q.qNumber === 11);
    expect(hormone?.choices?.ウ).toContain("メラトニン ／ 副甲状腺 ／");
    expect(screen?.question).toContain("| 疾病有り | 35人 | 10人 |");
    expect(screen?.question).toContain("| 疾病無し | 160人 | 795人 |");
    expect(choiceDisplayLabel("eisei2", "ア")).toBe("(1)");
    expect(choiceDisplayLabel("eisei2", "オ")).toBe("(5)");
  });
});
