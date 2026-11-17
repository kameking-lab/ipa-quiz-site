"use client";
import { useEffect, useRef } from "react";
import { sendConversion } from "@/lib/billing/conversion-client";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";

/** Counts a /billing visit by a person (the beacon endpoint drops crawlers). */
export function BillingPageBeacon() {
  const measured = useRef(false);
  useEffect(() => {
    if (!measured.current) { measured.current = true; sendConversion("offer_viewed"); }
    const click = (event: MouseEvent) => { if (event.target instanceof Element && event.target.closest("[data-monthly-plan]")) sendConversion("plan_clicked"); };
    document.addEventListener("click", click);
    return () => document.removeEventListener("click", click);
  }, []);
  useEffect(() => { sendFunnelEvent("billing_page_view"); }, []);
  return null;
}
