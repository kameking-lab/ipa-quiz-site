import { z } from "zod";
import { compactPetProfileDocument, petIndividualId, petProfileDocumentSchema, petProfileSchema, petTimestampSchema } from "./profile";
import type { PetProfile, PetProfileDocument } from "./profile";
import { advancePetGrowth, PET_PATHS } from "./growth";

/**
 * Cloud copy of a signed-in member's chihuahuas.
 *
 * The server keeps one envelope per account. It is the member's profile
 * document without device-only state (answer ledger, legacy source text, combo
 * session) plus merge metadata:
 *
 * - growth/bond are grow-only counters with one slot per browser. Merging takes
 *   the larger value of each slot and the total is their sum, so re-applying the
 *   same copy (a retry, a lost response, two tabs) never counts growth twice and
 *   growth on two devices at once adds up instead of one side winning.
 * - name / selected stage / selected path / auto-feed are last-writer-wins by
 *   the time this browser first noticed the local change.
 * - questions, study days, unlocked stages/paths, memories and treats are
 *   unions, so nothing earned on either device is rolled back.
 */
export const PET_CLOUD_FORMAT = "kakomon-pet-cloud";
export const PET_DEFAULT_NAME = "チワワ";
/** UTF-8 bytes of a serialized envelope; well above any real study history. */
export const PET_CLOUD_MAX_BYTES = 2 * 1024 * 1024;
export const PET_CLOUD_MAX_DEVICES = 200;
export const petCloudDeviceIdSchema = z.string().regex(/^[A-Za-z0-9_-]{8,64}$/);
const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const counters = z.record(petCloudDeviceIdSchema, count.positive())
  .refine(value => Object.keys(value).length <= PET_CLOUD_MAX_DEVICES);
export const petCloudProfileMetaSchema = z.object({
  growth: counters, bond: counters,
  nameAt: petTimestampSchema, stageAt: petTimestampSchema, pathAt: petTimestampSchema, autoFeedAt: petTimestampSchema,
}).strict();
export type PetCloudProfileMeta = z.infer<typeof petCloudProfileMetaSchema>;
export const petCloudEnvelopeSchema = z.object({
  format: z.literal(PET_CLOUD_FORMAT), version: z.literal(1),
  document: petProfileDocumentSchema, meta: z.record(z.string().min(1).max(64), petCloudProfileMetaSchema),
}).strict().refine(envelope => {
  const ids = envelope.document.profiles.map(profile => profile.qualificationId);
  const keys = Object.keys(envelope.meta);
  return keys.length === ids.length && ids.every(id => Object.prototype.hasOwnProperty.call(envelope.meta, id));
});
export type PetCloudEnvelope = z.infer<typeof petCloudEnvelopeSchema>;

/** What this browser remembers about the last server copy it merged. */
export const petCloudStateSchema = z.object({
  version: count, hash: z.string().max(64), timeZone: z.string().max(100).nullable(),
  meta: z.record(z.string().min(1).max(64), petCloudProfileMetaSchema),
  values: z.record(z.string().min(1).max(64), z.object({
    name: z.string().max(64), stage: z.string().max(32), path: z.string().max(32).nullable(), autoFeed: z.boolean(),
  }).strict()),
}).strict();
export type PetCloudState = z.infer<typeof petCloudStateSchema>;
export function emptyPetCloudState(): PetCloudState {
  return { version: 0, hash: "", timeZone: null, meta: {}, values: {} };
}

type Question = PetProfile["questions"][number];
const STAGES = ["puppy", "partner", "expert"] as const;
const DAY_MS = 86_400_000;
const emptyMeta = (): PetCloudProfileMeta => ({ growth: {}, bond: {}, nameAt: 0, stageAt: 0, pathAt: 0, autoFeedAt: 0 });
const sum = (value: Record<string, number>) => Object.values(value).reduce((total, item) => total + item, 0);
const maxNullable = (a: number | null, b: number | null) => a === null ? b : b === null ? a : Math.max(a, b);
const minNullable = (a: number | null, b: number | null) => a === null ? b : b === null ? a : Math.min(a, b);
const byKey = <T>(key: (item: T) => string) => (a: T, b: T) => key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0;
function memoryKey(memory: PetProfile["memories"][number]) {
  return memory.kind === "overcome" ? `overcome:${memory.questionId}` : memory.kind === "stage" ? `stage:${memory.stage}` : `path:${memory.path}`;
}
function spaced(times: number[]) {
  const out: number[] = [];
  for (const time of [...new Set(times)].sort((a, b) => a - b)) if (out.length === 0 || time - out[out.length - 1] >= DAY_MS) out.push(time);
  return out;
}
function lastActivity(profile: PetProfile) {
  return profile.questions.reduce((latest, question) => Math.max(latest, question.lastRewardedAt ?? 0), 0);
}
export function isDefaultPetName(name: string) { return name.trim() === PET_DEFAULT_NAME; }
export function hasPetProgress(profile: PetProfile) {
  return profile.growth > 0 || profile.questions.length > 0 || profile.learningDays.length > 0 ||
    profile.memories.length > 0 || !isDefaultPetName(profile.name);
}

