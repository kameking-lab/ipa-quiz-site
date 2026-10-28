"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { LS_KEYS } from "@/lib/storage/keys";
import { getStudyReward, subscribeStudyReward, type StudyReward } from "@/lib/study-reward";

const captions = {
  swim: "ぷかぷか、海のひと休み。",
  code: "小さなパソコンで、ひと仕事。",
  coins: "こつこつ、ひとつずつ。",
  light: "あかりが、ぽっと灯りました。",
  rest: "木もれびの中で、ひと息。",
};

/** Pure UI entry point for the lightweight local preview. No learning writes. */
export function RewardCorner({ reward, showIdle = false, playbackToken = 0 }: { reward: StudyReward | null; showIdle?: boolean; playbackToken?: number }) {
  const [closed, setClosed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [ready, setReady] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();
  const hasReward = reward !== null;
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem(LS_KEYS.studyRewardPreferences) ?? "null");
      if (value) { setClosed(value.closed === true); setPaused(value.paused === true); }
    } catch { /* optional settings */ }
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query?.matches ?? true);
    update();
    query?.addEventListener("change", update);
    setReady(true);
    return () => query?.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(LS_KEYS.studyRewardPreferences, JSON.stringify({ closed, paused })); } catch { /* optional settings */ }
  }, [closed, paused, ready]);
  useEffect(() => { setRunning(false); }, [reward?.id]);
  useEffect(() => {
    if (playbackToken > 0) setRunning(true);
  }, [playbackToken]);
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setRunning(false), 6000);
    return () => clearTimeout(timer);
  }, [running, reward?.id]);
  useEffect(() => {
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; update(); });
    if (panelRef.current) observer?.observe(panelRef.current);
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [closed, hasReward, showIdle]);
  if (!reward && !showIdle) return null;
  const theme = reward?.theme ?? "rest";
  const moving = ready && running && !paused && !closed && !reduced && visible;
  if (closed) return <div className="reward-reopen"><button type="button" onClick={() => { setClosed(false); setRunning(false); }}>チワワのひと休みを開く</button></div>;
  return <section ref={panelRef} className="study-reward" data-theme={theme} data-moving={moving} aria-labelledby={titleId}>
    <div className="reward-top"><div><p className="reward-eyebrow">木もれびの自習室</p><h3 id={titleId}>チワワと、ひと休み。</h3></div><button type="button" aria-label="チワワのひと休みを閉じる" onClick={() => { setClosed(true); setRunning(false); }}>閉じる</button></div>
    <div className="reward-body">
      <div className="reward-scene" aria-hidden="true">
        <span className="reward-halo" />
        <span className="reward-spark reward-spark-one" /><span className="reward-spark reward-spark-two" />
        {/* Fixed 14KB local WebP, also usable in the offline preview without a Next image server. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="reward-dog"><img src="/mascot/chihuahua-guide.webp" width="144" height="144" alt="" /></span>
        <span className="reward-prop">{theme === "code" ? "⌨" : theme === "coins" ? "¥" : theme === "light" ? "☀" : theme === "swim" ? "〜" : "✿"}</span>
        <span className="reward-water" />
      </div>
      <div className="reward-copy"><p className="reward-label">{reward?.label ?? "あなたのペースで"}</p><p className="reward-message">{reward ? "1問、回答しました。" : "1問解いたら、小さなごほうび。"}</p><p className="reward-caption">{reward ? captions[theme] : "ここでチワワが待っています。"}</p><div className="reward-actions">{reward && <button type="button" disabled={reduced} onClick={() => { if (moving) { setPaused(true); setRunning(false); } else { setPaused(false); setRunning(true); } }}>{moving ? "動きを止める" : "動きを見る"}</button>}<span>{reduced ? "静止画で表示中" : "無音・6秒でひと休み"}</span></div></div>
    </div>
  </section>;
}

/** Qualification/question scope prevents a previous answer appearing on another exam. */
export function StudyRewardCorner({ scope, questionId, showIdle = false, answered = true }: { scope?: string; questionId?: string; showIdle?: boolean; answered?: boolean }) {
  const latest = useSyncExternalStore(subscribeStudyReward, getStudyReward, () => null);
  const [playbackToken, setPlaybackToken] = useState(0);
  // Only a fresh submission notification can start motion. Restoring/filtering a
  // snapshot (SSR, back, reload, qualification change) never emits this event.
  useEffect(() => subscribeStudyReward(() => {
    const fresh = getStudyReward();
    if (fresh && (!scope || fresh.scope === scope) && (!questionId || fresh.questionId === questionId)) setPlaybackToken(token => token + 1);
  }), [scope, questionId]);
  const reward = answered && latest && (!scope || latest.scope === scope) && (!questionId || latest.questionId === questionId) ? latest : null;
  return <RewardCorner reward={reward} showIdle={showIdle} playbackToken={playbackToken} />;
}
