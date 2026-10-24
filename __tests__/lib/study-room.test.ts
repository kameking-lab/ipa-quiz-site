import { describe, expect, it } from "vitest";
import { measuredRoom } from "@/lib/home/study-room";

describe("measured study rooms", () => {
  it("preserves measured zero and caps each room at twelve seats", () => {
    expect(measuredRoom({ count: 0, exams: [] }, 0)).toMatchObject({ roomCount: 1, occupancy: 0, seats: [] });
    const snapshot = { count: 25, exams: [{ exam: "fe", count: 14 }, { exam: "ip", count: 11 }] };
    const rooms = [0, 1, 2].map(index => measuredRoom(snapshot, index));
    expect(rooms.map(room => room.occupancy)).toEqual([12, 12, 1]);
    const seats = rooms.flatMap(room => room.seats);
    expect(seats.filter(seat => seat.exam === "fe")).toHaveLength(14);
    expect(seats.filter(seat => seat.exam === "ip")).toHaveLength(11);
    expect(measuredRoom(snapshot, 100).room).toBe(2);
  });
  it("materializes only the selected twelve seats for a large aggregate", () => {
    const room = measuredRoom({ count: 1_000_000, exams: [{ exam: "ip", count: 1_000_000 }] }, 50_000);
    expect(room.roomCount).toBe(83_334);
    expect(room.seats).toHaveLength(12);
    expect(room.seats.every(seat => seat.exam === "ip")).toBe(true);
  });
});
