"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { getNativeAdsServerState, getNativeAdsState, startNativeAds, subscribeNativeAds } from "@/lib/ads/native-consent";
import { WEB_ADSENSE_CLIENT } from "@/lib/ads/web-ads";
import { onBrowserIdle } from "@/lib/performance/browser-idle";

declare global {
  interface Window {
    adsbygoogle?: Record<string, never>[];
  }
}

export function ContentEndAd() {
  // Web inventory is managed by WebAutoAds. Native inventory can still use a
  // separate publisher after the native consent and registration checks.
  const native = useSyncExternalStore(subscribeNativeAds, getNativeAdsState, getNativeAdsServerState);
  useEffect(() => { void startNativeAds(); }, []);
  return native.ready && nativeClient() && native.client !== WEB_ADSENSE_CLIENT
    ? <NativeContentEndAd client={native.client} slot={native.slot} /> : null;
}

function NativeContentEndAd({ client, slot }: { client: string; slot: string }) {
  const placementRef = useRef<HTMLElement>(null);
  const adRef = useRef<HTMLModElement>(null);
  const requestedRef = useRef(false);
  const scriptReadyRef = useRef(false);
  const cancelRequestRef = useRef<(() => void) | null>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [status, setStatus] = useState<"pending" | "filled" | "unfilled">("pending");

  const requestAd = useCallback(() => {
    if (!scriptReadyRef.current || requestedRef.current || cancelRequestRef.current) return;
    cancelRequestRef.current = onBrowserIdle(() => {
      cancelRequestRef.current = null;
      const ad = adRef.current;
      if (!ad || requestedRef.current || ad.getBoundingClientRect().width <= 0) return;
      requestedRef.current = true;
      try {
        window.adsbygoogle = window.adsbygoogle ?? [];
        window.adsbygoogle.push({});
      } catch {
        setStatus("unfilled");
      }
    });
  }, []);

  useEffect(() => {
    let cancelLoad: (() => void) | undefined;
    const load = () => { cancelLoad ??= onBrowserIdle(() => setNearViewport(true)); };
    const placement = placementRef.current;
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); load(); }
    }, { rootMargin: "200px 0px" });
    if (placement && observer) observer.observe(placement);
    else load();
    return () => { observer?.disconnect(); cancelLoad?.(); cancelRequestRef.current?.(); cancelRequestRef.current = null; };
  }, []);

  useEffect(() => {
    const ad = adRef.current;
    if (!ad) return;
    const updateStatus = () => {
      const value = ad.dataset.adStatus;
      if (value === "filled" || value === "unfilled") setStatus(value);
    };
    updateStatus();
    const observer = new MutationObserver(updateStatus);
    observer.observe(ad, { attributes: true, attributeFilter: ["data-ad-status"] });
    const resizeObserver = new ResizeObserver(requestAd);
    resizeObserver.observe(ad);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, [requestAd]);

  const handleScriptReady = useCallback(() => {
    scriptReadyRef.current = true;
    requestAd();
  }, [requestAd]);

  return (
    <aside
      ref={placementRef}
      aria-label="広告"
      className={`print:hidden mt-10 border-t border-border pt-6 ${status === "unfilled" ? "hidden" : ""}`}
    >
      {status === "filled" ? (
        <p className="mb-2 text-center text-[10px] tracking-wider text-muted-foreground">広告</p>
      ) : null}
      <ins
        ref={adRef}
        className="adsbygoogle block w-full"
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {nearViewport && <Script
        id="adsense-content-end"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onReady={handleScriptReady}
        onError={() => setStatus("unfilled")}
      />}
    </aside>
  );
}
