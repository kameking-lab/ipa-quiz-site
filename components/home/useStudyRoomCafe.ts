"use client";

import { useMemo } from "react";
import type { StudyPresenceSnapshot, StudyPresenceToday } from "@/lib/study-presence";
import { measuredRoom, STUDY_ROOM_VISIBLE_LIMIT } from "@/lib/home/study-room";
import { cafePoints, dailyCafeRoom } from "@/lib/home/study-room-cafe-layout";
import { cafeOccupants } from "@/lib/home/study-room-cafe-mascots";
import { useStudyRoomDay } from "./useStudyRoomDay";

export function useStudyRoomCafe(attendance: StudyPresenceSnapshot | StudyPresenceToday | null, current: boolean,
  poseFiles: readonly string[], limit = STUDY_ROOM_VISIBLE_LIMIT) {
  const day = useStudyRoomDay();
  const room = day === null ? null : dailyCafeRoom(day);
  const measured = useMemo(() => attendance && measuredRoom(attendance, limit), [attendance, limit]);
  const count = measured?.seats.length ?? 0;
  const points = useMemo(() => day === null || !room ? [] : cafePoints(room, day, count), [day, room, count]);
  const files = useMemo(() => new Set(poseFiles), [poseFiles]);
  const occupants = useMemo(() => day === null || !measured ? [] : cafeOccupants(
    measured.seats, points, day, files, current,
  ), [day, measured, current, points, files]);
  return { day, room, count, occupants, hidden: measured?.hidden ?? 0 };
}
