import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";

import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";

beforeEach(() => {
  cleanup();
});

// The keyboard-shortcuts help is a role="dialog" aria-modal="true" overlay
// opened with "?". aria-modal alone does not stop Tab from escaping into the
// inert page behind it, and a global-key-triggered dialog must move focus in
// on open and restore it on close (WCAG 2.4.3 Focus Order).
describe("KeyboardShortcutsHelp — modal focus management", () => {
  it("opens with '?' and pushes focus to the close button", async () => {
    render(<KeyboardShortcutsHelp />);
    fireEvent.keyDown(window, { key: "?" });

    await waitFor(() => {
      const close = document.querySelector<HTMLButtonElement>(
        'button[aria-label="閉じる"]',
      );
      expect(close).not.toBeNull();
      expect(document.activeElement).toBe(close);
    });
  });

  it("traps Tab on the single focusable (close button) instead of escaping", async () => {
    render(<KeyboardShortcutsHelp />);
    fireEvent.keyDown(window, { key: "?" });

    const dialog = await waitFor(() => {
      const d = document.querySelector<HTMLDivElement>('[role="dialog"]');
      expect(d).not.toBeNull();
      return d as HTMLDivElement;
    });
    const close = document.querySelector<HTMLButtonElement>(
      'button[aria-label="閉じる"]',
    )!;

    // Forward Tab and Shift+Tab both wrap back to the only focusable element,
    // and the default (which would move focus into the page) is prevented.
    const fwd = fireEvent.keyDown(dialog, { key: "Tab" });
    expect(fwd).toBe(false); // preventDefault() was called
    expect(document.activeElement).toBe(close);

    const back = fireEvent.keyDown(dialog, { key: "Tab", shiftKey: true });
    expect(back).toBe(false);
    expect(document.activeElement).toBe(close);
  });

  it("restores focus to the trigger when closed with Escape", async () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    render(<KeyboardShortcutsHelp />);
    fireEvent.keyDown(window, { key: "?" });
    await waitFor(() =>
      expect(document.querySelector('[role="dialog"]')).not.toBeNull(),
    );

    fireEvent.keyDown(window, { key: "Escape" });
    await waitFor(() => {
      expect(document.querySelector('[role="dialog"]')).toBeNull();
      expect(document.activeElement).toBe(trigger);
    });

    trigger.remove();
  });
});
