# サイトレビュー 2026-05-23

調査基準: main HEAD `2a357ec` / 直近マージPR #306〜#314 / read-only調査

---

## 0. エグゼクティブサマリ（社長向け 10行）

- 直近10日でTurnstile/KV化レート制限/SEO meta整備/a11y/lint cleanが揃って入り、`pnpm typecheck` / `pnpm lint` / `pnpm build` / `pnpm test`（60件）すべて緑、品質ゲートはここ数ヶ月で最良。
- SEOは87ページ中63ページにmetadata実装・JsonLd 63箇所・sitemap 7サブ＋questions動的分割と体系完成、PR #312で`/quiz` canonical重複も解消。
- 残課題の優先度トップ5は (1) `/bookmarks` `/settings` `/topics` のmetadata欠落 (2) form `aria-invalid/aria-required` 0件 (3) `next/image` 0使用 (4) image alt実装1件のみ (5) API routes (scoring/essay-grade/copilot/feedback) ユニットテスト0。
- 即着手推奨は (A) metadata欠落3ページ補修（30分） (B) 主要formにaria-invalid追加（1-2時間） (C) /api/scoring と /api/essay-grade のvitest最低限追加（半日）。
- 直近改善で「目に見える穴」はほぼ塞がれ、次フェーズはコンテンツ拡充とフェーズ3（午後AI採点）の本格実装へ進める段階。

---

## 1. コードベース静的レビュー

### 1-1. アーキテクチャ概観
- `app/page.tsx`: **85ファイル**、最上位41ディレクトリ。最深 `app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx`
- `app/api/route.ts`: **34エンドポイント** (admin監視6, AI生成3, 学習5, stats 4, v1互換4, 他)
- `components/`: **104 tsx**、最上位22 + サブ19ディレクトリ (`ui/`=primitives, `copilot/`=RAG UI, `quiz/`=解答フロー, `seo/JsonLd.tsx`=構造化データ共通)
- `lib/`: **126 ts**、34ディレクトリ。`copilot/`にRAG pipeline (citation-meta, corpus, rag, reranker, retriever, tokenize) が PR #308 で完全分離済
- `types/`: `next-auth.d.ts` 1ファイルのみ。他の型は各lib配下に分散

