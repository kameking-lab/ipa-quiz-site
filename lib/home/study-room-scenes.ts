/** Measured source-image pixels. y is the centre of the dog's square, deskY the rear edge of its desk. */
export interface RoomSeatPosition { x: number; y: number; width: number; deskY?: number }
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
const names = ["小さな自習室", "教室", "広い教室", "大教室", "ホール"];
// Each row follows the illustrated chair centres, including the central aisles.
// Sizes increase towards the viewer. Never distribute learners independently of furniture.
const rows: readonly (readonly (readonly [number, number, readonly number[]])[])[] = [
  [[725, 224, [348, 671]], [990, 260, [195, 511, 828]]],
  [[741, 190, [177, 406, 632, 859]], [958, 208, [162, 400, 640, 881]], [1223, 222, [149, 399, 649, 895]]],
  [[573, 116, [161, 303, 449, 592, 738, 882]], [766, 126, [139, 292, 445, 601, 752, 905]],
    [1002, 136, [118, 278, 436, 603, 764, 924]], [1235, 144, [106, 268, 430, 603, 769, 935]]],
  [[452, 76, [196, 280, 362, 441, 596, 680, 764, 847]], [592, 82, [166, 255, 345, 433, 611, 702, 792, 885]],
    [749, 86, [132, 235, 335, 431, 617, 719, 821, 919]], [923, 90, [106, 210, 317, 425, 628, 732, 841, 949]],
    [1106, 94, [91, 205, 316, 421, 636, 747, 856, 969]], [1291, 98, [83, 194, 303, 415, 638, 752, 866, 974]]],
  Array.from({ length: 10 }, (_, row) => [392 + row * 104, 62 + row * .45,
    [72, 150, 229, 309, 388, 466, 574, 653, 733, 812, 892, 971]] as const),
];
export const STUDY_ROOM_SCENES: readonly StudyRoomScene[] = counts.map((count, index) => {
  const width = index === 4 ? 1086 : 1024, height = index === 4 ? 1448 : 1536;
  const seats = rows[index].flatMap(([deskY, size, centres]) => centres.map(x => ({ x, y: deskY - size * .125, width: size, deskY })));
  if (seats.length !== count) throw new Error(`Room ${index + 1}: missing illustrated chairs`);
  return { name: names[index], background: image(index + 1), width, height,
    minWidth: Math.max(358, Math.ceil(width * 44 / Math.min(...seats.map(seat => seat.width))) + 2), seats };
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
