import { afterEach, describe, expect, it, vi } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { PetCloudSync, PET_CLOUD_DEBOUNCE_MS } from "@/lib/pet/v1/cloud-sync";
import { petCloudDocument } from "@/lib/pet/v1/cloud-merge";
import { emptyPetProfiles, petProfileStorageKey } from "@/lib/pet/v1/profile";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import { getPetCloudProfile, putPetCloudProfile } from "@/lib/pet/server/cloud-profile";
import { answer, deviceStore, memoryRepository, ORIGIN, profileOf, sameOriginInit, serialExclusive, serverDeps, T0, ZONE } from "./cloud-fixtures";

const repo = memoryRepository();
let clock = T0;
const server = serverDeps(repo, () => null, () => clock);

function device(name: string) {
  const { storage, store } = deviceStore(undefined, () => clock);
  let session: string | null = null, online = true;
  const requests: string[] = [];
  const published: PetProfileDocument[] = [];
  const fetchFake = (async (input: RequestInfo | URL, init?: RequestInit) => {
    if (!online) throw new TypeError("Failed to fetch");
    const request = new Request(new URL(String(input), ORIGIN), sameOriginInit(init));
    requests.push(request.method);
    const deps = { ...server, userId: async () => session };
    return request.method === "PUT" ? putPetCloudProfile(request, deps) : getPetCloudProfile(request, deps);
  }) as typeof fetch;
  const sync = new PetCloudSync({
    fetch: fetchFake, storage, store, exclusive: serialExclusive(),
    prepareOwner: async isCurrent => isCurrent() ? { ownerScope: session ? `user:${session}` : "guest", isCurrent: () => true, revalidate: async () => true } : null,
    now: () => clock, timeZone: () => ZONE, publish: document => { published.push(document); }, randomId: () => `${name}-0000-device`,
  });
  const owner = (scope: string) => ({ ownerScope: scope, isCurrent: () => true });
  return {
    sync, storage, store, requests, published,
    signIn(user: string) { session = user; },
    setOnline(value: boolean) { online = value; },
    async study(scope: string, qualification: string, question: string, at = clock) {
      const result = await store.update(owner(scope), ZONE, document => answer(document, qualification, question, at));
      if (result.status !== "ready") throw new Error(result.status);
      return result.document;
    },
    async rename(scope: string, qualification: string, name: string) {
      await store.update(owner(scope), ZONE, document => { profileOf(document, qualification).name = name; return document; });
    },
    async doc(scope: string) {
      const loaded = await store.load(owner(scope), ZONE);
      if (loaded.status !== "ready") throw new Error(loaded.status);
      return loaded.document;
    },
  };
}
const cloudView = (document: PetProfileDocument) => JSON.stringify(petCloudDocument(document));

afterEach(() => { vi.useRealTimers(); repo.rows.clear(); repo.writes = 0; clock = T0; });

