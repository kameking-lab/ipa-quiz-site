"use client";

import { useState } from "react";
import { CloudUpload, Download, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LS_KEYS } from "@/lib/storage/keys";

interface SyncResult {
  merged: number;
  total: number;
}

interface ClientEntry {
  id: string;
  selected?: string;
  correct: boolean;
  at: number;
}

function readLocalHistory(): ClientEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEYS.history);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { entries?: ClientEntry[] };
    return Array.isArray(parsed.entries) ? parsed.entries : [];
  } catch {
    return [];
  }
}

function writeLocalHistory(entries: ClientEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.history);
    const parsed = raw ? (JSON.parse(raw) as { starredIds?: string[] }) : {};
    window.localStorage.setItem(
      LS_KEYS.history,
      JSON.stringify({
        entries,
        starredIds: Array.isArray(parsed.starredIds) ? parsed.starredIds : [],
      }),
    );
  } catch {
    // ignore quota errors
  }
}

export function HistorySyncPanel() {
  const [loading, setLoading] = useState<"sync" | "export" | null>(null);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSync() {
    setError(null);
    setResult(null);
    setLoading("sync");
    try {
      const local = readLocalHistory();
      const res = await fetch("/api/account/history-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries: local }),
      });
      if (!res.ok) {
        const txt = await res.text();
        setError(`同期失敗 (${res.status}): ${txt}`);
        return;
      }
      const data = (await res.json()) as {
        entries: ClientEntry[];
        merged: number;
        total: number;
      };
      writeLocalHistory(data.entries);
      setResult({ merged: data.merged, total: data.total });
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(null);
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
      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSync}
          disabled={loading !== null}
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
        <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <p className="text-xs leading-relaxed text-muted-foreground">
        localStorage と クラウド DB の履歴を双方向マージ。どの端末からも続きから学習できます。
      </p>
    </div>
  );
}
