import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sendSlackMessage } from "@/lib/notify/slack";

// Characterization tests for the shared Slack Incoming Webhook sender used to
// forward inbound user signals (feedback / comments / ratings / contact).
// Contract: NEVER throws, returns a boolean, posts {text} as JSON; when the
// webhook URL is unset it logs (not silently lost) and returns false.

function mockFetch(handler: (input: string | URL, init?: RequestInit) => Promise<Response>) {
  const fetchMock = vi.fn(handler);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("sendSlackMessage", () => {
  it("returns false and logs (no fetch) when SLACK_WEBHOOK_URL is unset", async () => {
    vi.stubEnv("SLACK_WEBHOOK_URL", "");
    const fetchMock = mockFetch(async () => new Response("ok", { status: 200 }));
    const errSpy = vi.spyOn(console, "error");

    const ok = await sendSlackMessage("hello");

    expect(ok).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(errSpy).toHaveBeenCalled();
  });

  it("POSTs the text as JSON to the webhook and returns true on 2xx", async () => {
    vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.test/abc");
    let sentUrl = "";
    let sentBody: unknown = null;
    const fetchMock = mockFetch(async (input, init) => {
      sentUrl = typeof input === "string" ? input : input.toString();
      sentBody = JSON.parse(String(init?.body));
      return new Response("ok", { status: 200 });
    });

    const ok = await sendSlackMessage("新しいフィードバック");

    expect(ok).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sentUrl).toBe("https://hooks.slack.test/abc");
    expect(sentBody).toEqual({ text: "新しいフィードバック" });
  });

  it("returns false on a non-2xx response", async () => {
    vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.test/abc");
    mockFetch(async () => new Response("server error", { status: 500 }));
    expect(await sendSlackMessage("x")).toBe(false);
  });

  it("never throws — a thrown fetch (network/timeout) resolves to false", async () => {
    vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.test/abc");
    mockFetch(async () => {
      throw new Error("aborted");
    });
    await expect(sendSlackMessage("x")).resolves.toBe(false);
  });
});
