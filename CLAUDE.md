# 過去問AI — Claude Code 向け指示書

本ファイルは Claude Code (Cursor 等) に対するプロジェクトコンテキストです。
新しいセッションを開始する際は、まず本ファイルを読んでから作業を始めてください。

## 1. プロジェクトビジョン

IPA 情報処理技術者試験（IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU）
全区分の公開過去問を網羅する、AI ネイティブな過去問学習プラットフォーム。

差別化軸:

1. **(A) UX最速**: 午前四択クイズのインタラクションを業界最速にする。
   画面遷移ゼロ・ローディングゼロで、モバイル片手操作で完結する。
2. **(B) AI コパイロット常駐**: 各問に AI が常駐し、用語解説・選択肢分析・類題生成・
   誤答分析を無制限対話で提供する。静的解説では届かない体験密度を作る。
3. **(C) 午後 AI 採点**: 午後記述／論文添削を AI で実現。

料金戦略はユーザー獲得最優先・持ち出し最小。月 980 円のプレミアムで
広告収益モデルと予備校の中間を狙う。

## 2. 技術スタック

- Next.js 16 App Router + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn 風 UI primitives (`components/ui/`)
- LLM: **Google Gemini**（Claude/OpenAI はスタブのみ）
- 認証: NextAuth.js v5（Google / GitHub / Email Magic Link）
- DB: Prisma + Postgres（学習履歴クラウド同期、サブスク管理）
- 決済: Stripe（Checkout / Customer Portal / Webhook）
- 学習履歴は `localStorage` を一次ソースとし、ログイン時に Prisma へ任意同期
- 解析: Vercel Analytics（`@vercel/analytics`）
- pnpm / ESLint / Zod / tsx / react-markdown / lucide-react / radix-ui / recharts

## 3. ディレクトリ構造

```
app/
  api/                       copilot / scoring / stripe / auth / account / email-list
  [exam]/                    試験区分トップ + 年度・分野・午後ページ
  q/[exam]/[ys]/[s]/[q]      問題詳細ページ（SEO 用個別 URL）
  account/                   学習履歴同期・サブスク管理
  admin/{stats,team}/        管理ダッシュボード（Basic 認証で保護）
  auth/{signin,signout,verify-request}/  認証画面
  pricing/                   料金プラン + 公開通知メアド登録
  modes/{year,topic}/        年度別・分野別一覧
  about/ faq/ privacy/ terms/ operator/  静的ページ
  sitemap.xml/ sitemap/[id]/ robots.ts opengraph-image.tsx
components/
  quiz/                      QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer / ClientQuizLoader
                             （lazy-loads one question at a time via /api/questions/next）
  afternoon/                 AfternoonPlayer / AfternoonResultView / AfternoonDisclaimer
  copilot/                   CopilotPanel
  seo/                       JsonLd / ShareButtons / AnswerReveal
  ui/                        Button / Card / Dialog / Switch / Badge / Markdown
  theme-provider.tsx ThemeToggle.tsx HistoryStats.tsx
  PremiumUpsellDialog.tsx KeyboardShortcutsHelp.tsx
  ServiceWorkerRegistration.tsx SiteLogo.tsx HeroDemoAnimation.tsx ExamCategoryGrid.tsx
lib/
  ai/                        provider.ts ← 必ずこの抽象経由で LLM を呼ぶ
                             providers/{gemini,claude,openai,mock}.ts
                             prompts.ts cost-tracker.ts
  questions/                 types / load / filter / get-questions
  afternoon/                 午後採点ロジック
  auth/                      NextAuth 設定
  db/                        Prisma クライアント
  stripe/                    Stripe クライアント・プラン定義
  plans/                     FREE / PREMIUM / TEAM プラン定義
  streak/                    Duolingo 式ストリーク
  seo/                       sitemap / OGP / 構造化データ
  exam-naming/history.ts     試験名称の歴史的変遷
  exam-config.ts             試験区分ごとのメタ情報
  storage/                   keys / history / rate-limit-client / settings
  rate-limit/server.ts       IP ベースの in-memory レート制限
  analytics/events.ts        クライアント側イベント定義
  team/mock-data.ts          法人ダッシュボードプロトタイプ用
  utils.ts                   cn / examLabel / formatYearSeason
data/
  questions/{exam}/          試験区分ごとの問題データ（IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU）
  raw_pdfs/                  .gitignore 対象 / fetch:pdfs の出力先
prisma/
  schema.prisma              User / Subscription / StudyRecord / Streak
  migrations/                Prisma マイグレーション履歴
scripts/
  fetch-ipa-pdfs.ts          IPA PDF クローラ
  parse-pdf-to-json.ts       PDF → JSON（Gemini Vision）
  parse-all.ts               一括パイプライン
  parse-afternoon/           午後問題専用パーサ
  validate-questions.ts      zod 検証
  topic-tagger.ts            Gemini タグ付け
  find-placeholder-explanations.ts  画像なし問題のプレースホルダ解説検出
  regenerate-explanations.ts        Gemini で解説を再生成
  fix-question-data-types.ts        過去の型エラー修正用
public/
  manifest.webmanifest       PWA マニフェスト
  icon-192.svg / icon-512.svg / favicon.svg / sw.js
docs/                        認証・課金セットアップガイドなど
```

