// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { clientNetwork, deviceClass, guestDeviceKey, guestGrant, guestClaim, guestCookie, readGuestCookie } from "@/lib/billing/guest-practice";
import { LuaKv } from "./guest-lua-kv";

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1";
const IPHONE_PATCH = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1.1 Mobile/15E148 Safari/604.1";
const IPHONE_APP = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
const ANDROID = "Mozilla/5.0 (Linux; Android 14; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36";
const WINDOWS = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.92 Safari/537.36";
const WINDOWS_PATCH = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.117 Safari/537.36";
const IP = "203.0.113.77";
const NOW = Date.parse("2026-11-09T03:00:00Z");
const REALM = "production:monthly:default";

function req(ua: string, ip = IP, extra: Record<string, string> = {}) {
  return new Request("https://kakomon.test/api/billing/question", { method: "POST", headers: { "user-agent": ua, "x-forwarded-for": `${ip}, 10.0.0.1`, ...extra } });
}
let kv: LuaKv;
beforeEach(() => {
  vi.stubEnv("AUTH_SECRET", "test-secret"); vi.stubEnv("KV_REST_API_URL", "https://kv.test.invalid"); vi.stubEnv("KV_REST_API_TOKEN", "synthetic-kv-token");
  kv = new LuaKv(); vi.stubGlobal("fetch", vi.fn(kv.fetch));
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

/** A fresh guest cookie each time, as after clearing cookies / a private window / another browser. */
function freshGuest() {
  const value = guestCookie(REALM, NOW);
  const guest = readGuestCookie(new Request("https://kakomon.test", { headers: { cookie: `practice_guest=${value}` } }), REALM, NOW);
  if (!guest) throw new Error("cookie");
  return guest;
}

describe("network + device daily cap for guests", () => {
  it("recreating the guest cookie on the same line and device still stops at the 11th question", async () => {
    const first = freshGuest();
    for (let i = 0; i < 6; i++) expect(await guestGrant(REALM, first, `q${i}`, 10, NOW, req(IPHONE))).toMatchObject({ status: "ok", used: i + 1 });
    const second = freshGuest();
    expect(second).not.toBe(first);
    // The second cookie starts with the bucket's 6 already counted.
    expect(await guestGrant(REALM, second, "q6", 10, NOW, req(IPHONE))).toMatchObject({ status: "ok", used: 7 });
    const third = freshGuest();
    for (let i = 7; i < 10; i++) expect(await guestGrant(REALM, third, `q${i}`, 10, NOW, req(IPHONE))).toMatchObject({ status: "ok" });
    const fourth = freshGuest();
    expect(await guestGrant(REALM, fourth, "q10", 10, NOW, req(IPHONE))).toMatchObject({ status: "limit" });
    // A question already seen from this line+device is not counted again.
    expect(await guestGrant(REALM, fourth, "q0", 10, NOW, req(IPHONE))).toMatchObject({ status: "ok", used: 10 });
    expect(await guestGrant(REALM, fourth, "q11", 10, NOW, req(IPHONE))).toMatchObject({ status: "limit" });
    // Patch-level OS/browser differences do not open a new bucket.
    expect(await guestGrant(REALM, freshGuest(), "q12", 10, NOW, req(IPHONE_PATCH))).toMatchObject({ status: "limit" });
  });

  it("re-viewing a question with the same cookie is unchanged, even if the bucket is full", async () => {
    const guest = freshGuest();
    expect(await guestGrant(REALM, guest, "mine", 10, NOW, req(WINDOWS))).toMatchObject({ status: "ok", used: 1 });
    for (let i = 0; i < 9; i++) await guestGrant(REALM, freshGuest(), `o${i}`, 10, NOW, req(WINDOWS));
    expect(await guestGrant(REALM, guest, "mine", 10, NOW, req(WINDOWS_PATCH))).toMatchObject({ status: "ok", used: 10 });
    expect(await guestGrant(REALM, guest, "new", 10, NOW, req(WINDOWS))).toMatchObject({ status: "limit" });
  });

  it("a different device class or a different line has its own allowance (CGNAT / family Wi-Fi)", async () => {
    for (let i = 0; i < 10; i++) await guestGrant(REALM, freshGuest(), `q${i}`, 10, NOW, req(IPHONE));
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(IPHONE))).toMatchObject({ status: "limit" });
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(ANDROID))).toMatchObject({ status: "ok", used: 1 });
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(WINDOWS))).toMatchObject({ status: "ok", used: 1 });
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(IPHONE_APP))).toMatchObject({ status: "ok", used: 1 });
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(IPHONE, "198.51.100.9"))).toMatchObject({ status: "ok", used: 1 });
  });

  it("an IPv6 client rotating its interface ID within the same /64 shares one bucket", async () => {
    for (let i = 0; i < 10; i++) await guestGrant(REALM, freshGuest(), `q${i}`, 10, NOW, req(ANDROID, `2001:db8:1:2::${(i + 1).toString(16)}`));
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(ANDROID, "2001:db8:1:2:abcd:ef01:2345:6789"))).toMatchObject({ status: "limit" });
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(ANDROID, "2001:db8:1:3::1"))).toMatchObject({ status: "ok" });
  });

  it("the bucket starts over on the next JST day and expires within about two days", async () => {
    for (let i = 0; i < 10; i++) await guestGrant(REALM, freshGuest(), `q${i}`, 10, NOW, req(IPHONE));
    expect(await guestGrant(REALM, freshGuest(), "x", 10, NOW, req(IPHONE))).toMatchObject({ status: "limit" });
    const tomorrow = NOW + 86400000;
    expect(await guestGrant(REALM, freshGuest(), "x", 10, tomorrow, req(IPHONE))).toMatchObject({ status: "ok", used: 1 });
    const deviceKeys = kv.keys().filter(k => k.includes(":device:"));
    expect(deviceKeys).toHaveLength(2);
    for (const key of deviceKeys) expect(kv.ttl.get(key)).toBeLessThanOrEqual(2 * 86400);
    // Daily salt: the same line+device cannot be linked across days.
    expect(guestDeviceKey(req(IPHONE), REALM, "2026-11-09")).not.toBe(guestDeviceKey(req(IPHONE), REALM, "2026-11-10"));
  });

  it("never stores, sends or logs the raw IP or User-Agent", async () => {
    const spies = (["log", "info", "warn", "error", "debug"] as const).map(level => vi.spyOn(console, level).mockImplementation(() => {}));
    const v6 = "2001:db8:aaaa:bbbb::1234";
    await guestGrant(REALM, freshGuest(), "q0", 10, NOW, req(IPHONE));
    await guestGrant(REALM, freshGuest(), "q1", 10, NOW, req(ANDROID, v6));
    const persisted = [...kv.bodies, ...kv.keys(), ...[...kv.data.values()].flatMap(v => typeof v === "string" ? [v] : [...v.keys()].map(String))].join("\n");
    for (const secret of [IP, v6, "2001:db8:aaaa:bbbb", "iPhone", "Android", "Chrome", "Safari", "Mozilla", "ios18", "android14"]) expect(persisted).not.toContain(secret);
    for (const spy of spies) expect(spy).not.toHaveBeenCalled();
    expect(guestDeviceKey(req(IPHONE), REALM, "2026-11-09")).toMatch(/^[0-9a-f]{64}$/);
  });

  it("adds at most two Redis operations per new question and no extra HTTP round trip", async () => {
    const guest = freshGuest();
    await guestGrant(REALM, guest, "q0", 10, NOW, req(IPHONE));
    await guestGrant(REALM, guest, "q1", 10, NOW, req(IPHONE));
    await guestGrant(REALM, guest, "q1", 10, NOW, req(IPHONE));
    expect(kv.evalCount).toBe(3);
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(3);
  });

  it("fails closed like the existing guest check when KV is down or unconfigured", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));
    await expect(guestGrant(REALM, freshGuest(), "q", 10, NOW, req(IPHONE))).rejects.toMatchObject({ code: "billing_unavailable", status: 503 });
    vi.stubEnv("KV_REST_API_URL", "");
    await expect(guestGrant(REALM, freshGuest(), "q", 10, NOW, req(IPHONE))).rejects.toMatchObject({ code: "billing_unavailable", status: 503 });
  });

  it("a guest whose day was claimed by sign-in keeps the existing claim result", async () => {
    const guest = freshGuest();
    await guestGrant(REALM, guest, "q0", 10, NOW, req(IPHONE));
    expect(await guestClaim(REALM, guest, "alice", 10, NOW)).toEqual([{ day: "2026-11-09", ids: ["q0"] }]);
    expect(await guestGrant(REALM, guest, "q1", 10, NOW, req(IPHONE))).toMatchObject({ status: "claimed" });
  });
});

