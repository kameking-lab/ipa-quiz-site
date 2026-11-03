import type { LearningPetEvent } from "./learning-store";
import type { StudyPetArtPose } from "@/components/pet/StudyPetArtwork";

export interface PetReactionFrame { at: number; pose: StudyPetArtPose; movement: "still" | "near" | "lean" | "lift" }
export interface PetReactionScript { name: string; message: string; duration: number; frames: readonly PetReactionFrame[] }
const frame = (at: number, pose: StudyPetArtPose, movement: PetReactionFrame["movement"] = "still"): PetReactionFrame => ({ at, pose, movement });

/** Finite, deliberate gestures. Restored records never select or start a script. */
export function petReactionScript(event: LearningPetEvent): PetReactionScript | null {
  if (event.kind === "visit") return null;
  if (event.kind === "feed") {
    if (event.feedReaction === "eager") return { name: "eager", message: "待ってたよ。ぱくっ、もぐもぐ。", duration: 3400,
      frames: [frame(0, "feed-ready", "near"), frame(450, "feed"), frame(1000, "feed-chew"), frame(1500, "feed"), frame(2100, "feed-chew"), frame(2700, "feed-done", "lift")] };
    if (event.feedReaction === "delighted") return { name: "delighted", message: "食べ終わって、うれしそうにこちらへ。", duration: 4000,
      frames: [frame(0, "feed-ready"), frame(700, "feed"), frame(1500, "feed-chew"), frame(2300, "feed-done"), frame(3000, "celebrate", "near")] };
    return { name: "content", message: "ゆっくり味わって、ほっとひと息。", duration: 3400,
      frames: [frame(0, "feed-ready"), frame(650, "feed"), frame(1400, "feed-chew"), frame(2300, "feed-done")] };
  }
  if (event.kind === "care") {
    if (event.careGesture === "nuzzle") return { name: "nuzzle", message: "そばに来て、ちょこん。一緒にひと休み。", duration: 3000,
      frames: [frame(0, "guide"), frame(550, "guide", "near"), frame(1300, "guide", "lean"), frame(2300, "guide", "near")] };
    if (event.careGesture === "cheer") return { name: "cheer", message: "学習の相棒からエール。次の一問もいっしょに。", duration: 2800,
      frames: [frame(0, "study"), frame(800, "celebrate", "lift"), frame(1700, "study"), frame(2300, "guide")] };
    return { name: "pet", message: "なでてもらって、少し首をかしげました。", duration: 2300,
      frames: [frame(0, "guide"), frame(500, "guide", "lean"), frame(1400, "guide")] };
  }
  return event.kind === "dress"
    ? { name: "dress", message: "今日の着替えを、この端末に保存しました。", duration: 1900, frames: [frame(0, "dress"), frame(650, "guide", "lean"), frame(1400, "guide")] }
    : { name: "answer", message: "一問ぶん、いっしょに前へ。", duration: 2000, frames: [frame(0, "celebrate", "lift"), frame(1300, "guide")] };
}
