import { beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ get: vi.fn(), invalidate: vi.fn(), updateRights: vi.fn(), rights: vi.fn() }));
vi.mock("@capacitor/core", () => ({ Capacitor: { isNativePlatform: () => true }, CapacitorHttp: { get: m.get } }));
vi.mock("@capacitor/network", () => ({ Network: { getStatus: async () => ({ connected: true }) } }));
vi.mock("@/mobile/src/downloads", () => ({ downloads: m }));
import { refreshDeviceRights } from "@/mobile/src/refresh-rights";
beforeEach(() => { vi.clearAllMocks(); m.rights.mockResolvedValue({ access: { userId: "owner" } }); });
it.each([503, 429, 408])("keeps the existing lease on temporary HTTP %i without extending it", async status => {
  m.get.mockResolvedValue({ status }); await refreshDeviceRights();
  expect(m.invalidate).not.toHaveBeenCalled(); expect(m.updateRights).not.toHaveBeenCalled();
});
it("keeps the existing lease on network failure", async () => {
  m.get.mockRejectedValue(new Error("offline")); await refreshDeviceRights();
  expect(m.invalidate).not.toHaveBeenCalled(); expect(m.updateRights).not.toHaveBeenCalled();
});
it.each([
  "<html>upstream error</html>", "{", "null", "{}", null, {}, [],
  { entitlement: null }, { entitlement: {} },
  { entitlement: { userId: "owner" } },
  { entitlement: { userId: "owner", entitled: "false" } },
  { entitlement: { entitled: true } },
  { entitlement: { userId: 42, entitled: true } },
  { entitlement: { userId: "", entitled: true } },
  { entitlement: { userId: "owner", entitled: true, lease: {} } },
  { entitlement: { userId: "owner", entitled: true, lease: "signed" } },
  { entitlement: { userId: "owner", entitled: true, lease: "signed" }, configuration: {} },
  { entitlement: { userId: "owner", entitled: true, lease: "signed" }, configuration: { leasePublicKey: 42 } },
])("continues to local authorization without changing rights on malformed 200 data: %j", async data => {
  m.get.mockResolvedValue({ status: 200, data });
  await expect(refreshDeviceRights()).resolves.toBeUndefined();
  expect(m.invalidate).not.toHaveBeenCalled();
  expect(m.updateRights).not.toHaveBeenCalled();
});
it.each([{userId:"owner",entitled:false},{userId:"other",entitled:true}])("revokes on confirmed loss of entitlement or owner mismatch", async entitlement => {
  m.get.mockResolvedValue({status:200,data:{entitlement}});
  await expect(refreshDeviceRights()).rejects.toThrow(); expect(m.invalidate).toHaveBeenCalledOnce();
});
it.each([401,403])("invalidates a rejected session (%i)", async status => {
  m.get.mockResolvedValue({status}); await expect(refreshDeviceRights()).rejects.toThrow(); expect(m.invalidate).toHaveBeenCalledOnce();
});
it("updates only a server-issued replacement lease", async () => {
  const entitlement={userId:"owner",entitled:true,lease:"signed"};
  m.get.mockResolvedValue({status:200,data:{entitlement,configuration:{leasePublicKey:"pinned"}}});
  await refreshDeviceRights(); expect(m.updateRights).toHaveBeenCalledWith(entitlement,"pinned");
});
