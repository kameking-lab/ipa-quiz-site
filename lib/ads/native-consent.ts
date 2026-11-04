import { nativeClient } from "@/mobile/shared/contracts";
import { disableTrackingAds, enableTrackingAds, prepareTrackingPrivacy, requestTrackingPermission } from "@/mobile/src/tracking";

interface ConsentMode {
  adStoragePurposeConsentStatus?: number;
  adUserDataPurposeConsentStatus?: number;
  adPersonalizationPurposeConsentStatus?: number;
  analyticsStoragePurposeConsentStatus?: number;
}
interface TCData {
  gdprApplies?: boolean; cmpStatus?: string; eventStatus?: string; tcString?: string;
  vendor?: { consents?: Record<number, boolean> };
  purpose?: { consents?: Record<number, boolean> };
}
interface FundingChoices {
  callbackQueue: { push(value: Record<string, () => void>): unknown };
  getGoogleConsentModeValues?: () => ConsentMode;
  usstatesoptout?: { getInitialUsStatesOptOutStatus?: () => number | undefined };
  showRevocationMessage?: () => void;
}
export interface GppEvent {
  eventName?: string;
  data?: unknown;
  listenerId?: number;
  pingData?: { cmpStatus?: string; signalStatus?: string; cmpDisplayStatus?: string };
}
declare global {
  interface Window {
    googlefc?: FundingChoices;
    __tcfapi?: (command: string, version: number, callback: (data: TCData, success: boolean) => void) => void;
    __gpp?: (command: string, callback: (event: GppEvent, success: boolean) => void) => void;
  }
}
export function allowsConsentMode(mode?: ConsentMode): boolean {
  // Unknown, denied AND not configured all fail closed. Configure consent mode
  // support in Google's EU message; no locale/IP guesses in application code.
  return !!mode && [mode.adStoragePurposeConsentStatus, mode.adUserDataPurposeConsentStatus,
    mode.adPersonalizationPurposeConsentStatus, mode.analyticsStoragePurposeConsentStatus]
    .every(value => value === 1 || value === 3);
}
export function allowsTCF(data: TCData | undefined | null, success: boolean): boolean {
  if (!success || !data || data.cmpStatus !== "loaded") return false;
  if (data.gdprApplies === false) return true;
  return data.gdprApplies === true && !!data.tcString &&
    (data.eventStatus === "tcloaded" || data.eventStatus === "useractioncomplete") &&
    data.vendor?.consents?.[755] === true && [1, 3, 4].every(id => data.purpose?.consents?.[id] === true);
}

export interface NativeAdsState { available: boolean; ready: boolean; client: string; slot: string }
const initial: NativeAdsState = { available: false, ready: false, client: "", slot: "" };
let state = initial;
const subscribers = new Set<() => void>();
export const getNativeAdsState = () => state;
export const getNativeAdsServerState = () => initial;
export function subscribeNativeAds(listener: () => void) { subscribers.add(listener); return () => { subscribers.delete(listener); }; }
function update(next: NativeAdsState) { state = next; subscribers.forEach(listener => listener()); }
let startup: Promise<void> | undefined;
let changeCurrent: (() => Promise<void>) | undefined;
export const nativeAdsNavigation = { reload: () => window.location.reload() };

export function startNativeAds(): Promise<void> {
  if (!nativeClient()) return Promise.resolve();
  return startup ??= initialize().catch(() => { update({ ...state, ready: false }); });
}

