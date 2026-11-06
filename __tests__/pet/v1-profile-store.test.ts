import { describe, expect, it } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { canonicalPetQualification, emptyPetProfiles, newPetProfile, petIndividualId, petProfileStorageKey, PET_DOCUMENT_MAX_BYTES, PET_BACKUP_MAX_BYTES, serializePetProfileDocument } from "@/lib/pet/v1/profile";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { migrateLegacyPetProfiles } from "@/lib/pet/v1/migration";

const zone = "Asia/Tokyo";
const guest = { ownerScope: "guest", isCurrent: () => true };
const member = (id: string) => ({ ownerScope: `user:${id}`, isCurrent: () => true });
const now = Date.parse("2026-11-05T23:59:00+09:00");
function fixture() {
  const data = new Map<string, string>();
  let writes = 0, failWrite = false;
  let tail = Promise.resolve();
  const store = new PetProfileStore({ now: () => now, storage: {
    getItem: key => data.get(key) ?? null,
    setItem: (key, value) => { if (failWrite) throw new Error("quota"); writes++; data.set(key, value); },
  }, exclusive: { run: async (_key, operation) => {
    const prior = tail; let release!: () => void;
    tail = new Promise<void>(resolve => { release = resolve; });
    await prior; try { return await operation(); } finally { release(); }
  } } });
  return { store, data, writes: () => writes, fail: () => { failWrite = true; } };
}
function legacy(answers = [JSON.stringify(["ap", "ap-q1"]), JSON.stringify(["takken", "takken-q1"])]) {
  return JSON.stringify({ version: 1, ownership: "device-guest", answers, food: 1, meals: 1,
    outfit: "bandana", days: {}, experience: { wardrobe: "ribbon" }, futureField: { preserved: true } });
}
function addProfile(doc: ReturnType<typeof emptyPetProfiles>) {
  doc.profiles.push(newPetProfile(doc.ownerScope, "ap")); return doc;
}

describe("P02 qualification/owner identity", () => {
  it("unifies explicit aliases and rejects years, subjects and unknown IDs", () => {
    for (const [value, code] of [["AP", "ap"], [" itpassport ", "ip"], ["fp-3kyu", "fp3"],
      ["doboku-sekou-2kyu", "civil2"], ["薬剤師", "yakuzaishi"], ["pharmacy", "yakuzaishi"]]) expect(canonicalPetQualification(value)).toBe(code);
    for (const value of ["ap-2026", "am", "https://example.test/ap", "__proto__", "constructor", "library:math"])
      expect(canonicalPetQualification(value)).toBeNull();
    expect(petIndividualId("guest", "ap")).not.toBe(petIndividualId("guest", "takken"));
    expect(petIndividualId("guest", "ap")).not.toBe(petIndividualId("user:a", "ap"));
    expect(petProfileStorageKey("user:a:b")).not.toBe(petProfileStorageKey("user:a%3Ab"));
  });
  it("load is read-only and retains the saved timezone after travel", async () => {
    const f = fixture(); expect((await f.store.load(guest, zone)).status).toBe("ready");
    expect(f.writes()).toBe(0);
    await f.store.update(guest, zone, addProfile);
    const restored = await f.store.load(guest, "UTC");
    expect(restored).toMatchObject({ status: "ready", document: { timeZone: zone } });
    expect(f.writes()).toBe(1);
  });
  it("retains guest and two member documents separately without adopting balances", async () => {
    const f = fixture();
    await f.store.update(guest, zone, addProfile);
    expect(await f.store.load(member("a"), zone)).toMatchObject({ document: { profiles: [] } });
    await f.store.update(member("a"), zone, doc => { addProfile(doc); doc.profiles[0].name = "あお"; return doc; });
    await f.store.update(member("b"), zone, doc => { addProfile(doc); doc.profiles[0].name = "そら"; return doc; });
    expect(await f.store.load(guest, zone)).toMatchObject({ document: { profiles: [{ name: "チワワ" }] } });
    expect(await f.store.load(member("a"), zone)).toMatchObject({ document: { profiles: [{ name: "あお" }] } });
    expect(await f.store.load(member("b"), zone)).toMatchObject({ document: { profiles: [{ name: "そら" }] } });
  });
});

