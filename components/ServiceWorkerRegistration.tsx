"use client";
import { useEffect } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { startPwaUpdates } from "@/lib/pwa/updates";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    return startPwaUpdates({
      buildId: process.env.NEXT_PUBLIC_PWA_BUILD_ID ?? "development",
      native: nativeClient(),
    });
  }, []);
  return null;
}
