import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { passingLineForExam } from "@/lib/study-plan/policy";
import type { PacePlan } from "@/lib/study-plan/pace";

const START_X = 39;
const TRACK_LENGTH = 246;
const FRAME_SIZE = 72;
const BOUNCE_HEIGHT = 1.25;
const STRIDE_MS = 320;

function trackX(percent: number) {
  return START_X + Math.max(0, Math.min(100, percent)) * TRACK_LENGTH / 100;
}

function RunningChihuahua({ src, percent, lineY, fillRef, stopped }: {
  src: string;
  percent: number;
  lineY: number;
  fillRef: RefObject<SVGLineElement | null>;
  stopped?: boolean;
}) {
  const runner = useRef<SVGGElement>(null);
  const strip = useRef<SVGImageElement>(null);
  const label = useRef<SVGTextElement>(null);
  const progress = useRef(0);
  const [imageReady, setImageReady] = useState(false);

  useLayoutEffect(() => {
    const dog = runner.current;
    const sprite = strip.current;
    const readout = label.current;
    const fill = fillRef.current;
    if (!dog || !sprite || !fill) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = progress.current;
    const distance = trackX(percent) - trackX(from);
    const duration = Math.min(1800, Math.max(STRIDE_MS, distance * 7));
    let request = 0;
    const draw = (value: number, lift: number, frame: number) => {
      const anchor = value > 50 ? "end" : "start";
      if (readout && readout.getAttribute("text-anchor") !== anchor) {
        readout.setAttribute("text-anchor", anchor);
        readout.setAttribute("x", String(value > 50 ? -FRAME_SIZE / 2 : FRAME_SIZE / 2));
      }
      if (readout?.firstChild && Math.round(value) !== Math.round(progress.current)) {
        readout.firstChild.nodeValue = `${Math.round(value)}%`;
      }
      progress.current = value;
      const x = trackX(value);
      fill.setAttribute("x2", String(x));
      dog.setAttribute("transform", `translate(${x} ${-lift})`);
      sprite.setAttribute("x", String(-frame * FRAME_SIZE));
    };
    function finish() {
      cancelAnimationFrame(request);
      draw(percent, 0, 0);
    }
    if (stopped || motion.matches || distance <= 0) {
      finish();
      return;
    }
    if (!imageReady) {
      draw(from, 0, 0);
      return;
    }
    const start = performance.now();
    function advance(now: number) {
      const elapsed = Math.max(0, now - start);
      if (elapsed >= duration) return finish();
      const stride = (elapsed % STRIDE_MS) / STRIDE_MS;
      draw(from + (percent - from) * elapsed / duration, BOUNCE_HEIGHT * Math.sin(Math.PI * stride), Math.floor(stride * 4));
      request = requestAnimationFrame(advance);
    }
    request = requestAnimationFrame(advance);
    motion.addEventListener("change", finish);
    return () => {
      cancelAnimationFrame(request);
      motion.removeEventListener("change", finish);
    };
  }, [fillRef, imageReady, percent, stopped]);

  const initialLeft = stopped && percent > 50;
  return <g ref={runner} transform={`translate(${trackX(stopped ? percent : 0)} 0)`} aria-hidden="true">
    <svg x={-FRAME_SIZE / 2} y={lineY - FRAME_SIZE + 1} width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden">
      <image ref={strip} href={src} width={FRAME_SIZE * 4} height={FRAME_SIZE} x="0" onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
    </svg>
    <text ref={label} x={initialLeft ? -FRAME_SIZE / 2 : FRAME_SIZE / 2} y={lineY - 22} textAnchor={initialLeft ? "end" : "start"} fontSize="14" className="fill-current font-display font-semibold tabular-nums">{`${stopped ? Math.round(percent) : 0}%`}</text>
  </g>;
}

function trackDate(date: string) {
  return `${Number(date.slice(5, 7))}/${Number(date.slice(8))}`;
}

