"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { flushJourney, observeJourney } from "@/lib/billing/journey-client";

export function PurchaseJourney() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/")) return;
    observeJourney();
    const hidden = () => { if (document.visibilityState === "hidden") flushJourney(); };
    window.addEventListener("pagehide", flushJourneyOnHide);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      window.removeEventListener("pagehide", flushJourneyOnHide);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [pathname]);
  return null;
}
function flushJourneyOnHide() { flushJourney(); }
