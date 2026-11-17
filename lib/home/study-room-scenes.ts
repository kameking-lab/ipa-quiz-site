/** ar-2 handoff: replace only STUDY_ROOM_SCENES with the approved backgrounds and seat coordinates.
 * Coordinates use the source image's pixels. Null backgrounds deliberately keep the interim seats
 * unillustrated; none of the previous room images are stretched to stand in for the five new rooms.
 */
export interface RoomSeatPosition { x: number; y: number; width: number }
export interface StudyRoomScene {
  name: string;
  background: string | null;
  width: number;
  height: number;
  seats: readonly RoomSeatPosition[];
}

function pendingScene(name: string, capacity: number, columns: number, seatWidth: number): StudyRoomScene {
  const width = 1200;
  const rowHeight = width / columns * 1.18;
  const height = Math.ceil(capacity / columns) * rowHeight + 100;
  return { name, background: null, width, height,
    seats: Array.from({ length: capacity }, (_, i) => ({
      x: (i % columns + 0.5) * width / columns,
      y: 50 + (Math.floor(i / columns) + 0.5) * rowHeight,
      width: seatWidth,
    })),
  };
}

export const STUDY_ROOM_SCENES: readonly StudyRoomScene[] = [
  pendingScene("小さな自習室", 5, 3, 330),
  pendingScene("教室", 12, 3, 305),
  pendingScene("広い教室", 24, 4, 255),
  pendingScene("大教室", 48, 5, 210),
  pendingScene("ホール", 120, 6, 180),
];

export function studyRoomScene(stage: number) { return STUDY_ROOM_SCENES[stage]; }

/** Until the illustrated room arrives, keep its unused rows from pushing the one action away.
 * Approved backgrounds always retain their original coordinate system and full aspect ratio. */
export function studyRoomHeight(scene: StudyRoomScene, count: number): number {
  if (scene.background) return scene.height;
  const footer = count > 120 ? 150 : 80;
  return Math.max(480, ...scene.seats.slice(0, count).map(seat => seat.y + seat.width * 1.15 / 2 + footer));
}
