"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { canonicalPresenceExam, presenceExamName } from "@/lib/study-presence";
import type { MeasuredPresence } from "@/lib/study-presence-contract";
import { measuredRoom, roomStage } from "@/lib/home/study-room";
import { studyRoomScene } from "@/lib/home/study-room-scenes";
import { assignRoomPoints } from "@/lib/home/study-room-scatter";
import { furnitureRoomMascots } from "@/lib/home/study-room-furniture";
import { readLastQuestion } from "@/lib/storage/last-question";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { RoomChihuahua } from "./RoomChihuahua";
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
  const hasLearners = seats.length > 0;
  useEffect(() => {
    if (!hasLearners) { setStage(0); return; }
    if (targetStage >= stage) { if (targetStage !== stage) setStage(targetStage); return; }
    const timer = setTimeout(() => setStage(targetStage), 60_000);
    return () => clearTimeout(timer);
    // Fresh samples within the same stage must not restart the shrink deadline.
  }, [targetStage, stage, hasLearners]);
  const renderedStage = hasLearners ? Math.max(stage, targetStage) : 0;
  const scene = studyRoomScene(renderedStage);
  const sceneHeight = scene.height;
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
  const mascots = useMemo(() => furnitureRoomMascots(seatKey ? seatKey.split("|") : [], points, scene.seats), [seatKey, points, scene]);
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
  const inspectedSeat = seats.find(seat => `${seat.exam}:${seat.index}` === inspected);
  const inspectedMascot = inspected && mascots.get(inspected);
  const emptyMessage = !filtered ? "勉強中の人数を表示できません"
    : current ? "いま勉強中の人はいません" : "前回は勉強中の人はいませんでした";
  return <div className="mx-auto w-full min-w-0 max-w-[800px] space-y-3 sm:space-y-4">
    <header className="flex min-w-0 items-center justify-between gap-2">
      <Heading id="study-room-title" className="text-xl font-bold tracking-tight">自習室</Heading>
      {filtered && <p data-testid="study-room-total" className="whitespace-nowrap text-sm tabular-nums text-muted-foreground">{current ? "いま" : "前回"}<strong className="ml-1 text-foreground">{filtered.count.toLocaleString("ja-JP")}</strong>人</p>}
    </header>
    <div className="flex min-w-0 items-center justify-between gap-2">
      <div role="group" aria-label="自習室の資格" className="inline-flex rounded-full bg-muted p-1 text-sm font-medium">
        <button type="button" aria-pressed={!sameExam} onClick={() => setSameExam(false)} className="min-h-11 min-w-20 rounded-full px-4 outline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary aria-pressed:bg-card aria-pressed:shadow-sm">みんな</button>
        <button type="button" aria-pressed={sameExam} disabled={!selectedExam} onClick={() => setSameExam(true)} className="min-h-11 min-w-20 rounded-full px-4 outline-offset-2 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary aria-pressed:bg-card aria-pressed:shadow-sm disabled:opacity-50">同じ資格</button>
      </div>
      <span className="min-w-0 text-right text-xs leading-relaxed text-muted-foreground">{filtered ? scene.name : ""}</span>
    </div>
    <div role="region" aria-label="自習室の席" className="rounded-[20px]">
    <div ref={sceneRef} data-testid="study-room-scene" data-stage={renderedStage} data-motion-visible={motionVisible} data-art-status={scene.background ? "ready" : "pending"}
      role="group" aria-label="チワワの自習室" tabIndex={-1}
      className="relative isolate w-full min-w-0 overflow-hidden rounded-[20px] border border-border bg-card outline-offset-2 focus-visible:outline-2 focus-visible:outline-primary"
      style={{ aspectRatio: `${scene.width} / ${sceneHeight}` }}>
      {scene.background && backgroundReady && <>
        {/* Crop the production artwork to the floor; the back wall occupies about 15%. */}
        {Array.from({ length: scene.columns ?? 1 }, (_, column) =>
          // eslint-disable-next-line @next/next/no-img-element
          <img key={column} src={scene.background!} alt="" width={1536} height={858} loading="lazy" decoding="async"
            className="pointer-events-none absolute bottom-0 h-[127%] object-cover opacity-85 saturate-[.7] contrast-[.85] brightness-105" style={{ left: `${column * 100 / (scene.columns ?? 1)}%`, width: `${100 / (scene.columns ?? 1)}%` }} />)}
      </>}
      {seats.map((seat) => {
        const key = `${seat.exam}:${seat.index}`;
        const point = scene.seats[points.get(key)!];
        const mascot = mascots.get(key)!;
        // A stable identity picks the point and visual variation; membership changes do not reflow survivors.
        const solo = seats.length === 1 && renderedStage === 0;
        const coordinates = { "--seat-x": `${solo ? 50 : point.x / scene.width * 100}%`, "--seat-y": `${solo ? 55 : point.y / sceneHeight * 100}%`, "--seat-width": `${solo ? 52 : point.width / scene.width * 100}%`, zIndex: Math.round(point.floorY) } as CSSProperties;
        return <div key={key} data-testid="study-room-seat" data-seat-key={key} data-animate={motionVisible && visibleSeats.has(key)}
          onFocus={() => { focusedSeat.current = key; }} onBlur={() => { focusedSeat.current = null; }} style={coordinates}
          className="group/seat absolute left-[var(--seat-x)] top-[var(--seat-y)] aspect-square w-[var(--seat-width)] -translate-x-1/2 -translate-y-1/2 focus-within:!z-[10000]">
          <StudyRoomSeat name={presenceExamName(seat.exam)!} index={seat.index} mascot={mascot} detail={seat.detail} inspected={inspected === key} cheering={cheer === key} onCheer={() => cheerSeat(seat)}
            art={mascot.art} />
        </div>;
      })}
      {!hasLearners && <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
        <RoomChihuahua src="/images/home/room-chihuahuas/study/curl-left.png" alt="" className="h-[53%] max-h-52 w-[42%]" />
        <p className="rounded-full bg-card px-4 py-2 text-center text-sm text-muted-foreground shadow-sm">{emptyMessage}</p>
      </div>}
      {measured && measured.hidden > 0 && <span aria-label={`ほか${measured.hidden}人が勉強中`} className="absolute bottom-3 right-3 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-semibold tabular-nums shadow-sm">+{measured.hidden}</span>}
    </div>
    </div>
    {inspectedSeat && inspectedMascot && <div className="flex min-w-0 items-center gap-3 rounded-xl bg-muted/60 px-3 py-2" aria-live="polite" data-testid="study-room-inspected">
      {/* The existing seat tap also makes a crowded hall's outfit and tools readable. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={inspectedMascot.src} alt="" width={112} height={112} loading="lazy" decoding="async" className="size-28 shrink-0 object-contain" />
      <div className="min-w-0 text-sm"><p className="font-semibold">{presenceExamName(inspectedSeat.exam)}</p><p className="mt-1 text-xs text-muted-foreground">{inspectedMascot.stateLabel}</p></div>
    </div>}
    {snapshot && !current && <p className="text-right text-xs text-muted-foreground"><time dateTime={snapshot.measuredAt}>{new Date(snapshot.measuredAt).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" })}</time> 時点</p>}
    <Link href={href} className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground outline-offset-2 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-primary">席について解く</Link>
  </div>;
}
