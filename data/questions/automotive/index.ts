import type { Difficulty, Question, Season } from "@/lib/questions/types";
import reviewed from "./reviewed.json";
import assets from "./assets.json";
import qualifications from "./qualifications.json";
import priorSittings from "./prior-sittings.json";
import priorAssets from "./prior-assets.json";
import body2022Second from "./2022-second-body.json";
import body2022SecondAssets from "./2022-second-body-assets.json";
import body2023First from "./2023-first-body.json";
import body2023FirstAssets from "./2023-first-body-assets.json";
import body2023Second from "./2023-second-body.json";
import body2023SecondAssets from "./2023-second-body-assets.json";
import body2024First from "./2024-first-body.json";
import body2024FirstAssets from "./2024-first-body-assets.json";
import body2024Second from "./2024-second-body.json";
import body2024SecondAssets from "./2024-second-body-assets.json";

export type AutomotiveExamCode =
  | "jidosha-1-small-written" | "jidosha-2-gasoline" | "jidosha-2-diesel"
  | "jidosha-2-chassis" | "jidosha-2-motorcycle" | "jidosha-3-chassis"
  | "jidosha-3-gasoline" | "jidosha-3-diesel" | "jidosha-3-motorcycle"
  | "jidosha-body" | "jidosha-electrical";

export const AUTOMOTIVE_QUALIFICATIONS = qualifications;
const imageBindings: Record<string, Array<{ url: string; physicalPage: number }>> = { ...assets, ...priorAssets, ...body2024SecondAssets, ...body2024FirstAssets, ...body2023SecondAssets, ...body2023FirstAssets, ...body2022SecondAssets };

/**
 * Previous sitting for the five subjects that had only one sitting (W2, 2026-11-06):
 * 令和6年度第2回 (2025-03-23) for 1-small-written / 2-chassis / 3-motorcycle / electrical,
 * 令和7年度第1回 (2025-10-05) for 2-motorcycle. Evidence: data/qualification-staging/automotive/prior-sittings/.
 */
export const AUTOMOTIVE_PRIOR_SITTING_IDS: ReadonlySet<string> = new Set(priorSittings.map((q) => q.id));

/** Existing accepted candidates only. The remaining saved originals stay in staging. */
export const AUTOMOTIVE_QUESTIONS: Question[] = [...reviewed, ...priorSittings, ...body2024Second, ...body2024First, ...body2023Second, ...body2023First, ...body2022Second].map((q) => ({
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
