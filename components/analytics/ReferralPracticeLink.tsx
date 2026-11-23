"use client";

import { useEffect, useState, type ComponentProps } from "react";
import Link from "next/link";
import { currentReferral, isTsuginoReferral } from "@/lib/analytics/referral";
import { LS_KEYS } from "@/lib/storage/keys";
import { posthogCapture } from "@/lib/posthog";

export function ReferralPracticeLink({
  href, referralHref, qualification, ...props
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  referralHref: string | null;
  qualification: string;
}) {
  const [landing, setLanding] = useState<string>();
  useEffect(() => {
    const referral = currentReferral();
    setLanding(isTsuginoReferral(referral) && referral?.first_visit ? referral.landing_path : undefined);
  }, []);
  const referred = Boolean(referralHref && landing && typeof window !== "undefined" && window.location.pathname === landing);
  return (
    <Link {...props} href={referred ? referralHref! : href} onClick={(event) => {
      props.onClick?.(event);
      if (!referred || event.defaultPrevented) return;
      posthogCapture("referral_practice_clicked", { qualification });
      try { localStorage.setItem(LS_KEYS.referralWelcomeDismissed, "1"); } catch { /* optional */ }
    }} />
  );
}
