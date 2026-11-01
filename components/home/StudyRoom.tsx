"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { presenceExamName } from "@/lib/study-presence";
import type { MeasuredPresence } from "@/lib/study-presence-contract";
import { measuredRoom, roomStage } from "@/lib/home/study-room";
import { StudyRewardCorner } from "./StudyRewardCorner";
import styles from "./StudyRoomSeats.module.css";

interface Suggestion { name: string; href: string }
interface Seat { name: string; href?: string; index: number }

export function StudyRoom({ snapshot, suggestions }: {
  snapshot: MeasuredPresence | null;
  suggestions: readonly Suggestion[];
}) {
  const [stage, setStage] = useState(() => roomStage(snapshot?.count ?? 0));
  const targetStage = snapshot ? roomStage(snapshot.count) : null;
  useEffect(() => {
    if (targetStage === null) { setStage(0); return; }
    const target = targetStage;
    if (target >= stage) { if (target !== stage) setStage(target); return; }
    const timer = setTimeout(() => setStage(target), 60_000);
    return () => clearTimeout(timer);
  }, [targetStage, stage]);
  const [selected, setSelected] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const seatListRef = useRef<HTMLDivElement>(null);
  const focusedSeat = useRef<string | null>(null);
  const [motionVisible, setMotionVisible] = useState(false);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    let inViewport = typeof IntersectionObserver === "undefined";
    const updateVisibility = () => setMotionVisible(inViewport && !document.hidden);
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      updateVisibility();
    }, { threshold: 0.1 });
    observer?.observe(scene);
    document.addEventListener("visibilitychange", updateVisibility);
    updateVisibility();
    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);
  const measured = snapshot ? measuredRoom(snapshot) : null;
  const introductions = suggestions.filter((item, index, items) => items.findIndex(candidate => candidate.href === item.href) === index).slice(0, 6);
  const seats: Seat[] = measured ? measured.seats.map(seat => {
    const name = presenceExamName(seat.exam)!;
    return { name, href: suggestions.find(item => item.name === name)?.href, index: seat.index };
  }) : introductions.map((item, index) => ({ ...item, index }));
  const selectionKey = (seat: Seat) => `${measured ? "measured" : "introduction"}:${seat.index}:${seat.name}`;
  const focus = seats.find(seat => selectionKey(seat) === selected);
  // A seat can represent another qualification after a fresh measurement or a mode change.
  // Discard the old selection before it can reappear on an unrelated seat.
  const seatKeys = seats.map(selectionKey).join("\n");
  const selectedExists = Boolean(focus);
  useEffect(() => {
    const focusedStillExists = focusedSeat.current === null || seatKeys.split("\n").includes(focusedSeat.current);
    if (!focusedStillExists) {
      scrollRef.current?.focus();
      focusedSeat.current = null;
    }
    if (selected !== null && !selectedExists) setSelected(null);
  }, [seatKeys, selected, selectedExists]);
  function clearSelection() {
    seatListRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
    setSelected(null);
  }

  return <>
    <header className="study-room-heading">
      <div><p className="study-kicker">A ROOM FOR SMALL STEPS</p><h2 id="study-room-title"><span>それぞれの目標へ。</span><span>同じ空間で。</span></h2></div>
      <p>ひと息ついて、また一問。</p>
    </header>
    <div className="study-room-layout">
      <div className="study-room-card">
        <div className="study-room-toolbar"><div><h3>木もれびの自習室</h3><p>{measured ? "直近の学習のようす" : "資格紹介"}</p></div>
        </div>
        {snapshot && snapshot.count > 0 && <div className="study-room-state">前回取得時点の集計: チワワ1匹で1人分を表示</div>}
        <div ref={scrollRef} className="study-room-scroll" tabIndex={0} aria-label="広がる自習室。横にスクロールできます"><div ref={sceneRef} data-stage={stage} data-motion-visible={motionVisible} className="study-room-scene" role="group" aria-label={snapshot ? "前回取得時点の集計に基づくチワワの自習室" : "資格を紹介するイメージルーム"} onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}>
          <span className="study-room-light" aria-hidden="true">木もれびの時間</span>
          {seats.map(seat => <span key={selectionKey(seat)} className={`study-room-seat study-seat-${seat.index} ${styles.illustration}`} data-selected={selected === selectionKey(seat)} aria-hidden="true">
            <span className={`study-mascot study-pose-${[0, 2, 3, 4, 1, 6, 5, 9, 7, 10, 8, 11][seat.index]}`} />
            <span className={styles.number}>{seat.index + 1}</span>
          </span>)}
          {snapshot?.count === 0 && <div className="study-room-empty"><p>静かな、自習室。</p><span>あなたのペースで、今日の一問を。</span></div>}
        </div></div>
        {seats.length > 0 && <div ref={seatListRef} className={styles.list} role="group" aria-label="自習室の席を選ぶ" onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}>
          {seats.map(seat => <button key={selectionKey(seat)} type="button" className={styles.button} aria-controls="study-room-selection" aria-pressed={selected === selectionKey(seat)} onFocus={() => { focusedSeat.current = selectionKey(seat); }} onBlur={() => { focusedSeat.current = null; }} onClick={() => setSelected(value => value === selectionKey(seat) ? null : selectionKey(seat))}>
            <span className={styles.listNumber}>{seat.index + 1}</span><span>{seat.name}</span>
          </button>)}
        </div>}
        <div className="study-room-foot">
          <p>{measured ? `イラスト ${seats.length}体${measured.hidden ? `・ほか ${measured.hidden.toLocaleString("ja-JP")}人` : ""}` : "チワワを選んで、気になる資格を見つけよう。"}</p>
          {measured && <span>全{snapshot!.count.toLocaleString("ja-JP")}人の集計を一部イラストで表示</span>}
        </div>

      </div>
      <aside className="study-room-sidebar">
        <p className="study-room-disclosure">学習者数は1時間ごとに取得します。リアルタイム表示ではありません。席と人数は前回取得時点の集計です。</p>
        {snapshot && <div className="study-room-summary">
          <p className="study-kicker">前回取得時点の直近5分の学習状況</p>
          <p className="study-room-total"><strong>{snapshot.count.toLocaleString("ja-JP")}</strong><span>人</span></p>
          <p className="study-room-measurement">更新 <time dateTime={snapshot.measuredAt}>{new Date(snapshot.measuredAt).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" })}</time> JST</p>
          <p>前回取得時点の直近5分の学習者 {snapshot.count.toLocaleString("ja-JP")}人</p>
          {snapshot?.exams.length ? <ul className="study-room-counts" aria-label="資格別の学習人数" tabIndex={0}>
            {snapshot.exams.map(row => <li key={row.exam}>前回取得時点の直近5分に<strong>{row.count.toLocaleString("ja-JP")}</strong>人が{presenceExamName(row.exam)}を学習しました。</li>)}
          </ul> : <div className="study-room-guidance">
            <p>前回取得時点の直近5分の学習人数は0人です。</p>
            <p>公開中の問題から学習を始めてみませんか。</p>
            {introductions.length > 0 && <ul>{introductions.map(item => <li key={item.href}><a href={item.href}>{item.name}の問題を見る<ArrowRight aria-hidden="true" /></a></li>)}</ul>}
            <a href="#home-directory-title" className="study-text-link">資格から問題を探す<ArrowRight aria-hidden="true" /></a>
          </div>}
          <p className="study-room-disclosure" title="前回取得時点の直近5分に操作した、表示中の問題の資格を集計しています。同じブラウザは最後に活動した資格で1人。取得は1時間ごとで、操作が2分途切れると送信を止めます。">同じブラウザは1人として集計</p>
        </div>}
        <div id="study-room-selection" className={`study-room-focus${snapshot && !focus ? " study-room-focus-empty" : ""}`} aria-live="polite" aria-atomic="true">
          <p className="study-kicker">SMALL STEPS, TOGETHER.</p>
          {(!snapshot || focus) && <><h3>{focus?.name ?? "学びの入口を、ひとつ。"}</h3><p>{focus ? "一問ずつ、あなたのペースで。" : "気になる資格から、今日の一問を。"}</p></>}
          {focus?.href && <a href={focus.href} className="study-text-link">{focus.name}の問題を見る<ArrowRight aria-hidden="true" /></a>}
          {!snapshot && !focus && <div className="study-room-guidance"><ul>{introductions.map(item => <li key={item.href}><a href={item.href}>{item.name}<ArrowRight aria-hidden="true" /></a></li>)}</ul><a href="#choose-qualification" className="study-text-link">ほかの資格を探す<ArrowRight aria-hidden="true" /></a></div>}
          {focus && <button type="button" className="study-text-link" onClick={clearSelection}>選択を戻す</button>}
        </div>
        <StudyRewardCorner showIdle />
        <p className="study-room-disclosure">ごほうびはこのタブで最後に回答した一問に対する表示です。集計人数・正誤・ポイントには影響しません。</p>
      </aside>
    </div>
  </>;
}
