import "@testing-library/jest-dom";
import { beforeEach, vi } from "vitest";

// JSDOM-only fixture: global setup also runs in Node-environment suites.
// JSDOM has no layout/scrolling or media-query engine. Supply observable browser
// API fixtures, not simulated geometry. Tests can override matches/dispatch
// change events; real viewport and scroll position remain browser-test concerns.
beforeEach(() => {
  if (typeof window === "undefined" || typeof HTMLElement === "undefined") return;
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn((query: string): MediaQueryList => {
      const events = new EventTarget();
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: events.addEventListener.bind(events),
        removeEventListener: events.removeEventListener.bind(events),
        dispatchEvent: events.dispatchEvent.bind(events),
      };
    }),
  });
  Object.defineProperty(window, "scrollTo", { configurable: true, writable: true, value: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "scrollTo", { configurable: true, writable: true, value: vi.fn() });
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, writable: true, value: vi.fn() });
});
