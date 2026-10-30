"use client";

import { useState } from "react";
import { CloudUpload, Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { syncHistory } from "@/lib/sync/history-sync";
import { useSyncIdentity } from "@/lib/sync/use-sync-identity";
import { SyncOwnershipNotice } from "@/components/sync/SyncOwnershipNotice";

interface SyncResult {
  merged: number;
  total: number;
}

export function HistorySyncPanel() {
  const identity = useSyncIdentity();
  const [loading, setLoading] = useState<"sync" | "export" | null>(null);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setError(null);
    setResult(null);
    setLoading("sync");
    try {
      if (!identity.account) return;
      const status = await syncHistory({
        expectedUserId: identity.account.id,
        confirmUnowned: identity.confirmedFor === identity.account.id,
      });
      if (status.state === "ok") {
        setResult({ merged: status.merged, total: status.total });
      } else {
        setError(status.state === "deferred"
          ? "保存先の確認が必要なため、履歴の同期を保留しました。端末の記録は残っています。"
          : "履歴の同期に失敗しました。端末の記録は残っています。再試行できます。");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(null);
      identity.refresh();
    }
  }

  async function handleExport() {
    setError(null);
    setLoading("export");
    try {
      const res = await fetch("/api/account/history-export");
      if (!res.ok) {
        setError(`エクスポート失敗 (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ipa-quiz-history-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {identity.account && <SyncOwnershipNotice
        account={identity.account}
        ownership={identity.ownership}
        confirmed={identity.confirmedFor === identity.account.id}
        onConfirm={(confirmed) => identity.setConfirmedFor(confirmed ? identity.account!.id : null)}
      />}
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSync}
          disabled={loading !== null || identity.checking || !identity.account || identity.ownership === "different" ||
            (identity.ownership === "unknown" && identity.confirmedFor !== identity.account.id)}
          className="w-full"
        >
          {loading === "sync" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <CloudUpload className="h-4 w-4" />
          )}
          {loading === "sync" ? "同期中..." : "クラウドと同期"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleExport}
          disabled={loading !== null}
          className="w-full"
        >
          {loading === "export" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {loading === "export" ? "出力中..." : "JSON エクスポート"}
        </Button>
      </div>
      {result && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-start gap-2 rounded-xl border border-emerald-300/60 bg-emerald-50 p-3 text-xs text-emerald-900 dark:border-emerald-700/50 dark:bg-emerald-950/40 dark:text-emerald-100"
          style={{ animation: "scale-in 200ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
        >
          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            同期完了: <strong>{result.merged}</strong> 件を追加、合計{" "}
            <strong>{result.total}</strong> 件をこのブラウザに反映しました。
          </span>
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        学習履歴をクラウドと同期できます。選択した回答などの端末内情報は保持します。ペットと報酬はこの端末内の保存です。
      </p>
    </div>
  );
}
