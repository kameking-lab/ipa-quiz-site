import { z } from "zod";
import edition2024 from "./2024-annual.json";
import edition2025 from "./2025-annual.json";

/** Private editorial format: original images are required, not optional decoration. */
export const DojoOsenQuestionSchema = z.object({
  id: z.string().regex(/^dojo-osen-202[45]-(am|pm)-q\d+$/),
  exam: z.literal("dojo-osen"),
  year: z.union([z.literal(2024), z.literal(2025)]),
  season: z.literal("annual"),
  session: z.enum(["am", "pm"]),
  qNumber: z.number().int().min(1).max(45),
  category: z.enum(["調査", "対策", "法令等"]),
  publicAllowed: z.literal(false),
  question: z.string().min(15),
  choices: z.array(z.string().min(1)).length(5),
  choiceRepresentation: z.enum(["pdf-text", "original-image"]),
  originalText: z.string().min(15),
  sourceImages: z.array(z.string().regex(/^data\/qualification-staging\/dojo-osen\/assets\/.+\.png$/)).min(1),
  sourcePdfPages: z.array(z.number().int().positive()).min(1),
  sourcePdfUrl: z.string().regex(/^https:\/\/www\.env\.go\.jp\/content\/\d+\.pdf$/),
  sourceAnswerUrl: z.string().regex(/^https:\/\/www\.env\.go\.jp\/content\/\d+\.pdf$/),
  sourceAttribution: z.string().min(30),
  lawReferenceDate: z.string().regex(/^202[45]-09-01$/),
  officialAnswerNumber: z.number().int().min(1).max(5).nullable(),
  scoring: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("single-choice"), correctChoice: z.number().int().min(1).max(5) }),
    z.object({ kind: z.literal("all-correct"), correctChoice: z.null(), notice: z.string().url(), reason: z.string().min(20) }),
  ]),
  choiceExplanations: z.array(z.string().min(20)).length(5),
  explanationCoverage: z.literal("all-choices"),
  explanationSourceUrls: z.array(z.string().url()).min(1),
  explanation: z.string().min(100),
  lastUpdated: z.literal("2026-11-04"),
}).superRefine((q, ctx) => {
  const expectedCategory = q.session === "am" ? "調査" : q.qNumber <= 25 ? "対策" : "法令等";
  if (q.category !== expectedCategory || q.id !== `dojo-osen-${q.year}-${q.session}-q${q.qNumber}` ||
      (q.session === "am" && q.qNumber > 35) || q.lawReferenceDate !== `${q.year}-09-01` ||
      q.sourceImages.length !== q.sourcePdfPages.length) {
    ctx.addIssue({ code: "custom", message: "Question identity, category, date or continuation pages mismatch" });
  }
  if (q.officialAnswerNumber !== q.scoring.correctChoice) {
    ctx.addIssue({ code: "custom", message: "Official key and scoring disagree" });
  }
  const cancelled = q.year === 2025 && q.session === "am" && q.qNumber === 30;
  if ((q.scoring.kind === "all-correct") !== cancelled) {
    ctx.addIssue({ code: "custom", message: "Only 2025 investigation Q30 receives official all-correct treatment" });
  }
});

export type DojoOsenStagedQuestion = z.infer<typeof DojoOsenQuestionSchema>;
export const DOJO_OSEN_STAGED_QUESTIONS: readonly DojoOsenStagedQuestion[] =
  z.array(DojoOsenQuestionSchema).length(160).parse([...edition2024, ...edition2025]);

export const DOJO_OSEN_STAGING = {
  slug: "dojo-osen",
  name: "土壌汚染調査技術管理者試験",
  administrator: "環境省",
  publicAllowed: false,
  sourceImagesAreCanonical: true,
  textRepresentation: "pdf-extraction-auxiliary",
  questions: DOJO_OSEN_STAGED_QUESTIONS,
} as const;

/** All candidates, including an unanswered response, receive official credit for Q30. */
export function scoreDojoOsenStagedQuestion(q: DojoOsenStagedQuestion, selectedNumber: number | null): boolean {
  return q.scoring.kind === "all-correct" || q.scoring.correctChoice === selectedNumber;
}

export function validateDojoOsenStaging(): number {
  const rows = DOJO_OSEN_STAGED_QUESTIONS;
  if (new Set(rows.map(q => q.id)).size !== 160) throw new Error("Duplicate dojo-osen question ID");
  for (const year of [2024, 2025]) {
    for (const [session, count] of [["am", 35], ["pm", 45]] as const) {
      const edition = rows.filter(q => q.year === year && q.session === session);
      if (edition.length !== count || edition.some((q, i) => q.qNumber !== i + 1)) {
        throw new Error(`Incomplete dojo-osen ${year} ${session}`);
      }
    }
  }
  return rows.length;
}
