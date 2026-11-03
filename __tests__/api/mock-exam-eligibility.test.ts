import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/mock-exam/[exam]/route";
describe("mock API eligibility", () => {
  it.each(["denko2", "fp2", "shino-kunrenshi", "unknown", "constructor", "__proto__"])("rejects %s without returning an AP exam", async (exam) => {
    const response = await GET(new Request(`http://localhost/api/mock-exam/${exam}`), { params: Promise.resolve({ exam }) });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalid_exam" });
  });
});
