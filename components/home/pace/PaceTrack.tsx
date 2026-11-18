import { useId, useLayoutEffect, useRef, useState, type RefObject } from "react";
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
    <text ref={label} y="77" textAnchor="middle" fontSize="14" strokeWidth="3" strokeLinejoin="round" paintOrder="stroke" className="fill-primary stroke-card font-semibold tabular-nums">0%</text>
    <svg x={-FRAME_SIZE / 2} y="79" width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden">
      <image ref={strip} href={src} width={FRAME_SIZE * 4} height={FRAME_SIZE} x="0" onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
    </svg>
  </g>;
}

// SVG coordinates allow percentage positions without inline style or generated Tailwind classes.
export function PaceTrack({ plan, runArt, percent, target, onOpen, expanded = false }: { plan: PacePlan; runArt: string; percent: number; target: number | null; onOpen: () => void; expanded?: boolean }) {
  const meterId = useId();
  const fillRef = useRef<SVGLineElement>(null);
  const passing = passingLineForExam(plan.exam);
  const start = plan.registration?.start;
  const deadline = plan.registration?.deadline;
  const span = plan.examDate ? Date.parse(plan.examDate) - Date.parse(plan.startDate) : 0;
  const at = (date: string) => span > 0 ? Math.max(0, Math.min(100, (Date.parse(date) - Date.parse(plan.startDate)) * 100 / span)) : 0;
  const bandStart = start ? at(start) : 0, bandEnd = deadline ? at(deadline) : 0;
  return <button type="button" onClick={onOpen} aria-label="学習計画の詳細を開く" aria-describedby={meterId} aria-haspopup="dialog" aria-expanded={expanded} className="block w-full rounded-xl">
    <svg id={meterId} viewBox="-16 0 352 184" className="mx-auto h-[164px] w-full overflow-visible sm:h-[176px]" role="img" aria-label={`進み具合${Math.round(percent)}%、${target === null ? "受験日未設定" : `今日の目標${Math.round(target)}%`}`}>
      {deadline && bandEnd > bandStart && <g><rect x={trackX(bandStart)} y="12" width={trackX(bandEnd) - trackX(bandStart)} height="15" rx="7" className="fill-amber-100 dark:fill-amber-900" /><text x={(trackX(bandStart) + trackX(bandEnd)) / 2} y="23" textAnchor="middle" fontSize="9" className="fill-amber-800 dark:fill-amber-200">申込{plan.registration?.estimated ? "（予定）" : "期間"}</text></g>}
      <line x1="30" y1="128" x2="290" y2="128" strokeWidth="5" strokeLinecap="round" className="stroke-muted" />
      <line ref={fillRef} x1={START_X} y1="128" x2={START_X} y2="128" strokeWidth="5" strokeLinecap="round" className="stroke-primary" />
      {!passing.isDefault && passing.sourceUrl && <g><line x1={trackX(passing.percent)} x2={trackX(passing.percent)} y1="123" y2="135" className="stroke-muted-foreground" /><text x={trackX(passing.percent)} y="151" fontSize="10" textAnchor="middle" className="fill-muted-foreground">{passing.conditions?.includes("IRT") ? "基準点" : "合格ライン"}</text></g>}
      {target !== null && <g><line x1={trackX(target)} x2={trackX(target)} y1="35" y2="125" strokeDasharray="3 4" className="stroke-amber-500" /><path d={`M${trackX(target)} 35 l17 0 -4 7 4 7 -17 0z`} className="fill-amber-400" /><text x={Math.max(58, Math.min(262, trackX(target)))} y="30" textAnchor="middle" fontSize="11" className="fill-muted-foreground">今日の目標</text></g>}
      <path d="M290 128V100m0 0c6-5 12 5 18 0v14c-6 5-12-5-18 0" fill="none" strokeWidth="2" className="stroke-primary" />
      <RunningChihuahua key={`${plan.id}/${runArt}`} src={runArt} percent={percent} fillRef={fillRef} />
      <text x="30" y="174" fontSize="11" className="fill-muted-foreground">スタート</text><text x="290" y="174" textAnchor="end" fontSize="11" className="fill-muted-foreground">試験日</text>
    </svg>
  </button>;
}
