"use client";
import { useEffect, useRef, useState } from "react";
import type { PetProfileDocument } from "@/lib/pet/v1/profile";
import type { PetLearningResult } from "@/lib/pet/v1/learning";
import type { PetOwnerLease } from "@/lib/pet/v1/runtime";
import { LS_KEYS } from "@/lib/storage/keys";

export interface PetCommittedDetail { ownerScope: string; qualificationId: string; questionId: string; eventId: string; occurredAt: number; result: PetLearningResult }
export interface PetProfileView { status: "loading" | "ready" | "unavailable"; document: PetProfileDocument | null }
/** Read-only views never migrate, reward, replay or write a profile. */
export function usePetProfileView(onFresh: (event: PetCommittedDetail) => void, supplied?: PetProfileView) {
  const [view, setView] = useState<PetProfileView>({ status: "loading", document: null });
  const shared = supplied !== undefined;
  const fresh = useRef(onFresh); useEffect(() => { fresh.current = onFresh; }, [onFresh]);
  useEffect(() => {
    if (shared) return;
    let generation = 0, disposed = false, owner: PetOwnerLease | null = null;
    const mountedAt = Date.now(), seen = new Set<string>();
    let latest: PetProfileDocument | null = null;
    const currentDocument = (): PetProfileDocument | null => latest;
    const runtime = import("@/lib/pet/v1/runtime");
    const refresh = async () => {
      const epoch = ++generation; owner = null; latest = null;
      setView({ status: "loading", document: null });
      try {
        const petRuntime = await runtime;
        const lease = await petRuntime.preparePetOwner(() => !disposed && epoch === generation);
        if (!lease || !lease.isCurrent()) { if (!disposed && epoch === generation) setView({ status: "unavailable", document: null }); return; }
        owner = lease;
        const loaded = await petRuntime.browserPetProfiles().load(lease, Intl.DateTimeFormat().resolvedOptions().timeZone);
        if (!lease.isCurrent()) return;
        if (loaded.status !== "ready") { setView({ status: "unavailable", document: null }); return; }
        const existing = currentDocument();
        if (existing?.ownerScope === loaded.document.ownerScope && existing.revision > loaded.document.revision) return;
        latest = loaded.document;
        setView({ status: "ready", document: loaded.document });
      } catch { if (!disposed && epoch === generation) setView({ status: "unavailable", document: null }); }
    };
    const committed = (event: Event) => {
      const detail = (event as CustomEvent<PetCommittedDetail>).detail;
      if (!owner?.isCurrent() || !detail || detail.ownerScope !== owner.ownerScope || detail.result?.document?.ownerScope !== owner.ownerScope) return;
      const doc = detail.result.document;
      if (latest?.ownerScope === doc.ownerScope && latest.revision > doc.revision) return;
      latest = doc;
      setView({ status: "ready", document: doc });
      if (seen.has(detail.eventId) || detail.occurredAt < mountedAt) return;
      seen.add(detail.eventId); fresh.current(detail);
    };
    const storage = (event: StorageEvent) => {
      if (event.key === null || event.key === LS_KEYS.syncLocalOwner || event.key?.startsWith(LS_KEYS.petProfilesPrefix)) void refresh();
    };
    const updated = (event: Event) => {
      const doc = (event as CustomEvent<PetProfileDocument>).detail;
      if (!owner?.isCurrent() || doc?.ownerScope !== owner.ownerScope || (latest && doc.revision < latest.revision)) return;
      latest = doc; setView({ status: "ready", document: doc });
    };
    const visible = () => { if (!document.hidden) void refresh(); };
    void refresh();
    window.addEventListener("pet-v1:committed", committed);
    window.addEventListener("pet-v1:updated", updated);
    window.addEventListener("pet-v1:owner-changed", refresh);
    window.addEventListener("storage", storage);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", visible);
    return () => { disposed = true; generation++; window.removeEventListener("pet-v1:committed", committed); window.removeEventListener("pet-v1:updated", updated); window.removeEventListener("pet-v1:owner-changed", refresh);
      window.removeEventListener("storage", storage); window.removeEventListener("focus", refresh); document.removeEventListener("visibilitychange", visible); };
  }, [shared]);
  return supplied ?? view;
}
