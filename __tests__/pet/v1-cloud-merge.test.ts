import { describe, expect, it } from "vitest";
import {
  applyPetCloudEnvelope, emptyPetCloudState, handoffPetGuest, localPetCloudEnvelope, mergePetCloudEnvelopes,
  petCloudHash, petCloudStateFor, serializePetCloudEnvelope,
} from "@/lib/pet/v1/cloud-merge";
import type { PetCloudEnvelope } from "@/lib/pet/v1/cloud-merge";
import { emptyPetProfiles, newPetProfile, petIndividualId } from "@/lib/pet/v1/profile";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import { answer, DAY, profileOf, studied, T0, ZONE } from "./cloud-fixtures";

const owner = "user:alice";
const A = "device-aaaaaaaa", B = "device-bbbbbbbb";

/** Device sync step: merge the server copy into the device document. */
function absorb(local: PetProfileDocument, state: ReturnType<typeof emptyPetCloudState>, device: string, server: PetCloudEnvelope, version: number, now = T0) {
  const merged = mergePetCloudEnvelopes(localPetCloudEnvelope(local, state, device, now), server);
  return { document: applyPetCloudEnvelope(local, merged), state: { ...petCloudStateFor(server, version), meta: merged.meta, values: petCloudStateFor(merged, version).values }, merged };
}

describe("cloud merge (same account, several devices)", () => {
  it("adds growth earned on two devices at once and keeps every question", () => {
    // Both devices start from the same synced copy (growth 6 from two questions).
    const start = studied(owner, "ap", ["q1", "q2"]);
    const server0 = localPetCloudEnvelope(start, emptyPetCloudState(), A, T0);
    const state0 = petCloudStateFor(server0, 1);
    const onA = answer(start, "ap", "q3", T0 + 10_000); // +3
    const onB = answer(answer(start, "ap", "q4", T0 + 20_000), "ap", "q5", T0 + 30_000); // +6
    // A pushes first; B merges A's copy and pushes; A then pulls B's copy.
    const serverA = localPetCloudEnvelope(onA, state0, A, T0);
    const b = absorb(onB, state0, B, serverA, 2);
    expect(profileOf(b.document, "ap").growth).toBe(6 + 3 + 6);
    const serverB = localPetCloudEnvelope(b.document, b.state, B, T0);
    const a = absorb(onA, petCloudStateFor(serverA, 2), A, serverB, 3);
    expect(profileOf(a.document, "ap").growth).toBe(15);
    expect(profileOf(a.document, "ap").questions.map(q => q.questionId).sort()).toEqual(["q1", "q2", "q3", "q4", "q5"]);
    // Five distinct questions across devices reach the partner stage.
    expect(profileOf(a.document, "ap").unlockedStages).toContain("partner");
    // Both devices now hold the same cloud content: nothing more to send.
    expect(petCloudHash(localPetCloudEnvelope(a.document, a.state, A, T0))).toBe(petCloudHash(serverB));
  });

  it("never counts the same server copy twice (retries, lost responses, tabs)", () => {
    const start = studied(owner, "ap", ["q1"]);
    const synced = petCloudStateFor(localPetCloudEnvelope(start, emptyPetCloudState(), A, T0), 1);
    const server = localPetCloudEnvelope(answer(start, "ap", "q2", T0 + 5000), synced, B, T0);
    let local = start, state = synced;
    for (let index = 0; index < 3; index++) ({ document: local, state } = absorb(local, state, A, server, 1));
    expect(profileOf(local, "ap").growth).toBe(6);
  });

  it("never lowers growth, even when an older backup is restored on one device", () => {
    const grown = studied(owner, "ap", ["q1", "q2", "q3"]);
    const server = localPetCloudEnvelope(grown, emptyPetCloudState(), A, T0);
    const state = petCloudStateFor(server, 1);
    const restoredOld = studied(owner, "ap", ["q1"]);
    const result = absorb(restoredOld, state, A, server, 1);
    expect(profileOf(result.document, "ap").growth).toBe(9);
    expect(profileOf(result.document, "ap").questions).toHaveLength(3);
  });

  it("is commutative and idempotent", () => {
    const left = localPetCloudEnvelope(studied(owner, "ap", ["q1", "q2"]), emptyPetCloudState(), A, T0);
    const right = localPetCloudEnvelope(studied(owner, "ap", ["q2", "q9"], T0 + DAY), emptyPetCloudState(), B, T0);
    const lr = mergePetCloudEnvelopes(left, right), rl = mergePetCloudEnvelopes(right, left);
    expect(serializePetCloudEnvelope(lr)).toBe(serializePetCloudEnvelope(rl));
    expect(serializePetCloudEnvelope(mergePetCloudEnvelopes(lr, right))).toBe(serializePetCloudEnvelope(lr));
    expect(profileOf(lr.document, "ap").learningDays).toHaveLength(2);
    expect(profileOf(lr.document, "ap").bond).toBe(2);
  });

  it("takes the later rename and does not let an untouched device undo it", () => {
    const start = studied(owner, "ap", ["q1"]);
    const server0 = localPetCloudEnvelope(start, emptyPetCloudState(), A, T0);
    const state0 = petCloudStateFor(server0, 1);
    const renamed = structuredClone(start); profileOf(renamed, "ap").name = "ポチ";
    const serverB = localPetCloudEnvelope(renamed, state0, B, T0 + 60_000);
    // A never touched the name: B's rename wins on A.
    const onA = absorb(answer(start, "ap", "q2", T0 + 70_000), state0, A, serverB, 2, T0 + 80_000);
    expect(profileOf(onA.document, "ap").name).toBe("ポチ");
    // A later rename on A wins over B's older one.
    const renamedOnA = structuredClone(onA.document); profileOf(renamedOnA, "ap").name = "ハナ";
    const pushedA = localPetCloudEnvelope(renamedOnA, onA.state, A, T0 + 90_000);
    const onB = absorb(renamed, petCloudStateFor(serverB, 2), B, pushedA, 3, T0 + 100_000);
    expect(profileOf(onB.document, "ap").name).toBe("ハナ");
  });

  it("keeps device-only state (answer ledger, time zone, combo) on the device", () => {
    const local = studied(owner, "ap", ["q1", "q2"]);
    const remote = studied(owner, "takken", ["t1"]);
    const merged = mergePetCloudEnvelopes(localPetCloudEnvelope(local, emptyPetCloudState(), A, T0),
      localPetCloudEnvelope({ ...remote, timeZone: "UTC" }, emptyPetCloudState(), B, T0));
    expect(merged.document.events).toEqual([]);
    const applied = applyPetCloudEnvelope(local, merged);
    expect(applied.events).toEqual(local.events);
    expect(applied.timeZone).toBe(ZONE);
    expect(profileOf(applied, "ap").combo).toEqual(profileOf(local, "ap").combo);
    expect(applied.profiles.map(p => p.qualificationId)).toEqual(["ap", "takken"]);
  });
});