/** Canonical order so equal content always serializes (and hashes) the same. */
function canonicalProfile(profile: PetProfile, ownerScope: string): PetProfile {
  return petProfileSchema.parse({
    ...profile, petId: petIndividualId(ownerScope, profile.qualificationId), combo: null,
    questions: [...profile.questions].sort(byKey(question => question.questionId)).map(question => ({
      ...question, independentCorrectAts: [...question.independentCorrectAts].sort((a, b) => a - b),
      rewardedReviewCycles: [...question.rewardedReviewCycles].sort(),
    })),
    learningDays: [...profile.learningDays].sort(),
    unlockedStages: STAGES.filter(stage => profile.unlockedStages.includes(stage)),
    unlockedPaths: PET_PATHS.filter(path => profile.unlockedPaths.includes(path)),
    roomEvents: [...profile.roomEvents].sort((a, b) => a.occurredAt - b.occurredAt || (a.scene < b.scene ? -1 : 1)),
    care: { ...profile.care, meals: [...profile.care.meals].sort(byKey(meal => meal.rewardId)) },
    memories: [...profile.memories].sort((a, b) => a.occurredAt - b.occurredAt || (memoryKey(a) < memoryKey(b) ? -1 : 1)),
  });
}
/** Device-only state removed; the member's ownerScope is kept for petId checks. */
export function petCloudDocument(local: PetProfileDocument, timeZone = local.timeZone): PetProfileDocument {
  return petProfileDocumentSchema.parse({
    version: local.version, ownerScope: local.ownerScope, timeZone, revision: 0, events: [], legacyMigration: null,
    profiles: [...local.profiles].sort(byKey(profile => profile.qualificationId)).map(profile => canonicalProfile(profile, local.ownerScope)),
  });
}
function canonicalMeta(meta: PetCloudProfileMeta): PetCloudProfileMeta {
  const sorted = (value: Record<string, number>) => Object.fromEntries(Object.entries(value).filter(([, item]) => item > 0).sort(byKey(([key]) => key)));
  return { growth: sorted(meta.growth), bond: sorted(meta.bond), nameAt: meta.nameAt, stageAt: meta.stageAt, pathAt: meta.pathAt, autoFeedAt: meta.autoFeedAt };
}
export function serializePetCloudEnvelope(envelope: PetCloudEnvelope): string {
  const document = petCloudDocument(envelope.document);
  const meta = Object.fromEntries(document.profiles.map(profile => [profile.qualificationId, canonicalMeta(envelope.meta[profile.qualificationId] ?? emptyMeta())]));
  return JSON.stringify({ format: PET_CLOUD_FORMAT, version: 1, document: compactPetProfileDocument(document), meta });
}
export function parsePetCloudEnvelope(raw: unknown): PetCloudEnvelope {
  return petCloudEnvelopeSchema.parse(raw);
}
/** Two independent FNV-1a lanes; only used to notice "unchanged since sync". */
export function petCloudHash(envelope: PetCloudEnvelope): string {
  const text = serializePetCloudEnvelope(envelope);
  let a = 0x811c9dc5, b = 0x01000193 ^ text.length;
  for (let index = 0; index < text.length; index++) {
    const code = text.charCodeAt(index);
    a = Math.imul(a ^ code, 0x01000193) >>> 0;
    b = Math.imul(b ^ code, 0x5bd1e995) >>> 0;
  }
  return a.toString(16).padStart(8, "0") + b.toString(16).padStart(8, "0") + text.length.toString(16);
}

/**
 * The local document as a cloud envelope. This browser's counter slot holds
 * whatever growth is not explained by other devices' known slots; a lower
 * local value (e.g. an old backup restored) never lowers a slot. A changed
 * preference gets `now` as its time only the first time it is noticed; the
 * caller persists that via {@link notePetCloudLocalChanges}.
 */
