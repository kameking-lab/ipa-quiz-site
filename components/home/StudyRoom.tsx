"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { presenceExamName } from "@/lib/study-presence";
import type { MeasuredPresence } from "@/lib/study-presence-contract";
import { initialSeatIdles, mascotVisitSeed, measuredRoom, nextSeatIdles, qualificationMascot, quietRoomMascots, randomFor, roomCharacter, roomMascots, roomStage, type SeatIdle } from "@/lib/home/study-room";
import { PetOwnStudySeat } from "@/components/pet/PetOwnStudySeat";
import { usePetProfileView } from "@/components/pet/usePetProfileView";
import { StudyReturnLink } from "./StudyReturnLink";
import styles from "./StudyRoomSeats.module.css";

interface Suggestion { name: string; href: string; exam?: string }
interface Seat { name: string; href?: string; exam: string; index: number }

export function StudyRoom({ snapshot, suggestions }: {
  snapshot: MeasuredPresence | null;
  suggestions: readonly Suggestion[];
}) {
  const petView = usePetProfileView(() => {});
  // No source is emitted until hydration has recovered the visit seed: no SSR mismatch or image swap.
  const [visitSeed, setVisitSeed] = useState<number | null>(null);
  useEffect(() => { setVisitSeed(mascotVisitSeed()); }, []);
  const mascots = visitSeed === null ? null : roomMascots(visitSeed);
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
  // 背景の大きな部屋の絵（約 300KB）は、自習室が画面に近づいてから読み込む。
  // ページ下部にあるので、開いた直後のダウンロードをトップの絵などに譲る。
  const [backgroundReady, setBackgroundReady] = useState(false);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    if (typeof IntersectionObserver === "undefined") { setBackgroundReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setBackgroundReady(true);
      observer.disconnect();
    }, { rootMargin: "800px 0px" });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);
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
    return { name, exam: seat.exam, href: suggestions.find(item => item.name === name)?.href, index: seat.index };
  }) : introductions.map((item, index) => ({ ...item, exam: item.exam ?? item.href.split("/")[1], index }));
  // A quiet room (1-3 learners) shows everyone studying at their desk; breaks, idle moments and the
  // playing dog only start from 4 learners, so a single learner never looks like an empty desk.
  const slots = mascots && quietRoomMascots(mascots, seats.length);
  // Studying seats rotate through their character's idle moments (never the same one twice in a row).
  const characterKey = seats.map(seat => slots?.[seat.index]?.state === "study" && !slots.quiet ? roomCharacter(seat.exam) : "").join("|");
  const [idles, setIdles] = useState<SeatIdle[]>([]);
  useEffect(() => {
    if (visitSeed === null) return;
    // Seeded by the visit so a remount shows the same room; only later ticks vary.
    setIdles(initialSeatIdles(characterKey.split("|").map(character => character || null), randomFor(visitSeed ^ 0x9e3779b9)));
  }, [characterKey, visitSeed]);
  useEffect(() => {
    if (!motionVisible || visitSeed === null || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const characters = characterKey.split("|").map(character => character || null);
    const timer = setInterval(() => setIdles(current => nextSeatIdles(current.length === characters.length ? current : characters.map(() => ({ idle: null, last: null })), characters, Math.random)), 7000);
    return () => clearInterval(timer);
  }, [characterKey, motionVisible, visitSeed]);
  const illustratedSeats = seats.map((seat, i) => ({ ...seat, mascot: slots && qualificationMascot(seat.exam, slots[seat.index], slots.quiet ? null : idles[i]?.idle ?? null) }));
  const awaySeat = illustratedSeats.find(seat => seat.mascot?.state === "away");
  const away = awaySeat?.mascot;
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
      <h2 id="study-room-title"><span>それぞれの目標へ。</span><span>同じ空間で。</span></h2>
    </header>
    <div className="study-room-layout">
      <div className={`study-room-card ${styles.room}`}>
        <div className="study-room-toolbar"><h3>木もれびの自習室</h3></div>
        <div ref={scrollRef} className="study-room-scroll" tabIndex={0} aria-label="広がる自習室。横にスクロールできます"><div ref={sceneRef} data-stage={stage} data-motion-visible={motionVisible} data-bg-ready={backgroundReady} className="study-room-scene" role="group" aria-label={snapshot ? "前回取得時点の集計に基づくチワワの自習室" : "資格を紹介するイメージルーム"} onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}>
          <span className="study-room-light" aria-hidden="true">木もれびの時間</span>
          <div className={styles.seatedArea}>
          {illustratedSeats.map(seat => {
            const mascot = seat.mascot;
            return <span key={selectionKey(seat)} className={`study-room-seat study-seat-${seat.index} ${styles.illustration}`} data-selected={selected === selectionKey(seat)} data-mascot-state={mascot?.state === "away" ? "vacant" : mascot?.state}>
              {mascot && <span className={styles.direction} data-mirrored={mascot.mirrored}>
                {/* Local pre-sized WebP; native lazy loading avoids optimizer requests and preloads. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={`${mascot.state === "away" ? styles.vacant : "study-mascot"} ${styles.image}`} src={mascot.state === "away" ? mascot.vacantSrc : mascot.src} alt={mascot.state === "away" ? `${seat.name}の空席（椅子と机、開いたままの本）` : `${seat.name}のチワワ（${mascot.stateLabel}）`} width={256} height={256} loading="lazy" decoding="async" />
              </span>}
              <span className={styles.number} aria-hidden="true">{seat.index + 1}</span>
            </span>;
          })}
          </div>
          {away && awaySeat && <span className={`study-room-away ${styles.illustration} ${styles.floor}`} data-mascot-state="away" data-origin-seat={awaySeat.index} data-selected={selected === selectionKey(awaySeat)}>
            <span className={styles.direction} data-mirrored={away.mirrored}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={`study-mascot ${styles.image}`} src={away.src} alt={`${awaySeat.name}のチワワ（${away.stateLabel}）`} width={256} height={256} loading="lazy" decoding="async" />
            </span>
          </span>}
          {snapshot?.count === 0 && <div className="study-room-empty"><p>静かな、自習室。</p></div>}
        </div></div>
        <PetOwnStudySeat view={petView} />
        {seats.length > 0 && <div ref={seatListRef} className={styles.list} role="group" aria-label="自習室の席を選ぶ" onKeyDown={event => { if (event.key === "Escape") setSelected(null); }}>
          {seats.map(seat => <button key={selectionKey(seat)} type="button" className={styles.button} aria-controls="study-room-selection" aria-pressed={selected === selectionKey(seat)} onFocus={() => { focusedSeat.current = selectionKey(seat); }} onBlur={() => { focusedSeat.current = null; }} onClick={() => setSelected(value => value === selectionKey(seat) ? null : selectionKey(seat))}>
            <span className={styles.listNumber}>{seat.index + 1}</span><span>{seat.name}</span>
          </button>)}
        </div>}

      </div>
      <aside className="study-room-sidebar">
        <StudyReturnLink />
        {snapshot && <div className="study-room-summary">
          <p className="study-kicker">直近5分の学習者</p>
          <p className="study-room-total"><strong>{snapshot.count.toLocaleString("ja-JP")}</strong><span>人</span></p>
          <p className="study-room-measurement"><time dateTime={snapshot.measuredAt}>{new Date(snapshot.measuredAt).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" })}</time> 時点</p>
          {snapshot.exams.length ? <ul className="study-room-counts" aria-label="資格別の学習人数" tabIndex={0}>
            {snapshot.exams.map(row => <li key={row.exam}>{presenceExamName(row.exam)} <strong>{row.count.toLocaleString("ja-JP")}</strong>人</li>)}
          </ul> : <div className="study-room-guidance">
            {introductions.length > 0 && <ul>{introductions.map(item => <li key={item.href}><a href={item.href}>{item.name}<ArrowRight aria-hidden="true" /></a></li>)}</ul>}
            <a href="#home-directory-title" className="study-text-link">資格から問題を探す<ArrowRight aria-hidden="true" /></a>
          </div>}
        </div>}
        <div id="study-room-selection" className={`study-room-focus${snapshot && !focus ? " study-room-focus-empty" : ""}`} aria-live="polite" aria-atomic="true">
          {focus && <h3>{focus.name}</h3>}
          {focus?.href && <a href={focus.href} className="study-text-link">{focus.name}の問題を見る<ArrowRight aria-hidden="true" /></a>}
          {!snapshot && !focus && <div className="study-room-guidance"><ul>{introductions.map(item => <li key={item.href}><a href={item.href}>{item.name}<ArrowRight aria-hidden="true" /></a></li>)}</ul><a href="#choose-qualification" className="study-text-link">ほかの資格を探す<ArrowRight aria-hidden="true" /></a></div>}
          {focus && <button type="button" className="study-text-link" onClick={clearSelection}>選択を戻す</button>}
        </div>
      </aside>
    </div>
  </>;
}
