"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { LS_KEYS } from "@/lib/storage/keys";
/** Retry handover after an anonymous contributor signs in, even outside /quiz. */
export function FeedbackAccountClaim() {
  const pathname = usePathname();
  useEffect(() => {
    let active = true, busy = false, attempts = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const claim = async () => {
      if (!active || busy) return;
      try { if (!localStorage.getItem(LS_KEYS.feedbackUnlockPendingClaim)) return; } catch { return; }
      busy = true;
      try {
        const res = await fetch("/api/feedback-unlock/claim", { method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000) });
        if (!active) return;
        if (res.ok) {
          const state = await res.json();
          if (state.submitted) localStorage.removeItem(LS_KEYS.feedbackUnlockPendingClaim);
        } else if (res.status !== 401 && attempts++ < 2) timer = setTimeout(() => void claim(), 5000);
      } catch { if (active && attempts++ < 2) timer = setTimeout(() => void claim(), 5000); }
      finally { busy = false; }
    };
    void claim();
    const onFocus = () => { attempts = 0; void claim(); };
    window.addEventListener("focus", onFocus);
    return () => { active = false; clearTimeout(timer); window.removeEventListener("focus", onFocus); };
  }, [pathname]);
  return null;
}
