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
  const width = 1024, height = 1536;
  const seats = layouts[index];
  return { name, background: `/images/home/study-room-v3/R${index + 1}.webp`, width, height,
    minWidth: [358, 358, 650, 950, 1500][index], seats };
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
