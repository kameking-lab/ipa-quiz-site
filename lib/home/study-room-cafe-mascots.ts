import { canonicalPresenceExam } from "@/lib/study-presence";
import { IDLE_LABELS, idleArt, qualificationStudyArt, roomCharacter, type IdleVariant } from "./study-room";
import { CAFE_ART_PATH, MIN_PLAY_GROUP, type CafePoint } from "./study-room-cafe-layout";

export const CAFE_POSE_PATH = "/images/home/study-room-mascots/pose";
export const NO_CAFE_POSES: readonly string[] = [];
const CIVIL_CAFE_POSES = [
  "bow-east", "bow-west", "paw-east", "paw-west", "rear-angle", "rear", "sleep-belly", "sleep-side",
];
export const CAFE_POSE_FILES: readonly string[] = ["civil1", "civil2"].flatMap(exam =>
  CIVIL_CAFE_POSES.map(pose => `${exam}-${pose}.webp`),
);

type Pose = "study" | IdleVariant | "rear" | "rear-angle" | "bow" | "paw" | "sleep" | "sleep-belly";
type NewPose = Extract<Pose, "rear" | "rear-angle" | "bow" | "paw" | "sleep" | "sleep-belly">;
type Direction = "east" | "west";

const newPoses = {
  rear: { label: "窓の外をながめる", file: "generic-rear" },
  "rear-angle": { label: "後ろを向く", file: "generic-rear" },
  bow: { label: "遊びに誘う", file: "generic-bow" },
  paw: { label: "じゃれ合う", file: "generic-paw" },
  sleep: { label: "横になって眠る", file: "generic-sleep" },
  "sleep-belly": { label: "仰向けで眠る", file: "generic-belly" },
} satisfies Record<NewPose, { label: string; file: string }>;

const restingPoses = ["nap", "yawn", "tea", "stretch", "wave", "rear", "sleep"] as const;
const isNewPose = (pose: Pose): pose is NewPose => Object.hasOwn(newPoses, pose);

export interface CafeMascot {
  src: string;
  mirrored: boolean;
  pose: Pose;
  label: string;
}

/** The batch supplies right-facing bow/paw files. An explicit facing file takes precedence. */
export function cafeMascot(exam: string, pose: Pose, files: ReadonlySet<string>, direction: Direction = "east"): CafeMascot {
  if (pose === "study" || pose === "book") {
    return { src: (pose === "book" && idleArt(exam, "book")) || qualificationStudyArt(exam),
      mirrored: false, pose, label: "勉強中" };
  }
  if (!isNewPose(pose)) {
    const src = idleArt(exam, pose);
    if (src) return { src, mirrored: direction === "west", pose, label: IDLE_LABELS[pose] };
    return cafeMascot(exam, "sleep", files, direction);
  }

  const code = canonicalPresenceExam(exam) ?? exam;
  const character = roomCharacter(code);
  const label = newPoses[pose].label;
  const paired = pose === "bow" || pose === "paw";
  const opposite = direction === "east" ? "west" : "east";
  const variants: readonly (readonly [string, boolean])[] = paired
    ? [[`${pose}-${direction}`, false], [pose, direction === "west"], [`${pose}-${opposite}`, true]]
    : pose === "sleep" ? [[pose, false], ["sleep-side", false]]
    : pose === "rear-angle" ? [[pose, false], ["rear", false]]
    : pose === "sleep-belly" ? [[pose, false], ["sleep", false], ["sleep-side", false]]
    : [[pose, false]];
  for (const outfit of new Set([code, character])) {
    for (const [variant, mirrored] of variants) {
      const filename = `${outfit}-${variant}.webp`;
      if (files.has(filename)) {
        const actualPose = pose === "sleep-belly" && variant !== "sleep-belly" ? "sleep" : pose;
        return { src: `${CAFE_POSE_PATH}/${filename}`, mirrored, pose: actualPose, label: newPoses[actualPose].label };
      }
    }
  }
  return { src: `${CAFE_ART_PATH}/${newPoses[pose].file}.webp`, mirrored: paired && direction !== (pose === "paw" ? "west" : "east"), pose, label };
}

interface Learner { exam: string; index: number; active: boolean }
export interface CafeOccupant extends Learner {
  key: string;
  mascot: CafeMascot;
  point: CafePoint;
}

export function cafeOccupants(seats: readonly Learner[], points: readonly CafePoint[], day: number, files: ReadonlySet<string>, current: boolean): CafeOccupant[] {
  const resting = seats.flatMap((seat, index) => current && seat.active ? [] : [index]);
  const pair = seats.length >= MIN_PLAY_GROUP ? resting.slice(0, 2) : [];
  const hasPair = pair.length === 2;
  const restOffset = (day % restingPoses.length + restingPoses.length) % restingPoses.length;
  let nextPoint = hasPair ? 2 : 0;
  let restIndex = 0;
  return seats.map((seat, index) => {
    const active = current && seat.active;
    const pairIndex = hasPair ? pair.indexOf(index) : -1;
    let pose: Pose;
    if (pairIndex >= 0) pose = pairIndex === 0 ? "bow" : "paw";
    else if (active) pose = index % 2 === 0 ? "study" : "book";
    else {
      const turn = restIndex++ + restOffset;
      pose = restingPoses[turn % restingPoses.length];
      if (turn % 2 === 1 && pose === "rear") pose = "rear-angle";
      if (turn % 2 === 1 && pose === "sleep") pose = "sleep-belly";
    }
    const point = points[pairIndex < 0 ? nextPoint++ : pairIndex];
    const direction = pairIndex === 1 || (pairIndex < 0 && (day + index) % 2 === 1) ? "west" : "east";
    return { ...seat, active, key: `${seat.exam}:${seat.index}`, mascot: cafeMascot(seat.exam, pose, files, direction), point };
  });
}
