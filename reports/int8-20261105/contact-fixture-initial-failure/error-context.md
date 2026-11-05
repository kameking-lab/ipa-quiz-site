# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact-site.spec.ts >> 次の資格を初期選択し、任意項目を空のまま既存APIへ送信できる
- Location: tests\e2e\contact-site.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('status').filter({ hasText: 'お問い合わせを受け付けました' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('status').filter({ hasText: 'お問い合わせを受け付けました' })

```

```yaml
- link "メインコンテンツへスキップ":
  - /url: "#main-content"
- banner:
  - link "過去問AI ホーム":
    - /url: /
    - text: 過去問AI
  - navigation "グローバルナビゲーション":
    - link "料金・月額プラン":
      - /url: /billing
    - button "問題を解く"
    - link "IPA 模試":
      - /url: /mock-exam
    - link "検索":
      - /url: /search
    - link "ブックマーク":
      - /url: /bookmarks
    - link "学習進捗":
      - /url: /account/dashboard
    - link "推薦書籍":
      - /url: /recommended-books
  - link "設定":
    - /url: /settings
- main:
  - navigation "パンくずリスト":
    - list:
      - listitem:
        - link "ホーム":
          - /url: /
      - listitem: お問い合わせ
  - text: 教育貢献プロジェクト
  - heading "お問い合わせ" [level=1]
  - paragraph: 改善要望・質問・教育機関での活用ご相談・取材ご依頼など、お気軽にお寄せください。 すべての投稿に目を通します。
  - text: 先にご確認いただきたいページ
  - list:
    - listitem:
      - text: ・利用方法・解説の精度等：
      - link "よくある質問":
        - /url: /faq
    - listitem:
      - text: ・プロジェクトの考え方：
      - link "/about":
        - /url: /about
  - region "以前に案内された特典について":
    - heading "以前に案内された特典について" [level=2]
    - paragraph: 紹介・学割の受付やクーポンの新規発行は終了しました。以前に個別案内を受けた特典については、下のフォームから案内内容をお知らせください。学生証などの証明書類は送らないでください。
    - paragraph:
      - link "現在の料金・既存契約の確認はこちら":
        - /url: /billing
      - text: 。
  - paragraph: 「次の資格」と「過去問AI」は同じ kameking-lab が運営しています。次の資格への質問・不具合報告・訂正依頼は、種別「次の資格について」で受け付けます。このリンクでは「次の資格について」を初期選択しています。返信が必要な場合は、任意のメールアドレス欄にご記入ください。原則3営業日以内を目安に返信しますが、内容により確認に時間がかかる場合があります。
  - text: お問い合わせ種別
  - radio "改善提案"
  - text: 改善提案
  - radio "質問"
  - text: 質問
  - radio "教育機関での活用ご相談"
  - text: 教育機関での活用ご相談
  - radio "企業での活用ご相談"
  - text: 企業での活用ご相談
  - radio "取材・メディア"
  - text: 取材・メディア
  - radio "その他"
  - text: その他
  - radio "次の資格について" [checked]
  - text: 次の資格について お名前 （任意）
  - textbox "お名前 （任意）":
    - /placeholder: 山田 太郎
  - text: メールアドレス （任意・返信が必要な場合）
  - textbox "メールアドレス （任意・返信が必要な場合）":
    - /placeholder: example@example.com
  - text: お問い合わせ内容 *
  - textbox "お問い合わせ内容 *":
    - /placeholder: どんなことでもお気軽にどうぞ
    - text: 次の資格の掲載日程の訂正依頼です（ローカル検証）
  - paragraph: 24 / 4,000
  - alert: 運営への送信を確認できませんでした。入力内容は残っています。時間をおいて再送信してください。
  - button "送信する"
  - paragraph:
    - text: ※ いただいた個人情報は、お問い合わせ対応のためにのみ利用します。詳細は
    - link "プライバシーポリシー":
      - /url: /privacy
    - text: をご覧ください。
- contentinfo:
  - navigation "IPAの試験":
    - heading "IPAの試験" [level=3]
    - list:
      - listitem:
        - link "IP ITパスポート":
          - /url: /ip
      - listitem:
        - link "SG 情報セキュリティ":
          - /url: /sg
      - listitem:
        - link "FE 基本情報":
          - /url: /fe
      - listitem:
        - link "AP 応用情報":
          - /url: /ap
      - listitem:
        - link "NW ネットワーク":
          - /url: /nw
      - listitem:
        - link "SC セキュリティ":
          - /url: /sc
      - listitem:
        - link "DB データベース":
          - /url: /db
      - listitem:
        - link "IPAの全試験 →":
          - /url: /ipa
      - listitem:
        - link "IPA・安全を選ぶ →":
          - /url: /
  - navigation "安全衛生の試験":
    - heading "安全衛生の試験" [level=3]
    - list:
      - listitem:
        - link "免許試験":
          - /url: /e-learning/exams#licenses
      - listitem:
        - link "作業環境測定士":
          - /url: /e-learning/exams#measurement
      - listitem:
        - link "労働安全コンサルタント":
          - /url: /e-learning/exams#safety-consultant
      - listitem:
        - link "労働衛生コンサルタント":
          - /url: /e-learning/exams#health-consultant
      - listitem:
        - link "安全衛生の問題検索":
          - /url: /e-learning/search
      - listitem:
        - link "安全衛生の進捗・復習":
          - /url: /e-learning/progress
  - navigation "サービス":
    - heading "サービス" [level=3]
    - list:
      - listitem:
        - link "IPA 午後論述AI採点":
          - /url: /essay
      - listitem:
        - link "IPA デイリーチャレンジ":
          - /url: /challenge
      - listitem:
        - link "IPA 模試モード":
          - /url: /mock-exam
      - listitem:
        - link "模試記録":
          - /url: /account/dashboard#mock-scores
      - listitem:
        - link "料金・月額プラン":
          - /url: /billing
      - listitem:
        - link "FAQ":
          - /url: /faq
      - listitem:
        - link "機能特集":
          - /url: /features
      - listitem:
        - link "用語集":
          - /url: /glossary
      - listitem:
        - link "学習トピック":
          - /url: /keywords
      - listitem:
        - link "おすすめ問題集・参考書":
          - /url: /recommended-books
      - listitem:
        - link "ブログ":
          - /url: /blog
      - listitem:
        - link "サイトマップ":
          - /url: /sitemap
  - navigation "プロジェクト":
    - heading "プロジェクト" [level=3]
    - list:
      - listitem:
        - link "プロジェクトについて":
          - /url: /about
      - listitem:
        - link "公開ダッシュボード":
          - /url: /stats
      - listitem:
        - link "透明性レポート":
          - /url: /transparency
      - listitem:
        - link "運営者情報":
          - /url: /operator
      - listitem:
        - link "更新履歴":
          - /url: /updates
  - navigation "コミュニティ":
    - heading "コミュニティ" [level=3]
    - list:
      - listitem:
        - link "X @kakomon_ai_jp をフォロー（新しいタブで開く）":
          - /url: https://x.com/kakomon_ai_jp
          - text: X @kakomon_ai_jp
      - listitem:
        - link "日程・締切を探す・次の資格":
          - /url: https://tsugino-shikaku.jp/?utm_source=kakomon_ai&utm_medium=referral&utm_campaign=learning_network
      - listitem:
        - link "耳で復習・ミナト資格ラジオ":
          - /url: https://www.youtube.com/channel/UCrR65J1ZQ6Zzr0Gs70YPHNA?utm_source=kakomon_ai&utm_medium=referral&utm_campaign=learning_network
      - listitem:
        - link "Instagramで毎日1問":
          - /url: https://www.instagram.com/kakomon_ipa_jp/
      - listitem:
        - link "フィードバック":
          - /url: /contact
      - listitem:
        - link "コミュニティガイドライン":
          - /url: /community-guidelines
  - navigation "法的情報":
    - heading "法的情報" [level=3]
    - list:
      - listitem:
        - link "利用規約":
          - /url: /terms
      - listitem:
        - link "プライバシーポリシー":
          - /url: /privacy
      - listitem
      - listitem:
        - link "コンテンツ方針":
          - /url: /license
      - listitem:
        - link "運営者情報・特商法":
          - /url: /operator
      - listitem:
        - link "公式問題の著作権・出典":
          - /url: /about#attribution
  - text: テーマ
  - button "テーマ切替"
  - paragraph: 問題の原資料・公式正答の出典は、各問題・試験回の出典欄をご確認ください。
  - paragraph: サイトの学習用解説は原資料・公式正答とは別のものです。本サービスは各試験実施団体とは独立した非公式の学習支援サービスです。
  - paragraph:
    - link "著作権・出典":
      - /url: /license
- alert
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("次の資格を初期選択し、任意項目を空のまま既存APIへ送信できる", async ({ page }) => {
  4  |   // Browser runs may target configured deployments. Never forward a synthetic
  5  |   // support request; isolated API tests cover validation and Slack delivery.
  6  |   await page.route("**/api/contact", route => route.fulfill({ json: { ok: true } }));
  7  |   await page.goto("/contact?site=tsugino");
  8  |   await expect(page.getByRole("radio", { name: "次の資格について" })).toBeChecked();
  9  |   await expect(page.locator("main")).toContainText("同じ kameking-lab");
  10 |   await page.getByLabel("お問い合わせ内容").fill("次の資格の掲載日程の訂正依頼です（ローカル検証）");
  11 |   const posted = page.waitForRequest(r => r.url().endsWith("/api/contact") && r.method() === "POST");
  12 |   await page.getByRole("button", { name: "送信する", exact: true }).click();
  13 |   expect((await posted).postDataJSON()).toMatchObject({ kind: "contact", category: "tsugino", name: "", email: "" });
> 14 |   await expect(page.getByRole("status").filter({ hasText: "お問い合わせを受け付けました" })).toBeVisible();
     |                                                                                ^ Error: expect(locator).toBeVisible() failed
  15 | });
  16 | 
  17 | for (const query of ["", "?site=unknown", "?site=tsugino&site=unknown"]) {
  18 |   test(`通常・未対応・重複queryは従来の初期種別 ${query}`, async ({ page }) => {
  19 |     await page.goto(`/contact${query}`);
  20 |     await expect(page.getByRole("radio", { name: "改善提案" })).toBeChecked();
  21 |     await page.getByText("次の資格について", { exact: true }).click();
  22 |     await expect(page.getByRole("radio", { name: "次の資格について" })).toBeChecked();
  23 |   });
  24 | }
  25 | 
  26 | test("種別を変更でき、短すぎる本文では送信しない", async ({ page }) => {
  27 |   await page.goto("/contact?site=tsugino");
  28 |   await page.getByText("質問", { exact: true }).click();
  29 |   await expect(page.getByRole("radio", { name: "質問", exact: true })).toBeChecked();
  30 |   const posts: string[] = [];
  31 |   page.on("request", r => { if (r.url().endsWith("/api/contact")) posts.push(r.method()); });
  32 |   await page.getByLabel("お問い合わせ内容").fill("短い");
  33 |   await page.getByRole("button", { name: "送信する", exact: true }).click();
  34 |   await expect(page.locator("#contact-error")).toContainText("5 文字以上");
  35 |   expect(posts).toEqual([]);
  36 | });
  37 | 
  38 | test("390pxでもフォームは画面幅に収まり、プライバシーに転送先を説明する", async ({ page }) => {
  39 |   await page.setViewportSize({ width: 390, height: 844 });
  40 |   await page.goto("/contact?site=tsugino");
  41 |   await expect(page.getByRole("radio", { name: "次の資格について" })).toBeChecked();
  42 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  43 |   await page.goto("/privacy#5");
  44 |   await expect(page.locator('[id="5"]')).toContainText("Slack");
  45 |   await expect(page.locator('[id="5"]')).toContainText("次の資格");
  46 | });
  47 | 
```