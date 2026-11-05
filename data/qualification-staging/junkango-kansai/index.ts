import { z } from "zod";
import type { Question } from "@/lib/questions/types";
import source2026 from "./2026-annual.json";
import source2025 from "./2025-annual.json";

export const PRINTED_CHOICES = ["1", "2", "3", "4"] as const;
export type PrintedChoice = typeof PRINTED_CHOICES[number];

/** Editorial transport only; no public exam code or reuse licence is invented. */
export type JunkangoStagedQuestion = Pick<Question,
  "id" | "year" | "fiscalYear" | "season" | "session" | "examDate" | "qNumber" |
  "question" | "sourcePdfUrl" | "sourceAnswerUrl" | "sourceAttribution" | "lastUpdated"
> & {
  exam: "junkango-kansai";
  publicAllowed: false;
  publicationStatus: "staging";
  type: "multiple-choice";
  choices: Record<PrintedChoice, string>;
  officialAnswerNumber: string;
  acceptedAnswerNumbers: number[];
  scoring: "single-choice" | "all-correct" | "accepted-alternatives";
  scoringNotice?: string;
  scoringNoticeUrl?: string;
  sourcePage: number;
  sourceImages: string[];
  sourceTextSha256: string;
  category: string;
  topicTags: string[];
  choiceExplanations: Record<PrintedChoice, string>;
  explanation: string;
  explanationCoverage: "full";
  explanationAuthorship: "original";
  officialReferenceUrls: string[];
  lawReferenceDate: null;
  lawReferenceDateNote: string;
  needsReview: true;
};

export const JunkangoStagedQuestionSchema = z.object({
  id: z.string().regex(/^junkango-kansai-202[56]-q\d+$/),
  exam: z.literal("junkango-kansai"),
  publicAllowed: z.literal(false),
  publicationStatus: z.literal("staging"),
  year: z.union([z.literal(2026), z.literal(2025)]),
  fiscalYear: z.union([z.literal(2025), z.literal(2024)]),
  season: z.literal("annual"),
  session: z.literal("gakka"),
  examDate: z.string().regex(/^202[56]-02-0[12]$/),
  qNumber: z.number().int().min(1).max(150),
  type: z.literal("multiple-choice"),
  question: z.string().refine(text => text.trim().length > 0),
  choices: z.record(z.enum(PRINTED_CHOICES), z.string().refine(text => text.trim().length > 0)),
  officialAnswerNumber: z.string().regex(/^(?:[1-4]|-|2・4)$/),
  acceptedAnswerNumbers: z.array(z.number().int().min(1).max(4)).max(2),
  scoring: z.enum(["single-choice", "all-correct", "accepted-alternatives"]),
  scoringNotice: z.string().min(1).optional(),
  scoringNoticeUrl: z.string().url().optional(),
  sourcePdfUrl: z.string().url(),
  sourceAnswerUrl: z.string().url(),
  sourceAttribution: z.string().startsWith("出典：関西広域連合"),
  sourcePage: z.number().int().min(4).max(33),
  sourceImages: z.array(z.string().startsWith("data/qualification-staging/junkango-kansai/assets/")).length(1),
  sourceTextSha256: z.string().regex(/^[a-f0-9]{64}$/),
  category: z.string().min(1),
  topicTags: z.array(z.string().min(1)).min(1),
  choiceExplanations: z.record(z.enum(PRINTED_CHOICES), z.string().trim().min(20)),
  explanation: z.string().min(80),
  explanationCoverage: z.literal("full"),
  explanationAuthorship: z.literal("original"),
  officialReferenceUrls: z.array(z.string().url()),
  lawReferenceDate: z.null(),
  lawReferenceDateNote: z.string().min(1),
  needsReview: z.literal(true),
  lastUpdated: z.literal("2026-11-04"),
}).strict();

export const JUNKANGO_KANSAI_STAGED_QUESTIONS: readonly JunkangoStagedQuestion[] = [
  ...z.array(JunkangoStagedQuestionSchema).length(150).parse(source2026),
  ...z.array(JunkangoStagedQuestionSchema).length(150).parse(source2025),
];

export const JUNKANGO_KANSAI_REGISTRATION = {
  slug: "junkango-kansai",
  name: "准看護師試験（関西広域連合）",
  publicationStatus: "staging",
  publicAllowed: false,
  questions: JUNKANGO_KANSAI_STAGED_QUESTIONS,
} as const;

/** Q6 receives credit even without a response. Q139 accepts either 2 OR 4. */
export function scoreJunkangoStagedQuestion(question: JunkangoStagedQuestion, selectedNumber: number | null): boolean {
  return question.scoring === "all-correct" ||
    (selectedNumber !== null && Number.isInteger(selectedNumber) && question.acceptedAnswerNumbers.includes(selectedNumber));
}
