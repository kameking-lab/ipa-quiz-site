"use client";

import * as React from "react";
import { HISTORY_LIMIT_MESSAGE } from "@/lib/sync/history-protocol";
import { Cloud, CloudUpload, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { syncAll, readSyncMeta, type SyncAllResult } from "@/lib/sync";
import { useSyncIdentity } from "@/lib/sync/use-sync-identity";
import { SyncOwnershipNotice } from "@/components/sync/SyncOwnershipNotice";

const DATA_LABELS: Record<string, string> = {
  history: "学習履歴",
  bookmarks: "ブックマーク",
  customTags: "カスタムタグ",
  studyPlans: "学習計画",
};

function formatRelative(ts: number): string {
  if (!ts) return "未同期";
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}時間前`;
  return `${Math.floor(hr / 24)}日前`;
}

export function CloudSyncPanel() {
  const identity = useSyncIdentity();
  const auth = identity.checking || identity.unavailable ? "checking" : identity.account ? "in" : "out";
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState<SyncAllResult | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = React.useState(0);

  React.useEffect(() => {
    setLastSyncedAt(readSyncMeta(identity.account?.id).lastSyncedAt);
    setResult(null);
  }, [identity.account?.id]);

  async function handleSync() {
    setBusy(true);
    setResult(null);
    try {
      if (!identity.account) return;
      const r = await syncAll({
        expectedUserId: identity.account.id,
        confirmUnowned: identity.confirmedFor === identity.account.id,
      });
      setResult(r);
      setLastSyncedAt(readSyncMeta(identity.account.id).lastSyncedAt);
    } finally {
      setBusy(false);
      identity.refresh();
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="space-y-3 p-4 text-sm text-muted-foreground">
        <ul className="flex flex-wrap gap-1.5">
          {Object.entries(DATA_LABELS).map(([key, label]) => {
            const st = result?.byType[key as keyof typeof result.byType];
            const ok = st?.state === "ok";
            return (
              <li
                key={key}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  ok
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {ok && <CheckCircle2 className="h-3 w-3" aria-hidden="true" />}
                {label}
                {ok && st && "merged" in st ? `（+${st.merged}）` : ""}
              </li>
            );
          })}
        </ul>

        {!identity.checking && identity.account && <SyncOwnershipNotice
          account={identity.account}
          ownership={identity.ownership}
          confirmed={identity.confirmedFor === identity.account.id}
          onConfirm={(confirmed) => identity.setConfirmedFor(confirmed ? identity.account!.id : null)}
        />}

        {auth !== "out" && (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              className="gap-2"
              onClick={handleSync}
              disabled={busy || auth === "checking" || identity.ownership === "different" ||
                (identity.ownership === "unknown" && identity.confirmedFor !== identity.account?.id)}
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <CloudUpload className="h-4 w-4" aria-hidden="true" />
              )}
              {busy ? "同期中…" : "今すぐ同期"}
            </Button>
            <span
              className="inline-flex items-center gap-1 text-xs text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              <Cloud className="h-3.5 w-3.5" aria-hidden="true" />
              {result?.byType.history.state === "ok" && result.byType.history.limitReached
                ? HISTORY_LIMIT_MESSAGE : `最終同期: ${formatRelative(lastSyncedAt)}`}
            </span>
          </div>
        )}

        {result && result.overall === "unavailable" && (
          <p className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            現在クラウド同期を利用できません。学習記録はこの端末に残っています。
          </p>
        )}
        {result && result.overall === "error" && (
          <p className="inline-flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            同期に失敗しました。時間をおいて再度お試しください。
          </p>
        )}
        {result && (result.overall === "partial" || result.overall === "deferred") && (
          <p role="status" className="text-xs text-amber-700 dark:text-amber-400">
            {result.overall === "partial"
              ? "一部の同期に失敗しました。端末の記録は残っています。再試行できます。"
              : "保存先の変更または未確認のため、同期を保留しました。端末の記録は残っています。"}
          </p>
        )}
      </div>
    </div>
  );
}
