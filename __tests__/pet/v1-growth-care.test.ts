import { describe, expect, it } from "vitest";
import { applyPetLearningFact, PET_REVIEW_INTERVAL_MS as DAY } from "@/lib/pet/v1/learning";
import { emptyPetProfiles, petLearningFactSchema, petProfileStorageKey, serializePetProfileDocument, parsePetProfileDocument } from "@/lib/pet/v1/profile";
import { applyPetCare } from "@/lib/pet/v1/care";
import { PetProfileStore } from "@/lib/pet/v1/profile-store";
import { migrateLegacyPetProfiles } from "@/lib/pet/v1/migration";
import { petGrowthProgress, petNextStageProgress } from "@/lib/pet/v1/growth";

const at = Date.parse("2026-11-05T12:00:00+09:00"), zone = "Asia/Tokyo";
const empty = () => emptyPetProfiles("guest", zone);
function fact(question = "q1", day = 0, patch: Record<string, unknown> = {}) {
  return petLearningFactSchema.parse({ eventId: `${question}-${day}`, ownerScope: "guest", qualificationId: "ap", canonicalQuestionId: question,
    contentVersion: "v1", sessionId: `s-${day}`, attemptKind: "answer", grade: "correct", reviewCycleId: null, occurredAt: at + day * DAY, policyVersion: 1, ...patch });
}
function learn(count: number, patch: Record<string, unknown> = {}) {
  let doc = empty(); for (let i = 0; i < count; i++) doc = applyPetLearningFact(doc, fact(`q${i}`, 0, patch)).document; return doc;
}
describe("P07 growth and four reversible paths", () => {
  it("quietly unlocks partner at five useful unique answers, with one memory; does not switch a chosen appearance", () => {
    let doc = learn(4); expect(doc.profiles[0].unlockedStages).toEqual(["puppy"]);
    doc = applyPetLearningFact(doc, fact("q4", 0, { grade: "incorrect" })).document;
    expect(doc.profiles[0].unlockedStages).toEqual(["puppy", "partner"]); expect(doc.profiles[0].selectedStage).toBe("puppy");
    doc = applyPetLearningFact(doc, fact("q4", 0, { eventId: "retry" })).document;
    expect(doc.profiles[0].memories.filter(memory => memory.kind === "stage")).toHaveLength(1);
    applyPetCare(doc, "ap", { type: "stage", stage: "partner" }, at); applyPetCare(doc, "ap", { type: "stage", stage: "puppy" }, at);
    expect(doc.profiles[0].selectedStage).toBe("puppy"); expect(doc.profiles[0].unlockedStages).not.toContain("expert");
  });
  it("does not infer stage, grades, fields or daily treats from migrated legacy answers", () => {
    const doc = migrateLegacyPetProfiles(empty(), JSON.stringify({ version: 1, ownership: "device-guest", answers: Array.from({ length: 6 }, (_, i) => JSON.stringify(["ap", `q${i}`])), food: 4, meals: 1, outfit: "none" }), at);
    expect(petGrowthProgress(doc.profiles[0])).toMatchObject({ uniqueQuestions: 0, fields: 0, learningDays: 0 });
    expect(doc.profiles[0].care.meals).toEqual([]); expect(doc.legacyMigration?.food).toBe(4);
    expect(doc.profiles[0].unlockedStages).toEqual(["puppy"]);
  });
  it("only counts explicit categories on independently correct useful answers for exploration", () => {
    let doc = empty();
    for (let i = 0; i < 3; i++) doc = applyPetLearningFact(doc, fact(`q${i}`, 0, { fieldId: `f${i}` })).document;
    expect(doc.profiles[0].unlockedPaths).toContain("exploration");
    const locked = learn(5, { grade: "incorrect", fieldId: "f" }); expect(locked.profiles[0].unlockedPaths).toEqual([]);
    expect(petGrowthProgress(learn(5).profiles[0]).fields).toBe(0);
    applyPetCare(doc, "ap", { type: "path", path: "exploration" }, at); applyPetCare(doc, "ap", { type: "path", path: null }, at);
    expect(doc.profiles[0].selectedPath).toBeNull(); expect(doc.profiles[0].unlockedPaths).toContain("exploration");
  });
  it("unlocks the expert look only after 30 questions, 5 learning days and 5 spaced correct answers", () => {
    let doc = learn(30);
    expect(petNextStageProgress(doc.profiles[0])?.stage).toBe("expert");
    for (const day of [2, 4, 6, 8]) doc = applyPetLearningFact(doc, fact("q0", day)).document;
    expect(doc.profiles[0].unlockedStages).not.toContain("expert");
    expect(petNextStageProgress(doc.profiles[0])?.parts.map(part => part.now)).toEqual([30, 5, 4]);
    doc = applyPetLearningFact(doc, fact("q0", 10)).document;
    expect(doc.profiles[0].unlockedStages).toEqual(["puppy", "partner", "expert"]);
    expect(doc.profiles[0].selectedStage).toBe("puppy");
    expect(doc.profiles[0].memories.filter(memory => memory.kind === "stage").map(memory => memory.kind === "stage" && memory.stage)).toEqual(["partner", "expert"]);
    expect(petNextStageProgress(doc.profiles[0])).toBeNull();
    applyPetCare(doc, "ap", { type: "stage", stage: "expert" }, at); expect(doc.profiles[0].selectedStage).toBe("expert");
    const raw = serializePetProfileDocument(doc); expect(serializePetProfileDocument(parsePetProfileDocument(raw))).toBe(raw);
  });
  it("opens memory and companionship without an error history or consecutive study days", () => {
    let doc = learn(1);
    for (const day of [2, 4, 6, 8]) doc = applyPetLearningFact(doc, fact("q0", day)).document;
    expect(doc.profiles[0].unlockedPaths).toEqual(expect.arrayContaining(["memory", "companionship"]));
    expect(doc.profiles[0].memories.filter(memory => memory.kind === "overcome")).toEqual([]);
    const before = serializePetProfileDocument(doc); parsePetProfileDocument(before); expect(serializePetProfileDocument(doc)).toBe(before);
  });
  it("opens precision via 20 distinct recent questions or five distinct delayed correct questions", () => {
    let doc = empty();
    for (let i = 0; i < 20; i++) doc = applyPetLearningFact(doc, fact(`q${i}`, 0, { grade: i < 4 ? "incorrect" : "correct" })).document;
    expect(doc.profiles[0].unlockedPaths).toContain("precision");
    let alternate = learn(5, { grade: "incorrect" });
    for (let i = 0; i < 5; i++) alternate = applyPetLearningFact(alternate, fact(`q${i}`, 2)).document;
    expect(alternate.profiles[0].unlockedPaths).toContain("precision");
    const one = applyPetLearningFact(learn(1), fact("q0", 2)).document;
    expect(one.profiles[0].unlockedPaths).not.toContain("precision");
  });
  it("reveals and immediate new-event retries cannot open paths, stage or meals", () => {
    let doc = empty();
    for (let i = 0; i < 6; i++) doc = applyPetLearningFact(doc, fact(`q${i}`, 0, { attemptKind: "revealed", grade: "ungraded", fieldId: `f${i}` })).document;
    expect(doc.profiles[0]).toMatchObject({ growth: 0, unlockedStages: ["puppy"], unlockedPaths: [], care: { meals: [] } });
    doc = learn(1);
    for (let i = 0; i < 25; i++) doc = applyPetLearningFact(doc, fact("q0", 0, { eventId: `retry-${i}`, fieldId: `f${i}` })).document;
    expect(doc.profiles[0].recentAnswers).toHaveLength(1); expect(doc.profiles[0].care.meals).toHaveLength(1);
  });
});
describe("P07 optional care and owner-locked meal consumption", () => {
  it("allocates independent nested care defaults for each new owner/qualification", () => {
    const first = learn(1);
    const second = applyPetLearningFact(first, fact("t1", 0, { qualificationId: "takken", attemptKind: "revealed", grade: "ungraded" })).document;
    expect(second.profiles.find(profile => profile.qualificationId === "takken")?.care.meals).toEqual([]);
    expect(learn(1).profiles[0].care.meals).toHaveLength(1);
    expect(empty().profiles).toEqual([]);
  });
  it("auto-feeds one treat per learning day, no growth or bond from care, and never shares with another qualification", () => {
    const doc = learn(3), profile = doc.profiles[0];
    expect(profile.care.meals).toEqual([{ rewardId: "2026-11-05", earnedAt: at, consumedAt: at }]);
    const original = [profile.growth, profile.bond];
    applyPetCare(doc, "ap", { type: "name", name: "  こむぎ  " }, at);
    applyPetCare(doc, "ap", { type: "feed", rewardId: "2026-11-05" }, at + 1000);
    expect(profile.name).toBe("こむぎ"); expect([profile.growth, profile.bond]).toEqual(original);
    expect(() => applyPetCare(doc, "takken", { type: "feed", rewardId: "2026-11-05" }, at)).toThrow();
    expect(() => applyPetCare(doc, "ap", { type: "path", path: "memory" }, at)).toThrow();
    expect(() => applyPetCare(doc, "ap", { type: "stage", stage: "partner" }, at)).toThrow();
  });
  it("eats forgotten treats on next useful learning day, without a lost-reward penalty", () => {
    let doc = learn(1); applyPetCare(doc, "ap", { type: "autoFeed", enabled: false }, at);
    doc = applyPetLearningFact(doc, fact("q2", 1)).document;
    expect(doc.profiles[0].care.meals.at(-1)?.consumedAt).toBeNull();
    doc = applyPetLearningFact(doc, fact("q3", 4)).document;
    expect(doc.profiles[0].care.meals[1].consumedAt).toBe(at + 4 * DAY);
    expect(doc.profiles[0].care.meals.at(-1)?.consumedAt).toBeNull();
    expect(doc.profiles[0].growth).toBe(9);
  });
  it("concurrent feeding consumes the same earned reward once, including revision and backup round-trip", async () => {
    const data = new Map<string, string>(); let tail = Promise.resolve(), writes = 0;
    const store = new PetProfileStore({ now: () => at, storage: { getItem: key => data.get(key) ?? null, setItem: (key, raw) => { writes++; data.set(key, raw); } }, exclusive: { run: async (_key, work) => {
      const prior = tail; let release!: () => void; tail = new Promise<void>(resolve => { release = resolve; }); await prior; try { return await work(); } finally { release(); }
    } } });
    let doc = learn(1); applyPetCare(doc, "ap", { type: "autoFeed", enabled: false }, at);
    doc = applyPetLearningFact(doc, fact("q2", 1)).document; data.set(petProfileStorageKey("guest"), serializePetProfileDocument(doc));
    const owner = { ownerScope: "guest", isCurrent: () => true };
    await Promise.all([1, 2].map(() => store.update(owner, zone, current => applyPetCare(current, "ap", { type: "feed", rewardId: "2026-11-06" }, at + DAY + 1000))));
    expect(writes).toBe(1);
    const backup = await store.exportBackup(owner, zone); expect(backup).not.toBeNull();
    expect(await store.restoreBackup(owner, zone, backup!, 1)).toMatchObject({ status: "ready", document: { profiles: [{ growth: 6, care: { meals: [{ consumedAt: at }, { consumedAt: at + DAY + 1000 }] } }] } });
  });
});
