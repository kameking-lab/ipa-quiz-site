import { expect, it } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { PET_DOCUMENT_MAX_BYTES, emptyPetProfiles, petProfileStorageKey, petIndividualId } from "@/lib/pet/v1/profile";
import { applyPetLearningFact } from "@/lib/pet/v1/learning";

it("keeps a full P03-shaped document readable/exportable/restorable after P04 defaults, including revision 9 -> 10", async () => {
  const at = Date.parse("2026-11-05T12:00:00+09:00"), zone = "Asia/Tokyo";
  // Deliberately the committed P03 wire shape, not a current-schema fixture.
  const event = { eventId: "old-event", ownerScope: "guest", qualificationId: "ap", canonicalQuestionId: "q1",
    contentVersion: "v1", sessionId: "old-session", attemptKind: "answer", grade: "correct",
    reviewCycleId: null, occurredAt: at, policyVersion: 1 };
  const old = { version: 1, ownerScope: "guest", timeZone: zone, revision: 0,
    profiles: [{ petId: petIndividualId("guest", "ap"), qualificationId: "ap", name: "チワワ", growth: 3, bond: 1,
      questions: [{ questionId: "q1", legacy: false, firstRewarded: true }], learningDays: ["2026-11-05"],
      unlockedStages: ["puppy"], selectedStage: "puppy", unlockedPaths: [], selectedPath: null }],
    events: [event], legacyMigration: { sourceKey: LS_KEYS.petLearning, raw: "", migratedAt: at,
      unassignedAnswers: 0, food: 0, meals: 0, outfit: "none" } };
  const overhead = new TextEncoder().encode(JSON.stringify({ ...old, revision: Number.MAX_SAFE_INTEGER })).length;
  old.legacyMigration.raw = "x".repeat(PET_DOCUMENT_MAX_BYTES - overhead);
  const sourceRaw = JSON.stringify(old);
  expect(new TextEncoder().encode(sourceRaw).length).toBe(PET_DOCUMENT_MAX_BYTES - 15);
  const owner = { ownerScope: "guest", isCurrent: () => true };
  const source = new PetProfileStore({ now: () => at,
    storage: { getItem: () => sourceRaw, setItem: () => { throw new Error("load/export must not write"); } },
    exclusive: { run: async (_key, work) => work() } });
  expect((await source.load(owner, zone)).status).toBe("ready");
  const backup = await source.exportBackup(owner, zone); expect(backup).not.toBeNull();
  let persisted = JSON.stringify({ ...emptyPetProfiles("guest", zone), revision: 9 }), writes = 0;
  const destination = new PetProfileStore({ now: () => at,
    storage: { getItem: key => key === petProfileStorageKey("guest") ? persisted : null,
      setItem: (_key, value) => { persisted = value; writes++; } }, exclusive: { run: async (_key, work) => work() } });
  expect(await destination.restoreBackup(owner, zone, backup!, 9)).toMatchObject({ status: "ready", document: { revision: 10 } });
  const loaded = await destination.load(owner, zone);
  if (loaded.status !== "ready") throw new Error(loaded.status);
  expect(loaded.document.profiles[0].questions[0].lastRewardedAt).toBeNull();
  expect(applyPetLearningFact(loaded.document, event)).toMatchObject({ outcome: "duplicate", reaction: null });
  await destination.update(owner, zone, doc => applyPetLearningFact(doc, event).document);
  expect(writes).toBe(1);
  expect((await destination.exportBackup(owner, zone))).not.toBeNull();
  expect(loaded.document.profiles[0].growth).toBe(3);
});
