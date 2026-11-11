"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { captureActivity, flushActivity } from "@/lib/analytics/activity-client";

export function ActivityTracker() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);
  useEffect(() => {
    // Query changes never create a page view or expose query values.
    if (previous.current !== pathname) {
      previous.current = pathname;
      captureActivity("page_view");
    }
    const hidden = () => { if (document.visibilityState === "hidden") flushActivity(); };
    window.addEventListener("pagehide", flushActivity);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      window.removeEventListener("pagehide", flushActivity);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [pathname]);
  return null;
}
