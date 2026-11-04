import { Capacitor, registerPlugin } from "@capacitor/core";

export type TrackingStatus = "notDetermined" | "restricted" | "denied" | "authorized";
const TrackingTransparency = registerPlugin<{
  prepare(): Promise<void>;
  status(): Promise<{ status: TrackingStatus }>;
  requestPermission(): Promise<{ status: TrackingStatus }>;
}>("TrackingTransparency");

// Policy gate: Google Mobile Ads / WebView API integration is NOT installed.
// Change only with owner approval, SDK consent integration and physical-device QA.
export const TRACKING_ADS_AVAILABLE = false;
export function canTrack(status: TrackingStatus): boolean {
  return TRACKING_ADS_AVAILABLE && status === "authorized";
}
export async function requestTrackingPermission(): Promise<TrackingStatus> {
  if (!Capacitor.isNativePlatform() || !TRACKING_ADS_AVAILABLE) return "restricted";
  // Native code also checks foreground state and never reads IDFA.
  return (await TrackingTransparency.requestPermission()).status;
}
export async function trackingStatus(): Promise<TrackingStatus> {
  if (!Capacitor.isNativePlatform()) return "restricted";
  try { return (await TrackingTransparency.status()).status; }
  catch { return "restricted"; }
}

export async function prepareTrackingPrivacy(): Promise<void> {
  if (Capacitor.isNativePlatform()) await TrackingTransparency.prepare();
}
