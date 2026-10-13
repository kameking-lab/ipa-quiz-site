import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchQuestionMeta } from "@/lib/dashboard/question-meta";

afterEach(() => vi.unstubAllGlobals());

describe("fetchQuestionMeta", () => {
  it("splits 2001 IDs into requests of at most 2000", async () => {
    const calls: number[] = [];
    vi.stubGlobal("fetch", vi.fn().mockImplementation((_url: string, init: RequestInit) => {
      const body = JSON.parse(init.body as string) as { ids: string[] };
      calls.push(body.ids.length);
      return Promise.resolve(new Response(JSON.stringify({ meta: [] })));
    }));
    const ids = Array.from({ length: 2001 }, (_, index) => `mock-${index}`);
    expect(await fetchQuestionMeta(ids)).toEqual({ meta: [], complete: true });
    expect(calls).toEqual([2000, 1]);
  });

  it("keeps resolved metadata but flags incomplete requests", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({
        meta: [{ id: "mock-0", exam: "ap", category: "IT" }],
      })))
      .mockResolvedValueOnce(new Response(null, { status: 503 }));
    vi.stubGlobal("fetch", fetchMock);
    const ids = Array.from({ length: 2001 }, (_, index) => `mock-${index}`);
    expect(await fetchQuestionMeta(ids)).toEqual({
      meta: [{ id: "mock-0", exam: "ap", category: "IT" }],
      complete: false,
    });
  });
});
