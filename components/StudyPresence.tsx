"use client";

import { useEffect } from "react";
import { isActiveStudyTab, PRESENCE_EVENT, PRESENCE_POLL_MS } from "@/lib/study-presence";

const STORAGE_KEY = "study-presence-visitor";
function visitorId() {
  // One random identifier per browser, rotated daily; no login, IP or study answers.
  const day = new Date().toISOString().slice(0, 10);
  const saved = localStorage.getItem(STORAGE_KEY)?.split("|");
  if (saved?.[0] === day && saved[1]) return saved[1];
  const id = crypto.randomUUID();
  localStorage.setItem(STORAGE_KEY, `${day}|${id}`);
  return id;
}

/** Mounted in the root layout so learners on quiz pages count too. */
export function StudyPresence() {
  useEffect(() => {
    let disposed = false;
    let busy = false;
    let lastActivity = Date.now();
    let lastAttempt = 0;
    let controller: AbortController | undefined;
    const emit = (count: number | null) => window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail: count }));
    async function tick() {
      if (disposed) return;
      if (!isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now())) {
        emit(null);
        return;
      }
      if (busy || Date.now() - lastAttempt < PRESENCE_POLL_MS) return;
      busy = true;
      lastAttempt = Date.now();
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), 8_000);
      try {
        // Web Locks prevents a simultaneous first visit in two tabs minting two IDs.
        const id = navigator.locks
          ? await navigator.locks.request(STORAGE_KEY, visitorId)
          : visitorId();
        if (disposed) return;
        const response = await fetch("/api/stats/study-presence", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId: id, idleMs: Math.min(Date.now() - lastActivity, 119_999) }), cache: "no-store", signal: controller.signal,
        });
        const data = response.ok ? await response.json() : null;
        if (!disposed && isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now())) {
          emit(Number.isSafeInteger(data?.count) && data.count >= 0 ? data.count : null);
        }
      } catch {
        if (!disposed) emit(null);
      } finally {
        clearTimeout(timeout);
        busy = false;
      }
    }
    const activity = () => { lastActivity = Date.now(); void tick(); };
    const visibility = () => {
      if (document.visibilityState === "visible") activity(); else emit(null);
    };
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    document.addEventListener("visibilitychange", visibility);
    const timer = setInterval(() => void tick(), PRESENCE_POLL_MS);
    // Deferring initial emission lets sibling display components subscribe first.
    const initial = setTimeout(() => void tick(), 0);
    return () => {
      disposed = true; controller?.abort(); clearTimeout(initial); clearInterval(timer);
      events.forEach(event => window.removeEventListener(event, activity));
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return null;
}
