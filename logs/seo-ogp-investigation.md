# SEO / OGP 調査メモ (fix/seo-ogp-and-sitemap)

## 調査日時
2026-05-09

## 問題 1: mock-exam OGP 画像なし

`app/mock-exam/page.tsx` は `export const metadata: Metadata = {...}` で静的 metadata を宣言しているが、
`openGraph.images` が一切設定されていない。
Twitter/OGP カードを共有したとき、画像が出ない状態。

### 修正方針
- `export const metadata` → `export async function generateMetadata({ searchParams })`
- searchParams から `exam` を取得し、試験区分名を OGP タイトルに反映
- `/api/og?type=mock-exam&title=...&subtitle=...` URL を `openGraph.images` / `twitter.images` に設定

---

## 問題 2: blog 記事 OGP 画像に日本語タイトルが反映されない

`app/blog/[slug]/page.tsx` の `generateMetadata` は既に OGP 画像 URL を生成している:

```typescript
const ogParams = new URLSearchParams({
  type: "blog",
  title: post.title,       // ← タイトルは渡されている
  subtitle: ...,
  body: post.description,
});
const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
```

**しかし `app/api/og/route.tsx` が Satori ベースの `ImageResponse` に日本語フォントを渡していない。**
結果として、日本語テキストが全て □ (tofu) でレンダリングされる。

### 修正方針
- `GET` ハンドラ内で Google Fonts API (Noto Sans JP weight=700) を fetch してキャッシュ
- `ImageResponse` オプションに `fonts: [...]` を渡す
- `fontFamily: "'Noto Sans JP', sans-serif"` に変更

---

## 問題 3: /essays/sc がサイトマップに未掲載

`lib/seo/sitemap-xml.ts` の `STATIC_ROUTES` および各サイトマップ関数のどこにも
`/essays/sc` は含まれていない。
`renderSitemapIndexXml()` が列挙するサイトマップファイルは:
  main / exams / topics / blog / books / questions チャンク のみ。

### 修正方針
1. `lib/seo/sitemap-xml.ts` に `getEssayRoutes()` と `renderEssaysSitemapXml()` を追加
2. `renderSitemapIndexXml()` に `essays.xml` を追加
3. `app/sitemap/essays.xml/route.ts` を新規作成

対象 URL:
- `/essays/sc` (ハブ)
- `/essays/sc/2023-spring/pm2/q1`
- `/essays/sc/2024-spring/pm2/q1`
- `/essays/sc/2025-spring/pm2/q1`

(将来 NW/DB 等追加時も `SC_ESSAY_EXAM_CODES` 拡張で自動追従)

---

## ファイル変更一覧

| ファイル | 変更種別 |
|---|---|
| `app/api/og/route.tsx` | Noto Sans JP フォントロード追加・mock-exam/essay type 追加 |
| `app/mock-exam/page.tsx` | generateMetadata 化・OGP 画像 URL 追加 |
| `lib/seo/sitemap-xml.ts` | getEssayRoutes 関数追加・essays.xml を index に追加 |
| `app/sitemap/essays.xml/route.ts` | 新規作成 |
