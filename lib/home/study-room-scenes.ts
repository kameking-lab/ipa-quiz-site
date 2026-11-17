import { scatteredRoomPoints } from "./study-room-scatter";

/** Source-image pixels. Fixed scattered areas for dogs and their tap targets. */
export interface RoomSeatPosition { x: number; y: number; width: number }
export interface StudyRoomScene {
  name: string;
  background: string | null;
  width: number;
  height: number;
  minWidth?: number;
  columns?: number;
  seats: readonly RoomSeatPosition[];
}

const image = (room: number) => `/images/home/study-room-scenes/room-${room}-nordic.webp`;
const counts = [5, 12, 24, 48, 120];
const sizes = [210, 150, 112, 82, 54];
const names = ["小さな自習室", "教室", "広い教室", "大教室", "ホール"];
export const STUDY_ROOM_SCENES: readonly StudyRoomScene[] = counts.map((count, index) => {
  const width = index === 4 ? 1086 : 1024, height = index === 4 ? 1448 : 1536;
  return { name: names[index], background: image(index + 1), width, height,
    minWidth: Math.max(358, Math.ceil(width * 44 / sizes[index]) + 2),
    seats: scatteredRoomPoints(count, width, height, sizes[index]) };
});

const extendedHalls = new Map<number, StudyRoomScene>();
export function studyRoomScene(stage: number): StudyRoomScene {
  if (stage < STUDY_ROOM_SCENES.length) return STUDY_ROOM_SCENES[stage];
  const cached = extendedHalls.get(stage);
  if (cached) return cached;
  const hall = STUDY_ROOM_SCENES[4], columns = stage - 3;
  const scene = { ...hall, columns, width: hall.width * columns, minWidth: (hall.minWidth! - 2) * columns + 2,
    seats: Array.from({ length: columns }, (_, column) => hall.seats.map(point => ({ ...point, x: point.x + column * hall.width }))).flat() };
  extendedHalls.set(stage, scene);
  return scene;
}

/** Illustrated backgrounds retain their original coordinates and full aspect ratio.
 * The unillustrated fallback uses only occupied rows. */
export function studyRoomHeight(scene: StudyRoomScene, count: number): number {
  if (scene.background) return scene.height;
  const footer = count > 120 ? 150 : 80;
  return Math.max(480, ...scene.seats.slice(0, count).map(seat => seat.y + seat.width * 1.15 / 2 + footer));
}
