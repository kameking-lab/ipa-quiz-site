import { afterEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ native: true, request: vi.fn(), status: vi.fn() }));
vi.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: () => m.native },
  registerPlugin: () => ({ requestPermission: m.request, status: m.status }),
}));
import { canTrack, requestTrackingPermission, trackingStatus } from "../src/tracking";
afterEach(() => { vi.clearAllMocks(); m.native = true; });
it("does not request a purposeless ATT dialog or permit tracking without an approved ads integration", async () => {
  expect(await requestTrackingPermission()).toBe("restricted");
  expect(m.request).not.toHaveBeenCalled();
  for (const status of ["notDetermined", "restricted", "denied", "authorized"] as const) expect(canTrack(status)).toBe(false);
});
it("fails closed when the native status cannot be read", async () => {
  m.status.mockRejectedValueOnce(new Error("unavailable"));
  expect(await trackingStatus()).toBe("restricted");
  m.native = false;
  expect(await requestTrackingPermission()).toBe("restricted");
  expect(m.request).not.toHaveBeenCalled();
});
