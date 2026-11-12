import { beforeEach, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ storage: new Map<string, string>(), disconnect: vi.fn() }));
vi.mock("@capacitor/preferences", () => ({ Preferences: {
  get: async ({ key }: { key: string }) => ({ value: state.storage.get(key) ?? null }),
  set: async ({ key, value }: { key: string; value: string }) => { state.storage.set(key, value); },
  remove: async ({ key }: { key: string }) => { state.storage.delete(key); },
} }));
vi.mock("@/mobile/src/purchases", () => ({ deviceMembership: { disconnect: state.disconnect } }));
import { signOutDevice } from "@/mobile/src/sign-out";
import { downloads } from "@/mobile/src/downloads";
beforeEach(() => {
  vi.resetAllMocks(); state.storage.clear();
  state.storage.set("kakomon:rights:v2", JSON.stringify({ access: { userId: "test-owner", entitled: true } }));
});
it("disconnects the buyer and makes saved questions inaccessible before returning", async () => {
  const stop = vi.fn(); window.addEventListener("mobile:signing-out", stop, { once: true });
  await signOutDevice();
  expect(stop).toHaveBeenCalledOnce(); expect(state.disconnect).toHaveBeenCalledOnce();
  expect(await downloads.rights()).toBeNull();
  await expect(downloads.authorize()).rejects.toThrow("有料会員専用");
  await expect(downloads.load("ip")).rejects.toThrow("有料会員専用");
});
it("still revokes offline rights if the store disconnect fails", async () => {
  state.disconnect.mockRejectedValueOnce(Error("store unavailable"));
  await expect(signOutDevice()).rejects.toThrow("store unavailable");
  expect(await downloads.rights()).toBeNull();
  await expect(downloads.authorize()).rejects.toThrow("有料会員専用");
});
