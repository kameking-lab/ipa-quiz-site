import { describe, it, expect, beforeEach, vi } from "vitest";

// @vercel/analytics の track をスパイに差し替える（ホイストされる）。
const trackMock = vi.fn();
vi.mock("@vercel/analytics", () => ({
  track: (...args: unknown[]) => trackMock(...args),
}));

import { trackEvent } from "@/lib/analytics/events";

/**
 * analytics/events.ts は CVR ファネル計測のクライアント側入口。
 * trackEvent は「name を切り出し残りプロパティを track の第2引数へ転送」「SSR では no-op」
 * 「track が throw しても黙殺」の契約に依存する。崩れると計測欠落（name 混入や例外伝播）が起きる。
 */
beforeEach(() => {
  trackMock.mockReset();
});

describe("trackEvent", () => {
  it("name を切り出し、残りのプロパティを第2引数として転送する", () => {
    trackEvent({ name: "quiz_start", exam: "ap", mode: "random" });
    expect(trackMock).toHaveBeenCalledTimes(1);
    expect(trackMock).toHaveBeenCalledWith("quiz_start", { exam: "ap", mode: "random" });
  });

  it("転送プロパティに name キーは含めない", () => {
    trackEvent({ name: "exam_select", exam: "fe" });
    const [, props] = trackMock.mock.calls[0];
    expect(props).not.toHaveProperty("name");
    expect(props).toEqual({ exam: "fe" });
  });

  it("真偽値・数値プロパティもそのまま転送する", () => {
    trackEvent({ name: "quiz_answer", exam: "ap", correct: false });
    expect(trackMock).toHaveBeenCalledWith("quiz_answer", { exam: "ap", correct: false });
  });

  it("track が throw しても trackEvent は例外を投げない（黙殺）", () => {
    trackMock.mockImplementationOnce(() => {
      throw new Error("analytics down");
    });
    expect(() => trackEvent({ name: "pricing_view", source: "home" })).not.toThrow();
  });

  it("SSR（window 不在）では track を呼ばない", () => {
    vi.stubGlobal("window", undefined);
    try {
      trackEvent({ name: "exam_select", exam: "ap" });
      expect(trackMock).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
