import { jstDayNumber } from "@/lib/billing/reset-time";
import { randomFor, type IdleVariant } from "./study-room";

export const CAFE_ART_PATH = "/images/home/study-room-cafe";
export const CAFE_SEAT_LIMIT = 12;

const rooms = [
  { id: "p1", name: "ラグのリビング" },
  { id: "p2", name: "本棚のブックカフェ" },
  { id: "p3", name: "窓辺と段差の部屋" },
  { id: "p4", name: "芝生のテラス" },
] as const;

const rotationStart = jstDayNumber(Date.parse("2026-11-21T00:00:00+09:00"));
export function dailyCafeRoom(day: number) {
  const index = (day - rotationStart) % rooms.length;
  return rooms[(index + rooms.length) % rooms.length];
}

export type CafePose = "study" | IdleVariant | "rear" | "rear-angle" | "bow" | "paw" | "sleep" | "sleep-belly";
export type CafeDirection = "east" | "west";

type RoomId = (typeof rooms)[number]["id"];
type Spot = readonly [x: number, floor: number, size: number, direction: CafeDirection];
type SpotGroup = readonly [id: string, poses: readonly CafePose[], ...spots: Spot[]];

export interface CafeSeat {
  id: string;
  poses: readonly CafePose[];
  x: number;
  floor: number;
  size: number;
  direction: CafeDirection;
}

const desk = ["study", "book", "stretch"] as const;
const stretch = ["stretch"] as const;
const sleep = ["sleep", "sleep-belly"] as const;
const sideNap = ["sleep"] as const;
const watch = ["rear", "rear-angle"] as const;
const bow = ["bow"] as const;
const paw = ["paw"] as const;

// Floor and seat contacts in the 352 × 195 illustrations. Fill the first
// groups at low attendance. Alternatives share a group so they never coexist.
const spots = {
  p1: [
    ["rug-desk", desk, [139, 124, 71, "west"], [145, 131, 74, "west"]],
    ["sofa", sleep, [299, 71, 54, "west"], [315, 75, 49, "east"]],
    ["front-rug", sleep, [194, 182, 76, "east"], [203, 187, 73, "west"]],
    ["cushion-edge", bow, [53, 152, 64, "east"], [46, 157, 67, "east"]],
    ["rug-fringe", paw, [104, 165, 70, "west"]],
    ["right-floor", desk, [286, 151, 72, "east"], [291, 156, 74, "east"]],
    ["window", watch, [204, 77, 51, "east"], [189, 73, 48, "west"]],
    ["bookshelf", stretch, [64, 93, 62, "east"], [55, 89, 59, "east"]],
    ["left-wall", sleep, [34, 115, 51, "west"], [32, 110, 53, "west"]],
    ["planter", paw, [242, 98, 57, "east"]],
    ["right-boards", sideNap, [317, 169, 61, "east"]],
    ["sunlit-rug", bow, [216, 134, 61, "west"]],
  ],
  p2: [
    ["floor-desk", desk, [103, 137, 70, "east"], [111, 142, 73, "east"]],
    ["window-sofa", sleep, [219, 66, 55, "west"], [234, 69, 51, "east"]],
    ["front-right", sleep, [300, 176, 74, "west"], [309, 183, 72, "west"]],
    ["light-on-floor", bow, [172, 163, 67, "east"], [180, 167, 71, "east"]],
    ["floorboards", paw, [227, 183, 75, "west"]],
    ["lamp-desk", desk, [277, 125, 68, "west"], [276, 133, 72, "west"]],
    ["bookshelf", watch, [138, 85, 54, "west"], [142, 82, 51, "east"]],
    ["left-shelves", stretch, [48, 91, 60, "west"], [57, 98, 62, "west"]],
    ["left-boards", paw, [43, 156, 70, "east"], [48, 161, 73, "east"]],
    ["armchair", sideNap, [318, 72, 50, "west"]],
    ["sunlit-boards", sleep, [161, 112, 63, "east"]],
    ["right-wall", paw, [325, 118, 54, "west"]],
  ],
  p3: [
    ["center-floor", desk, [171, 126, 73, "east"], [179, 131, 71, "east"]],
    ["step", sleep, [65, 58, 51, "west"], [69, 54, 49, "east"]],
    ["front-right", sleep, [271, 179, 74, "east"], [280, 185, 77, "west"]],
    ["left-sunlight", bow, [72, 152, 66, "east"], [78, 149, 63, "east"]],
    ["front-boards", paw, [127, 171, 74, "west"]],
    ["right-desk", desk, [288, 99, 62, "west"], [293, 105, 65, "west"]],
    ["window-seat", watch, [229, 55, 49, "east"], [216, 56, 48, "west"]],
    ["left-planter", paw, [33, 93, 58, "west"], [38, 97, 61, "west"]],
    ["sunlit-floor", sideNap, [207, 148, 63, "west"], [213, 153, 66, "east"]],
    ["right-planter", paw, [320, 155, 62, "east"]],
    ["foot-of-step", watch, [119, 78, 54, "east"]],
    ["front-left", sleep, [43, 190, 72, "east"]],
  ],
  p4: [
    ["lawn-desk", desk, [214, 129, 73, "west"], [224, 134, 75, "west"]],
    ["veranda", watch, [286, 54, 46, "west"], [275, 49, 44, "east"]],
    ["front-lawn", sleep, [90, 164, 77, "west"], [83, 172, 73, "east"]],
    ["sunny-lawn", bow, [205, 183, 75, "east"], [213, 188, 77, "east"]],
    ["porch-side", paw, [262, 165, 71, "west"]],
    ["left-lawn", desk, [113, 105, 65, "east"], [106, 110, 67, "east"]],
    ["stepping-stones", watch, [143, 68, 50, "east"], [156, 64, 48, "west"]],
    ["porch-edge", sideNap, [311, 100, 60, "east"], [305, 92, 57, "east"]],
    ["middle-lawn", sleep, [162, 139, 63, "east"], [166, 145, 65, "west"]],
    ["flower-border", paw, [41, 121, 64, "east"]],
    ["right-lawn", bow, [317, 147, 64, "west"]],
    ["hedge", watch, [61, 78, 54, "west"]],
  ],
} as const satisfies Record<RoomId, readonly SpotGroup[]>;

export function cafeSeats(day: number, count: number): CafeSeat[] {
  const random = randomFor(day);
  return spots[dailyCafeRoom(day).id].slice(0, Math.max(0, count)).map(([id, poses, ...choices]) => {
    const [x, floor, size, direction] = choices[Math.floor(random() * choices.length)];
    return { id, poses, x, floor, size, direction };
  });
}

export const cafeSleeper: Record<RoomId, Pick<CafeSeat, "x" | "floor" | "size">> = {
  p1: { x: 165, floor: 131, size: 72 },
  p2: { x: 206, floor: 127, size: 72 },
  p3: { x: 121, floor: 122, size: 72 },
  p4: { x: 184, floor: 125, size: 72 },
};
