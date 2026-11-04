"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { onBrowserIdle } from "@/lib/performance/browser-idle";

const ADSENSE_CLIENT = "ca-pub-8751260838396451";
const CONTENT_END_SLOT = "3773902048";

declare global {
  interface Window {
    adsbygoogle?: Record<string, never>[];
  }
}

export function ContentEndAd() {
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
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={CONTENT_END_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      {nearViewport && <Script
        id="adsense-content-end"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
        onReady={handleScriptReady}
      />}
    </aside>
  );
}
