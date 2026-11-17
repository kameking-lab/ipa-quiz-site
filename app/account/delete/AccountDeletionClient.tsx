"use client";
import { useEffect, useRef, useState } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { useRouter } from "next/navigation";

const actionClass = "min-h-12 w-full rounded-xl px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
export function AccountDeletionClient() {
  const router = useRouter();
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [complete, setComplete] = useState(false);
  const [reauth, setReauth] = useState(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => { if (complete) statusRef.current?.focus(); }, [complete]);
  async function clearDevice() {
    window.dispatchEvent(new Event("mobile:account-deleted"));
    if (nativeClient()) await (await import("@/mobile/src/delete-device-data")).deleteDeviceData();
    for (const key of Object.keys(localStorage)) if (/^(ipa-quiz|kakomon)/.test(key)) localStorage.removeItem(key);
  }
  async function remove() {
    if (busy || complete || confirmation !== "DELETE") return;
    setBusy(true); setNotice("");
    let serverDeleted = deleted;
    try {
      if (!deleted) {
        const response = await fetch("/api/account/delete", { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmation }) });
        const data: { error?: string } = await response.json();
        if (!response.ok) {
          if (["reauthentication_required", "apple_reauthentication_required", "sign_in_required"].includes(data.error ?? "")) {
            setReauth(true);
            setNotice("削除前に本人確認が必要です。");
          } else setNotice("アカウントを削除できませんでした。もう一度お試しください。");
          return;
        }
        setDeleted(true); serverDeleted = true;
      }
      await clearDevice();
      setNotice("アカウントとこの端末のデータを削除しました。");
      setComplete(true);
    } catch {
      setNotice(serverDeleted ? "サーバーの削除は完了しています。端末データの消去を再試行してください。" : "削除結果を確認できませんでした。もう一度お試しください。");
    } finally { setBusy(false); }
  }
  return <section className="space-y-4 border-t border-border pt-6" aria-busy={busy}>
    <p ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring">{notice}</p>
    {!complete && <>
      {reauth && <><p>削除前に5分以内の再ログインが必要です。Apple連携の場合はAppleで再ログインしてください。</p><button className={actionClass + " border border-border bg-background hover:bg-muted"} disabled={busy} onClick={() => { if (nativeClient()) void import("@/mobile/src/login").then(m => m.beginLogin(location.origin, "/account/delete", true)); else router.push("/auth/signin?reauth=1&callbackUrl=/account/delete"); }}>再ログインして本人確認</button></>}
      <label className="block text-sm font-medium">削除を確認するため DELETE と入力<input className="mt-2 block min-h-12 w-full rounded-xl border border-input bg-background px-3 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" value={confirmation} onChange={e => setConfirmation(e.target.value)} autoComplete="off" autoCapitalize="characters" spellCheck={false} disabled={busy} /></label>
      <button className={actionClass + " bg-destructive text-destructive-foreground hover:bg-destructive/90"} disabled={busy || confirmation !== "DELETE"} onClick={() => void remove()}>{busy ? "削除中…" : deleted ? "端末データ消去を再試行" : "アカウントとデータを完全に削除"}</button>
      <p className="text-sm text-muted-foreground">通信切れなどで削除結果を確認できない場合も、この端末のデータは消去できます。この操作だけではサーバーのアカウント削除や契約の解約は行いません。</p>
      <button className={actionClass + " border border-border bg-background hover:bg-muted"} disabled={busy || confirmation !== "DELETE"} onClick={() => { setBusy(true); void clearDevice().then(() => setNotice("この端末のデータを消去しました。サーバーの削除結果は確認できていません。"), () => setNotice("端末データを消去できませんでした。再試行してください。")).finally(() => setBusy(false)); }}>この端末のデータだけ消去</button>
    </>}
  </section>;
}
