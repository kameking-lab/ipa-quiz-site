// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ status: vi.fn(), identity: vi.fn(), config: { mode: "stripe-live", enabled: true, termsVersion: "approved", priceYen: 980, freeDaily: 10 } }));
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: mocks.identity }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => ({ service: { status: mocks.status } }) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlyConfig: () => mocks.config }));
import BillingPage from "@/app/billing/page";
import BillingTermsPage from "@/app/billing/terms/page";
const page = async (returnTo?: string) => renderToStaticMarkup(await BillingPage({ searchParams: Promise.resolve(returnTo ? { returnTo } : {}) }));
const text = (html: string) => html.replace(/<[^>]*>/g, "");
beforeEach(() => {
  vi.clearAllMocks(); mocks.config.enabled = true;
  mocks.identity.mockResolvedValue("alice");
  mocks.status.mockResolvedValue({ entitled: false, canManage: false, subscription: null });
});
describe("monthly billing page: one button, one line of terms", () => {
  it("keeps the required subscription terms in one line and sends the button straight to checkout", async () => {
    const html = await page("/q/ap/2023-spring/am/1");
    for (const required of ["月額980円で続ける", "月額980円（税込）", "毎月自動更新", "いつでも解約可（期間末まで利用可）", "日割返金なし", "条件・特商法表示"]) expect(text(html)).toContain(required);
    expect(html).toContain('href="/billing/start?returnTo=%2Fq%2Fap%2F2023-spring%2Fam%2F1"');
    expect(html).toContain('href="/billing/terms"');
    expect(html).toContain('aria-describedby="monthly-terms"');
  });
  it("says purchase needs no prior email: seller details are disclosed on request (特商法11条ただし書)", async () => {
    const html = await page();
    expect(text(html)).toContain("販売者の氏名・住所・電話番号は、ご請求があれば遅滞なく開示します（請求先: お問い合わせ）。");
    expect(html).toContain("mailto:kenshi.ycc@gmail.com");
    for (const removed of ["申込前に返信をご確認ください", "返信を受けて内容を確認してから", "販売者情報をメールで請求", "24時間が目安"]) expect(text(html)).not.toContain(removed);
  });
  it("has no wordy sections: no comparison table, no repeated disclaimers", async () => {
    const t = text(await page());
    for (const removed of ["無料と月額の違い", "プラン確認 → 決済 → 学習を再開", "ログインだけで課金は始まりません", "次の画面で月額980円（税込）の支払いを確定します"]) expect(t).not.toContain(removed);
  });
  it("keeps new sales closed while publishing the offer and existing-contract warning", async () => {
    mocks.config.enabled = false;
    const html = await page();
    expect(html).toContain("新規申込を受け付けていません");
    expect(html).toContain("既存契約は自動解約されません");
    expect(html).not.toContain("/billing/start");
    expect(text(html)).toContain("月額980円（税込）");
  });
  it.each(["identity", "status"] as const)("still offers the plan button when %s is unavailable (it signs in first)", async target => {
    mocks[target].mockRejectedValue(Error("fixture_unavailable"));
    const html = await page();
    expect(html).toContain('href="/billing/start"');
  });
  it.each(["active", "past_due"])("does not offer an additional contract to an existing %s account", async status => {
    mocks.status.mockResolvedValue({ entitled: status === "active", canManage: true, subscription: { status } });
    const html = await page();
    expect(html).toContain("追加購入は不要です");
    expect(html).toContain("契約管理・解約・支払方法の変更");
    expect(html).not.toContain("/billing/start");
    expect(mocks.status).toHaveBeenCalledWith("alice");
  });
  it("moves the full conditions and the 特商法 items to /billing/terms", () => {
    const t = text(renderToStaticMarkup(<BillingTermsPage />));
    for (const required of ["特定商取引法に基づく表示", "販売価格", "月額980円（税込）", "毎月自動更新", "契約管理から次回更新を停止", "支払確認後", "確認済みの利用期間を超えて利用権は延長されません", "日割返金はありません", "ご請求があれば遅滞なく開示します", "kenshi.ycc@gmail.com", "1日10問", "対応端末・ブラウザーの読み上げは無料"]) expect(t).toContain(required);
  });
});
