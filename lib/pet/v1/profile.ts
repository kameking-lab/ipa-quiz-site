import { z } from "zod";
import { LS_KEYS } from "@/lib/storage/keys";
import { canonicalPetQualification } from "./qualification";
import { PET_ROOM_SCENES } from "./room";
export { canonicalPetQualification } from "./qualification";

export const PET_PROFILE_VERSION = 1;
export const PET_DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;
// The versioned export envelope adds fewer than 256 UTF-8 bytes. A document
// at its storage limit must still round-trip through manual backup.
export const PET_BACKUP_MAX_BYTES = PET_DOCUMENT_MAX_BYTES + 256;
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
export const petTimestampSchema = count.max(8_640_000_000_000_000);
const ownerSchema = z.string().max(256).regex(/^(guest|user:[^\s\x00-\x1f\x7f]+)$/);
export const petQualificationSchema = z.string().refine(value => canonicalPetQualification(value) === value);
export const petOwnerSchema = ownerSchema;
export const petTimeZoneSchema = z.string().min(1).max(100).refine(value => {
  try { new Intl.DateTimeFormat("en", { timeZone: value }); return true; } catch { return false; }
});
export function petProfileStorageKey(ownerScope: string) {
  return LS_KEYS.petProfilesPrefix + encodeURIComponent(ownerSchema.parse(ownerScope));
}
export function petIndividualId(ownerScope: string, qualificationId: string) {
  return JSON.stringify([ownerSchema.parse(ownerScope), petQualificationSchema.parse(qualificationId)]);
}
const unique = (values: readonly string[]) => new Set(values).size === values.length;
export const petQuestionSchema = z.object({
  questionId: z.string().min(1).max(1000), legacy: z.boolean(), firstRewarded: z.boolean(),
  fieldId: z.string().trim().min(1).max(200).nullable().default(null),
  independentlyCorrect: z.boolean().default(false),
  lastRewardedAt: petTimestampSchema.nullable().default(null),
  lastIncorrectAt: petTimestampSchema.nullable().default(null),
  independentCorrectAts: z.array(petTimestampSchema).default([]),
  overcomeAt: petTimestampSchema.nullable().default(null),
  rewardedReviewCycles: z.array(z.string().min(1).max(1000)).default([]),
}).strict().refine(question => unique(question.rewardedReviewCycles) &&
  question.independentCorrectAts.every((time, index, times) => index === 0 || time - times[index - 1] >= 86_400_000));
export const petStageSchema = z.enum(["puppy", "partner", "expert"]);
export const petPathSchema = z.enum(["exploration", "memory", "precision", "companionship"]);
export function isPetLearningDay(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  return day <= [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}
export const petLearningDaySchema = z.string().refine(isPetLearningDay);
export const petReviewBeforeSchema = z.object({
  dueAt: petTimestampSchema, lastReviewedAt: petTimestampSchema,
}).strict().refine(review => review.dueAt > review.lastReviewedAt);
/** Device-local facts, never authority for payment, ranking or account APIs. */
export const petLearningFactSchema = z.object({
  eventId: z.string().min(1).max(128), ownerScope: ownerSchema,
  qualificationId: petQualificationSchema, canonicalQuestionId: z.string().min(1).max(1000),
  contentVersion: z.string().min(1).max(128), sessionId: z.string().min(1).max(128),
  attemptKind: z.enum(["answer", "revealed"]), grade: z.enum(["correct", "incorrect", "ungraded"]),
  reviewCycleId: z.string().min(1).max(1000).nullable(),
  reviewBefore: petReviewBeforeSchema.nullable().default(null),
  fieldId: z.string().trim().min(1).max(200).nullable().default(null),
  occurredAt: petTimestampSchema.max(253_402_300_799_999), policyVersion: z.literal(1),
}).strict().refine(event => (event.attemptKind === "revealed" ? event.grade === "ungraded" : event.grade !== "ungraded") &&
  (event.reviewBefore === null || (event.reviewBefore.lastReviewedAt <= event.occurredAt &&
    event.reviewCycleId === JSON.stringify([event.reviewBefore.lastReviewedAt, event.reviewBefore.dueAt]))));
export type PetLearningFact = z.infer<typeof petLearningFactSchema>;
export const petProfileSchema = z.object({
  petId: z.string(), qualificationId: petQualificationSchema,
  name: z.string().trim().min(1).max(24), growth: count, bond: count,
  questions: z.array(petQuestionSchema),
  learningDays: z.array(petLearningDaySchema),
  unlockedStages: z.array(petStageSchema).min(1), selectedStage: petStageSchema,
  unlockedPaths: z.array(petPathSchema), selectedPath: petPathSchema.nullable(),
  roomEvents: z.array(z.object({ scene: z.enum(PET_ROOM_SCENES), day: petLearningDaySchema, occurredAt: petTimestampSchema }).strict())
    .max(6).refine(events => unique(events.map(event => event.scene)) && unique(events.map(event => event.day))).default([]),
  recentAnswers: z.array(z.object({ questionId: z.string().min(1).max(1000), correct: z.boolean() }).strict()).max(20).default([]),
  care: z.object({ autoFeed: z.boolean(), meals: z.array(z.object({
    rewardId: petLearningDaySchema, earnedAt: petTimestampSchema, consumedAt: petTimestampSchema.nullable(),
  }).strict()).refine(meals => unique(meals.map(meal => meal.rewardId))) }).strict().default(() => ({ autoFeed: true, meals: [] })),
  combo: z.object({ sessionId: z.string().min(1).max(128), questionIds: z.array(z.string().min(1).max(1000)) }).strict()
    .refine(combo => unique(combo.questionIds)).nullable().default(null),
  memories: z.array(z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("overcome"), questionId: z.string().min(1).max(1000), occurredAt: petTimestampSchema }).strict(),
    z.object({ kind: z.literal("stage"), stage: petStageSchema, occurredAt: petTimestampSchema }).strict(),
    z.object({ kind: z.literal("path"), path: petPathSchema, occurredAt: petTimestampSchema }).strict(),
  ])).default([]),
}).strict().refine(profile => unique(profile.questions.map(q => q.questionId)) &&
  unique(profile.learningDays) && unique(profile.unlockedStages) && unique(profile.unlockedPaths) &&
  profile.unlockedStages.includes("puppy") && profile.unlockedStages.includes(profile.selectedStage) &&
  (profile.selectedPath === null || profile.unlockedPaths.includes(profile.selectedPath)));
