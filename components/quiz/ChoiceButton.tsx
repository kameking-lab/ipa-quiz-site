"use client";

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
}

export function ChoiceButton({
  choiceKey,
  text,
  revealed,
  selected,
  correct,
  disabled,
  onClick,
}: Props) {
  let state: "idle" | "selected" | "correct" | "wrong" | "revealed-correct" = "idle";
  if (revealed) {
    if (correct) state = "revealed-correct";
    else if (selected) state = "wrong";
  } else if (selected) {
    state = "selected";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative w-full rounded-2xl border-2 px-4 py-4 text-left transition-colors",
        "flex items-start gap-3 sm:gap-4",
        "min-h-[64px]",
        "touch-manipulation",
        "disabled:cursor-default",
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
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold",
          state === "revealed-correct"
            ? "bg-emerald-600 text-white"
            : state === "wrong"
              ? "bg-red-600 text-white"
              : state === "selected"
                ? "bg-sky-600 text-white"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
        )}
      >
        {choiceKey}
      </span>
      <span className="flex-1 pt-1 text-sm leading-relaxed sm:text-base">{text}</span>
      {state === "revealed-correct" && (
        <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
      )}
      {state === "wrong" && (
        <X className="h-5 w-5 shrink-0 text-red-600 dark:text-red-300" />
      )}
    </button>
  );
}
