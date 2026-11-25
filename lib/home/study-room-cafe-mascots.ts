import { canonicalPresenceExam } from "@/lib/study-presence";
import { IDLE_LABELS, idleArt, qualificationStudyArt, randomFor, roomCharacter } from "./study-room";
import { CAFE_ART_PATH, cafeSeats, type CafeDirection, type CafePose, type CafeSeat } from "./study-room-cafe-layout";

export const CAFE_POSE_PATH = "/images/home/study-room-mascots/pose";
export const NO_CAFE_POSES: readonly string[] = [];
const CAFE_POSE_CODES = [
  "ap", "au", "chusho-kigyo-shindanshi", "civil1", "civil2", "db", "denken3", "denko2", "fe",
  "field-accounting", "field-architecture", "field-civil", "field-electrical", "field-finance",
  "field-gas-energy", "field-it-basics", "field-it-development", "field-legal", "field-mechanical",
  "field-medical-lab", "field-nature", "field-nursing", "field-plumbing", "field-real-estate",
  "field-safety", "field-services", "field-welfare", "fp1", "fp2", "fp3", "gyosei", "hoikushi",
  "ip", "kaigo", "kangoshi", "kenchikushi1", "nw", "pm", "sa", "sc", "sg", "shakai",
  "sharoushi", "sm", "st", "takken", "tohan", "yakuzaishi",
];
export const CAFE_POSE_FILES: readonly string[] = [
  ...CAFE_POSE_CODES.flatMap(code =>
    ["rear", "bow", "paw", "sleep"].map(pose => `${code}-${pose}.webp`)),
  ...["civil1", "civil2"].flatMap(code =>
    ["rear-angle", "sleep-belly"].map(pose => `${code}-${pose}.webp`)),
];

type NewPose = Extract<CafePose, "rear" | "rear-angle" | "bow" | "paw" | "sleep" | "sleep-belly">;

const newPoses = {
  rear: { label: "窓の外をながめる", file: "generic-rear" },
  "rear-angle": { label: "後ろを向く", file: "generic-rear" },
  bow: { label: "遊びに誘う", file: "generic-bow" },
  paw: { label: "じゃれ合う", file: "generic-paw" },
  sleep: { label: "横になって眠る", file: "generic-sleep" },
  "sleep-belly": { label: "仰向けで眠る", file: "generic-belly" },
} satisfies Record<NewPose, { label: string; file: string }>;

const isNewPose = (pose: CafePose): pose is NewPose => Object.hasOwn(newPoses, pose);

export interface CafeMascot {
  src: string;
  mirrored: boolean;
  pose: CafePose;
  label: string;
}

/** The batch supplies right-facing bow/paw files. An explicit facing file takes precedence. */
export function cafeMascot(exam: string, pose: CafePose, files: ReadonlySet<string>, direction: CafeDirection = "east"): CafeMascot {
  const facesWest = direction === "west";
  if (pose === "study" || pose === "book") {
    return { src: (pose === "book" && idleArt(exam, "book")) || qualificationStudyArt(exam),
      mirrored: facesWest, pose, label: "勉強中" };
  }
  if (!isNewPose(pose)) {
    const src = idleArt(exam, pose);
    if (src) return { src, mirrored: facesWest, pose, label: IDLE_LABELS[pose] };
    return cafeMascot(exam, "book", files, direction);
  }

  const code = canonicalPresenceExam(exam) ?? exam;
  const character = roomCharacter(code);
  const label = newPoses[pose].label;
  const paired = pose === "bow" || pose === "paw";
  const opposite = direction === "east" ? "west" : "east";
  const variants: readonly (readonly [string, boolean])[] = paired
    ? [[`${pose}-${direction}`, false], [pose, facesWest], [`${pose}-${opposite}`, true]]
    : pose === "sleep" ? [[pose, facesWest], ["sleep-side", facesWest]]
    : pose === "rear-angle" ? [[pose, !facesWest], ["rear", facesWest]]
    : pose === "sleep-belly" ? [[pose, facesWest], ["sleep", facesWest], ["sleep-side", facesWest]]
    : [[pose, facesWest]];
  for (const outfit of new Set([code, character])) {
    for (const [variant, mirrored] of variants) {
      const filename = `${outfit}-${variant}.webp`;
      if (files.has(filename)) {
        const actualPose = variant === "sleep-side" ? "sleep" : variant === "sleep" || variant === "rear" ? variant : pose;
        return { src: `${CAFE_POSE_PATH}/${filename}`, mirrored, pose: actualPose, label: newPoses[actualPose].label };
      }
    }
  }
  return { src: `${CAFE_ART_PATH}/${newPoses[pose].file}.webp`, mirrored: pose === "paw" ? !facesWest : facesWest, pose, label };
}

interface Learner { exam: string; index: number; active: boolean }
export interface CafeOccupant extends Learner {
  key: string;
  mascot: CafeMascot;
  seat: CafeSeat;
}

export function cafeOccupants(learners: readonly Learner[], day: number, files: ReadonlySet<string>, current: boolean): CafeOccupant[] {
  const studying: number[] = [];
  const resting: number[] = [];
  learners.forEach((learner, index) => (current && learner.active ? studying : resting).push(index));

  const random = randomFor(~day);
  let deskTurn = Math.floor(random() * 2);
  const occupants: CafeOccupant[] = [];
  for (const seat of cafeSeats(day, learners.length)) {
    const hasDesk = seat.poses.includes("study");
    const index = (hasDesk ? studying.shift() ?? resting.shift() : resting.shift() ?? studying.shift())!;
    const learner = learners[index];
    const active = current && learner.active;
    const poses: readonly CafePose[] = hasDesk ? (active ? ["study", "book"] : ["book", "stretch"]) : seat.poses;
    const pose = poses[hasDesk ? deskTurn++ % poses.length : Math.floor(random() * poses.length)];
    const mascot = cafeMascot(learner.exam, pose, files, seat.direction);
    occupants[index] = { ...learner, active, key: `${learner.exam}:${learner.index}`, mascot, seat };
  }
  return occupants.filter(Boolean);
}
