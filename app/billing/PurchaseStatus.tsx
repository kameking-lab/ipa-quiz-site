"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PRICE_PAGE_LINK } from "@/lib/billing/price-page-link";
import { QuizResumeLinks } from "./QuizResumeLinks";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
import { posthogCapture } from "@/lib/posthog";
import { readQuizReturn } from "@/lib/billing/quiz-return";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";
import { purchaseJourney } from "@/lib/billing/journey-client";
interface Status { feedbackSubmitted?: boolean; billingModel?: "subscription"; canManage?: boolean; subscription?: { status: string; periodEnd: string; cancelAtPeriodEnd: boolean }; entitled: boolean; expiresAt: string | null; purchase: { id: string; status: string; expiresAt: string | null } | null }
export function PurchaseStatus({ order, canceled = false, testMode = true }: { order: string; canceled?: boolean; testMode?: boolean }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [needsLogin, setNeedsLogin] = useState(false);
  const [busy, setBusy] = useState(false);
  const request = useRef(0);
  const active = useRef(false);
  const check = useCallback(async () => {
    if (!order || active.current) return null;
    active.current = true;
    const id = ++request.current;
    setBusy(true);
    try {
      const res = await fetch(`/api/billing/status?order=${encodeURIComponent(order)}`, { cache: "no-store" });
      if (id !== request.current) return null;
      setNeedsLogin(res.status === 401);
      if (!res.ok) throw new Error(res.status === 401 ? "購入したアカウントでログインしてください。" : "購入状況を確認できません。再購入せず、もう一度確認してください。");
      const next: Status = await res.json();
      if (id !== request.current) return null;
      setStatus(next); setError("");
      return next;
    } catch (e) {
      if (id === request.current) { setStatus(null); setError(e instanceof Error ? e.message : "購入状況を確認できません。"); }
      return null;
    } finally {
      if (id === request.current) { active.current = false; setBusy(false); }
    }
  }, [order]);
  useEffect(() => {
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    setStatus(null); setError(""); setNeedsLogin(false);
    const run = async () => {
      const next = await check();
      // Bounded confirmation; never resubmits a purchase.
      if (!disposed && !canceled && next?.purchase?.status === "pending" && attempts++ < 4) timer = setTimeout(run, 2500);
    };
    void run();
    return () => { disposed = true; clearTimeout(timer); request.current++; active.current = false; };
  }, [check, canceled]);
  const complete = status?.purchase?.id === order && status.purchase.status === "paid" && status.entitled;
  useEffect(() => { if (complete) purchaseJourney(order); }, [complete, order]);
  useEffect(() => {
    if (!complete || !status?.feedbackSubmitted) return;
    // Confirmation views by customers with feedback history, not purchase conversions.
    // Feedback can postdate this order; a new session can count another view.
    const key = `kakomon-feedback-purchase:${order}`;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "1"); } catch { /* Analytics remains best effort. */ }
    posthogCapture("practice_feedback_customer_confirmation_viewed", { billingModel: status?.billingModel ?? "pass" });
  }, [complete, order, status?.billingModel, status?.feedbackSubmitted]);
  const reported = useRef(false);
  useEffect(() => {
    if (!complete || reported.current) return;
    reported.current = true;
    posthogCapture("checkout_completed", { plan: status?.billingModel === "subscription" ? "monthly" : "pass", test_mode: testMode });
  }, [complete, status?.billingModel, testMode]);
  useEffect(() => { if (canceled) sendFunnelEvent("checkout_canceled"); }, [canceled]);
  // Paid: go straight back to the page the plan button was tapped on (no extra tap).
  useEffect(() => {
    if (!complete) return;
    let back: string | null = null;
    try { back = readQuizReturn(window.sessionStorage, Date.now(), order) ?? readQuizReturn(window.sessionStorage); } catch { /* Stay on the confirmation. */ }
    if (!back) return;
    sendFunnelEvent("purchase_returned");
    location.replace(back);
  }, [complete, order]);
  const pending = status?.purchase?.status === "pending";
  const labels: Record<string, string> = { failed: "支払いは成立していません。", suspended: "返金手続を確認中のため利用を一時停止しています。", refunded: "返金により、この購入の利用は停止しています。", expired: "利用期間が満了しました。無料の演習・履歴は引き続き使えます。" };
  const title = complete ? "購入が完了しました" : canceled ? "決済画面から戻りました" : pending ? "支払いを確認しています" : "購入状況の確認";
  return <div className="space-y-5">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p role="status" aria-live="polite">{!order ? "注文番号を確認できません。料金ページから契約管理をご確認ください。" : error || (complete ? "プランをご利用いただけます。学習を続けましょう。" : pending ? "確認が反映されるまで少しお待ちください。再購入は不要です。" : status?.purchase ? labels[status.purchase.status] ?? "この注文の利用状況を確認できません。再購入せずお問い合わせください。" : status ? "この注文の購入情報を確認できません。" : "購入状況を確認しています…")}</p>
    {complete && <QuizResumeLinks order={order} primary />}
    {!complete && order && !needsLogin && <button type="button" disabled={busy} className="min-h-11 rounded-lg border px-4 disabled:opacity-50" onClick={() => void check()}>{busy ? "確認中…" : "購入状況を再確認"}</button>}
    {!complete && <QuizResumeLinks order={order} showLogin={needsLogin} />}
    {canceled && <p className="text-sm">画面から戻るだけで新しい請求や解約は行いません。別のタブで支払済みの場合は、上の購入状況をご確認ください。</p>}
    {order && <details className="rounded-xl border border-border p-4">
      <summary className="cursor-pointer font-semibold">注文・契約の詳細</summary>
      <div className="mt-3 space-y-3 text-sm">
        <p className="break-all">注文番号: {order}</p>
        {status?.purchase?.expiresAt && <p>この注文の有効期限: {new Date(status.purchase.expiresAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}（日本時間）</p>}
        {status?.billingModel === "subscription" ? <><p>毎月自動更新です。次回更新の停止は契約管理から行えます。</p>{status.subscription?.cancelAtPeriodEnd && <p>期間末の解約予約済みです。次回の自動更新は停止します。</p>}{status.canManage && <ManageSubscriptionButton />}</> : status && <p>自動更新はありません。</p>}
      </div>
    </details>}
    <Link className="inline-flex min-h-11 items-center underline" href={PRICE_PAGE_LINK.href}>{PRICE_PAGE_LINK.label}・お問い合わせ</Link>
  </div>;
}
