import { describe, it, expect, beforeAll } from "vitest";
import { POST } from "@/app/api/scoring/route";

// Ensure mock provider is used (no GEMINI_API_KEY). The mock provider has a
// dedicated short-circuit in the route that returns deterministic JSON, which
// makes the happy-path testable without any network calls.
beforeAll(() => {
  delete process.env.GEMINI_API_KEY;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
});

function makeReq(body: unknown, ip: string): Request {
  return new Request("http://localhost/api/scoring", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/scoring", () => {
  it("returns 400 for non-JSON body", async () => {
    const req = new Request("http://localhost/api/scoring", {
      method: "POST",
      headers: { "x-forwarded-for": "10.0.0.1" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_request");
  });

  it("returns 400 when payload fails Zod validation", async () => {
    const res = await POST(makeReq({ questionId: "x", answers: [] }, "10.0.0.2"));
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_request");
  });

  it("returns 404 when questionId does not match any afternoon question", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "ap-9999h-pm-q99",
          answers: [{ label: "設問1", text: "テスト解答" }],
        },
        "10.0.0.3",
      ),
    );
    expect(res.status).toBe(404);
    expect((await res.json()).error).toBe("not_found");
  });

  it.each(["これはサンプル解答です。", "あ".repeat(80), "ab"])("mock provider does not grade %s", async (text) => {
    const res = await POST(makeReq({questionId: "ap-2024h-pm-q1", answers: [{label: "設問1", text}]}, `10.0.2.${text.length}`));
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.status).toBe("unavailable");
    for (const key of ["totalScore", "subResults", "overallComment"]) expect(body).not.toHaveProperty(key);
  });

  it("rejects answers array exceeding 20 sub-answers", async () => {
    const tooMany = Array.from({ length: 25 }, (_, i) => ({
      label: `設問${i + 1}`,
      text: "x",
    }));
    const res = await POST(
      makeReq(
        { questionId: "ap-2024h-pm-q1", answers: tooMany },
        "10.0.0.5",
      ),
    );
    expect(res.status).toBe(400);
  });
});
