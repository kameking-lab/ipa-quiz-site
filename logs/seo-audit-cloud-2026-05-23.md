# SEO Audit (Cloud Session) — 2026-05-23

Audit target: https://www.kakomon-ai.jp/ (production).
Repository snapshot: main @ d384151 (post Task ①/②).

## Method

Cloud container's outbound network policy blocks `kakomon-ai.jp`
(`HTTP/2 403 x-deny-reason: host_not_allowed`). All findings below are derived
by reading the source files that generate the production output:

- `app/robots.ts` → `/robots.txt`
- `app/sitemap.xml/route.ts` + `lib/seo/sitemap-xml.ts` → `/sitemap.xml`
- `app/<page>/page.tsx` + `app/<page>/layout.tsx` → meta tags, JSON-LD

Production HTML verification of the changes from Task ④ is recorded
separately after that PR is merged and Vercel finishes deploying.

## 3-1. robots.txt — full content (derived from app/robots.ts)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /auth/
Disallow: /account/
Disallow: /chat/share
Disallow: /api-docs
Disallow: /final-review-v3
Disallow: /strategy-discussion-v2
Disallow: /demo/

Sitemap: https://www.kakomon-ai.jp/sitemap.xml
Host: https://www.kakomon-ai.jp
```

- "Stop Claude" 等の AI クローラ汚染: **見つからず**（クリーン）。
- `grep` で `Stop Claude`, `GPTBot`, `ClaudeBot`, `CCBot`, `cohere-ai`, `noai`,
  `noimageai` を全リポジトリ走査済み。ヒットなし（`lib/ai/providers/claude.ts`
  のコメント文字列のみ）。
- `Host:` 行が含まれる: 一部クローラは無視するが、誤りではない。

## 3-2. sitemap 構造

トップ `/sitemap.xml` は sitemapindex で、7 つの固定子サイトマップ + N 個の
`questions/<i>.xml` チャンクを参照する：

- `/sitemap/main.xml` — 静的ルート 約 49 件（STATIC_ROUTES の長さ）
- `/sitemap/exams.xml` — `getExamHubRoutes()`、試験ハブ + 年度別 + カテゴリ別
- `/sitemap/topics.xml` — `getHubTopics(80, 4)` でハブトピック最大 80
- `/sitemap/blog.xml` — `getAllBlogSummaries()` 全件
- `/sitemap/books.xml` — `/recommended-books` + 13 試験 = 14 URL
- `/sitemap/essays.xml` — `ESSAY_EXAM_CODES` × 各試験の論述問題
- `/sitemap/success-stories.xml` — 試験別 + 全合格体験記
- `/sitemap/questions/<i>.xml` — `getSitemapChunkCount()` 分のチャンク
  （`SITEMAP_CHUNK_SIZE` ごと）

結論: 構造は適切。各子サイトマップは URL 件数が爆発しないようチャンク分割
されている。

## 3-3. meta description 文字数 — 14ページ

タスク基準: 150 文字未満 / 320 文字超 を検出。
日本語サイトの実用域は 80-120 字程度のため、150 字未満は数多くヒットするが、
タスク準拠で列挙する。

- `/` (app/page.tsx): 82 字 ← 短い (HOME_DESCRIPTION)
- `/quiz` (app/quiz/page.tsx): **メタデータ export なし** ← 重大
- `/mock-exam`: 59 字 ← 短い
- `/search`: 64 字 ← 短い
- `/success-stories`: 81 字
- `/study-plan`: 70 字
- `/my-progress`: 44 字（noindex なので影響軽）
- `/bookmarks`: 49 字（noindex なので影響軽）
- `/why-kakomon-ai`: 89 字（PAGE_DESCRIPTION）
- `/essays`: 87 字
- `/features`: 47 字 ← 短い
- `/quickstart`: 80 字（DESCRIPTION）
- `/blog`: 70 字
- `/q/[id]`: `questionSnippet()` で動的生成。最大 155 字に truncate されており
  個別ページは適切。

320 字超のページ: **なし**。

## 3-4. title tag 長さ — 14ページ（60 字超を検出）

- `/` HOME_TITLE 24 字 OK
- `/quiz` **title 未定義 → ルートテンプレ "%s | 過去問AI" にもデフォルトで
  fallback できない。"過去問AI — AIネイティブ過去問学習" を継承** ← 改善必要
- `/mock-exam`: "模試モード — 本番形式・制限時間付き" 19 字 OK
- `/search`: "問題検索" 4 字 OK
- `/success-stories`: "IPA試験 合格体験記｜13区分の合格者ストーリー集" 26 字 OK
- `/study-plan`: "自動学習スケジュール作成" 12 字 OK
- `/my-progress`: "マイ進捗" 4 字 OK
- `/bookmarks`: "ブックマーク" 6 字 OK
- `/why-kakomon-ai`: "過去問AI を選ぶ理由 ── IPA 試験対策サービス比較" 28 字 OK
- `/essays`: "業種別合格答案サンプル" 11 字 OK
- `/features`: "機能特集" 4 字 ← 短い（汎用すぎる）
- `/quickstart`: "3分でわかる過去問AIの始め方 — 過去問AI" 24 字 OK
- `/blog`: "IPA試験ブログ｜全13区分の合格戦略・勉強法・出題傾向" 28 字 OK

60 字超のページ: **なし**。

## 3-5. 構造化データ (JSON-LD) type 別有無

`@/components/seo/JsonLd` を import するページ:

- `/` (`WebSite` + `SearchAction` + `OfferCatalog` + `ItemList`)
- `/sitemap` (`BreadcrumbList`)
- `/q/[id]` (`Question` + `LearningResource` + `FAQPage` + `QAPage`
  + `WebSite` + `Quiz` + `BreadcrumbList` + `EducationalOrganization`)
- `/recommended-books`, `/recommended-books/[exam]`
- `/stats`, `/operator`, `/keywords`, `/keywords/[keyword]`
- `/success-stories` (index + exam + slug 3階層)
- `/why-kakomon-ai`
- `/blog`, `/topics`
- 他: 多数

JsonLd 未付与で監査対象 14 ページに該当するもの:
- `/quiz` — クイズ index ページ。Quiz 型 JSON-LD を生成しても意味は薄い
  （個別問題ページの `/q/[id]` が既に Quiz 構造化を持つ）
- `/search` — SearchResultsPage 構造化があれば理想だが必須ではない
- `/my-progress`, `/bookmarks` — noindex のため不要
- `/quickstart` — HowTo 構造化候補（ロングテール提案で扱う）
- `/study-plan` — HowTo 構造化候補

→ 即修正対象ではない（任意拡張）。

## 3-6. canonical URL 矛盾

- `SITE_BASE_URL` = `https://www.kakomon-ai.jp`（`lib/seo/config.ts`）
- ルート `layout.tsx` の `metadataBase` も同 URL
- 全ページ canonical はパス基準（"/foo"）で `metadataBase` を介して絶対化
- **矛盾なし**