### 1-2. 品質指標（実測）
- `pnpm typecheck`: **0エラー**
- `pnpm lint`: **0エラー / 0警告** (PR #314で4 errors+8 warnings → 0/0)
- `pnpm build`: **成功**、80行のサマリで静的1592問題ページプリレンダリング含む
- `pnpm test` (vitest): **6ファイル / 60テスト全PASS**、24.7s
- bundle size: 個別ページサイズ未測定 (`@next/bundle-analyzer` 未導入)

### 1-3. 重複・dead code
- `lib/utils.ts` (cn/examLabel等5関数) と `lib/rate-limit.ts` (Upstash REST) は単体ファイルだが、サブディレクトリ版と責務分離されており重複なし
- `middleware.ts`: `/admin`, `/api/admin` Basic認証 (timing-safe比較)
- `instrumentation.ts`: Sentry動的ロード (DSN条件付き)
- 明らかなdead codeはgrep範囲で未検出

### 1-4. 設定厳格度
- `tsconfig.json`: `strict: true`, `noEmit: true`, パスエイリアス `@/*`
- `eslint.config.mjs`: `next/core-web-vitals + next/typescript`、SSR hydrationパターンで `react-hooks/{set-state-in-effect, purity}` のみoff
- `next.config.ts`: CSP実装 (script-src `'unsafe-inline'`含む / connect-srcはGemini/PostHog/Sentry/Vercel)、`optimizePackageImports`7パッケージ、redirects 7本、HSTS/X-Frame-Options/X-Content-Type-Options済

---

## 2. SEO累積効果レビュー

### 2-1. metadata実装
- 87 page/layoutのうち **63ファイル** に `metadata` または `generateMetadata`
- **未実装**: `/bookmarks`, `/settings`, `/topics` (生成関数あるがexport不統一)
- description文字数 44〜158字、canonical `alternates.canonical` 全ページ一貫
- PR #312で`/quiz`他6ページのdescription拡張 (47→126-158字)

### 2-2. 構造化データ
- `components/seo/JsonLd.tsx` 共通実装、**63ファイルで呼び出し**
- type別: `ListItem` 62 / `BreadcrumbList` 23 / `Organization` 22 / `CollectionPage` 11 / `Article` 6 / `WebSite,WebPage` 各5 / 計36種類
- **不足**: `Quiz`, `QAPage`, `HowTo` は各1-2件のみ — 問題ページに `Quiz` 型導入余地大

### 2-3. sitemap
- `lib/seo/sitemap-xml.ts` 8関数、7固定サブ (`main/blog/books/essays/exams/topics/success-stories`) + `questions` を `SITEMAP_CHUNK_SIZE` 単位で分割 (現状0.xml, 1.xml)
- `lastModified` (日単位), `changeFrequency` (daily〜yearly), `priority` (0.2〜1.0) 全設定
- 除外: `/admin /account /api-docs /demo /final-review-v3 /strategy-discussion-v2` → `robots.ts` でdisallow明示

### 2-4. 内部リンク
- `SiteHeader`: ナビドロップダウン (6モード+試験切替+アカウント) + モバイルメニュー
- Footer: 5列29リンク (試験区分8 / サービス6 / プロジェクト5 / コミュニティ5 / 法的5)
- BreadcrumbList JSON-LD 10ファイル (/q, /blog, /keywords, /success-stories ほか)
- orphan page: グローバルナビ網羅性高く、明確なorphan未検出

---

## 3. UX/a11y累積効果レビュー

### 3-1. 属性網羅（components/配下grep）
- `aria-*` 計 **276件** / `role` **53件** / `sr-only` **21件** / `focus-visible/focus:ring` **24-38件**
- `alt` **1件のみ** ← 画像はSVGデコレが多いが要点検
- Radix UI `DialogPrimitive` 採用でmodal focus trap自動

### 3-2. キーボードショートカット (`KeyboardShortcutsHelp.tsx`)
- `1-4`: 選択肢 / `Enter/Space/→`: 次問題 / `R`: 復習★ / `?`: ヘルプ
- 残課題: Escapeでヘルプ閉じた後のfocus復帰先未定義

### 3-3. 主要form実装
- **FeedbackModal**: sr-only legend, role=dialog, focus:ring-2, Turnstile連携 / `aria-describedby` 無し
- **SearchClient**: `aria-label="検索結果"`, `aria-live="polite"`, 空状態文言「該当する問題は見つかりませんでした。条件を変えてお試しください」
- **MyProgressClient (PR #309)**: `aria-label="1日の目標問題数を変更"`, `role=progressbar`, `aria-label="今日の学習進捗: {count}/{target}問"`
- **共通弱点**: `aria-invalid` / `aria-required` **0件**

### 3-4. 状態網羅
- `app/loading.tsx` (role=status), `app/error.tsx`, `app/not-found.tsx` (13リンク代替), `app/global-error.tsx` 全揃い
- `/search` 空状態は文脈ある文言、`/mock-exam` 空状態未確認

### 3-5. タップターゲット (PR #309反映)
- `components/ui/button.tsx`: 全4サイズに `[@media(pointer:coarse)]:min-h-[44px]` 実装 ← WCAG 2.5.5 AAA準拠
- パンくず `inline-block py-1.5`、「変更」ボタン `min-h-[32px] px-2 py-1` 追加

### 3-6. レスポンシブ
- Tailwind breakpoint: app/ で `sm:/md:/lg:/xl:` 計 **330件**、components/ui/ で5件
- ダイアログ `w-[calc(100%-2rem)] max-w-lg` でモバイル余白確保

---

## 4. パフォーマンス静的分析

### 4-1. 依存
- `framer-motion@12.38.0` (7ファイル、admin/stats中心): CSS animationで代替可
- `recharts@3.8.1` (stats/admin funnel): visx等の軽量化候補あり
- `react-markdown@10`, `@google/generative-ai@0.24`, `posthog-js@1.373`, `@sentry/nextjs@10.53` は妥当な用途

### 4-2. 画像最適化
- `next/image` **0件使用** ← 全SVGなので影響小だが今後raster追加時に運用ルール必要
- `public/` 配下: 全SVG 6本のみ (normal/spicy/sweet/favicon/icon-192/512)
- alt属性は1件のみ (再掲)

### 4-3. font
- `app/layout.tsx`: Geist / Geist_Mono を `display: swap` + `preload: true` で最適化済

### 4-4. コード分割
- `app/[exam]/page.tsx` でTBT削減用 `next/dynamic` 戦略的使用
- 他の巨大コンポーネントlazy化候補は未調査

### 4-5. レンダリング戦略
- ISR: `/stats` (revalidate 1800s), `/transparency` (5m)
- SSG: `/q/.../` (revalidate 86400s, 2024年以降のみ `generateStaticParams`、1592問プリレンダリング確認)
- Force Dynamic: admin領域10本
- デフォルトISR: `/blog/[slug]` (dynamicParams false)

### 4-6. テストカバレッジ
- E2E: tests/e2e `*.spec.ts` **20本** / 1531行 (quiz/essays/blog/bookmark/study-plan/mock-exam/pwa/copilot-rag/canonical/smoke-routes/auth/pricing等)
- ユニット: __tests__ **6ファイル60テスト** (BookmarkButton, bookmarks storage, copilot rag/reranker/retriever/citations)
- **不足**: API routes (scoring/essay-grade/copilot/feedback/generate-question) のユニットテスト0、admin系コンポーネント0

### 4-7. セキュリティ
- env: `process.env` 23行、`NEXT_PUBLIC_*` 接頭辞は `SENTRY_DSN`, `SITE_URL` 等公開許容のみ
- 認証: `middleware.ts` Basic認証(timing-safe), `/api/account/*` NextAuth `auth()`, `/api/scoring` `/api/essay-grade` Zod+rate-limit
- CSP: 固定ヘッダー運用、`'unsafe-inline'` はtheme bootstrap用、HSTS/XFO/XCTO設定済
- `pnpm audit` 未実行 (時間節約) — 別途定期実行推奨

---

## 5. コンテンツ品質レビュー

### 5-1. blog
- `data/blog/` 4ファイル (index.ts/types/generators/exam-data.ts、計9580行)
- `getAllBlogSummaries()` で動的ロード、実記事数はデータ駆動で未確認
- 「AI生成」表記あり

### 5-2. essays / success-stories
- `data/success-stories/` 4ファイル (personas/generators/index/types)
- 50+success-stories ([exam]/[slug] でビルドサマリより、ip/sg/fe 各複数 + その他10本)
- 「本答案はAI生成の参考例」「査読推奨」「not based on real individuals」明記済

### 5-3. /q/[id] 問題ページ
- `ExplanationLayers` でAI copilot統合解説
- `getRelatedBlogPosts` で関連blog記事リンク
- `CategoryStudyTip` で難易度・カテゴリ別tips
- `Sparkles` アイコンでAIコパイロット導線可視化

---

## 6. 改善優先度マトリクス

| 課題 | 緊急度 | 工数 | 種別 |
|---|---|---|---|
| `/bookmarks` `/settings` `/topics` metadata欠落 | 高 | 小 | SEO |
| form `aria-invalid/aria-required` 0件 | 高 | 小 | a11y |
| `/api/scoring` `/api/essay-grade` `/api/copilot` ユニットテスト0 | 高 | 中 | テスト |
| 問題ページ `Quiz` 型JSON-LD未活用 | 中 | 中 | SEO |
| image `alt` 1件のみ (decorative判定要レビュー) | 中 | 小 | a11y |
| Escape後のfocus復帰未定義 | 中 | 小 | a11y |
| `pnpm audit` の定期実行整備 | 中 | 小 | セキュリティ |
| bundle analyzer導入 | 低 | 小 | パフォ |
| `next/image` 運用ルール整備 (raster追加時) | 低 | 小 | パフォ |
| admin系コンポーネントテスト | 低 | 大 | テスト |
| framer-motion / recharts 軽量化検討 | 低 | 大 | パフォ |
| `Quiz/QAPage/HowTo` JSON-LD type拡大 | 低 | 中 | SEO |
| `/mock-exam` 空状態確認・補修 | 低 | 小 | UX |

---

## 7. 推奨ロードマップ（中期）

### 次の1週間（即着手推奨）
1. metadata欠落3ページ補修 (`/bookmarks`, `/settings`, `/topics`) — 30分
2. FeedbackModal / SearchClient / 主要form に `aria-invalid` `aria-required` 追加 — 1-2時間
3. `/api/scoring` と `/api/essay-grade` のvitest最低限追加 (Zod境界・rate-limit動作) — 半日
4. 問題ページに `Quiz` 型JSON-LD追加 — 半日

### 次の1ヶ月
5. フェーズ3着手準備: 午後AI採点プロンプト設計 + 採点rubric定義
6. `/api/copilot` のRAG E2Eテスト拡充 (現状 user-journey-copilot-rag のみ)
7. `pnpm audit` をCI週次実行 (.github/workflows追加)
8. blog記事品質ばらつき調査 (記事毎の文字数・内部リンク密度)
9. `@next/bundle-analyzer` 導入してbundle size baseline測定

### 余裕があればやるべき
10. framer-motion使用箇所のCSS animation代替検討
11. admin系コンポーネントのvitest追加
12. AI クローラ (ClaudeBot/GPTBot) の許諾ポリシー明示
13. Escape後のfocus復帰実装 (KeyboardShortcutsHelp)

---

## 付録: 直近マージPR効果サマリ

| PR | 効果 | 残課題 |
|---|---|---|
| #306 Turnstile | feedback spam対策fail-open | bot trafficトレンド可視化未 |
| #307 rate-limit KV | Upstash KV化で永続化 | KV障害時fallback動作確認テスト未 |
| #308 copilot分離 | RAG pipeline完全モジュール化 | RAGメトリクス常時計測未 |
| #309 UX a11y | tap target 44px / aria-label | form `aria-invalid` 未 |
| #310 session summary | 開発ログ整備 | — |
| #311 TURNSTILE env | .env.example補足 | — |
| #312 SEO meta | `/quiz` canonical重複解消 | metadata未実装3ページ残存 |
| #313 SEO提案 | 長尾戦略レポート | オーナー判断待ち |
| #314 lint clean | 0/0達成 | CI failありで再発防止策未 |
