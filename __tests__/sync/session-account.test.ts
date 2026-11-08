import { afterEach, describe, expect, it, vi } from "vitest";
import { readSyncAccount } from "@/lib/sync/ownership";
import { preparePetOwner } from "@/lib/pet/v1/runtime";

function sessionResponse(body: string, status = 200) {
  return vi.fn(async () => new Response(body, { status, headers: { "Content-Type": "application/json" } }));
}

afterEach(() => { vi.unstubAllGlobals(); localStorage.clear(); });

describe("readSyncAccount", () => {
  it("treats Auth.js's signed-out `null` body as a guest", async () => {
    vi.stubGlobal("fetch", sessionResponse("null"));
    await expect(readSyncAccount()).resolves.toBeNull();
  });

  it("treats a session object without a user as a guest", async () => {
    vi.stubGlobal("fetch", sessionResponse("{}"));
    await expect(readSyncAccount()).resolves.toBeNull();
  });

  it("returns the signed-in account", async () => {
    vi.stubGlobal("fetch", sessionResponse(JSON.stringify({ user: { id: "u1", email: "a@example.test" } })));
    await expect(readSyncAccount()).resolves.toEqual({ id: "u1", label: "a@example.test" });
  });

  it("still fails when the session endpoint is down or malformed", async () => {
    vi.stubGlobal("fetch", sessionResponse("{}", 500));
    await expect(readSyncAccount()).rejects.toThrow("session_unavailable");
    vi.stubGlobal("fetch", sessionResponse('"x"'));
    await expect(readSyncAccount()).rejects.toThrow("invalid_session");
  });
});

describe("preparePetOwner for a signed-out visitor", () => {
  it("gets a guest lease instead of 「育成の保存を確認できませんでした」", async () => {
    vi.stubGlobal("fetch", sessionResponse("null"));
    const lease = await preparePetOwner(() => true);
    expect(lease?.ownerScope).toBe("guest");
    expect(lease?.isCurrent()).toBe(true);
  });
});
