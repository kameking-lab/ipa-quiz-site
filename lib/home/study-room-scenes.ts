import layouts from "./study-room-layouts.json";

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

// Continuous floor sampling is done offline: importing the room never runs a packing search.
const names = ["小さな自習室", "教室", "広い教室", "大教室", "ホール"];
export const STUDY_ROOM_SCENES: readonly StudyRoomScene[] = names.map((name, index) => {
  const width = [1024, 1500, 2150, 3050, 4800][index], height = width * 2 / 3;
  const seats = layouts[index];
  // The production room's pale wood and furnishings remain the visual reference.
  // Increasing the viewed floor area fits every learner without a scrolling canvas.
  return { name, background: "/images/home/study-room-white.webp", width, height,
    minWidth: 0, seats };
});

const extendedHalls = new Map<number, StudyRoomScene>();
export function studyRoomScene(stage: number): StudyRoomScene {
  if (stage < STUDY_ROOM_SCENES.length) return STUDY_ROOM_SCENES[stage];
  const cached = extendedHalls.get(stage);
  if (cached) return cached;
  const hall = STUDY_ROOM_SCENES[4], columns = stage - 3;
  const scene = { ...hall, columns, width: hall.width * columns,
    seats: Array.from({ length: columns }, (_, column) => hall.seats.map(point => ({ ...point, x: point.x + column * hall.width }))).flat() };
  extendedHalls.set(stage, scene);
  return scene;
}
