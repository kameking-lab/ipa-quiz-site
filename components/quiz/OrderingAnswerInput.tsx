"use client";

import * as React from "react";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { getChoiceKeys } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isOrderingAnswerComplete } from "@/lib/questions/ordering";

export function OrderingAnswerInput({ question, disabled, onAnswer }: {
  question: Question;
  disabled: boolean;
  onAnswer: (selected: ChoiceKey[]) => void;
}) {
  const keys = getChoiceKeys(question.choices);
  const [selected, setSelected] = React.useState<(ChoiceKey | "")[]>(() => keys.map(() => ""));
  const complete = isOrderingAnswerComplete(selected, question.choices);

  return <form aria-label="順序を並べる" className="space-y-3 rounded-xl border border-border bg-card p-4" onSubmit={(event) => {
    event.preventDefault();
    if (!disabled && complete) onAnswer(selected as ChoiceKey[]);
  }}>
    <p className="text-sm font-medium">各位置に選択肢を一つずつ指定してください。</p>
    <div className="grid gap-3 sm:grid-cols-2">
      {keys.map((_, index) => <label key={index} className="flex items-center gap-2 text-sm">
        <span className="w-12 shrink-0 font-semibold">{index + 1}番目</span>
        <select aria-label={`${index + 1}番目の選択肢`} className="min-h-11 min-w-0 flex-1 rounded-lg border border-border bg-background px-2 text-foreground" value={selected[index] ?? ""} disabled={disabled} onChange={(event) => {
          const value = event.target.value as ChoiceKey | "";
          setSelected((previous) => previous.map((key, slot) => slot === index ? value : key === value && value !== "" ? "" : key));
        }}>
          <option value="">選択してください</option>
          {keys.map((key) => <option key={key} value={key}>{choiceDisplayLabel(question.exam, key)}: {question.choices?.[key]}</option>)}
        </select>
      </label>)}
    </div>
    <div className="flex flex-wrap gap-2">
      <button type="submit" disabled={disabled || !complete} className="min-h-11 rounded-lg bg-primary px-4 font-semibold text-primary-foreground disabled:opacity-50">採点する</button>
      <button type="button" disabled={disabled || selected.every((key) => key === "")} onClick={() => setSelected(keys.map(() => ""))} className="min-h-11 rounded-lg border border-border px-4 disabled:opacity-50">クリア</button>
    </div>
  </form>;
}
