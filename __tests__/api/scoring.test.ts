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

  it("returns mock-scored JSON for a real question via mock provider", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "ap-2024h-pm-q1",
          answers: [
            { label: "設問1", text: "これはサンプル解答です。" },
            { label: "設問2", text: "テスト用の二つ目の解答。" },
          ],
        },
        "10.0.0.4",
      ),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Provider")).toBe("mock");
    expect(res.headers.get("X-RateLimit-Limit")).toBeTruthy();

    const text = await res.text();
    const parsed = JSON.parse(text);
    expect(parsed.questionId).toBe("ap-2024h-pm-q1");
    expect(typeof parsed.totalScore).toBe("number");
    expect(parsed.totalScore).toBeGreaterThanOrEqual(0);
    expect(parsed.totalScore).toBeLessThanOrEqual(100);
    expect(Array.isArray(parsed.subResults)).toBe(true);
    expect(parsed.subResults.length).toBeGreaterThan(0);
    for (const sub of parsed.subResults) {
      expect(typeof sub.label).toBe("string");
      expect(typeof sub.score).toBe("number");
      expect(Array.isArray(sub.goodPoints)).toBe(true);
      expect(Array.isArray(sub.improvements)).toBe(true);
    }
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