export type PetProfile = z.infer<typeof petProfileSchema>;
export const petProfileDocumentSchema = z.object({
  version: z.literal(PET_PROFILE_VERSION), ownerScope: ownerSchema, timeZone: petTimeZoneSchema,
  revision: count, profiles: z.array(petProfileSchema),
  events: z.array(petLearningFactSchema).default([]),
  legacyMigration: z.object({
    sourceKey: z.literal(LS_KEYS.petLearning), raw: z.string(), migratedAt: petTimestampSchema,
    unassignedAnswers: count, food: count, meals: count, outfit: z.string(),
  }).strict().nullable(),
}).strict().refine(doc => unique(doc.profiles.map(profile => profile.qualificationId)) &&
  doc.profiles.every(profile => profile.petId === petIndividualId(doc.ownerScope, profile.qualificationId)) &&
  unique(doc.events.map(event => event.eventId)) && doc.events.every(event => event.ownerScope === doc.ownerScope &&
    doc.profiles.some(profile => profile.qualificationId === event.qualificationId)));
export type PetProfileDocument = z.infer<typeof petProfileDocumentSchema>;
export function emptyPetProfiles(ownerScope: string, timeZone: string): PetProfileDocument {
  return petProfileDocumentSchema.parse({ version: PET_PROFILE_VERSION, ownerScope, timeZone,
    revision: 0, profiles: [], legacyMigration: null });
}
export function newPetProfile(ownerScope: string, qualificationId: string): PetProfile {
  return petProfileSchema.parse({ petId: petIndividualId(ownerScope, qualificationId), qualificationId,
    name: "チワワ", growth: 0, bond: 0, questions: [], learningDays: [],
    unlockedStages: ["puppy"], selectedStage: "puppy", unlockedPaths: [], selectedPath: null });
}
/** Omit only version-1 optional defaults. Old full documents must not grow just
 * because a newer reader supplies in-memory policy metadata. No dedupe evidence
 * (events, rewarded cycles or timestamps) is discarded. */
export function compactPetProfileDocument(document: PetProfileDocument) {
  const { profiles, events, ...root } = document;
  return { ...root, profiles: profiles.map(profile => {
    const { questions, combo, memories, recentAnswers, care, roomEvents, ...base } = profile;
    return { ...base, questions: questions.map(question => {
      const { lastRewardedAt, lastIncorrectAt, independentCorrectAts, overcomeAt, rewardedReviewCycles, fieldId, independentlyCorrect, ...identity } = question;
      return { ...identity,
        ...(fieldId === null ? {} : { fieldId }), ...(independentlyCorrect ? { independentlyCorrect } : {}),
        ...(lastRewardedAt === null ? {} : { lastRewardedAt }),
        ...(lastIncorrectAt === null ? {} : { lastIncorrectAt }),
        ...(independentCorrectAts.length === 0 ? {} : { independentCorrectAts }),
        ...(overcomeAt === null ? {} : { overcomeAt }),
        ...(rewardedReviewCycles.length === 0 ? {} : { rewardedReviewCycles }),
      };
    }), ...(combo === null ? {} : { combo }), ...(memories.length === 0 ? {} : { memories }),
    ...(recentAnswers.length ? { recentAnswers } : {}), ...(roomEvents.length ? { roomEvents } : {}),
    ...(care.autoFeed && care.meals.length === 0 ? {} : { care }) };
  }), ...(events.length === 0 ? {} : { events: events.map(event => {
    const { reviewBefore, fieldId, ...fact } = event;
    return { ...fact, ...(reviewBefore === null ? {} : { reviewBefore }), ...(fieldId === null ? {} : { fieldId }) };
  }) }) };
}
export function serializePetProfileDocument(document: PetProfileDocument): string {
  return JSON.stringify(compactPetProfileDocument(document));
}
/** UTF-8 byte bound, shared by local parsing and manual imports. */
export function parsePetProfileDocument(raw: string): PetProfileDocument {
  if (new TextEncoder().encode(raw).length > PET_DOCUMENT_MAX_BYTES) throw new Error("pet_document_too_large");
  const document = petProfileDocumentSchema.parse(JSON.parse(raw));
  assertPetDocumentFits(document);
  return document;
}
/** Capacity is independent of the current revision's digit width. Otherwise
 * restoring a full backup into revision 9 would overflow when it becomes 10. */
export function assertPetDocumentFits(document: PetProfileDocument) {
  const reserved = serializePetProfileDocument({ ...document, revision: Number.MAX_SAFE_INTEGER });
  if (new TextEncoder().encode(reserved).length > PET_DOCUMENT_MAX_BYTES) throw new Error("pet_document_too_large");
}
