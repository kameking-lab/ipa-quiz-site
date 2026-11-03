import { describe, expect, it } from "vitest";
import { SHIHOSHOSHI_QUESTIONS } from "@/data/questions/shihoshoshi";
import excluded from "@/data/questions/shihoshoshi/excluded.json";
import { ALL_QUIZ_EXAM_CODES, ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { getQualificationByExamCode, isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { readFileSync } from "node:fs";

describe("司法書士公式2回分の未公開登録", () => {
  it("keeps synchronous, lazy and public exam registries closed", async () => {
    expect(getQualificationByExamCode("shihoshoshi")?.status).toBe("ready-to-ingest");
    expect(isExamPublished("shihoshoshi")).toBe(false);
    expect(QUESTIONS_BY_EXAM.shihoshoshi).toBeUndefined();
    expect(await getQuestionsForExam("shihoshoshi")).toEqual([]);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("shihoshoshi");
    expect(ALL_EXAM_CODES).not.toContain("shihoshoshi");
    expect(EXAM_CONFIGS.shihoshoshi.sessions.map(s => s.expectedQuestions)).toEqual([35, 35]);
  });

  it("reconciles each official answer row, including the unscorable question", () => {
    expect(SHIHOSHOSHI_QUESTIONS).toHaveLength(139);
    expect(new Set(SHIHOSHOSHI_QUESTIONS.map(q => q.id)).size).toBe(139);
    for (const year of [2025, 2026]) {
      const answerText = readFileSync(`data/questions/shihoshoshi/source-text/${year}-answers.txt`, "utf8");
      const rows = [...answerText.normalize("NFKC").matchAll(/第(\d+)問\s+([1-5-])\s+第(\d+)問\s+([1-5-])/g)];
      expect(rows).toHaveLength(35);
      for (const row of rows) for (const [session, number, answer] of [["am", row[1], row[2]], ["pm", row[3], row[4]]]) {
        const q = SHIHOSHOSHI_QUESTIONS.find(q => q.year === year && q.session === session && q.qNumber === Number(number));
        if (answer === "-") {
          expect(q).toBeUndefined();
          expect(excluded.some(q => q.year === year && q.session === session && q.qNumber === Number(number))).toBe(true);
        } else {
          expect(q?.officialAnswerNumber).toBe(answer);
          expect(choiceDisplayLabel("shihoshoshi", q!.answer as "ア")).toBe(answer);
        }
      }
    }
    expect(excluded).toHaveLength(1);
    expect(excluded[0]).toMatchObject({ year: 2025, session: "pm", qNumber: 33 });
  });

  it("retains selectable text, source attribution, historical law dates and the register table", () => {
    for (const q of SHIHOSHOSHI_QUESTIONS) {
      expect(q.question.length, q.id).toBeGreaterThan(300);
      expect(Object.keys(q.choices!)).toHaveLength(5);
      expect(q.lawReferenceDate).toBe(`${q.year}-04-01`);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\/content\/\d+\.pdf$/);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.moj\.go\.jp\/content\/\d+\.pdf$/);
      expect(q.needsReview).toBe(true);
      expect(q.question).not.toMatch(/AQ\s*[―－]/);
    }
    const q = SHIHOSHOSHI_QUESTIONS.find(q => q.year === 2026 && q.session === "pm" && q.qNumber === 20)!;
    expect(q.hasImage).toBe(true);
    expect(q.question).toContain("根抵当権");
    expect(q.imageUrls).toHaveLength(1);
    const blank = SHIHOSHOSHI_QUESTIONS.find(q => q.year === 2026 && q.session === "am" && q.qNumber === 3)!;
    expect(blank.choices?.イ).toBe("ア 総議員\nエ 天皇");
  });
});
