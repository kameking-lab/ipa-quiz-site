import { useLayoutEffect, useRef, useState, type RefObject } from "react";

import { paceRunSprite } from "@/lib/home/pace-run";

const START_X = 39;
const TRACK_LENGTH = 244;
const TRACK_WIDTH = 320;
const FRAME_SIZE = 72;
const RUNNER_SIZE = 84;
const BOUNCE_HEIGHT = 1.25;
const STRIDE_MS = 320;

function trackX(percent: number) {
  return START_X + Math.max(0, Math.min(100, percent)) * TRACK_LENGTH / 100;
}

function runnerFrameX(center: number) {
  const left = Math.max(0, Math.min(TRACK_WIDTH - RUNNER_SIZE, center - RUNNER_SIZE / 2));
  return left - center;
}

function RunningChihuahua({ src, frames, percent, lineY, fillRef, stopped }: {
  src: string;
  frames: number;
  percent: number;
  lineY: number;
  fillRef: RefObject<SVGLineElement | null>;
  stopped?: boolean;
}) {
  const runner = useRef<SVGGElement>(null);
  const frame = useRef<SVGSVGElement>(null);
  const strip = useRef<SVGImageElement>(null);
  const [startPercent] = useState(() => frames > 4 && !stopped ? 0 : percent);
  const progress = useRef(startPercent);
  const [imageReady, setImageReady] = useState(false);

  useLayoutEffect(() => {
    const dog = runner.current;
    const viewport = frame.current;
    const sprite = strip.current;
    const fill = fillRef.current;
    if (!dog || !viewport || !sprite || !fill) return;
    const usesCssAnimation = frames > 4;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const from = progress.current;
    const distance = trackX(percent) - trackX(from);
    const duration = Math.min(1800, Math.max(STRIDE_MS, Math.abs(distance) * 7));
    let request = 0;
    const draw = (value: number, lift: number, frameIndex: number) => {
      progress.current = value;
      const x = trackX(value);
      fill.setAttribute("x2", String(x));
      dog.setAttribute("transform", `translate(${x} ${-lift})`);
      viewport.setAttribute("x", String(runnerFrameX(x)));
      if (!usesCssAnimation) sprite.setAttribute("x", String(-frameIndex * FRAME_SIZE));
    };
    function finish() {
      cancelAnimationFrame(request);
      request = 0;
      dog?.removeAttribute("data-pace-running");
      draw(percent, 0, 0);
    }
    if (stopped || motion.matches || document.hidden || distance === 0) {
      finish();
      return;
    }
    if (!imageReady) {
      draw(from, 0, 0);
      return;
    }
    let start = 0;
    function advance(now: number) {
      if (document.hidden || motion.matches) return finish();
      const elapsed = Math.max(0, now - start);
      if (elapsed >= duration) return finish();
      const value = from + (percent - from) * elapsed / duration;
      if (usesCssAnimation) {
        draw(value, 0, 0);
      } else {
        const stride = (elapsed % STRIDE_MS) / STRIDE_MS;
        draw(value, BOUNCE_HEIGHT * Math.sin(Math.PI * stride), Math.floor(stride * frames));
      }
      request = requestAnimationFrame(advance);
    }
    function updateVisibility(inView: boolean) {
      if (!inView || document.hidden || motion.matches) return finish();
      if (request || progress.current === percent) return;
      start = performance.now();
      if (usesCssAnimation) dog?.setAttribute("data-pace-running", "");
      request = requestAnimationFrame(advance);
    }
    const suspend = () => { if (document.hidden || motion.matches) finish(); };
    const track = dog.ownerSVGElement;
    const observer = typeof IntersectionObserver === "undefined" || !track ? null
      : new IntersectionObserver(([entry]) => updateVisibility(entry.isIntersecting));
    if (observer && track) observer.observe(track);
    else updateVisibility(true);
    document.addEventListener("visibilitychange", suspend);
    motion.addEventListener("change", suspend);
    return () => {
      cancelAnimationFrame(request);
      dog.removeAttribute("data-pace-running");
      observer?.disconnect();
      document.removeEventListener("visibilitychange", suspend);
      motion.removeEventListener("change", suspend);
    };
  }, [fillRef, frames, imageReady, percent, stopped]);

  const startX = trackX(startPercent);
  return <g ref={runner} transform={`translate(${startX} 0)`} aria-hidden="true" className="p3-track-runner" data-pace-sprite={frames > 4 ? "v2" : undefined}>
    <svg ref={frame} x={runnerFrameX(startX)} y={lineY - RUNNER_SIZE + 1} width={RUNNER_SIZE} height={RUNNER_SIZE}
      viewBox={`0 0 ${FRAME_SIZE} ${FRAME_SIZE}`} className="overflow-hidden">
      <image ref={strip} href={src} width={FRAME_SIZE * frames} height={FRAME_SIZE} x="0" onLoad={() => setImageReady(true)} onError={() => setImageReady(true)} />
    </svg>
  </g>;
}

export function PaceTrack({ runArt, mastered, total, stopped = false }: {
  runArt: string; mastered: number; total: number; stopped?: boolean;
}) {
  const fillRef = useRef<SVGLineElement>(null);
  const sprite = paceRunSprite(runArt);
  const percent = total ? 100 * mastered / total : 0;
  const lineY = 75;
  return <svg viewBox={`0 -10 ${TRACK_WIDTH} 111`} className="p3-pace-track block w-full" role="img" aria-label={`正解済み ${mastered} / ${total}問`}>
    <Trail lineY={lineY} />
    <line ref={fillRef} x1={START_X} y1={lineY} x2={trackX(percent)} y2={lineY}
      strokeWidth="8" strokeLinecap="round" className="p3-trail-progress stroke-primary" />
    <FinishFlag lineY={lineY} height={70} />
    <RunningChihuahua key={sprite.src} {...sprite} percent={percent} lineY={lineY} fillRef={fillRef} stopped={stopped} />
    <TrackLabel x={START_X} y={97}>0問</TrackLabel>
    <TrackLabel x={trackX(100)} y={97} end>{`${total}問`}</TrackLabel>
  </svg>;
}

function TrackLabel({ x, y, end = false, children }: { x: number; y: number; end?: boolean; children: string }) {
  const width = children.length * 14 + 8;
  return <g>
    <rect className="p3-event-tick-panel" data-event-panel="ticks" aria-hidden="true"
      x={end ? x - width + 4 : x - 4} y={y - 14} width={width} height={19} rx={5} />
    <text x={x} y={y} textAnchor={end ? "end" : "start"} fontSize="14"
      className="fill-muted-foreground p3-scene-tick-label">{children}</text>
  </g>;
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
  return <svg viewBox={`0 0 ${TRACK_WIDTH} 96`} className="p3-pace-track block w-full" role="img" aria-label="チワワがスタートで待機中">
    <Trail lineY={lineY} />
    <svg x={START_X - FRAME_SIZE / 2} y={lineY - FRAME_SIZE + 1} width={FRAME_SIZE} height={FRAME_SIZE} className="overflow-hidden" aria-hidden="true">
      <image href={runArt} width={FRAME_SIZE * 4} height={FRAME_SIZE} />
    </svg>
    <FinishFlag lineY={lineY} />
    <TrackLabel x={START_X} y={94}>スタート</TrackLabel>
    <TrackLabel x={finish} y={94} end>ゴール</TrackLabel>
  </svg>;
}
