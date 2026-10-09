import { expect, test } from "@playwright/test";

test("anonymous registered seller page shows source and modification notice", async ({ page }) => {
  const response = await page.goto("/q/tohan/2025-kansai/gakka/q1");
  expect(response?.status()).toBe(200);

  const notice = page.getByRole("complementary", { name: "登録販売者試験問題の出典と加工表示" });
  await expect(notice).toBeVisible();
  await expect(notice).toContainText("関西広域連合 令和7年度 登録販売者試験（前半）問1");
  await expect(notice).toContainText("ルビ・改行・表組みを整理");
  await expect(notice).toContainText("関西広域連合による解説の作成・監修ではありません");
  await expect(notice.getByRole("link", { name: "原典の問題PDF" })).toHaveAttribute(
    "href",
    "https://www.kouiki-kansai.jp/material/files/group/12/R7tourokuhannbaisyashiken_zennhan.pdf",
  );
  await expect(notice.getByRole("link", { name: "原典の正答PDF" })).toHaveAttribute(
    "href",
    "https://www.kouiki-kansai.jp/material/files/group/12/R7touhan_kaitou.pdf",
  );
});

test("unreleased 2024 registered seller session stays unavailable", async ({ page }) => {
  const response = await page.goto("/q/tohan/2024-kansai/gakka/q1");
  expect(response?.status()).toBe(404);
});
