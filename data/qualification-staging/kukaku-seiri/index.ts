import questions2026 from "./2026-annual.json";
import manifest from "./source-manifest.json";

/** Editorial data only. Do not import from public Question/ExamCode registries. */
export const KUKAKU_SEIRI_STAGING = {
  slug: "kukaku-seiri",
  publicAllowed: false,
  twoRoundComplete: manifest.twoRoundComplete,
  questions: questions2026,
} as const;

export type KukakuSeiriStagedQuestion = (typeof questions2026)[number];

/** Input is the printed numeric choice (1..4); statement labels are unrelated. */
export function scoreKukakuSeiriStagedQuestion(question: KukakuSeiriStagedQuestion, selected: number | null): boolean {
  return Number.isInteger(selected) && selected === question.officialAnswerNumber;
}
