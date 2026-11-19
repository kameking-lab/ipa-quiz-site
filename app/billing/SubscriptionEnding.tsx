"use client";

import { useState, type FormEvent } from "react";
import { examDateLabel } from "@/lib/billing/exam-end";
import type { SubscriptionManagement } from "@/lib/billing/subscription/domain";

const periodLabel = (value: string) => new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit",
}).format(new Date(value));

export function subscriptionEndingLabel(ending: Pick<SubscriptionManagement, "examDate" | "cancelAtPeriodEnd" | "periodEnd">) {
  if (ending.cancelAtPeriodEnd) return `${periodLabel(ending.periodEnd)}で終了（解約予約済み）`;
  if (ending.examDate) return `${examDateLabel(ending.examDate)}で終了`;
  return "毎月更新・いつでも解約可";
}

export function SubscriptionEnding({ initial, today }: { initial: SubscriptionManagement; today: string }) {
  const [ending, setEnding] = useState<SubscriptionManagement | null>(initial);
  const [editing, setEditing] = useState(false);
  const [kind, setKind] = useState<"exam" | "renew" | "cancel">(initial.examDate ? "exam" : "renew");
  const [date, setDate] = useState(initial.examDate ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ending || busy) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/billing/ending", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: ending.orderId, kind, ...(kind === "exam" ? { examDate: date } : {}) }),
      });
      const result = await response.json() as { management: SubscriptionManagement | null; error?: string };
      if (!response.ok) {
        setError(result.error === "invalid_exam_date" ? "受験日を選び直してください。" :
          result.error === "subscription_ending_conflict" ? "契約状況が変わりました。ページを開き直してください。" : "変更を確認できませんでした。もう一度お試しください。");
        return;
      }
      setEnding(result.management);
      setEditing(false);
    } catch {
      setError("変更を確認できませんでした。もう一度お試しください。");
    } finally {
      setBusy(false);
    }
  }

  return <section aria-label="契約の更新設定" className="space-y-3 rounded-xl border border-border px-4 py-3 text-sm">
    <p role="status" className="font-semibold">{ending ? subscriptionEndingLabel(ending) : "契約は終了しました"}</p>
    {ending && !ending.cancelAtPeriodEnd && (editing ? <form className="space-y-3 border-t border-border pt-3" onSubmit={save}>
      <fieldset className="space-y-1" disabled={busy}>
        <legend className="sr-only">契約の更新</legend>
        <label className="flex min-h-10 items-center gap-2">
          <input type="radio" name="ending" checked={kind === "exam"} onChange={() => setKind("exam")} />試験日で自動終了
        </label>
        {kind === "exam" && <label className="block space-y-1 pl-5">
          <span className="block">受験日</span>
          <input type="date" min={today} required value={date} onChange={event => setDate(event.target.value)}
            className="min-h-11 max-w-full rounded-md border border-border bg-background px-2" />
        </label>}
        <label className="flex min-h-10 items-center gap-2">
          <input type="radio" name="ending" checked={kind === "renew"} onChange={() => setKind("renew")} />毎月更新
        </label>
        <label className="flex min-h-10 items-center gap-2">
          <input type="radio" name="ending" checked={kind === "cancel"} onChange={() => setKind("cancel")} />{periodLabel(ending.periodEnd)}で解約
        </label>
      </fieldset>
      {error && <p role="alert" className="text-destructive">{error}</p>}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={busy} className="min-h-11 rounded-lg bg-primary px-4 font-semibold text-primary-foreground disabled:opacity-50">
          {busy ? "保存中…" : kind === "cancel" ? "解約を予約" : "保存"}
        </button>
        <button type="button" disabled={busy} onClick={() => { setEditing(false); setError(""); }} className="min-h-11 px-2 underline">閉じる</button>
      </div>
    </form> : <button type="button" className="min-h-11 underline underline-offset-4"
      onClick={() => { setKind(ending.examDate ? "exam" : "renew"); setDate(ending.examDate ?? ""); setEditing(true); }}>
      更新設定を変更
    </button>)}
  </section>;
}
