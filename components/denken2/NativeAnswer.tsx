"use client";

import { useState } from "react";
import type { ElectricalNativeQuestion } from "@/lib/electrical/native-types";

type Bank = Record<string, string>;
const normalized = (label: string) => label.replace(/[()（）]/g, "").normalize("NFKC");
const isFlat = (groups: ElectricalNativeQuestion["choiceGroups"]): groups is Bank =>
  Object.values(groups).every(value => typeof value === "string");
const entries = (bank: Bank) => Object.entries(bank);

function SelectChoice({ label, bank, value, onChange }: {
  label: string; bank: Bank; value: string; onChange: (next: string) => void;
}) {
  return <label className="block min-w-0">
    <span className="mb-2 block text-sm font-semibold">{label}</span>
    <select aria-label={label} value={value} onChange={event => onChange(event.target.value)}
      className="min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm">
      <option value="">未回答</option>
      {entries(bank).map(([key, description]) => <option key={key} value={key}>{key} {description}</option>)}
    </select>
  </label>;
}

export function NativeAnswer({ question }: { question: ElectricalNativeQuestion }) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [revealed, setRevealed] = useState(false);
  const isMultipleChoice = question.id.startsWith("denken3-");
  const groups = question.choiceGroups;
  const paired = question.id.startsWith("denken2-") && question.year === 2026 && question.subject === "machine" && question.number === 7;
  const groupEntries = Object.entries(groups);
  const flat = isFlat(groups);
  const choose = (key: string, value: string) => {
    setSelected(previous => ({ ...previous, [key]: value }));
    setRevealed(false);
  };
  const banksFor = (slot: number): [Bank, Bank | null] => {
    if (flat) return [groups, null];
    if (paired) return [groupEntries[1]?.[1] as Bank, groupEntries[2]?.[1] as Bank];
    return [groupEntries[slot - 1]?.[1] as Bank, null];
  };
  return <section aria-label="解答欄" className="mt-8 rounded-2xl border border-border bg-card p-4 sm:p-6">
    <h2 className="text-xl font-bold">解答する</h2>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">各欄を選んでから答えと解説を確認できます。未選択でも解説を開けます。</p>
    <div className="mt-6 space-y-6">
      {question.slots.map(field => {
        const [definitionBank, unitBank] = banksFor(field.slot);
        return <div key={field.slot} className="rounded-xl border border-border p-4">
          <h3 className="mb-3 font-semibold">{isMultipleChoice ? `設問 (${field.slot})` : `空欄 (${field.slot})`}</h3>
          {field.prompt ? <p className="mb-4 whitespace-pre-wrap break-words text-sm leading-7">{field.prompt}</p> : null}
          <div className={paired ? "grid gap-3 sm:grid-cols-2" : ""}>
            <SelectChoice label={paired ? `空欄${field.slot}・定義` : isMultipleChoice ? `設問${field.slot}の選択肢` : `空欄${field.slot}`}
              bank={definitionBank} value={selected[`${field.slot}-a`] ?? ""}
              onChange={value => choose(`${field.slot}-a`, value)} />
            {unitBank ? <SelectChoice label={`空欄${field.slot}・単位`}
              bank={unitBank} value={selected[`${field.slot}-b`] ?? ""}
              onChange={value => choose(`${field.slot}-b`, value)} /> : null}
          </div>
          {revealed ? <div className="mt-4 border-t border-border pt-4 text-sm leading-7">
            {typeof field.officialDefinition === "string"
              ? <p className="font-bold text-primary">公式正答：定義 {field.officialDefinition} ／ 単位 {field.officialUnit}</p>
              : <p className="font-bold text-primary">公式正答：{field.officialAnswer}</p>}
            <p className="mt-1">{(() => {
              const first = selected[`${field.slot}-a`];
              const second = selected[`${field.slot}-b`];
              if (!first) return "未回答";
              if (typeof field.officialDefinition === "string" && typeof field.officialUnit === "string") return normalized(first) === normalized(field.officialDefinition)
                && !!second && normalized(second) === normalized(field.officialUnit) ? "正解" : "選択を確認";
              return normalized(first) === normalized(field.officialAnswer) ? "正解" : "選択を確認";
            })()}</p>
            <p className="mt-2">{field.explanation}</p>
            <p className="mt-2 whitespace-pre-wrap">{field.derivation}</p>
            {field.choiceExplanations ? <details className="mt-4 rounded-lg border border-border p-3">
              <summary className="cursor-pointer font-semibold">全選択肢の理由（{Object.keys(field.choiceExplanations).length}肢）</summary>
              <dl className="mt-3 space-y-3">{Object.entries(field.choiceExplanations).map(([label, reason]) =>
                <div key={label}><dt className="font-bold">{label} {flat ? groups[label] : ""}</dt><dd>{reason}</dd></div>)}</dl>
            </details> : null}
          </div> : null}
        </div>;
      })}
    </div>
    <button type="button" onClick={() => setRevealed(true)}
      className="mt-6 min-h-11 rounded-lg bg-primary px-5 py-2 font-semibold text-primary-foreground">
      答えと解説を見る
    </button>
  </section>;
}
