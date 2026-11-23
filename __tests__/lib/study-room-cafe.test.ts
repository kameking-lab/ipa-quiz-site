import { readdirSync } from "node:fs";
import sharp from "sharp";
import { describe, expect, it } from "vitest";
import { jstDayNumber } from "@/lib/billing/reset-time";
import { cafeSeats, dailyCafeRoom } from "@/lib/home/study-room-cafe-layout";
import { CAFE_POSE_FILES, CAFE_POSE_PATH, cafeMascot, cafeOccupants, type CafeOccupant } from "@/lib/home/study-room-cafe-mascots";

const start = jstDayNumber(Date.parse("2026-11-21T00:00:00+09:00"));
const files = new Set(CAFE_POSE_FILES);
const learners = Array.from({ length: 12 }, (_, index) => ({
  exam: index < 10 ? "civil1" : "civil2", index, active: index < 2 || index === 10,
}));

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
    for (let day = start; day < start + 32; day++) {
      const seats = cafeSeats(day, count);
      expect(seats).toHaveLength(Math.min(count, 12));
      expect(new Set(seats.map(seat => seat.id)).size).toBe(seats.length);
      expect(seats).toEqual(cafeSeats(day, 12).slice(0, count));
    }
  });

  it("reproduces placements on the same day and changes the selected spots when a room returns", () => {
    for (let day = start; day < start + 4; day++) {
      expect(cafeOccupants(learners, day, files, true)).toEqual(cafeOccupants([...learners], day, files, true));
      expect(cafeSeats(day, 12)).not.toEqual(cafeSeats(day + 4, 12));
    }
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
        expect(cafeMascot(code, pose, files, "west")).toMatchObject({ src, pose, mirrored: true });
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

  it("uses each spot's poses, turns the play pair toward one another and preserves activity", () => {
    const occupants = cafeOccupants(learners, start, files, true);
    const bySpot = new Map(occupants.map(occupant => [occupant.seat.id, occupant]));
    expect(occupants.filter(occupant => occupant.active)).toHaveLength(3);
    expect(occupants.filter(occupant => occupant.seat.poses.includes("study")).map(occupant => occupant.mascot.pose).sort())
      .toEqual(["book", "study"]);
    expect(bySpot.get("cushion-edge")).toMatchObject({ active: false, mascot: { pose: "bow", mirrored: false } });
    expect(bySpot.get("rug-fringe")).toMatchObject({ active: false, mascot: { pose: "paw", mirrored: true } });
    expect(bySpot.get("bookshelf")).toMatchObject({ mascot: { pose: "stretch" } });
    expect(occupants.every(({ mascot, seat }) => seat.poses.includes(mascot.pose))).toBe(true);
    expect(cafeOccupants(learners, start, files, false).some(seat => seat.active)).toBe(false);
    expect(cafeOccupants(learners.map(learner => ({ ...learner, active: true })), start, files, true)
      .every(occupant => occupant.active)).toBe(true);
  });

  it("keeps the illustrated silhouettes inside the room and the upper half of each dog visible", async () => {
    for (let day = start; day < start + 16; day++) {
      const occupants = cafeOccupants(learners, day, files, true);
      const foreground = new Set<number>();
      for (const occupant of occupants.sort((a, b) => b.seat.floor - a.seat.floor)) {
        const { pixels, upper } = await silhouette(occupant);
        const hidden = upper.filter(pixel => foreground.has(pixel)).length;
        expect(hidden / upper.length, `${dailyCafeRoom(day).id}: ${occupant.seat.id}`).toBeLessThan(0.5);
        pixels.forEach(pixel => foreground.add(pixel));
      }
    }
  });
});

async function silhouette({ mascot, seat }: CafeOccupant) {
  let image = sharp(`public${mascot.src}`).resize(seat.size, seat.size, { fit: "inside" }).ensureAlpha();
  if (mascot.mirrored) image = image.flop();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const ink: { x: number; y: number }[] = [];
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 38) ink.push({ x, y });
    }
  }
  const bottom = ink.at(-1)!.y;
  const midpoint = (ink[0].y + bottom) / 2;
  const pixels: number[] = [];
  const upper: number[] = [];
  for (const point of ink) {
    const x = point.x + Math.round(seat.x - info.width / 2);
    const y = point.y + seat.floor - bottom;
    if (x < 0 || x >= 352 || y < 0 || y >= 195) throw new Error(`Clipped sprite at ${seat.id}`);
    pixels.push(y * 352 + x);
    if (point.y <= midpoint) upper.push(y * 352 + x);
  }
  return { pixels, upper };
}
