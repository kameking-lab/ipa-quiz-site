import { afterEach, beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ native: true, prepare: vi.fn(), request: vi.fn(), status: vi.fn(), enable: vi.fn(), disable: vi.fn() }));
vi.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: () => m.native },
  registerPlugin: () => ({ prepare: m.prepare, requestPermission: m.request, status: m.status, enableAds: m.enable, disableAds: m.disable }),
}));
beforeEach(() => { vi.resetModules(); m.native = true; m.prepare.mockResolvedValue({ enabled: true }); });
afterEach(() => { vi.resetAllMocks(); });
it("does not request ATT when optional ad settings are absent", async () => {
  m.prepare.mockResolvedValue({ enabled: false });
  const tracking = await import("../src/tracking");
  expect(await tracking.requestTrackingPermission()).toBe("restricted");
  expect(m.request).not.toHaveBeenCalled();
});
it("permits tracking only for affirmative ATT authorization", async () => {
  const { canTrack, requestTrackingPermission } = await import("../src/tracking");
  for (const status of ["notDetermined", "restricted", "denied", "authorized"] as const) {
    m.request.mockResolvedValueOnce({ status });
    expect(await requestTrackingPermission()).toBe(status);
    expect(canTrack(status)).toBe(status === "authorized");
  }
  expect(m.prepare).toHaveBeenCalledTimes(1);
});
it("fails closed on permission, status and SDK-registration errors", async () => {
  const tracking = await import("../src/tracking");
  m.request.mockRejectedValueOnce(new Error("unavailable"));
  m.status.mockRejectedValueOnce(new Error("unavailable"));
  m.enable.mockRejectedValueOnce(new Error("unavailable"));
  expect(await tracking.requestTrackingPermission()).toBe("restricted");
  expect(await tracking.trackingStatus()).toBe("restricted");
  expect(await tracking.enableTrackingAds()).toBe(false);
});
it("keeps ads off but lets the app start if native blocking cannot be installed", async () => {
  // Build 12: a rejected prepare() blanked the whole app on every iPhone.
  vi.spyOn(console, "error").mockImplementation(() => {});
  m.prepare.mockRejectedValueOnce(Object.assign(new Error("blocking failed"), { code: "PRIVACY_UNAVAILABLE" }));
  const tracking = await import("../src/tracking");
  expect(await tracking.prepareTrackingPrivacy()).toEqual({ enabled: false, client: "", slot: "", cmpScriptUrl: "" });
  expect(await tracking.requestTrackingPermission()).toBe("restricted");
  expect(await tracking.enableTrackingAds()).toBe(false);
  expect(m.request).not.toHaveBeenCalled();
  expect(m.enable).not.toHaveBeenCalled();
  expect(m.prepare).toHaveBeenCalledTimes(1);
});
it("treats an unregistered native plugin as ads disabled", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  m.prepare.mockRejectedValueOnce(Object.assign(new Error('"TrackingTransparency" plugin is not implemented on ios'), { code: "UNIMPLEMENTED" }));
  const tracking = await import("../src/tracking");
  expect((await tracking.prepareTrackingPrivacy()).enabled).toBe(false);
  expect(await tracking.enableTrackingAds()).toBe(false);
});
it("never enables ads when native preparation reports ads disabled", async () => {
  m.prepare.mockResolvedValue({ enabled: false, privacy: "unavailable" });
  const tracking = await import("../src/tracking");
  expect(await tracking.enableTrackingAds()).toBe(false);
  expect(m.enable).not.toHaveBeenCalled();
});
it("does not call iOS permission APIs in a browser", async () => {
  m.native = false;
  const tracking = await import("../src/tracking");
  expect(await tracking.requestTrackingPermission()).toBe("restricted");
  expect(await tracking.trackingStatus()).toBe("restricted");
  expect((await tracking.prepareTrackingPrivacy()).enabled).toBe(false);
  expect(m.request).not.toHaveBeenCalled();
  expect(m.prepare).not.toHaveBeenCalled();
});
