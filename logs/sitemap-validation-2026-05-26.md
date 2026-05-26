# sitemap 検証手順 (2026-05-26)

## ビルド時（自動・CI）

- `pnpm test -- __tests__/seo/sitemap-resolvability.test.ts`
  生成サイトマップの全 data-driven URL（問題・試験ハブ・年度・分野・トピック・ブログ）が、
  各ページの notFound 条件と同じロジックで解決することを決定的に検証。解決不能 URL があれば失敗。

## デプロイ後（本番実機・ops）

- `pnpm tsx scripts/sample-sitemap-404.ts --per=80`
  本番サイトマップを HEAD サンプリングし、status tally と非 200 URL を出力。
  `--base=` で対象ドメイン、`--per=` で各 child の最大サンプル数を指定可。
- 全件チェックしたい場合は `--per=100000`（重い）。

## GSC での 404 件数の減少観測（社長作業）

1. Search Console → サイトマップ → `https://www.kakomon-ai.jp/sitemap.xml` を再送信（フェーズ11 で送信済）。
2. 「ページ」レポート → 「見つかりませんでした（404）」の件数を 1〜2 週間隔で観測。
   現行サイトマップは 404 を含まないため、再クロールに伴い 4,425 → 減少していく見込み。
3. 主要 URL は「URL 検査」で個別にインデックス登録をリクエスト可。

## 期待値

- 現行サイトマップ URL 数: 約 13,382（main 46 / exams 445 / topics 71 / blog 153 / books 14 /
  questions 12,653）。全件 200 想定（決定的検証・実機サンプリングともに確認済）。
- GSC の 404（4,425）は過去サイトマップ由来の陳腐化分。コード修正済のため、再クロールで自然減。
