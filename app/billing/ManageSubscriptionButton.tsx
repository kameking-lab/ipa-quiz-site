"use client";
import { useState } from "react";
export function ManageSubscriptionButton() {
  const [busy, setBusy] = useState(false), [error, setError] = useState("");
  async function manage() {
    if (busy) return; setBusy(true); setError("");
    try {
      const response = await fetch("/api/billing/portal", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const result = await response.json();
      if (!response.ok) throw new Error("契約管理を開けませんでした。ログイン状態をご確認ください。解決しない場合はサポートへお問い合わせください。");
      window.location.assign(result.url);
    } catch (e) { setBusy(false); setError(e instanceof Error ? e.message : "契約管理を開けませんでした。"); }
  }
  return <div><button className="min-h-11 rounded-lg border px-4" disabled={busy} onClick={manage}>{busy ? "確認中…" : "契約管理・解約・支払方法の変更"}</button>{error && <p role="alert">{error}</p>}</div>;
}
