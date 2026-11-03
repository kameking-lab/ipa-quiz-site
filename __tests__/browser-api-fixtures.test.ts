import { describe, expect, it, vi } from "vitest";

describe("JSDOM browser API fixtures", () => {
  it("provides the requested media query and detachable change listeners", () => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    expect(media.media).toBe("(prefers-reduced-motion: reduce)");
    expect(media.matches).toBe(false);
    const listener = vi.fn();
    media.addEventListener("change", listener);
    media.dispatchEvent(new Event("change"));
    expect(listener).toHaveBeenCalledOnce();
    media.removeEventListener("change", listener);
    media.dispatchEvent(new Event("change"));
    expect(listener).toHaveBeenCalledOnce();
  });
  it("records scroll intent without claiming to emulate viewport geometry", () => {
    const element = document.createElement("div");
    element.scrollIntoView({ block: "start", behavior: "instant" });
    element.scrollTo({ top: 20 });
    window.scrollTo({ top: 0, behavior: "instant" });
    expect(element.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
    expect(element.scrollTo).toHaveBeenCalledWith({ top: 20 });
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });
});
