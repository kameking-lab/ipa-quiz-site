"use client";
import Link from "next/link";
import { UsersRound } from "lucide-react";
import { useStudyRoomPresence } from "../useStudyRoomPresence";
export function StudyRoomLine() {
  const { snapshot, current } = useStudyRoomPresence();
  const count = current && snapshot ? snapshot.total : null;
  return <div data-study-presence-viewer className="py-3 text-center"><Link href="/study-room" className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><UsersRound aria-hidden="true" className="h-4 w-4 shrink-0" />{count === null ? "自習室をのぞく" : `いま${count}人が自習室で勉強中`}<span aria-hidden="true">›</span></Link></div>;
}
