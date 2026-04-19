import type { ExamCode, Season } from "@/lib/questions/types";
import type { AfternoonQuestion } from "./types";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";

const ALL: AfternoonQuestion[] = [...AP_AFTERNOON_QUESTIONS];

export function getAfternoonQuestions(exam: ExamCode): AfternoonQuestion[] {
  return ALL.filter((q) => q.exam === exam);
}

export function getAfternoonByYearSeason(
  exam: ExamCode,
  year: number,
  season: Season,
): AfternoonQuestion[] {
  return ALL.filter((q) => q.exam === exam && q.year === year && q.season === season).sort(
    (a, b) => a.qNumber - b.qNumber,
  );
}

export function getAfternoonYearSeasons(exam: ExamCode): { year: number; season: Season }[] {
  const seen = new Set<string>();
  const result: { year: number; season: Season }[] = [];
  for (const q of ALL) {
    if (q.exam !== exam) continue;
    const key = `${q.year}-${q.season}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push({ year: q.year, season: q.season });
  }
  return result.sort((a, b) =>
    a.year !== b.year ? b.year - a.year : a.season.localeCompare(b.season),
  );
}

export function findAfternoonQuestion(id: string): AfternoonQuestion | undefined {
  return ALL.find((q) => q.id === id);
}
