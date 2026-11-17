"use client";

import { StudyRoom } from "@/components/home/StudyRoom";
import { useStudyRoomPresence } from "./useStudyRoomPresence";

export interface StudySuggestion { name: string; href: string; exam?: string }

export function TotalAnswerCounter({ suggestions = [] }: { suggestions?: readonly StudySuggestion[] }) {
  const { snapshot, current } = useStudyRoomPresence();
  return <section id="study-room" data-study-presence-viewer aria-label={snapshot === null ? "学習のご案内" : "前回取得時点の学習状況"} aria-live="off" className="study-room scroll-mt-24">
    <StudyRoom snapshot={snapshot} suggestions={suggestions} current={current} />
  </section>;
}