describe("P02 non-destructive migration", () => {
  it("migrates only known question identities, never infers XP, grades, days or duplicated food", async () => {
    const f = fixture(), raw = legacy([JSON.stringify(["AP", "same"]), JSON.stringify(["ap", "same"]),
      JSON.stringify(["takken", "t1"]), JSON.stringify(["library:unknown", "q"]), "bad"]);
    f.data.set(LS_KEYS.petLearning, raw);
    const result = await f.store.migrateLegacy(guest, zone);
    expect(result.status).toBe("ready");
    if (result.status !== "ready") throw new Error(result.status);
    expect(result.document.profiles.map(p => [p.qualificationId, p.questions.length, p.growth, p.bond, p.learningDays]))
      .toEqual([["ap", 1, 0, 0, []], ["takken", 1, 0, 0, []]]);
    expect(result.document.legacyMigration).toMatchObject({ raw, food: 1, meals: 1, unassignedAnswers: 2 });
    expect(f.data.get(LS_KEYS.petLearning)).toBe(raw);
    const first = f.data.get(petProfileStorageKey("guest"));
    await f.store.migrateLegacy(guest, zone);
    expect(f.data.get(petProfileStorageKey("guest"))).toBe(first); expect(f.writes()).toBe(1);
  });
  it("does not import guest evidence into signed-in members", async () => {
    const f = fixture(), raw = legacy(); f.data.set(LS_KEYS.petLearning, raw);
    expect(await f.store.migrateLegacy(member("a"), zone)).toEqual({ status: "invalid_data" });
    expect(f.writes()).toBe(0); expect(f.data.get(LS_KEYS.petLearning)).toBe(raw);
  });
  it("keeps sealed/accepted account history unassigned instead of duplicating it into guest pets", () => {
    for (const metadata of [{ handoff: { sealedAnswers: 1 } }, { rewardPolicy: { entries: [{ state: "accepted" }] } }]) {
      const raw = JSON.stringify({ ...JSON.parse(legacy()), ...metadata });
      const next = migrateLegacyPetProfiles(emptyPetProfiles("guest", zone), raw, now);
      expect(next.profiles).toEqual([]); expect(next.legacyMigration?.unassignedAnswers).toBe(2);
      expect(next.legacyMigration?.raw).toBe(raw);
    }
  });
  it("does not destroy malformed or unsupported legacy source", async () => {
    for (const raw of ["{", JSON.stringify({ ...JSON.parse(legacy()), version: 99 }), "null"]) {
      const f = fixture(); f.data.set(LS_KEYS.petLearning, raw);
      expect((await f.store.migrateLegacy(guest, zone)).status).toBe("invalid_data");
      expect(f.data.get(LS_KEYS.petLearning)).toBe(raw); expect(f.writes()).toBe(0);
    }
  });
});

