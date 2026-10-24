import type { StudyPresenceSnapshot } from "@/lib/study-presence";

export const STUDY_ROOM_CAPACITY = 12;

/** Only the visible room is materialized, even for a large measured aggregate. */
export function measuredRoom(snapshot: StudyPresenceSnapshot, requestedRoom: number) {
  const roomCount = Math.max(1, Math.ceil(snapshot.count / STUDY_ROOM_CAPACITY));
  const room = Math.max(0, Math.min(roomCount - 1, Math.floor(requestedRoom) || 0));
  const start = room * STUDY_ROOM_CAPACITY;
  const occupancy = Math.min(STUDY_ROOM_CAPACITY, snapshot.count - start);
  const seats: { exam: string; index: number }[] = [];
  for (let index = 0; index < occupancy; index++) {
    let offset = start + index;
    for (const row of snapshot.exams) {
      if (offset < row.count) { seats.push({ exam: row.exam, index }); break; }
      offset -= row.count;
    }
  }
  return { room, roomCount, occupancy, seats };
}
