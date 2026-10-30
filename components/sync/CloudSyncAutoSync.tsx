"use client";

import * as React from "react";
import { Cloud, CloudUpload, CheckCircle2 } from "lucide-react";
import { syncAll } from "@/lib/sync";
import { LS_KEYS } from "@/lib/storage/keys";
import { readOwnership, readSyncAccount } from "@/lib/sync/ownership";

type Phase = "idle" | "syncing" | "done";
interface Toast { message: string; tone: "info" | "success" }

/** Optional browser-owned data only. Failed attempts remain eligible for retry. */
export function CloudSyncAutoSync() {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [toast, setToast] = React.useState<Toast | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    let running = false;
    let dismiss: ReturnType<typeof setTimeout> | undefined;
    async function run() {
      if (running || cancelled) return;
      running = true;
      let leaseKey: string | undefined;
      let lease: string | undefined;
      try {
        const account = await readSyncAccount();
        if (!account || cancelled || readOwnership(account.id) !== "matching") return;
        const suffix = encodeURIComponent(account.id);
        const successKey = LS_KEYS.syncSessionSuccessPrefix + suffix;
        leaseKey = LS_KEYS.syncSessionInFlightPrefix + suffix;
        try {
          if (sessionStorage.getItem(successKey) === "1") return;
          const previous = sessionStorage.getItem(leaseKey);
          if (previous && Date.now() - Number(previous.split(":")[0]) < 60000) return;
          lease = Date.now() + ":" + window.crypto.randomUUID();
          sessionStorage.setItem(leaseKey, lease);
        } catch {
          // Storage restrictions disable the session guard, not ownership checks.
        }
        if (dismiss) clearTimeout(dismiss);
        setToast(null);
        setPhase("syncing");
        const result = await syncAll({ expectedUserId: account.id });
        if (cancelled) return;
        setPhase("done");
        if (result.overall === "ok") {
          try { sessionStorage.setItem(successKey, "1"); } catch { /* optional guard */ }
          setToast({ tone: "success", message: "学習履歴・ブックマーク・タグ・学習計画を同期しました。" });
        } else {
          setToast({
            tone: "info",
            message: result.overall === "partial"
              ? "一部の同期に失敗しました。端末の記録は残っています。設定から再試行できます。"
              : "同期を完了できませんでした。端末の記録は残っています。設定から再試行できます。",
          });
        }
        dismiss = setTimeout(() => {
          if (!cancelled) { setPhase("idle"); setToast(null); }
        }, 4000);
      } catch {
        if (!cancelled) { setPhase("idle"); setToast(null); }
      } finally {
        if (leaseKey && lease) {
          try {
            if (sessionStorage.getItem(leaseKey) === lease) sessionStorage.removeItem(leaseKey);
          } catch { /* optional guard */ }
        }
        running = false;
      }
    }
    void run();
    const retry = () => { void run(); };
    window.addEventListener("focus", retry);
    window.addEventListener("online", retry);
    return () => {
      cancelled = true;
      if (dismiss) clearTimeout(dismiss);
      window.removeEventListener("focus", retry);
      window.removeEventListener("online", retry);
    };
  }, []);

  if (phase === "idle" && !toast) return null;
  return (
    <div className="pointer-events-none fixed bottom-3 left-3 z-30" role="status" aria-live="polite">
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm">
        {phase === "syncing" ? (
          <><CloudUpload className="h-3.5 w-3.5 animate-pulse text-sky-600 dark:text-sky-400" aria-hidden="true" />同期中…</>
        ) : (
          <>
            {toast?.tone === "success"
              ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              : <Cloud className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />}
            {toast?.message}
          </>
        )}
      </div>
    </div>
  );
}
