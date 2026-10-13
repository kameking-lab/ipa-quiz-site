import { describe, it, expect, vi } from "vitest";
import { POST } from "@/app/api/essay-grade/route";

const streamChat = vi.fn();
vi.mock("@/lib/ai/provider", async () => {
  const actual = await vi.importActual<typeof import("@/lib/ai/provider")>("@/lib/ai/provider");
  return { ...actual, getProvider: async () => ({ name: "gemini", streamChat }) };
});

function makeReq(body: unknown, ip: string): Request {
  return new Request("http://localhost/api/essay-grade", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
}

const validAnswers = {
  ア: "計画と評価を行い、改善を続ける。".repeat(20),
  イ: "運用の課題を整理し、担当者と対応する。".repeat(20),
  ウ: "結果を確認し、次の計画に反映する。".repeat(20),
};

describe("POST /api/essay-grade", () => {
  it("returns 400 for non-JSON body", async () => {
    const req = new Request("http://localhost/api/essay-grade", {
      method: "POST", headers: { "x-forwarded-for": "10.1.0.1" }, body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_request");
  });

  it("returns 400 for unknown industry enum", async () => {
    const res = await POST(makeReq({ questionId: "au-2024a-pm2-q1", industry: "bogus-industry", answers: validAnswers }, "10.1.0.2"));
    expect(res.status).toBe(400);
  });

  it("returns 404 when essay questionId is not found", async () => {
    const res = await POST(makeReq({ questionId: "zz-1999h-pm2-q99", industry: "it", answers: validAnswers }, "10.1.0.3"));
    expect(res.status).toBe(404);
    expect((await res.json()).error).toBe("not_found");
  });

  it("returns 410 for a retired original question before using a paid provider", async () => {
    const res = await POST(makeReq({ questionId: "au-2024a-pm2-q1", industry: "it", answers: validAnswers }, "10.1.0.4"));
    expect(res.status).toBe(410);
    const body = await res.json();
    expect(body.error).toBe("no_longer_available");
    expect(streamChat).not.toHaveBeenCalled();
  });
});
