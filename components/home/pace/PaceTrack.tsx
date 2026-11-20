import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { passingLineForExam } from "@/lib/study-plan/policy";
import type { PacePlan } from "@/lib/study-plan/pace";

const START_X = 30;
const TRACK_LENGTH = 260;
const FRAME_SIZE = 52;
const BOUNCE_HEIGHT = 1.25;
const STRIDE_MS = 320;

function trackX(percent: number) {
  return START_X + Math.max(0, Math.min(100, percent)) * TRACK_LENGTH / 100;
}

function RunningChihuahua({ src, percent, fillRef }: {
  src: string;
  percent: number;
  fillRef: RefObject<SVGLineElement | null>;
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
    if (!dog || !sprite || !readout || !fill) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = progress.current;
    const distance = trackX(percent) - trackX(from);
    const duration = Math.min(1800, Math.max(STRIDE_MS, distance * 7));
    let request = 0;
    const draw = (value: number, lift: number, frame: number) => {
      if (Math.round(value) !== Math.round(progress.current)) {
        readout.textContent = `${Math.round(value)}%`;
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
    if (motion.matches || distance <= 0) {
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
  }, [fillRef, imageReady, percent]);

  return <g ref={runner} transform={`translate(${START_X} 0)`} aria-hidden="true">
    <rect x="-20" y="10" width="40" height="19" rx="8" className="fill-card" />
    <text ref={label} y="27" textAnchor="middle" fontSize="14" className="fill-primary font-display font-bold tabular-nums">0%</text>
    <svg x={-FRAME_SIZE / 2} y="30" width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden">
      <image ref={strip} href={src} width={FRAME_SIZE * 4} height={FRAME_SIZE} x="0" onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
    </svg>
  </g>;
}

// SVG coordinates allow percentage positions without inline style or generated Tailwind classes.
export function PaceTrack({ plan, runArt, percent, target }: { plan: PacePlan; runArt: string; percent: number; target: number | null }) {
  const fillRef = useRef<SVGLineElement>(null);
  const passing = passingLineForExam(plan.exam);
  const start = plan.registration?.start;
  const deadline = plan.registration?.deadline;
  const span = plan.examDate ? Date.parse(plan.examDate) - Date.parse(plan.startDate) : 0;
  const at = (date: string) => span > 0 ? Math.max(0, Math.min(100, (Date.parse(date) - Date.parse(plan.startDate)) * 100 / span)) : 0;
  const bandStart = start ? at(start) : 0, bandEnd = deadline ? at(deadline) : 0;
  return <div className="block w-full rounded-xl">
    <svg viewBox="0 -19 320 131" className="mx-auto h-[131px] w-full max-w-[420px] overflow-visible" role="img" aria-label={`進み具合${Math.round(percent)}%、${target === null ? "受験日未設定" : `今日の目標${Math.round(target)}%`}`}>
      <line x1="30" y1="79" x2="290" y2="79" strokeWidth="8" strokeLinecap="round" className="stroke-progress-track" />
      {deadline && bandEnd > bandStart && <g><rect x={trackX(bandStart)} y="71" width={trackX(bandEnd) - trackX(bandStart)} height="16" rx="4" className="fill-warning-soft stroke-warning-soft-foreground/35" /><text x={(trackX(bandStart) + trackX(bandEnd)) / 2} y="105" textAnchor="middle" fontSize="9" className="fill-warning-soft-foreground">申込{plan.registration?.estimated ? "（予定）" : "期間"}</text></g>}
      <line ref={fillRef} x1={START_X} y1="79" x2={START_X} y2="79" strokeWidth="8" strokeLinecap="round" className="stroke-primary" />
      {!passing.isDefault && passing.sourceUrl && <g><line x1={trackX(passing.percent)} x2={trackX(passing.percent)} y1="76" y2="88" className="stroke-muted-foreground" /><text x={trackX(passing.percent)} y="94" fontSize="9" textAnchor="middle" className="fill-muted-foreground">{passing.conditions?.includes("IRT") ? "基準点" : "合格ライン"}</text></g>}
      {/* Leave space for the runner's readout and bounce even when both marks are at the same percentage. */}
      {target !== null && <g>
        <line x1={trackX(target)} x2={trackX(target)} y1="-1" y2="75" strokeWidth="2" className="stroke-warning-soft-foreground" />
        <path d={`M${trackX(target)} -1 h12 l-2 4 2 4h-12z`} className="fill-warning-soft-foreground" />
        <text x={trackX(target)} y="-6" textAnchor="middle" fontSize="10" className="fill-muted-foreground">今日の目標</text>
      </g>}
      <RunningChihuahua key={`${plan.id}/${runArt}`} src={runArt} percent={percent} fillRef={fillRef} />
      <text x="30" y="94" fontSize="10" className="fill-muted-foreground">{plan.startDate ? `${Number(plan.startDate.slice(5, 7))}/${Number(plan.startDate.slice(8))}` : "スタート"}</text><text x="290" y="94" textAnchor="end" fontSize="10" className="fill-muted-foreground">{plan.examDate ? `${Number(plan.examDate.slice(5, 7))}/${Number(plan.examDate.slice(8))}` : "試験日"}</text>
      <path d="M296 99V85c4-3 8 3 12 0v8c-4 3-8-3-12 0" fill="none" strokeWidth="1.5" className="stroke-primary" />
    </svg>
  </div>;
}

/** The track before a plan exists: the chihuahua waits at the start line. */
export function StartTrack({ runArt }: { runArt: string }) {
  const fillRef = useRef<SVGLineElement>(null);
  const finish = trackX(100);
  return <svg viewBox="0 8 320 94" className="mx-auto block h-auto w-full max-w-[240px]" role="img" aria-label="進み具合0%、試験日未設定">
    <line x1={START_X} y1="79" x2={finish} y2="79" strokeWidth="8" strokeLinecap="round" className="stroke-progress-track" />
    <line ref={fillRef} x1={START_X} y1="79" x2={START_X} y2="79" strokeWidth="8" strokeLinecap="round" className="stroke-primary" />
    <RunningChihuahua src={runArt} percent={0} fillRef={fillRef} />
    <text x={START_X} y="95" fontSize="14" className="fill-muted-foreground">スタート</text>
    <text x={finish} y="95" textAnchor="end" fontSize="14" className="fill-muted-foreground">試験日？</text>
  </svg>;
}