ただし `/quiz` は canonical 未設定 → ルートの `/` を継承してしまう
（厳密には `metadata` 未 export のため Next.js デフォルト動作）。これは
重複コンテンツ扱いになりうるため修正対象。

## 3-7. og:image / twitter:card 完備チェック

ルート `layout.tsx` で全ページに継承される og:image:
`${BASE_URL}/opengraph-image` （= `app/opengraph-image.tsx` の動的 OG）。
twitter card は `summary_large_image`、`@kakomon_ai_jp` 連携あり。

ページ独自で og:image を上書きしているのは `/mock-exam`, `/success-stories`,
`/blog`, `/q/[id]` 等。ルート継承で全ページが og:image を持つ。
**欠落ページなし**。

## 3-8. robots meta noindex 誤設定検出

意図的に noindex のページ:
- `/my-progress` — localStorage 個人データ、noindex 妥当
- `/bookmarks` — 同上
- `/api-docs`, `/final-review-v3`, `/strategy-discussion-v2`, `/demo/*` —
  robots.txt で disallow + ページ側でも noindex 設定
- `/q/[id]` で `explanation` がプレースホルダの場合は noindex
  （`indexable = !isPlaceholderExplanation(q)`）

**誤った noindex は見つからず**。

## 発見問題サマリ

クリティカル: 1 件
- C1: `/quiz` ページにメタデータ export がない（title・description・
  canonical・robots すべて未定義）。ルートを継承するが、`alternates.canonical`
  もないため重複扱いされうる。

ミディアム: 6 件
- M1: `/` の HOME_DESCRIPTION が 82 字と短い（150 字基準）
- M2: `/mock-exam` の description が 59 字
- M3: `/search` の description が 64 字
- M4: `/features` の title が 4 字 "機能特集" と汎用すぎる
- M5: `/features` の description が 47 字と短く、検索結果で何ができるか伝わらない
- M6: `/study-plan`, `/blog`, `/essays` も 70-87 字でやや短い

ロー（任意）: 3 件
- L1: `/quickstart` に HowTo 構造化があると CTR 改善余地
- L2: `/study-plan` 同上
- L3: `/search` に WebSite > SearchAction（ルートで既設）に加えて
  SearchResultsPage 構造化があれば理想

## Task ④ で修正する範囲

- C1 (`/quiz` メタデータ追加) — 必須
- M1〜M5 のうち、検索意図に直結する `/`, `/mock-exam`, `/search`, `/features`,
  `/study-plan`, `/blog`, `/essays` の description を 130〜150 字程度に拡張
- /features の title を機能名を含む形に補強
- robots.txt は既にクリーンなので変更不要
- canonical 矛盾は `/quiz` の追加で解消
- og:image はルート継承で完備、追加修正不要
- 構造化データの大幅追加は Task ⑤ のロングテール提案に回す
