"use client";

import * as React from "react";
import { Cloud, CloudUpload, CheckCircle2 } from "lucide-react";
import { syncAll, readSyncMeta } from "@/lib/sync";

// Once-per-browser-session guard so we don't re-run on every navigation.
const SESSION_FLAG = "ipa-quiz:cloud-sync-session-ran";

type Phase = "idle" | "syncing" | "done";

interface Toast {
  message: string;
  tone: "info" | "success";
}

/**
 * Background auto-sync for signed-in opt-in users. On the first page after
 * sign-in (once per session) it:
 *   - pushes LocalStorage data to the cloud and merges back,
 *   - shows a subtle status pill ("同期中…" → result),
 *   - surfaces first-sync onboarding and cross-device merge notifications.
 * Completely inert for signed-out users (the LocalStorage-first contract).
 * Mounted via DeferredLayoutWidgets so it never blocks the critical path.
 */
export function CloudSyncAutoSync() {
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [toast, setToast] = React.useState<Toast | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    try {
      if (sessionStorage.getItem(SESSION_FLAG) === "1") return;
    } catch {
      /* sessionStorage unavailable — proceed without the guard */
    }

    void (async () => {
      // Only auto-sync signed-in users.
      let signedIn = false;
      try {
        const res = await fetch("/api/auth/session");
        const s = res.ok ? await res.json() : null;
        signedIn = Boolean(s && s.user);
      } catch {
        signedIn = false;
      }
      if (!signedIn || cancelled) return;

      try {
        sessionStorage.setItem(SESSION_FLAG, "1");
      } catch {
        /* ignore */
      }

      const firstEver = readSyncMeta().lastSyncedAt === 0;
      setPhase("syncing");
      const result = await syncAll();
      if (cancelled) return;
      setPhase("done");

      if (result.overall === "ok" || result.overall === "partial") {
        const mergedFromCloud = Object.values(result.byType).reduce(
          (sum, s) => sum + (s.state === "ok" && "merged" in s ? s.merged : 0),
          0,
        );
        if (firstEver) {
          setToast({
            tone: "success",
            message: "学習データをクラウドに保存しました。他の端末でも使えます。",
          });
        } else if (mergedFromCloud > 0) {
          setToast({ tone: "success", message: "他の端末の変更を反映しました。" });
        }
      }
      // Auto-dismiss the pill/toast after a few seconds.
      window.setTimeout(() => {
        if (!cancelled) {
          setPhase("idle");
          setToast(null);
        }
      }, 4000);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (phase === "idle" && !toast) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-3 left-3 z-30"
      role="status"
      aria-live="polite"
    >
      <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/95 px-3 py-1.5 text-[11px] font-medium text-foreground shadow-sm backdrop-blur-sm">
        {phase === "syncing" ? (
          <>
            <CloudUpload className="h-3.5 w-3.5 animate-pulse text-sky-600 dark:text-sky-400" aria-hidden="true" />
            同期中…
          </>
        ) : toast ? (
          <>
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            {toast.message}
          </>
        ) : (
          <>
            <Cloud className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
            同期完了
          </>
        )}
      </div>
    </div>
  );
}