export function localPetCloudEnvelope(local: PetProfileDocument, state: PetCloudState, deviceId: string, now: number): PetCloudEnvelope {
  petCloudDeviceIdSchema.parse(deviceId);
  const noted = notePetCloudLocalChanges(local, state, now);
  const meta: Record<string, PetCloudProfileMeta> = {};
  for (const profile of local.profiles) {
    const known = noted.meta[profile.qualificationId] ?? emptyMeta();
    const slot = (field: "growth" | "bond") => {
      const values = { ...known[field] };
      const others = sum(values) - (values[deviceId] ?? 0);
      const own = Math.max(values[deviceId] ?? 0, profile[field] - others);
      if (own > 0) values[deviceId] = own; else delete values[deviceId];
      return values;
    };
    meta[profile.qualificationId] = canonicalMeta({ ...known, growth: slot("growth"), bond: slot("bond") });
  }
  const document = petCloudDocument(local, state.timeZone ?? local.timeZone);
  const profiles = document.profiles.map(profile => ({ ...profile, growth: sum(meta[profile.qualificationId].growth),
    bond: Math.max(profile.bond, Math.min(sum(meta[profile.qualificationId].bond), profile.learningDays.length)) }));
  return petCloudEnvelopeSchema.parse({ format: PET_CLOUD_FORMAT, version: 1, document: { ...document, profiles }, meta });
}
/** Record the first time each local preference change was seen. Pure. */
export function notePetCloudLocalChanges(local: PetProfileDocument, state: PetCloudState, now: number): PetCloudState {
  const next: PetCloudState = structuredClone(state);
  for (const profile of local.profiles) {
    const id = profile.qualificationId, seen = next.values[id];
    const meta = next.meta[id] ?? emptyMeta();
    if (seen) {
      if (seen.name !== profile.name) meta.nameAt = Math.max(now, meta.nameAt + 1);
      if (seen.stage !== profile.selectedStage) meta.stageAt = Math.max(now, meta.stageAt + 1);
      if (seen.path !== profile.selectedPath) meta.pathAt = Math.max(now, meta.pathAt + 1);
      if (seen.autoFeed !== profile.care.autoFeed) meta.autoFeedAt = Math.max(now, meta.autoFeedAt + 1);
    }
    next.meta[id] = meta;
    next.values[id] = { name: profile.name, stage: profile.selectedStage, path: profile.selectedPath, autoFeed: profile.care.autoFeed };
  }
  return next;
}

