"use client";
import { useState } from "react";
export function CheckoutButton({ terms, amount, enabled, testMode = true, recurring = false }: { terms: string; amount: number; enabled: boolean; testMode?: boolean; recurring?: boolean }) {
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    if (busy || !accepted || !enabled) return;
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ terms }) });
      const value = await res.json();
      if (!res.ok) {
        const messages: Record<string, string> = { sign_in_required: "購入にはログインが必要です。", subscription_exists: "契約または支払確認待ちの申込があります。契約管理からご確認ください。", pass_already_active: "パスは有効です。追加購入は不要です。", transition_no_purchase_needed: "移行優遇中です。今の購入は不要です。", terms_changed: "条件が更新されました。この画面を再読込して確認してください。" };
        throw new Error(messages[value.error] ?? "決済を開始できませんでした。再試行しても同じ未完了の注文を使用します。解決しない場合はサポートへご連絡ください。");
      }
      window.location.assign(value.url);
    } catch (e) { setError(e instanceof Error ? e.message : "決済を開始できませんでした。"); setBusy(false); }
  }
  return <div className="space-y-4 rounded-xl border p-5">
    <label className="flex items-start gap-3"><input type="checkbox" checked={accepted} disabled={!enabled || busy} onChange={e => setAccepted(e.target.checked)} />
      <span>{recurring ? "対象の演習、税込月額、毎月の自動更新、期間末解約、返金条件を確認しました。" : "対象の演習、税込総額、提供期間、非自動更新、返金条件を確認しました。"}</span></label>
    <button type="button" className="min-h-11 rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-50" disabled={!enabled || !accepted || busy} onClick={checkout}>
      {busy ? "確認中…" : `${testMode ? "テスト決済" : "有料購入の決済"}へ進む — ${recurring ? "月額" : ""}${amount.toLocaleString("ja-JP")}円（税込）の${recurring ? "自動更新契約" : "有料購入"}を確認`}</button>
    <p className="text-sm">{testMode && "これはテストです。実際の請求はありません。"}次の決済画面で支払方法・期限を確認し、確定前に取り消して戻れます。</p>
    {error && <p role="alert">{error}</p>}
  </div>;
}
