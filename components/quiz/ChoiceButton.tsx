"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import type { ChoiceKey } from "@/lib/questions/types";
import { QuestionBody } from "./QuestionBody";

interface Props {
  choiceKey: ChoiceKey | `${number}`;
  displayLabel?: string;
  text: string;
  imageUrl?: string;
  /** 選択肢が図そのものの場合の代替テキスト。未指定時は回路図として扱う。 */
  imageAlt?: string;
  revealed: boolean;
  selected: boolean;
  correct: boolean;
  disabled: boolean;
  onClick: () => void;
  /** null は数字キーの割り当てがない肢（11肢目以降）。 */
  shortcutIndex?: number | null;
  /** Roving-tabindex value from useQuizChoiceRoving (single Tab stop). */
  tabIndex?: number;
  /** Arrow-key roving handler from useQuizChoiceRoving. */
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  /** 「二つとも答えなさい」形式。押すたびに選択を切り替えるチェックボックスとして振る舞う。 */
  multiSelect?: boolean;
  paper?: boolean;
}

const CHOICE_INDEX: Partial<Record<string, number>> = { ア: 1, イ: 2, ウ: 3, エ: 4, オ: 5, カ: 6, キ: 7, ク: 8, ケ: 9, コ: 0 };

export const ChoiceButton = React.forwardRef<HTMLButtonElement, Props>(function ChoiceButton(
  {
    choiceKey,
    displayLabel,
    text,
    imageUrl,
    imageAlt,
    revealed,
    selected,
    correct,
    disabled,
    onClick,
    shortcutIndex,
    tabIndex,
    onKeyDown,
    multiSelect = false,
    paper = false,
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

  const numberKey = shortcutIndex === null ? null : shortcutIndex ?? CHOICE_INDEX[choiceKey] ?? 0;
  const baseLabel = `選択肢 ${displayLabel ?? choiceKey}: ${text}`;
  const stateLabel = !revealed
    ? numberKey === null ? "" : multiSelect
      ? `数字キー${numberKey}でも選択・解除できます`
      : `数字キー${numberKey}でも選択できます`
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
      role={multiSelect ? "checkbox" : "radio"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-checked={selected}
      aria-disabled={disabled}
      aria-keyshortcuts={!revealed && numberKey !== null ? String(numberKey) : undefined}
      data-state={state}
      className={cn(
        "p3-choice group relative flex w-full items-start gap-3 text-left transition-colors touch-manipulation disabled:cursor-default",
        paper
          ? "study-focus min-h-[52px] rounded-lg border px-3 py-[11px]"
          : "min-h-[64px] rounded-xl border-2 px-4 py-4 sm:gap-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        !revealed &&
          !disabled &&
          (paper ? "border-input bg-card hover:border-primary hover:bg-primary-soft active:bg-muted" : "border-border bg-card hover:border-primary hover:bg-primary-soft active:bg-muted"),
        state === "selected" &&
          "border-primary bg-primary-soft",
        state === "revealed-correct" &&
          (paper ? "border-success-soft-foreground bg-success-soft text-success-soft-foreground" : "border-emerald-500 bg-emerald-50 text-emerald-950 dark:border-emerald-400 dark:bg-emerald-950/50 dark:text-emerald-100"),
        state === "wrong" &&
          (paper ? "border-danger-soft-foreground bg-danger-soft text-danger-soft-foreground" : "border-red-500 bg-red-50 text-red-950 dark:border-red-400 dark:bg-red-950/50 dark:text-red-100"),
        revealed &&
          state === "idle" &&
          (paper ? "border-hairline bg-card text-muted-foreground" : "border-border bg-card opacity-60"),
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "p3-choice-number flex shrink-0 items-center justify-center rounded-full text-sm font-bold",
          paper ? "size-7" : "size-8",
          state === "revealed-correct"
            ? paper ? "bg-success-soft-foreground text-success-soft" : "bg-emerald-700 text-white dark:bg-emerald-400 dark:text-emerald-950"
            : state === "wrong"
              ? paper ? "bg-danger-soft-foreground text-danger-soft" : "bg-red-700 text-white dark:bg-red-400 dark:text-red-950"
              : state === "selected"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground",
        )}
      >
        {displayLabel ?? choiceKey}
      </span>
      <div className={cn("min-w-0 flex-1 text-base", paper ? "leading-[1.7]" : "pt-1 leading-relaxed")}>
        <QuestionBody text={text} />
        {(state === "selected" || state === "revealed-correct" || state === "wrong") && (
          <span aria-hidden="true" className="mt-2 block text-sm font-semibold">
            {state === "selected" ? "選択中" : state === "wrong" ? "選択した答え（不正解）" : selected ? "正解（選択した答え）" : "正解"}
          </span>
        )}
        {imageUrl && (
          // Exact circuit diagrams are cropped from the published paper.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={imageAlt ?? `${text}の回路図`} className="mt-3 h-auto max-h-44 max-w-full rounded border border-border bg-white p-2" loading="lazy" />
        )}
      </div>
      {state === "revealed-correct" && (
        <Check
          aria-hidden="true"
          className={cn("size-5 shrink-0", paper ? "text-success-soft-foreground" : "text-emerald-700 dark:text-emerald-300")}
        />
      )}
      {state === "wrong" && (
        <X aria-hidden="true" className={cn("size-5 shrink-0", paper ? "text-danger-soft-foreground" : "text-red-700 dark:text-red-300")} />
      )}
    </button>
  );
});
