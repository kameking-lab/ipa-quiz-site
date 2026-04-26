"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  clearSession,
  readSession,
  summarizeSession,
  type SessionSummary,
} from "@/lib/motivation/session";
import { SessionSummaryDialog } from "./SessionSummaryDialog";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSummary(summarizeSession(meta));
    setOpen(true);
  }, [searchParams, router]);

  const handleClose = React.useCallback(() => {
    setOpen(false);
    clearSession();
    router.replace(window.location.pathname, { scroll: false });
  }, [router]);

  return <SessionSummaryDialog open={open} summary={summary} onClose={handleClose} />;
}
