# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: batch3-release.spec.ts >> batch3: surveyor afternoon uses manual assessment, original figures and official examples
- Location: tests\e2e\batch3-release.spec.ts:27:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  getByRole('region', { name: '記述の独自解答例' }).locator('img').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('region', { name: '記述の独自解答例' }).locator('img').first()
    13 × locator resolved to <img loading="lazy" alt="2026年 午後 No.1 公式解答例（1）" class="mx-auto h-auto max-w-full" src="/images/questions/batch3/6ed2e06bfc7fcdff5b807676bc7cf19c8f2c541fa8a52174e98cbd889d97a5c0.webp"/>
       - unexpected value "hidden"

```

```yaml
- link "メインコンテンツへスキップ":
  - /url: "#main-content"
- banner:
  - link "過去問AI ホーム":
    - /url: /
    - text: 過去問AI
  - button "メニューを開く": メニュー
- heading "測量士 年度別過去問演習" [level=1]
- navigation "クイズモード切替":
  - group: 学習モード：年度別
- navigation "試験科目を選択":
  - link "午前":
    - /url: /quiz?mode=year&exam=sokuryoshi&year=2026&season=annual&session=am&returnTo=%2Fq%2Fsokuryoshi%2F2026-annual%2Fpm%2Fq1
  - link "午後":
    - /url: /quiz?mode=year&exam=sokuryoshi&year=2026&season=annual&session=pm&question=sokuryoshi-2026-annual-pm-q1&returnTo=%2Fq%2Fsokuryoshi%2F2026-annual%2Fpm%2Fq1
