"use client";

import { useEffect } from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import { canonicalPresenceExam, isActiveStudyTab, isPresenceBot, PRESENCE_EVENT, PRESENCE_EXAM_ATTRIBUTE, PRESENCE_VIEWER_ATTRIBUTE, PRESENCE_REFRESH_MS, PRESENCE_IDLE_MS } from "@/lib/study-presence";
import { PRESENCE_STATE_EVENT, presenceFallback, presenceViewState, presenceRetryDelay, presenceRetryAfterMs, type MeasuredPresence, type PresenceViewState } from "@/lib/study-presence-contract";

interface BrowserIdentifier { id: string; previousVisitorId?: string; stored: string }
function visitorId(canRotate: boolean): BrowserIdentifier | null {
  const day = new Date().toISOString().slice(0, 10);
  const saved = localStorage.getItem(LS_KEYS.studyPresenceVisitor)?.split("|");
  const validId = (value: string | undefined) => value && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  if (saved?.[0] === day && validId(saved[1])) return { id: saved[1]!, previousVisitorId: validId(saved[2]) ? saved[2] : undefined, stored: saved.join("|") };
  // Without cross-tab locking, don't race another tab to mint/rotate a new ID.
  if (!canRotate) return null;
  const id = crypto.randomUUID();
  const previousVisitorId = validId(saved?.[1]) ? saved?.[1] : undefined;
  const stored = [day, id, ...(previousVisitorId ? [previousVisitorId] : [])].join("|");
  // Old ID is temporary retry state in the existing key, cleared after acknowledgement.
  localStorage.setItem(LS_KEYS.studyPresenceVisitor, stored);
  return { id, previousVisitorId, stored };
}

/** Questions expose only their qualification, including mixed-exam quiz pools. */
export function StudyPresence() {
  useEffect(() => {
    if (navigator.webdriver || isPresenceBot(navigator.userAgent)) return;
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
    const emit = (state: PresenceViewState) => {
      clearTimeout(expiryTimer);
      window.dispatchEvent(new CustomEvent(PRESENCE_STATE_EVENT, { detail: state }));
      // Legacy consumers label a two-minute window. Keep that event neutral;
      // the homepage consumes the explicit five-minute contract above.
      window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail: null }));
      if (state.mode === "measured") expiryTimer = setTimeout(() => {
        if (!disposed) emit(presenceFallback(previous, "expired"));
      }, Math.max(0, Date.parse(state.snapshot.validUntil) - Date.now()));
    };
    const currentExam = () => {
      const code = document.querySelector(`[${PRESENCE_EXAM_ATTRIBUTE}]`)?.getAttribute(PRESENCE_EXAM_ATTRIBUTE);
      return code ? canonicalPresenceExam(code) : null;
    };
    const hasViewer = () => Boolean(document.querySelector(`[${PRESENCE_VIEWER_ATTRIBUTE}]`));
    const active = () => isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now());
    const needed = () => Boolean(currentExam() || hasViewer());
    let exam = currentExam();
    let viewer = hasViewer();
    function schedule() {
      clearTimeout(timer);
      if (!disposed && active() && needed() && !busy) {
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
      if (!active() || !needed()) {
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
        const send = async () => {
          // A lock wait may span navigation/backgrounding; snapshot only at send time.
          if (disposed || signal.aborted || !active() || !needed()) return null;
          const activeExam = currentExam();
          const activityAt = lastActivity;
          const identifier = activeExam ? visitorId(Boolean(navigator.locks)) : null;
          const body = identifier ? JSON.stringify({ visitorId: identifier.id, previousVisitorId: identifier.previousVisitorId,
            idleMs: Math.min(Date.now() - activityAt, PRESENCE_IDLE_MS - 1), exam: activeExam }) : undefined;
          const response = await fetch("/api/stats/study-presence", {
            method: body ? "POST" : "GET", headers: body ? { "Content-Type": "application/json" } : undefined,
            body, cache: "no-store", signal,
          });
          retryAfter = presenceRetryAfterMs(response.headers.get("Retry-After"));
          const payload: unknown = await response.json();
          const state = presenceViewState(payload, response.status === 200 && response.ok, previous);
          if (state.mode === "measured" && identifier?.previousVisitorId && localStorage.getItem(LS_KEYS.studyPresenceVisitor) === identifier.stored) {
            localStorage.setItem(LS_KEYS.studyPresenceVisitor, identifier.stored.split("|").slice(0, 2).join("|"));
          }
          return state;
        };
        // Hold the same browser lock through acknowledgement, including daily rotation.
        const state = navigator.locks && exam
          ? await navigator.locks.request(LS_KEYS.studyPresenceVisitor, { signal }, send) : await send();
        if (!disposed && !signal.aborted && active() && needed() && state) {
          if (state.mode === "measured") { previous = state.snapshot; failures = 0; }
          else {
            if (state.mode === "stale") previous = state.previous;
            nextAttempt = Date.now() + Math.max(PRESENCE_REFRESH_MS, presenceRetryDelay(++failures), retryAfter);
          }
          emit(state);
        }
      } catch {
        if (!disposed && active() && needed()) {
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
    // React question changes do not always change the URL (search/mixed pools).
    const observer = new MutationObserver(() => {
      const next = currentExam();
      const nextViewer = hasViewer();
      if (exam === next && viewer === nextViewer) return;
      exam = next; viewer = nextViewer;
      if (!needed()) { clearTimeout(timer); controller?.abort(); emit(presenceFallback(previous, "inactive")); return; }
      if (document.visibilityState === "visible") activity();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: [PRESENCE_EXAM_ATTRIBUTE, PRESENCE_VIEWER_ATTRIBUTE] });
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    document.addEventListener("visibilitychange", visibility);
    emit(presenceFallback(null, "initial")); armIdle(); schedule();
    return () => {
      disposed = true; controller?.abort(); observer.disconnect(); clearTimeout(timer); clearTimeout(idleTimer); clearTimeout(expiryTimer);
      events.forEach(event => window.removeEventListener(event, activity));
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return null;
}
