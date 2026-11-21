import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { passingLineForExam } from "@/lib/study-plan/policy";
import type { PacePlan } from "@/lib/study-plan/pace";

const START_X = 30;
const TRACK_LENGTH = 260;
const FRAME_SIZE = 48;
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

  const beside = stopped ? (percent > 50 ? -25 : 25) : 0;
  return <g ref={runner} transform={`translate(${trackX(stopped ? percent : 0)} 0)`} aria-hidden="true">
    <svg x={-FRAME_SIZE / 2} y={lineY - FRAME_SIZE} width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden">
      <image ref={strip} href={src} width={FRAME_SIZE * 4} height={FRAME_SIZE} x="0" onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
    </svg>
    <text ref={label} x={beside} y={stopped ? 20 : 26} textAnchor={beside < 0 ? "end" : beside > 0 ? "start" : "middle"} fontSize="14" className="fill-primary font-display font-semibold tabular-nums">{`${stopped ? Math.round(percent) : 0}%`}</text>
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
  const lineY = finished ? 53 : 74;
  const height = finished ? 72 : 112;
  const targetX = target === null ? null : trackX(target);
  const endX = trackX(100);
  const label = finished ? "試験終了" : target === null ? "受験日未設定" : `今日の目標${Math.round(target)}%`;
  return <svg viewBox={`0 0 320 ${height}`} className={finished ? "block h-[72px] w-full" : "block h-28 w-full"} role="img" aria-label={`進み具合${Math.round(percent)}%、${label}`}>
    <line x1={START_X} y1={lineY} x2={endX} y2={lineY} strokeWidth="4" strokeLinecap="round" className="stroke-progress-track" />
    {Array.from({ length: 11 }, (_, tick) => <line key={tick} x1={trackX(tick * 10)} x2={trackX(tick * 10)} y1={lineY + 2} y2={lineY + 6} className="stroke-muted-foreground/60" />)}
    <line ref={fillRef} x1={START_X} y1={lineY} x2={trackX(finished ? percent : 0)} y2={lineY} strokeWidth="4" strokeLinecap="round" className="stroke-primary" />
    {!finished && deadline && bandEnd > bandStart && <>
      <rect x={trackX(bandStart)} y="82" width={trackX(bandEnd) - trackX(bandStart)} height="3" rx="1.5" className="fill-warning-soft-foreground" />
      <text x={START_X} y="109" fontSize="10" className="fill-warning-soft-foreground">申込{plan.registration?.estimated ? "（予定）" : "期間"}</text>
    </>}
    {!finished && !passing.isDefault && passing.sourceUrl && <>
      <line x1={trackX(passing.percent)} x2={trackX(passing.percent)} y1="69" y2="83" className="stroke-muted-foreground" />
      <text x={trackX(passing.percent)} y="109" fontSize="10" textAnchor="middle" className="fill-muted-foreground">{passing.conditions?.includes("IRT") ? "基準点" : "合格ライン"}</text>
    </>}
    {!finished && targetX !== null && <g className="fill-shu">
      <path data-testid="pace-target-flag" d={`M${targetX} 4h10l-2 3 2 3h-10z`} />
      <line x1={targetX} x2={targetX} y1="4" y2="73" strokeDasharray="2 3" className="stroke-shu" />
      <text x={targetX > 215 ? targetX - 5 : targetX + 14} y="11" textAnchor={targetX > 215 ? "end" : "start"} fontSize="11">今日の目標</text>
    </g>}
    <RunningChihuahua key={`${plan.id}/${runArt}`} src={runArt} percent={percent} lineY={lineY} fillRef={fillRef} stopped={finished} />
    <text x={START_X} y={lineY + 16} fontSize="11" className="fill-muted-foreground tabular-nums">{trackDate(plan.startDate)}</text>
    <text x={endX - 15} y={lineY + 16} textAnchor="end" fontSize="11" className="fill-muted-foreground tabular-nums">{plan.examDate ? trackDate(plan.examDate) : "試験日"}</text>
    <path d={`M${endX} ${lineY + 17}v-12h10l-2 3 2 3h-10`} fill="none" strokeWidth="1.5" className="stroke-primary" />
  </svg>;
}

/** The track before a plan exists: the chihuahua waits at the start line. */
export function StartTrack({ runArt }: { runArt: string }) {
  const finish = trackX(100);
  return <svg viewBox="0 0 320 72" className="block h-[72px] w-full" role="img" aria-label="進み具合0%、試験日未設定">
    <line x1={START_X} y1="52" x2={finish} y2="52" strokeWidth="2" strokeDasharray="2 5" strokeLinecap="round" className="stroke-input" />
    <svg y="4" width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden" aria-hidden="true">
      <image href={runArt} width={FRAME_SIZE * 4} height={FRAME_SIZE} />
    </svg>
    <text x={START_X} y="67" fontSize="11" className="fill-muted-foreground">スタート</text>
    <text x={finish} y="67" textAnchor="end" fontSize="11" className="fill-muted-foreground">試験日？</text>
  </svg>;
}
