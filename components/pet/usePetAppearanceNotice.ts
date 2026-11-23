"use client";
import { useEffect, useState } from "react";
import type { PetProfile } from "@/lib/pet/v1/profile";

// Presentation acknowledgement only. Never part of growth, cloud sync or backups.
export function usePetAppearanceNotice(owner: string | undefined, profile: PetProfile | undefined) {
  const stage = (["expert", "partner"] as const).find(stage => profile?.unlockedStages.includes(stage));
  const token = stage ? `${stage}:${profile?.memories.find(memory => memory.kind === "stage" && memory.stage === stage)?.occurredAt ?? 0}` : "";
  const key = owner && profile ? `ipa-quiz:pet-appearance-seen:v1:${JSON.stringify([owner, profile.qualificationId])}` : "";
  const [seen, setSeen] = useState({ key: "", token: "" });
  useEffect(() => {
    const read = () => {
      let saved = "";
      try { saved = localStorage.getItem(key) ?? ""; } catch { /* optional display preference */ }
      setSeen({ key, token: saved });
    };
    read();
    window.addEventListener("storage", read);
    window.addEventListener("pet-v1:appearance-seen", read);
    return () => { window.removeEventListener("storage", read); window.removeEventListener("pet-v1:appearance-seen", read); };
  }, [key]);
  const acknowledge = () => {
    if (!key || !token) return;
    setSeen({ key, token });
    try { localStorage.setItem(key, token); window.dispatchEvent(new Event("pet-v1:appearance-seen")); } catch { /* retain in this view */ }
  };
  return { unseen: stage && seen.key === key && seen.token !== token && profile?.selectedStage !== stage ? stage : null, acknowledge };
}
