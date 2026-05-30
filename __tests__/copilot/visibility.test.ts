import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  isCopilotOpen,
  setCopilotPanelOpen,
  subscribeCopilotOpen,
} from "@/lib/copilot/visibility";

// openCount is module-level singleton state. The clamp guarantees that
// repeated close() calls floor at 0, so draining is a reliable reset.
function drainToClosed(): void {
  for (let i = 0; i < 4; i += 1) setCopilotPanelOpen(false);
}

beforeEach(() => {
  drainToClosed();
});

describe("copilot panel visibility signal", () => {
  it("starts (after drain) closed", () => {
    expect(isCopilotOpen()).toBe(false);
  });

  it("opens when a panel reports open and closes when it reports closed", () => {
    setCopilotPanelOpen(true);
    expect(isCopilotOpen()).toBe(true);
    setCopilotPanelOpen(false);
    expect(isCopilotOpen()).toBe(false);
  });

  it("stays open while either of two mounted variants is still open (count semantics)", () => {
    // Desktop + mobile both mounted and open.
    setCopilotPanelOpen(true);
    setCopilotPanelOpen(true);
    expect(isCopilotOpen()).toBe(true);
    // One variant closes — the other is still open.
    setCopilotPanelOpen(false);
    expect(isCopilotOpen()).toBe(true);
    // The last one closes.
    setCopilotPanelOpen(false);
    expect(isCopilotOpen()).toBe(false);
  });

  it("clamps at zero so a stray close cannot desync the count", () => {
    // A close with no matching open must not drive the count negative;
    // otherwise the next genuine open would fail to flip the signal.
    setCopilotPanelOpen(false);
    expect(isCopilotOpen()).toBe(false);
    setCopilotPanelOpen(true);
    expect(isCopilotOpen()).toBe(true);
  });

  it("notifies subscribers on every change and stops after unsubscribe", () => {
    const onChange = vi.fn();
    const unsubscribe = subscribeCopilotOpen(onChange);

    setCopilotPanelOpen(true);
    setCopilotPanelOpen(false);
    expect(onChange).toHaveBeenCalledTimes(2);

    unsubscribe();
    setCopilotPanelOpen(true);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});
