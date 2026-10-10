import { describe, expect, it } from "vitest";
import { AHAKI_ANMA_QUESTIONS, AHAKI_HARI_KYUU_QUESTIONS } from "@/data/questions/ahaki";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { getAvailableExams } from "@/lib/seo/exam-meta";
import source from "@/data/questions/ahaki/source-manifest.json";
import coverage from "@/data/questions/ahaki/held-ids.json";

const all = [...AHAKI_ANMA_QUESTIONS, ...AHAKI_HARI_KYUU_QUESTIONS];
const keys = ["ア", "イ", "ウ", "エ"];

describe("Ahaki official booklet partial publication", () => {
  it("registers only the 677 saved, source-matched originals from the two rounds", async () => {
    expect(all).toHaveLength(677);
    expect(new Set(all.map((q) => q.id)).size).toBe(677);
    expect(source.localCandidateOriginals).toBe(677);
    expect(source.officialPaperOriginals).toBe(680);
    expect(source.heldOriginals).toBe(3);
    expect(source.heldIds).toHaveLength(3);
    expect(coverage.sections.reduce((total, section) => total + section.numbers.length, 0)).toBe(3);
    expect(all.filter((q) => q.exam === "ahaki-anma" && q.year === 2025)).toHaveLength(159);
    expect(all.filter((q) => q.exam === "ahaki-anma" && q.year === 2026)).toHaveLength(159);
    expect(all.filter((q) => q.exam === "ahaki-hari-kyu" && q.year === 2025)).toHaveLength(179);
    expect(all.filter((q) => q.exam === "ahaki-hari-kyu" && q.year === 2026)).toHaveLength(180);
    expect(await getQuestionsForExam("ahaki-anma")).toHaveLength(318);
    expect(await getQuestionsForExam("ahaki-hari-kyu")).toHaveLength(359);
    expect(getAvailableExams()).toContain("ahaki-anma");
    expect(getAvailableExams()).toContain("ahaki-hari-kyu");
    expect(isExamPublished("ahaki-anma")).toBe(true);
    expect(isExamPublished("ahaki-hari-kyu")).toBe(true);
    expect(EXAM_CONFIGS["ahaki-anma"].sessions.map((session) => session.expectedQuestions)).toEqual([80, 80]);
    expect(EXAM_CONFIGS["ahaki-hari-kyu"].sessions.map((session) => session.expectedQuestions)).toEqual([90, 90]);
    expect(choiceDisplayLabel("ahaki-anma", "ア")).toBe("1");
    expect(choiceDisplayLabel("ahaki-hari-kyu", "エ")).toBe("4");
  });

  it("retains four official choices, the single official key, and explanations for every option", () => {
    for (const q of all) {
      expect(Object.keys(q.choices ?? {}), q.id).toEqual(keys);
      expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual(keys);
      expect(Object.values(q.choices ?? {}).every((value) => Boolean(value?.trim())), q.id).toBe(true);
      expect(Object.values(q.choiceExplanations ?? {}).every((value) => Boolean(value?.trim())), q.id).toBe(true);
      expect(q.answer, q.id).toBe(keys[Number(q.officialAnswerNumber) - 1]);
      expect(q.requiredSelections, q.id).toBe(1);
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(0);
      expect(q.sourcePdfUrl, q.id).toMatch(/^https:\/\/ahaki\.or\.jp\//);
      expect(q.sourceAnswerUrl, q.id).toMatch(/^https:\/\/ahaki\.or\.jp\//);
      expect(source.sourceReceipts[q.id as keyof typeof source.sourceReceipts], q.id).toBeDefined();
    }
  });

  it("keeps the shared hari/kyuu booklet's separate practice tracks and every hold out of both pools", () => {
    for (const q of AHAKI_HARI_KYUU_QUESTIONS) {
      const expected = q.qNumber <= 160 ? "はり師・きゅう師 共通" : q.qNumber <= 170 ? "はり師 専用" : "きゅう師 専用";
      expect(q.subject, q.id).toBe(expected);
      expect(q.category, q.id).toBe(expected);
    }
    expect(AHAKI_HARI_KYUU_QUESTIONS.filter((q) => q.qNumber >= 161 && q.qNumber <= 170)).toHaveLength(20);
    expect(AHAKI_HARI_KYUU_QUESTIONS.filter((q) => q.qNumber >= 171 && q.qNumber <= 180)).toHaveLength(20);
    const ids = new Set(all.map((q) => q.id));
    const heldRouteIds = coverage.sections.flatMap((section) => section.numbers.map((number) => `${section.exam}-${section.year}-annual-${section.session}-q${number}`));
    expect(new Set(heldRouteIds).size).toBe(3);
    for (const identity of source.heldIds) {
      const parts = /^(33|34)-(anma-massage-shiatsushi|hari-kyu)-(\d+)$/.exec(identity);
      expect(parts, identity).not.toBeNull();
      const year = Number(parts![1]) + 1992;
      const code = parts![2] === "anma-massage-shiatsushi" ? "ahaki-anma" : "ahaki-hari-kyu";
      const number = Number(parts![3]);
      const session = number <= (code === "ahaki-anma" ? 80 : 90) ? "am" : "pm";
      const heldRouteId = `${code}-${year}-annual-${session}-q${number}`;
      expect(heldRouteIds, identity).toContain(heldRouteId);
      expect(ids.has(heldRouteId), identity).toBe(false);
    }
    expect(ids.has("ahaki-anma-2026-annual-pm-q147")).toBe(false);
    expect(ids.has("ahaki-hari-kyu-2026-annual-am-q13")).toBe(true);
    expect(ids.has("ahaki-hari-kyu-2026-annual-pm-q96")).toBe(true);
    const q13 = all.find((q) => q.id === "ahaki-hari-kyu-2026-annual-am-q13");
    const q96 = all.find((q) => q.id === "ahaki-hari-kyu-2026-annual-pm-q96");
    expect(q13?.officialAnswerNumber).toBe("4");
    expect(q13?.explanation).toContain("2026年2月22日時点の施行版");
    expect(q96?.officialAnswerNumber).toBe("2");
    expect(q96?.explanation).toContain("素問「血気形志篇」");
    expect(source.heldIds).not.toContain("34-hari-kyu-13");
    expect(source.heldIds).not.toContain("34-hari-kyu-96");
    expect(source.publicationCompleteTwoRounds).toBe(false);
  });
});
