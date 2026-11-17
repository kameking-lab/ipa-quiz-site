"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PRESENCE_STATE_EVENT, parseMeasuredPresence } from "@/lib/study-presence-contract";
export function StudyRoomLine() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    let expires = 0;
    const update = (event: Event) => {
      const detail = (event as CustomEvent<{ mode?: string; snapshot?: unknown }>).detail;
      const snapshot = detail?.mode === "measured" ? parseMeasuredPresence(detail.snapshot) : null;
      expires = snapshot ? Date.parse(snapshot.validUntil) : 0;
      setCount(snapshot && expires > Date.now() ? snapshot.total : null);
    };
    const timer = window.setInterval(() => { if (Date.now() >= expires) setCount(null); }, 5000);
    window.addEventListener(PRESENCE_STATE_EVENT, update);
    return () => { window.removeEventListener(PRESENCE_STATE_EVENT, update); window.clearInterval(timer); };
  }, []);
  return <div data-study-presence-viewer className="py-3 text-center"><Link href="/study-room" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />{count === null ? "自習室をのぞく" : `いま${count}人が自習室で勉強中`}<span aria-hidden="true">›</span></Link></div>;
}
