"use client";

import { Users } from "lucide-react";
import { useStudyRoomPresence } from "./useStudyRoomPresence";

/** kp integration: a single line; no independent fetch, heartbeat, or learner registration. */
export function StudyRoomSummary() {
  const { snapshot, current } = useStudyRoomPresence();
  return <div data-study-presence-viewer>
    {snapshot && current && <p className="flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-2 py-3 text-sm text-muted-foreground">
      <Users aria-hidden="true" className="size-4 shrink-0" />
      <span className="min-w-0">いま{snapshot.count.toLocaleString("ja-JP")}人が勉強中</span>
    </p>}
  </div>;
}
