// Client-side short-form video generator using Canvas + MediaRecorder.
// Produces a vertical 9:16 video (720x1280) suitable for TikTok / Instagram / YouTube Shorts.

export interface VideoFrameSpec {
  width: number;
  height: number;
  fps: number;
  durationSec: number;
}

export const DEFAULT_SPEC: VideoFrameSpec = {
  width: 720,
  height: 1280,
  fps: 30,
  durationSec: 15,
};

export interface VideoSlide {
  caption: string;
  body: string;
  durationSec: number;
  bgGradient: [string, string];
  badge?: string;
}

const FONT_STACK =
  '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", system-ui, sans-serif';

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    let cur = "";
    for (const ch of Array.from(para)) {
      const test = cur + ch;
      if (ctx.measureText(test).width > maxWidth && cur.length > 0) {
        lines.push(cur);
        cur = ch;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
  }
  return lines;
}

function drawSlide(
  ctx: CanvasRenderingContext2D,
  spec: VideoFrameSpec,
  slide: VideoSlide,
  progress: number,
): void {
  const { width, height } = spec;

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, slide.bgGradient[0]);
  grad.addColorStop(1, slide.bgGradient[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle progress bar at top
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(0, 0, width, 8);
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillRect(0, 0, width * Math.min(1, progress), 8);

  // Brand badge
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  const brandX = 40;
  const brandY = 56;
  ctx.beginPath();
  const w = 220;
  const h = 64;
  const r = 18;
  ctx.roundRect(brandX, brandY, w, h, r);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = `700 30px ${FONT_STACK}`;
  ctx.textBaseline = "middle";
  ctx.fillText("過去問AI", brandX + 30, brandY + h / 2);

  if (slide.badge) {
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.beginPath();
    ctx.roundRect(brandX + w + 16, brandY + 8, 200, 48, 14);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = `600 22px ${FONT_STACK}`;
    ctx.fillText(slide.badge, brandX + w + 36, brandY + 32);
  }

  // Caption (top heading)
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.textBaseline = "top";
  ctx.font = `800 44px ${FONT_STACK}`;
  const captionLines = wrap(ctx, slide.caption, width - 100);
  let y = 180;
  for (const line of captionLines.slice(0, 2)) {
    ctx.fillText(line, 50, y);
    y += 56;
  }

  // Body
  ctx.fillStyle = "#ffffff";
  ctx.font = `500 36px ${FONT_STACK}`;
  const bodyLines = wrap(ctx, slide.body, width - 100);
  let by = y + 50;
  const maxBodyLines = Math.floor((height - by - 200) / 50);
  for (const line of bodyLines.slice(0, maxBodyLines)) {
    ctx.fillText(line, 50, by);
    by += 50;
  }

  // Footer URL
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.font = `500 24px ${FONT_STACK}`;
  ctx.textBaseline = "alphabetic";
  ctx.fillText("kakomon-ai.jp", 50, height - 50);
}

export interface RenderOptions {
  spec?: VideoFrameSpec;
  slides: VideoSlide[];
  onProgress?: (pct: number) => void;
  onError?: (err: unknown) => void;
}

function pickMimeType(): string {
  const candidates = ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm", "video/mp4"];
  for (const c of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(c)) {
      return c;
    }
  }
  return "video/webm";
}

export async function generateVideoBlob(options: RenderOptions): Promise<Blob> {
  const spec = options.spec ?? DEFAULT_SPEC;
  const canvas =
    typeof OffscreenCanvas !== "undefined"
      ? null
      : (() => {
          const c = document.createElement("canvas");
          c.width = spec.width;
          c.height = spec.height;
          return c;
        })();
  const c =
    canvas ??
    (() => {
      const c2 = document.createElement("canvas");
      c2.width = spec.width;
      c2.height = spec.height;
      return c2;
    })();
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("canvas 2d context unavailable");

  // captureStream is not in older lib.dom typings on every TS version.
  const stream = (c as HTMLCanvasElement & { captureStream: (fps: number) => MediaStream }).captureStream(spec.fps);

  const mimeType = pickMimeType();
  const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 2_500_000 });
  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  const totalFrames = spec.fps * spec.durationSec;
  const slideTotal = options.slides.reduce((s, sl) => s + sl.durationSec, 0) || spec.durationSec;

  const stopped = new Promise<void>((resolve) => {
    recorder.onstop = () => resolve();
  });

  recorder.start();

  for (let frame = 0; frame < totalFrames; frame++) {
    const t = frame / spec.fps;
    let acc = 0;
    let active = options.slides[0];
    let activeStart = 0;
    for (const sl of options.slides) {
      if (t < acc + sl.durationSec) {
        active = sl;
        activeStart = acc;
        break;
      }
      acc += sl.durationSec;
    }
    const localT = t - activeStart;
    const localProgress = active ? localT / active.durationSec : 0;
    drawSlide(ctx, spec, active, t / slideTotal);
    if (active) {
      // optional fade in/out
      if (localProgress < 0.08) {
        const a = 1 - localProgress / 0.08;
        ctx.fillStyle = `rgba(0,0,0,${a * 0.6})`;
        ctx.fillRect(0, 0, spec.width, spec.height);
      } else if (localProgress > 0.92) {
        const a = (localProgress - 0.92) / 0.08;
        ctx.fillStyle = `rgba(0,0,0,${a * 0.6})`;
        ctx.fillRect(0, 0, spec.width, spec.height);
      }
    }

    options.onProgress?.(Math.round((frame / totalFrames) * 100));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
  }

  recorder.stop();
  await stopped;

  const blob = new Blob(chunks, { type: mimeType });
  options.onProgress?.(100);
  return blob;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export function buildSlidesForQuestion(input: {
  examLabel: string;
  yearSeason: string;
  questionText: string;
  answerText: string;
  explanationSummary: string;
}): VideoSlide[] {
  const intro: VideoSlide = {
    caption: `${input.examLabel} ${input.yearSeason}`,
    body: "解いてみよう！\nスライド左から問題→正解→解説の順で表示されます。",
    durationSec: 3,
    bgGradient: ["#0ea5e9", "#1e40af"],
    badge: "問題",
  };
  const question: VideoSlide = {
    caption: "Q. 問題",
    body: input.questionText,
    durationSec: 6,
    bgGradient: ["#1e293b", "#0f172a"],
    badge: "Question",
  };
  const answer: VideoSlide = {
    caption: "A. 正解",
    body: input.answerText,
    durationSec: 3,
    bgGradient: ["#059669", "#047857"],
    badge: "Answer",
  };
  const explanation: VideoSlide = {
    caption: "解説",
    body: input.explanationSummary,
    durationSec: 3,
    bgGradient: ["#7c3aed", "#4f46e5"],
    badge: "Why",
  };
  return [intro, question, answer, explanation];
}