// SVG coordinates allow percentage positions without inline style or generated Tailwind classes.
export function PaceTrack({ plan, runArt, percent, target, finished = false }: {
  plan: PacePlan; runArt: string; percent: number; target: number | null; finished?: boolean;
}) {
  const fillRef = useRef<SVGLineElement>(null);
  const passing = passingLineForExam(plan.exam);
  const start = plan.registration?.start;
  const deadline = plan.registration?.deadline;
  const span = plan.examDate ? Date.parse(plan.examDate) - Date.parse(plan.startDate) : 0;
  const at = (date: string) => span > 0 ? Math.max(0, Math.min(100, (Date.parse(date) - Date.parse(plan.startDate)) * 100 / span)) : 0;
  const bandStart = start ? at(start) : 0, bandEnd = deadline ? at(deadline) : 0;
  const lineY = 75;
  const height = finished ? 100 : 118;
  const targetX = target === null ? null : trackX(target);
  const endX = trackX(100);
  const label = finished ? "試験終了" : target === null ? "受験日未設定" : `今日の目標${Math.round(target)}%`;
  return <svg viewBox={`0 0 320 ${height}`} className="p3-pace-track block w-full" role="img" aria-label={`進み具合${Math.round(percent)}%、${label}`}>
    <Trail lineY={lineY} />
    <line ref={fillRef} x1={START_X} y1={lineY} x2={trackX(finished ? percent : 0)} y2={lineY} strokeWidth="8" strokeLinecap="round" className="stroke-primary" />
    {!finished && deadline && bandEnd > bandStart && <>
      <rect x={trackX(bandStart)} y="84" width={trackX(bandEnd) - trackX(bandStart)} height="3" rx="1.5" className="fill-warning-soft-foreground" />
      <text x={START_X} y="115" fontSize="14" className="fill-warning-soft-foreground">申込{plan.registration?.estimated ? "（予定）" : "期間"}</text>
    </>}
    {!finished && !passing.isDefault && passing.sourceUrl && <>
      <line x1={trackX(passing.percent)} x2={trackX(passing.percent)} y1="69" y2="83" className="stroke-muted-foreground" />
      <text x={trackX(passing.percent)} y="115" fontSize="14" textAnchor="middle" className="fill-muted-foreground">{passing.conditions?.includes("IRT") ? "基準点" : "合格ライン"}</text>
    </>}
    {!finished && targetX !== null && <g className="fill-shu">
      <path data-testid="pace-target-flag" d={`M${targetX} 4h10l-2 3 2 3h-10z`} />
      <line x1={targetX} x2={targetX} y1="4" y2="73" strokeDasharray="2 3" className="stroke-shu" />
      <text x={targetX > 215 ? targetX - 5 : targetX + 14} y="14" textAnchor={targetX > 215 ? "end" : "start"} fontSize="14">今日の目標</text>
    </g>}
    <RunningChihuahua key={`${plan.id}/${runArt}`} src={runArt} percent={percent} lineY={lineY} fillRef={fillRef} stopped={finished} />
    <text x={START_X} y={lineY + 18} fontSize="14" className="fill-muted-foreground tabular-nums">{trackDate(plan.startDate)}</text>
    <text x={endX - 15} y={lineY + 18} textAnchor="end" fontSize="14" className="fill-muted-foreground tabular-nums">{plan.examDate ? trackDate(plan.examDate) : "試験日"}</text>

  </svg>;
}

function Trail({ lineY }: { lineY: number }) {
  const end = trackX(100);
  return <g aria-hidden="true">
    <line x1={START_X} y1={lineY} x2={end} y2={lineY} strokeWidth="15" strokeLinecap="round" className="p3-trail-edge" />
    <line x1={START_X} y1={lineY} x2={end} y2={lineY} strokeWidth="12" strokeLinecap="round" className="p3-trail-road" />
    {Array.from({ length: 11 }, (_, tick) => <line key={tick} x1={trackX(tick * 10)} x2={trackX(tick * 10)} y1={lineY - 4} y2={lineY + 4} className="p3-trail-tick" />)}
    <path d={`M${end} ${lineY}v-22l11 4-11 5`} strokeWidth="1.5" className="p3-trail-flag" />
    <circle cx={START_X} cy={lineY} r="3.5" className="fill-primary" />
  </g>;
}

/** The track before a plan exists: the chihuahua waits at the start line. */
export function StartTrack({ runArt }: { runArt: string }) {
  const finish = trackX(100);
  const lineY = 73;
  return <svg viewBox="0 0 320 96" className="p3-pace-track block w-full" role="img" aria-label="進み具合0%、試験日未設定">
    <Trail lineY={lineY} />
    <svg x={START_X - FRAME_SIZE / 2} y={lineY - FRAME_SIZE + 1} width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden" aria-hidden="true">
      <image href={runArt} width={FRAME_SIZE * 4} height={FRAME_SIZE} />
    </svg>
    <text x={START_X} y="94" fontSize="14" className="fill-muted-foreground">スタート</text>
    <text x={finish} y="94" textAnchor="end" fontSize="14" className="fill-muted-foreground">試験日？</text>
  </svg>;
}
