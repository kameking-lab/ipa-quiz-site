"use client";

// Stripe Checkout から戻ってきた瞬間の CVR ファネル発火。
// マウント時に 1 回だけイベントを送る。

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics/events";

type Plan = "free" | "premium" | "team";

interface Props {
  outcome?: string;
  sessionId?: string;
  plan: Plan;
}

export function CheckoutLandingTracker({ outcome, sessionId, plan }: Props) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    if (outcome === "success") {
      const planForEvent: "premium" | "team" = plan === "team" ? "team" : "premium";
      trackEvent({
        name: "checkout_completed",
        plan: planForEvent,
        sessionId,
      });
      fired.current = true;
    } else if (outcome === "canceled") {
      trackEvent({ name: "checkout_canceled", source: "billing" });
      fired.current = true;
    }
  }, [outcome, sessionId, plan]);

  return null;
}
