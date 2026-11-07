import { Capacitor, registerPlugin } from "@capacitor/core";

export type TrackingStatus = "notDetermined" | "restricted" | "denied" | "authorized";
export interface AdsConfiguration { enabled: boolean; client: string; slot: string; cmpScriptUrl: string }
const TrackingTransparency = registerPlugin<{
  prepare(): Promise<AdsConfiguration>;
  status(): Promise<{ status: TrackingStatus }>;
  requestPermission(): Promise<{ status: TrackingStatus }>;
  enableAds(): Promise<{ enabled: boolean }>;
  disableAds(options: { reload: boolean }): Promise<void>;
}>("TrackingTransparency");

const disabled: AdsConfiguration = { enabled: false, client: "", slot: "", cmpScriptUrl: "" };
let preparation: Promise<AdsConfiguration> | undefined;
/**
 * Installs native ad-host blocking. Never rejects: a missing plugin or a rule
 * list that cannot be compiled leaves ads disabled for this document (ATT and
 * enableAds are never reached) but must not stop the learning app starting.
 */
export function prepareTrackingPrivacy(): Promise<AdsConfiguration> {
  if (!Capacitor.isNativePlatform()) return Promise.resolve(disabled);
  return preparation ??= TrackingTransparency.prepare()
    .then(config => config?.enabled === true ? config : disabled)
    .catch((error: unknown) => {
      console.error("[tracking] privacy preparation failed; ads stay disabled", error);
      return disabled;
    });
}
export function canTrack(status: TrackingStatus): boolean { return status === "authorized"; }
export async function requestTrackingPermission(): Promise<TrackingStatus> {
  if (!Capacitor.isNativePlatform()) return "restricted";
  try {
    if (!(await prepareTrackingPrivacy()).enabled) return "restricted";
    return (await TrackingTransparency.requestPermission()).status;
  } catch { return "restricted"; }
}
export async function trackingStatus(): Promise<TrackingStatus> {
  if (!Capacitor.isNativePlatform()) return "restricted";
  try { return (await TrackingTransparency.status()).status; }
  catch { return "restricted"; }
}
export async function enableTrackingAds(): Promise<boolean> {
  try {
    // Never enable ads unless this document's native blocking was installed.
    if (!(await prepareTrackingPrivacy()).enabled) return false;
    return (await TrackingTransparency.enableAds()).enabled === true;
  }
  catch { return false; }
}
export async function disableTrackingAds(reload = false): Promise<void> {
  if (Capacitor.isNativePlatform()) await TrackingTransparency.disableAds({ reload });
}
