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

const SITE = "https://www.kakomon-ai.jp";
it("requests fresh provider authentication for account deletion without changing ordinary login", async () => {
  m.set.mockResolvedValue(undefined);m.open.mockResolvedValue(undefined);
  const {beginLogin}=await import("../src/login");
  await beginLogin(SITE,"/account/delete",true);
  const url=new URL(m.open.mock.calls[0][0].url);
  expect(url.searchParams.get("reauth")).toBe("1");
  expect(new URL(url.searchParams.get("callbackUrl")!,SITE).searchParams.get("reauth")).toBe("1");
  expect(JSON.parse(m.set.mock.calls[0][0].value).returnTo).toBe("/account/delete");
});
const code = "c".repeat(43), state = "s".repeat(43);
async function pendingLogin(get: ReturnType<typeof vi.fn>) {
  get.mockResolvedValue({ value: JSON.stringify({ verifier: "v".repeat(43), state, returnTo: "/ap#app-settings", createdAt: Date.now() }) });
}
it("finishes sign-in with a same-origin fetch and waits until the WebView sees the session before leaving", async () => {
  const { Preferences } = await import("@capacitor/preferences");
  await pendingLogin(vi.mocked(Preferences.get));
  const replace = vi.fn();
  vi.stubGlobal("location", { origin: SITE, pathname: "/ap", search: "", hash: "", replace });
  vi.stubGlobal("window", { location: { replace } });
  let sessions = 0;
  const fetch = vi.fn(async (input: string, init?: RequestInit) => {
    if (input.endsWith("/api/mobile/auth/exchange")) {
      expect(init?.credentials).toBe("include");
      return Response.json({ redirectTo: `${SITE}/ap#app-settings` });
    }
    sessions++;
    return Response.json(sessions < 2 ? {} : { user: { id: "u" } });
  });
  vi.stubGlobal("fetch", fetch);
  const { finishLogin } = await import("../src/login");
  await expect(finishLogin(`kakomonai://auth?code=${code}&state=${state}`, SITE)).resolves.toBe(true);
  expect(sessions).toBe(2);
  expect(replace).toHaveBeenCalledWith(`${SITE}/ap#app-settings`);
});
it("shows the server's reason when the exchange is refused", async () => {
  const { Preferences } = await import("@capacitor/preferences");
  await pendingLogin(vi.mocked(Preferences.get));
  vi.stubGlobal("location", { origin: SITE, pathname: "/", search: "", hash: "" });
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: "auth_code_expired" }, { status: 401 })));
  const { finishLogin } = await import("../src/login");
  await expect(finishLogin(`kakomonai://auth?code=${code}&state=${state}`, SITE)).rejects.toThrow("auth_code_expired");
});
it("hands a return that reached the bundled shell to the website instead of exchanging cross-origin", async () => {
  const { Preferences } = await import("@capacitor/preferences");
  await pendingLogin(vi.mocked(Preferences.get));
  const replace = vi.fn();
  vi.stubGlobal("location", { origin: "capacitor://localhost", pathname: "/index.html", search: "", hash: "" });
  vi.stubGlobal("window", { location: { replace } });
  const fetch = vi.fn();vi.stubGlobal("fetch", fetch);
  const { finishLogin } = await import("../src/login");
  await finishLogin(`kakomonai://auth?code=${code}&state=${state}`, SITE);
  expect(fetch).not.toHaveBeenCalled();
  expect(Preferences.set).toHaveBeenCalledWith({ key: "kakomon:auth-return:v1", value: `kakomonai://auth?code=${code}&state=${state}` });
  expect(replace).toHaveBeenCalledWith(`${SITE}/ap#app-settings`);
});
it("ignores a cold-start launch URL that was already used instead of reporting a failed sign-in", async () => {
  const { Preferences } = await import("@capacitor/preferences");
  vi.mocked(Preferences.get).mockResolvedValue({ value: null });
  const { finishLogin } = await import("../src/login");
  await expect(finishLogin(`kakomonai://auth?code=${code}&state=${state}`, SITE, undefined, true)).resolves.toBe(false);
  await expect(finishLogin(`kakomonai://auth?code=${code}&state=${state}`, SITE)).rejects.toThrow("ログインをやり直してください");
});
