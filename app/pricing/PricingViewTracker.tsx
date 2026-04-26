"use client";

// 料金ページの pricing_view を 1 度だけ発火する。
// `?source=upsell|home` で流入経路を、
// `?checkout=canceled` で Stripe Checkout からの離脱を別イベントとして拾う。

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";

export function PricingViewTracker() {
  const params = useSearchParams();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    const raw = params.get("source");
    const source: "home" | "upsell" | "direct" =
      raw === "home" || raw === "upsell" ? raw : "direct";
    trackEvent({ name: "pricing_view", source });

    if (params.get("checkout") === "canceled") {
      trackEvent({ name: "checkout_canceled", source: "pricing" });
    }
    fired.current = true;
  }, [params]);

  return null;
}
