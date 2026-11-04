import { act, cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ContentEndAd } from "@/components/ads/ContentEndAd";

vi.mock("next/script", () => ({
  default: ({ onReady }: { onReady?: () => void }) => (
    <button data-testid="load-ad-script" onClick={onReady}>load</button>
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
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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
