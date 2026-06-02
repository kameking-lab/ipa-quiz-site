import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { trapTabTarget } from "@/lib/a11y/focus-trap";

// trapTabTarget decides where Tab should wrap so focus stays inside a modal
// dialog (WCAG 2.4.3). If this regresses, keyboard users tab into the inert
// page behind an aria-modal CopilotMobileSheet.
describe("trapTabTarget — modal Tab wrapping", () => {
  const els = ["a", "b", "c"] as const;

  it("forward Tab from the last element wraps to the first", () => {
    expect(trapTabTarget(els, "c", false)).toBe("a");
  });

  it("Shift+Tab from the first element wraps to the last", () => {
    expect(trapTabTarget(els, "a", true)).toBe("c");
  });

  it("forward Tab in the middle is left to the browser (null)", () => {
    expect(trapTabTarget(els, "b", false)).toBeNull();
  });

  it("Shift+Tab in the middle is left to the browser (null)", () => {
    expect(trapTabTarget(els, "b", true)).toBeNull();
  });

  it("focus outside the trap is pulled to the first (forward) / last (shift)", () => {
    expect(trapTabTarget(els, null, false)).toBe("a");
    expect(trapTabTarget(els, null, true)).toBe("c");
  });

  it("an empty dialog returns null (nothing to focus)", () => {
    expect(trapTabTarget([], null, false)).toBeNull();
    expect(trapTabTarget([], null, true)).toBeNull();
  });

  it("a single focusable wraps to itself in both directions", () => {
    expect(trapTabTarget(["only"], "only", false)).toBe("only");
    expect(trapTabTarget(["only"], "only", true)).toBe("only");
  });
});

// The pure helper above is only useful if the copilot dialogs actually wire it
// onto their aria-modal containers. Pin the wiring so the trap can't be silently
// removed (the panel renders too heavily to mount cheaply in jsdom). Both the
// mobile sheet and the desktop floating panel must trap Tab.
describe("Copilot dialogs — focus trap is wired to the dialog", () => {
  const source = readFileSync(
    join(process.cwd(), "components/copilot/CopilotPanel.tsx"),
    "utf8",
  );

  it("imports and calls trapTabTarget", () => {
    expect(source).toMatch(/import\s*\{[^}]*trapTabTarget[^}]*\}\s*from\s*"@\/lib\/a11y\/focus-trap"/);
    expect(source).toContain("trapTabTarget(");
  });

  it("both aria-modal dialogs (mobile sheet + desktop floating) have an onKeyDown trap", () => {
    // Each dialog container carries role="dialog" / aria-modal + onKeyDown.
    const wired = source.match(/onKeyDown=\{onDialogKeyDown\}/g) ?? [];
    expect(wired.length).toBeGreaterThanOrEqual(2);
  });
});

// The stream player's ReviewOverlay is another custom role="dialog"
// aria-modal="true" that must trap Tab and restore focus to its trigger (which
// unmounts while the overlay is open). The player is fiddly to drive into the
// canReview state in jsdom, so pin the wiring instead.
describe("StreamQuizPlayer ReviewOverlay — focus trap & restore are wired", () => {
  const source = readFileSync(
    join(process.cwd(), "components/quiz/stream/StreamQuizPlayer.tsx"),
    "utf8",
  );

  it("imports and calls trapTabTarget", () => {
    expect(source).toMatch(/import\s*\{[^}]*trapTabTarget[^}]*\}\s*from\s*"@\/lib\/a11y\/focus-trap"/);
    expect(source).toContain("trapTabTarget(");
  });

  it("the aria-modal overlay has an onKeyDown trap", () => {
    expect(source).toMatch(/onKeyDown=\{onDialogKeyDown\}/);
  });

  it("restores focus to the review trigger when the overlay closes", () => {
    // The trigger button carries the ref, and a close-transition effect focuses
    // it back so keyboard users are not stranded at document.body.
    expect(source).toContain("ref={reviewTriggerRef}");
    expect(source).toMatch(/reviewTriggerRef\.current\?\.focus/);
  });
});
