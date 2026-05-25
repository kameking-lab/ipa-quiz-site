"use client";

import * as React from "react";
import Link from "next/link";
import { Cloud, CloudUpload, CheckCircle2, AlertCircle, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { syncAll, readSyncMeta, type SyncAllResult } from "@/lib/sync";

type AuthState = "checking" | "in" | "out";

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
  const [auth, setAuth] = React.useState<AuthState>("checking");
  const [busy, setBusy] = React.useState(false);
  const [result, setResult] = React.useState<SyncAllResult | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = React.useState(0);

  React.useEffect(() => {
    setLastSyncedAt(readSyncMeta().lastSyncedAt);
    // NextAuth exposes the current session at /api/auth/session.
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => setAuth(s && s.user ? "in" : "out"))
      .catch(() => setAuth("out"));
  }, []);

  async function handleSync() {
    setBusy(true);
    setResult(null);
    try {
      const r = await syncAll();
      setResult(r);
      if (r.overall === "unauthenticated") setAuth("out");
      setLastSyncedAt(readSyncMeta().lastSyncedAt);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="space-y-3 p-4 text-sm text-muted-foreground">
        <p>
          学習履歴・ブックマーク・カスタムタグ・学習計画をクラウドにバックアップし、
          別の端末でも同じ状態で続けられます。同期は<strong className="text-foreground">任意</strong>です。
          サインインしなくても全機能をそのままご利用いただけます。
        </p>

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

        {auth === "out" ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs">
              クラウド同期にはサインインが必要です（メールのマジックリンク等）。
            </p>
            <Button asChild variant="primary" size="sm" className="w-fit gap-2">
              <Link href="/auth/signin?callbackUrl=/settings">
                <LogIn className="h-4 w-4" aria-hidden="true" />
                サインインして同期
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              className="gap-2"
              onClick={handleSync}
              disabled={busy || auth === "checking"}
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
              最終同期: {formatRelative(lastSyncedAt)}
            </span>
          </div>
        )}

        {result && result.overall === "unavailable" && (
          <p className="inline-flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            クラウド同期は現在準備中です。データはこの端末に安全に保存されています。
          </p>
        )}
        {result && result.overall === "error" && (
          <p className="inline-flex items-center gap-1 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            同期に失敗しました。時間をおいて再度お試しください。
          </p>
        )}
      </div>
    </div>
  );
}
