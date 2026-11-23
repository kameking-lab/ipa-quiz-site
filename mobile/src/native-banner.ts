import { Capacitor, registerPlugin } from "@capacitor/core";
import { useEffect, useState } from "react";
import type { MobileEntitlement } from "../shared/contracts";
import type { TrackingStatus } from "./tracking";

type BannerMode = "personalized" | "nonPersonalized";
export interface NativeBannerBridge {
  config(): Promise<{ enabled: boolean; privacyOptionsRequired: boolean }>;
  prepareBanner(options: { productId: string }): Promise<{ consent: boolean; tracking?: TrackingStatus }>;
  showBanner(options: { mode: BannerMode }): Promise<void>;
  hideBanner(): Promise<void>;
  privacyOptions(): Promise<void>;
}
const NativeBanner = registerPlugin<NativeBannerBridge>("KakomonBannerAds");
let bannerGeneration = 0;

const browseRoots = new Set(["/", "/ip", "/fe", "/sg", "/ap", "/sc", "/pm", "/db", "/es", "/au", "/nw", "/st", "/sa", "/sm"]);
export function isBannerPage(path: string) {
  return browseRoots.has(path) || /^\/(?:blog|qualifications|e-learning\/exams\/qualifications)\/[^/]+$/.test(path);
}

export async function loadFreeBanner(
  bridge: NativeBannerBridge,
  access: Pick<MobileEntitlement, "entitled" | "source"> | null,
  productId: string,
  current: () => boolean,
  verifyFree: () => Promise<boolean>,
) {
  if (access?.entitled !== false || access.source !== "free" || !productId ||
    !(await bridge.config()).enabled || !current() || !(await verifyFree()) || !current()) return;
  const { consent, tracking } = await bridge.prepareBanner({ productId });
  if (!current() || !consent) return;
  if (tracking === "authorized") await bridge.showBanner({ mode: "personalized" });
  if (tracking === "denied") await bridge.showBanner({ mode: "nonPersonalized" });
}

function hasNativeBanner() {
  return Capacitor.isNativePlatform() && Capacitor.isPluginAvailable("KakomonBannerAds");
}

export function hideNativeBanner() {
  bannerGeneration += 1;
  if (hasNativeBanner()) void NativeBanner.hideBanner().catch(() => {});
}

export function useNativeBanner(access: MobileEntitlement | null, productId: string, eligible: boolean, pathname: string) {
  const [foreground, setForeground] = useState(0);
  const entitled = access?.entitled;
  const source = access?.source;
  const userId = access?.userId;
  useEffect(() => {
    if (!hasNativeBanner()) return;
    const refreshVisibility = () => {
      if (document.hidden) hideNativeBanner();
      setForeground(value => value + 1);
    };
    const restorePage = (event: PageTransitionEvent) => { if (event.persisted) refreshVisibility(); };
    document.addEventListener("visibilitychange", refreshVisibility);
    window.addEventListener("offline", hideNativeBanner);
    window.addEventListener("online", refreshVisibility);
    window.addEventListener("pagehide", hideNativeBanner);
    window.addEventListener("pageshow", restorePage);
    return () => {
      document.removeEventListener("visibilitychange", refreshVisibility);
      window.removeEventListener("offline", hideNativeBanner);
      window.removeEventListener("online", refreshVisibility);
      window.removeEventListener("pagehide", hideNativeBanner);
      window.removeEventListener("pageshow", restorePage);
    };
  }, []);
  useEffect(() => {
    if (!hasNativeBanner() || !eligible || document.hidden || !navigator.onLine || !isBannerPage(pathname) ||
      entitled !== false || source !== "free" || userId === undefined) return;
    const abort = new AbortController();
    const generation = bannerGeneration;
    const current = () => generation === bannerGeneration && !abort.signal.aborted && !document.hidden &&
      !document.querySelector('meta[name="robots"][content*="noindex"], [data-native-banner-exclude]');
    if (!current()) return;
    void loadFreeBanner(NativeBanner, { entitled, source }, productId, current, async () => {
      // POST is the existing authoritative Web + RevenueCat check. GET can
      // fall back to cached study rights during a RevenueCat outage.
      const timeout = window.setTimeout(() => abort.abort(), 12_000);
      const result = await fetch("/api/mobile/entitlement", { method: "POST", cache: "no-store", signal: abort.signal })
        .then(response => response.ok ? response.json() : null).finally(() => clearTimeout(timeout)) as {
        entitlement?: MobileEntitlement;
        configuration?: { sdkKey?: string; productId?: string };
      } | null;
      if (!result) return false;
      const { entitlement, configuration } = result;
      return entitlement?.userId === userId && entitlement.entitled === false && entitlement.source === "free" &&
        (userId === null || !!entitlement.appUserId) && !!configuration?.sdkKey && configuration.productId === productId;
    }).catch(() => {});
    return () => { abort.abort(); hideNativeBanner(); };
  }, [eligible, entitled, source, userId, productId, pathname, foreground]);
}

export function useAdPrivacyOptions(open: boolean) {
  const [required, setRequired] = useState(false);
  useEffect(() => {
    if (!open || !hasNativeBanner()) return;
    let current = true;
    void NativeBanner.config().then(config => {
      if (current) setRequired(config.enabled && config.privacyOptionsRequired);
    }).catch(() => {});
    return () => { current = false; };
  }, [open]);
  return open && required ? () => { void NativeBanner.privacyOptions().catch(() => {}); } : undefined;
}
