"use client";
import { useEffect } from "react";
import { sendFunnelEvent } from "@/lib/billing/funnel-client";

/** Counts the sign-in step of the purchase path (no UI). */
export function PurchaseSignInBeacon() {
  useEffect(() => { sendFunnelEvent("purchase_signin_view"); }, []);
  return null;
}
