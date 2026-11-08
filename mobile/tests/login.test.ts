import { beforeEach, expect, it, vi } from "vitest";
const m = vi.hoisted(() => ({ open: vi.fn(), set: vi.fn() }));
vi.mock("@capacitor/browser", () => ({ Browser: { open: m.open, close: vi.fn(async () => {}) } }));
vi.mock("@capacitor/preferences", () => ({ Preferences: { set: m.set, get: vi.fn(), remove: vi.fn() } }));
vi.mock("@capacitor/app", () => ({ App: { addListener: vi.fn(), getLaunchUrl: vi.fn() } }));
vi.mock("@capacitor/core", () => ({ Capacitor: { isNativePlatform: () => true }, CapacitorHttp: { post: vi.fn() } }));
beforeEach(() => { vi.resetAllMocks(); vi.stubGlobal("location", { pathname: "/quiz", search: "", hash: "" }); });

it("opens the sign-in sheet without waiting for the verifier to be saved (tap felt dead on device)", async () => {
  let saved: () => void = () => {};
  m.set.mockImplementation(() => new Promise<void>(resolve => { saved = resolve; }));
  m.open.mockResolvedValue(undefined);
  const { beginLogin } = await import("../src/login");
  const pending = beginLogin("https://www.kakomon-ai.jp");
  await vi.waitFor(() => expect(m.open).toHaveBeenCalledTimes(1));
  // The bridge write is still in flight, yet the sheet is already opening.
  expect(m.set).toHaveBeenCalledTimes(1);
  const url = new URL(m.open.mock.calls[0][0].url);
  expect(url.pathname).toBe("/auth/signin");
  expect(new URL(url.searchParams.get("callbackUrl")!, url.origin).pathname).toBe("/api/mobile/auth/complete");
  const stored = JSON.parse(m.set.mock.calls[0][0].value);
  expect(new URL(url.searchParams.get("callbackUrl")!, url.origin).searchParams.get("state")).toBe(stored.state);
  saved();
  await pending;
});
