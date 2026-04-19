"use client";

import { useState } from "react";
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
      <div className="flex flex-wrap gap-2">
        <Button
          variant="primary"
          onClick={handleSync}
          disabled={loading !== null}
        >
          {loading === "sync" ? "同期中..." : "クラウドと同期"}
        </Button>
        <Button
          variant="outline"
          onClick={handleExport}
          disabled={loading !== null}
        >
          {loading === "export" ? "出力中..." : "履歴を JSON でエクスポート"}
        </Button>
      </div>
      {result && (
        <p className="text-xs text-emerald-700 dark:text-emerald-400">
          同期完了: {result.merged} 件を追加、合計 {result.total} 件をこのブラウザに反映しました。
        </p>
      )}
      {error && (
        <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        localStorage とクラウド DB の履歴を双方向マージします。どの端末からも最新状態で続きができます。
      </p>
    </div>
  );
}
