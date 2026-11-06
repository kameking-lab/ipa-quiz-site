"use client";
import { useId } from "react";
import { examLabel } from "@/lib/utils";
import { petArtFor, petPathArtFor } from "@/lib/pet/v1/art";
import { PET_PATH_LABELS } from "@/lib/pet/v1/growth";
import { PET_ROOM_STORIES, petRoomGag } from "@/lib/pet/v1/room";
import type { PetProfileView } from "./usePetProfileView";
import styles from "./PetOwnStudySeat.module.css";

/** Private local seat. Never contributes a person to measured presence. */
export function PetOwnStudySeat({ view }: { view: PetProfileView }) {
  const title = useId();
  const qualification = view.document?.events.at(-1)?.qualificationId ?? view.document?.profiles[0]?.qualificationId;
  const profile = view.document?.profiles.find(item => item.qualificationId === qualification);
  const event = profile?.roomEvents.at(-1), story = event ? PET_ROOM_STORIES[event.scene] : null;
  return <section aria-labelledby={title} className={styles.seat} data-own-pet-id={profile?.petId ?? ""} data-room-scene={event?.scene ?? ""}>
    <h3 id={title}>あなたの席</h3>
    {view.status !== "ready" ? <p>{view.status === "loading" ? "自分の席を確認しています。" : "育成の保存を確認できませんでした。学習はそのまま続けられます。"}</p> : profile ? <div className={styles.body}>
      <div className={styles.art}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={petArtFor(profile.qualificationId, profile.selectedStage, "slack")} width={112} height={112} alt="" loading="lazy" decoding="async" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {profile.selectedPath ? <img src={petPathArtFor(profile.selectedPath)} width={28} height={28} alt="" className={styles.badge} loading="lazy" decoding="async" /> : null}
      </div>
      <div><h4>{examLabel(profile.qualificationId)}の{profile.name}</h4><p>{profile.selectedStage === "puppy" ? "こいぬ" : "学習の相棒"}{profile.selectedPath ? `・${PET_PATH_LABELS[profile.selectedPath]}` : ""}</p>
        <p>{petRoomGag(profile)}</p>{story ? <p className={styles.story}><strong>{story.title}</strong>：{story.text}</p> : null}
        <p className={styles.note}>この端末で育てた自分の子です。人数の集計には加えていません。</p></div>
    </div> : <p>最初の回答から、一緒に過ごす自分の子がここに座ります。</p>}
  </section>;
}
