"use client";

import { LS_KEYS } from "@/lib/storage/keys";

export type BgmId = "off" | "lofi" | "white" | "rain" | "cafe" | "binaural-focus";

export interface BgmTrack {
  id: BgmId;
  label: string;
  description: string;
  builder: (ctx: AudioContext, gain: GainNode) => () => void;
}

export const BGM_TRACKS: BgmTrack[] = [
  {
    id: "off",
    label: "オフ",
    description: "BGM を再生しません。",
    builder: () => () => {},
  },
  {
    id: "white",
    label: "ホワイトノイズ",
    description: "周囲の生活音をマスクし、集中の没入感を上げます。",
    builder: buildWhiteNoise,
  },
  {
    id: "rain",
    label: "雨音",
    description: "ピンクノイズ寄りの落ち着いた雨音。長時間学習向け。",
    builder: buildRain,
  },
  {
    id: "cafe",
    label: "カフェの環境音",
    description: "低周波のざわめき。家でも図書館気分で集中できます。",
    builder: buildCafe,
  },
  {
    id: "binaural-focus",
    label: "バイノーラル（集中）",
    description: "左右で僅差の周波数を流します。要ヘッドホン。",
    builder: buildBinaural,
  },
  {
    id: "lofi",
    label: "Lo-Fi 風 ループ",
    description: "シンプルなコード進行のループ。長時間でも疲れにくい音色。",
    builder: buildLofi,
  },
];

export function getStoredBgm(): BgmId {
  if (typeof window === "undefined") return "off";
  try {
    const v = window.localStorage.getItem(LS_KEYS.audioBgm) as BgmId | null;
    if (v && BGM_TRACKS.some((t) => t.id === v)) return v;
  } catch {
    // ignore
  }
  return "off";
}

export function setStoredBgm(id: BgmId): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.audioBgm, id);
  } catch {
    // ignore
  }
}

export function getStoredBgmVolume(): number {
  if (typeof window === "undefined") return 0.3;
  try {
    const v = Number(window.localStorage.getItem(LS_KEYS.audioBgmVolume));
    if (Number.isFinite(v) && v >= 0 && v <= 1) return v;
  } catch {
    // ignore
  }
  return 0.3;
}

export function setStoredBgmVolume(v: number): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.audioBgmVolume, String(v));
  } catch {
    // ignore
  }
}

function buildWhiteNoise(ctx: AudioContext, gain: GainNode): () => void {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;
  src.connect(gain);
  src.start();
  return () => {
    try {
      src.stop();
    } catch {
      // ignore
    }
    src.disconnect();
  };
}

function buildRain(ctx: AudioContext, gain: GainNode): () => void {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2000;

  src.connect(filter);
  filter.connect(gain);
  src.start();
  return () => {
    try {
      src.stop();
    } catch {
      // ignore
    }
    src.disconnect();
    filter.disconnect();
  };
}

function buildCafe(ctx: AudioContext, gain: GainNode): () => void {
  const bufferSize = ctx.sampleRate * 6;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const w = Math.random() * 2 - 1;
    last = 0.97 * last + 0.03 * w;
    data[i] = last * 2 + Math.sin((i / ctx.sampleRate) * 2 * Math.PI * 90) * 0.05;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 800;

  src.connect(filter);
  filter.connect(gain);
  src.start();
  return () => {
    try {
      src.stop();
    } catch {
      // ignore
    }
    src.disconnect();
    filter.disconnect();
  };
}

function buildBinaural(ctx: AudioContext, gain: GainNode): () => void {
  const merger = ctx.createChannelMerger(2);
  const left = ctx.createOscillator();
  const right = ctx.createOscillator();
  left.frequency.value = 200;
  right.frequency.value = 210;
  left.type = "sine";
  right.type = "sine";

  const lGain = ctx.createGain();
  const rGain = ctx.createGain();
  lGain.gain.value = 0.5;
  rGain.gain.value = 0.5;

  left.connect(lGain).connect(merger, 0, 0);
  right.connect(rGain).connect(merger, 0, 1);
  merger.connect(gain);

  left.start();
  right.start();
  return () => {
    try {
      left.stop();
      right.stop();
    } catch {
      // ignore
    }
    left.disconnect();
    right.disconnect();
    lGain.disconnect();
    rGain.disconnect();
    merger.disconnect();
  };
}

function buildLofi(ctx: AudioContext, gain: GainNode): () => void {
  const notes = [261.63, 329.63, 392.0, 493.88, 392.0, 329.63];
  const stops: Array<() => void> = [];
  let idx = 0;
  let lastOsc: OscillatorNode | null = null;
  let lastG: GainNode | null = null;

  const tick = () => {
    if (lastOsc) {
      try {
        lastOsc.stop();
      } catch {
        // ignore
      }
    }
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = notes[idx % notes.length];
    g.gain.value = 0;
    g.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);
    g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.95);
    o.connect(g).connect(gain);
    o.start();
    o.stop(ctx.currentTime + 1);
    lastOsc = o;
    lastG = g;
    idx += 1;
  };

  tick();
  const interval = setInterval(tick, 1000);
  stops.push(() => clearInterval(interval));
  stops.push(() => {
    if (lastG) lastG.disconnect();
    if (lastOsc) {
      try {
        lastOsc.stop();
      } catch {
        // ignore
      }
      lastOsc.disconnect();
    }
  });
  return () => {
    for (const s of stops) s();
  };
}
