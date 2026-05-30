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

  // mock 採点（GEMINI_API_KEY 未設定時のフォールバック）の得点ロジックは
  // ユーザーに見える totalScore と各設問スコアを決めるが、既存テストは型・範囲しか
  // 見ておらず分岐が未固定だった。長さ→点数の4分岐(0/20/40/70)と平均を回帰固定する。
  // ap-2024h-pm-q1 の設問: 設問1/2/4=maxLength40, 設問3=maxLength50。
  it("mock scoring: 長さ別の得点分岐(0/20/40/70)と単純平均を回帰固定", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "ap-2024h-pm-q1",
          answers: [
            { label: "設問1", text: "" }, // len 0 → 0
            { label: "設問2", text: "ab" }, // len 2 (<5) → 20
            { label: "設問3", text: "あ".repeat(80) }, // 80 > 50*1.5=75 → 40
            { label: "設問4", text: "あ".repeat(20) }, // レンジ内 → 70
          ],
        },
        "10.0.0.6",
      ),
    );
    expect(res.status).toBe(200);
    const parsed = JSON.parse(await res.text());

    const byLabel: Record<string, number> = Object.fromEntries(
      parsed.subResults.map((s: { label: string; score: number }) => [s.label, s.score]),
    );
    expect(byLabel["設問1"]).toBe(0);
    expect(byLabel["設問2"]).toBe(20); // len<5
    expect(byLabel["設問3"]).toBe(40); // len>maxLength*1.5
    expect(byLabel["設問4"]).toBe(70);
    // totalScore は単純平均 round((0+20+40+70)/4)=round(32.5)=33（配点重み付けではない現挙動）
    expect(parsed.totalScore).toBe(33);
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
