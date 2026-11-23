"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { cleanupDeadOnboardingKeys } from "@/lib/onboarding/state";

// Layout-level widgets that are not part of the LCP. Loaded on idle / after first paint
// to keep the critical path lean and improve INP.
const KeyboardShortcutsHelp = dynamic(
  () => import("@/components/KeyboardShortcutsHelp").then((m) => m.KeyboardShortcutsHelp),
  { ssr: false },
);
const StreakTracker = dynamic(
  () => import("@/lib/streak/StreakTracker").then((m) => m.StreakTracker),
  { ssr: false },
);
const BadgeTracker = dynamic(
  () => import("@/components/motivation/BadgeTracker").then((m) => m.BadgeTracker),
  { ssr: false },
);
const OfflineIndicator = dynamic(
  () => import("@/components/offline/OfflineIndicator").then((m) => m.OfflineIndicator),
  { ssr: false },
);
const PetCloudSync = dynamic(
  () => import("@/components/pet/PetCloudSync").then((m) => m.PetCloudSync),
  { ssr: false },
);
const CloudSyncAutoSync = dynamic(
  () => import("@/components/sync/CloudSyncAutoSync").then((m) => m.CloudSyncAutoSync),
  { ssr: false },
);

export function DeferredLayoutWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // One-time cleanup of the dead legacy onboarding key (phase 11 / #9).
    cleanupDeadOnboardingKeys();
    const ric =
      (typeof window !== "undefined" &&
        (window as Window & {
          requestIdleCallback?: (cb: () => void) => number;
        }).requestIdleCallback) ||
      ((cb: () => void) => window.setTimeout(cb, 200));
    const handle = ric(() => setReady(true));
    return () => {
      const ci =
        (typeof window !== "undefined" &&
          (window as Window & {
            cancelIdleCallback?: (handle: number) => void;
          }).cancelIdleCallback) ||
        clearTimeout;
      try {
        ci(handle as number);
      } catch {
        /* noop */
      }
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <KeyboardShortcutsHelp />
      <StreakTracker />
      <BadgeTracker />
      <OfflineIndicator />
      <CloudSyncAutoSync />
      <PetCloudSync />
    </>
  );
}
