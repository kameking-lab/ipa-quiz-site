import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MobileInstallProvider } from "@/components/pwa/MobileInstallProvider";
import { MobileInstallNudge } from "@/components/pwa/MobileInstallNudge";
import { MobileInstallControl } from "@/components/pwa/MobileInstallControl";
import { LS_KEYS } from "@/lib/storage/keys";
import { canShowInstallNudge, INSTALL_DISMISS_MS, installDay } from "@/lib/pwa/install-nudge";

const android = "Mozilla/5.0 (Linux; Android 15) Chrome/130.0 Mobile Safari/537.36";
const now = Date.parse("2026-11-17T03:00:00Z");
let visible: () => void;
const originalUa = navigator.userAgent;
const add = () => screen.queryByRole("button", { name: "ホーム画面に追加" });
function event(outcome: "accepted" | "dismissed" = "dismissed") {
  const value = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
    prompt: vi.fn(async () => {}), userChoice: Promise.resolve({ outcome, platform: "web" }),
  });
  act(() => { window.dispatchEvent(value); });
  return value;
}
function app(answered = 3, placement: "answer" | "daily-limit" = "answer") {
  return <StrictMode><MobileInstallProvider><MobileInstallNudge answered={answered} placement={placement} /></MobileInstallProvider></StrictMode>;
}

beforeEach(() => {
  localStorage.clear();
  vi.spyOn(Date, "now").mockReturnValue(now);
  Object.defineProperty(navigator, "userAgent", { configurable: true, value: android });
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: IntersectionObserverCallback) {
      visible = () => callback([{ isIntersecting: true, intersectionRatio: 1 } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    observe() {} unobserve() {} disconnect() {}
  });
});
afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals();
  Object.defineProperty(navigator, "userAgent", { configurable: true, value: originalUa });
  Reflect.deleteProperty(navigator, "getInstalledRelatedApps");
  Reflect.deleteProperty(navigator, "standalone");
  Reflect.deleteProperty(window, "Capacitor");
});

