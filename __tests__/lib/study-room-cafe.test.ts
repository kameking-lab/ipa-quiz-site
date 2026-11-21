import { describe, expect, it } from "vitest";
import { jstDayNumber } from "@/lib/billing/reset-time";
import { CAFE_HEIGHT, CAFE_WIDTH, cafePoints, dailyCafeRoom } from "@/lib/home/study-room-cafe-layout";
import { cafeMascot, cafeOccupants } from "@/lib/home/study-room-cafe-mascots";
import { readCafePoseFiles } from "@/lib/home/study-room-cafe-pose-files";

const start = jstDayNumber(Date.parse("2026-11-21T00:00:00+09:00"));

describe("daily study-room café", () => {
  it("changes at JST midnight and repeats in the same order across month and year boundaries", () => {
    expect(jstDayNumber(Date.parse("2026-11-20T14:59:59.999Z"))).toBe(start - 1);
    expect(jstDayNumber(Date.parse("2026-11-20T15:00:00.000Z"))).toBe(start);
    expect(jstDayNumber(Date.parse("2026-11-20T10:00:00-05:00"))).toBe(start);
    expect(Array.from({ length: 9 }, (_, i) => dailyCafeRoom(start + i - 1).id))
      .toEqual(["p4", "p1", "p2", "p3", "p4", "p1", "p2", "p3", "p4"]);
    const newYear = jstDayNumber(Date.parse("2027-01-01T00:00:00+09:00"));
    expect(dailyCafeRoom(newYear)).toBe(dailyCafeRoom(newYear - 4));
  });

  it.each([0, 1, 5, 12, 13, 29, 30, 45, 60, 61, 90, 120, 130])("lays out %i learners without clipping or overlap in all four rooms", count => {
    for (let offset = 0; offset < 16; offset++) {
      const day = start + offset;
      const room = dailyCafeRoom(day);
      const points = cafePoints(room, day, count);
      expect(points).toHaveLength(Math.min(count, 120));
      expect(points).toEqual(cafePoints(room, day, count));
      const overlaps = points.some(({ x, floorY, width }, i) => points.slice(0, i).some(other =>
        Math.abs(x - other.x) < (width + other.width) / 2 &&
        other.floorY - other.width < floorY && floorY - width < other.floorY));
      expect(overlaps).toBe(false);
      expect(points.every(({ x, floorY, width }) => x - width / 2 > 0 && x + width / 2 < CAFE_WIDTH &&
        floorY - width > 0 && floorY < CAFE_HEIGHT)).toBe(true);
    }
  });

  it("scales with depth and crowding", () => {
    const room = dailyCafeRoom(start);
    const quiet = cafePoints(room, start, 12);
    const crowded = cafePoints(room, start, 120);
    const average = (points: typeof quiet) => points.reduce((sum, { width }) => sum + width, 0) / points.length;
    expect(average(crowded)).toBeLessThan(average(quiet));
    expect(average(quiet.filter(point => point.floorY < 110))).toBeLessThan(average(quiet.filter(point => point.floorY > 160)));
  });

  it("uses file names from the pose directory and falls back to an uncostumed dog", () => {
    const civil = new Set(readCafePoseFiles());
    expect([...civil].filter(file => /^civil[12]-/.test(file)).length).toBeGreaterThanOrEqual(16);
    expect(cafeMascot("civil1", "paw", civil, "west")).toMatchObject({ src: expect.stringContaining("/pose/civil1-paw-west.webp"), mirrored: false });
    expect(cafeMascot("civil2", "sleep", civil)).toMatchObject({ src: expect.stringContaining("/pose/civil2-sleep-side.webp") });
    expect(cafeMascot("fe", "rear", new Set())).toMatchObject({ src: expect.stringContaining("/generic-rear.webp") });
    expect(cafeMascot("fe", "bow", new Set(["fe-bow.webp"]), "west")).toMatchObject({ src: expect.stringContaining("/pose/fe-bow.webp"), mirrored: true });
    expect(cafeMascot("fe", "paw", new Set(), "west")).toMatchObject({ src: expect.stringContaining("/generic-paw.webp"), mirrored: false });
  });

  it("assigns the reserved pair only to resting learners and uses study poses for active learners", () => {
    const seats = Array.from({ length: 12 }, (_, index) => ({ exam: "civil1", index, active: index < 3 }));
    const points = cafePoints(dailyCafeRoom(start), start, seats.length);
    const files = new Set(readCafePoseFiles());
    const occupants = cafeOccupants(seats, points, start, files, true);
    expect(occupants.filter(seat => seat.active).map(seat => seat.mascot.pose)).toEqual(["study", "book", "study"]);
    const pair = occupants.filter(seat => seat.mascot.pose === "bow" || seat.mascot.pose === "paw");
    expect(pair.map(seat => seat.mascot.src.split("/").at(-1))).toEqual(["civil1-bow-east.webp", "civil1-paw-west.webp"]);
    expect(pair[0].point.floorY).toBe(pair[1].point.floorY);
    expect(pair[0].point.x).toBeLessThan(pair[1].point.x);
    expect(new Set(occupants.map(seat => seat.point)).size).toBe(seats.length);
    expect(cafeOccupants(seats, points, start, files, false).some(seat => seat.active)).toBe(false);
  });
});
