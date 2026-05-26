import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// /api/contact is the single inbound ingress for feedback / question-comment /
// question-rating / contact. These tests cover the folded-in question-rating
// kind and the Slack forwarding added in the feedback-unification refactor.

function mockFetch() {
  const slack: string[] = [];
  const fetchMock = vi.fn(async (input: string | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    if (url.includes("hooks.slack.test")) {
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      slack.push(body.text ?? "");
    }
    return new Response("ok", { status: 200 });
  });
  vi.stubGlobal("fetch", fetchMock);
  return { slack, fetchMock };
}

function postJson(body: unknown): Request {
  return new Request("http://test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv("SLACK_WEBHOOK_URL", "https://hooks.slack.test/abc");
    // Leave RESEND_API_KEY / TURNSTILE_SECRET_KEY unset so those branches no-op.
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("accepts a question-rating and forwards it to Slack", async () => {
    const { slack } = mockFetch();
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      postJson({
        kind: "question-rating",
        questionId: "ap-2025h-am-q1",
        rating: "report",
        comment: "選択肢ウの説明が誤りです",
      }),
    );
    expect(res.status).toBe(200);
    await new Promise((r) => setTimeout(r, 0));
    expect(slack.some((m) => m.includes("ap-2025h-am-q1") && m.includes("report"))).toBe(true);
  });

  it("forwards a feedback submission to Slack", async () => {
    const { slack } = mockFetch();
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(postJson({ kind: "feedback", choice: "役立った", comment: "良い" }));
    expect(res.status).toBe(200);
    await new Promise((r) => setTimeout(r, 0));
    expect(slack.some((m) => m.includes("feedback"))).toBe(true);
  });

  it("rejects an unknown kind with 400", async () => {
    mockFetch();
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(postJson({ kind: "bogus", foo: 1 }));
    expect(res.status).toBe(400);
  });

  it("rejects a question-rating with an invalid rating value", async () => {
    mockFetch();
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      postJson({ kind: "question-rating", questionId: "q1", rating: "love-it" }),
    );
    expect(res.status).toBe(400);
  });
});
