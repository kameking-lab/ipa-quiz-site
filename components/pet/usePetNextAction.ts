"use client";
import { useEffect, useState } from "react";
import { getCards, type SrsCard } from "@/lib/learning/spaced-repetition";
import { petNextAction } from "@/lib/pet/v1/next-action";
import type { PetProfile, PetProfileDocument } from "@/lib/pet/v1/profile";
import { petMemoryPreview } from "@/lib/pet/v1/album";
import { petNextStageProgress } from "@/lib/pet/v1/growth";

export function usePetNextAction(profile: PetProfile | undefined, doc: PetProfileDocument | null | undefined) {
  const [clock, setClock] = useState<{ now: number; cards: SrsCard[] } | null>(null);
  useEffect(() => {
    const update = () => { if (!document.hidden) setClock({ now: Date.now(), cards: getCards() }); };
    update();
    const timer = setInterval(update, 60_000);
    window.addEventListener("focus", update); document.addEventListener("visibilitychange", update);
    return () => { clearInterval(timer); window.removeEventListener("focus", update); document.removeEventListener("visibilitychange", update); };
  }, [doc]);
  return profile && doc && clock ? { ...petNextAction(profile, doc, clock.now, clock.cards), memory: petMemoryPreview(profile, doc, clock.now), stageProgress: petNextStageProgress(profile) } : null;
}
