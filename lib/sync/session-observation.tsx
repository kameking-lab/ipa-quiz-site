"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from "react";
import { readSyncAccount, type SyncAccount } from "./ownership";

type SessionReader = () => Promise<SyncAccount | null>;
const SessionReaderContext = createContext<SessionReader | null>(null);
export const SYNC_SESSION_CHANGED = "sync:session-changed";

/** Share the browser's display/eligibility check with widgets that mount after hydration. */
export function SyncSessionObservationProvider({ children }: { children: ReactNode }) {
  const current = useRef<ReturnType<SessionReader> | null>(null);
  const read = useCallback(function readObservedSession(): ReturnType<SessionReader> {
    if (current.current) return current.current;
    const request: ReturnType<SessionReader> = readSyncAccount().then(
      account => current.current === request ? account : readObservedSession(),
      (error: unknown) => {
        if (current.current !== request) return readObservedSession();
        throw error;
      },
    );
    current.current = request;
    return request;
  }, []);

  useEffect(() => {
    const invalidate = () => { current.current = null; };
    const events = ["focus", "online", "storage", "mobile:entitlement-changed", SYNC_SESSION_CHANGED];
    // Invalidate before the display and sync consumers receive the event.
    for (const event of events) window.addEventListener(event, invalidate, true);
    const visible = () => { if (!document.hidden) invalidate(); };
    document.addEventListener("visibilitychange", visible, true);
    const refresh = () => window.dispatchEvent(new Event(SYNC_SESSION_CHANGED));
    const restored = (event: PageTransitionEvent) => { if (event.persisted) refresh(); };
    window.addEventListener("pageshow", restored);
    const channel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel("next-auth");
    const sessionChanged = (event: MessageEvent<{ event?: string }>) => {
      if (event.data?.event === "session") refresh();
    };
    channel?.addEventListener("message", sessionChanged);
    return () => {
      for (const event of events) window.removeEventListener(event, invalidate, true);
      document.removeEventListener("visibilitychange", visible, true);
      window.removeEventListener("pageshow", restored);
      channel?.close();
    };
  }, []);

  return <SessionReaderContext.Provider value={read}>{children}</SessionReaderContext.Provider>;
}

export function useObservedSyncAccount(): SessionReader | null {
  return useContext(SessionReaderContext);
}
