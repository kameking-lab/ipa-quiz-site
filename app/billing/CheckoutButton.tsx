"use client";
import { readQuizReturn, safeQuizReturn, saveQuizReturn } from "@/lib/billing/quiz-return";
import { useRef, useState } from "react";
import { posthogCapture } from "@/lib/posthog";
export function CheckoutButton({ terms, amount, enabled, testMode = true, recurring = false }: { terms: string; amount: number; enabled: boolean; testMode?: boolean; recurring?: boolean }) {
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);
  const [error, setError] = useState("");
  async function checkout() {
    if (submitting.current || !enabled) return;
    submitting.current = true;
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ terms }) });
      const value = await res.json();
      if (!res.ok) {
        const messages: Record<string, string> = { sign_in_required: "購入にはログインが必要です。", subscription_exists: "契約または支払確認待ちの申込があります。契約管理からご確認ください。", pass_already_active: "パスは有効です。追加購入は不要です。", transition_no_purchase_needed: "移行優遇中です。今の購入は不要です。", terms_changed: "条件が更新されました。この画面を再読込して確認してください。" };
        throw new Error(messages[value.error] ?? "決済を開始できませんでした。再試行しても同じ未完了の注文を使用します。解決しない場合はサポートへご連絡ください。");
      }
      // Bind only a confirmed checkout response to the UI return context. No provider/API contract changes.
      posthogCapture("checkout_started", { plan: recurring ? "monthly" : "pass", amount,
        test_mode: testMode, source: "billing" });
      try {
        const href = safeQuizReturn(new URL(window.location.href).searchParams.get("returnTo")) ?? readQuizReturn(window.sessionStorage);
        if (href && typeof value.orderId === "string") saveQuizReturn(window.sessionStorage, href, Date.now(), value.orderId);
      } catch { /* The billing page already explains unavailable local return storage. */ }
      window.location.assign(value.url);
    } catch (e) { setError(e instanceof Error ? e.message : "決済を開始できませんでした。"); submitting.current = false; setBusy(false); }
  }
  return <div className="space-y-3">
    <p id="purchase-consent" className="text-sm">{recurring ? "対象の演習と料金・毎月更新・解約・返金条件に同意して進みます。" : "対象の演習と料金・提供期間・非自動更新・返金条件に同意して進みます。"}</p>
    <button type="button" aria-describedby="purchase-consent checkout-next" className="min-h-12 w-full rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground disabled:opacity-50" disabled={!enabled || busy} onClick={checkout}>
      {busy ? "決済画面を開いています…" : testMode ? "同意してテスト決済へ" : "同意して決済へ進む"}
    </button>
    <p id="checkout-next" className="text-xs text-muted-foreground">{testMode && "実際の請求はありません。"}次の画面で{recurring ? "月額" : ""}{amount.toLocaleString("ja-JP")}円（税込）の支払いを確定します。確定前に戻れます。</p>
    {error && <p role="alert" className="text-sm">{error}</p>}
  </div>;
}
