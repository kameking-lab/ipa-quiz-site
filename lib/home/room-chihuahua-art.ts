import catalog from "./study-room-mascots.generated.json";
import { canonicalPresenceExam } from "@/lib/study-presence";
import { roomIdentitySeed } from "./study-room-scatter";
import type { SeatMascot } from "./study-room";

export const RELAXED_ROOM_SHEET = "/images/home/room-chihuahuas/home-cream-sheet.png";
const POSE_LABELS = ["丸まって眠る", "ボールで遊ぶ", "のびをする", "ごろん", "ひなたぼっこ", "あごをのせてくつろぐ"];

/** Existing qualification outfits supplement the ar-3 resting poses. */
export function relaxedChihuahuaArt(exam: string): string {
  const code = canonicalPresenceExam(exam) ?? exam;
  const away = catalog.away;
  return (away.exams as Record<string, { src: string }>)[code]?.src
    ?? (away.fields as Record<string, { src: string }>)[(away.examFields as Record<string, string>)[code]]?.src
    ?? away.exams.ip.src;
}

export function scatteredChihuahuaArt(exam: string, key: string): SeatMascot {
  const seed = roomIdentitySeed(key);
  if (seed % 3 !== 0) {
    const frame = (seed >>> 8) % 6;
    return { src: RELAXED_ROOM_SHEET, frame, state: frame === 0 || frame > 2 ? "break" : "away",
      stateLabel: POSE_LABELS[frame], mirrored: (seed >>> 4) % 2 === 0 };
  }
  return { src: relaxedChihuahuaArt(exam), state: "away", stateLabel: "遊んでいる", mirrored: (seed >>> 4) % 2 === 0 };
}