describe("bucket inputs", () => {
  it("normalises the client address to IPv4 or the IPv6 /64", () => {
    expect(clientNetwork("203.0.113.7")).toBe("v4:203.0.113.7");
    expect(clientNetwork("::ffff:203.0.113.7")).toBe("v4:203.0.113.7");
    expect(clientNetwork("203.0.113.7:51234")).toBe("v4:203.0.113.7");
    expect(clientNetwork("2001:db8:0:1::5")).toBe(clientNetwork("[2001:0db8:0000:0001:ffff:1:2:3]:443"));
    expect(clientNetwork("2001:db8:0:1::5")).not.toBe(clientNetwork("2001:db8:0:2::5"));
    for (const bad of ["", null, "999.1.1.1", "not-an-ip", "1::2::3", "1:2:3:4:5:6:7:8:9"]) expect(clientNetwork(bad)).toBe("unknown");
  });

  it("keeps device type, OS and browser but drops version details", () => {
    expect(deviceClass(IPHONE)).toBe("mobile/ios18/safari18");
    expect(deviceClass(IPHONE_PATCH)).toBe(deviceClass(IPHONE));
    expect(deviceClass(IPHONE_APP)).toBe("mobile/ios18/webview");
    expect(deviceClass(ANDROID)).toBe("mobile/android14/chrome130");
    expect(deviceClass(WINDOWS)).toBe("desktop/windows/chrome130");
    expect(deviceClass(WINDOWS_PATCH)).toBe(deviceClass(WINDOWS));
    expect(deviceClass("Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0.6723.90 Mobile/15E148 Safari/604.1")).toBe("tablet/ios17/chrome130");
    expect(deviceClass(null)).toBe("desktop/other/other");
  });

  it("falls back to x-real-ip, and to a shared 'unknown' line rather than skipping the cap", () => {
    const realIp = new Request("https://kakomon.test", { headers: { "user-agent": IPHONE, "x-real-ip": IP } });
    expect(guestDeviceKey(realIp, REALM, "2026-11-09")).toBe(guestDeviceKey(req(IPHONE), REALM, "2026-11-09"));
    const none = new Request("https://kakomon.test", { headers: { "user-agent": IPHONE } });
    expect(guestDeviceKey(none, REALM, "2026-11-09")).toMatch(/^[0-9a-f]{64}$/);
  });
});