describe("install invitation timing", () => {
  it("waits for three answers and an installable browser, and records actual visibility", () => {
    const view = render(app(0));
    event(); expect(add()).toBeNull();
    view.rerender(app(2)); expect(add()).toBeNull();
    view.rerender(app(3)); expect(add()).toBeVisible();
    expect(JSON.parse(localStorage.getItem(LS_KEYS.mobileInstallNudge)!)).not.toHaveProperty("shownDay");
    act(() => visible());
    expect(JSON.parse(localStorage.getItem(LS_KEYS.mobileInstallNudge)!)).toEqual({ shownDay: installDay(now) });
  });
  it("does not offer without beforeinstallprompt", () => { render(app()); expect(add()).toBeNull(); });
  it("does not repeat at the limit after an answer invitation was seen", () => {
    const view = render(app()); event(); act(() => visible());
    view.unmount(); render(app(0, "daily-limit")); event();
    expect(add()).toBeNull();
  });
  it("offers at the limit when an offscreen answer invitation was never seen", () => {
    const view = render(app()); event(); view.unmount();
    render(app(0, "daily-limit")); event(); expect(add()).toBeVisible();
  });
  it("renders only one invitation when two placements mount", () => {
    render(<MobileInstallProvider><MobileInstallNudge placement="answer" answered={3} /><MobileInstallNudge placement="daily-limit" /></MobileInstallProvider>);
    event(); expect(screen.getAllByRole("button", { name: "ホーム画面に追加" })).toHaveLength(1);
  });
  it("closes for thirty days", () => {
    render(app()); event(); fireEvent.click(screen.getByRole("button", { name: /7日間閉じる/ }));
    expect(add()).toBeNull();
    expect(JSON.parse(localStorage.getItem(LS_KEYS.mobileInstallNudge)!)).toMatchObject({ dismissedAt: now });
  });
  it("treats dismissal of the browser confirmation as thirty-day dismissal", async () => {
    render(app()); const prompt = event();
    await act(async () => { fireEvent.click(add()!); });
    expect(prompt.prompt).toHaveBeenCalledTimes(1);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.mobileInstallNudge)!)).toMatchObject({ dismissedAt: now });
    expect(add()).toBeNull();
  });
  it("does not persist accepted as installed; appinstalled persists across reloads", async () => {
    const view = render(app()); event("accepted");
    await act(async () => { fireEvent.click(add()!); });
    expect(localStorage.getItem(LS_KEYS.mobileInstalled)).toBeNull();
    act(() => window.dispatchEvent(new Event("appinstalled")));
    expect(localStorage.getItem(LS_KEYS.mobileInstalled)).toBe("1");
    view.unmount(); localStorage.removeItem(LS_KEYS.mobileInstallNudge);
    render(app()); event(); expect(add()).toBeNull();
  });
  it.each(["iphone", "desktop", "native", "standalone", "ios-standalone", "installed"])("suppresses %s", (kind) => {
    if (kind === "iphone") Object.defineProperty(navigator, "userAgent", { configurable: true, value: "iPhone Version/18 Mobile Safari" });
    if (kind === "desktop") Object.defineProperty(navigator, "userAgent", { configurable: true, value: "Windows Chrome/130" });
    if (kind === "native") Object.defineProperty(window, "Capacitor", { configurable: true, value: { isNativePlatform: () => true } });
    if (kind === "standalone") vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
    if (kind === "ios-standalone") Object.defineProperty(navigator, "standalone", { configurable: true, value: true });
    if (kind === "installed") localStorage.setItem(LS_KEYS.mobileInstalled, "1");
    render(app()); event(); expect(add()).toBeNull();
  });
  it("waits for related apps and suppresses an installed self PWA", async () => {
    let resolve!: (apps: { platform: string; url: string }[]) => void;
    Object.defineProperty(navigator, "getInstalledRelatedApps", { configurable: true,
      value: () => new Promise<{ platform: string; url: string }[]>((done) => { resolve = done; }) });
    // Without StrictMode here so the deferred API has one pending request.
    render(<MobileInstallProvider><MobileInstallNudge placement="daily-limit" /></MobileInstallProvider>);
    event(); expect(add()).toBeNull();
    await act(async () => resolve([{ platform: "webapp", url: new URL("/manifest.webmanifest", location.origin).href }]));
    expect(add()).toBeNull(); expect(localStorage.getItem(LS_KEYS.mobileInstalled)).toBe("1");
  });
  it("still offers when related-app detection fails", async () => {
    Object.defineProperty(navigator, "getInstalledRelatedApps", { configurable: true, value: () => Promise.reject(new Error("unavailable")) });
    render(app()); await act(async () => {}); event(); expect(add()).toBeVisible();
  });
  it.each(["read", "write", "corrupt"])("suppresses when storage cannot be trusted: %s", (kind) => {
    if (kind === "read") vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    if (kind === "write") vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
    if (kind === "corrupt") localStorage.setItem(LS_KEYS.mobileInstallNudge, '{"dismissedAt":"yesterday"}');
    render(app()); event(); expect(add()).toBeNull();
  });
  it("dismisses the current invitation when another tab dismisses it", () => {
    render(app()); event();
    act(() => { localStorage.setItem(LS_KEYS.mobileInstallNudge, JSON.stringify({ dismissedAt: now })); window.dispatchEvent(new StorageEvent("storage", { key: LS_KEYS.mobileInstallNudge })); });
    expect(add()).toBeNull();
  });
  it("allows the next day after a seen invitation", () => {
    localStorage.setItem(LS_KEYS.mobileInstallNudge, JSON.stringify({ shownDay: installDay(now - 86400000) }));
    render(app()); event(); expect(add()).toBeVisible();
  });
  it("remembers cancellation from settings when practice opens the next day", async () => {
    const view = render(<MobileInstallProvider><MobileInstallControl /></MobileInstallProvider>);
    event();
    await act(async () => { fireEvent.click(add()!); });
    view.unmount();
    vi.mocked(Date.now).mockReturnValue(now + 86400000);
    render(app()); event();
    expect(add()).toBeNull();
    expect(JSON.parse(localStorage.getItem(LS_KEYS.mobileInstallNudge)!)).toMatchObject({ dismissedAt: now });
  });
  it.each([1, 29, 30])("keeps a close across remounts until day 30: day %s", (days) => {
    const view = render(app()); event();
    fireEvent.click(screen.getByRole("button", { name: /7日間閉じる/ }));
    view.unmount();
    vi.mocked(Date.now).mockReturnValue(now + days * 86400000);
    render(app()); event();
    if (days < 30) expect(add()).toBeNull();
    else expect(add()).toBeVisible();
  });
  it("waits for an uninstalled result even if the prompt event arrives first", async () => {
    let resolve!: (apps: []) => void;
    Object.defineProperty(navigator, "getInstalledRelatedApps", { configurable: true,
      value: () => new Promise<[]>((done) => { resolve = done; }) });
    render(<MobileInstallProvider><MobileInstallNudge placement="answer" answered={3} /></MobileInstallProvider>);
    event(); expect(add()).toBeNull();
    expect(localStorage.getItem(LS_KEYS.mobileInstallNudge)).toBeNull();
    await act(async () => resolve([]));
    expect(add()).toBeVisible();
  });
  it("keeps an unseen invitation when another tab only checks storage availability", () => {
    render(app()); event();
    act(() => window.dispatchEvent(new StorageEvent("storage", {
      key: LS_KEYS.mobileInstallNudge, newValue: "{}", storageArea: localStorage,
    })));
    expect(add()).toBeVisible();
    act(() => visible());
    expect(JSON.parse(localStorage.getItem(LS_KEYS.mobileInstallNudge)!)).toMatchObject({ shownDay: installDay(now) });
  });
  it("ignores a session-storage event with the same key", () => {
    render(app()); event(); act(() => visible());
    act(() => window.dispatchEvent(new StorageEvent("storage", {
      key: LS_KEYS.mobileInstallNudge, storageArea: sessionStorage,
    })));
    expect(add()).toBeVisible();
  });
  it("hides immediately after installation in another tab", () => {
    render(app()); event(); expect(add()).toBeVisible();
    act(() => window.dispatchEvent(new StorageEvent("storage", {
      key: LS_KEYS.mobileInstalled, newValue: "1", storageArea: localStorage,
    })));
    expect(add()).toBeNull();
  });
  it("hides when another tab has already seen the invitation", () => {
    render(app()); event();
    act(() => {
      localStorage.setItem(LS_KEYS.mobileInstallNudge, JSON.stringify({ shownDay: installDay(now) }));
      window.dispatchEvent(new StorageEvent("storage", { key: LS_KEYS.mobileInstallNudge, storageArea: localStorage }));
    });
    expect(add()).toBeNull();
  });
});

