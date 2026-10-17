import { z } from "zod";
import type { NativeBData, NativeBGrade, Question } from "./types";

const text = z.string().refine((value) => value.trim().length > 0, "Empty text");
const token = text.refine((value) => !["__proto__", "constructor", "prototype"].includes(value), "Unsafe identifier");
export const NativeBDataSchema = z.object({
  mode: z.enum(["binary", "shared-bank"]),
  candidates: z.array(z.object({ id: token, label: text, explanation: text.optional(), imageUrl: text.optional() }).strict()),
  slots: z.array(z.object({
    label: token, prompt: text.optional(), answer: token, explanation: text,
    candidateExplanations: z.record(token, text).optional(),
  }).strict()).length(5),
  bankImageUrls: z.array(text).optional(), bankImageAltTexts: z.array(text).optional(),
  officialLabel: text.optional(),
  officialScoring: z.object({ maxPoints: z.number().nonnegative().optional(), pointsPerSlot: z.number().nonnegative().optional(), note: text.optional() }).strict().optional(),
}).strict().superRefine((data, context) => {
  const issue = (message: string) => context.addIssue({ code: z.ZodIssueCode.custom, message });
  if (data.candidates.length !== (data.mode === "binary" ? 2 : 10)) issue("Native B requires the printed 2 or 10 candidate bank");
  const ids = new Set(data.candidates.map((candidate) => candidate.id));
  if (ids.size !== data.candidates.length) issue("Duplicate candidate ID");
  if (new Set(data.slots.map((slot) => slot.label)).size !== 5) issue("Duplicate slot label");
  for (const slot of data.slots) {
    if (!ids.has(slot.answer)) issue(`Unknown answer ID: ${slot.label}`);
    if (Object.keys(slot.candidateExplanations ?? {}).some((id) => !ids.has(id))) issue(`Unknown explanation candidate: ${slot.label}`);
  }
  // Existing binary statement reasons cover both truth values. Shared word banks
  // can use common definitions plus selected-slot reasons, without a new matrix.
  if (data.mode === "shared-bank") for (const candidate of data.candidates) {
    if (!candidate.explanation && !data.slots.every((slot) => slot.candidateExplanations?.[candidate.id])) issue(`Missing candidate reason: ${candidate.id}`);
  }
  if (data.bankImageAltTexts && data.bankImageAltTexts.length !== data.bankImageUrls?.length) issue("Bank image alt count mismatch");
});

export function nativeBQuestionIssue(question: Question): string | null {
  if (question.type !== "native-b") return question.nativeB ? "nativeB requires native-b type" : null;
  const parsed = NativeBDataSchema.safeParse(question.nativeB);
  if (!parsed.success) return parsed.error.issues.map((issue) => issue.message).join("; ");
  if (question.answer !== "" || question.choices !== undefined || question.requiredSelections !== undefined) return "Native B must retain one original ID, without legacy answer/choices";
  return null;
}

const envelope = z.object({
  id: text, exam: text, session: text, year: z.number().int(), season: text,
  qNumber: z.number().int().positive(), type: z.enum(["multiple-choice", "ordering", "numeric", "descriptive", "essay", "native-b"]),
  category: text, topicTags: z.array(text), difficulty: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  question: text, explanation: text, hasImage: z.boolean(), sourcePdfUrl: text, license: text,
}).passthrough();

/** Data-only entry shared by qualification indexes. No source text is rewritten. */
export function normalizeQuestionData(input: unknown): Question {
  envelope.parse(input);
  const source = input as Record<string, unknown>;
  if (source.type === "native-b") {
    if (source.answer !== undefined && source.answer !== "") throw new Error("Native B uses slots[].answer only");
    NativeBDataSchema.parse(source.nativeB);
    const question = { ...source, answer: "" } as unknown as Question;
    const issue = nativeBQuestionIssue(question);
    if (issue) throw new Error(issue);
    return question;
  }
  if (source.nativeB !== undefined) throw new Error("nativeB requires native-b type");
  if (!(typeof source.answer === "string" && source.answer.trim() || Array.isArray(source.answer) && source.answer.length && source.answer.every((answer) => typeof answer === "string" && answer.trim()))) throw new Error("Missing answer");
  return input as Question;
}

export type NativeBSelections = Readonly<Record<string, string | null | undefined>>;
export function gradeNativeB(data: NativeBData, selections: NativeBSelections): NativeBGrade {
  NativeBDataSchema.parse(data);
  const ids = new Set(data.candidates.map((candidate) => candidate.id));
  const unknownSlots = Object.keys(selections).some((label) => !data.slots.some((slot) => slot.label === label));
  if (unknownSlots) throw new Error("Unknown native B slot");
  const slotResults: NativeBGrade["slotResults"] = data.slots.map((slot) => {
    const selected = Object.hasOwn(selections, slot.label) ? selections[slot.label] : undefined;
    const selectedCandidateId = selected == null || selected === "" ? null : selected;
    const status = selected == null || selected === "" ? "unanswered" : !ids.has(selected) ? "invalid" : selected === slot.answer ? "correct" : "incorrect";
    return { label: slot.label, selectedCandidateId, correctCandidateId: slot.answer, status, isCorrect: status === "correct" };
  });
  const correctSlots = slotResults.filter((slot) => slot.isCorrect).length;
  return { isCorrect: !unknownSlots && correctSlots === 5, correctSlots, totalSlots: 5, slotResults };
}
export function serializeNativeBSelections(data: NativeBData, selections: NativeBSelections): string {
  return JSON.stringify(Object.fromEntries(data.slots.map((slot) => [slot.label, selections[slot.label] === "" ? null : selections[slot.label] ?? null])));
}
export function formatNativeBAnswer(data: NativeBData): string {
  return data.slots.map((slot) => `${slot.label}: ${slot.answer}`).join(" / ");
}
