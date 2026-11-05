/** Private corpus only. Intentionally absent from ExamCode and public registries. */
import { z } from "zod";
import source2025Ippan from "./2025-ippan.json";
import source2025Nougyou from "./2025-nougyou.json";
import source2025Tokutei from "./2025-tokutei.json";
import source2026Ippan from "./2026-ippan.json";
import source2026Nougyou from "./2026-nougyou.json";
import source2026Tokutei from "./2026-tokutei.json";
import sources from "./sources.json";
import officialAnswers from "./official-answers.json";

const officialUrl = z.url().refine(url => new URL(url).hostname === "www.pref.chiba.lg.jp");
const choiceNumber = z.number().int().min(1).max(5);
const questionSchema = z.object({
  id: z.string().regex(/^dokugeki-chiba-202[56]-(ippan|nougyou|tokutei)-\d{2}$/),
  exam: z.literal("dokugeki-chiba"),
  year: z.union([z.literal(2025), z.literal(2026)]),
  season: z.literal("annual"),
  track: z.enum(["ippan", "nougyou", "tokutei"]),
  trackLabel: z.enum(["一般", "農業用品目", "特定品目"]),
  examDate: z.string().regex(/^202[56]-08-05$/),
  qNumber: z.number().int().min(1).max(80),
  originalGroupNumber: z.number().int().min(1).max(14),
  category: z.string().min(1),
  question: z.string().min(1),
  sharedPrompt: z.string().min(1),
  choices: z.array(z.string().trim().min(1)).length(5),
  choiceHeader: z.string(),
  postOptionContent: z.string(),
  targetBlankNumber: z.number().int().min(1).max(80).nullable(),
  originalText: z.string().min(50),
  sourcePages: z.array(z.number().int().min(3).max(43)).min(1),
  sourceImages: z.array(z.string().regex(/^data\/qualification-staging\/dokugeki-chiba\/assets\/202[56]-(ippan|nougyou|tokutei)-p\d{2}\.webp$/)).min(1),
  officialAnswerNumber: choiceNumber,
  scoring: z.object({ kind: z.literal("single-choice"), correctChoice: choiceNumber }),
  sourcePdfUrl: officialUrl,
  sourceAnswerUrl: officialUrl,
  sourceAttribution: z.string().startsWith("出典：千葉県"),
  lawReferenceDate: z.null(),
  lawReferenceDateNote: z.string().min(1),
  publicAllowed: z.literal(false),
  lastUpdated: z.literal("2026-11-04"),
  choiceExplanations: z.array(z.string().min(12)).length(5),
  explanationCoverage: z.literal("all-choices"),
  explanation: z.string().min(10),
  explanationSourceUrls: z.array(z.url()).min(2),
  needsReview: z.boolean(),
  sourceIssue: z.string().min(1).optional(),
}).strict();

export type DokugekiChibaStagedQuestion = z.infer<typeof questionSchema>;
export const DOKUGEKI_CHIBA_STAGED_QUESTIONS: readonly DokugekiChibaStagedQuestion[] =
  z.array(questionSchema).length(480).parse([
    ...source2025Ippan, ...source2025Nougyou, ...source2025Tokutei,
    ...source2026Ippan, ...source2026Nougyou, ...source2026Tokutei,
  ]);

export const DOKUGEKI_CHIBA_REGISTRATION = {
  slug: "dokugeki-chiba",
  publicAllowed: false,
  sources,
  officialAnswers,
  questions: DOKUGEKI_CHIBA_STAGED_QUESTIONS,
} as const;

/** Each original answer column takes exactly one printed numeric choice. */
export function scoreDokugekiChibaQuestion(question: DokugekiChibaStagedQuestion, selected: number | null): boolean {
  return selected !== null && Number.isInteger(selected) && selected >= 1 && selected <= 5 &&
    question.scoring.correctChoice === selected;
}
