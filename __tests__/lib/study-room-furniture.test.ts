import { expect, it } from "vitest";
import { FURNITURE_ART, furnitureRoomMascots } from "@/lib/home/study-room-furniture";
import { STUDY_ROOM_SCENES, studyRoomScene } from "@/lib/home/study-room-scenes";
import { assignRoomPoints, ROOM_ART_EXTENT } from "@/lib/home/study-room-scatter";

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
    expect(states.filter(s => s === "break")).toHaveLength(Math.round(count * .14));
    expect(states.filter(s => s === "away")).toHaveLength(Math.floor(count * .07));
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

it("does not overlap any reserved furniture boxes, including ground shadows", () => {
  for (const scene of STUDY_ROOM_SCENES) for (const [i, point] of scene.seats.entries()) {
    for (const other of scene.seats.slice(i + 1)) expect(
      Math.max(Math.abs(point.x - other.x), Math.abs(point.y - other.y)) - (point.width + other.width) / 2,
    ).toBeGreaterThanOrEqual(8);
  }
});
