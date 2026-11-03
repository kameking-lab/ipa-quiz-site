"use client";

import { useEffect, useState } from "react";
import type { ChushoSolution } from "@/lib/chusho-secondary/data";

export function AnswerPractice({ questionId, solutions }: { questionId: string; solutions: ChushoSolution[] }) {
  const [drafts, setDrafts] = useState<string[]>(() => solutions.map(() => ""));
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setReady(false);
    setVisible(false);
    setMessage("");
    let next = solutions.map(() => "");
    try {
      const raw = localStorage.getItem(`kakomon-ai:chusho-secondary:${questionId}`);
      if (raw) {
        const saved: unknown = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length === solutions.length && saved.every(s => typeof s === "string")) next = saved;
      }
    } catch { /* 学習は保存不可でも利用できる。 */ }
    setDrafts(next);
    setReady(true);
  }, [questionId, solutions]);

  function update(index: number, value: string) {
    const next = [...drafts];
    next[index] = value;
    setDrafts(next);
    try {
      localStorage.setItem(`kakomon-ai:chusho-secondary:${questionId}`, JSON.stringify(next));
      setMessage("このブラウザに下書きを保存しました。");
    } catch { setMessage("下書きを保存できません。必要な文章をコピーして残してください。"); }
  }

  return <section aria-labelledby="practice-title" className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
    <h2 id="practice-title" className="text-xl font-bold">自分の解答を書いて比較する</h2>
    <p className="mt-2 text-sm leading-7 text-muted-foreground">原問の指定に沿って解答します。下書きはこのブラウザに保存されます。採点は行わず、解答例と根拠を自分で確認します。</p>
    {solutions.map((solution, index) => {
      const value = drafts[index] ?? "";
      const count = Array.from(value.replace(/\r\n/g, "\n")).length;
      const excess = solution.maxChars !== undefined && count > solution.maxChars;
      const fieldId = `${questionId}-answer-${index}`;
      return <div key={solution.label} className="mt-5">
        <label htmlFor={fieldId} className="mb-2 block font-semibold">{solution.label}{solution.maxChars ? `（${solution.maxChars}字以内）` : ""}</label>
        <textarea id={fieldId} value={value} disabled={!ready} onChange={event => update(index, event.target.value)}
          rows={4} aria-describedby={`${fieldId}-count`} className="w-full rounded-xl border border-border bg-background p-3 leading-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
        <p id={`${fieldId}-count`} className={`mt-1 text-sm ${excess ? "text-destructive" : "text-muted-foreground"}`}>{count}字{excess ? `：${count - solution.maxChars!}字超過しています` : ""}</p>
      </div>;
    })}
    <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm text-muted-foreground">{message}</p>
    <button type="button" aria-expanded={visible} aria-controls="editorial-examples" onClick={() => setVisible(value => !value)}
      className="mt-4 min-h-11 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40">
      {visible ? "独自解答例を閉じる" : "独自解答例と根拠を確認する"}
    </button>
    <div id="editorial-examples" hidden={!visible} className="mt-6 space-y-6">
      {solutions.map((s, i) => <article key={s.label} className="rounded-xl border border-border p-4">
        <h3 className="font-bold">{s.label}：独自解答例</h3>
        <p className="mt-3 whitespace-pre-line leading-8">{s.example}</p>
        {s.maxChars && <p className="mt-1 text-xs text-muted-foreground">解答例 {Array.from(s.example).length}字／上限{s.maxChars}字</p>}
        <h4 className="mt-5 font-semibold">根拠・考え方</h4>
        <p className="mt-2 whitespace-pre-line text-sm leading-7">{s.reasoning}</p>
        <fieldset className="mt-5 space-y-2"><legend className="mb-2 font-semibold">自分で確認する項目</legend>
          {s.checkpoints.map((item, j) => <label key={item} className="flex min-h-11 items-start gap-3 rounded-lg p-2 text-sm leading-7">
            <input type="checkbox" aria-label={`${s.label}：${item}`} className="mt-1.5 h-4 w-4 shrink-0 accent-primary" name={`${questionId}-check-${i}-${j}`} />{item}
          </label>)}
        </fieldset>
      </article>)}
    </div>
  </section>;
}
