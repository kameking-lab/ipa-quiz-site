import { z } from "zod";
import { createHash } from "node:crypto";
import questions2024 from "../../data/qualification-staging/chintai/2024.json";
import questions2025 from "../../data/qualification-staging/chintai/2025.json";
import manifest from "../../data/qualification-staging/chintai/manifest.json";
import sourceAudit from "../../data/qualification-staging/chintai/source-audit.json";

const officialEvidence = new Map(sourceAudit.questions.map((q) => [q.id, q]));

// Match the source-audit Python JSON serialization without altering string content.
function sourceJson(value: string | Record<string, unknown>): string {
  if (typeof value === "string") return JSON.stringify(value);
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}: ${sourceJson(value[key] as string | Record<string, unknown>)}`).join(", ")}}`;
}

const choices = z.object({
  "1": z.string().min(1), "2": z.string().min(1),
  "3": z.string().min(1), "4": z.string().min(1),
}).strict();

/** This schema is deliberately separate from the public Question/ExamCode model. */
export const ChintaiStagingQuestionSchema = z.object({
  id: z.string(), slug: z.literal("chintai"),
  year: z.union([z.literal(2024), z.literal(2025)]),
  round: z.number().int(), qNumber: z.number().int().min(1).max(50),
  publicationStatus: z.literal("staging"), lawAsOf: z.string(),
  question: z.string().min(10), choices,
  officialAnswerNumber: z.number().int().min(1).max(4).nullable(),
  acceptedAnswerNumbers: z.array(z.number().int().min(1).max(4)),
  scoring: z.enum(["single-choice", "all-answers-correct"]),
  sourcePdfUrl: z.string().url(), sourceAnswerUrl: z.string().url(),
  sourcePage: z.number().int().min(2).max(29), sourceAttribution: z.string().min(20),
  category: z.string().min(1), choiceExplanations: choices,
  statementExplanations: z.record(z.string(), z.string().min(15)).optional(),
  explanation: z.string().min(30), explanationAuthorship: z.literal("original"),
  officialReferenceUrls: z.array(z.string().url()).min(1),
  lastUpdated: z.literal("2026-11-04"), sourceTextSha256: z.string().regex(/^[a-f0-9]{64}$/),
  transcriptionNote: z.string().optional(), scoringNote: z.string().optional(),
}).strict().superRefine((q, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: "custom", message });
  if (q.id !== `chintai-${q.year}-q${q.qNumber}` || q.round !== q.year - 2012)
    fail("ID/year/round mismatch");
  const evidence = officialEvidence.get(q.id);
  const actualTextHash = createHash("sha256").update(sourceJson({ question: q.question, choices: q.choices })).digest("hex");
  if (!evidence || !evidence.textMatch || !evidence.answerMatch ||
      evidence.officialAnswerNumber !== q.officialAnswerNumber ||
      evidence.sourcePage !== q.sourcePage || evidence.sourceTextSha256 !== q.sourceTextSha256 ||
      actualTextHash !== q.sourceTextSha256)
    fail("question must agree with the complete official PDF audit evidence");
  if (q.lawAsOf !== `${q.year}-04-01`) fail("lawAsOf must be the examination's April 1");
  for (const [field, kind] of [["sourcePdfUrl", "question"], ["sourceAnswerUrl", "answer"]] as const)
    if (q[field] !== `https://www.chintaikanrishi.jp/assets/common/else/past_${kind}_${q.year}.pdf`)
      fail(`${field} must identify the matching official PDF`);
  const allCorrect = q.year === 2025 && q.qNumber === 9;
  if (allCorrect) {
    if (q.scoring !== "all-answers-correct" || q.officialAnswerNumber !== null ||
        JSON.stringify(q.acceptedAnswerNumbers) !== "[1,2,3,4]" || !q.scoringNote?.includes("全て"))
      fail("2025 q9 must accept every answer and must not invent a single official answer");
  } else if (q.scoring !== "single-choice" || q.officialAnswerNumber === null ||
      JSON.stringify(q.acceptedAnswerNumbers) !== JSON.stringify([q.officialAnswerNumber]))
    fail("ordinary questions must accept exactly their official answer");
  const labels = [...q.question.matchAll(/^([アイウエ])\s/gm)].map((m) => m[1]);
  if (JSON.stringify(labels.sort()) !== JSON.stringify(Object.keys(q.statementExplanations ?? {}).sort()))
    fail("each inner statement must have its own explanation");
  for (const value of Object.values(q.choiceExplanations))
    if (value.length < 20) fail("every choice needs a substantive explanation");
});

export const CHINTAI_STAGING_QUESTIONS = [...questions2024, ...questions2025];

export function validateChintaiStaging(): number {
  if (manifest.publicationStatus !== "staging" || manifest.publishable !== false || manifest.expectedQuestions !== 100)
    throw new Error("chintai manifest publication gate mismatch");
  if (sourceAudit.questionCount !== 100 || officialEvidence.size !== 100)
    throw new Error("chintai source audit must cover all 100 questions");
  z.array(ChintaiStagingQuestionSchema).length(100).parse(CHINTAI_STAGING_QUESTIONS);
  for (const year of [2024, 2025]) {
    const numbers = CHINTAI_STAGING_QUESTIONS.filter((q) => q.year === year).map((q) => q.qNumber).sort((a, b) => a - b);
    if (JSON.stringify(numbers) !== JSON.stringify(Array.from({ length: 50 }, (_, i) => i + 1)))
      throw new Error(`chintai ${year}: missing or duplicate official question number`);
  }
  return CHINTAI_STAGING_QUESTIONS.length;
}
