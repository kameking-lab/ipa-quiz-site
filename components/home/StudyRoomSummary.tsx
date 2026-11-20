"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { useStudyRoomPresence } from "./useStudyRoomPresence";

/** kp integration: a single line; no independent fetch, heartbeat, or learner registration. */
export function StudyRoomSummary() {
  const { snapshot, current } = useStudyRoomPresence();
  return <Link href="/study-room" data-study-presence-viewer className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-2 py-3 text-sm text-muted-foreground hover:text-foreground">
    <Users aria-hidden="true" className="size-4 shrink-0" />
    <span className="min-w-0">{snapshot && current ? `いま${snapshot.count.toLocaleString("ja-JP")}人が自習室で勉強中` : "自習室をのぞく"}</span>
    <ArrowRight aria-hidden="true" className="ml-auto size-4 shrink-0" />
  </Link>;
}
