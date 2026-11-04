"use client";

import { useEffect, useSyncExternalStore } from "react";
import { changeNativeAdsConsent, getNativeAdsServerState, getNativeAdsState, startNativeAds, subscribeNativeAds } from "@/lib/ads/native-consent";

export function NativeAdPrivacy() {
  const state = useSyncExternalStore(subscribeNativeAds, getNativeAdsState, getNativeAdsServerState);
  useEffect(() => { void startNativeAds(); }, []);
  if (!state.available) return null;
  return <button type="button" className="text-xs underline" onClick={() => { void changeNativeAdsConsent(); }}>広告のプライバシー設定</button>;
}
