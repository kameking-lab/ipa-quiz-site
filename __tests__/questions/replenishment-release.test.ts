import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { BIRU_KAN_2026_QUESTIONS } from "@/data/questions/biru-kan";
import morning from "@/data/qualification-staging/biru-kan/2026/am-questions.json";
import afternoon from "@/data/qualification-staging/biru-kan/2026/pm-questions.json";
import type { ExamCode } from "@/lib/questions/types";

const skills: ExamCode[] = ["chikuro2", "diecast2", "engei-soshoku2", "flower2", "fujin-kodomofuku2", "insatsu2", "kagaku-bunseki2", "kagu2", "kinzoku-netsushori2", "kyoka-plastic2", "mekki2", "sasshi2", "tekko2", "tetsudo-sharyo2", "toso2", "tobi1", "kenchiku-daiku1", "kenchiku-daiku2"];
const cases: [ExamCode, number, number][] = [
  ...skills.map(exam => [exam, 2025, 50] as [ExamCode, number, number]),
  ["kenchiku-daiku3", 2025, 30], ["kashikin", 2023, 50],
  ["kikai-hozen", 2023, 50], ["yamaguchi-seika", 2024, 66], ["biru-kan", 2026, 180],
];

describe("replenishment release serving integration", () => {
  it.each(cases)("%s %i exposes %i reviewed originals in both loaders", async (exam, year, count) => {
    const sync = QUESTIONS_BY_EXAM[exam]!.filter(q => q.year === year);
    const lazy = (await getQuestionsForExam(exam)).filter(q => q.year === year);
    expect(sync).toHaveLength(count);
    expect(lazy.map(q => q.id)).toEqual(sync.map(q => q.id));
    expect(sync.every(isPracticeReadyQuestion)).toBe(true);
    expect(new Set(sync.map(q => q.id)).size).toBe(count);
    expect(EXAM_CONFIGS[exam]!.yearRange.end).toBeGreaterThanOrEqual(year);
    for (const q of sync) for (const url of q.imageUrls ?? []) {
      expect(url, q.id).toMatch(/^\//);
      expect(existsSync(join(process.cwd(), "public", url)), `${q.id}: ${url}`).toBe(true);
    }
  });

  it("keeps all 180 building-management answers and source transcriptions unchanged", () => {
    const source = [...morning, ...afternoon];
    expect(BIRU_KAN_2026_QUESTIONS).toHaveLength(180);
    for (const q of BIRU_KAN_2026_QUESTIONS) {
      const original = source.find(row => row.id === q.id)!;
      expect(q.answer, q.id).toBe(original.answer);
      expect(q.originalContent, q.id).toEqual(original.originalContent);
      for (const [index, url] of (q.imageUrls ?? []).entries()) {
        expect(readFileSync(join(process.cwd(), "public", url)))
          .toEqual(readFileSync(join(process.cwd(), original.imageUrls[index])));
      }
    }
    expect(source.every(q => q.publicAllowed === false)).toBe(true);
  });

  it("does not add any of the held 2026 high-pressure-gas corpus", async () => {
    expect((await getQuestionsForExam("khk-kagaku")).some(q => q.year === 2026)).toBe(false);
    expect(QUESTIONS_BY_EXAM["khk-kagaku"]!.some(q => q.year === 2026)).toBe(false);
  });
});
