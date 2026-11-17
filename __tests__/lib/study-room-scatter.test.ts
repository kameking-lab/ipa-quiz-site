import { expect, it } from "vitest";
import { assignRoomPoints } from "@/lib/home/study-room-scatter";
import { STUDY_ROOM_SCENES } from "@/lib/home/study-room-scenes";
import { relaxedChihuahuaArt } from "@/lib/home/room-chihuahua-art";

it("keeps every room's dogs apart, including their square tap areas", () => {
  for (const scene of STUDY_ROOM_SCENES) for (const [i, point] of scene.seats.entries()) {
    expect(point.x - point.width / 2).toBeGreaterThanOrEqual(0);
    expect(point.y + point.width / 2).toBeLessThanOrEqual(scene.height);
    for (const other of scene.seats.slice(i + 1)) {
      expect(Math.max(Math.abs(point.x - other.x), Math.abs(point.y - other.y))).toBeGreaterThan((point.width + other.width) / 2);
    }
  }
});

it("keeps survivors fixed when arrivals collide, departures happen, or input order changes", () => {
  const keys = Array.from({ length: 24 }, (_, i) => `ap:${i}`);
  let positions = assignRoomPoints(keys.slice(0, 13), 24);
  const first = new Map(positions);
  positions = assignRoomPoints(keys.slice().reverse(), 24, positions);
  for (const [key, slot] of first) expect(positions.get(key)).toBe(slot);
  const survivors = keys.filter((_, i) => i % 3 !== 0);
  const after = assignRoomPoints(survivors, 24, positions);
  for (const key of survivors) expect(after.get(key)).toBe(positions.get(key));
  expect(new Set(positions.values()).size).toBe(24);
  expect(assignRoomPoints(keys, 24)).toEqual(assignRoomPoints(keys.slice().reverse(), 24));
});

it("uses desk-free play art for the private room, including unknown qualifications", () => {
  for (const exam of ["ap", "fp2", "fe", "unknown"]) expect(relaxedChihuahuaArt(exam)).toMatch(/away-.+\.webp$/);
});
