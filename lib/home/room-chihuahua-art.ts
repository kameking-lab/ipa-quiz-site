import { roomIdentitySeed } from "./study-room-scatter";
import { randomFor, idleArt, qualificationStudyArt } from "./study-room";
import type { SeatMascot } from "./study-room";

const ROOT = "/images/home/room-chihuahuas";
export const RELAXED_ROOM_ART = {
  sleep: `${ROOT}/home/cream-cushion-sleep.png`,
  play: `${ROOT}/home/cream-ball-play.png`,
  petted: `${ROOT}/home/cream-belly-up.png`,
} as const;
/** Each cutout depicts exactly one dog; the two-dog play-pair is absent. */
export const STUDY_ROOM_POSES = [
  ["curl-left", "丸まって眠る"], ["side-right", "横になって眠る"], ["belly-left", "ごろん"],
  ["sit-front", "こちらを向いて座る"], ["sit-left", "左を向いて座る"], ["sit-back", "後ろを向いて座る"],
  ["walk-left", "左へ歩く"], ["walk-right", "右へ歩く"], ["ball-right", "ボールで遊ぶ"],
  ["tug-left", "おもちゃで遊ぶ"], ["sit-right", "右を向いて座る"],
] as const;

export function scatteredChihuahuaArt(key: string): SeatMascot {
  const seed = roomIdentitySeed(key);
  const random = randomFor(seed);
  const index = Math.floor(random() * STUDY_ROOM_POSES.length);
  const [file, stateLabel] = STUDY_ROOM_POSES[index];
  return { src: `${ROOT}/study/${file}.png`, state: index < 6 || index === 10 ? "break" : "away",
    stateLabel, mirrored: random() < .5 };
}

/** Stable anonymous identities choose their moments; exact quotas keep even small rooms studying. */
export function seatedRoomMascots(keys: readonly string[]): Map<string, SeatMascot> {
  const ranked = [...keys].sort((a, b) => roomIdentitySeed(`moment:${a}`) - roomIdentitySeed(`moment:${b}`) || a.localeCompare(b));
  const away = Math.min(3, Math.floor(keys.length * .07));
  const naps = Math.round(keys.length * .15);
  return new Map(ranked.map((key, index): [string, SeatMascot] => {
    const exam = key.slice(0, key.lastIndexOf(":"));
    const seed = roomIdentitySeed(key);
    if (index < away) {
      const [file, stateLabel] = STUDY_ROOM_POSES[[0, 1, 2, 8, 9][seed % 5]];
      return [key, { src: `${ROOT}/study/${file}.png`, state: "away", stateLabel, mirrored: seed % 2 === 0 }];
    }
    const sleeping = index < away + naps;
    const variant = sleeping ? "nap" : seed % 4 === 0 ? "book" : null;
    const src = variant && idleArt(exam, variant);
    return [key, { src: src || qualificationStudyArt(exam), state: sleeping && src ? "break" : "study",
      stateLabel: sleeping && src ? "机でうたた寝" : variant === "book" && src ? "本で勉強中" : "ノートで勉強中", mirrored: seed % 2 === 0 }];
  }));
}
