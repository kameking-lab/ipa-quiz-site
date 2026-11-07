import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContentEndAd } from "@/components/ads/ContentEndAd";
const store = vi.hoisted(() => ({ state: { available: false, ready: false, client: "ca-pub-1234567890123456", slot: "1234567890" } }));
vi.mock("@/lib/ads/native-consent", () => ({
  getNativeAdsState: () => store.state,
  getNativeAdsServerState: () => store.state,
  subscribeNativeAds: () => () => {},
  startNativeAds: () => Promise.resolve(),
}));
vi.mock("@/mobile/shared/contracts", () => ({ nativeClient: () => Boolean((window as unknown as { nativeTest?: boolean }).nativeTest) }));

vi.mock("next/script", () => ({
  default: ({ onReady, onError }: { onReady?: () => void; onError?: () => void }) => (
    <><button data-testid="load-ad-script" onClick={onReady}>load</button><button data-testid="error-ad-script" onClick={onError}>fail</button></>
  ),
}));

describe("ContentEndAd", () => {
  let resizeCallback: ResizeObserverCallback;
  let intersectionCallback: IntersectionObserverCallback;
  let idleCallbacks: Map<number, () => void>;
  const flushIdle = () => act(() => {
    const pending = [...idleCallbacks.values()];
    idleCallbacks.clear();
    pending.forEach(callback => callback());
  });
  const approachPlacement = () => {
    act(() => intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    flushIdle();
  };

  beforeEach(() => {
    store.state = { ...store.state, available: false, ready: false };
    window.adsbygoogle = [];
    idleCallbacks = new Map();
    let nextIdleId = 0;
    vi.stubGlobal("requestIdleCallback", (callback: () => void) => { idleCallbacks.set(++nextIdleId, callback); return nextIdleId; });
    vi.stubGlobal("cancelIdleCallback", (id: number) => idleCallbacks.delete(id));
    vi.stubGlobal("IntersectionObserver", class {
      constructor(callback: IntersectionObserverCallback) { intersectionCallback = callback; }
      observe() {}
      disconnect() {}
    });
    vi.stubGlobal("ResizeObserver", class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallback = callback;
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    });
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      width: 640,
      height: 0,
      top: 0,
      right: 640,
      bottom: 0,
      left: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
  });

  afterEach(() => {
    delete (window as unknown as { nativeTest?: boolean }).nativeTest;
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("does not mount the script or request ads in the native WebView", () => {
    (window as unknown as { nativeTest?: boolean }).nativeTest = true;
    const { container, queryByTestId } = render(<ContentEndAd />);
    expect(container.querySelector("ins")).toBeNull();
    expect(queryByTestId("load-ad-script")).toBeNull();
    expect(window.adsbygoogle).toHaveLength(0);
  });

  it("uses build-provided ad IDs only after native consent and registration are ready", () => {
    (window as unknown as { nativeTest?: boolean }).nativeTest = true;
    store.state = { ...store.state, available: true, ready: true };
    const { container, getByTestId } = render(<ContentEndAd />);
    expect(container.querySelector("ins")).toHaveAttribute("data-ad-client", "ca-pub-1234567890123456");
    expect(container.querySelector("ins")).toHaveAttribute("data-ad-slot", "1234567890");
    approachPlacement();
    fireEvent.click(getByTestId("load-ad-script"));
    flushIdle();
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it("hides a failed ad script without affecting surrounding learning content", () => {
    const { container, getByTestId, getByText } = render(<><p>学習コンテンツ</p><ContentEndAd /></>);
    approachPlacement();
    fireEvent.click(getByTestId("error-ad-script"));
    expect(container.querySelector("aside")).toHaveClass("hidden");
    expect(getByText("学習コンテンツ")).toBeVisible();
  });

  it("requests the configured content-end unit once after the lazy script is ready", () => {
    const { container, getByTestId } = render(<ContentEndAd />);
    const ad = container.querySelector("ins.adsbygoogle");
    expect(ad).toHaveAttribute("data-ad-client", "ca-pub-8751260838396451");
    expect(ad).toHaveAttribute("data-ad-slot", "3773902048");
    expect(ad).toHaveAttribute("data-ad-format", "auto");
    expect(ad).toHaveAttribute("data-full-width-responsive", "true");

    approachPlacement();
    fireEvent.click(getByTestId("load-ad-script"));
    fireEvent.click(getByTestId("load-ad-script"));
    expect(window.adsbygoogle).toHaveLength(0);
    flushIdle();
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it("hides an unfilled placement instead of leaving an empty ad area", async () => {
    const { container } = render(<ContentEndAd />);
    const ad = container.querySelector("ins.adsbygoogle");
    ad?.setAttribute("data-ad-status", "unfilled");
    await waitFor(() => expect(container.querySelector("aside")).toHaveClass("hidden"));
  });

  it("retries after a zero-width placement becomes visible", () => {
    const width = vi
      .spyOn(HTMLElement.prototype, "getBoundingClientRect")
      .mockReturnValueOnce({ width: 0 } as DOMRect)
      .mockReturnValue({ width: 640 } as DOMRect);
    const { getByTestId } = render(<ContentEndAd />);
    approachPlacement();
    fireEvent.click(getByTestId("load-ad-script"));
    flushIdle();
    expect(window.adsbygoogle).toHaveLength(0);
    resizeCallback([], {} as ResizeObserver);
    flushIdle();
    expect(width).toHaveBeenCalled();
    expect(window.adsbygoogle).toHaveLength(1);
  });

  it("does not load the script offscreen and waits for idle after approaching the placement", () => {
    const { queryByTestId } = render(<ContentEndAd />);
    flushIdle();
    expect(queryByTestId("load-ad-script")).toBeNull();
    act(() => intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
    flushIdle();
    expect(queryByTestId("load-ad-script")).toBeNull();
    act(() => intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(queryByTestId("load-ad-script")).toBeNull();
    flushIdle();
    expect(queryByTestId("load-ad-script")).not.toBeNull();
  });

  it("cancels pending ad work on unmount", () => {
    const { getByTestId, unmount } = render(<ContentEndAd />);
    approachPlacement();
    fireEvent.click(getByTestId("load-ad-script"));
    unmount();
    flushIdle();
    expect(window.adsbygoogle).toHaveLength(0);
  });

  it("still loads at idle when IntersectionObserver is unavailable", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    const { queryByTestId } = render(<ContentEndAd />);
    expect(queryByTestId("load-ad-script")).toBeNull();
    flushIdle();
    expect(queryByTestId("load-ad-script")).not.toBeNull();
  });
});
