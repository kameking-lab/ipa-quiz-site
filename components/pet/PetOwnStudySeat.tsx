"use client";
import { PET_ROOM_STORIES, petRoomGag } from "@/lib/pet/v1/room";
import { LearningPetCorner } from "./LearningPetCorner";
import type { PetProfileView } from "./usePetProfileView";
import styles from "./PetOwnStudySeat.module.css";

/** The learner's own pet at its desk in the study room: the same individual,
 * care sheet and rest gesture as after an answer. Local only; never counted
 * as a person in measured presence. */
export function PetOwnStudySeat({ view }: { view: PetProfileView }) {
  const qualification = view.document?.events.at(-1)?.qualificationId ?? view.document?.profiles[0]?.qualificationId;
  const profile = view.document?.profiles.find(item => item.qualificationId === qualification);
  const event = profile?.roomEvents.at(-1), story = event ? PET_ROOM_STORIES[event.scene] : null;
  const caption = view.status !== "ready" ? undefined : profile ? story ? `${story.title}：${story.text}` : petRoomGag(profile) : "1問解くと、ここに座ります。";
  return <section aria-label="あなたの席" className={styles.seat} data-own-pet-id={profile?.petId ?? ""} data-room-scene={event?.scene ?? ""}>
    <LearningPetCorner suppliedView={view} qualificationId={qualification} idlePose="slack" idleCaption={caption} />
  </section>;
}
