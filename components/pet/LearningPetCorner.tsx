"use client";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { examLabel } from "@/lib/utils";
import { LS_KEYS } from "@/lib/storage/keys";
import { petArtFor, petPathArtFor, type PetPose } from "@/lib/pet/v1/art";
import { PET_PATH_LABELS } from "@/lib/pet/v1/growth";
import { canonicalPetQualification } from "@/lib/pet/v1/qualification";
import { usePetProfileView, type PetCommittedDetail, type PetProfileView } from "./usePetProfileView";
import styles from "./LearningPetCorner.module.css";
const PetCareSheet = dynamic(() => import("./PetCareSheet"), { ssr: false });

export function LearningPetCorner({ qualificationId, questionId, suppliedView }: { qualificationId?: string; questionId?: string; suppliedView?: PetProfileView }) {
  const qualification = qualificationId === undefined ? undefined : canonicalPetQualification(qualificationId) ?? qualificationId;
  const [closed, setClosed] = useState(false), [paused, setPaused] = useState(false), [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(false), [pose, setPose] = useState<PetPose>("study"), [caption, setCaption] = useState("いっしょに、一問ずつ。");
  const [manual, setManual] = useState(false), [failed, setFailed] = useState<string | null>(null);
  const [detailsOwner, setDetailsOwner] = useState<string | null>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null), reopenButton = useRef<HTMLButtonElement>(null);
  const toggleFocusRequested = useRef(false);
  const panel = useRef<HTMLElement>(null), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const presentation = useRef({ closed, paused, visible });
  useEffect(() => { presentation.current = { closed, paused, visible }; }, [closed, paused, visible]);
  const stop = useCallback(() => { if (timer.current) clearTimeout(timer.current); timer.current = null; setPose("study"); setManual(false); }, []);
  const title = useId();
  const onFresh = useCallback((event: PetCommittedDetail) => {
    if (!questionId || event.questionId !== questionId || (qualification && event.qualificationId !== qualification) || event.result.outcome !== "applied") return;
    const result = event.result;
    setCaption(result.reaction === "read" ? "いっしょに答えを確認しました。" : result.reaction === "incorrect" ? "だいじょうぶ。解説をいっしょに読もう。" : result.comboMilestone ? `${result.comboMilestone}問、いっしょにつながりました。` : "一問ぶん、いっしょに前へ。");
    stop();
    if (presentation.current.closed || presentation.current.paused || !presentation.current.visible) return;
    setPose(result.reaction === "read" ? "revealed" : result.reaction ?? "study");
    timer.current = setTimeout(stop, 800);
  }, [questionId, qualification, stop]);
  const view = usePetProfileView(onFresh, suppliedView);
  useEffect(() => { if (view.status !== "ready") { stop(); setCaption("いっしょに、一問ずつ。"); } }, [view.status, stop]);
  const selectedQualification = qualification ?? view.document?.events.at(-1)?.qualificationId ?? view.document?.profiles[0]?.qualificationId;
  const profile = view.document?.profiles.find(item => item.qualificationId === selectedQualification);
  useEffect(() => { if (view.document && detailsOwner !== null && view.document.ownerScope !== detailsOwner) setDetailsOwner(null); }, [view.document, detailsOwner]);
  useEffect(() => { stop(); setCaption("いっしょに、一問ずつ。"); setFailed(null); }, [qualification, questionId, stop]);
  useEffect(() => {
    try { const preferences = JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences) ?? "null");
      setClosed(preferences?.closed === true); setPaused(preferences?.paused === true); } catch { /* visual preferences only */ }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)"), update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => {
    let inView = typeof IntersectionObserver === "undefined";
    const update = () => { const showing = inView && !document.hidden; setVisible(showing); if (!showing) stop(); };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (panel.current) observer?.observe(panel.current);
    document.addEventListener("visibilitychange", update); update();
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [closed, stop]);
  const preferences = (nextClosed: boolean, nextPaused: boolean) => {
    if (nextClosed !== closed) toggleFocusRequested.current = true;
    setClosed(nextClosed); setPaused(nextPaused); stop();
    try { localStorage.setItem(LS_KEYS.studyRewardPreferences, JSON.stringify({ closed: nextClosed, paused: nextPaused })); } catch { /* optional */ }
  };
  useLayoutEffect(() => {
    // These controls replace each other. Restore the user's keyboard position
    // after that commit, but never focus on saved-preference loads or refreshes.
    if (!toggleFocusRequested.current) return;
    toggleFocusRequested.current = false;
    (closed ? reopenButton.current : closeButton.current)?.focus({ preventScroll: true });
  }, [closed]);
  if (closed) return <button type="button" ref={reopenButton} className={styles.button} onClick={() => preferences(false, paused)}>チワワのひと休みを開く</button>;
  const src = petArtFor(selectedQualification ?? null, profile?.selectedStage ?? "puppy", pose);
  const image = failed === src ? petArtFor(selectedQualification ?? null, profile?.selectedStage ?? "puppy", "study") : src;
  const moving = visible && !paused && !reduced && pose !== "study";
  return <section ref={panel} className={styles.panel} aria-labelledby={title} data-pet-id={profile?.petId ?? ""} data-pet-pose={pose} data-moving={moving}>
    <header className={styles.header}><h3 id={title} className={styles.title}>{selectedQualification ? `${examLabel(selectedQualification)}の` : "あなたの"}{profile?.name ?? "チワワ"}</h3>
      <button type="button" ref={closeButton} className={styles.button} aria-label="チワワのひと休みを閉じる" onClick={() => preferences(true, paused)}>閉じる</button></header>
    <div className={styles.body}>
      {/* Local bounded WebP, with dimensions reserved before decoding. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <div className={styles.art}><img src={image} alt="" width={96} height={96} loading="lazy" decoding="async" className={`${styles.image} ${moving ? manual ? styles.rest : styles.gesture : ""}`} onError={() => setFailed(image)} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {profile?.selectedPath ? <img src={petPathArtFor(profile.selectedPath)} width={28} height={28} alt="" className={styles.badge} loading="lazy" decoding="async" /> : null}</div>
      <div><p className={styles.caption}>{caption}</p><p className={styles.small}>{view.status === "unavailable" ? "育成の保存を確認できませんでした。" : profile ? `この端末で育成中${profile.selectedPath ? `・${PET_PATH_LABELS[profile.selectedPath]}` : ""}` : "あなたのペースで学ぼう。"}</p></div>
    </div>
    <div className={styles.actions}><button type="button" className={styles.button} onClick={() => { stop(); setManual(true); setPose("rest"); setCaption("のんびり、ひと休み。"); timer.current = setTimeout(stop, 6000); }}>ひと休み</button>
      <button type="button" ref={detailsButton} className={styles.button} disabled={view.status !== "ready"} onClick={() => { stop(); setDetailsOwner(view.document!.ownerScope); }}>育成を見る</button>
      <button type="button" className={styles.button} aria-pressed={paused} onClick={() => preferences(false, !paused)}>{paused ? "動きを許可" : "動きを止める"}</button></div>
    <p className={styles.small}>{reduced ? "静止画で表示中。" : "無音。ひと休みは6秒まで。"} 閉じても学習は育成に反映されます。</p>
    {detailsOwner !== null ? <PetCareSheet document={view.document?.ownerScope === detailsOwner ? view.document : null} qualificationId={selectedQualification} returnFocus={() => detailsButton.current?.focus()} onClose={() => { setDetailsOwner(null); stop(); }} onPose={(nextPose, text) => { stop(); setManual(true); setPose(nextPose); setCaption(text); timer.current = setTimeout(stop, 6000); }} /> : null}
  </section>;
}
