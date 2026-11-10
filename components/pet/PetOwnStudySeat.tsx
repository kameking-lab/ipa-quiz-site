"use client";
import { useEffect, useState } from "react";
import { petStudyCaption } from "@/lib/pet/v1/presentation";
import { petLearningDay } from "@/lib/pet/v1/learning";
import { LearningPetCorner } from "./LearningPetCorner";
import type { PetProfileView } from "./usePetProfileView";
import styles from "./PetOwnStudySeat.module.css";

/** The learner's own pet at its desk in the study room: the same individual,
 * care sheet and rest gesture as after an answer. Local only; never counted
 * as a person in measured presence. */
export function PetOwnStudySeat({ view }: { view: PetProfileView }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const update = () => { if (!document.hidden) setNow(Date.now()); };
    window.addEventListener("focus", update); document.addEventListener("visibilitychange", update);
    return () => { window.removeEventListener("focus", update); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => { setNow(Date.now()); }, [view.document]);
  const qualification = view.document?.events.at(-1)?.qualificationId ?? view.document?.profiles[0]?.qualificationId;
  const profile = view.document?.profiles.find(item => item.qualificationId === qualification);
  const event = profile?.roomEvents.at(-1);
  const lastAnswer = view.document?.events.findLast(item => item.qualificationId === qualification);
  const recent = lastAnswer && lastAnswer.occurredAt <= now && petLearningDay(lastAnswer.occurredAt, view.document!.timeZone) === petLearningDay(now, view.document!.timeZone);
  const reaction = recent ? lastAnswer.grade === "correct" ? "正解、うれしいね。次もいっしょに。" : lastAnswer.grade === "incorrect" ? "だいじょうぶ。次もいっしょに。" : "いっしょに答えを確認。" : null;
  const caption = view.status !== "ready" ? undefined : profile ? reaction ?? petStudyCaption(profile, view.document!.timeZone, now) : "いっしょに、最初の1問。";
  return <section aria-label="あなたの席" className={styles.seat} data-own-pet-id={profile?.petId ?? ""} data-room-scene={event?.scene ?? ""}>
    <LearningPetCorner suppliedView={view} qualificationId={qualification} idlePose="study" idleCaption={caption} roomSeat />
  </section>;
}
