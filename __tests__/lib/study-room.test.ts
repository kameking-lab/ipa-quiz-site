import { describe, expect, it } from "vitest";
import { measuredRoom, roomStage } from "@/lib/home/study-room";

describe("measured study room", () => {
  it("keeps zero and accurately reports illustrations omitted from large aggregates", () => {
    expect(measuredRoom({ count: 0, exams: [] })).toMatchObject({ seats: [], hidden: 0 });
    const room = measuredRoom({ count: 1_000_000, exams: [{ exam: "ip", count: 1_000_000 }] });
    expect(room.seats).toHaveLength(12);
    expect(room.hidden).toBe(999_988);
  });
  it("changes stages at the specified boundaries", () => {
    expect([0, 5, 6, 12, 13, 24, 25, 48, 49].map(roomStage)).toEqual([0, 0, 1, 1, 2, 2, 3, 3, 4]);
  });
});
