"use client";

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioCtx) return audioCtx;
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
    return audioCtx;
  } catch {
    return null;
  }
}

function tone(freq: number, durationMs: number, startOffsetMs = 0, type: OscillatorType = "sine") {
  const ctx = getCtx();
  if (!ctx) return;
  const start = ctx.currentTime + startOffsetMs / 1000;
  const end = start + durationMs / 1000;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(0.18, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, end);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(end + 0.02);
}

export function playPiroro(level: "small" | "big" = "small") {
  if (level === "big") {
    [880, 1175, 1480, 1760].forEach((f, i) => tone(f, 110, i * 90, "triangle"));
    return;
  }
  [660, 880, 1100].forEach((f, i) => tone(f, 90, i * 70, "triangle"));
}
