"use client";
import { useEffect, useRef } from "react";
import { sendConversion } from "@/lib/billing/conversion-client";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";

/** Counts the sign-in step of the purchase path (no UI). */
export function PurchaseSignInBeacon() {
  const measured = useRef(false);
  useEffect(() => { if (!measured.current) { measured.current = true; sendConversion("signin_viewed"); } }, []);
  useEffect(() => { sendFunnelEvent("purchase_signin_view"); }, []);
  return null;
}
