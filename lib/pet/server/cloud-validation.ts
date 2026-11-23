import { isPetLearningDay } from "../v1/profile";
import type { PetProfile } from "../v1/profile";
import { PET_CLOUD_MAX_BYTES, petCloudEnvelopeSchema, serializePetCloudEnvelope } from "../v1/cloud-merge";
import type { PetCloudEnvelope } from "../v1/cloud-merge";

/**
 * Minimum tamper resistance for the cloud copy. The pet is decoration only
 * (never payment, ranking or quota authority), so the aim is to refuse
 * malformed, impossible or rolled-back copies, not to prove every answer.
 */
export const PET_CLOUD_LIMITS = {
  profiles: 100,
  questionsPerProfile: 20_000,
  /** New question entries accepted in one update, across all profiles. */
  newQuestionsPerUpdate: 5_000,
  newProfilesPerUpdate: 50,
  /** Growth a single update may add to one qualification. */
  growthPerUpdate: 25_000,
  /** Clock skew allowed for device timestamps. */
  futureMs: 36 * 60 * 60 * 1000,
} as const;
export type PetCloudRejection =
  | "invalid_document" | "owner_mismatch" | "too_large" | "device_state" | "too_many" | "future_time"
  | "implausible_growth" | "implausible_bond" | "rollback" | "increase_too_large";
export type PetCloudCheck = { ok: true; envelope: PetCloudEnvelope; serialized: string } | { ok: false; reason: PetCloudRejection };

const total = (value: Record<string, number>) => Object.values(value).reduce((sum, item) => sum + item, 0);
const DAY_MS = 86_400_000;
function utcDay(time: number) { return new Date(time).toISOString().slice(0, 10); }
/** Every reward (at most 5 growth) leaves a trace on a question; repeated
 * wrong answers to the same question (at most one reward a day) are covered by
 * the per-day slack. Traces count double because the same question rewarded on
 * two devices before they first synced is one trace but two rewards. */
export function petGrowthCeiling(profile: PetProfile) {
  let rewards = 0;
  for (const question of profile.questions)
    rewards += (question.lastRewardedAt === null ? 0 : 1) + question.independentCorrectAts.length + question.rewardedReviewCycles.length;
  return 10 * rewards + 50 * profile.learningDays.length + 100;
}
function times(profile: PetProfile): number[] {
  const out: number[] = [];
  for (const question of profile.questions) {
    for (const value of [question.lastRewardedAt, question.lastIncorrectAt, question.overcomeAt]) if (value !== null) out.push(value);
    out.push(...question.independentCorrectAts);
  }
  for (const meal of profile.care.meals) { out.push(meal.earnedAt); if (meal.consumedAt !== null) out.push(meal.consumedAt); }
  for (const memory of profile.memories) out.push(memory.occurredAt);
  for (const event of profile.roomEvents) out.push(event.occurredAt);
  return out;
}
const CONTROL = new RegExp("[\u0000-\u001f\u007f-\u009f\u2028\u2029]");

/** Validate `raw` as the account's next copy, given the stored `current` one. */
export function checkPetCloudUpdate(raw: unknown, userId: string, current: PetCloudEnvelope | null, now: number): PetCloudCheck {
  const parsed = petCloudEnvelopeSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, reason: "invalid_document" };
  const envelope = parsed.data, document = envelope.document;
  if (document.ownerScope !== `user:${userId}`) return { ok: false, reason: "owner_mismatch" };
  // The cloud copy never carries device-only state.
  if (document.events.length > 0 || document.legacyMigration !== null) return { ok: false, reason: "device_state" };
  if (document.profiles.length > PET_CLOUD_LIMITS.profiles) return { ok: false, reason: "too_many" };
  const serialized = serializePetCloudEnvelope(envelope);
  if (new TextEncoder().encode(serialized).length > PET_CLOUD_MAX_BYTES) return { ok: false, reason: "too_large" };
  const latest = now + PET_CLOUD_LIMITS.futureMs, latestDay = utcDay(latest + DAY_MS);
  let newQuestions = 0, newProfiles = 0;
  for (const profile of document.profiles) {
    const meta = envelope.meta[profile.qualificationId];
    if (profile.questions.length > PET_CLOUD_LIMITS.questionsPerProfile) return { ok: false, reason: "too_many" };
    if (CONTROL.test(profile.name)) return { ok: false, reason: "invalid_document" };
    if (profile.combo !== null) return { ok: false, reason: "device_state" };
    if (profile.learningDays.some(day => !isPetLearningDay(day) || day > latestDay)) return { ok: false, reason: "future_time" };
    if (times(profile).some(time => time > latest) ||
      [meta.nameAt, meta.stageAt, meta.pathAt, meta.autoFeedAt].some(time => time > latest)) return { ok: false, reason: "future_time" };
    if (profile.growth !== total(meta.growth) || profile.growth > petGrowthCeiling(profile)) return { ok: false, reason: "implausible_growth" };
    if (profile.bond > profile.learningDays.length || profile.bond > total(meta.bond)) return { ok: false, reason: "implausible_bond" };
    const before = current?.document.profiles.find(item => item.qualificationId === profile.qualificationId);
    if (!before) { newProfiles++; newQuestions += profile.questions.length; continue; }
    if (profile.growth - before.growth > PET_CLOUD_LIMITS.growthPerUpdate) return { ok: false, reason: "increase_too_large" };
    const known = new Set(before.questions.map(question => question.questionId));
    newQuestions += profile.questions.filter(question => !known.has(question.questionId)).length;
  }
  if (newQuestions > PET_CLOUD_LIMITS.newQuestionsPerUpdate || newProfiles > PET_CLOUD_LIMITS.newProfilesPerUpdate)
    return { ok: false, reason: "increase_too_large" };
  // No rollback: every qualification, growth slot, bond and unlocked stage stays.
  for (const before of current?.document.profiles ?? []) {
    const after = document.profiles.find(item => item.qualificationId === before.qualificationId);
    const beforeMeta = current!.meta[before.qualificationId], afterMeta = after ? envelope.meta[before.qualificationId] : null;
    if (!after || !afterMeta || after.growth < before.growth || after.bond < before.bond ||
      before.unlockedStages.some(stage => !after.unlockedStages.includes(stage)) ||
      Object.entries(beforeMeta.growth).some(([device, value]) => (afterMeta.growth[device] ?? 0) < value) ||
      Object.entries(beforeMeta.bond).some(([device, value]) => (afterMeta.bond[device] ?? 0) < value))
      return { ok: false, reason: "rollback" };
  }
  return { ok: true, envelope, serialized };
}
