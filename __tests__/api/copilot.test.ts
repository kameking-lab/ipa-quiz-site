import { describe, it, expect, beforeAll } from "vitest";
import { POST } from "@/app/api/copilot/route";
import type { Question } from "@/lib/questions/types";

beforeAll(() => {
  delete process.env.GEMINI_API_KEY;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
});

const validQuestion: Question = {
  id: "ap-2023h-am-q1",
  exam: "ap",
  session: "am",
  year: 2023,
  season: "spring",
  qNumber: 1,
  type: "multiple-choice",
  category: "テクノロジ",
  topicTags: ["アルゴリズム"],
  difficulty: 3,
  question: "テスト問題本文。",
  choices: { ア: "選択肢ア", イ: "選択肢イ", ウ: "選択肢ウ", エ: "選択肢エ" },
  answer: "ア",
  explanation: "解説テキスト。",
  hasImage: false,
  sourcePdfUrl: "https://example.com/test.pdf",
  license: "IPA-public",
};

function makeReq(body: unknown, ip: string): Request {
  return new Request("http://localhost/api/copilot", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

async function drainStream(res: Response): Promise<string> {
  if (!res.body) return "";
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

describe("POST /api/copilot", () => {
  it("returns 400 for non-JSON body", async () => {
    const req = new Request("http://localhost/api/copilot", {
      method: "POST",
      headers: { "x-forwarded-for": "10.2.0.1" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("invalid_request");
  });

  it("returns 400 when question shape is invalid", async () => {
    const res = await POST(
      makeReq(
        {
          question: { id: "" },
          messages: [{ role: "user", content: "hi" }],
        },
        "10.2.0.2",
      ),
    );
    expect(res.status).toBe(400);
  });

  it("returns 400 when messages is empty", async () => {
    const res = await POST(
      makeReq({ question: validQuestion, messages: [] }, "10.2.0.3"),
    );
    expect(res.status).toBe(400);
  });

  it("returns a streamed text/plain body via mock provider with expected headers", async () => {
    const res = await POST(
      makeReq(
        {
          question: validQuestion,
          messages: [{ role: "user", content: "この問題のポイントを教えて" }],
        },
        "10.2.0.4",
      ),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toContain("text/plain");
    expect(res.headers.get("X-Provider")).toBe("mock");
    expect(res.headers.get("X-RateLimit-Limit")).toBeTruthy();
    expect(res.headers.get("X-RAG-Enabled")).toMatch(/^[01]$/);

    const body = await drainStream(res);
    expect(body.length).toBeGreaterThan(0);
  }, 20_000);

  it("rejects message content exceeding 4000 chars", async () => {
    const huge = "あ".repeat(4001);
    const res = await POST(
      makeReq(
        {
          question: validQuestion,
          messages: [{ role: "user", content: huge }],
        },
        "10.2.0.5",
      ),
    );
    expect(res.status).toBe(400);
  });
});
