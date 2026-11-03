import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("GET /api/stats/answer-count", () => {
  it("does not present an estimated baseline when the database is unavailable", async () => {
    vi.stubEnv("DATABASE_URL", undefined);
    const { GET } = await import("@/app/api/stats/answer-count/route");

    const response = await GET();

    expect(await response.json()).toEqual({
      count: null,
      source: "unavailable",
    });
  });
});
