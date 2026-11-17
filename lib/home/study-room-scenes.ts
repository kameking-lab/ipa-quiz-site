/** Source-image pixels. Sprite paws meet the desk surface; its own desk is masked. */
export interface RoomSeatPosition { x: number; y: number; width: number }
export interface StudyRoomScene {
  name: string;
  background: string | null;
  width: number;
  height: number;
  minWidth?: number;
  seats: readonly RoomSeatPosition[];
}

const row = (xs: number[], deskY: number, width: number): RoomSeatPosition[] => xs.map(x => ({ x, y: deskY - width * .12, width }));
const image = (room: number) => `/images/home/study-room-scenes/room-${room}-nordic.webp`;
const hallSeats = [409, 512, 619, 727, 831, 937, 1044, 1152, 1258, 1366].flatMap(y =>
  row([70, 150, 230, 309, 387, 465, 574, 653, 732, 812, 891, 970], y, 60));

export const STUDY_ROOM_SCENES: readonly StudyRoomScene[] = [
  { name: "小さな自習室", background: image(1), width: 1024, height: 1536,
    seats: [...row([345, 678], 740, 200), ...row([180, 510, 844], 1020, 260)] },
  { name: "教室", background: image(2), width: 1024, height: 1536,
    seats: [...row([169, 400, 636, 859], 750, 160), ...row([151, 399, 644, 886], 979, 180), ...row([144, 398, 648, 904], 1250, 200)] },
  { name: "広い教室", background: image(3), width: 1024, height: 1536, minWidth: 378,
    seats: [...row([153, 296, 440, 585, 730, 873], 590, 120), ...row([120, 276, 432, 589, 746, 902], 790, 130),
      ...row([108, 276, 442, 607, 772, 938], 1030, 140), ...row([100, 267, 433, 600, 767, 934], 1270, 150)] },
  { name: "大教室", background: image(4), width: 1024, height: 1536, minWidth: 628,
    seats: [460, 600, 760, 940, 1135, 1325].flatMap((y, index) => {
      const back = [190, 275, 360, 444, 602, 684, 770, 852], front = [72, 176, 282, 397, 625, 742, 848, 950];
      return row(back.map((x, col) => x + (front[col] - x) * index / 5), y, 72 + index * 6);
    }) },
  { name: "ホール", background: image(5), width: 1086, height: 1448, minWidth: 804, seats: hallSeats },
];

export function studyRoomScene(stage: number) { return STUDY_ROOM_SCENES[stage]; }

/** Illustrated backgrounds retain their original coordinates and full aspect ratio.
 * The unillustrated fallback uses only occupied rows. */
export function studyRoomHeight(scene: StudyRoomScene, count: number): number {
  if (scene.background) return scene.height;
  const footer = count > 120 ? 150 : 80;
  return Math.max(480, ...scene.seats.slice(0, count).map(seat => seat.y + seat.width * 1.15 / 2 + footer));
}
