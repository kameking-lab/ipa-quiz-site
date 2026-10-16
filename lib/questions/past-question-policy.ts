import type { ExamCode } from "./types";

/** 日本無線協会の現17資格では、公表済みの過去問だけを演習に使う。 */
const OFFICIAL_PAST_ONLY_EXAMS = [
  "riku-tech1", "maritime4", "land-special1", "maritime3", "maritime2", "general3", "general2",
  "land-special2", "land-special3", "aviation-comm", "amateur1",
  "maritime-special1", "riku-tech2", "amateur2", "maritime-radar",
  "riku-toku-kokunai", "kai-toku2", "kai-toku3", "koku-toku",
] as const satisfies readonly ExamCode[];

const pastOnlyExams = new Set<string>(OFFICIAL_PAST_ONLY_EXAMS);
const originalIdAliases: Partial<Record<ExamCode, string>> = {
  maritime4: "maritime-comm4",
  "land-special2": "land2",
  "land-special3": "land3",
  "riku-toku-kokunai": "domestic",
  "kai-toku2": "sea2",
  "kai-toku3": "sea3",
  "koku-toku": "aviation-special",
};
const originalIdPrefixes = OFFICIAL_PAST_ONLY_EXAMS.map(
  (exam) => `radio21-${originalIdAliases[exam] ?? exam}-`,
).concat(["riku-toku-kokunai-", "kai-toku2-", "kai-toku3-", "koku-toku-"]);

export function isOfficialPastOnlyExam(exam: unknown): boolean {
  return typeof exam === "string" && pastOnlyExams.has(exam);
}

export function isOfficialPastOnlyRequest(exam: unknown, originalId: unknown): boolean {
  return isOfficialPastOnlyExam(exam) || (
    typeof originalId === "string" && originalIdPrefixes.some((prefix) => originalId.startsWith(prefix))
  );
}
