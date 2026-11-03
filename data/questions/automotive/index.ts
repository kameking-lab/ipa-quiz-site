import type { Difficulty, Question, Season } from "@/lib/questions/types";
import reviewed from "./reviewed.json";
import assets from "./assets.json";
import qualifications from "./qualifications.json";

export type AutomotiveExamCode =
  | "jidosha-1-small-written" | "jidosha-2-gasoline" | "jidosha-2-diesel"
  | "jidosha-2-chassis" | "jidosha-2-motorcycle" | "jidosha-3-chassis"
  | "jidosha-3-gasoline" | "jidosha-3-diesel" | "jidosha-3-motorcycle"
  | "jidosha-body" | "jidosha-electrical";

export const AUTOMOTIVE_QUALIFICATIONS = qualifications;
const imageBindings: Record<string, Array<{ url: string; physicalPage: number }>> = assets;

/** Existing accepted candidates only. The remaining saved originals stay in staging. */
export const AUTOMOTIVE_QUESTIONS: Question[] = reviewed.map((q) => ({
  ...q,
  exam: `jidosha-${q.subject}` as AutomotiveExamCode,
  session: "gakka",
  type: "multiple-choice",
  season: q.season as Season,
  // Question.term is reserved for 電験's upper/lower periods; JASPA uses season.
  term: undefined,
  originalJaspaTerm: q.term,
  difficulty: q.difficulty as Difficulty,
  explanationCoverage: "full",
  license: "JASPA-owner-authorized",
  permissionVerified: true,
  publicGo: 1,
  needsReview: false,
  imageUrls: imageBindings[q.id].map((asset) => asset.url),
  imageAltTexts: imageBindings[q.id].map((asset) => `${q.sourceAttribution} 原問題の図表（PDF ${asset.physicalPage}ページ）`),
}));

export function getAutomotiveQuestions(exam: AutomotiveExamCode): Question[] {
  return AUTOMOTIVE_QUESTIONS.filter((q) => q.exam === exam);
}
