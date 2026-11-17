import { scatteredRoomPoints } from "./study-room-scatter";

/** Source pixels: y is the reserved square centre; floorY is its contact with the floor. */
export interface RoomSeatPosition { x: number; y: number; width: number; floorY: number }
export interface StudyRoomScene {
  name: string;
  background: string;
  width: number;
  height: number;
  minWidth: number;
  columns?: number;
  seats: readonly RoomSeatPosition[];
}

// ar-4 floors.json: calibrated floor trapezoids and vanishing points, not seat coordinates.
const floors = [
  { backY: 825, backLeft: 120, backRight: 904, vanishingY: 400 },
  { backY: 700, backLeft: 260, backRight: 764, vanishingY: 375 },
  { backY: 682, backLeft: 280, backRight: 744, vanishingY: 360 },
  { backY: 692, backLeft: 228, backRight: 796, vanishingY: 340 },
  { backY: 700, backLeft: 245, backRight: 779, vanishingY: 350 },
];
const counts = [5, 12, 24, 48, 120];
const names = ["小さな自習室", "教室", "広い教室", "大教室", "ホール"];
const headWidths = [85, 52, 38, 26, 14.8];
export const STUDY_ROOM_SCENES: readonly StudyRoomScene[] = counts.map((count, index) => {
  const width = 1024, height = 1536;
  const seats = scatteredRoomPoints(count, width, height, headWidths[index], floors[index]);
  return { name: names[index], background: `/images/home/study-room-v3/R${index + 1}.webp`, width, height,
    minWidth: Math.max(358, Math.ceil(width * 44 / Math.min(...seats.map(seat => seat.width))) + 2), seats };
});

const extendedHalls = new Map<number, StudyRoomScene>();
export function studyRoomScene(stage: number): StudyRoomScene {
  if (stage < STUDY_ROOM_SCENES.length) return STUDY_ROOM_SCENES[stage];
  const cached = extendedHalls.get(stage);
  if (cached) return cached;
  const hall = STUDY_ROOM_SCENES[4], columns = stage - 3;
  const scene = { ...hall, columns, width: hall.width * columns, minWidth: (hall.minWidth - 2) * columns + 2,
    seats: Array.from({ length: columns }, (_, column) => hall.seats.map(point => ({ ...point, x: point.x + column * hall.width }))).flat() };
  extendedHalls.set(stage, scene);
  return scene;
}
