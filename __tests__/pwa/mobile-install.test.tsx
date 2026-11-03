import { StrictMode, useState } from "react";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MobileInstallControl } from "@/components/pwa/MobileInstallControl";
import { MobileInstallProvider } from "@/components/pwa/MobileInstallProvider";

type Choice = { outcome: "accepted" | "dismissed"; platform: string };
const android = "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36";
const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Version/18.0 Mobile Safari/604.1";
const navigatorKeys = ["userAgent", "platform", "maxTouchPoints", "standalone"] as const;
const originalDescriptors = navigatorKeys.map((key) => [key, Object.getOwnPropertyDescriptor(navigator, key)] as const);
let standalone = false;
let displayListeners: Set<() => void>;

function setDevice(userAgent: string, platform = "Linux armv8l", maxTouchPoints = 1) {
  Object.defineProperties(navigator, {
    userAgent: { configurable: true, value: userAgent },
    platform: { configurable: true, value: platform },
    maxTouchPoints: { configurable: true, value: maxTouchPoints },
    standalone: { configurable: true, value: false },
  });
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((done) => { resolve = done; });
  return { promise, resolve };
}

function installEvent(choice: Promise<Choice> = Promise.resolve({ outcome: "dismissed", platform: "test" })) {
  const event = Object.assign(new Event("beforeinstallprompt", { cancelable: true }), {
    prompt: vi.fn(async () => {}), userChoice: choice,
  });
  act(() => { window.dispatchEvent(event); });
  return event;
}

function control() {
  return render(<MobileInstallProvider><MobileInstallControl /><input aria-label="現在の回答" defaultValue="入力中" /></MobileInstallProvider>);
}
const addButton = () => screen.getByRole("button", { name: "ホーム画面に追加" });

beforeEach(() => {
  standalone = false;
  displayListeners = new Set();
  setDevice(android);
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return standalone; },
    media: "(display-mode: standalone)",
    addEventListener: (_event: string, listener: () => void) => { displayListeners.add(listener); },
    removeEventListener: (_event: string, listener: () => void) => { displayListeners.delete(listener); },
  })));
  vi.spyOn(HTMLElement.prototype, "getClientRects").mockImplementation(
    () => [new DOMRect(0, 0, 300, 300)] as unknown as DOMRectList,
  );
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  for (const [key, descriptor] of originalDescriptors) {
    if (descriptor) Object.defineProperty(navigator, key, descriptor);
    else Reflect.deleteProperty(navigator, key);
  }
});

