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
export function prepareTrackingPrivacy(): Promise<AdsConfiguration> {
  if (!Capacitor.isNativePlatform()) return Promise.resolve(disabled);
  // One preparation per document. Failure remains a rejection so the shell
  // cannot navigate to remote pages without native network protection.
  return preparation ??= TrackingTransparency.prepare();
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
  try { return (await TrackingTransparency.enableAds()).enabled === true; }
  catch { return false; }
}
export async function disableTrackingAds(reload = false): Promise<void> {
  if (Capacitor.isNativePlatform()) await TrackingTransparency.disableAds({ reload });
}
