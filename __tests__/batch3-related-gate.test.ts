import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/questions/related/route";

afterEach(() => vi.unstubAllEnvs());
describe("INT7 optional related previews respect existing content grants", () => {
  it.each(["native", "strict"])("does not expose or automatically grant bodies in %s mode", async mode => {
    vi.stubEnv("MOBILE_IAP_ENABLED", mode === "strict" ? "true" : "false");
    const response = await POST(new Request("http://localhost/api/questions/related", {
      method: "POST", headers: mode === "native" ? { "X-Kakomon-Native": "ios" } : {},
      body: JSON.stringify({ id: "ip-2009a-am-q1", ids: ["ip-2009a-am-q2"] }),
    }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ questions: [] });
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("Vary")).toContain("X-Kakomon-Native");
  });
});
