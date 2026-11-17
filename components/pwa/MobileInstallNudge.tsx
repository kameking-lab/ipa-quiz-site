"use client";

import { useContext, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileInstallContext } from "./MobileInstallProvider";

/** Optional, in-flow invitation. Never renders a guide, sheet or application dialog. */
export function MobileInstallNudge({ placement, answered = 0 }: {
  placement: "answer" | "daily-limit";
  answered?: number;
}) {
  const context = useContext(MobileInstallContext);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef(false);
  const [finished, setFinished] = useState(false);
  const eligible = !!context?.ready && context.os === "android" && !context.native
    && !context.standalone && context.available && context.phase !== "installed"
    && context.phase !== "accepted" && !finished
    && (placement === "daily-limit" || answered >= 3);
  const claim = context?.claimNudge;
  const release = context?.releaseNudge;
  const markShown = context?.markNudgeShown;
  const owns = context?.nudgeOwner === id;

  useEffect(() => {
    if (!eligible || !claim || !release) return;
    claim(id);
    return () => release(id);
  }, [eligible, claim, release, id]);

  useEffect(() => {
    if (!owns || !eligible || !root.current || !markShown) return;
    const node = root.current;
    const observer = new IntersectionObserver((entries) => {
      if (shown.current || document.visibilityState !== "visible"
        || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) return;
      shown.current = markShown(id);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(node);
    const refresh = () => { if (document.visibilityState === "visible") { observer.unobserve(node); observer.observe(node); } };
    document.addEventListener("visibilitychange", refresh);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", refresh); };
  }, [owns, eligible, markShown, id]);

  if (!eligible || !owns || !context) return null;
  return <div ref={root} data-install-nudge={placement} className="flex min-h-11 items-center justify-center gap-1 text-sm text-muted-foreground">
    <Button type="button" variant="link" className="min-h-11 px-2 font-normal text-muted-foreground underline hover:text-foreground"
      onClick={async () => {
        // A click is also proof of visibility if it precedes the observer callback.
        if (!shown.current) shown.current = context.markNudgeShown(id);
        if (!shown.current) return;
        await context.install();
        setFinished(true);
      }}>ホーム画面に追加</Button>
    <Button type="button" variant="ghost" size="icon" aria-label="ホーム画面への追加案内を30日間閉じる"
      className="min-h-11 min-w-11"
      onClick={() => { context.dismissNudge(); setFinished(true); }}><X className="h-4 w-4" aria-hidden="true" /></Button>
  </div>;
}
