"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { nativeClient } from "@/mobile/shared/contracts";
import { onBrowserIdle } from "@/lib/performance/browser-idle";
import { SYNC_SESSION_CHANGED } from "@/lib/sync/session-observation";
import {
  discardWebAds, hasFreeWebAccess, isWebAdPath, mayHaveWebAds, WEB_ADS_ERROR_PAGE_ID,
  WEB_ADS_MEMBERSHIP_CHANNEL, WEB_ADS_RELOADING, WEB_ADS_SCRIPT_FAILED, WEB_ADS_SCRIPT_ID, WEB_ADS_SCRIPT_URL,
} from "@/lib/ads/web-ads";

function afterHomeEventArt(load: () => void): () => void {
  const slot = document.querySelector(".p3-event-art-slot");
  const paintedArt = "[data-home-event-ready]";
  if (!slot || !document.documentElement.dataset.homeEventLayout) {
    return onBrowserIdle(load);
  }

  // The seasonal hero image is requested after window.load and revealed
  // after decode. Give that first paint priority over an ad request.
  let cancelIdle: (() => void) | undefined;
  let fadeTimer: number | undefined;
  function stopWaiting() {
    window.clearTimeout(deadline);
    observer.disconnect();
    slot?.removeEventListener("error", ready, true);
  }
  function ready() {
    stopWaiting();
    // The ready flag starts the hero's 160 ms opacity transition.
    fadeTimer = window.setTimeout(() => { cancelIdle = onBrowserIdle(load); }, 250);
  }

  const observer = new MutationObserver(() => {
    if (slot.querySelector(paintedArt)) ready();
  });
  observer.observe(slot, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-home-event-ready"] });
  const deadline = window.setTimeout(ready, 4000);
  slot.addEventListener("error", ready, true);
  if (slot.querySelector(paintedArt)) ready();
  return () => { stopWaiting(); window.clearTimeout(fadeTimer); cancelIdle?.(); };
}

export function WebAutoAds() {
  const pathname = usePathname();
  const excluded = !pathname || !isWebAdPath(pathname);

  useEffect(() => {
    const root = document.documentElement;
    if (nativeClient() || root.classList.contains("native-app")) return;
    if (excluded) {
      discardWebAds();
      return;
    }

    const hasErrorPage = () => !!document.getElementById(WEB_ADS_ERROR_PAGE_ID);
    const eligible = () => !root.hasAttribute(WEB_ADS_RELOADING) && isWebAdPath(window.location.pathname) && !hasErrorPage();
    let request: AbortController | undefined;
    let cancelLoad: (() => void) | undefined;

    function checkMembership() {
      if (!eligible() || document.readyState !== "complete") return;
      cancelLoad?.();
      request?.abort();
      const controller = new AbortController();
      request = controller;
      if (mayHaveWebAds()) root.setAttribute("data-web-ads-paused", "");

      void hasFreeWebAccess(controller.signal).catch(() => false).then(free => {
        if (controller.signal.aborted) return;
        request = undefined;
        if (!free || !eligible()) {
          discardWebAds();
          return;
        }
        root.removeAttribute("data-web-ads-paused");
        if (document.getElementById(WEB_ADS_SCRIPT_ID)) return;
        cancelLoad = afterHomeEventArt(() => {
          if (!eligible() || document.getElementById(WEB_ADS_SCRIPT_ID)) return;
          const script = document.createElement("script");
          script.id = WEB_ADS_SCRIPT_ID;
          script.src = WEB_ADS_SCRIPT_URL;
          script.async = true;
          script.crossOrigin = "anonymous";
          script.setAttribute("fetchpriority", "low");
          script.addEventListener("error", () => script.setAttribute(WEB_ADS_SCRIPT_FAILED, ""), { once: true });
          document.head.appendChild(script);
        });
      });
    }

    const recheck = () => { if (!request) checkMembership(); };
    const visible = () => { if (!document.hidden) recheck(); };
    const restored = (event: PageTransitionEvent) => { if (event.persisted) checkMembership(); };
    const events = ["load", "focus", "online"];
    for (const event of events) window.addEventListener(event, recheck);
    window.addEventListener("pageshow", restored);
    window.addEventListener(SYNC_SESSION_CHANGED, checkMembership);
    document.addEventListener("visibilitychange", visible);

    const channel = typeof BroadcastChannel === "undefined" ? null : new BroadcastChannel(WEB_ADS_MEMBERSHIP_CHANNEL);
    channel?.addEventListener("message", event => {
      if (event.data === "paid") checkMembership();
    });

    // A streamed notFound() or a React error can replace the page without
    // changing its pathname. Observe the content boundary for that transition.
    let errorPage = hasErrorPage();
    const observer = new MutationObserver(() => {
      const nextErrorPage = hasErrorPage();
      if (nextErrorPage === errorPage) return;
      errorPage = nextErrorPage;
      if (errorPage) {
        cancelLoad?.();
        request?.abort();
        request = undefined;
        discardWebAds();
      } else {
        recheck();
      }
    });
    const content = document.getElementById("main-content");
    if (content) observer.observe(content, { childList: true, subtree: true });
    if (errorPage) discardWebAds();
    else recheck();

    return () => {
      request?.abort();
      cancelLoad?.();
      observer.disconnect();
      channel?.close();
      for (const event of events) window.removeEventListener(event, recheck);
      window.removeEventListener("pageshow", restored);
      window.removeEventListener(SYNC_SESSION_CHANGED, checkMembership);
      document.removeEventListener("visibilitychange", visible);
    };
  }, [excluded]);

  return null;
}
