import type { StudyPresenceSnapshot } from "@/lib/study-presence";

/** Maximum illustrations, not a room capacity. */
export const STUDY_ROOM_VISIBLE_LIMIT = 12;
export function roomStage(count: number) {
  return count >= 49 ? 4 : count >= 25 ? 3 : count >= 13 ? 2 : count >= 6 ? 1 : 0;
}
export function measuredRoom(snapshot: StudyPresenceSnapshot) {
  const seats: { exam: string; index: number }[] = [];
  for (const row of snapshot.exams) {
    const remaining = Math.min(row.count, STUDY_ROOM_VISIBLE_LIMIT - seats.length);
    for (let i = 0; i < remaining; i++) seats.push({ exam: row.exam, index: seats.length });
    if (seats.length === STUDY_ROOM_VISIBLE_LIMIT) break;
  }
  return { seats, hidden: snapshot.count - seats.length, stage: roomStage(snapshot.count) };
}
