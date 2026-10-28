"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ManageSubscriptionButton } from "./ManageSubscriptionButton";
interface Status { billingModel?: "subscription"; canManage?: boolean; subscription?: { status: string; periodEnd: string; cancelAtPeriodEnd: boolean }; entitled: boolean; expiresAt: string | null; purchase: { id: string; status: string; expiresAt: string | null } | null }
export function PurchaseStatus({ order }: { order: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const check = useCallback(async () => {
    try {
      const res = await fetch(`/api/billing/status?order=${encodeURIComponent(order)}`, { cache: "no-store" });
      if (!res.ok) throw new Error("購入状況を確認できません。購入した本人でログインし、再確認してください。");
      setStatus(await res.json()); setError("");
    } catch (e) { setStatus(null); setError(e instanceof Error ? e.message : "確認できませんでした。"); }
  }, [order]);
  useEffect(() => { void check(); }, [check]);
  const labels: Record<string, string> = { pending: "支払確認待ちです。再購入せず、しばらくして再確認してください。", paid: "支払いを確認しました。", failed: "支払いは成立していません。", suspended: "返金手続を確認中のためパスを一時停止しています。", refunded: "返金により、このパスは停止しています。", expired: "期間が満了しました。無料の試用と履歴は引き続き利用できます。" };
  return <div className="space-y-4"><p role="status">{status?.purchase ? labels[status.purchase.status] : error || "サーバーで購入状況を確認しています…"}</p>
    {status?.purchase?.expiresAt && <p>この注文の有効期限: {new Date(status.purchase.expiresAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}（日本時間）</p>}
    <p>注文番号: {order}</p><button className="min-h-11 rounded-lg border px-4" onClick={check}>状況を再確認</button>
    {status?.billingModel === "subscription" ? <><p>月額の自動更新契約です。購入画面から戻る操作と契約の解約は別です。</p>
      {status.subscription?.cancelAtPeriodEnd && <p>期間末の解約を予約しています。次回の自動更新は停止します。</p>}
      {status.canManage && <ManageSubscriptionButton />}</> : <p>{status ? "自動更新はありません。" : "契約状況を確認しています。"}購入画面から戻っただけでは権限は追加されません。</p>}
    <Link className="block underline" href="/billing">条件・サポートに戻る</Link><Link className="block underline" href="/modes/year">学習に戻る</Link>
  </div>;
}
