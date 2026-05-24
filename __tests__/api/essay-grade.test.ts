import { describe, it, expect, beforeAll } from "vitest";
import { POST } from "@/app/api/essay-grade/route";

beforeAll(() => {
  delete process.env.GEMINI_API_KEY;
  delete process.env.KV_REST_API_URL;
  delete process.env.KV_REST_API_TOKEN;
});

function makeReq(body: unknown, ip: string): Request {
  return new Request("http://localhost/api/essay-grade", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}

const validAnswers = {
  ア: "私が携わったプロジェクトでは、製造業の生産管理システムをクラウド移行する案件において、要件定義から構築・本番稼働までを担当した。".repeat(3),
  イ: "技術選定では既存のオンプレ資産との互換性を重視しつつ、運用負荷を軽減するためマネージドサービスを優先採用した。".repeat(3),
  ウ: "結果として運用工数を月40時間削減し、障害復旧時間も平均30%短縮できた。今後は他事業部への横展開を計画している。".repeat(3),
};

describe("POST /api/essay-grade", () => {
  it("returns 400 for non-JSON body", async () => {
    const req = new Request("http://localhost/api/essay-grade", {
      method: "POST",
      headers: { "x-forwarded-for": "10.1.0.1" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("invalid_request");
  });

  it("returns 400 for unknown industry enum", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "au-2024a-pm2-q1",
          industry: "bogus-industry",
          answers: validAnswers,
        },
        "10.1.0.2",
      ),
    );
    expect(res.status).toBe(400);
  });

  it("returns 404 when essay questionId is not found", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "zz-1999h-pm2-q99",
          industry: "it",
          answers: validAnswers,
        },
        "10.1.0.3",
      ),
    );
    expect(res.status).toBe(404);
    expect((await res.json()).error).toBe("not_found");
  });

  it("returns 400 when total answer length is below 100 chars (too_short)", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "au-2024a-pm2-q1",
          industry: "it",
          answers: { ア: "短い", イ: "", ウ: "" },
        },
        "10.1.0.4",
      ),
    );
    expect(res.status).toBe(400);
    expect((await res.json()).error).toBe("too_short");
  });

  it("returns mock-graded JSON via mock provider for a real essay question", async () => {
    const res = await POST(
      makeReq(
        {
          questionId: "au-2024a-pm2-q1",
          industry: "manufacturing",
          answers: validAnswers,
        },
        "10.1.0.5",
      ),
    );
    expect(res.status).toBe(200);
    expect(res.headers.get("X-Provider")).toBe("mock");

    const parsed = await res.json();
    expect(parsed.questionId).toBe("au-2024a-pm2-q1");
    expect(parsed.industry).toBe("manufacturing");
    expect(["A", "B", "C", "fail"]).toContain(parsed.rank);
    expect(typeof parsed.passProbability).toBe("number");
    expect(Array.isArray(parsed.subResults)).toBe(true);
    expect(parsed.subResults).toHaveLength(3);
    for (const sub of parsed.subResults) {
      expect(["ア", "イ", "ウ"]).toContain(sub.key);
      expect(typeof sub.axes.relevance).toBe("number");
      expect(typeof sub.axes.logic).toBe("number");
      expect(typeof sub.axes.concreteness).toBe("number");
      expect(typeof sub.axes.industryFit).toBe("number");
    }
  });
});
