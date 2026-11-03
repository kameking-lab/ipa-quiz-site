"use client";
import { useEffect } from "react";
import { nativeClient } from "@/mobile/shared/contracts";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (nativeClient()) {
      // Native offline access is exclusively governed by the signed paid lease.
      void navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister())));
      return;
    }

    let cancelled = false;

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js");
        if (cancelled) return;

        // If a new SW is waiting after an update, tell it to activate
        // immediately so the user sees fresh content on next navigation.
        if (reg.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
        reg.addEventListener("updatefound", () => {
          const next = reg.installing;
          if (!next) return;
          next.addEventListener("statechange", () => {
            if (next.state === "installed" && navigator.serviceWorker.controller) {
              next.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });
      } catch {
        // Enhancement only — silent fail is acceptable
      }
    };

    register();

    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
