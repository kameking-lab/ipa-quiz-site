"use client";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { examLabel } from "@/lib/utils";
import { LS_KEYS } from "@/lib/storage/keys";
import { petArtFor, petPathArtFor, type PetPose } from "@/lib/pet/v1/art";
import { PET_PATH_LABELS, petGrowthProgress } from "@/lib/pet/v1/growth";
import { canonicalPetQualification } from "@/lib/pet/v1/qualification";
import { usePetProfileView, type PetCommittedDetail, type PetProfileView } from "./usePetProfileView";
import styles from "./LearningPetCorner.module.css";
const PetCareSheet = dynamic(() => import("./PetCareSheet"), { ssr: false });

const PARTNER_GOAL = 5;
const IDLE_CAPTION = "いっしょに、一問ずつ。";
export const PET_STAGE_LABELS = { puppy: "こいぬ", partner: "相棒", expert: "専門家" } as const;
interface Pop { key: string; growth: number; bond: number; pose: PetPose }

export function LearningPetCorner({ qualificationId, questionId, suppliedView, idlePose = "study", idleCaption }: {
  qualificationId?: string; questionId?: string; suppliedView?: PetProfileView;
  /** Resting pose/caption, e.g. the study-room seat uses "slack" and a desk story. */
  idlePose?: PetPose; idleCaption?: string;
}) {
  const qualification = qualificationId === undefined ? undefined : canonicalPetQualification(qualificationId) ?? qualificationId;
  const [closed, setClosed] = useState(false), [paused, setPaused] = useState(false), [reduced, setReduced] = useState(true);
  const [inView, setInView] = useState(false), [pageVisible, setPageVisible] = useState(false);
  const [pose, setPose] = useState<PetPose>("study"), [caption, setCaption] = useState<string | null>(null);
  const [manual, setManual] = useState(false), [failed, setFailed] = useState<string | null>(null);
  const [pop, setPop] = useState<Pop | null>(null);
  const [detailsOwner, setDetailsOwner] = useState<string | null>(null);
  const detailsButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null), reopenButton = useRef<HTMLButtonElement>(null);
  const toggleFocusRequested = useRef(false);
  const panel = useRef<HTMLElement>(null), timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visible = inView && pageVisible;
  const presentation = useRef({ closed, paused, visible });
  useEffect(() => { presentation.current = { closed, paused, visible }; }, [closed, paused, visible]);
  const stop = useCallback(() => { if (timer.current) clearTimeout(timer.current); timer.current = null; setPose("study"); setManual(false); }, []);
  const title = useId();
  const onFresh = useCallback((event: PetCommittedDetail) => {
    if (!questionId || event.questionId !== questionId || (qualification && event.qualificationId !== qualification) || event.result.outcome !== "applied") return;
    const result = event.result;
    const unlocked = result.document.profiles.find(item => item.qualificationId === event.qualificationId)?.memories
      .filter(memory => memory.occurredAt === event.occurredAt && memory.kind !== "overcome").at(-1);
    setCaption(unlocked?.kind === "stage" ? "相棒の姿になれるよ！" : unlocked?.kind === "path" ? `${PET_PATH_LABELS[unlocked.path]}の特技を覚えた！` :
      result.overcame ? "前に迷った問題を、克服！" : result.reaction === "read" ? "いっしょに答えを確認。" : result.reaction === "incorrect" ? "だいじょうぶ。解説を読もう。" : result.comboMilestone ? `${result.comboMilestone}問つながった！` : "やった、正解！");
    stop();
    if (popTimer.current) clearTimeout(popTimer.current);
    if (!presentation.current.closed && (result.reward.growth > 0 || result.reward.bond > 0)) {
      setPop({ key: event.eventId, growth: result.reward.growth, bond: result.reward.bond, pose: result.reaction === "read" ? "revealed" : result.reaction ?? "study" });
      popTimer.current = setTimeout(() => setPop(null), 1600);
    } else setPop(null);
    if (presentation.current.closed || presentation.current.paused || !presentation.current.visible) return;
    setPose(result.reaction === "read" ? "revealed" : result.reaction ?? "study");
    timer.current = setTimeout(stop, 800);
  }, [questionId, qualification, stop]);
  const view = usePetProfileView(onFresh, suppliedView);
  useEffect(() => { if (view.status !== "ready") { stop(); setCaption(null); } }, [view.status, stop]);
  const selectedQualification = qualification ?? view.document?.events.at(-1)?.qualificationId ?? view.document?.profiles[0]?.qualificationId;
  const profile = view.document?.profiles.find(item => item.qualificationId === selectedQualification);
  useEffect(() => { if (view.document && detailsOwner !== null && view.document.ownerScope !== detailsOwner) setDetailsOwner(null); }, [view.document, detailsOwner]);
  useEffect(() => { stop(); setCaption(null); setFailed(null); setPop(null); }, [qualification, questionId, stop]);
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
  const preferences = (nextClosed: boolean, nextPaused: boolean) => {
    if (nextClosed !== closed) toggleFocusRequested.current = true;
    setClosed(nextClosed); setPaused(nextPaused); stop(); if (nextClosed) setPop(null);
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
  const progress = profile ? petGrowthProgress(profile) : null;
  const partnerUnlocked = profile?.unlockedStages.includes("partner") ?? false;
  // A freshly unlocked look the learner has not tried on yet (evolution stays a choice).
  const evolvable = partnerUnlocked && stage === "puppy" && (profile?.memories.some(memory => memory.kind === "stage" && Date.now() - memory.occurredAt < 3 * 86_400_000) ?? false);
  const toward = progress ?Math.min(progress.uniqueQuestions, PARTNER_GOAL) : 0;
  const popText = pop ? `${pop.growth > 0 ? `+${pop.growth}` : ""}${pop.bond > 0 ? ` ♥+${pop.bond}` : ""}`.trim() : "";
  return <section ref={panel} className={styles.panel} aria-labelledby={title} data-pet-id={profile?.petId ?? ""} data-pet-pose={pose} data-moving={moving}>
    <header className={styles.header}>
      <h3 id={title} className={styles.title}>{selectedQualification ? `${examLabel(selectedQualification)}の` : "あなたの"}{profile?.name ?? "チワワ"}</h3>
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
        {pop && popText ? <span key={pop.key} className={`${styles.pop} ${reduced ? "" : styles.popMove}`} aria-hidden="true">{popText}</span> : null}
      </div>
      <div className={styles.copy}>
        <p className={styles.caption}>{caption ?? idleCaption ?? IDLE_CAPTION}</p>
        {view.status === "unavailable" ? <p className={styles.small}>育成の保存を確認できませんでした。</p> : profile && progress ? <>
          {partnerUnlocked ? null : <label className={styles.meter}><span>相棒まで {toward}/{PARTNER_GOAL}</span>
            <progress className={styles.progress} max={PARTNER_GOAL} value={toward} /></label>}
          <p className={styles.stats}><span>成長 {profile.growth}</span><span aria-label={`なつき ${profile.bond}`}>♥ {profile.bond}</span>
            {profile.selectedPath ? <span>{PET_PATH_LABELS[profile.selectedPath]}</span> : null}</p>
        </> : null}
      </div>
    </div>
    <div className={styles.actions}><button type="button" className={styles.button} onClick={() => { stop(); setManual(true); setPose("rest"); setCaption("のんびり、ひと休み。"); timer.current = setTimeout(stop, 6000); }}>ひと休み</button>
      <button type="button" ref={detailsButton} className={`${styles.button} ${styles.primary}`} disabled={view.status !== "ready"} onClick={() => { stop(); setDetailsOwner(view.document!.ownerScope); }}>育成を見る{evolvable ? <span className={styles.new} aria-hidden="true">NEW</span> : null}</button>
      <button type="button" className={styles.button} aria-pressed={paused} onClick={() => preferences(false, !paused)}>{paused ? "動きを許可" : "動きを止める"}</button></div>
    {/* Answer feedback that reaches the learner even when this panel is scrolled away. */}
    {pop && popText && questionId && !inView ? <div key={`toast-${pop.key}`} className={`${styles.toast} ${reduced ? "" : styles.toastMove}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={petArtFor(selectedQualification ?? null, stage, pop.pose)} alt="" width={40} height={40} decoding="async" />
      <span>{popText}</span>
    </div> : null}
    {detailsOwner !== null ? <PetCareSheet document={view.document?.ownerScope === detailsOwner ? view.document : null} qualificationId={selectedQualification} returnFocus={() => detailsButton.current?.focus()} onClose={() => { setDetailsOwner(null); stop(); }} onPose={(nextPose, text) => { stop(); setManual(true); setPose(nextPose); setCaption(text); timer.current = setTimeout(stop, 6000); }} /> : null}
  </section>;
}
