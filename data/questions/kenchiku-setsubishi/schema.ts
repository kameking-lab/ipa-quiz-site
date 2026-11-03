import { z } from "zod";

const text = z.string().trim().min(1);
const fourChoices = z.object({ "\u30a2": text, "\u30a4": text, "\u30a6": text, "\u30a8": text }).strict();
const officialPdf = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" && url.hostname === "www.jaeic.or.jp" && url.pathname.endsWith(".pdf");
}, "Official JAEIC PDF required");

export const KenchikuQuestionSchema = z.object({
  id: text, exam: z.literal("kenchiku-setsubishi"),
  session: z.enum(["am1", "am2", "pm"]), year: z.union([z.literal(2025), z.literal(2026)]),
  season: z.literal("annual"), qNumber: z.number().int().positive(),
  subject: text, type: z.literal("multiple-choice"), category: text,
  topicTags: z.array(text), difficulty: z.number().int().min(1).max(5),
  question: text, choices: fourChoices, answer: z.enum(["\u30a2", "\u30a4", "\u30a6", "\u30a8"]),
  officialAnswerNumber: z.enum(["1", "2", "3", "4"]), requiredSelections: z.literal(1),
  explanation: text, choiceExplanations: fourChoices, explanationCoverage: z.literal("full"),
  hasImage: z.boolean(), imageUrls: z.array(text).optional(), choiceImageUrls: fourChoices.partial().optional(),
  sourcePdfUrl: officialPdf, sourceAnswerUrl: officialPdf, sourceAttribution: text,
  license: z.literal("JAEIC-permission-required"), lawReferenceDate: z.iso.date(),
  lastUpdated: z.iso.date(), needsReview: z.boolean(),
  assessmentMode: z.literal("reference-only").optional(), questionNotice: text.optional(),
}).passthrough().superRefine((q, ctx) => {
  const expectedId = `kenchiku-setsubishi-${q.year}-annual-${q.session}-q${q.qNumber}`;
  const keys = ["\u30a2", "\u30a4", "\u30a6", "\u30a8"];
  if (q.id !== expectedId || q.answer !== keys[Number(q.officialAnswerNumber) - 1])
    ctx.addIssue({ code: "custom", message: "Original ID/official answer mismatch" });
  const special = q.id === "kenchiku-setsubishi-2026-annual-am2-q18";
  if (special ? q.assessmentMode !== "reference-only" || !q.needsReview || !q.questionNotice : q.assessmentMode !== undefined || q.needsReview)
    ctx.addIssue({ code: "custom", message: "Reference-only/review boundary mismatch" });
  if (q.hasImage !== Boolean(q.imageUrls?.length || Object.keys(q.choiceImageUrls ?? {}).length))
    ctx.addIssue({ code: "custom", message: "Figure reference mismatch" });
});
