/**
 * Focus-trap helpers for modal dialogs (WCAG 2.1.2 No Keyboard Trap / 2.4.3
 * Focus Order). A `role="dialog" aria-modal="true"` element must keep Tab focus
 * within itself; otherwise keyboard / screen-reader users tab straight into the
 * inert background behind the modal.
 *
 * The decision of *where* Tab should send focus is pure (no DOM), so it lives
 * here and is unit-tested directly; the thin DOM glue (querying focusables,
 * calling `.focus()`) stays in the component.
 */

/** Selector for elements that can receive keyboard focus inside a dialog. */
export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Given the focusable elements in DOM order, the currently focused element, and
 * whether Shift is held, return the element Tab should move focus to in order to
 * stay trapped — or `null` to let the browser handle the move normally.
 *
 * - Forward Tab from the last element (or from outside the dialog) → wrap to first.
 * - Shift+Tab from the first element (or from outside) → wrap to last.
 * - Anything in the middle returns `null` (native Tab moves to the neighbour).
 */
export function trapTabTarget<T>(
  focusables: readonly T[],
  active: T | null,
  shiftKey: boolean,
): T | null {
  if (focusables.length === 0) return null;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  const index = active == null ? -1 : focusables.indexOf(active);

  if (shiftKey) {
    // At the first element, or focus is outside the trap → wrap to the end.
    if (index === 0 || index === -1) return last;
    return null;
  }
  // At the last element, or focus is outside the trap → wrap to the start.
  if (index === focusables.length - 1 || index === -1) return first;
  return null;
}