## 4. 問題データスキーマ

`lib/questions/types.ts` を正とする。主要フィールド:

- `id` (`ap-2023h-am-q1` 形式)
- `exam` / `session` / `year` / `season` / `qNumber`
- `type` (`multiple-choice` | `descriptive` | `essay`)
- `category` / `topicTags[]` / `difficulty` (1-5)
- `question` / `choices{ア,イ,ウ,エ}` / `answer` / `explanation`
- `hasImage` / `imageUrls?` / `sourcePdfUrl` / `license: "IPA-public"`
- `isCalculation?` (計算問題のみ出題オプション用)

## 5. LLM 抽象レイヤ（超重要）

**`app/api/` 配下で Google SDK や Anthropic SDK を直接 import しないこと。**
必ず `lib/ai/provider.ts` の `getProvider()` 経由で呼ぶ。

```ts
const provider = await getProvider();
for await (const chunk of provider.streamChat({ system, messages, model, maxTokens })) { ... }
```

`GEMINI_API_KEY` が未設定の場合、自動的にモックプロバイダへフォールバックする。
これにより、キーなしでも UI 開発・E2E 検証が可能。

## 6. フェーズ分割ロードマップ

- **フェーズ1（完了：MVP）**: AP 午前 + クイズ UX + AI コパイロット + サーバー側レート制限
- **フェーズ2（完了）**: 全 13 区分の午前／午前 I・II データ投入、年度別・分野別表示、模試モード、ストリーク、ダークモード/PWA
- **フェーズ3（完了）**: AP 午後 AI 採点、3 層解説リファクタ、モバイル UX 細部調整、a11y 改善、解説品質検証強化
- **フェーズ4（進行中）**: NextAuth.js + Stripe 統合・3 プラン定義・学習履歴クラウド同期・`/admin/stats` `/admin/team` 管理画面・SEO 個別 URL
- **フェーズ5（未着手）**: 論文添削（ST/PM/SA/AU/SM）、参考書アフィリエイト UI、ANZEN AI 相互送客バナー、PostHog/Sentry 等の本格的な監視

## 7. コーディング規約

- ファイル命名: コンポーネントは PascalCase、ユーティリティは camelCase
- `cn(...)` は `lib/utils.ts` の `twMerge(clsx())` を使う
- 型は `export interface` 優先、簡単な union は `type`
- `"use client"` 宣言は必要最小限に（サーバーコンポーネント優先）
- localStorage キーは必ず `lib/storage/keys.ts` の `LS_KEYS` 経由で参照
- API ルートは `export const runtime = "nodejs"` 明示
- クイズ UI は **ゼロ遷移** が最優先。解説を見るためにページ遷移しない

## 8. IPA 出典ルール

- 全ページのフッターに「出典: IPA 情報処理技術者試験」を明記する
- 各問題には `sourcePdfUrl` を必ず保持し、解説末尾から原典 PDF へリンクする
- `/about` ページで著作権・利用条件を明記
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しているが、引用ルールは厳守

## 9. 料金プラン & レート制限設計

3 プラン構成（`lib/plans/index.ts` 参照）:

- **FREE**: 全試験・全機能アクセス無制限。AI コパイロットはサーバー側 IP 単位で
  1 日 50 回 / 1 分 15 回（`BETA_DAILY_LIMIT` / `BETA_MINUTE_LIMIT` で調整）。
  モデル: `gemini-2.5-flash-lite`。広告表示あり（本文と分離、控えめ）。
- **PREMIUM 月 980 円**: AI コパイロット無制限、モデル `gemini-2.5-flash`、広告非表示。
- **TEAM 月 30,000 円**: 法人向け、`/admin/team` ダッシュボードで進捗管理。

判定の優先度: NextAuth セッション → DB の `Subscription` → `localStorage` の
`ipa-quiz:premium:v1` フラグ（DB 未設定時のローカル開発フォールバック）。

Stripe Checkout / Customer Portal / Webhook は実装済み。
`STRIPE_*` 環境変数が空の場合は課金 UI を出さない defensive 設計。