async function initialize() {
  const configuration = await prepareTrackingPrivacy();
  if (!configuration.enabled) return;
  update({ available: false, ready: false, client: configuration.client, slot: configuration.slot });
  // No SDK registration, CMP script or ad tag before affirmative ATT permission.
  if (await requestTrackingPermission() !== "authorized") return;

  let modeReady = false, usReady = false, usAllowed = false, tcfAllowed = false;
  let revoked = false, enabling = false, hadAds = false, changingConsent = false;
  const revoke = async () => {
    revoked = true;
    update({ ...state, ready: false });
    // Restore native network blocking and unload any previously running tags.
    try { await disableTrackingAds(true); }
    catch { nativeAdsNavigation.reload(); }
  };
  const pauseForConsentChange = async () => {
    // A CMP emits "not ready" BEFORE opening its choice UI. Block immediately,
    // but keep that UI alive until it can save the user's new decision.
    revoked = true;
    changingConsent = true;
    update({ ...state, ready: false });
    try { await disableTrackingAds(false); }
    catch { nativeAdsNavigation.reload(); }
  };
  const finishConsentChange = async () => {
    if (!changingConsent) return;
    changingConsent = false;
    try { await disableTrackingAds(false); }
    finally { nativeAdsNavigation.reload(); }
  };
  changeCurrent = async () => {
    await pauseForConsentChange();
    window.googlefc?.callbackQueue.push({ CONSENT_API_READY: () => window.googlefc?.showRevocationMessage?.() });
  };
  const check = async () => {
    if (revoked) return;
    let modeAllowed = false;
    try { modeAllowed = modeReady && allowsConsentMode(window.googlefc?.getGoogleConsentModeValues?.()); }
    catch { /* unknown remains denied */ }
    const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    const allowed = modeAllowed && usReady && usAllowed && tcfAllowed && !gpc;
    if (!allowed) { if (state.ready || enabling) await revoke(); return; }
    if (state.ready || enabling) return;
    enabling = true;
    const enabled = await enableTrackingAds();
    enabling = false;
    // Consent can be withdrawn while the native bridge promise is in flight.
    if (revoked) { await disableTrackingAds(!changingConsent); return; }
    if (enabled) { hadAds = true; update({ ...state, ready: true }); }
  };
  const safeCheck = () => { void check().catch(() => { void revoke(); }); };
  window.googlefc ??= { callbackQueue: [] };
  window.googlefc.callbackQueue ??= [];
  window.googlefc.callbackQueue.push({ CONSENT_API_READY: () => {
    update({ ...state, available: true });
    try {
      window.__tcfapi?.("addEventListener", 2, (data, success) => {
        tcfAllowed = allowsTCF(data, success);
        if (success && data?.eventStatus === "cmpuishown" && (hadAds || enabling)) {
          void pauseForConsentChange(); return;
        }
        if (success && data?.eventStatus === "useractioncomplete" && changingConsent) {
          void finishConsentChange().catch(() => {}); return;
        }
        safeCheck();
      });
    } catch { void revoke(); }
  } });
  window.googlefc.callbackQueue.push({ CONSENT_MODE_DATA_READY: () => { modeReady = true; safeCheck(); } });
  window.googlefc.callbackQueue.push({ INITIAL_US_STATES_OPT_OUT_DATA_READY: () => {
    try {
      const status = window.googlefc?.usstatesoptout?.getInitialUsStatesOptOutStatus?.();
      usAllowed = status === 1 || status === 2;
      // Initial US data is a snapshot. Subscribe to GPP changes, never keep
      // using that snapshot after a user changes their privacy choice.
      if (window.__gpp) {
        let registered = false;
        window.__gpp("addEventListener", (event, success) => {
          if (!success || !event || event.eventName === "error" ||
              event.pingData?.cmpStatus === "error" ||
              (event.eventName === "cmpStatus" && event.data === "error") ||
              (event.eventName === "listenerRegistered" && (event.data !== true ||
                !Number.isSafeInteger(event.listenerId) || (event.listenerId ?? 0) <= 0))) {
            usReady = false;
            void revoke(); return;
          }
          if (event.eventName === "listenerRegistered") registered = true;
          // Listener registration is NOT consent readiness. Every event carries
          // the current CMP/signal status, including the initial callback.
          usReady = registered && event.pingData?.cmpStatus === "loaded" &&
            event.pingData?.signalStatus === "ready" &&
            !(event.eventName === "signalStatus" && event.data === "not ready");
          if (changingConsent) {
            if (usReady && event.pingData?.cmpDisplayStatus !== "visible") {
              void finishConsentChange().catch(() => {});
            }
            return;
          }
          if (event.eventName === "sectionChange" || (!usReady && (hadAds || enabling))) {
            void pauseForConsentChange();
            if (usReady && event.pingData?.cmpDisplayStatus !== "visible") {
              void finishConsentChange().catch(() => {});
            }
            return;
          }
          // check also revokes during an in-flight native enable operation.
          safeCheck();
        });
      } else if (status === 1) { usReady = true; safeCheck(); }
    } catch { void revoke(); }
  } });

  const script = document.createElement("script");
  script.src = configuration.cmpScriptUrl;
  script.async = true;
  script.onerror = () => { void revoke(); };
  document.head.appendChild(script);
  // Observe changed consent-mode values and GPC even after the initial callbacks.
  window.setInterval(safeCheck, 1000);
  document.addEventListener("visibilitychange", safeCheck);
}

export async function changeNativeAdsConsent() {
  // Google's standard US Do Not Sell/Share link is never overridden or hidden.
  await changeCurrent?.();
}
