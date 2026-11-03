import type { ExamCode } from "@/lib/questions/types";
import { encodeExplicitPoolIds } from "@/lib/questions/explicit-pool";

export interface SearchPracticeHit {
  id: string;
  exam: ExamCode;
}

export function buildSearchPracticeUrl(
  searchParams: string,
  hits: readonly SearchPracticeHit[],
): string {
  const params = new URLSearchParams({ mode: "random", source: "search" });
  params.set("ids", encodeExplicitPoolIds(hits.map((hit) => hit.id)));

  const exams = [...new Set(hits.map((hit) => hit.exam))];
  if (exams.length === 1) params.set("exam", exams[0]);
  else if (exams.length > 1) params.set("examGroup", exams.join(","));

  params.set("search", searchParams);
  params.set("returnTo", searchParams ? `/search?${searchParams}` : "/search");
  return `/quiz?${params.toString()}`;
}
