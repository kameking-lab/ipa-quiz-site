"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { POSTHOG_CONFIG, isPostHogConfigured, posthogCapture, setPostHogClient } from "@/lib/posthog";

/**
 * PostHog 初期化 + page_view 自動送信のクライアントプロバイダ。
 * NEXT_PUBLIC_POSTHOG_KEY 未設定時は完全 no-op。
 * UI は何も描画せず、副作用だけを担う初期化コンポーネント。
 */
export function PostHogProvider() {
  useEffect(() => {
    if (!isPostHogConfigured || typeof window === "undefined") return;
    let cancelled = false;
    void (async () => {
      try {
        const mod = await import("posthog-js");
        if (cancelled) return;
        const client = mod.default;
        client.init(POSTHOG_CONFIG.key as string, {
          api_host: POSTHOG_CONFIG.host,
          capture_pageview: false,
          capture_pageleave: true,
          autocapture: false,
          persistence: "localStorage",
        });
        setPostHogClient(client);
      } catch {
        // 失敗しても無視（アナリティクスは UI を壊さない）
      }
    })();
    return () => {
      cancelled = true;
      setPostHogClient(null);
    };
  }, []);

  return <PageViewTracker />;
}

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const utmFiredRef = useRef(false);

  useEffect(() => {
    if (!isPostHogConfigured || !pathname) return;
    const url = searchParams?.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    posthogCapture("page_view", { path: url });

    // UTM パラメータが存在する流入のみ一度だけ記録
    if (!utmFiredRef.current && searchParams) {
      const utmSource = searchParams.get("utm_source");
      const utmMedium = searchParams.get("utm_medium");
      const utmCampaign = searchParams.get("utm_campaign");
      if (utmSource || utmMedium || utmCampaign) {
        utmFiredRef.current = true;
        posthogCapture("referrer_with_utm", {
          utm_source: utmSource ?? null,
          utm_medium: utmMedium ?? null,
          utm_campaign: utmCampaign ?? null,
          landing_path: pathname,
        });
      }
    }
  }, [pathname, searchParams]);

  return null;
}