describe("mobile home-screen installation", () => {
  it("returns focus to the separate guidance trigger when a native prompt is available", () => {
    control();
    installEvent();
    const origin = screen.getByRole("button", { name: "追加方法を見る" });
    fireEvent.click(origin);
    fireEvent.click(screen.getByRole("button", { name: "追加方法を閉じる" }));
    expect(origin).toHaveFocus();
  });

  it("recovers after leaving standalone mode and ignores the previous pending choice", async () => {
    control();
    const choice = deferred<Choice>();
    installEvent(choice.promise);
    fireEvent.click(addButton());
    act(() => { standalone = true; displayListeners.forEach((listener) => listener()); });
    expect(screen.queryByRole("button", { name: "ホーム画面に追加" })).not.toBeInTheDocument();
    act(() => { standalone = false; displayListeners.forEach((listener) => listener()); });
    expect(addButton()).toBeEnabled();
    await act(async () => { choice.resolve({ outcome: "dismissed", platform: "test" }); });
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    const next = installEvent();
    await act(async () => { fireEvent.click(addButton()); });
    expect(next.prompt).toHaveBeenCalledTimes(1);
  });

  it("retains a confirmed installation after leaving standalone mode", () => {
    control();
    act(() => { standalone = true; displayListeners.forEach((listener) => listener()); });
    act(() => { window.dispatchEvent(new Event("appinstalled")); });
    act(() => { standalone = false; displayListeners.forEach((listener) => listener()); });
    expect(screen.queryByRole("button", { name: "ホーム画面に追加" })).not.toBeInTheDocument();
    expect(screen.getByText("このブラウザーからの追加完了を確認しました。")).toBeVisible();
  });

  it("offers manual guidance without an event, preserves input and history, and closes with focus restored", () => {
    control();
    const oldUrl = location.href;
    const historyLength = history.length;
    fireEvent.change(screen.getByLabelText("現在の回答"), { target: { value: "回答を保持" } });
    fireEvent.click(addButton());
    expect(screen.getByRole("heading", { name: "スマートフォンでの追加方法" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Android" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "iPhone" }));
    expect(screen.getByRole("link", { name: "Appleの追加手順（外部）" })).toHaveAttribute("rel", "noopener noreferrer");
    fireEvent.keyDown(screen.getByRole("button", { name: "追加方法を閉じる" }), { key: "Escape" });
    expect(screen.queryByRole("heading", { name: "スマートフォンでの追加方法" })).not.toBeInTheDocument();
    expect(addButton()).toHaveFocus();
    expect(screen.getByLabelText("現在の回答")).toHaveValue("回答を保持");
    expect(location.href).toBe(oldUrl);
    expect(history.length).toBe(historyLength);
  });

  it("shows the iPhone instructions without pretending to open a native prompt", () => {
    setDevice(iphone, "iPhone");
    control();
    const event = installEvent();
    expect(event.defaultPrevented).toBe(false);
    fireEvent.click(addButton());
    expect(screen.getByRole("button", { name: "iPhone" })).toHaveAttribute("aria-pressed", "true");
    expect(event.prompt).not.toHaveBeenCalled();
    expect(screen.queryByText("このブラウザーからの追加完了を確認しました。")).not.toBeInTheDocument();
  });

  it("recognizes iPad desktop-style identification while still offering manual selection", () => {
    setDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Safari/605.1.15", "MacIntel", 5);
    control();
    fireEvent.click(addButton());
    expect(screen.getByRole("button", { name: "iPhone" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Android" }));
    expect(screen.getByRole("link", { name: "Chromeの追加手順（外部）" })).toBeVisible();
  });

  it("leaves a desktop prompt untouched and offers only smartphone guidance", () => {
    setDevice("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/130.0", "MacIntel", 0);
    control();
    const event = installEvent();
    expect(event.defaultPrevented).toBe(false);
    fireEvent.click(addButton());
    expect(event.prompt).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: "スマートフォンでの追加方法" })).toBeVisible();
    expect(document.body.textContent).not.toMatch(/Dock/);
  });

  it("suppresses the Android default prompt and consumes each event only once despite double clicks", async () => {
    control();
    const choice = deferred<Choice>();
    const event = installEvent(choice.promise);
    expect(event.defaultPrevented).toBe(true);
    fireEvent.click(addButton());
    fireEvent.click(addButton());
    expect(event.prompt).toHaveBeenCalledTimes(1);
    expect(addButton()).toBeDisabled();
    await act(async () => { choice.resolve({ outcome: "accepted", platform: "test" }); });
    expect(addButton()).toBeEnabled();
    expect(screen.getByRole("status")).toHaveTextContent("追加操作を受け付けました");
    expect(screen.queryByText("このブラウザーからの追加完了を確認しました。")).not.toBeInTheDocument();
    fireEvent.click(addButton());
    expect(event.prompt).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("heading", { name: "スマートフォンでの追加方法" })).toBeVisible();
  });

  it("allows cancelling without changing the surrounding form or reusing the event", async () => {
    control();
    const event = installEvent();
    await act(async () => { fireEvent.click(addButton()); });
    expect(screen.getByRole("status")).toHaveTextContent("キャンセル");
    expect(screen.getByLabelText("現在の回答")).toHaveValue("入力中");
    fireEvent.click(addButton());
    expect(event.prompt).toHaveBeenCalledTimes(1);
  });

  it("recovers from a rejected prompt with usable manual guidance", async () => {
    control();
    const event = installEvent();
    event.prompt.mockRejectedValueOnce(new Error("prompt unavailable"));
    await act(async () => { fireEvent.click(addButton()); });
    expect(screen.getByRole("status")).toHaveTextContent("追加画面を開けませんでした");
    expect(screen.getByRole("heading", { name: "スマートフォンでの追加方法" })).toBeVisible();
    expect(addButton()).toBeEnabled();
  });

  it("recovers when the choice promise rejects", async () => {
    control();
    let rejectChoice!: (error: Error) => void;
    const choice = new Promise<Choice>((_resolve, reject) => { rejectChoice = reject; });
    installEvent(choice);
    fireEvent.click(addButton());
    await act(async () => { rejectChoice(new Error("choice unavailable")); });
    expect(screen.getByRole("status")).toHaveTextContent("追加画面を開けませんでした");
    expect(addButton()).toBeEnabled();
  });

  it("keeps a newly received event when the previous choice settles", async () => {
    control();
    const choice = deferred<Choice>();
    const first = installEvent(choice.promise);
    fireEvent.click(addButton());
    const second = installEvent();
    await act(async () => { choice.resolve({ outcome: "dismissed", platform: "test" }); });
    await act(async () => { fireEvent.click(addButton()); });
    expect(first.prompt).toHaveBeenCalledTimes(1);
    expect(second.prompt).toHaveBeenCalledTimes(1);
  });

  it("appinstalled invalidates the pending request and prevents its later result overwriting completion", async () => {
    control();
    const choice = deferred<Choice>();
    installEvent(choice.promise);
    addButton().focus();
    fireEvent.click(addButton());
    act(() => { window.dispatchEvent(new Event("appinstalled")); });
    expect(screen.getByText("このブラウザーからの追加完了を確認しました。")).toHaveFocus();
    await act(async () => { choice.resolve({ outcome: "dismissed", platform: "test" }); });
    expect(screen.queryByRole("button", { name: "ホーム画面に追加" })).not.toBeInTheDocument();
    expect(screen.queryByText(/追加をキャンセルしました/)).not.toBeInTheDocument();
    const late = installEvent();
    expect(late.defaultPrevented).toBe(false);
  });

  it("completion does not steal focus from unrelated controls", () => {
    control();
    const input = screen.getByLabelText("現在の回答");
    input.focus();
    act(() => { window.dispatchEvent(new Event("appinstalled")); });
    expect(input).toHaveFocus();
  });

  it("hides promotion when already launched standalone", () => {
    standalone = true;
    control();
    expect(screen.getByText("アプリとして利用中です。")).toBeVisible();
    expect(screen.queryByRole("button", { name: "ホーム画面に追加" })).not.toBeInTheDocument();
    expect(installEvent().defaultPrevented).toBe(false);
  });

  it("responds to a standalone mode change and closes the current guide accessibly", () => {
    control();
    fireEvent.click(addButton());
    screen.getByRole("button", { name: "追加方法を閉じる" }).focus();
    act(() => { standalone = true; displayListeners.forEach((listener) => listener()); });
    expect(screen.getByText("アプリとして利用中です。")).toHaveFocus();
    expect(screen.queryByRole("heading", { name: "スマートフォンでの追加方法" })).not.toBeInTheDocument();
  });

  it("retains an unused event across settings-control unmount and remount", async () => {
    function Pages() {
      const [show, setShow] = useState(true);
      return <MobileInstallProvider><button onClick={() => setShow(!show)}>画面切替</button>{show && <MobileInstallControl />}</MobileInstallProvider>;
    }
    render(<Pages />);
    const event = installEvent();
    fireEvent.click(screen.getByRole("button", { name: "画面切替" }));
    fireEvent.click(screen.getByRole("button", { name: "画面切替" }));
    await act(async () => { fireEvent.click(addButton()); });
    expect(event.prompt).toHaveBeenCalledTimes(1);
  });

  it("cleans listeners on unmount and ignores an obsolete asynchronous result", async () => {
    const first = control();
    const choice = deferred<Choice>();
    installEvent(choice.promise);
    fireEvent.click(addButton());
    first.unmount();
    expect(installEvent().defaultPrevented).toBe(false);
    expect(displayListeners.size).toBe(0);
    control();
    await act(async () => { choice.resolve({ outcome: "accepted", platform: "test" }); });
    expect(screen.getByRole("status")).toHaveTextContent("");
    expect(addButton()).toBeEnabled();
  });

  it("keeps exactly one display listener through StrictMode and works with storage unavailable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("storage blocked"); });
    render(<StrictMode><MobileInstallProvider><MobileInstallControl /></MobileInstallProvider></StrictMode>);
    expect(displayListeners.size).toBe(1);
    expect(installEvent().defaultPrevented).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "追加方法を見る" }));
    expect(screen.getByRole("heading", { name: "スマートフォンでの追加方法" })).toBeVisible();
  });
});
