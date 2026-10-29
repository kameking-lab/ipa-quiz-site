import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { monthlyFixtureConfig } from "./monthly-fixture";
vi.mock("@/lib/billing/runtime", () => ({ billingIdentity: async () => "alice" }));
vi.mock("@/lib/billing/subscription/config", () => ({ monthlyConfig: () => monthlyFixtureConfig }));
vi.mock("@/lib/billing/subscription/runtime", () => ({ monthlyRuntime: () => ({ service: { status: async () => ({ canManage: false }) } }) }));
import MonthlyPage from "@/app/billing/MonthlyPage";
describe("candidate disclosure (local server render, not a real browser or approved terms)", () => {
  it("distinguishes partial/full refund from explicit cancellation and discloses renewal continuing", async () => {
    const html = renderToStaticMarkup(await MonthlyPage());
    for (const text of ["部分返金だけでは利用権や自動更新は変わりません", "全額返金が確認された請求分の利用権は終了", "返金は解約ではなく", "別途解約してください"]) expect(html).toContain(text);
    expect(html).not.toContain("部分返金を含め返金対象の利用期間は停止");
  });
});