- main:
  - button "モード選択に戻る"
  - text: "測量士 令和8年度 問必須〔No. 1〕 測量法・公共測量の制度と管理 #測量法・公共測量の制度と管理 1問目 / 5問中"
  - button "読み上げ"
  - button "読み上げ速度設定": ×1.00
  - paragraph: 必須〔No. 1〕
  - paragraph: 原問題の本文・選択肢・図表は次の原本画像で確認してください。
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（1/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/f92e9c3cf95e7cc7cc002e9c2792381548bb3bdba60272dee0b55bdde75f14ca.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（2/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/ddca2099e5b44092a5550113e10527491da57f1f0c673e7e4a33e9df6f1cb97c.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（3/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/8eaae6ae0118acc2f0aa71411c3d12e836cf7c7a0ba00d02c548b58e790f1467.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（4/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/3553f315a42dc2f5e1cef4a5362d6ccff5060e99aa0558ae7b2d2f2296bc40c3.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（5/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/9c5300ea983513f7f1403c8bf7b3a88e8e717c0c03d70feb5f64f027331e7786.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（6/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/7a2694600807979d40f42ec2b3455fe758ef6f6b4165ce00c87394a2589b6a03.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（7/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/fd9ff93fca3eacc12b1f697b35604bb65a202b8f72f5e689d19ca9e8d19dc47c.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（8/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/fa4c71213edeb2a95eebd8780c2bf16eb0bfc7c9e6226dd3d6a8c1ba807e1038.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（9/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/89c76dd9f1dd5ab073429b76f030cec7676244d31909872b319832e46710b845.webp
  - figure "図表を拡大して表示":
    - img "2026年 必須〔No. 1〕 原問題・図表（10/10）"
    - link "図表を拡大して表示":
      - /url: /images/questions/batch3/873d9adcd2a574800713ec589f985e0fe0160442e5e08c5cb7f72a3b0d34ea29.webp
  - region "記述の独自解答例":
    - paragraph: 公式問題に基づく独自解答例
    - paragraph: 記述・作図は答案用紙に解き、解答例の計算過程・申請内容・図面と照らして確認してください。この画面では記述答案の自動採点を行いません。
    - group: 独自解答例と作図例を確認する
    - link "実施団体の公式問題PDF":
      - /url: https://www.gsi.go.jp/common/000278972.pdf
    - link "公式正解例の出典":
      - /url: https://www.gsi.go.jp/common/000279272.pdf
    - link "参照資料（資料内の対象・年度を確認）":
      - /url: https://www.gsi.go.jp/common/000258734.pdf
    - paragraph: 出典：国土地理院 令和8年測量士試験 午後 No.1（公式問題・公式解答例）。図表・作図を含む原文は原本画像、解説は過去問AIの独自作成。
    - button "次の問題へ"
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
- alert: クイズ — 過去問演習 | 過去問AI
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | import { mkdirSync } from "node:fs";
  3  | import { questionPagePath } from "../../lib/seo/question-url";
  4  | import scope from "../../reports/int7-20261105/release-scope.json";
  5  | import benrishi from "../../data/questions/batch3/benrishi.json";
  6  | import travel from "../../data/questions/batch3/chiiki-ryoko.json";
  7  | import type { Question } from "../../lib/questions/types";
  8  | 
  9  | test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: "block" });
  10 | test("batch3: new qualification hubs and retained GSC entry URLs work at mobile width", async ({page}) => {
  11 |   test.setTimeout(120_000);
  12 |   for (const code of Object.keys(scope)) {
  13 |     const response = await page.goto(`/${code}`);
  14 |     expect(response?.status(), code).toBe(200);
  15 |     await expect(page.locator("main h1").first()).toBeVisible();
  16 |     if (code === "dokugeki-chiba") await expect(page.getByText(/一般・農業用品目・特定品目/).first()).toBeVisible();
  17 |     if (code === "dojo-osen") await expect(page.getByText(/午前・午後（選択式）/).first()).toBeVisible();
  18 |     expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), code).toBe(true);
  19 |   }
  20 |   for (const url of ["/sc", "/nw", "/st", "/sa", "/ap", "/blog", "/blog/it-shikaku-rirekisho-kakikata", "/blog/ipa-shiken-fukusuu-kubun-juken", "/blog/koudo-gozen1-taisaku", "/blog/nw-gogo-jikan-haibun"]) {
  21 |     const response = await page.goto(url);
  22 |     expect(response?.status(), url).toBe(200);
  23 |     await expect(page.locator("main h1").first()).toBeVisible();
  24 |     await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.kakomon-ai.jp${url}`);
  25 |   }
  26 | });
  27 | test("batch3: surveyor afternoon uses manual assessment, original figures and official examples", async ({page}) => {
  28 |   await page.goto("/q/sokuryoshi/2026-annual/pm/q1");
  29 |   const model = page.getByRole("region", {name: "記述の独自解答例"});
  30 |   await expect(model.getByText(/自動採点を行いません/)).toBeVisible();
  31 |   await expect(model.getByRole("link", {name: "公式正解例の出典"})).toHaveAttribute("href", "https://www.gsi.go.jp/common/000279272.pdf");
  32 |   await expect(model.locator('img')).toHaveCount(2);
  33 |   await page.getByRole("link", {name: /クイズモードで開く/}).first().click();
  34 |   const practice = page.getByRole("region", {name: "記述の独自解答例"});
  35 |   await expect(practice).toBeVisible();
  36 |   await practice.locator("summary").click();
> 37 |   await expect(practice.locator('img').first()).toBeVisible();
     |                                                 ^ Error: expect(locator).toBeVisible() failed
  38 |   await expect(page.getByRole("radiogroup")).toHaveCount(0);
  39 |   expect(await page.evaluate(() => localStorage.getItem("ipa-quiz:history:v1"))).toBeNull();
  40 | });
  41 | test("batch3: travel multi-selection preserves exact grading and source diagrams", async ({page}) => {
  42 |   const question = travel.find(q => (q.requiredSelections ?? 1) > 1)!;
  43 |   await page.goto(`/quiz?mode=year&exam=chiiki-ryoko&year=${question.year}&season=annual&session=${question.session}&question=${question.id}`);
  44 |   const group = page.getByRole("group", {name: /選択肢/});
  45 |   await expect(group).toBeVisible();
  46 |   for (const key of question.answer as string[]) await group.getByRole("checkbox", {name: new RegExp(`^選択肢 ${key}:`)}).click();
  47 |   await expect(page.getByText("正解です。解説が表示されました。", {exact: true})).toHaveCount(1);
  48 | });
  49 | test("batch3: source figures render and contact site parameter retains both support paths", async ({page}, testInfo) => {
  50 |   const q = benrishi[0] as Question;
  51 |   await page.goto(questionPagePath(q));
  52 |   await expect(page.locator('img[src^="/images/questions/batch3/"]').first()).toBeVisible();
  53 |   await page.screenshot({path: testInfo.outputPath("benrishi-mobile.png"), fullPage: true});
  54 |   await page.goto("/contact?site=tsugino");
  55 |   await expect(page.getByRole("radio", {name: "次の資格について"})).toBeChecked();
  56 |   await expect(page.locator("#legacy-benefits")).toBeVisible();
  57 |   expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  58 |   mkdirSync("reports/int7-20261105/screenshots", {recursive:true});
  59 |   await page.screenshot({path:"reports/int7-20261105/screenshots/contact-mobile.png", fullPage:true});
  60 | });
  61 | 
```