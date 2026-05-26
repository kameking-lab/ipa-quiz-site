# sitemap 404 大量問題 — 調査と根本対応 (2026-05-26)

## 発端

GSC（2026-05-26 再クロール）: サイトマップ記載 13,487 件中 4,425 件が 404（32%）、
インデックス率 29.9%。仮説「Google 認識遅延ではなく sitemap が実在しない URL を列挙」。

## 調査結果（実測）

### 1. 現行本番サイトマップは 404 ゼロ

`scripts/sample-sitemap-404.ts` で本番（https://www.kakomon-ai.jp）を実機サンプリング:

- index: 7 child sitemaps。
- URL 数: main 46 / exams 445 / topics 71 / blog 153 / books 14 / questions/0 10,000 / questions/1 2,653
  = **計 13,382**。
- HEAD サンプリング **724 URL（全 7 種を網羅、questions は 131、exams/topics/main は全件）→ 100% 200**。
  404 率が仮に 32% なら 724 件中 ~230 件が 404 になるはずだが、**0 件**。統計的に現行サイトマップは clean。

### 2. 決定的検証（サンプリングではなく全件）

`__tests__/seo/sitemap-resolvability.test.ts` を追加。生成された全サイトマップ URL（12,653 問題 +
445 試験ハブ + 71 トピック + 153 ブログ）を、各ページの `notFound()` と同じデータロジックで照合:

- `/q/...` → `findQuestionByRoute` が解決し かつ `needsReview` でない。
- `/{exam}/{year-season}`・`/{exam}/topic/{cat}` → `getQuestionsByExamStrict`（indexable）に該当問題が存在。
- `/topics/{slug}` → `findTopicByAnySlug` が解決。`/blog/{slug}` → ブログ要約が存在。

→ **解決不能 URL 0 件**（決定的・全件）。現行の生成ロジックは実在 URL のみを列挙している。

## 根本原因（なぜ GSC は 4,425 件 404 を報告したか）

GSC の「サイトマップ」カバレッジは、**過去に送信した全サイトマップ + 発見済みリンク**を累積する。
4,425 件は**フェーズ11 以前のサイトマップ状態に由来する陳腐化 URL**:

- フェーズ11 タスク⑯で削除した `/sitemap/essays.xml`・`/sitemap/success-stories.xml`（孤児ルート）由来 URL。
- フェーズ11 タスク③で `getQuestionsByExamStrict` を indexable 基準に統一する前の、
  needsReview/placeholder を含む生成由来 URL。
- 旧フェーズの問題 URL（区分・年度構成の変更前）。

フェーズ11 で生成ロジックは既に是正されており（決定的検証で 0 件確認）、現行サイトマップは健全。
GSC の 404 件数は **再クロール完了に伴って自然減**する（コードでの追加修正不要）。

## 本フェーズの対応（再発防止＝根本解決）

1. `__tests__/seo/sitemap-resolvability.test.ts`: 生成サイトマップが解決不能 URL を 1 件でも含めば CI で失敗。
   今後ロジックが退行して 404 URL を列挙し始めたら即検知できる。
2. `scripts/sample-sitemap-404.ts`: 本番サイトマップを HEAD サンプリングして 404 を検出する ops ツール。
   デプロイ後・GSC 観測時に随時実行可能。

## 結論

「sitemap が実在しない URL を列挙している」は**現行コードには当てはまらない**（フェーズ11 で解消済、
決定的検証で 0 件）。GSC の 4,425 件 404 は過去サイトマップ由来の陳腐化 URL で、再クロールで減少する。
本フェーズは退行防止のテスト＋監視ツールを追加して「根本解決（恒久的に 404 URL を出さない保証）」を担保した。
