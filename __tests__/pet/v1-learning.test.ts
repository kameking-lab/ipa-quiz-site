import { describe, expect, it } from "vitest";
import { applyPetLearningFact, petLearningDay } from "@/lib/pet/v1/learning";
import { emptyPetProfiles, petProfileDocumentSchema, petProfileStorageKey, PET_DOCUMENT_MAX_BYTES, serializePetProfileDocument } from "@/lib/pet/v1/profile";
import { LS_KEYS } from "@/lib/storage/keys";
import type { PetLearningFact } from "@/lib/pet/v1/profile";
import { migrateLegacyPetProfiles } from "@/lib/pet/v1/migration";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";

const zone = "Asia/Tokyo", at = Date.parse("2026-11-05T23:59:00+09:00");
function fact(patch: Partial<PetLearningFact> = {}): PetLearningFact {
  return { eventId: "event-1", ownerScope: "guest", qualificationId: "ap", canonicalQuestionId: "ap-q1",
    contentVersion: "v1", sessionId: "session-1", attemptKind: "answer", grade: "correct",
    reviewCycleId: null, reviewBefore: null, fieldId: null, occurredAt: at, policyVersion: 1, ...patch };
}
const fresh = () => emptyPetProfiles("guest", zone);

describe("P03 explicit first-answer rewards", () => {
  it("grants base 2 plus correct 1; incorrect remains a positive learning step", () => {
    for (const grade of ["correct", "incorrect"] as const) {
      const doc = fresh(), before = JSON.stringify(doc);
      const result = applyPetLearningFact(doc, fact({ grade }));
      expect(result).toMatchObject({ outcome: "applied", reward: { growth: grade === "correct" ? 3 : 2, bond: 1 }, reaction: grade });
      expect(result.document.profiles[0]).toMatchObject({ growth: grade === "correct" ? 3 : 2, bond: 1,
        learningDays: ["2026-11-05"], questions: [{ questionId: "ap-q1", firstRewarded: true }] });
      expect(JSON.stringify(doc)).toBe(before);
    }
  });
  it("deduplicates resends without replaying a reaction and rejects changed payloads reusing an ID", () => {
    const first = applyPetLearningFact(fresh(), fact());
    const before = JSON.stringify(first.document);
    expect(applyPetLearningFact(first.document, fact())).toMatchObject({ outcome: "duplicate", reward: { growth: 0, bond: 0 }, reaction: null });
    expect(applyPetLearningFact(first.document, fact({ grade: "incorrect" }))).toMatchObject({ outcome: "event_conflict", reaction: null });
    expect(JSON.stringify(first.document)).toBe(before);
  });
  it("does not reissue a first reward for new event IDs, sessions or content versions", () => {
    let doc = applyPetLearningFact(fresh(), fact()).document;
    for (let i = 0; i < 10; i++) {
      const result = applyPetLearningFact(doc, fact({ eventId: `retry-${i}`, contentVersion: `updated-${i}`, sessionId: `session-${i + 2}` }));
      expect(result.reward).toEqual({ growth: 0, bond: 0 }); doc = result.document;
    }
    expect(doc.profiles[0].growth).toBe(3); expect(doc.profiles[0].questions).toHaveLength(1);
  });
  it("credits one active qualification and never spreads a shared question to other children", () => {
    let doc = applyPetLearningFact(fresh(), fact({ canonicalQuestionId: "shared-q1" })).document;
    expect(doc.profiles).toHaveLength(1);
    doc = applyPetLearningFact(doc, fact({ eventId: "takken-1", qualificationId: "takken", canonicalQuestionId: "shared-q1", grade: "incorrect" })).document;
    expect(doc.profiles.map(p => [p.qualificationId, p.growth])).toEqual([["ap", 3], ["takken", 2]]);
  });
  it("uses the saved local day and grants bond once for each qualification/day", () => {
    let doc = fresh();
    for (const [eventId, canonicalQuestionId, qualificationId, occurredAt] of [
      ["1", "q1", "ap", at], ["2", "q2", "ap", at], ["3", "q1", "takken", at],
      ["4", "q3", "ap", at + 120_000],
    ] as const) doc = applyPetLearningFact(doc, fact({ eventId, canonicalQuestionId, qualificationId, occurredAt })).document;
    expect(doc.profiles[0]).toMatchObject({ bond: 2, learningDays: ["2026-11-05", "2026-11-06"] });
    expect(doc.profiles[1].bond).toBe(1);
    expect(petLearningDay(at + 120_000, "UTC")).toBe("2026-11-05");
    expect(petLearningDay(at + 120_000, zone)).toBe("2026-11-06");
  });
});

