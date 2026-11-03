import { afterEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ identity: vi.fn(), runtime: vi.fn() }));
vi.mock("@/lib/billing/runtime", () => ({
  billingIdentity: mocks.identity, billingRuntime: mocks.runtime,
  sameOrigin: () => { throw new Error("Must not consult disabled billing"); },
  json: (value: unknown) => Response.json(value), billingFailure: () => Response.json({}, { status: 503 }),
}));
vi.mock("@/lib/questions/pool-server", () => ({ findQuestionById: async (id: string) => ({ id }) }));
vi.mock("@/lib/questions/filter", () => ({ isPracticeReadyQuestion: () => true, shuffleChoices: (q: unknown) => q }));
import { POST } from "@/app/api/billing/question/route";
import { streamAccess } from "@/lib/billing/stream-access";
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
describe("disabled billing is independent of billing configuration and services", () => {
  it("malformed dormant settings preserve free question and stream behavior during billing outage", async () => {
    for (const [key, value] of Object.entries({ BILLING_MODE: "off", BILLING_ORIGIN: "bad", BILLING_PRICE_YEN: "bad", BILLING_PASS_DAYS: "bad", BILLING_TRANSITION_STARTS_AT: "bad" })) vi.stubEnv(key, value);
    mocks.runtime.mockImplementation(() => { throw new Error("DB/provider outage"); });
    const response = await POST(new Request("https://app.example/api/billing/question", { method: "POST", body: JSON.stringify({ id: "existing" }) }));
    expect(response.status).toBe(200); expect(await streamAccess()).toBe(true);
    expect(mocks.runtime).not.toHaveBeenCalled(); expect(mocks.identity).not.toHaveBeenCalled();
  });
});
