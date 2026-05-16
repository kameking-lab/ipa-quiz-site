"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import {
  clearSession,
  readSession,
  summarizeSession,
  type SessionSummary,
} from "@/lib/motivation/session";

// SessionSummaryDialog drags in radix Dialog + SocialShare + share util.
// Only mount it once a session has actually been completed (?done=1) — the
// other 99% of homepage visits avoid this chunk entirely.
const SessionSummaryDialog = dynamic(
  () => import("./SessionSummaryDialog").then((m) => m.SessionSummaryDialog),
  { ssr: false },
);

export function SessionSummaryGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = React.useState<SessionSummary | null>(null);

  React.useEffect(() => {
    const done = searchParams.get("done") === "1";
    if (!done) return;
    const meta = readSession();
    if (!meta || meta.answers.length === 0) {
      // remove ?done=1 from URL even if no session
      router.replace(window.location.pathname, { scroll: false });
      return;
    }

    setSummary(summarizeSession(meta));
    setOpen(true);
  }, [searchParams, router]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    clearSession();
    router.replace(window.location.pathname, { scroll: false });
  }, [router]);

  if (!open && !summary) return null;
  return <SessionSummaryDialog open={open} summary={summary} onClose={handleClose} />;
}
