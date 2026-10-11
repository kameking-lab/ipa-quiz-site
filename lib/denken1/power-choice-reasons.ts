import { z } from "zod";

const text = z.string().trim().min(1);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const field = z.object({
  slot: z.number().int().positive(),
  officialAnswer: text,
  reviewedExplanation: text.optional(),
  choiceExplanations: z.record(text, text),
}).strict();
const supplementSchema = z.object({
  schemaVersion: z.literal(1),
  year: z.union([z.literal(2025), z.literal(2026)]),
  stage: z.literal("primary"),
  subject: z.literal("power"),
  sourcePacketSha256: hash,
  sourceQuestionPdfSha256: hash,
  sourceAnswerPdfSha256: hash,
  baseNativePartCanonicalSha256: hash,
  questions: z.array(z.object({
    id: z.string().regex(/^denken1-202[56]-primary-power-q0[1-6]$/),
    choiceGroups: z.record(text, text),
    fields: z.array(field).min(5),
  }).strict()).length(6),
}).strict();

type SourcePart = {
  year: number;
  season: string;
  subject: string;
  sourcePacketSha256: string;
  sourceAnswerPdfSha256: string;
  questions: {
    id: string;
    sourcePdfSha256: string;
    choiceGroups: Record<string, string>;
    slots: { slot: number; officialAnswer: string; explanation: string; choiceExplanations?: Record<string, string> }[];
  }[];
};

/** Add separately authored explanations without editing the verified source packet. */
export function withPowerChoiceReasons<T extends SourcePart>(source: T, raw: unknown): T {
  const supplement = supplementSchema.parse(raw);
  if (source.year !== supplement.year || source.subject !== supplement.subject || source.season !== supplement.stage
    || source.sourcePacketSha256 !== supplement.sourcePacketSha256
    || source.sourceAnswerPdfSha256 !== supplement.sourceAnswerPdfSha256) {
    throw new Error("Denken1 power choice supplement source mismatch");
  }
  const byId = new Map(supplement.questions.map(q => [q.id, q]));
  if (byId.size !== 6 || source.questions.length !== 6) {
    throw new Error("Denken1 power choice supplement original scope mismatch");
  }
  const questions = source.questions.map(original => {
    const added = byId.get(original.id);
    if (!added || original.sourcePdfSha256 !== supplement.sourceQuestionPdfSha256) {
      throw new Error(`Denken1 power choice supplement original mismatch: ${original.id}`);
    }
    const labels = Object.keys(original.choiceGroups);
    if (Object.keys(added.choiceGroups).length !== labels.length
      || labels.some(label => original.choiceGroups[label] !== added.choiceGroups[label])) {
      throw new Error(`Denken1 power choice supplement bank mismatch: ${original.id}`);
    }
    const bySlot = new Map(added.fields.map(f => [f.slot, f]));
    if (bySlot.size !== original.slots.length || added.fields.length !== original.slots.length) {
      throw new Error(`Denken1 power choice supplement field scope mismatch: ${original.id}`);
    }
    const slots = original.slots.map(originalField => {
      const addedField = bySlot.get(originalField.slot);
      if (!addedField || addedField.officialAnswer !== originalField.officialAnswer
        || Object.keys(addedField.choiceExplanations).length !== labels.length
        || labels.some(label => !addedField.choiceExplanations[label])) {
        throw new Error(`Denken1 power choice supplement field or bank mismatch: ${original.id} (${originalField.slot})`);
      }
      if (originalField.choiceExplanations !== undefined) {
        throw new Error(`Denken1 power choice supplement would overwrite existing reasons: ${original.id} (${originalField.slot})`);
      }
      if (new Set(Object.values(addedField.choiceExplanations)).size !== labels.length) {
        throw new Error(`Denken1 power choice supplement repeated reasons: ${original.id} (${originalField.slot})`);
      }
      return {
        ...originalField,
        ...(addedField.reviewedExplanation ? { explanation: addedField.reviewedExplanation } : {}),
        choiceExplanations: { ...addedField.choiceExplanations },
      };
    });
    return { ...original, slots };
  });
  return { ...source, questions } as T;
}
