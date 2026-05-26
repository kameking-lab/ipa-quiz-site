"use client";

import * as React from "react";

/**
 * Roving-tabindex keyboard support for the quiz answer choices, built as a
 * `role="radiogroup"` of `<button role="radio">` elements.
 *
 * Unlike useRovingRadioGroup (which commits selection on arrow — fine for
 * theme/character pickers), selecting a quiz choice *reveals the answer
 * irreversibly*, so this hook is FOCUS-ONLY: arrow keys move focus between
 * choices WITHOUT committing. Committing is the button's native activation
 * (Space/Enter/click → onClick → onSelect). WCAG radio pattern: single Tab stop
 * (the selected radio, or the roved one before any selection), Arrow keys move
 * focus, Home/End jump to ends.
 *
 * @param count        number of choices
 * @param selectedIndex index of the committed choice, or -1 if none
 * @param disabled     when true (answer revealed) arrows are inert
 * @param resetKey     changes per question so roving focus resets to the first choice
 */
export function useQuizChoiceRoving(
  count: number,
  selectedIndex: number,
  disabled: boolean,
  resetKey: string,
) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const [focusIdx, setFocusIdx] = React.useState(0);

  // New question → roving tab stop returns to the first choice.
  React.useEffect(() => {
    setFocusIdx(0);
  }, [resetKey]);

  // Before any selection the roved index is the tab stop; once a choice is
  // committed the selected radio becomes the single tab stop.
  const tabStop = selectedIndex >= 0 ? selectedIndex : focusIdx;

  function getRadioProps(index: number) {
    return {
      ref: (el: HTMLButtonElement | null) => {
        refs.current[index] = el;
      },
      tabIndex: index === tabStop ? 0 : -1,
      onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (disabled || count === 0) return;
        let next = -1;
        switch (e.key) {
          case "ArrowDown":
          case "ArrowRight":
            next = (index + 1) % count;
            break;
          case "ArrowUp":
          case "ArrowLeft":
            next = (index - 1 + count) % count;
            break;
          case "Home":
            next = 0;
            break;
          case "End":
            next = count - 1;
            break;
          default:
            return;
        }
        e.preventDefault();
        setFocusIdx(next);
        refs.current[next]?.focus();
      },
    };
  }

  return { getRadioProps };
}
