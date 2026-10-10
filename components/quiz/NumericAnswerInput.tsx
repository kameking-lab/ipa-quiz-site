"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { normalizeNumericAnswer } from "@/lib/questions/numeric";

export function NumericAnswerInput({ unit, disabled, onAnswer }: {
  unit: string;
  disabled: boolean;
  onAnswer: (normalized: string) => void;
}) {
  const id = React.useId();
  const [value, setValue] = React.useState("");
  const [invalid, setInvalid] = React.useState(false);
  const submit = () => {
    if (disabled) return;
    const normalized = normalizeNumericAnswer(value);
    if (normalized === undefined) {
      setInvalid(true);
      return;
    }
    onAnswer(normalized);
  };

  return (
    <form aria-label="数値記入の解答" className="rounded-2xl border border-border bg-card p-4 sm:p-5" noValidate onSubmit={(event) => { event.preventDefault(); submit(); }}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">解答（{unit}）</label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={`${id}-help${invalid ? ` ${id}-error` : ""}`}
          className="min-h-11 w-32 rounded-lg border border-input bg-background px-3 text-lg tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
          onChange={(event) => { setValue(event.target.value); setInvalid(false); }}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            // Consume Enter before the global next-question shortcut. IME
            // confirmation must never grade a half-composed Japanese input.
            event.stopPropagation();
            event.preventDefault();
            if (event.nativeEvent.isComposing || event.keyCode === 229) return;
            submit();
          }}
        />
        <span aria-hidden="true" className="text-sm text-muted-foreground">{unit}</span>
        <Button type="submit" variant="primary" disabled={disabled || value.trim() === ""}>採点する</Button>
      </div>
      <p id={`${id}-help`} className="mt-2 text-xs text-muted-foreground">単位を除いた整数を入力してください。</p>
      {invalid && <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-red-700 dark:text-red-300">数字だけで整数を入力してください。</p>}
    </form>
  );
}
