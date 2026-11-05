"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { BeforeSendEvent } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { nativeClient } from "@/mobile/shared/contracts";

// Strip known PII-like query params before sending page view events to Vercel Analytics.
// Vercel Analytics is cookie-free and collects only aggregate traffic data.
const PII_PARAMS = ["email", "phone", "token", "key", "password", "name", "user", "uid"];

function beforeSend(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url, "https://placeholder.invalid");
    let stripped = false;
    for (const p of PII_PARAMS) {
      if (url.searchParams.has(p)) {
        url.searchParams.delete(p);
        stripped = true;
      }
    }
    if (!stripped) return event;
    return { ...event, url: url.pathname + (url.search || "") };
  } catch {
    return event;
  }
}

export function VercelAnalyticsWithPrivacy() {
  const [browser, setBrowser] = useState(false);
  useEffect(() => { setBrowser(!nativeClient() && !location.pathname.startsWith("/auth/")); }, []);
  if (!browser) return null;
  return (
    <>
      <Analytics beforeSend={beforeSend} />
      <SpeedInsights />
    </>
  );
}
