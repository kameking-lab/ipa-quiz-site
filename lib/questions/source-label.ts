import type { Question } from "./types";
import { examLabelAt } from "@/lib/exam-naming/history";
import { formatYearSeason } from "@/lib/utils";

/** exam is the learning filter; the shared AM1 paper is not that exam's AM2. */
export function questionSourceExam(q: Pick<Question, "exam" | "year" | "season" | "session">): string {
  return q.session === "am1" ? "高度試験共通" : examLabelAt(q.exam, q.year, q.season);
}

export function questionSourceEdition(q: Pick<Question, "year" | "season" | "sourcePdfUrl">): string {
  if (q.year === 2011 && /tokubetsu/.test(q.sourcePdfUrl)) return "2011年度 特別試験";
  if (q.year === 2020 && q.season === "autumn") return "令和2年度 10月試験";
  return formatYearSeason(q.year, q.season);
}
