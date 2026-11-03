import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { JKEN_SYSTEM_PAPERS, JKEN_SYSTEM_QUESTIONS } from "@/data/questions/jken-system";
import manifest from "@/data/exam-library/source-packs/jken-system-latest2.json";
import { QUESTIONS_BY_EXAM, ALL_QUESTIONS } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getAvailableExams, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { isExamPublished, QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { defaultPracticeSession, parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";

// Independently pinned row order from the six official answer sheets.
const official = {
  "260208-js01": ["アウイエエウアイ", "イカウエエイカオ", "イアエアアエイイア", "ウエウエイウア", "アイエエアエイカアア"],
  "260208-js02": ["イアイアイウ", "ウウエエエア", "イエエエウイア", "イエエイ", "ウエアイウアイ"],
  "260208-js03": ["アウエイエウウアエア", "エアアイウエ", "イウウアイイエオアカ", "イオエイアアオカ", "ウエイウエイキオ"],
  "260913-js01": ["オイエイウウイイ", "イエウアイエアアア", "カエキコウオウイ", "イアエウキウアア", "イウエイウウエイ"],
  "260913-js02": ["エオウイエ", "ウアアイエイ", "イオウウイイイアアウ", "ウエイアイ", "ウエアエアア"],
  "260913-js03": ["カキイエクエウイ", "エクカイウア", "ウイエイウイエイアエ", "イアウアイウ", "アイアイエアカオアイ"],
};

describe("J検情報システム latest two official papers in staging", () => {
  it("contains six complete papers, 30 originals and 227 separately graded printed slots", () => {
    expect(JKEN_SYSTEM_PAPERS).toHaveLength(6);
    expect(JKEN_SYSTEM_QUESTIONS).toHaveLength(227);
    expect(new Set(JKEN_SYSTEM_QUESTIONS.map(q => q.id)).size).toBe(227);
    for (const paper of JKEN_SYSTEM_PAPERS) {
      expect(paper.questions.map(q => q.number)).toEqual([1, 2, 3, 4, 5]);
      const pinned = official[paper.id as keyof typeof official];
      for (const q of paper.questions) {
        expect(q.slots.map(slot => slot.answer).join("")).toBe(pinned[q.number - 1]);
        expect(q.slots.map(slot => slot.number)).toEqual(Array.from({ length: q.slots.length }, (_, i) => i + 1));
        expect(q.banks.flatMap(bank => bank.slots).sort((a, b) => a - b)).toEqual(q.slots.map(slot => slot.number));
      }
      expect(paper.questions.reduce((n, q) => n + q.slots.length, 0)).toBe(paper.answerSlotCount);
    }
    expect(manifest.papers.map(p => p.answerSlotCount)).toEqual([42, 30, 42, 41, 32, 40]);
    expect(manifest.exclusions).toEqual([]);
  });

  it("keeps source text, every candidate rationale, original figures and fiscal year labels", () => {
    for (const q of JKEN_SYSTEM_QUESTIONS) {
      expect(q.question.length).toBeGreaterThan(300);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.jken\.sgec\.or\.jp\/common\/pdf\/past_test\/260(?:208|913)_mondaijs0[123]\.pdf#page=\d+$/);
      expect(q.sourceAnswerUrl).toMatch(/_kaitojs0[123]\.pdf$/);
      expect(q.explanationCoverage).toBe("full");
      expect(q.needsReview).toBe(false);
      expect(Object.keys(q.choiceExplanations ?? {}).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      for (const reason of Object.values(q.choiceExplanations ?? {})) expect(reason!.length).toBeGreaterThan(20);
      expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
      expect(q.imageAltTexts?.length ?? 0).toBe(q.imageUrls?.length ?? 0);
      for (const url of q.imageUrls ?? []) {
        expect(existsSync(`public${url}`)).toBe(true);
        expect(readFileSync(`public${url}`).subarray(1, 4).toString()).toBe("PNG");
      }
      expect(q.year).toBe(q.id.includes("260208") ? 2025 : 2026);
    }
  });

  it("hides all staging questions from public registries, lazy loaders and exam lists", async () => {
    expect(isExamPublished("jken-system")).toBe(false);
    expect(QUALIFICATION_CATALOG.find(q => q.slug === "jken-system")?.status).toBe("ready-to-ingest");
    expect(QUESTIONS_BY_EXAM["jken-system"]).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "jken-system")).toBe(false);
    expect(await getQuestionsForExam("jken-system")).toEqual([]);
    expect(getQuestionsByExamStrict("jken-system")).toEqual([]);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("jken-system");
    expect(getAvailableExams()).not.toContain("jken-system");
    expect(ALL_EXAM_CODES).not.toContain("jken-system");
  });

  it("supports each skill after the owner switches the existing publication gate", () => {
    expect(defaultPracticeSession("jken-system")).toBe("jken-basic");
    for (const session of EXAM_CONFIGS["jken-system"].sessions) {
      expect(parsePracticeSession(session.session)).toBe(session.session);
      expect(practiceSessionLabel(session.session)).toBe(session.label);
    }
  });
});
