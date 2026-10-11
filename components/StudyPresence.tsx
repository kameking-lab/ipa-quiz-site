"use client";

import { useEffect } from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import { canonicalPresenceExam, isActiveStudyTab, isPresenceBot, parseStudyPresence, PRESENCE_EVENT, PRESENCE_EXAM_ATTRIBUTE, PRESENCE_POLL_MS, PRESENCE_WINDOW_MS, type StudyPresenceSnapshot } from "@/lib/study-presence";

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
    let lastAttempt = 0;
    let controller: AbortController | undefined;
    const emit = (snapshot: StudyPresenceSnapshot | null) => window.dispatchEvent(new CustomEvent(PRESENCE_EVENT, { detail: snapshot }));
    const currentExam = () => {
      const code = document.querySelector(`[${PRESENCE_EXAM_ATTRIBUTE}]`)?.getAttribute(PRESENCE_EXAM_ATTRIBUTE);
      return code ? canonicalPresenceExam(code) : null;
    };
    let exam = currentExam();
    async function tick() {
      if (disposed) return;
      if (!isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now())) {
        emit(null); return;
      }
      if (busy || Date.now() - lastAttempt < PRESENCE_POLL_MS) return;
      busy = true; lastAttempt = Date.now();
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), 8_000);
      try {
        const send = async () => {
          // A lock wait may span navigation/backgrounding; snapshot only at send time.
          if (disposed || controller?.signal.aborted || !isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now())) return null;
          const activeExam = currentExam();
          const activityAt = lastActivity;
          const identifier = activeExam ? visitorId(Boolean(navigator.locks)) : null;
          const body = identifier ? JSON.stringify({ visitorId: identifier.id, previousVisitorId: identifier.previousVisitorId,
            idleMs: Math.min(Date.now() - activityAt, PRESENCE_WINDOW_MS - 1), exam: activeExam }) : undefined;
          const response = await fetch("/api/stats/study-presence", {
            method: body ? "POST" : "GET", headers: body ? { "Content-Type": "application/json" } : undefined,
            body, cache: "no-store", signal: controller?.signal,
          });
          const payload: unknown = await response.json();
          const snapshot = response.ok ? parseStudyPresence(payload) : null;
          if (snapshot && identifier?.previousVisitorId && localStorage.getItem(LS_KEYS.studyPresenceVisitor) === identifier.stored) {
            localStorage.setItem(LS_KEYS.studyPresenceVisitor, identifier.stored.split("|").slice(0, 2).join("|"));
          }
          return snapshot;
        };
        // Hold the same browser lock through acknowledgement, including daily rotation.
        const snapshot = navigator.locks && exam
          ? await navigator.locks.request(LS_KEYS.studyPresenceVisitor, { signal: controller.signal }, send) : await send();
        if (!disposed && isActiveStudyTab(document.visibilityState === "visible", lastActivity, Date.now())) emit(snapshot);
      } catch { if (!disposed) emit(null); }
      finally { clearTimeout(timeout); busy = false; }
    }
    const activity = () => { lastActivity = Date.now(); void tick(); };
    const visibility = () => {
      if (document.visibilityState === "visible") activity(); else emit(null);
    };
    // React question changes do not always change the URL (search/mixed pools).
    const observer = new MutationObserver(() => {
      const next = currentExam();
      if (exam === next) return;
      exam = next;
      if (document.visibilityState === "visible") activity();
    });
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: [PRESENCE_EXAM_ATTRIBUTE] });
    const events = ["pointerdown", "keydown", "scroll"] as const;
    events.forEach(event => window.addEventListener(event, activity, { passive: true }));
    document.addEventListener("visibilitychange", visibility);
    const timer = setInterval(() => void tick(), PRESENCE_POLL_MS);
    const initial = setTimeout(() => void tick(), 0);
    return () => {
      disposed = true; controller?.abort(); observer.disconnect(); clearTimeout(initial); clearInterval(timer);
      events.forEach(event => window.removeEventListener(event, activity));
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return null;
}