function mergeQuestion(a: Question, b: Question): Question {
  const newer = (b.lastRewardedAt ?? -1) > (a.lastRewardedAt ?? -1) ? b : a, older = newer === a ? b : a;
  return {
    questionId: a.questionId, legacy: a.legacy && b.legacy, firstRewarded: a.firstRewarded || b.firstRewarded,
    fieldId: newer.fieldId ?? older.fieldId, independentlyCorrect: a.independentlyCorrect || b.independentlyCorrect,
    lastRewardedAt: maxNullable(a.lastRewardedAt, b.lastRewardedAt), lastIncorrectAt: maxNullable(a.lastIncorrectAt, b.lastIncorrectAt),
    independentCorrectAts: spaced([...a.independentCorrectAts, ...b.independentCorrectAts]),
    overcomeAt: minNullable(a.overcomeAt, b.overcomeAt),
    rewardedReviewCycles: [...new Set([...a.rewardedReviewCycles, ...b.rewardedReviewCycles])].sort(),
  };
}
/** Later time wins; equal times prefer a chosen name, then a stable order. */
function lastWriter<T>(a: { value: T; at: number }, b: { value: T; at: number }, named?: (value: T) => boolean): { value: T; at: number } {
  if (a.at !== b.at) return a.at > b.at ? a : b;
  if (named && named(a.value) !== named(b.value)) return named(a.value) ? a : b;
  return JSON.stringify(a.value) >= JSON.stringify(b.value) ? a : b;
}
function mergeCounters(a: Record<string, number>, b: Record<string, number>) {
  const out: Record<string, number> = { ...a };
  for (const [key, value] of Object.entries(b)) out[key] = Math.max(out[key] ?? 0, value);
  return out;
}
function mergeProfile(ownerScope: string, local: PetProfile, localMeta: PetCloudProfileMeta,
  remote: PetProfile, remoteMeta: PetCloudProfileMeta): { profile: PetProfile; meta: PetCloudProfileMeta } {
  const questions = new Map<string, Question>();
  for (const question of [...local.questions, ...remote.questions]) {
    const existing = questions.get(question.questionId);
    questions.set(question.questionId, existing ? mergeQuestion(existing, question) : question);
  }
  const learningDays = [...new Set([...local.learningDays, ...remote.learningDays])].sort();
  const growthCounters = mergeCounters(localMeta.growth, remoteMeta.growth);
  const bondCounters = mergeCounters(localMeta.bond, remoteMeta.bond);
  const name = lastWriter({ value: local.name, at: localMeta.nameAt }, { value: remote.name, at: remoteMeta.nameAt }, value => !isDefaultPetName(value));
  const unlockedStages = STAGES.filter(stage => local.unlockedStages.includes(stage) || remote.unlockedStages.includes(stage));
  const unlockedPaths = PET_PATHS.filter(path => local.unlockedPaths.includes(path) || remote.unlockedPaths.includes(path));
  const stage = lastWriter({ value: local.selectedStage, at: localMeta.stageAt }, { value: remote.selectedStage, at: remoteMeta.stageAt });
  const path = lastWriter({ value: local.selectedPath, at: localMeta.pathAt }, { value: remote.selectedPath, at: remoteMeta.pathAt });
  const autoFeed = lastWriter({ value: local.care.autoFeed, at: localMeta.autoFeedAt }, { value: remote.care.autoFeed, at: remoteMeta.autoFeedAt });
  const meals = new Map<string, PetProfile["care"]["meals"][number]>();
  for (const meal of [...local.care.meals, ...remote.care.meals]) {
    const existing = meals.get(meal.rewardId);
    meals.set(meal.rewardId, existing ? { rewardId: meal.rewardId, earnedAt: Math.min(existing.earnedAt, meal.earnedAt),
      consumedAt: minNullable(existing.consumedAt, meal.consumedAt) } : meal);
  }
  const memories = new Map<string, PetProfile["memories"][number]>();
  for (const memory of [...local.memories, ...remote.memories]) {
    const existing = memories.get(memoryKey(memory));
    if (!existing || memory.occurredAt < existing.occurredAt) memories.set(memoryKey(memory), memory);
  }
  const roomEvents: PetProfile["roomEvents"] = [];
  for (const event of [...local.roomEvents, ...remote.roomEvents].sort((a, b) => a.occurredAt - b.occurredAt || (a.scene < b.scene ? -1 : 1)))
    if (!roomEvents.some(item => item.scene === event.scene || item.day === event.day)) roomEvents.push(event);
  const growth = Math.max(sum(growthCounters), local.growth, remote.growth);
  const profile: PetProfile = {
    petId: petIndividualId(ownerScope, local.qualificationId), qualificationId: local.qualificationId,
    name: name.value, growth,
    bond: Math.max(local.bond, remote.bond, Math.min(sum(bondCounters), learningDays.length)),
    questions: [...questions.values()], learningDays,
    unlockedStages, selectedStage: unlockedStages.includes(stage.value) ? stage.value : local.selectedStage,
    unlockedPaths, selectedPath: path.value === null || unlockedPaths.includes(path.value) ? path.value : local.selectedPath,
    roomEvents: roomEvents.slice(0, 6),
    recentAnswers: lastActivity(local) > lastActivity(remote) ? local.recentAnswers : remote.recentAnswers,
    care: { autoFeed: autoFeed.value, meals: [...meals.values()] },
    combo: local.combo, memories: [...memories.values()],
  };
  // Union may cross a threshold neither side reached alone (e.g. 3 + 3 distinct
  // questions). Time it at the latest rewarded answer, never "now".
  advancePetGrowth(profile, lastActivity(profile));
  const meta: PetCloudProfileMeta = { growth: growthCounters, bond: bondCounters,
    nameAt: name.at, stageAt: stage.at, pathAt: path.at, autoFeedAt: autoFeed.at };
  return { profile: petProfileSchema.parse(profile), meta: canonicalMeta(meta) };
}

/** Commutative merge of two envelopes of the same account. The result keeps
 * `remote`'s time zone so devices in different zones do not ping-pong. */
