"use client";
import { useEffect } from "react";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";

/** Counts a /billing visit by a person (the beacon endpoint drops crawlers). */
export function BillingPageBeacon() {
  useEffect(() => { sendFunnelEvent("billing_page_view"); }, []);
  return null;
}
