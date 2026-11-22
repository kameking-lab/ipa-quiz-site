import { jstDayNumber } from "@/lib/billing/reset-time";
import { randomFor, STUDY_ROOM_VISIBLE_LIMIT } from "./study-room";

// Coordinates use the same proportions as the four room illustrations.
export const CAFE_WIDTH = 352;
export const CAFE_HEIGHT = 195;
export const CAFE_ART_PATH = "/images/home/study-room-cafe";

type Anchor = readonly [x: number, floorY: number, width: number];
type Area = readonly [left: number, top: number, right: number, bottom: number];
interface CafeRoom {
  id: string;
  name: string;
  sleeper: Anchor;
  play: Anchor;
  anchors: readonly Anchor[];
  floor: readonly Area[];
  obstacles?: readonly Area[];
}

const rooms: readonly CafeRoom[] = [
  {
    id: "p1", name: "ラグのリビング", sleeper: [294, 58, 35], play: [159, 137, 37],
    anchors: [[33, 96, 37], [298, 58, 24], [327, 106, 37], [170, 83, 29],
      [236, 105, 37], [82, 100, 32], [251, 178, 43], [312, 160, 41],
      [137, 184, 37], [51, 181, 40], [185, 187, 39]],
    floor: [[13, 87, 339, 189], [57, 72, 245, 87]],
    obstacles: [[13, 105, 62, 124], [20, 133, 61, 158], [190, 125, 242, 148]],
  },
  {
    id: "p2", name: "本棚のブックカフェ", sleeper: [228, 53, 34], play: [279, 174, 37],
    anchors: [[28, 114, 40], [225, 55, 24], [287, 106, 34], [313, 70, 26],
      [133, 84, 30], [177, 177, 43], [60, 165, 42], [202, 119, 40],
      [78, 107, 35], [121, 145, 37], [320, 128, 36]],
    floor: [[12, 92, 340, 189], [42, 81, 266, 92], [135, 75, 188, 81]],
  },
  {
    id: "p3", name: "窓辺と段差の部屋", sleeper: [274, 43, 33], play: [108, 147, 37],
    anchors: [[28, 124, 40], [151, 42, 25], [239, 92, 34], [274, 43, 22],
      [198, 122, 35], [73, 65, 27], [286, 177, 43], [45, 181, 42],
      [319, 108, 39], [217, 178, 40], [155, 101, 33]],
    floor: [[12, 84, 340, 189], [45, 73, 307, 84], [109, 67, 311, 73]],
  },
  {
    id: "p4", name: "芝生のテラス", sleeper: [281, 30, 31], play: [133, 165, 39],
    anchors: [[33, 112, 39], [188, 55, 27], [225, 61, 34], [281, 31, 23],
      [244, 123, 38], [112, 104, 37], [54, 177, 43], [323, 124, 36],
      [279, 179, 43], [191, 184, 39], [303, 54, 27]],
    floor: [[21, 78, 331, 187], [215, 48, 316, 78], [63, 62, 215, 78]],
    obstacles: [[307, 151, 352, 195], [21, 65, 35, 85]],
  },
];

const rotationStart = jstDayNumber(Date.parse("2026-11-21T00:00:00+09:00"));
export function dailyCafeRoom(day: number): CafeRoom {
  const index = (day - rotationStart) % rooms.length;
  return rooms[(index + rooms.length) % rooms.length];
}

export interface CafePoint {
  x: number;
  floorY: number;
  width: number;
}

export function cafeSleeper(room: CafeRoom): CafePoint {
  const [x, floorY, width] = room.sleeper;
  return { x, floorY, width };
}

const gap = 1.2;
function fits(point: CafePoint, points: readonly CafePoint[]): boolean {
  const { x, floorY, width } = point;
  if (x - width / 2 < gap || x + width / 2 > CAFE_WIDTH - gap ||
    floorY - width < gap || floorY > CAFE_HEIGHT - gap) return false;
  return points.every(other =>
    Math.abs(x - other.x) >= (width + other.width) / 2 + gap ||
    floorY + gap <= other.floorY - other.width || other.floorY + gap <= floorY - width);
}

function inArea(x: number, y: number, [left, top, right, bottom]: Area): boolean {
  return x >= left && x <= right && y >= top && y <= bottom;
}

function floorCandidates(room: CafeRoom, random: () => number): Anchor[] {
  const candidates: Anchor[] = [];
  for (let row = 48; row < CAFE_HEIGHT - 4; row += 5) {
    for (let col = 12; col < CAFE_WIDTH - 8; col += 5) {
      const x = col + (random() - .5) * 4;
      const y = row + (random() - .5) * 4;
      if (!room.floor.some(area => inArea(x, y, area)) ||
        room.obstacles?.some(area => inArea(x, y, area))) continue;
      candidates.push([x, y, 23 + (y - 57) * .15]);
    }
  }
  for (let index = candidates.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [candidates[index], candidates[swap]] = [candidates[swap], candidates[index]];
  }
  return candidates;
}

/** Two adjacent slots are reserved first in populated rooms for an optional play pair. */
export const MIN_PLAY_GROUP = 5;

export function cafePoints(room: CafeRoom, day: number, count: number): CafePoint[] {
  const size = Math.min(count, STUDY_ROOM_VISIBLE_LIMIT);
  if (size <= 0) return [];
  const random = randomFor(day);
  const anchors: Anchor[] = room.anchors.map(([x, floorY, width]) =>
    [x + (random() - .5) * 4, floorY + (random() - .5) * 3, width]);
  const candidates = [...anchors, ...(size > 4 ? floorCandidates(room, random) : [])];
  let scale = size <= 12 ? 1 : size <= 30 ? .77 : size <= 60 ? .53 : .34;
  for (;;) {
    const points: CafePoint[] = [];
    if (size >= MIN_PLAY_GROUP) {
      const [center, floorY, baseWidth] = room.play;
      const width = baseWidth * scale;
      points.push({ x: center - (width + gap) / 2, floorY, width },
        { x: center + (width + gap) / 2, floorY, width });
    }
    for (const [x, floorY, baseWidth] of candidates) {
      const point = { x, floorY, width: baseWidth * scale };
      if (fits(point, points)) points.push(point);
      if (points.length === size) return points;
    }
    // The closely spaced floor candidates can fit the full cap at a smaller scale.
    scale *= .85;
  }
}
