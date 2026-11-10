import type { PetProfile } from "./profile";
import { PET_PATH_LABELS } from "./growth";
import { PET_STAGE_LABELS } from "./presentation";
import { PET_ROOM_STORIES } from "./room";
import { petArtFor } from "./art";

export function petAlbumEntries(profile: PetProfile) {
  return [
    ...profile.roomEvents.map(event => ({ at: event.occurredAt, priority: 0, title: PET_ROOM_STORIES[event.scene].title,
      detail: "いっしょに学習した日", art: petArtFor(profile.qualificationId, "puppy", "study") })),
    ...profile.memories.map(memory => ({ at: memory.occurredAt, priority: memory.kind === "stage" ? 2 : 1,
      title: memory.kind === "stage" ? `${PET_STAGE_LABELS[memory.stage]}の姿を解放` : memory.kind === "path" ? `${PET_PATH_LABELS[memory.path]}の特技を覚えた` : "苦手な問題を克服",
      detail: memory.kind === "stage" && memory.stage === "partner" ? "5問をいっしょに解いた！" : memory.kind === "overcome" ? "日をあけて、自力で正解！" : "学習を重ねた記念",
      art: petArtFor(profile.qualificationId, memory.kind === "stage" ? memory.stage : profile.selectedStage, "correct") })),
  ].sort((a, b) => b.at - a.at || b.priority - a.priority);
}
