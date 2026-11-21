import { useLayoutEffect, useRef, useState, type RefObject } from "react";

const START_X = 39;
const TRACK_LENGTH = 244;
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
  const progress = useRef(percent);
  const [startPercent] = useState(percent);
  const [imageReady, setImageReady] = useState(false);

  useLayoutEffect(() => {
    const dog = runner.current;
    const sprite = strip.current;
    const fill = fillRef.current;
    if (!dog || !sprite || !fill) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = progress.current;
    const distance = trackX(percent) - trackX(from);
    const duration = Math.min(1800, Math.max(STRIDE_MS, Math.abs(distance) * 7));
    let request = 0;
    const draw = (value: number, lift: number, frame: number) => {
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
    if (stopped || motion.matches || distance === 0) {
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

  return <g ref={runner} transform={`translate(${trackX(startPercent)} 0)`} aria-hidden="true">
    <svg x={-FRAME_SIZE / 2} y={lineY - FRAME_SIZE + 1} width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden">
      <image ref={strip} href={src} width={FRAME_SIZE * 4} height={FRAME_SIZE} x="0" onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
    </svg>
  </g>;
}

export function PaceTrack({ runArt, mastered, total, stopped = false }: {
  runArt: string; mastered: number; total: number; stopped?: boolean;
}) {
  const fillRef = useRef<SVGLineElement>(null);
  const percent = total ? 100 * mastered / total : 0;
  const lineY = 75;
  return <svg viewBox="0 0 320 101" className="p3-pace-track block w-full" role="img" aria-label={`正解済み ${mastered} / ${total}問`}>
    <Trail lineY={lineY} />
    <line ref={fillRef} x1={START_X} y1={lineY} x2={trackX(percent)} y2={lineY}
      strokeWidth="8" strokeLinecap="round" className="stroke-primary" />
    <FinishFlag lineY={lineY} height={70} />
    <RunningChihuahua key={runArt} src={runArt} percent={percent} lineY={lineY} fillRef={fillRef} stopped={stopped} />
    <text x={START_X} y="97" fontSize="14" className="fill-muted-foreground">0問</text>
    <text x={trackX(100)} y="97" textAnchor="end" fontSize="14" className="fill-muted-foreground">{total}問</text>
  </svg>;
}

function Trail({ lineY }: { lineY: number }) {
  const end = trackX(100);
  return <g aria-hidden="true">
    <line x1={START_X} y1={lineY} x2={end} y2={lineY} strokeWidth="15" strokeLinecap="round" className="p3-trail-edge" />
    <line x1={START_X} y1={lineY} x2={end} y2={lineY} strokeWidth="12" strokeLinecap="round" className="p3-trail-road" />
    {Array.from({ length: 11 }, (_, tick) => <line key={tick} x1={trackX(tick * 10)} x2={trackX(tick * 10)} y1={lineY - 4} y2={lineY + 4} className="p3-trail-tick" />)}
    <circle cx={START_X} cy={lineY} r="3.5" className="fill-primary" />
  </g>;
}

function FinishFlag({ lineY, height = 56 }: { lineY: number; height?: number }) {
  const x = trackX(100) + 11;
  return <path aria-hidden="true" d={`M${x} ${lineY}v-${height}l11 4-11 5`} strokeWidth="1.5" className="p3-trail-flag" />;
}

/** The track before a plan exists: the chihuahua waits at the start line. */
export function StartTrack({ runArt }: { runArt: string }) {
  const finish = trackX(100);
  const lineY = 73;
  return <svg viewBox="0 0 320 96" className="p3-pace-track block w-full" role="img" aria-label="チワワがスタートで待機中">
    <Trail lineY={lineY} />
    <svg x={START_X - FRAME_SIZE / 2} y={lineY - FRAME_SIZE + 1} width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden" aria-hidden="true">
      <image href={runArt} width={FRAME_SIZE * 4} height={FRAME_SIZE} />
    </svg>
    <FinishFlag lineY={lineY} />
    <text x={START_X} y="94" fontSize="14" className="fill-muted-foreground">スタート</text>
    <text x={finish} y="94" textAnchor="end" fontSize="14" className="fill-muted-foreground">ゴール</text>
  </svg>;
}
