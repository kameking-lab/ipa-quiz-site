import type { ExamCode, Season } from "@/lib/questions/types";
import type { AfternoonQuestion } from "./types";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";
import { ST_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/st";
import { FE_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/fe";
import { DB_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/db";
import { NW_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/nw";
import { SC_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sc";
import { ES_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/es";
import { PM_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/pm";

const ALL: AfternoonQuestion[] = [
  ...AP_AFTERNOON_QUESTIONS,
  ...ST_AFTERNOON_QUESTIONS,
  ...FE_AFTERNOON_QUESTIONS,
  ...DB_AFTERNOON_QUESTIONS,
  ...NW_AFTERNOON_QUESTIONS,
  ...SC_AFTERNOON_QUESTIONS,
  ...ES_AFTERNOON_QUESTIONS,
  ...PM_AFTERNOON_QUESTIONS,
];

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
