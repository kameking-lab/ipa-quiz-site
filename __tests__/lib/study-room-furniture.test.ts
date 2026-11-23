import { expect, it } from "vitest";
import { FURNITURE_ART, furnitureRoomMascots } from "@/lib/home/study-room-furniture";
import { STUDY_ROOM_SCENES, studyRoomScene } from "@/lib/home/study-room-scenes";
import { assignRoomPoints, ROOM_ART_EXTENT } from "@/lib/home/study-room-scatter";
import { presenceSeatMascot } from "@/lib/home/study-room";

it("fits every single-dog cutout inside its reservation, with normalized head scale", () => {
  expect(FURNITURE_ART).toHaveLength(72);
  for (const art of FURNITURE_ART) {
    expect(art.size[0] / art.headWidth).toBeLessThan(ROOM_ART_EXTENT);
    expect(art.ground[1] / art.headWidth).toBeLessThan(ROOM_ART_EXTENT);
    expect(art.pose).not.toMatch(/pair/);
  }
});

it("keeps exact headcounts and whole-person study/nap/rest quotas at all stages", () => {
  for (const [count, stage] of [[1, 0], [5, 0], [12, 1], [24, 2], [48, 3], [120, 4], [130, 5]]) {
    const scene = studyRoomScene(stage);
    const keys = Array.from({ length: count }, (_, i) => `fe:${i}`);
    const points = assignRoomPoints(keys, scene.seats.length);
    const mascots = furnitureRoomMascots(keys, points, scene.seats);
    expect(mascots.size).toBe(count);
    const states = [...mascots.values()].map(m => m.state);
    const resting = states.filter(s => s !== "study");
    expect(resting).toHaveLength(Math.round(count * .2));
    expect(states.filter(s => s === "away")).toHaveLength(count >= 10 ? Math.max(1, Math.round(count * .06)) : 0);
    expect(states.filter(s => s === "study").length / count).toBeGreaterThanOrEqual(.78);
    expect(furnitureRoomMascots([...keys].reverse(), points, scene.seats)).toEqual(mascots);
    for (const [key, mascot] of mascots) {
      const point = scene.seats[points.get(key)!];
      const nearest = [...mascots].filter(([k]) => k !== key).sort(([a], [b]) => {
        const distance = (k: string) => { const p = scene.seats[points.get(k)!]; return Math.hypot(p.x - point.x, p.y - point.y); };
        return distance(a) - distance(b);
      })[0]?.[1];
      if (nearest) expect(`${mascot.art.pose}:${mascot.art.direction}`).not.toBe(`${nearest.art.pose}:${nearest.art.direction}`);
    }
  }
});

it("preserves each qualification's outfit and tools, reserving ar-4 for unselected guests", () => {
  const keys = ["ap:0", "fe:0", "fp2:0", "denken3:0", "kisho:0", "guest:0"];
  const scene = STUDY_ROOM_SCENES[1];
  const mascots = furnitureRoomMascots(keys, assignRoomPoints(keys, scene.seats.length), scene.seats);
  for (const key of keys.slice(0, -1)) {
    const mascot = mascots.get(key)!;
    expect(mascot.qualification).toBe(true);
    expect(mascot.src).toContain("/study-room-mascots/");
    expect(mascot.src).toContain(key.split(":")[0]);
  }
  expect(mascots.get("guest:0")).toMatchObject({ qualification: false, src: expect.stringContaining("/study-room-v3/") });
});

it("keeps shared qualifications' props instead of substituting a field idle pose", () => {
  const keys = Array.from({ length: 12 }, (_, i) => `kisho:${i}`);
  const scene = STUDY_ROOM_SCENES[1];
  const mascots = [...furnitureRoomMascots(keys, assignRoomPoints(keys, scene.seats.length), scene.seats).values()];
  expect(mascots.filter(m => m.state === "study")).toHaveLength(10);
  expect(mascots.filter(m => m.state === "break")).toHaveLength(2);
  for (const mascot of mascots) expect(mascot.src).toMatch(/\/shared-kisho-(study|break)\.webp$/);
});

it("keeps the qualification's own break outfit on both daily room views", () => {
  const keys = ["kisho:0", "kisho:1"];
  const scene = STUDY_ROOM_SCENES[0];
  const mascots = furnitureRoomMascots(keys, assignRoomPoints(keys, scene.seats.length), scene.seats, new Set([keys[0]]));
  expect(mascots.get(keys[0])?.src).toBe(presenceSeatMascot("kisho", 0, true).src);
  const resting = presenceSeatMascot("kisho", 1, false);
  expect(resting.src).toMatch(/\/shared-kisho-break\.webp$/);
  expect(mascots.get(keys[1])?.src).toBe(resting.src);
});

it("keeps the heads separated even where transparent sprite corners share space", () => {
  for (const scene of STUDY_ROOM_SCENES) for (const [i, point] of scene.seats.entries()) {
    for (const other of scene.seats.slice(i + 1)) expect(
      Math.max(Math.abs(point.x - other.x), Math.abs(point.y - other.y)) - (point.width + other.width) / 4,
    ).toBeGreaterThan(0);
  }
});

it("shows an actual sleeping dog and a qualification-specific playing dog among twelve", () => {
  const keys = Array.from({ length: 12 }, (_, i) => `fe:${i}`);
  const scene = STUDY_ROOM_SCENES[1];
  const mascots = [...furnitureRoomMascots(keys, assignRoomPoints(keys, scene.seats.length), scene.seats).values()];
  expect(mascots.filter(m => m.state === "study")).toHaveLength(10);
  expect(mascots.filter(m => m.src.endsWith("/idle/fe-nap.webp"))).toHaveLength(1);
  expect(mascots.filter(m => m.src.endsWith("/away-exam-fe.webp"))).toHaveLength(1);
});
