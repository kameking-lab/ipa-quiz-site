# 過去問AI

AI ネイティブな、情報処理技術者試験(IPA)過去問学習プラットフォーム。
教育貢献を主目的とした、無料で全機能アクセス可能な公開過去問アプリ。

- ゼロ遷移の四択クイズ UI（タップ→即座に色変化＋解説スライドイン）
- AI コパイロット常駐（用語解説・選択肢分析・類題・誤答分析）
- 全試験区分を 1 アプリに統合（IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU）
- 午後 AI 採点（AP）／論文添削（フェーズ4 で順次拡張）

## 教育貢献としての位置づけ

既存の過去問サイトで人力解説の蓄積はあるものの、
モバイル UX・AI コパイロット・午後 AI 採点については未着手領域が多い。
本プロジェクトはユーザー獲得最優先・持ち出し最小で、月 980 円のプレミアム +
無料広告モデルで運営する非営利寄りの教育サービスを目指す。

詳細な戦略・差別化軸・料金設計は [`CLAUDE.md`](./CLAUDE.md) を参照。

## 技術スタック

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn ベース UI primitives
- Google Gemini API（`lib/ai/provider.ts` の抽象レイヤ経由）
- NextAuth.js v5（Google / GitHub / Email Magic Link）
- Prisma + Postgres（学習履歴クラウド同期、サブスク管理）
- Stripe（Checkout / Customer Portal / Webhook）
- 学習履歴は `localStorage` を一次ソースとし、Prisma へ任意同期
- pnpm / ESLint / Zod / tsx / Vercel Analytics

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# 全て空でも起動可（Mock LLM / DB なしでフロント開発可）
pnpm dev
```

開発サーバは http://localhost:3000 で起動します。

### 段階的セットアップ

| 機能を有効化したい範囲   | 必要な環境変数                                                                                       |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| クイズ UI のみ           | なし（Mock LLM）                                                                                     |
| AI コパイロット          | `GEMINI_API_KEY`                                                                                     |
| ログイン                 | + `AUTH_SECRET` と Google/GitHub/Email のいずれか                                                    |
| 学習履歴クラウド同期     | + `DATABASE_URL`（Postgres）                                                                          |
| サブスク決済             | + `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` / `STRIPE_PRICE_ID_*`                                |
| `/admin/*` ダッシュボード | + `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS`                                                            |

詳細手順: [`docs/AUTH_AND_BILLING_SETUP.md`](./docs/AUTH_AND_BILLING_SETUP.md)

## スクリプト

```bash
pnpm dev                  # 開発サーバ
pnpm build                # 本番ビルド
pnpm start                # 本番サーバ
pnpm lint                 # ESLint
pnpm typecheck            # TypeScript 型検査

# 問題データ
pnpm fetch:pdfs           # IPA 公式 PDF をローカルへダウンロード
pnpm parse:pdfs           # PDF → JSON（Gemini Vision）
pnpm parse:all            # 全 PDF を一括変換
pnpm validate:questions   # zod でスキーマ検証
pnpm tag:topics           # トピックタグ自動付与
pnpm find:placeholders    # 画像なし問題のプレースホルダ解説検出
pnpm regen:explanations   # Gemini で解説を再生成

# Prisma
pnpm db:generate          # Prisma Client 生成
pnpm db:migrate:dev       # 開発用マイグレーション
pnpm db:migrate:deploy    # 本番マイグレーション
pnpm db:studio            # Prisma Studio
```

## 環境変数一覧

代表的なもののみ。完全版は [`.env.example`](./.env.example) を参照。

| 変数                       | 役割                                | デフォルト                  |
| -------------------------- | ----------------------------------- | --------------------------- |
| `LLM_PROVIDER`             | LLM プロバイダ選択                  | `gemini`                    |
| `GEMINI_API_KEY`           | Gemini API キー                     | （空でモック動作）          |
| `GEMINI_MODEL_FREE`        | 無料ユーザー向けモデル              | `gemini-2.5-flash-lite`     |
| `GEMINI_MODEL_PREMIUM`     | プレミアム向けモデル                | `gemini-2.5-flash`          |
| `BETA_DAILY_LIMIT`         | サーバー側 IP 単位 1 日制限         | `50`                        |
| `BETA_MINUTE_LIMIT`        | サーバー側 IP 単位 1 分制限         | `15`                        |
| `NEXT_PUBLIC_SITE_URL`     | OGP / sitemap で使う絶対 URL        | Vercel 自動                 |
| `AUTH_SECRET`              | NextAuth 署名鍵                     | 必須                        |
| `DATABASE_URL`             | Postgres 接続文字列                 | （空で DB 機能オフ）        |
| `STRIPE_SECRET_KEY`        | Stripe シークレットキー             | （空で課金機能オフ）        |
| `ADMIN_BASIC_USER` / `_PASS` | `/admin/*` の Basic 認証          | 両方空で `/admin` も無認証  |

価格・回数・モデル変更は `CLAUDE.md` の「承認必須事項」扱いです。

## 監視・分析

- Vercel Analytics: `@vercel/analytics` を `app/layout.tsx` で常時有効
- `/admin/stats` 管理画面: 学習履歴・利用状況の集計（Basic 認証で保護）
- `lib/analytics/events.ts`: クイズ操作のクライアント側イベント定義

PostHog / Sentry は未導入。導入は `CLAUDE.md` の「新規外部 API 導入」扱いとなり、
ユーザー承認が必要。

## Vercel デプロイ

```bash
npm i -g vercel
vercel link                  # 初回のみ
vercel env add GEMINI_API_KEY # production / preview / development で設定
vercel                        # preview deploy
vercel --prod                 # production deploy
```

## ディレクトリ

```
app/                     Next.js App Router
  api/                   API ルート（copilot, scoring, stripe, auth, account, ...）
  [exam]/                試験区分ごとのページ
  q/[exam]/[ys]/[s]/[q]  問題詳細ページ（SEO 用個別 URL）
  account/               アカウント・履歴同期
  admin/{stats,team}/    管理ダッシュボード（Basic 認証で保護）
  pricing/               料金プラン
  auth/{signin,signout}/ 認証画面
components/
  quiz/                  QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer
  copilot/               CopilotPanel
  afternoon/             午後採点 UI
  ui/                    Button / Card / Dialog / Switch / Badge / Markdown
  seo/                   JsonLd / ShareButtons / AnswerReveal
lib/
  ai/                    provider.ts + providers/{gemini,claude,openai,mock}.ts
  questions/             types / load / filter / get-questions
  afternoon/             午後採点ロジック
  storage/               localStorage 履歴・設定・レート制限
  rate-limit/            IP ベースのサーバー側レート制限
  auth/                  NextAuth 設定
  db/                    Prisma クライアント
  stripe/                Stripe クライアント・プラン定義
  streak/                Duolingo 式ストリーク
  seo/                   sitemap / OGP / 構造化データ
  exam-naming/           試験名称の歴史的変遷
data/
  questions/{exam}/      試験区分ごとの問題データ
prisma/                  Prisma スキーマ・マイグレーション
scripts/                 fetch / parse / validate / topic-tagger
docs/                    認証・課金セットアップガイドなど
```

## ライセンス / 出典

- 問題文・選択肢・模範解答は IPA 情報処理技術者試験の公開過去問を原典とし、
  各問に原典 PDF リンクを付与しています。
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しています。
  詳細は `/about` ページおよび IPA 公式の著作権ページを参照してください。
- 解説本文・UI・タグ付け・AI 応答などは本サイト独自の著作物です。

## 貢献

現在は個人開発。Issue / PR は後日解放予定。
