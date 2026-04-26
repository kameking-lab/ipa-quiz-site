# Major Issues — 第2巡（承認必須・本自動レビュー外）

## M2-1. hasImage:true 問題に画像が描画されない（UX 影響）
- 現状: `data/questions/` 全体で hasImage:true レコードが約 700 件以上、すべて imageUrls 欠落
- UI: `components/quiz/` で imageUrls を描画する処理なし、`/q/[exam]/...` も同様
- 影響: 「図のように」「表のように」を含む問題で図が見えず、回答困難
- フィルタ補強（Loop 2-1 でパターン拡張済）で一部除外されるが、根本解決には IPA 公式 PDF からの画像抽出または "画像必要問題" を pool から除外する仕組みが必要
- 工数: 8-16 時間（OCR/画像抽出スクリプト実装 + データバインド）
- 優先度: 高（UX に直接影響）
- 検出ループ: Round 2 Loop 1

## M2-2. 解説 3 層構造の遵守率が低水準
- 現状: AP 2024秋68問のみ3層化済、残12,094問は単純1行（「正解はXです。」）または1段落
- 現状 type 定義: `lib/questions/types.ts:48` `explanation: string`
- 競合（過去問道場）は静的解説で10年積み上げ。差別化のため AI 再生成が進行中（pnpm refactor:by-file）
- 別ループの大規模リファクタとして対応中
- 検出ループ: Round 2 Loop 1（既知）

## M2-3. explanation を構造化型に移行
- 現状: `explanation: string`
- 推奨: `explanation: { short: string; reasoning: string; supplement?: string }`
- 既存データのマイグレーションが大規模、現行 string も併存可能な抽象化が必要
- 工数: 4-8 時間（型定義 + マイグレーション + Markdown レンダラ更新）
- 優先度: 中
- 検出ループ: Round 2 Loop 1

## M2-4. AI コパイロット応答の post-validation
- 現状: `lib/ai/prompts.ts` に競合（過去問道場・スタディング等）言及禁止プロンプトはあるが、LLM 出力検証なし
- 推奨: `app/api/copilot/route.ts` のストリーミング出力で禁止語句 regex フィルタ（accumulator → block on match）
- 工数: 2-4 時間
- 優先度: 中（プロンプト遵守率が高い場合は不要）
- 検出ループ: Round 2 Loop 2

## M2-5. NextAuth allowDangerousEmailAccountLinking 見直し
- 現状: `lib/auth/config.ts` で Google/GitHub に true 設定
- リスク: 同一 email を異なる provider で取れる場合、第一登録者を上書きする乗っ取りリスク
- 推奨: false にして email verification を強制、もしくは linkAccount events で警告
- 工数: 2-3 時間（移行影響テスト含む）
- 優先度: 中（Premium 課金開始前に対応推奨）
- 検出ループ: Round 2 Loop 2

## M2-6. Magic Link メールテンプレート
- 現状: NextAuth Nodemailer provider の default テンプレート
- 推奨: ブランドカラー / from name / 署名をカスタム HTML テンプレートで上書き
- 工数: 1-2 時間
- 優先度: 低（UX 改善）
- 検出ループ: Round 2 Loop 2

## M2-7. User.plan を Subscription から derive する正規化
- 現状: `User.plan` は webhook で書き込まれる派生値
- リスク: webhook 失敗時に DB と Stripe が乖離
- 推奨: `User.plan` を削除し、active Subscription から都度 derive、または Subscription の view を作成
- 工数: 4-6 時間（マイグレーション含む）
- 優先度: 中（Premium 課金開始前に対応推奨）
- 検出ループ: Round 2 Loop 2

## M2-8. Sentry context PII サニタイザ
- 現状: `lib/monitoring/sentry.ts` の `captureException(err, ctx)` で `extra` を全送信
- リスク: 呼び出し側が email/cardLast4 等を extra に詰めた場合、Sentry に PII 流出
- 推奨: `extra` のキーを allowlist で絞る、または値を pattern マスク
- 工数: 1-2 時間
- 優先度: 中
- 検出ループ: Round 2 Loop 2

## M2-9. localStorage version migration
- 現状: `lib/storage/keys.ts` に LS_KEYS あるが、schema 変更時の migration 処理なし
- リスク: 古いユーザーが新型と互換性のない履歴データを保持
- 推奨: `lib/storage/migrate.ts` を新規実装、version 番号と migrator chain
- 工数: 2-3 時間
- 検出ループ: Round 2 Loop 3

## M2-10. Streak grace period
- 現状: 連続記録は厳密な日次境界で判定、1 日でも欠ければリセット
- 推奨: 1 日のグレース期間（連続記録復活）or「freeze」アイテムでオプション提供
- 工数: 3-4 時間
- 優先度: 中（Duolingo 式のリテンション強化）
- 検出ループ: Round 2 Loop 3

## M2-11. ChoiceButton role="radio" / aria-pressed
- 現状: `<button>` で実装、role/aria-pressed 不足
- 推奨: `role="radio"` + `aria-checked` で radio group セマンティクス、または `aria-pressed` で toggle
- 工数: 1-2 時間
- 優先度: 中（スクリーンリーダー UX）
- 検出ループ: Round 2 Loop 3