describe("P02 persistence, recovery and ownership races", () => {
  it("exports under the mutation lock with reviewed revision and in-lock ownership verification", async () => {
    const f = fixture(); await f.store.update(guest, zone, addProfile);
    const verified = { ...guest, verifyCurrent: async () => false };
    expect(await f.store.exportBackup(verified, zone, 1)).toBeNull();
    const change = f.store.update(guest, zone, doc => { doc.profiles[0].name = "別タブの学習"; return doc; });
    const stale = f.store.exportBackup(guest, zone, 1);
    await change; expect(await stale).toBeNull();
    const backup = await f.store.exportBackup(guest, zone, 2);
    expect(JSON.parse(backup!).document.profiles[0].name).toBe("別タブの学習");
  });
  it("never overwrites corrupt, future-version or wrong-owner documents", async () => {
    for (const raw of ["{", "null", JSON.stringify({ ...emptyPetProfiles("guest", zone), version: 99 }),
      JSON.stringify(emptyPetProfiles("user:a", zone))]) {
      const f = fixture(); f.data.set(petProfileStorageKey("guest"), raw);
      expect((await f.store.load(guest, zone)).status).toBe("storage_error");
      expect((await f.store.update(guest, zone, addProfile)).status).toBe("storage_error");
      expect(f.data.get(petProfileStorageKey("guest"))).toBe(raw); expect(f.writes()).toBe(0);
    }
  });
  it("rereads the latest revision under a lock and does not lose parallel mutations", async () => {
    const f = fixture(); await f.store.update(guest, zone, addProfile);
    await Promise.all(Array.from({ length: 5 }, () => f.store.update(guest, zone, doc => { doc.profiles[0].bond++; return doc; })));
    expect(await f.store.load(guest, zone)).toMatchObject({ document: { revision: 6, profiles: [{ bond: 5 }] } });
  });
  it("rejects a switch both before acquiring a lock and before writing", async () => {
    const f = fixture(); let active = true;
    const context = { ownerScope: "guest", isCurrent: () => active };
    expect(await f.store.update(context, zone, doc => { active = false; return addProfile(doc); })).toEqual({ status: "owner_changed" });
    expect(await f.store.update(context, zone, addProfile)).toEqual({ status: "owner_changed" }); expect(f.writes()).toBe(0);
  });
  it("keeps the last successful state on quota failure", async () => {
    const f = fixture(); await f.store.update(guest, zone, addProfile);
    const raw = f.data.get(petProfileStorageKey("guest")); f.fail();
    expect(await f.store.update(guest, zone, doc => { doc.profiles[0].name = "変更"; return doc; })).toEqual({ status: "storage_error" });
    expect(f.data.get(petProfileStorageKey("guest"))).toBe(raw);
  });
  it("round-trips manual backup, rejects owner substitution and stale consent", async () => {
    const f = fixture(); f.data.set(LS_KEYS.petLearning, legacy()); await f.store.migrateLegacy(guest, zone);
    const backup = (await f.store.exportBackup(guest, zone))!;
    expect(JSON.parse(backup).document.legacyMigration.raw).toBe(legacy());
    const destination = fixture();
    expect(await destination.store.restoreBackup(guest, zone, backup, 0)).toMatchObject({ status: "ready", document: { revision: 1 } });
    expect(await destination.store.restoreBackup(member("a"), zone, backup, 0)).toEqual({ status: "invalid_data" });
    await destination.store.update(guest, zone, doc => { doc.profiles[0].name = "ほし"; return doc; });
    const previous = destination.data.get(petProfileStorageKey("guest"));
    expect(await destination.store.restoreBackup(guest, zone, backup, 1)).toEqual({ status: "invalid_data" });
    expect(destination.data.get(petProfileStorageKey("guest"))).toBe(previous);
    for (const raw of ["null", "{", JSON.stringify({ ...JSON.parse(backup), extra: true }),
      JSON.stringify({ ...JSON.parse(backup), document: { ...JSON.parse(backup).document, version: 2 } })])
      expect((await destination.store.restoreBackup(guest, zone, raw, 2)).status).toBe("invalid_data");
  });
  it("validates unlocked selections, unique identities and bounds before persisting", async () => {
    const f = fixture();
    expect(await f.store.update(guest, zone, doc => { addProfile(doc); doc.profiles[0].selectedStage = "expert"; return doc; }))
      .toEqual({ status: "invalid_data" });
    expect(await f.store.update(guest, zone, doc => { addProfile(doc); doc.profiles.push(doc.profiles[0]); return doc; }))
      .toEqual({ status: "invalid_data" });
    expect(f.writes()).toBe(0);
  });
  it("round-trips the largest valid document and rejects oversized documents/envelopes", async () => {
    const doc = emptyPetProfiles("guest", zone);
    doc.legacyMigration = { sourceKey: LS_KEYS.petLearning, raw: "", migratedAt: now, unassignedAnswers: 0, food: 0, meals: 0, outfit: "none" };
    const overhead = new TextEncoder().encode(serializePetProfileDocument({ ...doc, revision: Number.MAX_SAFE_INTEGER })).length;
    doc.legacyMigration.raw = "x".repeat(PET_DOCUMENT_MAX_BYTES - overhead);
    const raw = serializePetProfileDocument(doc);
    expect(new TextEncoder().encode(raw).length).toBe(PET_DOCUMENT_MAX_BYTES - 15);
    const f = fixture(); f.data.set(petProfileStorageKey("guest"), raw);
    const backup = (await f.store.exportBackup(guest, zone))!;
    expect(new TextEncoder().encode(backup).length).toBeGreaterThan(PET_DOCUMENT_MAX_BYTES);
    expect((await fixture().store.restoreBackup(guest, zone, backup, 0)).status).toBe("ready");
    const ninth = fixture();
    ninth.data.set(petProfileStorageKey("guest"), JSON.stringify({ ...emptyPetProfiles("guest", zone), revision: 9 }));
    expect(await ninth.store.restoreBackup(guest, zone, backup, 9)).toMatchObject({ status: "ready", document: { revision: 10 } });
    const oversizeDoc = JSON.parse(backup); oversizeDoc.document.legacyMigration.raw += "x";
    expect((await fixture().store.restoreBackup(guest, zone, JSON.stringify(oversizeDoc), 0)).status).toBe("invalid_data");
    expect((await fixture().store.restoreBackup(guest, zone, backup.padEnd(PET_BACKUP_MAX_BYTES + 1, " "), 0)).status).toBe("invalid_data");
  });
  it("rejects nonexistent dates on restore without changing data; accepts calendar leap days", async () => {
    const f = fixture(); await f.store.update(guest, zone, addProfile);
    const raw = f.data.get(petProfileStorageKey("guest"));
    const backup = JSON.parse((await f.store.exportBackup(guest, zone))!);
    for (const day of ["2026-02-30", "2026-99-99", "2025-02-29", "1900-02-29", "0000-01-01"]) {
      backup.document.profiles[0].learningDays = [day];
      expect((await f.store.restoreBackup(guest, zone, JSON.stringify(backup), 1)).status).toBe("invalid_data");
      expect(f.data.get(petProfileStorageKey("guest"))).toBe(raw);
    }
    backup.document.profiles[0].learningDays = ["2024-02-29", "2000-02-29", "2026-11-05"];
    expect((await f.store.restoreBackup(guest, zone, JSON.stringify(backup), 1)).status).toBe("ready");
  });
});