describe("daily and thirty-day boundaries", () => {
  it("uses JST midnight, matching the free quota", () => {
    const beforeMidnight = Date.parse("2026-11-17T14:59:59.999Z");
    const record = { shownDay: installDay(beforeMidnight) };
    expect(canShowInstallNudge(record, beforeMidnight)).toBe(false);
    expect(canShowInstallNudge(record, beforeMidnight + 1)).toBe(true);
  });
  it("suppresses through day 29 and allows exactly thirty elapsed days", () => {
    expect(canShowInstallNudge({ dismissedAt: now }, now + INSTALL_DISMISS_MS - 1)).toBe(false);
    expect(canShowInstallNudge({ dismissedAt: now }, now + INSTALL_DISMISS_MS)).toBe(true);
  });
});

// Cross the independent browser, persistence and placement conditions. An
// eligible placement must never override a suppression condition.
const histories = ["new", "seen-today", "seen-yesterday", "closed-29-days", "closed-30-days", "corrupt", "read-blocked", "write-blocked"] as const;
const placements = [
  { placement: "answer", answered: 0 },
  { placement: "answer", answered: 2 },
  { placement: "answer", answered: 3 },
  { placement: "daily-limit", answered: 0 },
] as const;
interface InvitationCase {
  os: "android" | "iphone" | "desktop";
  native: boolean;
  standalone: boolean;
  installed: boolean;
  installable: boolean;
  history: (typeof histories)[number];
  placement: "answer" | "daily-limit";
  answered: number;
}
const combinations: InvitationCase[] = [];
for (const os of ["android", "iphone", "desktop"] as const)
  for (const native of [false, true])
    for (const standalone of [false, true])
      for (const installed of [false, true])
        for (const installable of [false, true])
          for (const history of histories)
            for (const placement of placements)
              combinations.push({ os, native, standalone, installed, installable, history, ...placement });

describe("all invitation condition combinations", () => {
  it.each(combinations)("$os native=$native standalone=$standalone installed=$installed prompt=$installable $history $placement/$answered", (test) => {
    Object.defineProperty(navigator, "userAgent", { configurable: true,
      value: test.os === "android" ? android : test.os === "iphone" ? "iPhone Version/18 Mobile Safari" : "Windows Chrome/130" });
    if (test.native) Object.defineProperty(window, "Capacitor", { configurable: true, value: { isNativePlatform: () => true } });
    if (test.standalone) vi.stubGlobal("matchMedia", () => ({ matches: true, addEventListener() {}, removeEventListener() {} }));
    if (test.installed) localStorage.setItem(LS_KEYS.mobileInstalled, "1");
    const records = {
      "new": {},
      "seen-today": { shownDay: installDay(now) },
      "seen-yesterday": { shownDay: installDay(now - 86400000) },
      "closed-29-days": { dismissedAt: now - 29 * 86400000 },
      "closed-30-days": { dismissedAt: now - 30 * 86400000 },
      "corrupt": { dismissedAt: "yesterday" },
      "read-blocked": {},
      "write-blocked": {},
    };
    localStorage.setItem(LS_KEYS.mobileInstallNudge, JSON.stringify(records[test.history]));
    if (test.history === "read-blocked") vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    if (test.history === "write-blocked") vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
    render(app(test.answered, test.placement));
    if (test.installable) event();
    const shouldShow = test.os === "android" && !test.native && !test.standalone && !test.installed && test.installable
      && ["new", "seen-yesterday", "closed-30-days"].includes(test.history)
      && (test.placement === "daily-limit" || test.answered >= 3);
    if (shouldShow) expect(add()).toBeVisible();
    else expect(add()).toBeNull();
  });
});
