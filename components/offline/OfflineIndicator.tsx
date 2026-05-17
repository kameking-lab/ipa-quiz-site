"use client";

import * as React from "react";
import Link from "next/link";
import { WifiOff } from "lucide-react";

export function OfflineIndicator() {
  const [offline, setOffline] = React.useState(false);

  React.useEffect(() => {
    if (typeof navigator === "undefined") return;
    setOffline(!navigator.onLine);
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-3 z-[80] flex justify-center px-4 print:hidden"
    >
      <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/95 px-3 py-1.5 text-xs font-medium text-amber-800 shadow-sm backdrop-blur dark:border-amber-900/40 dark:bg-amber-950/80 dark:text-amber-200">
        <WifiOff className="h-3.5 w-3.5" aria-hidden="true" />
        オフライン中
        <Link
          href="/offline"
          className="ml-1 underline decoration-amber-400 underline-offset-2 hover:text-amber-900 dark:hover:text-amber-100"
        >
          演習可能な問題を見る
        </Link>
      </div>
    </div>
  );
}
