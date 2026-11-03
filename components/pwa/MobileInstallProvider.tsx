"use client";

import {
  createContext, useCallback, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from "react";

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
    mounted.current = true;
    const detectedOs = mobileOs();
    const displayMode = window.matchMedia("(display-mode: standalone)");
    const currentStandalone = () => displayMode.matches
      || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    completed.current = currentStandalone() || installed.current;
    setOs(detectedOs);
    setStandalone(currentStandalone());
    setReady(true);

    const clearRequest = () => {
      generation.current += 1;
      deferred.current = null;
      pending.current = false;
      setAvailable(false);
    };
    const onBeforeInstall = (event: Event) => {
      // Desktop browser prompts are outside this smartphone feature's scope.
      if (detectedOs !== "android" || completed.current) return;
      event.preventDefault();
      deferred.current = event as InstallPromptEvent;
      setAvailable(true);
    };
    const onInstalled = () => {
      if (installed.current) return;
      if (!completed.current) completionListeners.current.forEach((listener) => listener());
      installed.current = true;
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
    return () => {
      mounted.current = false;
      generation.current += 1;
      pending.current = false;
      deferred.current = null;
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
      displayMode.removeEventListener("change", onDisplayMode);
    };
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
  }, []);

  const value = useMemo(() => ({
    ready, os, standalone, available, phase, install, beforeCompletion,
  }), [ready, os, standalone, available, phase, install, beforeCompletion]);
  return <MobileInstallContext.Provider value={value}>{children}</MobileInstallContext.Provider>;
}
