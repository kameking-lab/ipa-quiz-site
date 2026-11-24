import { beforeEach, afterEach, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { TTSButton } from "@/components/quiz/TTSButton";
import { speechChunks } from "@/components/quiz/read-aloud";

const voice = (name: string, lang = "ja-JP") => ({ name, lang, localService: true, default: false });
const japanese = voice("Kyoko");
let voices = [japanese];
let spoken: SpeechSynthesisUtterance[];
let engine: EventTarget & { cancel: ReturnType<typeof vi.fn>; speak: ReturnType<typeof vi.fn> };

beforeEach(() => {
  window.localStorage.clear();
  spoken = [];
  voices = [japanese];
  engine = Object.assign(new EventTarget(), {
    getVoices: () => voices, cancel: vi.fn(),
    speak: vi.fn((utterance: SpeechSynthesisUtterance) => spoken.push(utterance)),
  });
  vi.stubGlobal("speechSynthesis", engine);
  vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

function play(name = "Read") { fireEvent.click(screen.getByRole("button", { name })); }
function start(u: SpeechSynthesisUtterance) { act(() => u.onstart?.call(u, new Event("start") as SpeechSynthesisEvent)); }
function end(u: SpeechSynthesisUtterance) { act(() => u.onend?.call(u, new Event("end") as SpeechSynthesisEvent)); }
function fail(u: SpeechSynthesisUtterance) { act(() => u.onerror?.call(u, { error: "network" } as SpeechSynthesisErrorEvent)); }

it("waits for a matching voice and speaks with the best Japanese voice in the click", () => {
  voices = [];
  render(<TTSButton text="一問。" label="Read" />);
  expect(screen.queryByText("表示と読み上げ")).toBeNull();
  voices = [voice("Premium English", "en-US"), { ...voice("Japanese Natural"), localService: false }];
  act(() => engine.dispatchEvent(new Event("voiceschanged")));
  expect(screen.queryByText("Read")).toBeNull();
  const enhanced = voice("Kyoko（拡張）");
  voices.push(japanese, enhanced);
  act(() => engine.dispatchEvent(new Event("voiceschanged")));
  play();
  expect(spoken[0]).toMatchObject({ voice: enhanced, lang: "ja-JP", rate: 1, text: "一問。" });
  expect(engine.cancel).not.toHaveBeenCalled();
});

it("does not render the disclosure without the utterance constructor", () => {
  vi.stubGlobal("SpeechSynthesisUtterance", undefined);
  render(<TTSButton text="one" />);
  expect(screen.queryByText("表示と読み上げ")).toBeNull();
});

it("shows the iPhone notice only after a press and removes it if speech never starts", () => {
  vi.useFakeTimers();
  vi.stubGlobal("navigator", { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X)" });
  render(<TTSButton text="一問。" label="Read" />);
  const notice = "消音モードでは鳴りません";
  expect(screen.queryByText(notice)).toBeNull();
  play();
  expect(engine.speak).toHaveBeenCalledOnce();
  expect(screen.getByRole("status")).toHaveTextContent(notice);
  act(() => vi.advanceTimersByTime(4000));
  expect(screen.queryByText(notice)).toBeNull();
  expect(screen.queryByText("表示と読み上げ")).toBeNull();
});

it("reads sentences in order, bounds unpunctuated text even at half speed and keeps emoji intact", () => {
  const text = "一問です。次です！" + "例😀".repeat(80);
  const chunks = speechChunks(text, 0.5);
  expect(chunks.slice(0, 2)).toEqual(["一問です。", "次です！"]);
  expect(chunks.join("")).toBe(text);
  expect(chunks.every(chunk => Array.from(chunk).length <= 22 && chunk.isWellFormed())).toBe(true);
  window.localStorage.setItem("ipa-quiz:tts-rate:v1", "0.5");
  render(<TTSButton text={text} label="Read" />);
  play();
  for (const [i, chunk] of chunks.entries()) {
    expect(spoken).toHaveLength(i + 1);
    expect(spoken[i]).toMatchObject({ text: chunk, rate: 0.5 });
    start(spoken[i]); end(spoken[i]);
  }
  expect(screen.getByRole("button", { name: "Read" })).toHaveAttribute("aria-pressed", "false");
});

it("hides all controls for an engine that never starts, including after a remount", () => {
  vi.useFakeTimers();
  const { unmount } = render(<><TTSButton text="one" label="Read" /><TTSButton text="two" /></>);
  play(); act(() => { vi.advanceTimersByTime(4000); });
  expect(engine.cancel).toHaveBeenCalledOnce();
  expect(screen.queryAllByText("表示と読み上げ")).toHaveLength(0);
  end(spoken[0]);
  unmount(); render(<TTSButton text="three" />);
  expect(screen.queryByText("表示と読み上げ")).toBeNull();
});

it.each(["constructor", "speak", "error", "end"])("hides after %s fails before startup", kind => {
  render(<TTSButton text="one" label="Read" />);
  if (kind === "constructor") vi.stubGlobal("SpeechSynthesisUtterance", class { constructor() { throw Error(); } });
  if (kind === "speak") engine.speak.mockImplementationOnce(() => { throw Error(); });
  play();
  if (kind === "error") fail(spoken[0]);
  if (kind === "end") end(spoken[0]);
  expect(screen.queryByText("表示と読み上げ")).toBeNull();
});

it("ignores late callbacks on speed change, stop and question replacement", () => {
  vi.useFakeTimers();
  const { rerender } = render(<TTSButton text="一。二。" label="Read" />);
  play();
  const first = spoken[0]; start(first);
  fireEvent.click(screen.getByRole("button", { name: "読み上げ速度設定" }));
  engine.cancel.mockImplementation(() => first.onend?.call(first, new Event("end") as SpeechSynthesisEvent));
  fireEvent.change(screen.getByRole("slider"), { target: { value: "1.5" } });
  expect(spoken).toHaveLength(2);
  expect(spoken[1].rate).toBe(1.5);
  fail(first); start(spoken[1]);
  act(() => { vi.advanceTimersByTime(5000); });
  play("読み上げを停止"); end(spoken[1]);
  play();
  rerender(<TTSButton text="三。" label="Read" />);
  end(spoken[2]); fail(spoken[2]);
  expect(spoken).toHaveLength(3);
  expect(screen.getByRole("button", { name: "Read" })).toHaveAttribute("aria-pressed", "false");
});

it("preserves a retry for playback errors after speech actually started", () => {
  render(<TTSButton text="one" label="Read" />);
  play(); start(spoken[0]); fail(spoken[0]);
  expect(screen.getByRole("status")).toHaveTextContent("読み上げに失敗");
  play(); expect(spoken).toHaveLength(2);
});

it("does not cancel a second button when the first unmounts", () => {
  const first = render(<TTSButton text="one" label="First" />);
  render(<TTSButton text="two" label="Second" />);
  play("First"); play("Second");
  first.unmount(); end(spoken[0]);
  expect(engine.cancel).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("button", { name: "読み上げを停止" })).toBeInTheDocument();
});

it("hides the native iOS disclosure on older builds that lack the plugin", () => {
  vi.stubGlobal("Capacitor", { getPlatform: () => "ios", Plugins: {} });
  render(<TTSButton text="one" />);
  expect(screen.queryByText("表示と読み上げ")).toBeNull();
  expect(spoken).toHaveLength(0);
});

it("uses native start, stop and completion without Web Speech in the next iOS build", async () => {
  const plugin = { available: vi.fn(async () => ({ available: true })), speak: vi.fn(), stop: vi.fn(async () => {}) };
  vi.stubGlobal("Capacitor", { getPlatform: () => "ios", Plugins: { KakomonSpeech: plugin } });
  vi.stubGlobal("speechSynthesis", undefined);
  render(<TTSButton text="問題。一問。" label="Read" />);
  await screen.findByRole("button", { name: "Read" });
  play();
  const [options, event] = plugin.speak.mock.calls[0];
  expect(options).toMatchObject({ lang: "ja-JP", rate: 1, text: "問題。一問。" });
  act(() => event({ state: "started" }));
  play("読み上げを停止");
  expect(plugin.stop).toHaveBeenCalledWith({ id: options.id });
  play(); act(() => event({ state: "finished" }));
  expect(screen.getByRole("button", { name: "読み上げを停止" })).toBeInTheDocument();
  const next = plugin.speak.mock.calls[1][1];
  act(() => { next({ state: "started" }); next({ state: "finished" }); });
  expect(screen.getByRole("button", { name: "Read" })).toHaveAttribute("aria-pressed", "false");
});

it("retries once if the browser drops the click immediately after a stop", () => {
  vi.useFakeTimers();
  render(<TTSButton text="一。" label="Read" />);
  play(); start(spoken[0]); play("読み上げを停止");
  play();
  expect(spoken).toHaveLength(2);
  act(() => { vi.advanceTimersByTime(250); });
  expect(spoken).toHaveLength(3);
  end(spoken[1]); start(spoken[2]); end(spoken[2]);
  expect(screen.getByRole("button", { name: "Read" })).toHaveAttribute("aria-pressed", "false");
});
