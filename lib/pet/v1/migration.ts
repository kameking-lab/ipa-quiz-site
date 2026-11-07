import { z } from "zod";
import { LS_KEYS } from "@/lib/storage/keys";
import { parseLegacyPetAnswer } from "../reward-identity";
import { canonicalPetQualification, newPetProfile, petProfileDocumentSchema, petTimestampSchema, petQuestionSchema } from "./profile";
import type { PetProfileDocument } from "./profile";

const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
// Preserve the exact source text, including newer/unknown fields. Only read
// evidence we understand; never use aggregate balances to invent per-exam XP.
const legacySchema = z.object({ version: z.literal(1), ownership: z.literal("device-guest"),
  answers: z.array(z.string().min(1).max(1000)), food: count, meals: count,
  outfit: z.enum(["none", "bandana"]),
  handoff: z.object({ sealedAnswers: count }).passthrough().optional(),
  rewardPolicy: z.object({ entries: z.array(z.object({ state: z.string() }).passthrough()) }).passthrough().optional(),
}).passthrough().refine(doc => new Set(doc.answers).size === doc.answers.length && doc.food + doc.meals <= doc.answers.length);

/** Explicit, one-time migration. This never writes/deletes the legacy key. */
export function migrateLegacyPetProfiles(document: PetProfileDocument, raw: string | null, now: number): PetProfileDocument {
  const next = petProfileDocumentSchema.parse(document);
  if (next.legacyMigration || raw === null) return next;
  // The legacy document explicitly belongs to the device guest. A member cannot
  // implicitly import it just because they happen to be signed in.
  if (next.ownerScope !== "guest") throw new Error("pet_legacy_guest_only");
  const old = legacySchema.parse(JSON.parse(raw));
  petTimestampSchema.parse(now);
  const ambiguousHandoff = (old.handoff?.sealedAnswers ?? 0) > 0 ||
    old.rewardPolicy?.entries.some(entry => entry.state !== "active");
  let unassignedAnswers = 0;
  for (const answer of old.answers) {
    const parsed = parseLegacyPetAnswer(answer);
    const qualification = parsed && canonicalPetQualification(parsed.exam);
    if (!parsed || !qualification || ambiguousHandoff) { unassignedAnswers++; continue; }
    let profile = next.profiles.find(item => item.qualificationId === qualification);
    if (!profile) { profile = newPetProfile(next.ownerScope, qualification); next.profiles.push(profile); }
    if (!profile.questions.some(q => q.questionId === parsed.questionId))
      profile.questions.push(petQuestionSchema.parse({ questionId: parsed.questionId, legacy: true, firstRewarded: true }));
  }
  next.legacyMigration = { sourceKey: LS_KEYS.petLearning, raw, migratedAt: now,
    unassignedAnswers, food: old.food, meals: old.meals, outfit: old.outfit };
  // Names, growth, bond, grades, dates and paths are deliberately not inferred.
  return petProfileDocumentSchema.parse(next);
}
