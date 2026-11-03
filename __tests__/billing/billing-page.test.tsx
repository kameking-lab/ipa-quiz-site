// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ status: vi.fn(), identity: vi.fn(), config: { mode: "stripe-live", enabled: true, termsVersion: "approved", priceYen: 980, freeDaily: 10 } }));
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: mocks.identity }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => ({ service: { status: mocks.status } }) }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlyConfig: () => mocks.config }));
import BillingPage from "@/app/billing/page";
beforeEach(() => {
  vi.clearAllMocks(); mocks.config.enabled = true;
  mocks.identity.mockResolvedValue("alice");
  mocks.status.mockResolvedValue({ entitled: false, canManage: false, subscription: null });
});
describe("adopted monthly billing page (server render; Auth/storage mocked)", () => {
  it("preserves price, renewal, cancellation, refund and AI terms in the simplified offer", async () => {
    const html = renderToStaticMarkup(await BillingPage());
    const text = html.replace(/<[^>]*>/g, "");
    for (const required of ["月額980円（税込）", "毎月自動更新", "期間末解約", "契約管理から次回更新を停止", "支払確認後", "確認済みの利用期間を超えて利用権は延長されません", "日割返金はありません", "無料AIは1日3回です", "有料会員は通常利用で回数無制限です", "日本時間の毎日0時更新", "短時間の大量送信やサービス全体の費用上限", "無料AIは生成を開始する試行ごとに1回を消費します", "開始後の失敗・中断・ユーザーによる停止・不正な出力でも回数は戻りません", "対応端末・ブラウザーの読み上げは無料", "音声や再生環境は端末によって異なります", "月額プランの詳細条件・利用規約", "新しいタブで開きます", "申込前に返信をご確認ください"]) expect(text).toContain(required);
    for (const required of ['href="/billing/terms"', 'target="_blank"', 'rel="noopener noreferrer"', 'aria-describedby="purchase-consent checkout-next"']) expect(html).toContain(required);
    for (const prohibited of ["現行の月額プランはAI応答の利用料金を含みません", "実際の請求はありません", "1回払い・自動更新なし"]) expect(text).not.toContain(prohibited);
    expect(text).toContain("同意して決済へ進む");
    expect(text).toContain("次の画面で月額980円（税込）の支払いを確定します。確定前に戻れます。");
  });
  it("keeps new sales closed while publishing the offer and existing-contract warning", async () => {
    mocks.config.enabled = false;
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).toContain("新規申込を受け付けていません");
    expect(html).toContain("既存契約は自動解約されません");
    expect(html).not.toContain('aria-describedby="purchase-consent checkout-next"');
    expect(html).toContain("kenshi.ycc@gmail.com");
  });
  it.each(["identity", "status"] as const)("does not enable checkout when %s is unavailable", async target => {
    mocks[target].mockRejectedValue(Error("fixture_unavailable"));
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).not.toContain('aria-describedby="purchase-consent checkout-next"');
    expect(html).toContain("ログインして購入へ進む");
    expect(html.replace(/<[^>]*>/g, "")).toContain("月額980円（税込）");
  });
  it.each(["active", "past_due"])("does not offer an additional contract to an existing %s account", async status => {
    mocks.status.mockResolvedValue({ entitled: status === "active", canManage: true, subscription: { status } });
    const html = renderToStaticMarkup(await BillingPage());
    expect(html).toContain("追加購入は不要です");
    expect(html).toContain("契約管理・解約・支払方法の変更");
    expect(html).not.toContain('aria-describedby="purchase-consent checkout-next"');
    expect(mocks.status).toHaveBeenCalledWith("alice");
  });
});
