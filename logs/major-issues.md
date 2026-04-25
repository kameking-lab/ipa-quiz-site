# Major Issues — 承認必須・本自動レビュー外

## M1. CLAUDE.md のプレミアム価格表記が現実装と不整合
- 現状（実装）: 月額980円（`app/pricing/page.tsx:13`, `components/PremiumUpsellDialog.tsx:39`）
- CLAUDE.md §9 / §10: 「プレミアム 月 300 円」「価格変更は承認必須」
- 推奨: CLAUDE.md §9, §10, §12 を 980 円ベースに改訂
- 工数: 30 分
- 優先度: 中（戦略文書の整合性。コード優先度は低）
- 検出ループ: Loop 1

## M3. CLAUDE.md の AI コパイロット無料枠回数表記が現実装と不整合
- 現状（実装）: 50回/日（`lib/rate-limit/server.ts:BETA_DAILY_LIMIT` 既定 50、`FREE_DAILY_LIMIT_CLIENT = 50`）
- CLAUDE.md §9 / §12: 「1 日 30 回」「30,000 req/日」
- 推奨: CLAUDE.md §9, §10, §12, §13 を 50回/日ベースに改訂
- 工数: 30 分
- 優先度: 中（戦略文書整合）
- 検出ループ: Loop 2

## M2. メタ description の試験別動的化
- 現状: ルート `description` は単一文字列。`[exam]/topic/[topicSlug]` だけ動的だが、`/modes/year` `/modes/topic` は応用情報限定文言。
- 推奨: `[exam]` セグメントレベルで `generateMetadata` を実装し、各試験ごとの description を出す
- 工数: 4-6 時間
- 優先度: 高（SEO 流入の試験別最適化に直結）
- 検出ループ: Loop 1
- 補足（Loop 6）: `/modes/year` `/modes/topic` は試験別動作になったが、description は汎用化のみで試験別文言は未実装

## M8-1. 利用規約に有料プラン・アカウント解約条項が無い
- 現状: `app/terms/page.tsx` は ①サービス概要 ②AI ③免責 ④禁止事項 ⑤出典 ⑥準拠法 ⑦規約変更 の 7 セクション
- 不足条項: 「利用料金」「アカウント解約・データ削除」「会員資格」「年齢制限」
- `/commerce` には返金・解約条項があるが、利用規約本体に反映されていない
- 推奨: Premium 課金本格開始前に terms 全面改訂（消費者契約法対応）
- 工数: 4-8 時間（法務確認推奨）
- 優先度: 中（β は無料なので即時リスクなし、課金開始時に Critical 化）
- 検出ループ: Loop 8