describe("chihuahua cloud save between devices", () => {
  it("guest study → sign-in → another new browser signs in → same chihuahua", async () => {
    const phone = device("phone");
    await phone.study("guest", "ap", "q1", T0);
    await phone.study("guest", "ap", "q2", T0 + 1000);
    await phone.rename("guest", "ap", "ポチ");
    phone.signIn("alice");
    expect(await phone.sync.start()).toBe(true);
    expect(await phone.sync.syncNow(false)).toBe("synced");
    expect(repo.rows.get("alice")?.version).toBe(1);
    const mine = await phone.doc("user:alice");
    expect(profileOf(mine, "ap")).toMatchObject({ growth: 6, name: "ポチ" });
    // The guest copy is emptied once the account has it (the legacy record stays).
    expect((await phone.doc("guest")).profiles).toEqual([]);

    const pc = device("pc");
    pc.signIn("alice");
    expect(await pc.sync.start()).toBe(true);
    expect(await pc.sync.syncNow(false)).toBe("synced");
    expect(cloudView(await pc.doc("user:alice"))).toBe(cloudView(mine));
    expect(pc.published.length).toBeGreaterThan(0);
    // Nothing new: no further writes from either device.
    expect(await pc.sync.syncNow(true)).toBe("synced");
    expect(repo.writes).toBe(1);
  });

  it("two devices studying at once add up, and a rename travels", async () => {
    const phone = device("phone"), pc = device("pc");
    phone.signIn("alice"); pc.signIn("alice");
    await phone.study("user:alice", "ap", "q1");
    await phone.sync.start(); await phone.sync.syncNow(false);
    await pc.sync.start(); await pc.sync.syncNow(false);
    await phone.study("user:alice", "ap", "q2", T0 + 10_000);
    await pc.study("user:alice", "ap", "q3", T0 + 20_000);
    await pc.study("user:alice", "ap", "q4", T0 + 30_000);
    clock = T0 + 60_000;
    await pc.rename("user:alice", "ap", "ハナ");
    expect(await phone.sync.syncNow(false)).toBe("pushed");
    expect(await pc.sync.syncNow(false)).toBe("pushed"); // conflict → merge → push
    expect(await phone.sync.syncNow(true)).toBe("synced");
    const a = await phone.doc("user:alice"), b = await pc.doc("user:alice");
    expect(profileOf(a, "ap")).toMatchObject({ growth: 12, name: "ハナ" });
    expect(cloudView(a)).toBe(cloudView(b));
  });

  it("keeps offline study on the device and sends it when back online", async () => {
    const phone = device("phone");
    phone.signIn("alice");
    await phone.study("user:alice", "ap", "q1");
    await phone.sync.start(); await phone.sync.syncNow(false);
    phone.setOnline(false);
    await phone.study("user:alice", "ap", "q2", T0 + 5000);
    expect(await phone.sync.syncNow(false)).toBe("offline");
    expect(profileOf(await phone.doc("user:alice"), "ap").growth).toBe(6);
    phone.setOnline(true);
    expect(await phone.sync.syncNow(false)).toBe("pushed");
    const stored = repo.rows.get("alice")!.document as { document: { profiles: { growth: number }[] } };
    expect(stored.document.profiles[0].growth).toBe(6);
  });

  it("hands over only the further-grown chihuahua when the account already has one", async () => {
    const pc = device("pc");
    pc.signIn("alice");
    for (const [index, question] of ["a1", "a2", "a3"].entries()) await pc.study("user:alice", "ap", question, T0 + index);
    await pc.sync.start(); await pc.sync.syncNow(false);
    const phone = device("phone");
    await phone.study("guest", "ap", "g1");
    phone.signIn("alice");
    await phone.sync.start(); await phone.sync.syncNow(false);
    const merged = profileOf(await phone.doc("user:alice"), "ap");
    expect(merged.growth).toBe(9);
    expect(merged.questions.map(q => q.questionId).sort()).toEqual(["a1", "a2", "a3"]);
    expect((await phone.doc("guest")).profiles).toEqual([]);
  });

  it("batches writes: many changes become one write after a quiet period", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    const phone = device("phone");
    phone.signIn("alice");
    await phone.study("user:alice", "ap", "q1");
    await phone.sync.start(); await phone.sync.syncNow(false);
    const puts = () => phone.requests.filter(method => method === "PUT").length;
    expect(puts()).toBe(1);
    for (const [index, question] of ["q2", "q3", "q4"].entries()) {
      await phone.study("user:alice", "ap", question, T0 + 1000 * (index + 1));
      phone.sync.requestSync();
      await vi.advanceTimersByTimeAsync(5000);
    }
    expect(puts()).toBe(1);
    await vi.advanceTimersByTimeAsync(PET_CLOUD_DEBOUNCE_MS);
    await phone.sync.syncNow(false);
    expect(puts()).toBe(2);
  });

  it("does nothing for guests", async () => {
    const phone = device("phone");
    await phone.study("guest", "ap", "q1");
    expect(await phone.sync.start()).toBe(false);
    expect(phone.requests).toEqual([]);
    expect(phone.storage.data.has(petProfileStorageKey("guest"))).toBe(true);
    expect([...phone.storage.data.keys()].some(key => key.startsWith(LS_KEYS.petCloudStatePrefix))).toBe(false);
    expect(emptyPetProfiles("guest", ZONE).profiles).toEqual([]);
  });
});