## M2-12. aria-live region 全体 re-render の抑制
- 現状: `CopilotPanel.tsx` ストリーミング中、メッセージ追加で aria-live region 全体が re-render され、スクリーンリーダーが全文再読
- 推奨: `aria-atomic="false"` を明示、または最後のメッセージのみ aria-live 領域へ
- 工数: 1-2 時間
- 優先度: 中
- 検出ループ: Round 2 Loop 3

## M2-13. PWA Service Worker offline 戦略
- 現状: `manifest.webmanifest` 設定済、`<ServiceWorkerRegistration />` あるが workbox 等の cache 戦略不明
- 推奨: cache-first for question data、network-first for AI API、stale-while-revalidate for assets
- 工数: 4-6 時間
- 優先度: 低（β中は許容、本番 PWA install 機能訴求時に対応）
- 検出ループ: Round 2 Loop 3

## M2-14. recharts を dynamic() で lazy load
- 現状: `app/admin/team/ExamProgressChart.tsx` で recharts 直接 import、admin user 以外も bundle に含む
- 推奨: `dynamic(() => import("recharts").then(...))` で client-side 限定遅延 load
- 工数: 1-2 時間
- 検出ループ: Round 2 Loop 4

## M2-15. SITEMAP_CHUNK_SIZE 拡張
- 現状: `lib/seo/sitemap-pagination.ts:4` SITEMAP_CHUNK_SIZE=10000、Google 推奨は 50000
- 推奨: 50000 へ拡張（chunk 数削減で sitemap index も簡素化）
- 工数: 30 分
- 検出ループ: Round 2 Loop 4

## M2-16. CSP script-src SHA-256 化
- 現状: theme bootstrap inline script のため `'unsafe-inline'` 許可
- 推奨: SHA-256 ハッシュ化または nonce 化で XSS 軽減力強化
- 工数: 2-3 時間
- 優先度: 中（XSS リスク低だが defense-in-depth）
- 検出ループ: Round 2 Loop 4

## M2-17. Vercel Live preview を production CSP から除外
- 現状: `next.config.ts` で connect-src/frame-src に `vercel.live` `pusher` を常時許可
- 推奨: `process.env.VERCEL_ENV === "preview"` 時のみ許可
- 工数: 30 分
- 検出ループ: Round 2 Loop 4

## M2-18. AI Copilot プロンプトに確信度言及指示追加
- 現状: `lib/ai/prompts.ts:4-66` COPILOT_SYSTEM_PROMPT は「嘘を書かない」「不確実性を確認するよう促す」指示はあるが、選択肢分析時に「確信度（例: 正答率 84%）」のような定量的目安を提示する指示がない
- 影響: 微妙な選択肢でも断言調になり、初学者が誤答理由を「絶対」と誤解するリスク
- 推奨: 「選択肢分析では確信度（高い/中程度/低い）を1行で添える」を行動規範に追加
- 工数: 30 分（プロンプト微調整 + 実機検証）
- 優先度: 中（プロンプト変更は承認必須）
- 検出ループ: Round 2 Loop 5

## M2-19. 模試モードの時間警告 / 中途離脱 dialog
- 現状: `app/mock-exam/MockExamClient.tsx` でタイマー実装あり、ただし
  - 残時間 1 分以下で警告表示なし
  - 戻るボタン / beforeunload 中途離脱の確認ダイアログなし
  - Escape キーで途中終了の挙動が未定義
- 影響: 模試の没入感・操作ミス時の喪失リスク
- 工数: 4-6 時間
- 優先度: 中（試験本番想定 UX）
- 検出ループ: Round 2 Loop 6

## M2-20. 広告コンポーネント実装
- 現状: `components/ads/` 不在、CLAUDE.md 「無料プラン: 広告表示あり（本文と分離、控えめ）」と乖離
- 推奨: AdSlot コンポーネント + `isPremium` フラグで条件レンダー、
  本文と完全分離した位置（フッター / sidebar）配置
- 工数: 8-12 時間（ASP 申請含む）
- 優先度: 中（収益化の基盤、フェーズ4 までに実装）
- 検出ループ: Round 2 Loop 6

## M2-21. Unit test 整備
- 現状: E2E (Playwright) 6 件のみ、unit test は zero
- 対象: `lib/streak/core.ts` / `lib/rate-limit/server.ts` / `lib/questions/filter.ts` /
  Stripe webhook 処理 / StudyRecord 同期ロジック など純粋関数
- 推奨: Vitest 導入、覆率 50% を目標に段階実装
- 工数: 16-24 時間（初期セットアップ + 主要ロジック）
- 優先度: 中（リファクタ安全網）
- 検出ループ: Round 2 Loop 6

## M2-22. 法人フォーム ハニーポット / レート制限
- 現状: `app/api/contact/enterprise/route.ts` は zod バリデーションのみ、
  spam 対策（ハニーポットフィールド・Cloudflare Turnstile 等）なし
  Resend 経由のため大量送信で月間クォータ消尽リスク
- 推奨: ハニーポット隠しフィールド + IP 単位レート制限（1日 5 件等）
- 工数: 2-4 時間
- 優先度: 中（コスト防衛）
- 検出ループ: Round 2 Loop 6
