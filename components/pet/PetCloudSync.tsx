"use client";

import { useEffect } from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import { lastPetAccountOwner, PET_ACCOUNT_OWNER_EVENT } from "@/lib/pet/v1/cloud-signal";
import type { PetCloudSync as PetCloudSyncEngine } from "@/lib/pet/v1/cloud-sync";

/**
 * Layout-level, invisible. Starts the chihuahua cloud save only after the pet
 * runtime has seen a signed-in owner (guests never load it or call the API),
 * then keeps the account copy in step: batched writes after study, an
 * immediate write when the page is hidden, a pull when the page comes back.
 */
export function PetCloudSync() {
  useEffect(() => {
    // The bundled offline app origin has no server; it keeps its local copy.
    if (location.protocol !== "https:" && location.protocol !== "http:") return;
    let disposed = false, scope: string | null = null;
    let engine: Promise<PetCloudSyncEngine | null> = Promise.resolve(null);
    const withEngine = (action: (sync: PetCloudSyncEngine) => void) => { void engine.then(sync => { if (sync && !disposed) action(sync); }); };
    const restart = (ownerScope: string | null) => {
      scope = ownerScope;
      const previous = engine;
      engine = previous.then(async old => {
        old?.stop();
        if (disposed || ownerScope === null) return null;
        const { browserPetCloudSync } = await import("@/lib/pet/v1/cloud-sync");
        const sync = await browserPetCloudSync();
        if (disposed || scope !== ownerScope || !await sync.start()) { sync.stop(); if (scope === ownerScope) scope = null; return null; }
        return sync;
      }).catch(() => { scope = null; return null; });
    };
    const signalled = (event: Event) => {
      const ownerScope = (event as CustomEvent<{ ownerScope?: unknown }>).detail?.ownerScope;
      if (typeof ownerScope === "string" && ownerScope !== scope) restart(ownerScope);
    };
    const changed = () => withEngine(sync => sync.requestSync());
    const hidden = () => { if (document.visibilityState === "hidden") withEngine(sync => void sync.flush()); else withEngine(sync => sync.refresh()); };
    const leaving = () => withEngine(sync => void sync.flush());
    const online = () => withEngine(sync => void sync.syncNow(false));
    // Sign-out / account switch: drop the engine; the next pet view signals again.
    const ownerChanged = () => { if (scope !== null) restart(null); };
    const storage = (event: StorageEvent) => { if (event.key === null || event.key === LS_KEYS.syncLocalOwner) ownerChanged(); };
    const initial = lastPetAccountOwner();
    if (initial) restart(initial);
    window.addEventListener(PET_ACCOUNT_OWNER_EVENT, signalled);
    window.addEventListener("pet-v1:committed", changed);
    window.addEventListener("pet-v1:updated", changed);
    window.addEventListener("pet-v1:owner-changed", ownerChanged);
    window.addEventListener("storage", storage);
    window.addEventListener("online", online);
    window.addEventListener("pagehide", leaving);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      disposed = true;
      window.removeEventListener(PET_ACCOUNT_OWNER_EVENT, signalled);
      window.removeEventListener("pet-v1:committed", changed);
      window.removeEventListener("pet-v1:updated", changed);
      window.removeEventListener("pet-v1:owner-changed", ownerChanged);
      window.removeEventListener("storage", storage);
      window.removeEventListener("online", online);
      window.removeEventListener("pagehide", leaving);
      document.removeEventListener("visibilitychange", hidden);
      void engine.then(sync => sync?.stop());
    };
  }, []);
  return null;
}
