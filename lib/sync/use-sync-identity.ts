"use client";

import * as React from "react";
import { readOwnership, readSyncAccount, type SyncAccount, type OwnershipState } from "./ownership";
import { SYNC_SESSION_CHANGED, useObservedSyncAccount } from "./session-observation";

export function useSyncIdentity(enabled = true) {
  const readObservedAccount = useObservedSyncAccount();
  const [account, setAccount] = React.useState<SyncAccount | null>(null);
  const [checking, setChecking] = React.useState(true);
  const [unavailable, setUnavailable] = React.useState(false);
  const [ownership, setOwnership] = React.useState<OwnershipState>("unknown");
  const [confirmedFor, setConfirmedFor] = React.useState<string | null>(null);
  const [revision, refreshLocal] = React.useReducer((value: number) => value + 1, 0);
  const refresh = React.useCallback(() => {
    if (readObservedAccount) window.dispatchEvent(new Event(SYNC_SESSION_CHANGED));
    else refreshLocal();
  }, [readObservedAccount]);
  React.useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let generation = 0;
    async function check() {
      const request = ++generation;
      setChecking(true);
      setConfirmedFor(null);
      try {
        const current = await (readObservedAccount ?? readSyncAccount)();
        if (cancelled || request !== generation) return;
        setAccount(current);
        setUnavailable(false);
        setOwnership(current ? readOwnership(current.id) : "unknown");
        setConfirmedFor(null);
      } catch {
        if (!cancelled && request === generation) {
          setAccount(null);
          setUnavailable(true);
          setOwnership("unknown");
          setConfirmedFor(null);
        }
      } finally {
        if (!cancelled && request === generation) setChecking(false);
      }
    }
    void check();
    const recheck = () => { void check(); };
    window.addEventListener("focus", recheck);
    window.addEventListener("storage", recheck);
    window.addEventListener("mobile:entitlement-changed", recheck);
    window.addEventListener("online", recheck);
    window.addEventListener(SYNC_SESSION_CHANGED, recheck);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", recheck);
      window.removeEventListener("storage", recheck);
      window.removeEventListener("mobile:entitlement-changed", recheck);
      window.removeEventListener("online", recheck);
      window.removeEventListener(SYNC_SESSION_CHANGED, recheck);
    };
  }, [revision, enabled, readObservedAccount]);
  return { account, checking, unavailable, ownership, confirmedFor, setConfirmedFor, refresh };
}
