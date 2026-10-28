// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ status: vi.fn(), identity: vi.fn(), config: { mode: "stripe-live", enabled: true, termsVersion: "approved", priceYen: 980, freeDaily: 10 } }));
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: mocks.identity }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => ({ service: { status: mocks.status } }) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlyConfig: () => mocks.config }));
import BillingPage from "@/app/billing/page";
beforeEach(() => {
  vi.clearAllMocks();
  mocks.config.enabled = true;
  mocks.identity.mockResolvedValue("alice");
  mocks.status.mockResolvedValue({ entitled: false, canManage: false, subscription: null });
});
describe("adopted monthly billing page (server render; Auth/storage mocked)", () => {
  it("discloses the live recurring offer without test assurances or legacy one-time terms", async () => {
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).toContain("月額980円（税込）");
    expect(html).toContain("毎月自動更新");
    expect(html).toContain("期間末解約");
    expect(html).not.toContain("実際の請求はありません");
    expect(html).not.toContain("1回払い・自動更新なし");
  });
  it("keeps new sales closed while publishing the offer and existing-contract warning", async () => {
    mocks.config.enabled = false;
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).toContain("新規申込を受け付けていません");
    expect(html).toContain("既存契約は自動解約されません");
    expect(html).toContain("disabled");
    expect(html).toContain("kenshi.ycc@gmail.com");
  });
  it.each(["identity", "status"] as const)("does not enable checkout when %s is unavailable", async target => {
    mocks[target].mockRejectedValue(Error("fixture_unavailable"));
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).toContain("disabled");
    expect(html).toContain("月額980円（税込）");
  });
  it.each(["active", "past_due"])("does not offer an additional contract to an existing %s account", async status => {
    mocks.status.mockResolvedValue({ entitled: status === "active", canManage: true, subscription: { status } });
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).toContain("追加契約はせず");
    expect(html).toContain("契約管理・解約・支払方法の変更");
    expect(html).not.toContain('type="checkbox"');
    expect(mocks.status).toHaveBeenCalledWith("alice");
  });
});