export function mergePetCloudEnvelopes(local: PetCloudEnvelope, remote: PetCloudEnvelope): PetCloudEnvelope {
  const ownerScope = remote.document.ownerScope;
  if (local.document.ownerScope !== ownerScope) throw new Error("pet_cloud_owner_mismatch");
  const ids = [...new Set([...local.document.profiles, ...remote.document.profiles].map(profile => profile.qualificationId))].sort();
  const profiles: PetProfile[] = [], meta: Record<string, PetCloudProfileMeta> = {};
  for (const id of ids) {
    const l = local.document.profiles.find(profile => profile.qualificationId === id);
    const r = remote.document.profiles.find(profile => profile.qualificationId === id);
    if (l && r) {
      const merged = mergeProfile(ownerScope, l, local.meta[id] ?? emptyMeta(), r, remote.meta[id] ?? emptyMeta());
      profiles.push(merged.profile); meta[id] = merged.meta;
    } else {
      const only = (l ?? r)!;
      profiles.push(only); meta[id] = canonicalMeta((l ? local.meta[id] : remote.meta[id]) ?? emptyMeta());
    }
  }
  const document = petCloudDocument({ ...remote.document, profiles });
  return petCloudEnvelopeSchema.parse({ format: PET_CLOUD_FORMAT, version: 1, document, meta });
}

/** Write merged profiles back into the device document, keeping device-only
 * state: answer ledger, legacy record, time zone and the current combo. */
export function applyPetCloudEnvelope(local: PetProfileDocument, merged: PetCloudEnvelope): PetProfileDocument {
  if (merged.document.ownerScope !== local.ownerScope) throw new Error("pet_cloud_owner_mismatch");
  const profiles = merged.document.profiles.map(profile => {
    const mine = local.profiles.find(item => item.qualificationId === profile.qualificationId);
    return { ...profile, petId: petIndividualId(local.ownerScope, profile.qualificationId), combo: mine?.combo ?? null };
  });
  const next = petProfileDocumentSchema.parse({ ...local, profiles });
  // Keep the stored bytes when nothing changed, so no needless write happens.
  return JSON.stringify(petCloudDocument(next)) === JSON.stringify(petCloudDocument(local)) ? local : next;
}

/** The state to remember after merging or pushing `server` at `version`. */
export function petCloudStateFor(server: PetCloudEnvelope, version: number): PetCloudState {
  return {
    version, hash: petCloudHash(server), timeZone: server.document.timeZone,
    meta: Object.fromEntries(Object.entries(server.meta).map(([id, meta]) => [id, canonicalMeta(meta)])),
    values: Object.fromEntries(server.document.profiles.map(profile => [profile.qualificationId,
      { name: profile.name, stage: profile.selectedStage, path: profile.selectedPath, autoFeed: profile.care.autoFeed }])),
  };
}

/**
 * Sign-in handoff of the device guest's chihuahuas into the account document.
 * Per qualification: if the account has none, the guest's comes over as is;
 * if both exist, the further-grown one is kept (growth, then distinct
 * questions; ties keep the account's). The name is the account's when it has
 * chosen one, otherwise the guest's. Study days and unlocked stages/paths are
 * unions so that nothing shown before is lost.
 */
export function handoffPetGuest(account: PetProfileDocument, guest: PetProfileDocument): { document: PetProfileDocument; moved: string[] } {
  const next = petProfileDocumentSchema.parse(account);
  const moved: string[] = [];
  for (const source of guest.profiles) {
    if (!hasPetProgress(source)) continue;
    const id = source.qualificationId;
    const index = next.profiles.findIndex(profile => profile.qualificationId === id);
    const incoming: PetProfile = { ...structuredClone(source), petId: petIndividualId(next.ownerScope, id), combo: null };
    moved.push(id);
    if (index < 0) { next.profiles.push(incoming); continue; }
    const current = next.profiles[index];
    const guestAhead = source.growth > current.growth || (source.growth === current.growth && source.questions.length > current.questions.length);
    const winner = guestAhead ? incoming : current;
    const unlockedStages = STAGES.filter(stage => current.unlockedStages.includes(stage) || source.unlockedStages.includes(stage));
    const unlockedPaths = PET_PATHS.filter(path => current.unlockedPaths.includes(path) || source.unlockedPaths.includes(path));
    const learningDays = [...new Set([...current.learningDays, ...source.learningDays])].sort();
    next.profiles[index] = {
      ...winner, petId: petIndividualId(next.ownerScope, id),
      name: isDefaultPetName(current.name) ? source.name : current.name,
      bond: Math.max(current.bond, source.bond), learningDays, unlockedStages, unlockedPaths,
      combo: guestAhead ? null : current.combo,
    };
  }
  return { document: petProfileDocumentSchema.parse(next), moved };
}
