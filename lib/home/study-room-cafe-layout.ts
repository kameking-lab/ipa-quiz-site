import { jstDayNumber } from "@/lib/billing/reset-time";

export const CAFE_ART_PATH = "/images/home/study-room-cafe";

const rooms = [
  { id: "p1", name: "ラグのリビング" },
  { id: "p2", name: "本棚のブックカフェ" },
  { id: "p3", name: "窓辺と段差の部屋" },
  { id: "p4", name: "芝生のテラス" },
] as const;

const rotationStart = jstDayNumber(Date.parse("2026-11-21T00:00:00+09:00"));
export function dailyCafeRoom(day: number) {
  const index = (day - rotationStart) % rooms.length;
  return rooms[(index + rooms.length) % rooms.length];
}

// The scene CSS anchors these seats to the floor, with the middle seat
// closest to the center for a lone learner. Two front seats form the play pair.
const seats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
const crowdedSeats = [4, 5, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12] as const;
export type CafeSeat = typeof seats[number];
export const CAFE_SEAT_LIMIT = seats.length;
export const MIN_PLAY_GROUP = 5;

export function cafeSeats(count: number): readonly CafeSeat[] {
  return (count >= MIN_PLAY_GROUP ? crowdedSeats : seats).slice(0, Math.max(0, count));
}
