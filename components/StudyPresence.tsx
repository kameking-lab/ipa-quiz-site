"use client";

import { useEffect } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { isActiveStudyTab, isPresenceBot, PRESENCE_EVENT, PRESENCE_VIEWER_ATTRIBUTE, PRESENCE_REFRESH_MS, PRESENCE_IDLE_MS } from "@/lib/study-presence";
import { PRESENCE_STATE_EVENT, PRESENCE_REPLAY_EVENT, presenceFallback, presenceViewState, presenceRetryDelay, presenceRetryAfterMs, type MeasuredPresence, type PresenceViewState } from "@/lib/study-presence-contract";

/** Only room viewers fetch a snapshot. Answer handlers publish separately. */
export function StudyPresence() {
  useEffect(() => {
    if (nativeClient() || navigator.webdriver || isPresenceBot(navigator.userAgent)) return;
    let disposed = false;
    let busy = false;
    let lastActivity = Date.now();
    let nextAttempt = 0;
    let failures = 0;
    let previous: MeasuredPresence | null = null;
    let controller: AbortController | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let expiryTimer: ReturnType<typeof setTimeout> | undefined;
    let latestState: PresenceViewState = presenceFallback(null, "initial");
    const emit = (state: PresenceViewState) => {
      latestState = state;
      clearTimeout(expiryTimer);
      window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT, { detail: state }));
      // Legacy consumers label a two-minute window. Keep that event neutral;
      // the homepage consumes the explicit five-minute contract above.
      window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail: null }));
      if (state.mode === "measured") expiryTimer = setTimeout(() => {
        if (!disposed) emit(presenceFallback(previous, "expired"));
      }, Math.max(0, Date.parse(state.snapshot.validUntil) - Date.now()));
    };
    const replay = () => window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT, { detail:
      latestState.mode === "measured" && Date.parse(latestState.snapshot.validUntil) <= Date.now()
        ? presenceFallback(latestState.snapshot, "expired") : latestState,
    }));
    window.addEventListener(PRESENCE_REPLAY_EVENT, replay);
    const hasViewer = () => Boolean(document.querySelector(`[${PRESENCE_VIEWER_ATTRIBUTE}]`));
    const active = () => isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now());
    let viewer = hasViewer();
    function schedule() {
      clearTimeout(timer);
      if (!disposed && active() && viewer && !busy) {
        timer = setTimeout(() => void tick(), Math.min(2_147_483_647, Math.max(0, nextAttempt - Date.now())));
      }
    }
    function armIdle() {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        clearTimeout(timer); controller?.abort();
        if (!disposed) emit(presenceFallback(previous, "inactive"));
      }, PRESENCE_IDLE_MS);
    }
    async function tick() {
      if (disposed) return;
      if (!active() || !viewer) {
        emit(presenceFallback(previous, document.visibilityState === "visible" ? "inactive" : "hidden")); return;
      }
      if (busy) return;
      if (Date.now() < nextAttempt) { schedule(); return; }
      busy = true; nextAttempt = Date.now() + PRESENCE_REFRESH_MS;
      controller = new AbortController();
      const signal = controller.signal;
      const timeout = setTimeout(() => controller?.abort(), 8_000);
      let retryAfter = 0;
      try {
        const response = await fetch("/api/stats/study-presence", { method: "GET", cache: "no-store", signal });
        retryAfter = presenceRetryAfterMs(response.headers.get("Retry-After"));
        const payload: unknown = await response.json();
        if (!disposed && !signal.aborted && active() && viewer) {
          const state = presenceViewState(payload, response.status === 200 && response.ok, previous);
          if (state.mode === "measured") { previous = state.snapshot; failures = 0; }
          else {
            if (state.mode === "stale") previous = state.previous;
            nextAttempt = Date.now() + Math.max(PRESENCE_REFRESH_MS, presenceRetryDelay(++failures), retryAfter);
          }
          emit(state);
        }
      } catch {
        if (!disposed && active() && viewer) {
          nextAttempt = Date.now() + Math.max(PRESENCE_REFRESH_MS, presenceRetryDelay(++failures), retryAfter);
          emit(presenceFallback(previous, "unavailable"));
        }
      } finally { clearTimeout(timeout); busy = false; schedule(); }
    }
    const activity = () => { lastActivity = Date.now(); armIdle(); schedule(); };
    const visibility = () => {
      if (document.visibilityState === "visible") activity();
      else { clearTimeout(timer); clearTimeout(idleTimer); controller?.abort(); emit(presenceFallback(previous, "hidden")); }
    };
    const observer = new MutationObserver(() => {
      const next = hasViewer();
      if (viewer === next) return;
      viewer = next;
      if (!viewer) { clearTimeout(timer); controller?.abort(); emit(presenceFallback(previous, "inactive")); return; }
      if (document.visibilityState === "visible") activity();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: [PRESENCE_VIEWER_ATTRIBUTE] });
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    document.addEventListener("visibilitychange", visibility);
    emit(presenceFallback(null, "initial")); armIdle(); schedule();
    return () => {
      disposed = true; controller?.abort(); observer.disconnect(); clearTimeout(timer); clearTimeout(idleTimer); clearTimeout(expiryTimer);
      events.forEach(event => window.removeEventListener(event, activity));
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener(PRESENCE_REPLAY_EVENT, replay);
    };
  }, []);
  return null;
}
