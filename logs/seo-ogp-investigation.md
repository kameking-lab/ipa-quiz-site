# SEO OGP & Sitemap Investigation (2026-05-09)

## 問題1: mock-exam OGP

**現状**: `app/mock-exam/page.tsx` は `export const metadata` で静的に定義されており、
`openGraph.images` が完全に欠落している。OGP 画像が一切生成されていない。

**原因**: `generateMetadata` への変換が未実施。

**修正**: `generateMetadata` を追加し、`openGraph.images` に `/api/og?type=mock-exam&...` を設定する。
また `/api/og/route.tsx` の `TYPE_META` に `mock-exam` エントリを追加する。

## 問題2: ブログ記事 OGP

**現状**: `app/blog/[slug]/page.tsx` の `generateMetadata` には `post.title` を含む
OGP URL (`/api/og?type=blog&title=...`) が実装済み。コード上は正しい。

**根本原因**: `/api/og/route.tsx` が `fontFamily: "sans-serif"` のみ使用。
Vercel Edge runtime はデフォルトで日本語フォントを含まないため、日本語タイトルが
文字化け（豆腐）または不可視になる。

**修正**: Google Fonts から Noto Sans JP をフェッチし、`@vercel/og` の `fonts` オプションに渡す。

## 問題3: /essays/sc サイトマップ未掲載

**現状**: `lib/seo/sitemap-xml.ts` の `STATIC_ROUTES` には `/essay` (旧 URL) があるが、
`/essays/sc` および配下のページが含まれていない。

**essays ページ一覧**:
- `/essays/sc` (exam hub)
- `/essays/sc/2023-spring/pm2/q1`
- `/essays/sc/2024-spring/pm2/q1`
- `/essays/sc/2025-spring/pm2/q1`

**修正**: `getEssayRoutes()` 関数を `lib/seo/sitemap-xml.ts` に追加し、
`renderMainSitemapXml()` に含める。`getSCpm2Questions()` を使うため、
将来の試験区分追加も自動反映される。

## 修正ファイル一覧

1. `app/api/og/route.tsx` - `mock-exam` type 追加 + 日本語フォント対応
2. `app/mock-exam/page.tsx` - `generateMetadata` 追加 (OGP images)
3. `lib/seo/sitemap-xml.ts` - `getEssayRoutes()` 追加・`renderMainSitemapXml()` に組み込み
