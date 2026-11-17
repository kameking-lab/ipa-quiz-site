import { expect, it } from "vitest";
import { assignRoomPoints } from "@/lib/home/study-room-scatter";
import { STUDY_ROOM_SCENES, studyRoomScene } from "@/lib/home/study-room-scenes";
import { RELAXED_ROOM_ART, STUDY_ROOM_POSES, scatteredChihuahuaArt } from "@/lib/home/room-chihuahua-art";

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

it("starts sparse rooms in the foreground without moving survivors as people arrive", () => {
  const scene = STUDY_ROOM_SCENES[0];
  const first = assignRoomPoints(["fe:0"], scene.seats.length);
  expect(first.get("fe:0")).toBe(0);
  expect(scene.seats[0].floorY).toBe(Math.max(...scene.seats.map(p => p.floorY)));
  const next = assignRoomPoints(["fe:0", "fe:1"], scene.seats.length, first);
  expect(next.get("fe:0")).toBe(first.get("fe:0"));
});

it("uses single-dog ar-3 cutouts and stable poses, with no study pose in the private room", () => {
  expect(STUDY_ROOM_POSES).toHaveLength(11);
  expect(STUDY_ROOM_POSES.some(([file]) => file.includes("pair"))).toBe(false);
  for (const src of Object.values(RELAXED_ROOM_ART)) expect(src).toMatch(/\/home\/cream-(cushion-sleep|ball-play|belly-up)\.png$/);
  expect(scatteredChihuahuaArt("fe:2")).toEqual(scatteredChihuahuaArt("fe:2"));
  for (const exam of ["ap", "fe", "ip"]) {
    const poses = Array.from({ length: 12 }, (_, index) => scatteredChihuahuaArt(`${exam}:${index}`).src);
    expect(new Set(poses).size).toBeGreaterThanOrEqual(5);
  }
});

it("extends halls without changing existing points or image aspect ratios", () => {
  const first = studyRoomScene(4), second = studyRoomScene(5), third = studyRoomScene(6);
  expect(second.seats).toHaveLength(240);
  expect(third.seats).toHaveLength(360);
  expect(second.seats.slice(0, 120)).toEqual(first.seats);
  expect(second.width / second.columns! / second.height).toBe(first.width / first.height);
  expect(second.seats[120].x).toBe(first.seats[0].x + first.width);
});
