"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useStudyRoomPresence } from "../useStudyRoomPresence";
export function StudyRoomLine() {
  const { snapshot, current } = useStudyRoomPresence();
  const count = current && snapshot ? snapshot.total : null;
  return <div data-study-presence-viewer>
    <Link href="/study-room" className="study-link gap-1">
      <span>{count === null ? "自習室をのぞく" : <>いま<strong>{count}</strong>人が自習室で勉強中</>}</span>
      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  </div>;
}