## 10. 承認必須事項（触ってはいけないもの）

以下は「自律実行しないで、必ずユーザー確認を取る」こと:

- 新規外部 API の導入（Gemini 以外の LLM、PostHog、Sentry、Slack 通知 等）
- LLM プロバイダ変更（Gemini → Claude 等）
- デフォルトモデル変更（Flash-Lite → Flash 等）
- レート制限値の変更（`BETA_DAILY_LIMIT=50` / `BETA_MINUTE_LIMIT=15` 既定）
- プレミアム価格の変更（現状 980 円/月、TEAM 30,000 円/月）
- 無料枠の日次回数変更
- DB スキーマの新規作成・変更（`prisma/schema.prisma`）
- Stripe Price ID / 製品体系の変更
- 認証プロバイダの追加・削除
- アフィリエイト ID の変更（ANZEN AI と共有）
- 大規模 URL ルーティング再設計（既存の `/q/[exam]/...` SEO URL に影響するもの）
- AI コパイロットのシステムプロンプト大幅変更（`lib/ai/prompts.ts`）
- 「AI 競合言及禁止」ルールの緩和（直接的な競合言及）
- フッターの IPA 出典表記の削除・改変

## 11. 競合から学ぶ UX パターン集

真似るべき:
- 4モード（ランダム / 年度別 / 分野別 / 模試）
- 未回答モード、復習モード（間違えた問題のみ）
- 学習履歴のブラウザバックアップ＆復元
- 段級ランキング（ゲーミフィケーション）
- 模試問題数選択（全問/半分/20問/10問）
- 選択肢ランダム化、直近 2 回除外、計算問題のみ
- 分野別 CSV エクスポート

直すべき弱点（＝差別化点）:
1. UI が 2000 年代後半 PC 前提 → モバイル片手操作最優先
2. 回答→解説の画面遷移 → 同一画面スライドイン
3. 解説が静的 → AI コパイロット常駐
4. 高度試験は午前 II のみ → 午後 AI 採点で独占領域を開拓
5. 試験ごとのドメイン分断 → 単一アプリ統合、午前 I 共通履歴共有
6. 広告過多 → 参考書アフィリは控えめに UI 完全分離
7. ダークモード・PWA なし → 両方標準装備

## 12. コスト見積もり（Gemini Flash-Lite 前提）

- 平均 1 リクエスト あたり入力 1,200 token / 出力 600 token 想定
- Gemini 2.5 Flash-Lite: $0.10 / 1M input, $0.40 / 1M output
- 1 リクエストあたりコスト: $0.00012 + $0.00024 ≒ $0.00036 ≒ 0.055 円
- 無料ユーザー 1 日 50 回 × 1,000 人 = 50,000 req/日 ≒ 月 2,750 円
- 無料枠（1,000 req/日）活用で初期は実質 0 円運用が可能
- プレミアム 980 円/月 / 1 人 → 仮に 1 人当たり 1,000 req/月 = コスト約 55 円 = 粗利率 約 94%

## 13. よくあるタスクと手順

### 新しい試験区分を追加するとき

1. `data/questions/{exam}/index.ts` を作成し `QUESTIONS_BY_EXAM` に登録
2. `lib/utils.ts` の `EXAM_LABELS` は既に全区分あるので OK
3. ホーム画面 (`app/page.tsx`) と `components/ExamCategoryGrid.tsx` を必要に応じて更新

### AI プロンプトを調整するとき

- システムプロンプト本体は `lib/ai/prompts.ts::COPILOT_SYSTEM_PROMPT`
- クイックアクションは同ファイルの `QUICK_ACTIONS` マップ
- 大幅変更は「承認必須事項」扱い

### 問題データを追加するとき

- `data/questions/{exam}/by-year/` に年度別 TS ファイルを追加
- `pnpm validate:questions` でスキーマ検証
- 画像なし問題で解説が短すぎる場合は `pnpm find:placeholders` →
  `pnpm regen:explanations` で AI 再生成

### 環境変数を追加するとき

1. `.env.example` に追記（説明コメント付き）
2. `README.md` の「環境変数一覧」表に追加
3. 認証・課金関連であれば `docs/AUTH_AND_BILLING_SETUP.md` も更新

## 14. 姉妹プロジェクトと共有する構成

- ANZEN AI (safe-ai-site) と Vercel 環境・アフィリエイト枠を共有
- アフィリエイト ID: `NEXT_PUBLIC_AMAZON_TAG=safeaisite22-22`, `NEXT_PUBLIC_RAKUTEN_ID=5291f19d.a0fc3c16.5291f19e.b91d11f6`
- フェーズ5 で相互送客バナーを実装
