import { readdirSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { jstDayNumber } from "@/lib/billing/reset-time";
import { cafeSeats, dailyCafeRoom } from "@/lib/home/study-room-cafe-layout";
import { CAFE_POSE_FILES, CAFE_POSE_PATH, cafeMascot, cafeOccupants } from "@/lib/home/study-room-cafe-mascots";

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

  it.each([0, 1, 3, 6, 12, 130])("assigns distinct seats to %i learners within the cap", count => {
    const seats = cafeSeats(count);
    expect(seats).toHaveLength(Math.min(count, 12));
    expect(new Set(seats).size).toBe(seats.length);
  });

  it("registers all four poses per outfit and selects the corresponding image in either direction", () => {
    const files = new Set(CAFE_POSE_FILES);
    const poses = ["rear", "bow", "paw", "sleep"] as const;
    const codes = new Set([...files].filter(file => file.endsWith("-rear.webp")).map(file => file.slice(0, -"-rear.webp".length)));
    expect(codes.size).toBe(48);
    expect([...files].sort()).toEqual(readdirSync(`public${CAFE_POSE_PATH}`).filter(file => file.endsWith(".webp")).sort());
    for (const code of codes) {
      for (const pose of poses) {
        const src = `${CAFE_POSE_PATH}/${code}-${pose}.webp`;
        expect(cafeMascot(code, pose, files, "east")).toMatchObject({ src, pose, mirrored: false });
        expect(cafeMascot(code, pose, files, "west")).toMatchObject({ src, pose, mirrored: pose === "bow" || pose === "paw" });
      }
    }
  });

  it("preserves the distinct civil poses and uses an uncostumed dog when no outfit is available", () => {
    const files = new Set(CAFE_POSE_FILES);
    expect(cafeMascot("civil1", "rear-angle", files)).toMatchObject({ src: expect.stringContaining("/pose/civil1-rear-angle.webp") });
    expect(cafeMascot("civil2", "sleep-belly", files)).toMatchObject({ src: expect.stringContaining("/pose/civil2-sleep-belly.webp") });
    expect(cafeMascot("fe", "sleep-belly", files)).toMatchObject({ src: expect.stringContaining("/pose/fe-sleep.webp"), pose: "sleep" });
    expect(cafeMascot("kisho", "rear", files)).toMatchObject({ src: expect.stringContaining("/pose/field-nature-rear.webp") });
    expect(cafeMascot("fe", "rear", new Set())).toMatchObject({ src: expect.stringContaining("/generic-rear.webp") });
    expect(cafeMascot("fe", "paw", new Set(), "west")).toMatchObject({ src: expect.stringContaining("/generic-paw.webp"), mirrored: false });
  });

  it("assigns the reserved pair only to resting learners and uses study poses for active learners", () => {
    const seats = Array.from({ length: 12 }, (_, index) => ({ exam: "civil1", index, active: index < 3 }));
    const positions = cafeSeats(seats.length);
    const files = new Set(CAFE_POSE_FILES);
    const occupants = cafeOccupants(seats, positions, start, files, true);
    expect(occupants.filter(seat => seat.active).map(seat => seat.mascot.pose)).toEqual(["study", "book", "study"]);
    const pair = occupants.filter(seat => seat.mascot.pose === "bow" || seat.mascot.pose === "paw");
    expect(pair.map(seat => seat.mascot.src.split("/").at(-1))).toEqual(["civil1-bow.webp", "civil1-paw.webp"]);
    expect(pair.map(seat => seat.seat)).toEqual([4, 5]);
    expect(new Set(occupants.map(seat => seat.seat)).size).toBe(seats.length);
    expect(cafeOccupants(seats, positions, start, files, false).some(seat => seat.active)).toBe(false);
  });
});