describe("sign-in handoff of the device guest", () => {
  it("moves the guest's chihuahua as is when the account has none", () => {
    const guest = studied("guest", "ap", ["q1", "q2"]);
    profileOf(guest, "ap").name = "ゲストの子";
    const { document, moved } = handoffPetGuest(emptyPetProfiles(owner, ZONE), guest);
    expect(moved).toEqual(["ap"]);
    expect(profileOf(document, "ap")).toMatchObject({ growth: 6, name: "ゲストの子", petId: petIndividualId(owner, "ap") });
  });
  it("keeps the further-grown chihuahua per qualification and the account's chosen name", () => {
    const account = studied(owner, "ap", ["a1"]);
    profileOf(account, "ap").name = "アカウントの子";
    account.profiles.push(newPetProfile(owner, "takken"));
    let guest = studied("guest", "ap", ["g1", "g2", "g3"]);
    guest = answer(guest, "takken", "t1", T0 + 9000);
    profileOf(guest, "takken").name = "たっけん";
    const { document } = handoffPetGuest(account, guest);
    expect(profileOf(document, "ap")).toMatchObject({ growth: 9, name: "アカウントの子" });
    expect(profileOf(document, "ap").questions.map(q => q.questionId)).toEqual(["g1", "g2", "g3"]);
    // Account had only the default name for takken, so the guest's name comes over.
    expect(profileOf(document, "takken")).toMatchObject({ growth: 3, name: "たっけん" });
  });
  it("keeps the account's chihuahua when it is further grown, and is idempotent", () => {
    const account = studied(owner, "ap", ["a1", "a2", "a3"]);
    const guest = studied("guest", "ap", ["g1"]);
    const once = handoffPetGuest(account, guest).document;
    expect(profileOf(once, "ap").growth).toBe(9);
    expect(profileOf(once, "ap").questions.map(q => q.questionId)).toEqual(["a1", "a2", "a3"]);
    expect(handoffPetGuest(once, guest).document).toEqual(once);
  });
  it("ignores empty guest profiles", () => {
    const guest = emptyPetProfiles("guest", ZONE); guest.profiles.push(newPetProfile("guest", "ap"));
    expect(handoffPetGuest(emptyPetProfiles(owner, ZONE), guest).moved).toEqual([]);
  });
});
