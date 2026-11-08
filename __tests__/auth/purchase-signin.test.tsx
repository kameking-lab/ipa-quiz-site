// @vitest-environment node
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({ redirect: vi.fn(() => { throw new Error("redirect"); }) }));
vi.mock("@/lib/auth", () => ({ auth: async () => null }));
// Production configures Apple and Google (AUTH_APPLE_ID/SECRET, AUTH_GOOGLE_ID/SECRET) plus email.
vi.mock("@/lib/auth/config", () => ({ authConfig: { providers: [{ id: "apple" }, { id: "google" }, { id: "nodemailer" }] } }));
vi.mock("@/lib/auth/app-review-config", () => ({ appReviewConfig: () => null }));
import SignInPage from "@/app/auth/signin/page";

const text = (html: string) => html.replace(/<[^>]*>/g, "");

it("on the way to Checkout shows only the title, the provider buttons (Apple and Google) and one-line notes", async () => {
  const html = renderToStaticMarkup(await SignInPage({ searchParams: Promise.resolve({ callbackUrl: "/billing/start?returnTo=%2Fq%2Fap%2F2023-spring%2Fam%2Fq12" }) }));
  expect(text(html)).toContain("ログインして決済へ");
  expect(text(html)).toContain("Appleでサインイン");
  expect(text(html)).toContain("Google でログイン");
  expect(html).toContain("data-purchase-focus");
  for (const removed of ["メールアドレス", "または", "履歴クラウド同期", "ログインだけで課金は始まりません", "購入画面に戻る", "あと2ステップ"]) expect(text(html)).not.toContain(removed);
});

it("keeps the ordinary sign-in page (with email and the site footer) for other destinations", async () => {
  const html = renderToStaticMarkup(await SignInPage({ searchParams: Promise.resolve({ callbackUrl: "/review" }) }));
  expect(text(html)).toContain("Appleでサインイン");
  expect(html).not.toContain("data-purchase-focus");
  expect(text(html)).toContain("または");
});
