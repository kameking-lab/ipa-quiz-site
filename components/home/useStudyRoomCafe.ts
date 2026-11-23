"use client";

import { useMemo } from "react";
import type { StudyPresenceSnapshot, StudyPresenceToday } from "@/lib/study-presence";
import { measuredRoom } from "@/lib/home/study-room";
import { cafeSeats, CAFE_SEAT_LIMIT, dailyCafeRoom } from "@/lib/home/study-room-cafe-layout";
import { cafeOccupants } from "@/lib/home/study-room-cafe-mascots";
import { useStudyRoomDay } from "./useStudyRoomDay";

export function useStudyRoomCafe(attendance: StudyPresenceSnapshot | StudyPresenceToday | null, current: boolean,
  poseFiles: readonly string[]) {
  const day = useStudyRoomDay();
  const room = day === null ? null : dailyCafeRoom(day);
  const measured = useMemo(() => attendance && measuredRoom(attendance, CAFE_SEAT_LIMIT), [attendance]);
  const count = measured?.seats.length ?? 0;
  const files = useMemo(() => new Set(poseFiles), [poseFiles]);
  const occupants = useMemo(() => day === null || !measured ? [] : cafeOccupants(
    measured.seats, cafeSeats(count), day, files, current,
  ), [day, measured, current, count, files]);
  return { day, room, count, occupants, hidden: measured?.hidden ?? 0 };
}
