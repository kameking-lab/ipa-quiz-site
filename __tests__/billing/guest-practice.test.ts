import { afterEach, describe, expect, it, vi } from "vitest";
import { guestCookie, readGuestCookie, resetAt, guestGrant, guestClaim } from "@/lib/billing/guest-practice";
import { BillingService } from "@/lib/billing/service";
import { MemoryStore } from "./memory-store";
import { monthlyFixture } from "./monthly-fixture";
import { config } from "./service.test";

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
describe("guest identity", () => {
  it("signs ID, issue time, realm; rejects tampering, expiry and future issue", () => {
    vi.stubEnv("AUTH_SECRET", "test-secret");
    const now = Date.parse("2026-10-30T12:00:00Z"), value = guestCookie("test", now);
    const req = (v: string) => new Request("http://localhost", { headers: { cookie: `practice_guest=${v}` } });
    expect(readGuestCookie(req(value), "test", now)).toMatch(/^[a-f0-9-]{36}$/);
    expect(readGuestCookie(req(value), "other", now)).toBeNull();
    expect(readGuestCookie(req(value.slice(0, -1) + (value.endsWith("0") ? "1" : "0")), "test", now)).toBeNull();
    expect(readGuestCookie(req(value), "test", now + 30 * 86400000)).toBeNull();
    expect(readGuestCookie(req(value), "test", now - 1000)).toBeNull();
    expect(resetAt(Date.parse("2026-10-30T14:59:59Z"))).toBe("2026-10-30T15:00:00.000Z");
  });
  it("rejects action-incompatible status and invalid snapshot shapes", async () => {
    vi.stubEnv("AUTH_SECRET", "test-secret"); vi.stubEnv("KV_REST_API_URL", "https://test.invalid"); vi.stubEnv("KV_REST_API_TOKEN", "test-token");
    const reply = (result: unknown) => vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => Response.json({ result: JSON.stringify(result) })));
    for (const status of ["none", "other"]) { reply({ status }); await expect(guestGrant("r", "g", "q", 10, Date.now())).rejects.toMatchObject({ code: "billing_unavailable" }); }
    for (const status of ["ok", "limit", "rate", "other"]) { reply({ status, used: 0, retry: 1 }); await expect(guestClaim("r", "g", "u", 10, Date.now())).rejects.toMatchObject({ code: "billing_unavailable" }); }
    for (const status of ["none", "ok", "limit", "rate"]) {
      vi.stubGlobal("fetch", vi.fn().mockImplementationOnce(async () => Response.json({ result: JSON.stringify({ status: "none" }) }))
        .mockImplementationOnce(async () => Response.json({ result: JSON.stringify({ status, used: 0, retry: 1 }) })));
      await expect(guestClaim("r", "g", "u", 10, Date.now())).rejects.toMatchObject({ code: "billing_unavailable" });
    }
    for (const ids of [42, true, null, { bad: "q" }, [""], [false]]) { reply({ status: "claimed", ids }); await expect(guestClaim("r", "g", "u", 10, Date.now())).rejects.toMatchObject({ code: "billing_unavailable" }); }
    reply({ status: "claimed", ids: {} }); expect(await guestClaim("r", "g", "u", 10, Date.now())).toHaveLength(2);
  });
  it("fails closed on malformed KV response and validates a recovered snapshot", async () => {
    vi.stubEnv("AUTH_SECRET", "test-secret"); vi.stubEnv("KV_REST_API_URL", "https://test.invalid"); vi.stubEnv("KV_REST_API_TOKEN", "test-token");
    const fetcher = vi.fn().mockResolvedValueOnce(Response.json({ result: "invalid" }))
      .mockResolvedValueOnce(Response.json({ result: JSON.stringify({ status: "claimed", ids: ["q-old"] }) }))
      .mockResolvedValueOnce(Response.json({ result: JSON.stringify({ status: "claimed", ids: ["q-today"] }) }));
    vi.stubGlobal("fetch", fetcher);
    const now = Date.parse("2026-10-30T15:00:01Z");
    await expect(guestGrant("realm", "id", "q", 10, now)).rejects.toMatchObject({ code: "billing_unavailable" });
    expect(await guestClaim("realm", "id", "alice", 10, now)).toEqual([{ day: "2026-10-30", ids: ["q-old"] }, { day: "2026-10-31", ids: ["q-today"] }]);
    const body = JSON.parse(fetcher.mock.calls[1][1].body as string) as string[];
    expect(body[0]).toBe("EVAL"); expect(body[2]).toBe("3"); expect(body.join(" ")).not.toContain("alice");
  });
});
describe("claim union commits before limit", () => {
  it("pass service keeps union even after 429, permits reopen during KV outage", async () => {
    const store = new MemoryStore(), c = config();
    const service = new BillingService(store, c, () => new Date("2026-10-30T00:00:00Z"));
    await service.grant("alice", "existing");
    const ids = Array.from({ length: 10 }, (_, i) => `q${i}`);
    await expect(service.grant("alice", "new", [{ day: "2026-10-30", ids }])).rejects.toMatchObject({ code: "daily_limit" });
    expect(store.grants.get("alice:mock:2026-10-30")?.size).toBe(11);
    expect(await service.grant("alice", "q0", [], false)).toEqual({ kind: "trial", remaining: null });
    await expect(service.grant("alice", "new", [], false)).rejects.toMatchObject({ code: "billing_unavailable" });
  });
  it("uses the request's JST day even if the locked transaction crosses midnight", async () => {
    const store = new MemoryStore(), service = new BillingService(store, config(), () => new Date("2026-10-30T15:00:01Z"));
    await service.grant("alice", "requested", [{ day: "2026-10-30", ids: ["claimed"] }], true, "2026-10-30");
    expect(store.grants.get("alice:mock:2026-10-30")).toEqual(new Set(["claimed", "requested"]));
    expect(store.grants.has("alice:mock:2026-10-31")).toBe(false);
  });
  it("monthly union persists on 429 and retry is idempotent", async () => {
    const f = await monthlyFixture();
    await f.service.grant("alice", "existing");
    const ids = Array.from({ length: 10 }, (_, i) => `q${i}`);
    const snapshots = [{ day: "2026-01-31", ids }];
    await expect(f.service.grant("alice", "new", snapshots)).rejects.toMatchObject({ code: "daily_limit" });
    await expect(f.service.grant("alice", "new", snapshots)).rejects.toMatchObject({ code: "daily_limit" });
    expect(f.account().grants["2026-01-31"]).toHaveLength(11);
    expect(await f.service.grant("alice", "q0", [], false)).toEqual({ kind: "trial", remaining: null });
  });
});
