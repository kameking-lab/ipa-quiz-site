# Major Issues — 承認必須・本自動レビュー外

## M1. CLAUDE.md のプレミアム価格表記が現実装と不整合
- 現状（実装）: 月額980円（`app/pricing/page.tsx:13`, `components/PremiumUpsellDialog.tsx:39`）
- CLAUDE.md §9 / §10: 「プレミアム 月 300 円」「価格変更は承認必須」
- 推奨: CLAUDE.md §9, §10, §12 を 980 円ベースに改訂
- 工数: 30 分
- 優先度: 中（戦略文書の整合性。コード優先度は低）
- 検出ループ: Loop 1

## M2. メタ description の試験別動的化
- 現状: ルート `description` は単一文字列。`[exam]/topic/[topicSlug]` だけ動的だが、`/modes/year` `/modes/topic` は応用情報限定文言。
- 推奨: `[exam]` セグメントレベルで `generateMetadata` を実装し、各試験ごとの description を出す
- 工数: 4-6 時間
- 優先度: 高（SEO 流入の試験別最適化に直結）
- 検出ループ: Loop 1
