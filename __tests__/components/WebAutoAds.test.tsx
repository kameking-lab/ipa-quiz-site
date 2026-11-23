import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ContentEndAd } from "@/components/ads/ContentEndAd";
import { WebAutoAds } from "@/components/ads/WebAutoAds";
import { WEB_ADS_ERROR_PAGE_ID, WEB_ADS_SCRIPT_ID, WEB_ADS_SCRIPT_URL, webAdsNavigation } from "@/lib/ads/web-ads";
import { SYNC_SESSION_CHANGED } from "@/lib/sync/session-observation";

const hooks = vi.hoisted(() => ({ pathname: "/", native: false }));
vi.mock("next/navigation", () => ({ usePathname: () => hooks.pathname }));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => hooks.native }));

describe("WebAutoAds", () => {
  const request = vi.fn<typeof fetch>();
  let idle: Map<number, () => void>;
  let readyState: DocumentReadyState;
  const flushIdle = () => act(() => { for (const task of idle.values()) task(); idle.clear(); });
  const script = () => document.getElementById(WEB_ADS_SCRIPT_ID) as HTMLScriptElement | null;

  beforeEach(() => {
    hooks.pathname = "/";
    hooks.native = false;
    history.replaceState(null, "", "/");
    readyState = "complete";
    vi.spyOn(document, "readyState", "get").mockImplementation(() => readyState);
    request.mockReset();
    vi.stubGlobal("fetch", request);
    vi.stubGlobal("BroadcastChannel", undefined);
    idle = new Map();
    let id = 0;
    vi.stubGlobal("requestIdleCallback", (task: () => void) => { idle.set(++id, task); return id; });
    vi.stubGlobal("cancelIdleCallback", (handle: number) => idle.delete(handle));
  });

  afterEach(() => {
    cleanup();
    script()?.remove();
    document.documentElement.removeAttribute("data-web-ads-paused");
    document.documentElement.removeAttribute("data-web-ads-reloading");
    delete document.documentElement.dataset.homeEventLayout;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each([
    ["guest", { error: "sign_in_required" }, 401],
    ["signed-in free member", { entitled: false }, 200],
  ])("loads once at idle for a confirmed %s even beside a blog slot", async (_kind, body, status) => {
    request.mockImplementation(async () => Response.json(body, { status }));
    render(<><WebAutoAds /><ContentEndAd /></>);
    await waitFor(() => expect(idle.size).toBe(1));
    expect(script()).toBeNull();
    flushIdle();
    expect(script()).toHaveAttribute("src", WEB_ADS_SCRIPT_URL);
    await act(async () => { window.dispatchEvent(new Event(SYNC_SESSION_CHANGED)); });
    flushIdle();
    expect(document.querySelectorAll(`script[src="${WEB_ADS_SCRIPT_URL}"]`)).toHaveLength(1);
  });

  it.each([
    [{ entitled: true }, 200],
    [{ entitled: true, appStore: true }, 200],
    [{ error: "billing_unavailable" }, 503],
    [{ error: "wrong_401" }, 401],
    [{}, 200],
  ])("keeps ads blocked for %j (HTTP %i)", async (body, status) => {
    request.mockResolvedValue(Response.json(body, { status }));
    await act(async () => { render(<WebAutoAds />); });
    expect(request).toHaveBeenCalledTimes(1);
    flushIdle();
    expect(script()).toBeNull();
  });

  it("waits while the initial check is unresolved", () => {
    request.mockReturnValue(new Promise(() => {}));
    render(<WebAutoAds />);
    expect(request).toHaveBeenCalledTimes(1);
    flushIdle();
    expect(script()).toBeNull();
  });

  it("waits for the browser load event before starting the check", () => {
    readyState = "interactive";
    render(<WebAutoAds />);
    expect(request).not.toHaveBeenCalled();
    expect(script()).toBeNull();
  });

  it("waits for the seasonal home hero even when hydration inserts it after window load", async () => {
    request.mockResolvedValue(Response.json({ entitled: false }));
    document.documentElement.dataset.homeEventLayout = "labor";
    const slot = document.createElement("div");
    slot.className = "p3-event-art-slot";
    const { container } = render(<WebAutoAds />);
    container.appendChild(slot);
    await act(async () => {});
    flushIdle();
    expect(script()).toBeNull();

    const picture = document.createElement("picture");
    slot.appendChild(picture);
    picture.setAttribute("data-home-event-ready", "true");
    await waitFor(() => expect(idle.size).toBe(1));
    flushIdle();
    expect(script()).toHaveAttribute("src", WEB_ADS_SCRIPT_URL);
  });

  it("does not check membership or load ads in the native app", () => {
    hooks.native = true;
    render(<WebAutoAds />);
    expect(request).not.toHaveBeenCalled();
    expect(script()).toBeNull();
  });

  it.each(["/quiz", "/quiz/today", "/auth/signin", "/account/dashboard", "/me", "/settings/api-keys",
    "/billing/success", "/checkout/result", "/admin", "/api/questions", "/api-docs", "/offline", "/search", "/modes/topic", "/%71uiz/today"])(
    "does not check membership or load ads on %s", pathname => {
      hooks.pathname = pathname;
      history.replaceState(null, "", pathname);
      render(<WebAutoAds />);
      expect(request).not.toHaveBeenCalled();
      expect(script()).toBeNull();
    },
  );

  it("excludes a not-found response whose pathname looks eligible", () => {
    render(<><WebAutoAds /><div id="main-content"><main id={WEB_ADS_ERROR_PAGE_ID} /></div></>);
    expect(request).not.toHaveBeenCalled();
    expect(script()).toBeNull();
  });

  it("cancels a queued tag if navigation reaches an excluded page", async () => {
    request.mockResolvedValue(Response.json({ entitled: false }));
    const { rerender } = render(<WebAutoAds />);
    await waitFor(() => expect(idle.size).toBe(1));
    hooks.pathname = "/quiz/today";
    history.pushState(null, "", hooks.pathname);
    rerender(<WebAutoAds />);
    flushIdle();
    expect(script()).toBeNull();
  });

  it("leaves navigation alone after the tag fails to load", async () => {
    const reload = vi.spyOn(webAdsNavigation, "reload").mockImplementation(() => {});
    request.mockResolvedValueOnce(Response.json({ entitled: false }));
    const { rerender } = render(<WebAutoAds />);
    await waitFor(() => expect(idle.size).toBe(1));
    flushIdle();
    fireEvent.error(script()!);
    hooks.pathname = "/settings";
    history.pushState(null, "", hooks.pathname);
    rerender(<WebAutoAds />);
    expect(reload).not.toHaveBeenCalled();
  });

  it.each(["paid", "excluded", "error"])("reloads an ad-bearing document when it becomes %s", async reason => {
    const reload = vi.spyOn(webAdsNavigation, "reload").mockImplementation(() => {});
    request.mockResolvedValueOnce(Response.json({ entitled: false }));
    const { rerender } = render(<><WebAutoAds /><div id="main-content" /></>);
    await waitFor(() => expect(idle.size).toBe(1));
    flushIdle();
    expect(script()).not.toBeNull();

    if (reason === "paid") {
      request.mockResolvedValueOnce(Response.json({ entitled: true }));
      window.dispatchEvent(new Event(SYNC_SESSION_CHANGED));
    } else if (reason === "excluded") {
      hooks.pathname = "/settings";
      history.pushState(null, "", hooks.pathname);
      rerender(<><WebAutoAds /><div id="main-content" /></>);
    } else {
      rerender(<><WebAutoAds /><div id="main-content"><main id={WEB_ADS_ERROR_PAGE_ID} /></div></>);
    }
    await waitFor(() => expect(reload).toHaveBeenCalledTimes(1));
    expect(document.documentElement).toHaveAttribute("data-web-ads-reloading");
  });
});
