"use client";

import { hasCardToday, initializeStudyMilestones } from "@/lib/sharing/milestone-storage";

import {
  createContext, useCallback, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import { nativeClient } from "@/mobile/shared/contracts";
import { canShowInstallNudge, installDay, readInstallNudge, writeInstallNudge } from "@/lib/pwa/install-nudge";

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

type MobileOs = "iphone" | "android" | "unknown";
export type InstallPhase = "idle" | "prompting" | "accepted" | "dismissed" | "error" | "installed";
type InstallOutcome = "accepted" | "dismissed" | "error" | "unavailable" | "busy" | "stale";

interface MobileInstallContextValue {
  ready: boolean;
  os: MobileOs;
  standalone: boolean;
  available: boolean;
  phase: InstallPhase;
  install(): Promise<InstallOutcome>;
  beforeCompletion(listener: () => void): () => void;
  native: boolean;
  nudgeOwner: string | null;
  claimNudge(id: string): boolean;
  releaseNudge(id: string): void;
  markNudgeShown(id: string): boolean;
  dismissNudge(): void;
}

export const MobileInstallContext = createContext<MobileInstallContextValue | null>(null);

function mobileOs(): MobileOs {
  if (/android/i.test(navigator.userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) return "iphone";
  return "unknown";
}

/** One collector at the root keeps an unused browser event across page navigation. */
export function MobileInstallProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [os, setOs] = useState<MobileOs>("unknown");
  const [standalone, setStandalone] = useState(false);
  const [available, setAvailable] = useState(false);
  const [phase, setPhase] = useState<InstallPhase>("idle");
  const [native, setNative] = useState(false);
  const [nudgeOwner, setNudgeOwner] = useState<string | null>(null);
  const owner = useRef<string | null>(null);
  const deferred = useRef<InstallPromptEvent | null>(null);
  const pending = useRef(false);
  const mounted = useRef(false);
  const generation = useRef(0);
  const completed = useRef(false);
  const installed = useRef(false);
  const completionListeners = useRef(new Set<() => void>());

  const beforeCompletion = useCallback((listener: () => void) => {
    completionListeners.current.add(listener);
    return () => { completionListeners.current.delete(listener); };
  }, []);

  useEffect(() => {
    initializeStudyMilestones();
    mounted.current = true;
    let cancelled = false;
    const detectedOs = mobileOs();
    const isNative = nativeClient();
    setNative(isNative);
    try { installed.current = installed.current || localStorage.getItem(LS_KEYS.mobileInstalled) === "1"; } catch { /* optional */ }
    const displayMode = window.matchMedia("(display-mode: standalone)");
    const currentStandalone = () => displayMode.matches
      || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    completed.current = currentStandalone() || installed.current;
    setOs(detectedOs);
    setStandalone(currentStandalone());
    if (installed.current) setPhase("installed");

    const clearRequest = () => {
      generation.current += 1;
      deferred.current = null;
      pending.current = false;
      setAvailable(false);
    };
    const onBeforeInstall = (event: Event) => {
      // Desktop browser prompts are outside this smartphone feature's scope.
      if (detectedOs !== "android" || isNative || completed.current) return;
      event.preventDefault();
      deferred.current = event as InstallPromptEvent;
      setAvailable(true);
    };
    const onInstalled = () => {
      if (installed.current) return;
      if (!completed.current) completionListeners.current.forEach((listener) => listener());
      installed.current = true;
      try { localStorage.setItem(LS_KEYS.mobileInstalled, "1"); } catch { /* retain in memory */ }
      completed.current = true;
      clearRequest();
      setPhase("installed");
    };
    const onDisplayMode = () => {
      const nextStandalone = currentStandalone();
      if (nextStandalone && !completed.current) {
        completionListeners.current.forEach((listener) => listener());
        clearRequest();
        setPhase("idle");
      }
      completed.current = nextStandalone || installed.current;
      setStandalone(nextStandalone);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    displayMode.addEventListener("change", onDisplayMode);
    const onStorage = (event: StorageEvent) => {
      if (event.storageArea && event.storageArea !== localStorage) return;
      if (event.key === LS_KEYS.mobileInstalled && event.newValue === "1") onInstalled();
      if (event.key === LS_KEYS.mobileInstallNudge || event.key === null) {
        const record = readInstallNudge();
        // Another tab checking writable storage has not shown or dismissed it.
        if (!record || !canShowInstallNudge(record, Date.now())) {
          owner.current = null;
          setNudgeOwner(null);
        }
      }
      if (event.key === LS_KEYS.achievementCardDay || event.key === null) clearForCard();
    };
    const clearForCard = () => {
      if (!hasCardToday()) return;
      owner.current = null;
      setNudgeOwner(null);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("study-card:shown", clearForCard);
    const relatedNavigator = navigator as Navigator & { getInstalledRelatedApps?: () => Promise<{ platform: string; url?: string }[]> };
    if (detectedOs === "android" && !isNative && relatedNavigator.getInstalledRelatedApps) {
      // Do not flash the invitation while installation detection is pending.
      void relatedNavigator.getInstalledRelatedApps().then((apps) => {
        if (!cancelled && apps.some((app) => app.platform === "webapp"
          && app.url === new URL("/manifest.webmanifest", location.origin).href)) onInstalled();
      }).catch(() => { /* Browser prompt availability remains the fallback. */ })
        .finally(() => { if (!cancelled) setReady(true); });
    } else setReady(true);
    return () => {
      cancelled = true;
      mounted.current = false;
      generation.current += 1;
      pending.current = false;
      deferred.current = null;
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      displayMode.removeEventListener("change", onDisplayMode);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("study-card:shown", clearForCard);
    };
  }, []);

  const releaseNudge = useCallback((id: string) => {
    if (owner.current !== id) return;
    owner.current = null;
    setNudgeOwner(null);
  }, []);
  const claimNudge = useCallback((id: string) => {
    if (hasCardToday()) return false;
    if (owner.current && owner.current !== id) return false;
    const record = readInstallNudge();
    if (!record || !canShowInstallNudge(record, Date.now()) || !writeInstallNudge(record)) return false;
    owner.current = id;
    setNudgeOwner(id);
    return true;
  }, []);
  const markNudgeShown = useCallback((id: string) => {
    if (owner.current !== id) return false;
    const record = readInstallNudge();
    if (hasCardToday() || !record || !canShowInstallNudge(record, Date.now())
      || !writeInstallNudge({ ...record, shownDay: installDay(Date.now()) })) {
      releaseNudge(id);
      return false;
    }
    return true;
  }, [releaseNudge]);
  const dismissNudge = useCallback(() => {
    const record = readInstallNudge();
    if (record) writeInstallNudge({ ...record, dismissedAt: Date.now() });
    owner.current = null;
    setNudgeOwner(null);
  }, []);

  const install = useCallback(async (): Promise<InstallOutcome> => {
    if (pending.current) return "busy";
    const event = deferred.current;
    if (!event || completed.current) return "unavailable";
    const request = ++generation.current;
    // Consume synchronously; a second click cannot reuse this event.
    deferred.current = null;
    pending.current = true;
    setAvailable(false);
    setPhase("prompting");
    try {
      await event.prompt();
      const choice = await event.userChoice;
      if (!mounted.current || request !== generation.current) return "stale";
      if (choice.outcome === "dismissed") dismissNudge();
      setPhase(choice.outcome); // Acceptance is not installation completion.
      return choice.outcome;
    } catch {
      if (!mounted.current || request !== generation.current) return "stale";
      setPhase("error");
      return "error";
    } finally {
      if (mounted.current && request === generation.current) pending.current = false;
      // Do not clear a new event received while the old prompt was pending.
    }
  }, [dismissNudge]);

  const value = useMemo(() => ({
    ready, os, standalone, available, phase, install, beforeCompletion,
    native, nudgeOwner, claimNudge, releaseNudge, markNudgeShown, dismissNudge,
  }), [ready, os, standalone, available, phase, install, beforeCompletion,
    native, nudgeOwner, claimNudge, releaseNudge, markNudgeShown, dismissNudge]);
  return <MobileInstallContext.Provider value={value}>{children}</MobileInstallContext.Provider>;
}
