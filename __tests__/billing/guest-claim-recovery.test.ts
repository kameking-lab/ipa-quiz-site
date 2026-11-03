import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { guestClaim, guestGrant } from "@/lib/billing/guest-practice";
import { BillingService } from "@/lib/billing/service";
import { MemoryStore } from "./memory-store";
import { monthlyFixture } from "./monthly-fixture";
import { config } from "./service.test";

// Stateful KV boundary double. It models the script contract but does not execute Lua.
function kvDouble() {
  const days = new Map<string, { ids: Set<string>; owner?: string }>();
  return vi.fn(async (_url: string, init: RequestInit) => {
    const args = JSON.parse(init.body as string) as string[];
    const key = args[3], action = args[6], id = args[7], owner = args[8], limit = Number(args[9]);
    const entry = days.get(key) ?? { ids: new Set<string>(), owner: undefined };
    const result = (() => {
      if (action === "recover") return entry.owner === owner ? { status: "claimed", ids: [...entry.ids] } : { status: "none" };
      if (action === "claim") {
        if (entry.owner && entry.owner !== owner) return { status: "other" };
        entry.owner = owner; days.set(key, entry); return { status: "claimed", ids: [...entry.ids] };
      }
      if (entry.owner) return { status: "claimed" };
      if (entry.ids.has(id)) return { status: "ok", used: entry.ids.size };
      if (entry.ids.size >= limit) return { status: "limit", used: entry.ids.size };
      entry.ids.add(id); days.set(key, entry); return { status: "ok", used: entry.ids.size };
    })();
    return Response.json({ result: JSON.stringify(result) });
  });
}
const now = Date.parse("2026-10-30T00:00:00Z"), day = "2026-10-30";
beforeEach(() => { vi.stubEnv("AUTH_SECRET", "test-secret"); vi.stubEnv("KV_REST_API_URL", "https://kv.invalid"); vi.stubEnv("KV_REST_API_TOKEN", "test-token"); vi.stubGlobal("fetch", kvDouble()); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("stateful claim recovery using KV double and transactional stores", () => {
  it("serializes grant then claim, freezes the set, retries same owner and conceals it from another", async () => {
    expect((await guestGrant("r", "g", "q1", 10, now)).status).toBe("ok");
    const first = await guestClaim("r", "g", "alice", 10, now);
    expect(first).toEqual([{ day, ids: ["q1"] }]);
    expect((await guestGrant("r", "g", "q2", 10, now)).status).toBe("claimed");
    expect(await guestClaim("r", "g", "alice", 10, now)).toEqual(first);
    expect(await guestClaim("r", "g", "bob", 10, now)).toEqual([]);
    expect(await guestClaim("r", "another", "alice", 10, now)).toEqual([{ day, ids: [] }]);
    expect((await guestGrant("r", "another", "later", 10, now)).status).toBe("claimed");
  });
  it("recovers a claim after account rollback and after the response following commit is lost", async () => {
    const store = new MemoryStore(), service = new BillingService(store, config(), () => new Date(now));
    await guestGrant("r", "g", "q1", 10, now);
    const first = await guestClaim("r", "g", "alice", 10, now);
    store.fail = true; await expect(service.grant("alice", "q2", first, true, day)).rejects.toThrow();
    expect(store.grants.size).toBe(0); store.fail = false;
    const retry = await guestClaim("r", "g", "alice", 10, now);
    await service.grant("alice", "q2", retry, true, day); // Pretend the response is lost after commit.
    const afterLoss = await guestClaim("r", "g", "alice", 10, now);
    expect(await service.grant("alice", "q2", afterLoss, true, day)).toEqual({ kind: "trial", remaining: 8 });
    expect(store.grants.get("alice:mock:2026-10-30")).toEqual(new Set(["q1", "q2"]));
  });
  it("recovers monthly claim after rollback and a lost commit response", async () => {
    const f = await monthlyFixture(); await guestGrant("r", "m", "q1", 10, now);
    const snapshot = await guestClaim("r", "m", "alice", 10, now);
    f.store.fail = true; await expect(f.service.grant("alice", "q2", snapshot, true, day)).rejects.toThrow();
    expect(f.account().grants[day]).toBeUndefined(); f.store.fail = false;
    await f.service.grant("alice", "q2", await guestClaim("r", "m", "alice", 10, now), true, day);
    expect(await f.service.grant("alice", "q2", await guestClaim("r", "m", "alice", 10, now), true, day)).toEqual({ kind: "trial", remaining: 8 });
    expect(new Set(f.account().grants[day])).toEqual(new Set(["q1", "q2"]));
  });
  it("merges two guest snapshots concurrently into the same pass and monthly account", async () => {
    await guestGrant("r", "g1", "q1", 10, now); await guestGrant("r", "g2", "q2", 10, now);
    const one = await guestClaim("r", "g1", "alice", 10, now), two = await guestClaim("r", "g2", "alice", 10, now);
    const store = new MemoryStore(), service = new BillingService(store, config(), () => new Date(now));
    await Promise.all([service.grant("alice", "q1", one, true, day), service.grant("alice", "q2", two, true, day)]);
    expect(store.grants.get("alice:mock:2026-10-30")).toEqual(new Set(["q1", "q2"]));
    const f = await monthlyFixture();
    await Promise.all([f.service.grant("alice", "q1", one, true, day), f.service.grant("alice", "q2", two, true, day)]);
    expect(new Set(f.account().grants[day])).toEqual(new Set(["q1", "q2"]));
  });
});
