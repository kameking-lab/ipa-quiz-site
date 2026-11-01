"use client";

import * as React from "react";
import { readOwnership, readSyncAccount, type SyncAccount, type OwnershipState } from "./ownership";

export function useSyncIdentity() {
  const [account, setAccount] = React.useState<SyncAccount | null>(null);
  const [checking, setChecking] = React.useState(true);
  const [ownership, setOwnership] = React.useState<OwnershipState>("unknown");
  const [confirmedFor, setConfirmedFor] = React.useState<string | null>(null);
  const [revision, refresh] = React.useReducer((value: number) => value + 1, 0);
  React.useEffect(() => {
    let cancelled = false;
    let generation = 0;
    async function check() {
      const request = ++generation;
      setChecking(true);
      setConfirmedFor(null);
      try {
        const current = await readSyncAccount();
        if (cancelled || request !== generation) return;
        setAccount(current);
        setOwnership(current ? readOwnership(current.id) : "unknown");
        setConfirmedFor(null);
      } catch {
        if (!cancelled && request === generation) {
          setAccount(null);
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
    return () => {
      cancelled = true;
      window.removeEventListener("focus", recheck);
      window.removeEventListener("storage", recheck);
    };
  }, [revision]);
  return { account, checking, ownership, confirmedFor, setConfirmedFor, refresh };
}
