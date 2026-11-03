import { expect, test } from "@playwright/test";
import ip from "../../src/packs/ip.json" with { type: "json" };
import { CHOICES } from "../../src/domain";
import { fileURLToPath } from "node:url";

test("airplane-mode practice, explanation, restart, review and deletion", async ({ page, context }) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await context.route("https://**/*", async route => { external.push(route.request().url()); await route.abort(); });
  // Simulate Capacitor's embedded asset server: local resources remain available
  // while the OS network is disabled, including first launch and restart.
  await context.route("http://127.0.0.1:4178/**", async route => {
    const path = new URL(route.request().url()).pathname;
    await route.fulfill({ path: fileURLToPath(new URL(`../../dist${path === "/" ? "/index.html" : path}`, import.meta.url)) });
  });
  await context.setOffline(true);
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /今日もひと問/ })).toBeVisible();
  await expect(page.locator(".connection")).toContainText("オフライン");
  await page.getByRole("button", { name: /ITパスポート/ }).click();
  const q = ip.questions[0];
  await expect(page.getByRole("heading", { name: q.question })).toBeVisible();
  const wrong = CHOICES.find(c => c !== q.answer)!;
  await page.getByRole("button", { name: `${wrong} ${q.choices[wrong]}`, exact: true }).click();
  await expect(page.getByRole("heading", { name: "固定解説" })).toBeVisible();
  await expect(page.getByText(q.explanation, { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "AIに質問する" })).toBeDisabled();
  await page.screenshot({ path: "test-results/offline-explanation.png", fullPage: true });
  await page.reload();
  await expect(page.getByRole("heading", { name: "固定解説" })).toBeVisible();
  await page.getByRole("button", { name: "記録", exact: true }).click();
  await expect(page.getByText("累計 1問", { exact: true })).toBeVisible();
  await page.getByRole("navigation").getByRole("button", { name: /^復習/ }).click();
  await page.getByRole("button", { name: /ITパスポート/ }).click();
  await page.getByRole("button", { name: `${q.answer} ${q.choices[q.answer as typeof CHOICES[number]]}`, exact: true }).click();
  await page.getByRole("button", { name: "次の問題へ →" }).click();
  await expect(page.getByText("この資格の復習が終わりました。おつかれさまでした。")).toBeVisible();
  await page.getByRole("button", { name: "記録", exact: true }).click();
  await expect(page.getByText("累計 2問", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "設定", exact: true }).click();
  await page.getByRole("button", { name: "学習記録を削除…" }).click();
  await page.getByRole("button", { name: "削除する", exact: true }).click();
  await expect(page.getByText("学習記録を削除しました。")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "記録", exact: true }).click();
  await expect(page.getByText("累計 0問", { exact: true })).toBeVisible();
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
});

test("uncertain correct answers stay in review; online API is called only after explicit consent", async ({ page, context }) => {
  const calls: string[] = [];
  await context.route("https://www.kakomon-ai.jp/api/**", async route => {
    calls.push(route.request().url());
    const headers = { "access-control-allow-origin": "*", "access-control-allow-headers": "content-type" };
    if (route.request().method() === "OPTIONS") { await route.fulfill({ status: 204, headers }); return; }
    if (route.request().url().includes("/api/copilot")) {
      const body = route.request().postDataJSON() as { tier: string; messages: unknown[]; question: { id: string } };
      expect(body.tier).toBe("free"); expect(body.question.id).toBe(ip.questions[0].id);
      await route.fulfill({ status: 200, contentType: "text/plain", body: "これはモックのAI回答です。", headers });
    } else await route.fulfill({ status: 204, headers });
  });
  await page.goto("/");
  await page.screenshot({ path: "test-results/home.png", fullPage: true });
  await page.getByRole("button", { name: /ITパスポート/ }).click();
  await page.getByRole("checkbox", { name: "自信がないので、正解でも復習する" }).check();
  const q = ip.questions[0];
  await page.getByRole("button", { name: `${q.answer} ${q.choices[q.answer as typeof CHOICES[number]]}`, exact: true }).click();
  await page.getByLabel("この問題について聞く").fill("正解の理由は？");
  await expect(page.getByRole("button", { name: "AIに質問する" })).toBeDisabled();
  expect(calls).toEqual([]);
  await page.getByRole("checkbox", { name: /問題文・選択肢・解答・質問を/ }).click();
  await expect(page.getByRole("checkbox", { name: /問題文・選択肢・解答・質問を/ })).toBeChecked();
  await page.getByRole("button", { name: "AIに質問する" }).click();
  await expect(page.getByText("これはモックのAI回答です。")).toBeVisible();
  await expect(page.getByText(/本日の送信：1\/10回/)).toBeVisible();
  await page.getByRole("navigation").getByRole("button", { name: /^復習/ }).click();
  await expect(page.getByRole("button", { name: /ITパスポート.*復習待ち 1問/ })).toBeVisible();
  await page.getByRole("button", { name: "設定", exact: true }).click();
  await page.getByRole("button", { name: "更新を確認" }).first().click();
  await expect(page.getByText("最新の問題パックです。")).toBeVisible();
  await page.getByRole("button", { name: "通知を設定" }).click();
  await expect(page.getByText("リマインダーはiPhoneアプリで設定できます。")).toBeVisible();
  expect(calls.some(url => url.includes("/api/mobile/packs?pack=ip&since=1"))).toBe(true);
});
