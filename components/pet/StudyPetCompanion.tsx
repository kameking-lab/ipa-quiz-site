"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import type { StudyReward } from "@/lib/study-reward";
import { getBrowserLearningPet } from "@/lib/pet/client/learning-bridge";
import { EMPTY_LEARNING_VIEW, learningPetSummary, type LearningPetEvent, type LearningPetStore } from "@/lib/pet/client/learning-store";
import { learningPetExperience, wardrobeUnlocked, careUnlocked, WARDROBE_ANSWERS, CARE_ANSWERS, type PetWardrobe, type PetCareGesture } from "@/lib/pet/client/experience";
import { petReactionScript, type PetReactionScript } from "@/lib/pet/client/reaction-scripts";
import { StudyPetArtwork, type StudyPetAtlas } from "./StudyPetArtwork";
import { loadStudyPetArt } from "./loadStudyPetArt";

const idleSubscribe = () => () => {};
const emptyView = () => EMPTY_LEARNING_VIEW;
const stageNames = { little: "出会い", friend: "なかよし", companion: "学習の相棒" };
const clothes: readonly [PetWardrobe, string][] = [["none", "いつもの姿"], ["bandana", "バンダナ"], ["bow", "蝶ネクタイ"], ["scarf", "マフラー"]];
const gestures: readonly [PetCareGesture, string][] = [["pet", "なでる"], ["nuzzle", "そばにおいで"], ["cheer", "応援して"]];

