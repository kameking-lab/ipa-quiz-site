"use client";

import { useSyncExternalStore } from "react";
import { jstDayNumber, nextJstMidnight } from "@/lib/billing/reset-time";

const currentDay = () => jstDayNumber(Date.now());
// Static HTML reserves the frame. The browser selects today's artwork after hydration.
const serverDay = () => null;

function subscribe(onDayChange: () => void) {
  let timer: ReturnType<typeof setTimeout>;
  function refresh() {
    clearTimeout(timer);
    onDayChange();
    const now = Date.now();
    timer = setTimeout(refresh, nextJstMidnight(now).getTime() - now);
  }
  refresh();
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("pageshow", refresh);
  return () => {
    clearTimeout(timer);
    document.removeEventListener("visibilitychange", refresh);
    window.removeEventListener("pageshow", refresh);
  };
}

export function useStudyRoomDay() {
  return useSyncExternalStore<number | null>(subscribe, currentDay, serverDay);
}
