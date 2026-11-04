import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  native: true,
  request: vi.fn(),
  permission: vi.fn(), askPermission: vi.fn(), cancel: vi.fn(), schedule: vi.fn(),
  browser: vi.fn(),
}));
vi.mock("@capacitor/core", () => ({ Capacitor: { isNativePlatform: () => mocks.native }, CapacitorHttp: { request: mocks.request } }));
vi.mock("@capacitor/local-notifications", () => ({ LocalNotifications: {
  checkPermissions: mocks.permission, requestPermissions: mocks.askPermission, cancel: mocks.cancel, schedule: mocks.schedule,
} }));
vi.mock("@capacitor/browser", () => ({ Browser: { open: mocks.browser } }));
import { apiRequest, openExternal, setReminder } from "../src/platform";

beforeEach(() => { vi.resetAllMocks(); mocks.native = true; });
afterEach(() => vi.restoreAllMocks());
describe("native platform adapters", () => {
  it("uses fixed-origin native HTTP without browser CORS, custom auth or redirect following", async () => {
    mocks.request.mockResolvedValue({ status: 200, data: "回答" });
    expect(await apiRequest("/api/copilot", { tier: "free" })).toEqual({ status: 200, data: "回答" });
    expect(mocks.request).toHaveBeenCalledWith(expect.objectContaining({
      url: "https://www.kakomon-ai.jp/api/copilot", method: "POST", responseType: "text", disableRedirects: true,
      connectTimeout: 15000, readTimeout: 45000,
    }));
    expect(mocks.request.mock.calls[0][0].headers).not.toHaveProperty("Authorization");
    await expect(apiRequest("https://evil.test/api/copilot")).rejects.toThrow("許可");
    await expect(apiRequest("/api/mobile/packs?pack=ip&since=1&url=https://evil.test")).rejects.toThrow("許可");
    expect(mocks.request).toHaveBeenCalledTimes(1);
  });
  it("requests permission only when enabling, and denied permission keeps previous notifications", async () => {
    mocks.permission.mockResolvedValue({ display: "prompt" });
    mocks.askPermission.mockResolvedValue({ display: "denied" });
    await expect(setReminder("20:15")).rejects.toThrow("許可されていません");
    expect(mocks.cancel).not.toHaveBeenCalled();
    expect(mocks.schedule).not.toHaveBeenCalled();
  });
  it("replaces one stable-id daily local notification at the chosen hour/minute", async () => {
    mocks.permission.mockResolvedValue({ display: "granted" });
    await setReminder("07:35");
    expect(mocks.cancel).not.toHaveBeenCalled();
    expect(mocks.schedule).toHaveBeenCalledWith({ notifications: [expect.objectContaining({
      id: 11003, schedule: { on: { hour: 7, minute: 35 }, repeats: true, allowWhileIdle: false },
      extra: { destination: "review" },
    })] });
    expect(mocks.askPermission).not.toHaveBeenCalled();
  });
  it("keeps the previous reminder when OS scheduling fails", async () => {
    mocks.permission.mockResolvedValue({ display: "granted" });
    mocks.schedule.mockRejectedValue(new Error("OS scheduling failure"));
    await expect(setReminder("20:00")).rejects.toThrow("OS scheduling failure");
    expect(mocks.cancel).not.toHaveBeenCalled();
  });
  it("disables notifications without requesting permission", async () => {
    await setReminder(null);
    expect(mocks.cancel).toHaveBeenCalledTimes(1);
    expect(mocks.permission).not.toHaveBeenCalled();
    expect(mocks.askPermission).not.toHaveBeenCalled();
    expect(mocks.schedule).not.toHaveBeenCalled();
  });
  it("rejects invalid times and browser-preview notifications", async () => {
    await expect(setReminder("25:00")).rejects.toThrow("不正");
    mocks.native = false;
    await expect(setReminder("20:00")).rejects.toThrow("iPhone");
    expect(mocks.schedule).not.toHaveBeenCalled();
  });
  it("opens trusted sources outside the Capacitor bridge and rejects executable URLs", async () => {
    await openExternal("https://www.ipa.go.jp/shiken/mondai-kaiotu/");
    expect(mocks.browser).toHaveBeenCalledTimes(1);
    await expect(openExternal("javascript:alert(1)")).rejects.toThrow();
    await expect(openExternal("https://www.ipa.go.jp.evil.test/")).rejects.toThrow();
    await expect(openExternal("http://www.ipa.go.jp/")).rejects.toThrow();
  });
});
