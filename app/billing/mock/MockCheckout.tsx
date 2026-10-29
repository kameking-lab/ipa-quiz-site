"use client";
import { useState } from "react";
import Link from "next/link";
export function MockCheckout({ order }: { order: string }) {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function simulate(outcome: string) {
    setBusy(true);
    try {
      const res = await fetch("/api/billing/mock", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order, outcome }) });
      if (!res.ok) { setMessage("本人確認・テスト設定・保存先を確認してください。"); return; }
      window.location.assign(`/billing/success?order=${encodeURIComponent(order)}`);
    } catch { setMessage("テスト処理に失敗しました。状態を確認してから再試行してください。"); }
    finally { setBusy(false); }
  }
  return <><p>架空の決済です。カード情報を入力しないでください。</p><div className="flex flex-wrap gap-3">{[["paid", "支払成功をテスト"], ["failed", "支払失敗をテスト"], ["refunded", "返金をテスト"]].map(([outcome, label]) => <button disabled={busy} className="min-h-11 rounded border p-3" key={outcome} onClick={() => simulate(outcome)}>{label}</button>)}</div>
    <Link className="block underline" href={`/billing/cancel?order=${encodeURIComponent(order)}`}>取り消して条件に戻る</Link><p role="status">{message}</p></>;
}
