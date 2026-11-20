import { beforeEach, expect, it, vi } from "vitest";
import { IP_QUESTIONS_2024_CBT_AM } from "@/data/questions/ip/by-year/2024-cbt-am";
import { POST } from "@/app/api/me/weakness-practice/route";

const mocks = vi.hoisted(() => ({
  identity: vi.fn(),
  monthlySelected: vi.fn(),
  monthlyStatus: vi.fn(),
  passStatus: vi.fn(),
  appAccess: vi.fn(),
  questions: vi.fn(),
}));

vi.mock("@/lib/billing/runtime", () => ({
  optionalBillingIdentity: mocks.identity,
  billingRuntime: () => ({ service: { status: mocks.passStatus } }),
}));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlySelected: mocks.monthlySelected }));
vi.mock("@/lib/billing/subscription/runtime", () => ({
  monthlyRuntime: () => ({ service: { status: mocks.monthlyStatus } }),
}));
vi.mock("@/mobile/server/revenuecat", () => ({ revenueCatAccess: mocks.appAccess }));
vi.mock("@/lib/questions/get-questions", () => ({ getQuestionsForExam: mocks.questions }));

const [answered, network, security, unpublished] = IP_QUESTIONS_2024_CBT_AM;
const origin = "https://local.test";
function request(requestOrigin = origin) {
  return new Request(`${origin}/api/me/weakness-practice`, {
    method: "POST",
    headers: { origin: requestOrigin },
    body: JSON.stringify({ exam: "ip", topics: ["ネットワーク", "情報セキュリティ"], answered: [answered.id], limit: 3 }),
  });
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.identity.mockResolvedValue("member");
  mocks.monthlySelected.mockReturnValue(true);
  mocks.monthlyStatus.mockResolvedValue({ entitled: false });
  mocks.passStatus.mockResolvedValue({ entitled: false });
  mocks.appAccess.mockResolvedValue(null);
  mocks.questions.mockResolvedValue([
    { ...answered, topicTags: ["ネットワーク"] },
    { ...unpublished, topicTags: ["ネットワーク"], publicAllowed: false },
    { ...network, topicTags: ["ネットワーク", "情報セキュリティ"] },
    { ...security, topicTags: ["情報セキュリティ"] },
  ]);
});

it("selects existing eligible questions across weak topics for web monthly members", async () => {
  mocks.monthlyStatus.mockResolvedValue({ entitled: true });
  const response = await POST(request());
  expect(response.status).toBe(200);
  expect(response.headers.get("Cache-Control")).toBe("private, no-store");
  expect(await response.json()).toEqual({ questions: [
    { id: network.id, topic: "ネットワーク" },
    { id: security.id, topic: "情報セキュリティ" },
  ] });
  expect(mocks.questions).toHaveBeenCalledWith("ip");
  expect(mocks.appAccess).not.toHaveBeenCalled();
});

it.each(["app-store", "pass"])("keeps existing %s access to the review candidates", async plan => {
  if (plan === "app-store") mocks.appAccess.mockResolvedValue({ entitled: true });
  else {
    mocks.monthlySelected.mockReturnValue(false);
    mocks.passStatus.mockResolvedValue({ entitled: true });
  }
  expect((await POST(request())).status).toBe(200);
});

it("does not look up questions for anonymous, free, or cross-origin requests", async () => {
  expect((await POST(request())).status).toBe(403);
  mocks.identity.mockResolvedValue(null);
  expect((await POST(request())).status).toBe(403);
  expect((await POST(request("https://other.test"))).status).toBe(403);
  expect(mocks.questions).not.toHaveBeenCalled();
});
