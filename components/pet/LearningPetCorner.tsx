"use client";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { examLabel } from "@/lib/utils";
import { LS_KEYS } from "@/lib/storage/keys";
import { petArtFor, petPathArtFor, type PetPose } from "@/lib/pet/v1/art";
import { PET_STAGE_LABELS, petFreshPresentation, petPartnerRemaining } from "@/lib/pet/v1/presentation";
import { canonicalPetQualification } from "@/lib/pet/v1/qualification";
import { usePetProfileView, type PetCommittedDetail, type PetProfileView } from "./usePetProfileView";
import { PetNameTitle } from "./PetNameTitle";
import styles from "./LearningPetCorner.module.css";
const PetCareSheet = dynamic(() => import("./PetCareSheet"), { ssr: false });

const IDLE_CAPTION = "いっしょに、一問ずつ。";
export { PET_STAGE_LABELS } from "@/lib/pet/v1/presentation";
interface Pop { key: string; growth: number; bond: number; pose: PetPose; unlock: string | null }

export function LearningPetCorner({ qualificationId, questionId, suppliedView, idlePose = "study", idleCaption }: {
  qualificationId?: string; questionId?: string; suppliedView?: PetProfileView;
  /** Qualification-specific study pose/caption for the learner's room seat. */
  idlePose?: PetPose; idleCaption?: string;
}) {
  const qualification = qualificationId === undefined ? undefined : canonicalPetQualification(qualificationId) ?? qualificationId;
  const [closed, setClosed] = useState(false), [paused, setPaused] = useState(false), [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false), [pageVisible, setPageVisible] = useState(false);
  const [pose, setPose] = useState<PetPose>("study"), [caption, setCaption] = useState<string | null>(null);
  const [manual, setManual] = useState(false), [failed, setFailed] = useState<string | null>(null);
  const [pop, setPop] = useState<Pop | null>(null);
  const [unlockStage, setUnlockStage] = useState<"partner" | "expert" | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const [openAppearance, setOpenAppearance] = useState(false);
  const [detailsOwner, setDetailsOwner] = useState<string | null>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null), reopenButton = useRef<HTMLButtonElement>(null);
  const toggleFocusRequested = useRef(false);
  const panel = useRef<HTMLElement>(null), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visible = inView && pageVisible;
  const presentation = useRef({ closed, paused, visible, pageVisible });
  useEffect(() => { presentation.current = { closed, paused, visible, pageVisible }; }, [closed, paused, visible, pageVisible]);
  const stop = useCallback(() => { if (timer.current) clearTimeout(timer.current); timer.current = null; setPose("study"); setManual(false); }, []);
  const title = useId();
  const onFresh = useCallback((event: PetCommittedDetail) => {
    if (!questionId || event.questionId !== questionId || (qualification && event.qualificationId !== qualification) || event.result.outcome !== "applied") return;
    const result = event.result;
    if (presentation.current.closed) return;
    const fresh = petFreshPresentation(result, event.qualificationId, event.occurredAt);
    setCaption(fresh.caption); setUnlockStage(fresh.stage); setAnnouncement(fresh.stage ? fresh.caption : "");
    stop();
    if (popTimer.current) clearTimeout(popTimer.current);
    if (presentation.current.pageVisible && (fresh.stage || result.reward.growth > 0 || result.reward.bond > 0)) {
      setPop({ key: event.eventId, growth: result.reward.growth, bond: result.reward.bond, pose: result.reaction === "read" ? "revealed" : result.reaction ?? "study", unlock: fresh.stage ? fresh.caption : null });
      popTimer.current = setTimeout(() => setPop(null), 1600);
    } else setPop(null);
    if (presentation.current.closed || presentation.current.paused || !presentation.current.visible) return;
    setPose(result.reaction === "read" ? "revealed" : result.reaction ?? "study");
    timer.current = setTimeout(stop, 800);
  }, [questionId, qualification, stop]);
  const view = usePetProfileView(onFresh, suppliedView);
  useEffect(() => { if (view.status !== "ready") { stop(); setCaption(null); setUnlockStage(null); setPop(null); setAnnouncement(""); } }, [view.status, stop]);
  const selectedQualification = qualification ?? view.document?.events.at(-1)?.qualificationId ?? view.document?.profiles[0]?.qualificationId;
  const profile = view.document?.profiles.find(item => item.qualificationId === selectedQualification);
  useEffect(() => { if (view.document && detailsOwner !== null && view.document.ownerScope !== detailsOwner) setDetailsOwner(null); }, [view.document, detailsOwner]);
  useEffect(() => { stop(); setCaption(null); setFailed(null); setPop(null); setUnlockStage(null); setAnnouncement(""); }, [selectedQualification, questionId, view.document?.ownerScope, stop]);
  useEffect(() => {
    const ownerChanged = () => { setDetailsOwner(null); setUnlockStage(null); setCaption(null); setPop(null); setAnnouncement(""); stop(); };
    window.addEventListener("pet-v1:owner-changed", ownerChanged);
    return () => window.removeEventListener("pet-v1:owner-changed", ownerChanged);
  }, [stop]);
  useEffect(() => {
    try { const preferences = JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences) ?? "null");
      setClosed(preferences?.closed === true); setPaused(preferences?.paused === true); } catch { /* visual preferences only */ }
    const query = window.matchMedia("(prefers-reduced-motion: reduce)"), update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); if (timer.current) clearTimeout(timer.current); if (popTimer.current) clearTimeout(popTimer.current); };
  }, []);
  useEffect(() => {
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (!observer) setInView(true);
    if (panel.current) observer?.observe(panel.current);
    const page = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", page); page();
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", page); };
  }, [closed]);
  useEffect(() => { if (!visible) stop(); }, [visible, stop]);
  useEffect(() => { if (!pageVisible) setPop(null); }, [pageVisible]);
  useEffect(() => { if (inView) setPop(current => current?.unlock ? null : current); }, [inView]);
  const preferences = (nextClosed: boolean, nextPaused: boolean) => {
    if (nextClosed !== closed) toggleFocusRequested.current = true;
    setClosed(nextClosed); setPaused(nextPaused); stop(); if (nextClosed) { setPop(null); setUnlockStage(null); setCaption(null); setAnnouncement(""); }
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
  const stage = profile?.selectedStage ?? "puppy";
  const shownPose = pose === "study" ? idlePose : pose;
  const src = petArtFor(selectedQualification ?? null, stage, shownPose);
  const image = failed === src ? petArtFor(selectedQualification ?? null, stage, "study") : src;
  const moving = visible && !paused && !reduced && pose !== "study";
  const remaining = profile ? petPartnerRemaining(profile) : null;
  const popText = pop ? `${pop.growth > 0 ? `+${pop.growth}` : ""}${pop.bond > 0 ? ` ♥+${pop.bond}` : ""}`.trim() : "";
  return <section ref={panel} className={styles.panel} aria-labelledby={title} data-pet-id={profile?.petId ?? ""} data-pet-pose={pose} data-moving={moving}>
    <header className={styles.header}>
      {selectedQualification ? <PetNameTitle id={title} qualificationLabel={examLabel(selectedQualification)} name={profile?.name}
        document={view.status === "ready" && profile ? view.document ?? null : null} qualificationId={profile?.qualificationId} />
        : <h3 id={title} className={styles.title}>あなたの{profile?.name ?? "チワワ"}</h3>}
      {profile ? <span className={styles.stage}>{PET_STAGE_LABELS[stage]}</span> : null}
      <button type="button" ref={closeButton} className={styles.button} aria-label="チワワのひと休みを閉じる" onClick={() => preferences(true, paused)}>閉じる</button>
    </header>
    <div className={styles.body}>
      <div className={styles.art}>
        {/* Local bounded WebP, with dimensions reserved before decoding. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" width={96} height={96} loading="lazy" decoding="async" className={`${styles.image} ${moving ? manual ? styles.rest : styles.gesture : ""}`} onError={() => setFailed(image)} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {profile?.selectedPath ? <img src={petPathArtFor(profile.selectedPath)} width={28} height={28} alt="" className={styles.badge} loading="lazy" decoding="async" /> : null}
        {pop && !pop.unlock && popText ? <span key={pop.key} className={`${styles.pop} ${paused || reduced ? "" : styles.popMove}`} aria-hidden="true">{popText}</span> : null}
      </div>
      <div className={styles.copy}>
        <p className={styles.caption}>{caption ?? idleCaption ?? IDLE_CAPTION}</p>
        {view.status === "unavailable" ? <p className={styles.small}>育成の保存を確認できませんでした。</p> : profile ? <>
          {remaining !== null ? <label className={styles.meter}><span>相棒まで あと{remaining}問</span>
            <meter className={styles.progress} min={0} max={5} value={5 - remaining} /></label> : null}
        </> : null}
      </div>
    </div>
    <div className={styles.actions}><button type="button" className={styles.button} onClick={() => { stop(); setManual(true); setPose("rest"); setCaption("のんびり、ひと休み。"); timer.current = setTimeout(stop, 6000); }}>ひと休み</button>
      <button type="button" ref={detailsButton} className={`${styles.button} ${styles.primary}`} disabled={view.status !== "ready"} onClick={() => { stop(); setOpenAppearance(unlockStage !== null); setUnlockStage(null); setPop(null); setCaption(null); setDetailsOwner(view.document!.ownerScope); }}>{unlockStage ? `${PET_STAGE_LABELS[unlockStage]}の姿を見る` : <>育成を見る{profile && profile.unlockedStages.length > 1 ? <span className={styles.looks}>姿{profile.unlockedStages.length}種類</span> : null}</>}</button>
      <button type="button" className={styles.button} aria-pressed={paused} onClick={() => preferences(false, !paused)}>{paused ? "動きを許可" : "動きを止める"}</button></div>
    {/* Answer feedback that reaches the learner even when this panel is scrolled away. */}
    <span className={styles.srOnly} aria-live="polite" aria-atomic="true">{announcement}</span>
    {pop && (popText || pop.unlock) && questionId && !inView && pageVisible ? <div key={`toast-${pop.key}`} className={`${styles.toast} ${paused || reduced ? "" : styles.toastMove}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={petArtFor(selectedQualification ?? null, stage, pop.pose)} alt="" width={40} height={40} decoding="async" />
      <span>{pop.unlock ?? popText}</span>
    </div> : null}
    {detailsOwner !== null ? <PetCareSheet key={`${detailsOwner}:${selectedQualification}`} document={view.document?.ownerScope === detailsOwner ? view.document : null} qualificationId={selectedQualification} initialAppearanceOpen={openAppearance} allowMotion={!paused && !reduced && pageVisible} returnFocus={() => detailsButton.current?.focus()} onClose={() => { setDetailsOwner(null); stop(); }} onPose={(nextPose, text) => { stop(); setManual(true); setPose(nextPose); setCaption(text); timer.current = setTimeout(stop, 6000); }} /> : null}
  </section>;
}