describe("P03 revealed-answer and restore boundaries", () => {
  it("reveals no reward or learned question; a same-session reanswer stays a reading reaction", () => {
    const reveal = applyPetLearningFact(fresh(), fact({ attemptKind: "revealed", grade: "ungraded" }));
    expect(reveal).toMatchObject({ reward: { growth: 0, bond: 0 }, reaction: "read" });
    expect(reveal.document.profiles[0].questions).toEqual([]);
    const after = applyPetLearningFact(reveal.document, fact({ eventId: "answer-after-reveal" }));
    expect(after).toMatchObject({ reward: { growth: 0, bond: 0 }, reaction: "read" });
    expect(after.document.profiles[0].questions).toEqual([]);
    const independent = applyPetLearningFact(after.document, fact({ eventId: "next-session", sessionId: "session-2", occurredAt: at + 86_400_000 }));
    expect(independent.reward.growth).toBe(3);
  });
  it("does not let reveals contaminate a different question or exam", () => {
    const reveal = applyPetLearningFact(fresh(), fact({ attemptKind: "revealed", grade: "ungraded" })).document;
    for (const patch of [{ canonicalQuestionId: "q2" }, { qualificationId: "takken" }])
      expect(applyPetLearningFact(reveal, fact({ eventId: "new", ...patch })).reward.growth).toBe(3);
  });
  it("does not grant legacy first answers again and leaves unknown legacy evidence intact", () => {
    const raw = JSON.stringify({ version: 1, ownership: "device-guest", answers: [JSON.stringify(["AP", "ap-q1"]), "unknown"], food: 1, meals: 0, outfit: "none" });
    const doc = migrateLegacyPetProfiles(fresh(), raw, at);
    const result = applyPetLearningFact(doc, fact());
    expect(result.reward).toEqual({ growth: 0, bond: 0 }); expect(result.document.legacyMigration?.raw).toBe(raw);
  });
  it("refuses invalid grades, unknown versions, aliases, owner mismatch and oversized identities", () => {
    const doc = fresh();
    for (const event of [fact({ attemptKind: "revealed", grade: "correct" }), fact({ grade: "ungraded" }),
      { ...fact(), policyVersion: 2 }, { ...fact(), qualificationId: "AP" }, { ...fact(), eventId: "x".repeat(129) },
      { ...fact(), occurredAt: Infinity }, { ...fact(), unexpected: "AI answer text" }])
      expect(applyPetLearningFact(doc, event).outcome).toBe("invalid_event");
    expect(applyPetLearningFact(doc, fact({ ownerScope: "user:a" })).outcome).toBe("owner_mismatch");
    expect(doc).toEqual(fresh());
  });
  it("validates the timezone-local date at the upper timestamp boundary, including reveals", () => {
    const maximum = 253_402_300_799_999;
    for (const reveal of [false, true]) {
      const input = fact({ occurredAt: maximum, ...(reveal ? { attemptKind: "revealed", grade: "ungraded" } : {}) });
      expect(applyPetLearningFact(emptyPetProfiles("guest", "UTC"), input).outcome).toBe("applied");
      for (const timeZone of ["Asia/Tokyo", "Pacific/Kiritimati"])
        expect(applyPetLearningFact(emptyPetProfiles("guest", timeZone), input).outcome).toBe("invalid_event");
      expect(applyPetLearningFact(emptyPetProfiles("guest", "Asia/Tokyo"), { ...input, occurredAt: maximum - 9 * 3_600_000 }).outcome).toBe("applied");
    }
  });
  it("retains the dedupe ledger across manual backup, and a failed write can be retried once", async () => {
    const data = new Map<string, string>(); let deny = true;
    const store = new PetProfileStore({ now: () => at,
      storage: { getItem: key => data.get(key) ?? null, setItem: (key, value) => { if (deny) throw new Error("quota"); data.set(key, value); } },
      exclusive: { run: async (_key, work) => work() } });
    const owner = { ownerScope: "guest", isCurrent: () => true };
    const submit = () => store.update(owner, zone, doc => applyPetLearningFact(doc, fact()).document);
    expect((await submit()).status).toBe("storage_error"); expect(data.size).toBe(0);
    deny = false; expect((await submit()).status).toBe("ready");
    const reveal = fact({ eventId: "revealed-1", canonicalQuestionId: "q2", attemptKind: "revealed", grade: "ungraded" });
    await store.update(owner, zone, doc => applyPetLearningFact(doc, reveal).document);
    const raw = (await store.exportBackup(owner, zone))!;
    const restored = petProfileDocumentSchema.parse(JSON.parse(raw).document);
    expect(applyPetLearningFact(restored, fact()).outcome).toBe("duplicate");
    expect((await submit()).status).toBe("ready");
    expect(await store.load(owner, zone)).toMatchObject({ document: { revision: 2, profiles: [{ growth: 3, bond: 1 }] } });
    const destinationData = new Map<string, string>(); let destinationWrites = 0;
    const destination = new PetProfileStore({ now: () => at,
      storage: { getItem: key => destinationData.get(key) ?? null, setItem: (key, value) => { destinationWrites++; destinationData.set(key, value); } },
      exclusive: { run: async (_key, work) => work() } });
    expect((await destination.restoreBackup(owner, zone, raw, 0)).status).toBe("ready");
    const loaded = await destination.load(owner, zone);
    if (loaded.status !== "ready") throw new Error(loaded.status);
    for (const event of [fact(), reveal]) {
      expect(applyPetLearningFact(loaded.document, event)).toMatchObject({ outcome: "duplicate", reaction: null });
      await destination.update(owner, zone, doc => applyPetLearningFact(doc, event).document);
    }
    expect(destinationWrites).toBe(1);
    expect(await destination.load(owner, zone)).toMatchObject({ document: { revision: 1, profiles: [{ growth: 3, bond: 1 }] } });
  });
  it("preserves persisted progress and all old event identities when an append exceeds capacity", async () => {
    const full = applyPetLearningFact(fresh(), fact()).document;
    full.legacyMigration = { sourceKey: LS_KEYS.petLearning, raw: "", migratedAt: at, unassignedAnswers: 0, food: 0, meals: 0, outfit: "none" };
    const overhead = new TextEncoder().encode(serializePetProfileDocument({ ...full, revision: Number.MAX_SAFE_INTEGER })).length;
    full.legacyMigration.raw = "x".repeat(PET_DOCUMENT_MAX_BYTES - overhead);
    let persisted = serializePetProfileDocument(full);
    const before = persisted;
    const store = new PetProfileStore({ now: () => at,
      storage: { getItem: key => key === petProfileStorageKey("guest") ? persisted : null, setItem: (_key, value) => { persisted = value; } },
      exclusive: { run: async (_key, work) => work() } });
    const owner = { ownerScope: "guest", isCurrent: () => true };
    expect((await store.update(owner, zone, doc => applyPetLearningFact(doc, fact({ eventId: "capacity-held", canonicalQuestionId: "q2" })).document)).status).toBe("storage_error");
    expect(persisted).toBe(before);
    const loaded = await store.load(owner, zone);
    if (loaded.status !== "ready") throw new Error(loaded.status);
    expect(applyPetLearningFact(loaded.document, fact()).outcome).toBe("duplicate");
    expect(loaded.document.events).toHaveLength(1); expect(loaded.document.profiles[0].growth).toBe(3);
  });
});
