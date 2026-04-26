"use client";

import * as React from "react";
import { ensureCouponForStreak } from "@/lib/motivation/coupon";
import { readStreak } from "@/lib/streak/storage";

export function CouponTracker() {
  React.useEffect(() => {
    const tick = () => {
      const s = readStreak();
      ensureCouponForStreak(s.currentStreak, s.longestStreak);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    const onFocus = () => tick();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  return null;
}
