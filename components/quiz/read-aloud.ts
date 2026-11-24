interface NativeSpeech {
  available(options: { lang: string }): Promise<{ available: boolean }>;
  speak(options: { id: string; text: string; lang: string; rate: number },
    callback: (event?: { state: "started" | "finished" | "canceled" }, error?: unknown) => void): void;
  stop(options: { id: string }): Promise<void>;
}

export interface SpeechOutput {
  engine: object;
  needsSilentModeNotice?: boolean;
  chunks: (text: string, rate: number) => string[];
  speak: (text: string, rate: number, callbacks: SpeechCallbacks) => void;
  stop: () => void;
}

interface SpeechCallbacks {
  started: () => void;
  finished: () => void;
  failed: () => void;
  canceled: () => void;
}

function quality(voice: SpeechSynthesisVoice) {
  const name = voice.name;
  const tier = /natural|premium|enhanced|neural|拡張|高品質|プレミアム|siri/i.test(name) ? 3
    : /google|o-ren|kyoko|kyōko|きょうこ/i.test(name) ? 2 : 1;
  return tier * 2 + Number(voice.default);
}

function chooseVoice(voices: SpeechSynthesisVoice[], lang: string) {
  const language = lang.toLowerCase().split(/[-_]/)[0];
  return voices.filter(v => v.localService && v.lang.toLowerCase().split(/[-_]/)[0] === language)
    .sort((a, b) => quality(b) - quality(a))[0];
}

// A short utterance also bounds engines that time out on a single long sentence.
// Split at punctuation where possible, and never cut a surrogate pair in half.
export function speechChunks(text: string, rate: number): string[] {
  const limit = Math.round(44 * Math.min(1, rate));
  const chunks: string[] = [];
  for (const sentence of text.match(/[^。！？!?\n]*[。！？!?\n]+|[^。！？!?\n]+$/gu) ?? []) {
    const chars = Array.from(sentence.trim());
    for (let start = 0; start < chars.length;) {
      let end = Math.min(start + limit, chars.length);
      if (end < chars.length) {
        let boundary = end;
        while (boundary > start && !/[、，,；;：:\s]/u.test(chars[boundary - 1])) boundary--;
        if (boundary > start) end = boundary;
      }
      chunks.push(chars.slice(start, end).join(""));
      start = end;
    }
  }
  return chunks;
}

const lastCancel = new WeakMap<SpeechSynthesis, number>();

export function observeSpeech(lang: string, update: (output: SpeechOutput | null) => void) {
  const cap = (window as Window & { Capacitor?: {
    getPlatform?: () => string; Plugins?: { KakomonSpeech?: NativeSpeech };
  } }).Capacitor;
  if (cap?.getPlatform?.() === "ios") {
    let disposed = false;
    const native = cap.Plugins?.KakomonSpeech;
    if (native) {
      void native.available({ lang }).then(({ available }) => {
        if (disposed || !available) return;
        let id = "";
        update({
          engine: native, chunks: text => [text],
          speak(text, rate, callbacks) {
            id = crypto.getRandomValues(new Uint32Array(4)).join("-");
            native.speak({ id, text, lang, rate }, (event, error) => {
              if (error || !event) callbacks.failed();
              else if (event.state === "started") callbacks.started();
              else if (event.state === "finished") callbacks.finished();
              else callbacks.canceled();
            });
          },
          stop() { void native.stop({ id }).catch(() => {}); },
        });
      }).catch(() => {});
    }
    return () => { disposed = true; };
  }

  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance !== "function") return;
  const needsSilentModeNotice = /\biPhone\b/i.test(window.navigator.userAgent);
  const refresh = () => {
    let voice: SpeechSynthesisVoice | undefined;
    try { voice = chooseVoice(synth.getVoices(), lang); } catch { update(null); return; }
    if (!voice) { update(null); return; }
    const selected = voice;
    // Keep a reference while speaking; after a stop older callbacks can still arrive.
    let current: SpeechSynthesisUtterance | null = null;
    let retryTimer: number;
    update({
      engine: synth, needsSilentModeNotice, chunks: speechChunks,
      speak(text, rate, callbacks) {
        // Some engines discard the first request following a recent cancellation.
        // Submit in the gesture first; retry once only if the queue reports it was dropped.
        const recentlyCanceled = performance.now() - (lastCancel.get(synth) ?? -Infinity) < 500;
        const submit = (mayRetry: boolean) => {
          const u = new window.SpeechSynthesisUtterance(text);
          current = u;
          u.voice = selected;
          u.lang = selected.lang;
          u.rate = rate;
          let started = false;
          const retry = () => {
            if (current !== u || started) return;
            try { submit(false); } catch { callbacks.failed(); }
          };
          u.onstart = () => {
            if (current !== u) return;
            started = true;
            window.clearTimeout(retryTimer);
            callbacks.started();
          };
          u.onend = () => {
            if (current !== u) return;
            window.clearTimeout(retryTimer);
            callbacks.finished();
          };
          u.onerror = ({ error }) => {
            if (current !== u) return;
            window.clearTimeout(retryTimer);
            if (error === "interrupted" || error === "canceled") {
              if (mayRetry && !started) retryTimer = window.setTimeout(retry, 100);
              else if (!started) callbacks.failed();
              else callbacks.canceled();
            } else callbacks.failed();
          };
          if (mayRetry) retryTimer = window.setTimeout(() => {
            if (!synth.speaking && !synth.pending) retry();
          }, 250);
          if (synth.paused) synth.resume();
          synth.speak(u);
        };
        submit(recentlyCanceled);
      },
      stop() {
        window.clearTimeout(retryTimer);
        if (!current) return;
        current = null;
        lastCancel.set(synth, performance.now());
        synth.cancel();
      },
    });
  };
  synth.addEventListener("voiceschanged", refresh);
  refresh();
  return () => synth.removeEventListener("voiceschanged", refresh);
}
