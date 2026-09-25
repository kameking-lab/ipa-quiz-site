import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { TAKKEN_2024_QUESTIONS } from "@/data/questions/takken/2024";
import { TAKKEN_QUESTIONS } from "@/data/questions/takken";

type ExtractedQuestion = {
  qNumber: number;
  officialAnswerNumber: number;
};

const source = JSON.parse(readFileSync(
  path.join(process.cwd(), "docs/evidence/takken-2024/extracted.json"),
  "utf8",
)) as {
  sourceSha256: string;
  lawReferenceDate: string;
  questions: ExtractedQuestion[];
};

describe("RETIO 2024 takken paper", () => {
  it("keeps all 50 official answers distinct from the 2025 paper", () => {
    expect(source.sourceSha256).toBe("82a95815f991567ebc4982b05a15a71f6ec942bd6794c3bafe3bcf9c2e985bae");
    expect(source.lawReferenceDate).toBe("2024-04-01");
    expect(TAKKEN_2024_QUESTIONS).toHaveLength(50);
    expect(TAKKEN_QUESTIONS).toHaveLength(100);
    expect(new Set(TAKKEN_QUESTIONS.map((question) => question.id)).size).toBe(100);
    expect(TAKKEN_2024_QUESTIONS.map((question) => question.qNumber)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1),
    );
    expect(TAKKEN_2024_QUESTIONS.map((question) => Number(question.officialAnswerNumber))).toEqual(
      source.questions.map((question) => question.officialAnswerNumber),
    );
  });

  it("provides year-correct law links and reasons for every choice", () => {
    for (const question of TAKKEN_2024_QUESTIONS) {
      expect(question.year).toBe(2024);
      expect(question.lawReferenceDate).toBe("2024-04-01");
      expect(question.answer).toBe("アイウエ"[Number(question.officialAnswerNumber) - 1]);
      expect(Object.keys(question.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(question.explanationCoverage).toBe("full");
      expect(question.needsReview).toBe(false);
      expect(question.sourcePdfUrl).toBe("https://www.retio.or.jp/wp-content/uploads/2025/03/R6_question_answer.pdf");
      expect((question.officialReferenceUrls ?? []).every((url) =>
        !url.includes("occasion_date=") || url.includes("occasion_date=20240401"),
      )).toBe(true);
    }
    expect(TAKKEN_2024_QUESTIONS[49]?.choices?.ア).not.toContain("はり");
  });
});