/** Actual device-guest pet. Login identity is deliberately never read or implied. */
export function StudyPetCompanion({ reward, showIdle = false, controller, atlas }: {
  reward: StudyReward | null; showIdle?: boolean; controller?: LearningPetStore; atlas?: StudyPetAtlas;
}) {
  const [store, setStore] = useState<LearningPetStore | null>(controller ?? null);
  const view = useSyncExternalStore(store?.subscribe ?? idleSubscribe, store?.getView ?? emptyView, emptyView);
  const [closed, setClosed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [visible, setVisible] = useState(true);
  const [reaction, setReaction] = useState<LearningPetEvent["kind"] | null>(null);
  const [script, setScript] = useState<PetReactionScript | null>(null);
  const [phase, setPhase] = useState(0);
  const [busy, setBusy] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const [readyAtlas, setReadyAtlas] = useState<string | null>(null);
  const artLoad = useRef<{ src: string; result: Promise<boolean> } | null>(null);
  const mounted = useRef(false);
  const motionEpoch = useRef(0);
  const panel = useRef<HTMLElement>(null);
  const eligibility = useRef(false);
  const visibility = useRef<boolean | null>(null);
  const currentScene = useRef({ reward, showIdle });
  const pendingFresh = useRef<LearningPetEvent | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const delivery = useRef<ReturnType<typeof setTimeout> | null>(null);
  const title = useId();
  const hasContent = Boolean(reward || showIdle);
  const careOpen = showIdle || Boolean(reward && expandedQuestion === reward.id);
  function stop() {
    motionEpoch.current++;
    timers.current.forEach(clearTimeout); timers.current = [];
    setReaction(null); setPhase(0);
  }
  function loadArt() {
    if (!atlas) return Promise.resolve(false);
    const src = atlas.src;
    if (artLoad.current?.src !== src) artLoad.current = { src, result: loadStudyPetArt(src).then(ready => {
      if (ready && mounted.current && artLoad.current?.src === src) setReadyAtlas(src);
      return ready;
    }) };
    return artLoad.current.result;
  }
  async function play(next: LearningPetEvent) {
    stop();
    const epoch = motionEpoch.current;
    const sequence = petReactionScript(next);
    if (!sequence) return;
    if (!eligibility.current || !visibility.current || document.hidden) return;
    const current = store?.getView().document;
    if (atlas && (next.kind === "feed" || (current && learningPetExperience(current).wardrobe === "bandana"))) await loadArt();
    if (!mounted.current || epoch !== motionEpoch.current || !eligibility.current || !visibility.current || document.hidden) return;
    setScript(sequence); setReaction(next.kind);
    sequence.frames.slice(1).forEach((frame, index) => timers.current.push(setTimeout(() => setPhase(index + 1), frame.at)));
    timers.current.push(setTimeout(stop, sequence.duration));
  }
  function cancelFresh() {
    if (delivery.current !== null) clearTimeout(delivery.current);
    delivery.current = null; pendingFresh.current = null;
  }
  function deliverFresh(event: LearningPetEvent) {
    const scene = currentScene.current;
    const context = scene.reward?.id ?? "home";
    const matching = event.kind === "answer" ? scene.showIdle || Boolean(scene.reward &&
      event.questionId === scene.reward.questionId && event.scope === scene.reward.scope) :
      event.context === undefined ? scene.showIdle : event.context === context;
    if (!matching) { pendingFresh.current = null; return; }
    const sequence = petReactionScript(event);
    if (sequence) setNotice(sequence.message);
    if (!eligibility.current || document.hidden) { pendingFresh.current = null; return; }
    // The first IntersectionObserver callback is asynchronous. Unknown is not
    // offscreen: retain this fresh event only until visibility is first known.
    if (visibility.current === null) { pendingFresh.current = event; return; }
    pendingFresh.current = null;
    if (visibility.current) void play(event);
  }
  // Latest eligibility is used by async storage completion, including hidden UI.
  useEffect(() => { eligibility.current = hasContent && careOpen && !closed && !paused && !reduced; }, [hasContent, careOpen, closed, paused, reduced]);
  useEffect(() => { currentScene.current = { reward, showIdle }; }, [reward, showIdle]);
  useEffect(() => { setStore(controller ?? getBrowserLearningPet()); }, [controller]);
  useEffect(() => {
    const epoch = motionEpoch;
    mounted.current = true;
    return () => { mounted.current = false; epoch.current++; };
  }, []);
  useEffect(() => {
    // Restored clothing loads as a still frame; loading never replays a reward.
    if (view.document && learningPetExperience(view.document).wardrobe === "bandana") void loadArt();
    // loadArt keys the promise by src and reads the current atlas.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.document?.outfit, view.document?.experience?.wardrobe, atlas?.src]);
  useEffect(() => {
    try {
      const pref = JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences) ?? "null");
      setClosed(pref?.closed === true); setPaused(pref?.paused === true);
    } catch { /* Optional display preference. Pet records use the strict store. */ }
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => { setReduced(media?.matches ?? true); stop(); cancelFresh(); };
    update(); media?.addEventListener("change", update);
    return () => { media?.removeEventListener("change", update); timers.current.forEach(clearTimeout); cancelFresh(); };
  }, []);
  useEffect(() => {
    if (!store) return;
    void store.load();
    const unsubscribe = store.subscribeReactions(next => {
      // Answer reveal may commit after a very fast durable write. Deliver only
      // this fresh notification after that render; a restored snapshot never
      // schedules it. Visibility/preferences are checked again at delivery.
      if (delivery.current !== null) clearTimeout(delivery.current);
      delivery.current = setTimeout(() => { delivery.current = null; deliverFresh(next); }, 0);
    });
    const refresh = (event: StorageEvent) => { if (event.key === LS_KEYS.petLearning || event.key === null) void store.load(); };
    window.addEventListener("storage", refresh);
    return () => { unsubscribe(); cancelFresh(); window.removeEventListener("storage", refresh); };
    // play reads current eligibility refs; it is not a snapshot replay effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
  useEffect(() => {
    let inView: boolean | null = typeof IntersectionObserver === "undefined" ? true : null;
    const update = () => {
      visibility.current = document.hidden ? false : inView; setVisible(visibility.current === true);
      if (visibility.current === false) { stop(); cancelFresh(); }
      else if (visibility.current === true && pendingFresh.current) deliverFresh(pendingFresh.current);
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (panel.current) observer?.observe(panel.current);
    document.addEventListener("visibilitychange", update); update();
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", update); };
    // Callback reads current scene and eligibility refs, not restored snapshots.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closed, hasContent]);
  useEffect(() => { stop(); }, [reward?.id, careOpen, closed, paused, reduced]);
  useEffect(() => { if (!hasContent) cancelFresh(); }, [hasContent]);
  const preference = (nextClosed: boolean, nextPaused: boolean) => {
    stop(); cancelFresh(); setClosed(nextClosed); setPaused(nextPaused);
    try { localStorage.setItem(LS_KEYS.studyRewardPreferences, JSON.stringify({ closed: nextClosed, paused: nextPaused })); } catch { /* optional */ }
  };
  const run = async (operation: () => Promise<unknown>) => {
    if (busy) return;
    setBusy(true); setNotice("");
    try { await operation(); } finally { setBusy(false); }
  };
  const exportRecord = () => {
    try {
      const raw = store?.exportRaw(); if (!raw) throw new Error("no_record");
      const url = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
      const link = document.createElement("a"); link.href = url; link.download = "study-pet-device-recovery.json"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000); setNotice("端末の記録を書き出しました。個人用に保管してください。");
    } catch { setNotice("記録を書き出せませんでした。現在の記録は消さずに再確認してください。"); }
  };
  if (!hasContent) return null;
  if (closed) return <div className="reward-reopen"><button type="button" onClick={() => preference(false, paused)}>チワワのひと休みを開く</button></div>;
  const doc = view.document;
  const summary = doc ? learningPetSummary(doc) : null;
  const experience = doc ? learningPetExperience(doc) : null;
  const moving = reaction !== null && !paused && !reduced && visible;
  const frame = moving ? script?.frames[phase] : null;
  const available = Boolean(store && doc && view.status === "ready" && !busy);
  const answers = doc?.answers.length ?? 0;
  // Keep the answer and explanation close together. Care is an explicit break,
  // scoped to this question, while the home room keeps its full presentation.
  if (!careOpen) return <section ref={panel} className="study-reward study-pet study-pet-compact" data-moving="false" data-reaction="idle" data-stage={summary?.stage ?? "little"} aria-labelledby={title}>
    <div><h3 id={title}>チワワと、ひと休み。</h3><p>{summary ? `${stageNames[summary.stage]} ・ ${answers}問 ・ ごはん ${doc!.food}個` : "端末の育成記録を確認中"}</p><p className="study-pet-compact-save">育成記録はこのブラウザー内に保存します。</p></div>
    <button type="button" aria-expanded="false" onClick={() => setExpandedQuestion(reward?.id ?? null)}>お世話する</button>
    {view.status === "storage_error" && <p role="alert">育成記録の保存を確認できません。学習は続けられます。「お世話する」から保存を再確認できます。</p>}
  </section>;
  return <section ref={panel} className="study-reward study-pet" data-moving={moving} data-reaction={moving ? reaction : "idle"} data-gesture={moving ? script?.name : "idle"} data-stage={summary?.stage ?? "little"} data-phase={phase} aria-labelledby={title}>
    {!showIdle && <button className="study-pet-collapse" type="button" aria-expanded="true" onClick={() => { stop(); cancelFresh(); setExpandedQuestion(null); }}>お世話をたたむ</button>}
    <div className="reward-top"><div><p className="reward-eyebrow">学ぶたび、少しずつ仲よく</p><h3 id={title}>チワワと、ひと休み。</h3></div><button type="button" onClick={() => preference(true, paused)} aria-label="チワワのひと休みを閉じる">閉じる</button></div>
    <div className="reward-body">
      <div className="study-pet-scene" aria-hidden="true">
        <span className="study-pet-ground" />
        <span className="study-pet-motion" data-movement={frame?.movement ?? "still"}><StudyPetArtwork pose={frame?.pose ?? "guide"} outfit={doc?.outfit ?? "none"} wardrobe={experience?.wardrobe} stage={summary?.stage ?? "little"} atlas={atlas?.src === readyAtlas ? atlas : undefined} /></span>
        {moving && reaction === "feed" && atlas?.src !== readyAtlas && <span className="study-pet-bowl">● ● ●</span>}
      </div>
      <div className="reward-copy">
        <p className="reward-label">{reward?.label ?? "あなたのペースで"}</p>
        <p className="reward-message">{moving && reaction === "feed" ? "ごはん、ありがとう。" : reward ? "1問、回答しました。" : "次の1問も、いっしょに。"}</p>
        <p className="reward-caption">{summary ? `${stageNames[summary.stage]} · ${doc!.answers.length}問 · ごはん ${doc!.food}個` : "端末の記録を確認しています。"}</p>
        {summary && <p className="study-pet-growth">{summary.stage === "little" ? "まずは、なでてごあいさつ。10問でそばへ来る触れ合いと蝶ネクタイが使えます。" : summary.stage === "friend" ? "そばで過ごせる、なかよしに。30問で相棒の応援とマフラーが使えます。" : "応援してくれる学習の相棒。今日はどんな姿で過ごそう。"} ごはんをあげた回数 {doc!.meals}回</p>}
        {experience && <p className="study-pet-hint">保存した着替えと触れ合いから、いつでも続きを。触れ合った回数 {Object.values(experience.careCounts).reduce((sum, value) => sum + value, 0)}回</p>}
        <div className="reward-actions study-pet-actions">
          <button type="button" disabled={!available || !doc?.food} onClick={() => void run(() => store!.feed(reward?.id ?? "home"))}>ごはんをあげる</button>
          {gestures.map(([gesture, label]) => <button key={gesture} type="button" disabled={!available || !careUnlocked(answers, gesture)} onClick={() => void run(() => store!.care(gesture, reward?.id ?? "home"))}>{label}{!careUnlocked(answers, gesture) ? `（あと${CARE_ANSWERS[gesture] - answers}問）` : ""}</button>)}
          {moving && <button type="button" onClick={stop}>動きを止める</button>}
          <button type="button" onClick={() => preference(false, !paused)}>{paused ? "動きを許可する" : "動きをオフにする"}</button>
        </div>
        <fieldset className="study-pet-wardrobe"><legend>今日の着替え</legend><div className="reward-actions study-pet-actions">{clothes.map(([wardrobe, label]) => <button key={wardrobe} type="button" aria-pressed={experience?.wardrobe === wardrobe} disabled={!available || !wardrobeUnlocked(answers, wardrobe)} onClick={() => void run(() => store!.chooseWardrobe(wardrobe, reward?.id ?? "home"))}>{label}{!wardrobeUnlocked(answers, wardrobe) ? `（あと${WARDROBE_ANSWERS[wardrobe] - answers}問）` : ""}</button>)}</div></fieldset>
        <p className="study-pet-hint">ごはんは新しい問題への回答で1日30個まで。休んでも成長は減りません。触れ合いでごはんや成績は増えません。</p>
        <p className="study-pet-next">{showIdle ? <a href="#choose-qualification">次に学ぶ資格を選ぶ</a> : "ひと休みしたら、この問題画面の「次へ」で学習を続けよう。"}</p>
        {reduced && <p className="study-pet-hint">端末の設定に合わせ、静止画で表示中。</p>}
      </div>
    </div>
    <section className="study-pet-save" aria-label="育成記録の保存設定">
      <p>保存先：このブラウザー</p>
      <p>同じブラウザーで、前回の続きから育てられます。</p>
      <details><summary>保存先と切替について</summary>
        <p>育成記録は、このブラウザーを使う人で共有されます。ログイン中のアカウントとは別の記録です。</p>
        <p>ログインやアカウントの切替では、育成記録の保存先は変わりません。着替え・触れ合いは端末の記録に残りますが、アカウント保存や別の端末との同期には対応していません。</p>
        <p>別のブラウザーでは続きから再開できません。ブラウザーのデータを削除すると、この記録も失われます。</p>
      </details>
      {view.status === "storage_error" && <div role="alert"><p>端末への保存を確認できません。既存の記録は消していません。学習は続けられます。</p><p>未保存の回答は、このタブを開いたまま再確認してください。</p><button type="button" disabled={busy} onClick={() => void run(() => store!.retry())}>保存を再確認</button></div>}
      <details><summary>端末の記録について</summary><p>ここから始めた回答だけが対象です。同じ問題の再回答ではごはんは増えません。学習の成績・認証・ランキングには使いません。</p><button type="button" disabled={!store || busy} onClick={exportRecord}>復旧用の記録を書き出す</button></details>
      {notice && <p role="status">{notice}</p>}
    </section>
  </section>;
}
