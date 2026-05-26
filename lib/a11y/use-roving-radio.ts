"use client";

import * as React from "react";

/**
 * Roving-tabindex keyboard support for a custom `role="radiogroup"` built from
 * `<button role="radio">` elements (phase 12 / F-1). Spread `getRadioProps(i)`
 * onto each radio button (in map order). Behaviour follows the WCAG radio
 * pattern: Arrow keys move focus + selection, Home/End jump to ends, and the
 * group is a single Tab stop (only the selected — or first — radio is tabbable).
 *
 * `values` must list the selectable values in render order; `selected` is the
 * current value; `onSelect` commits a value.
 */
export function useRovingRadioGroup<T>(
  values: readonly T[],
  selected: T | null | undefined,
  onSelect: (value: T) => void,
) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = selected == null ? -1 : values.indexOf(selected);
  // ARIA: when nothing is selected the first radio is the tab stop.
  const tabStopIndex = selectedIndex === -1 ? 0 : selectedIndex;

  const move = React.useCallback(
    (to: number) => {
      const n = values.length;
      if (n === 0) return;
      const idx = ((to % n) + n) % n;
      onSelect(values[idx]);
      refs.current[idx]?.focus();
    },
    [values, onSelect],
  );

  function getRadioProps(index: number) {
    return {
      ref: (el: HTMLButtonElement | null) => {
        refs.current[index] = el;
      },
      tabIndex: index === tabStopIndex ? 0 : -1,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            e.preventDefault();
            move(index + 1);
            break;
          case "ArrowUp":
          case "ArrowLeft":
            e.preventDefault();
            move(index - 1);
            break;
          case "Home":
            e.preventDefault();
            move(0);
            break;
          case "End":
            e.preventDefault();
            move(values.length - 1);
            break;
        }
      },
    };
  }

  return { getRadioProps };
}
