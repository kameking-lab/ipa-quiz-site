"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import type { ChoiceKey } from "@/lib/questions/types";

interface Props {
  choiceKey: ChoiceKey;
  text: string;
  revealed: boolean;
  selected: boolean;
  correct: boolean;
  disabled: boolean;
  onClick: () => void;
  shortcutIndex?: number;
  /** Roving-tabindex value from useQuizChoiceRoving (single Tab stop). */
  tabIndex?: number;
  /** Arrow-key roving handler from useQuizChoiceRoving. */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
}

const CHOICE_INDEX: Partial<Record<ChoiceKey, number>> = { ア: 1, イ: 2, ウ: 3, エ: 4 };

export const ChoiceButton = React.forwardRef<HTMLButtonElement, Props>(function ChoiceButton(
  {
    choiceKey,
    text,
    revealed,
    selected,
    correct,
    disabled,
    onClick,
    shortcutIndex,
    tabIndex,
    onKeyDown,
  },
  ref,
) {
  let state: "idle" | "selected" | "correct" | "wrong" | "revealed-correct" = "idle";
  if (revealed) {
    if (correct) state = "revealed-correct";
    else if (selected) state = "wrong";
  } else if (selected) {
    state = "selected";
  }

  const numberKey = shortcutIndex ?? CHOICE_INDEX[choiceKey] ?? 0;
  const baseLabel = `選択肢 ${choiceKey}: ${text}`;
  const stateLabel = !revealed
    ? `数字キー${numberKey}でも選択できます`
    : state === "revealed-correct"
      ? "（正解）"
      : state === "wrong"
        ? "（あなたが選んだ不正解）"
        : "";
  const ariaLabel = `${baseLabel} ${stateLabel}`.trim();

  return (
    <button
      ref={ref}
      type="button"
      role="radio"
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-checked={selected}
      aria-disabled={disabled}
      aria-keyshortcuts={!revealed ? String(numberKey) : undefined}
      data-state={state}
      className={cn(
        "group relative w-full rounded-2xl border-2 px-4 py-4 text-left transition-colors",
        "flex items-start gap-3 sm:gap-4",
        "min-h-[64px]",
        "touch-manipulation",
        "disabled:cursor-default",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-sky-300",
        !revealed &&
          !disabled &&
          "border-zinc-200 bg-white hover:border-sky-400 hover:bg-sky-50 active:bg-sky-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-sky-500 dark:hover:bg-zinc-800",
        state === "selected" &&
          "border-sky-500 bg-sky-50 dark:border-sky-400 dark:bg-sky-950/40",
        state === "revealed-correct" &&
          "border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100",
        state === "wrong" &&
          "border-red-500 bg-red-50 text-red-950 dark:border-red-400 dark:bg-red-950/50 dark:text-red-100",
        revealed &&
          state === "idle" &&
          "border-zinc-200 bg-white opacity-60 dark:border-zinc-800 dark:bg-zinc-950",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
          state === "revealed-correct"
            ? "bg-emerald-700 text-white dark:bg-emerald-400 dark:text-emerald-950"
            : state === "wrong"
              ? "bg-red-700 text-white dark:bg-red-400 dark:text-red-950"
              : state === "selected"
                ? "bg-sky-700 text-white dark:bg-sky-400 dark:text-sky-950"
                : "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
        )}
      >
        {choiceKey}
      </span>
      <span className="flex-1 pt-1 text-base leading-relaxed">{text}</span>
      {state === "revealed-correct" && (
        <Check
          aria-hidden="true"
          className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300"
        />
      )}
      {state === "wrong" && (
        <X aria-hidden="true" className="h-5 w-5 shrink-0 text-red-700 dark:text-red-300" />
      )}
    </button>
  );
});
