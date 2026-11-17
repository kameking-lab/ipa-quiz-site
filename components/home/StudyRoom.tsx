"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { canonicalPresenceExam, presenceExamName } from "@/lib/study-presence";
import type { MeasuredPresence } from "@/lib/study-presence-contract";
import { measuredRoom, roomStage } from "@/lib/home/study-room";
import { studyRoomHeight, studyRoomScene } from "@/lib/home/study-room-scenes";
import { assignRoomPoints, roomIdentitySeed } from "@/lib/home/study-room-scatter";
import { scatteredChihuahuaArt } from "@/lib/home/room-chihuahua-art";
import { readLastQuestion } from "@/lib/storage/last-question";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { StudyRoomSeat, type StudyRoomSeatDetail } from "./StudyRoomSeat";

interface Suggestion { name: string; href: string; exam?: string }
const EMPTY_DETAILS: readonly StudyRoomSeatDetail[] = [];

export function StudyRoom({ snapshot, suggestions, current = false, exam, standalone = false, seatDetails = EMPTY_DETAILS, onCheer }: {
  snapshot: MeasuredPresence | null;
  suggestions: readonly Suggestion[];
  current?: boolean;
  exam?: string;
  standalone?: boolean;
  /** Integration slot for anonymous metadata from a server; the current aggregate supplies none. */
  seatDetails?: readonly StudyRoomSeatDetail[];
  /** Integration slot for delivery; without it the paw is a local encouragement animation. */
  onCheer?: (seat: { exam: string; index: number }) => void;
}) {
  const [ownExam, setOwnExam] = useState<string | null>(null);
  const [sameExam, setSameExam] = useState(false);
  const selectedExam = (exam && canonicalPresenceExam(exam)) || ownExam;
  useEffect(() => {
    const last = readLastQuestion();
    const paper = listExamLearningSummaries().find(item => item.answered > 0);
    const code = paper && (!last || Date.parse(paper.updatedAt) > last.answeredAt) ? paper.examId : last?.exam;
    setOwnExam(code ? canonicalPresenceExam(code) : null);
  }, []);
  const filtered = useMemo(() => {
    if (!snapshot || !sameExam || !selectedExam) return snapshot;
    const exams = snapshot.exams.filter(row => canonicalPresenceExam(row.exam) === selectedExam);
    const count = exams.reduce((sum, row) => sum + row.count, 0);
    return { ...snapshot, count, total: count, exams };
  }, [snapshot, sameExam, selectedExam]);
  const measured = useMemo(() => filtered ? measuredRoom(filtered, filtered.count) : null, [filtered]);
  const seats = useMemo(() => (measured?.seats ?? []).map(seat => ({ ...seat,
    detail: seatDetails.find(item => item.exam === seat.exam && item.index === seat.index),
  })), [measured, seatDetails]);
  const targetStage = roomStage(filtered?.count ?? 0);
  const [stage, setStage] = useState(targetStage);
  const hasSnapshot = filtered !== null;
  useEffect(() => {
    if (!hasSnapshot) { setStage(0); return; }
    if (targetStage >= stage) { if (targetStage !== stage) setStage(targetStage); return; }
    const timer = setTimeout(() => setStage(targetStage), 60_000);
    return () => clearTimeout(timer);
    // Fresh samples within the same stage must not restart the shrink deadline.
  }, [targetStage, stage, hasSnapshot]);
  const renderedStage = Math.max(stage, targetStage);
  const scene = studyRoomScene(renderedStage);
  const sceneHeight = studyRoomHeight(scene, filtered?.count ?? 0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [motionVisible, setMotionVisible] = useState(false);
  const [visibleSeats, setVisibleSeats] = useState<Set<string>>(new Set());
  const seatKey = seats.map(seat => `${seat.exam}:${seat.index}`).join("|");
  const [placement, setPlacement] = useState<{ stage: number; keys: string; points: Map<string, number> }>({ stage: -1, keys: "", points: new Map() });
  const points = placement.stage === renderedStage && placement.keys === seatKey ? placement.points
    : assignRoomPoints(seats.map(seat => `${seat.exam}:${seat.index}`), scene.seats.length,
      placement.stage === renderedStage || (placement.stage >= 4 && renderedStage >= 4) ? placement.points : undefined);
  if (placement.stage !== renderedStage || placement.keys !== seatKey) setPlacement({ stage: renderedStage, keys: seatKey, points });
  const [inspected, setInspected] = useState<string | null>(null);
  const focusedSeat = useRef<string | null>(null);
  useEffect(() => {
    if (focusedSeat.current && !seatKey.split("|").includes(focusedSeat.current)) {
      sceneRef.current?.focus();
      focusedSeat.current = null;
    }
  }, [seatKey]);
  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    if (typeof IntersectionObserver === "undefined") { setBackgroundReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setBackgroundReady(true); observer.disconnect(); }
    }, { rootMargin: "800px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const element = sceneRef.current;
    if (!element) return;
    let inViewport = typeof IntersectionObserver === "undefined";
    const visible = new Set<string>();
    const update = () => {
      const active = inViewport && !document.hidden;
      setMotionVisible(active);
      setVisibleSeats(active ? new Set(visible) : new Set());
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      for (const entry of entries) {
        const key = entry.target.getAttribute("data-seat-key");
        if (key !== null) {
          if (entry.isIntersecting) visible.add(key); else visible.delete(key);
        } else inViewport = entry.isIntersecting;
      }
      update();
    });
    observer?.observe(element);
    element.querySelectorAll("[data-seat-key]").forEach(seat => observer?.observe(seat));
    document.addEventListener("visibilitychange", update);
    update();
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [seatKey]);
  const [cheer, setCheer] = useState<string | null>(null);
  const cooldowns = useRef(new Map<string, number>());
  const lastCheer = useRef(-Infinity);
  useEffect(() => {
    if (!cheer) return;
    const timer = setTimeout(() => setCheer(null), 1200);
    return () => clearTimeout(timer);
  }, [cheer]);
  function cheerSeat(seat: { exam: string; index: number }) {
    const key = `${seat.exam}:${seat.index}`;
    setInspected(current => current === key ? null : key);
    const now = Date.now();
    if (now - lastCheer.current < 1200 || now - (cooldowns.current.get(key) ?? -Infinity) < 10_000) return;
    lastCheer.current = now;
    cooldowns.current.set(key, now);
    setCheer(key);
    onCheer?.(seat);
  }
  const suggestion = suggestions.find(item => item.exam && canonicalPresenceExam(item.exam) === selectedExam);
  const href = selectedExam && Object.hasOwn(EXAM_CONFIGS, selectedExam)
    ? `/quiz?mode=random&exam=${encodeURIComponent(selectedExam)}` : suggestion?.href ?? "/#choose-qualification";

  const Heading = standalone ? "h1" : "h2";
  return <div className="mx-auto w-full min-w-0 max-w-4xl space-y-3 sm:space-y-4">
    <header className="flex min-w-0 items-center justify-between gap-2">
      <Heading id="study-room-title" className="text-xl font-bold tracking-tight">自習室</Heading>
      {filtered && <p data-testid="study-room-total" className="whitespace-nowrap text-sm tabular-nums text-muted-foreground">{current ? "いま" : "前回"}<strong className="ml-1 text-foreground">{filtered.count.toLocaleString("ja-JP")}</strong>人</p>}
    </header>
    <div className="flex min-w-0 items-center justify-between gap-2">
      <div role="group" aria-label="自習室の資格" className="inline-flex rounded-full bg-muted p-1 text-sm font-medium">
        <button type="button" aria-pressed={!sameExam} onClick={() => setSameExam(false)} className="min-h-11 min-w-20 rounded-full px-4 outline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary aria-pressed:bg-background aria-pressed:shadow-sm">みんな</button>
        <button type="button" aria-pressed={sameExam} disabled={!selectedExam} onClick={() => setSameExam(true)} className="min-h-11 min-w-20 rounded-full px-4 outline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary aria-pressed:bg-background aria-pressed:shadow-sm disabled:opacity-50">同じ資格</button>
      </div>
      <span className="min-w-0 text-right text-xs leading-relaxed text-muted-foreground">{filtered ? scene.name : ""}</span>
    </div>
    <div role="region" aria-label="自習室の席" tabIndex={0} className="overflow-x-auto rounded-2xl outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary">
    <div ref={sceneRef} data-testid="study-room-scene" data-stage={renderedStage} data-motion-visible={motionVisible} data-art-status={scene.background ? "ready" : "pending"}
      role="group" aria-label="チワワの自習室" tabIndex={-1}
      className="relative isolate w-full min-w-0 overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary dark:border-stone-700 dark:bg-stone-900"
      style={{ aspectRatio: `${scene.width} / ${sceneHeight}`, minWidth: scene.minWidth }}>
      {scene.background && backgroundReady && <>
        {/* Extra halls retain the source image's aspect ratio instead of stretching it. */}
        {Array.from({ length: scene.columns ?? 1 }, (_, column) =>
          // eslint-disable-next-line @next/next/no-img-element
          <img key={column} src={scene.background!} alt="" width={scene.width / (scene.columns ?? 1)} height={scene.height} loading="lazy" decoding="async"
            className="pointer-events-none absolute top-0 h-full" style={{ left: `${column * 100 / (scene.columns ?? 1)}%`, width: `${100 / (scene.columns ?? 1)}%` }} />)}
      </>}
      {seats.map((seat) => {
        const key = `${seat.exam}:${seat.index}`;
        const point = scene.seats[points.get(key)!];
        const mascot = scatteredChihuahuaArt(key);
        const seed = roomIdentitySeed(key);
        // A stable identity picks the point and visual variation; membership changes do not reflow survivors.
        const coordinates = { "--seat-x": `${point.x / scene.width * 100}%`, "--seat-y": `${point.y / sceneHeight * 100}%`, "--seat-width": `${point.width / scene.width * 100}%`, "--dog-turn": `${(seed % 25) - 12}deg`, "--dog-scale": `${.72 + (seed % 4) * .045}` } as CSSProperties;
        return <div key={key} data-testid="study-room-seat" data-seat-key={key} data-animate={motionVisible && visibleSeats.has(key)}
          onFocus={() => { focusedSeat.current = key; }} onBlur={() => { focusedSeat.current = null; }} style={coordinates}
          className="group/seat absolute left-[var(--seat-x)] top-[var(--seat-y)] aspect-square w-[var(--seat-width)] -translate-x-1/2 -translate-y-1/2 [&[data-animate=true]_.study-mascot]:motion-safe:animate-[pulse_3.6s_ease-in-out_infinite]">
          <StudyRoomSeat name={presenceExamName(seat.exam)!} index={seat.index} mascot={mascot} detail={seat.detail} inspected={inspected === key} cheering={cheer === key} onCheer={() => cheerSeat(seat)} />
        </div>;
      })}
      {!seats.length && <p className="absolute inset-0 grid place-items-center px-4 text-sm text-stone-600 dark:text-stone-300"><span className="rounded-full bg-background/95 px-4 py-2 shadow-sm">{filtered ? "静かな、自習室。" : "自習室"}</span></p>}
      {measured && measured.hidden > 0 && <span aria-label={`ほか${measured.hidden}人が勉強中`} className="absolute bottom-3 right-3 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold tabular-nums shadow-sm">+{measured.hidden}</span>}
    </div>
    </div>
    {snapshot && !current && <p className="text-right text-xs text-muted-foreground"><time dateTime={snapshot.measuredAt}>{new Date(snapshot.measuredAt).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" })}</time> 時点</p>}
    <Link href={href} className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground outline-offset-2 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-primary">席について解く</Link>
  </div>;
}
