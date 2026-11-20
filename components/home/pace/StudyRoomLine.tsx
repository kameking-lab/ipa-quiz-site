"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useStudyRoomPresence } from "../useStudyRoomPresence";
export function StudyRoomLine() {
  const { snapshot, current } = useStudyRoomPresence();
  const count = current && snapshot ? snapshot.total : null;
  return <div data-study-presence-viewer>
    <Link href="/study-room" className="flex min-h-14 items-center gap-2.5 rounded-xl border border-border bg-card px-3 text-sm hover:bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/mascot/chihuahua-guide.webp" alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
      <span className="flex-1">{count === null ? "自習室をのぞく" : <>いま<strong>{count}</strong>人が自習室で勉強中</>}</span>
      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  </div>;
}
