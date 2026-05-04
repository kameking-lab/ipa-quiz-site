# IPA Quiz

AIネイティブな、情報処理技術者試験(IPA)過去問学習プラットフォーム。

- ゼロ遷移の四択クイズUI（タップ→即座に色変化＋解説スライドイン）
- AIコパイロット常駐（用語解説・選択肢分析・類題・誤答分析）
- 全試験区分を1アプリに統合（IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU）

## このプロジェクトの位置づけ — 教育貢献 PJ

IPA 情報処理技術者試験は国家資格でありながら、過去問学習の体験は 2000 年代後半の
PC 前提 UI に取り残されている。本プロジェクトは:

- **教育機会の平準化**: 全機能を恒久的に無料公開。学生・転職者・社会人問わず誰でも 1 分で始められる
- **公開過去問の現代化**: IPA が公式に「許諾不要・使用料不要」と明示する公開過去問を、AI ネイティブなインターフェースで再構成
- **個人開発で持続可能な経済性**: 月 300 円のプレミアム課金 + 控えめなアフィリエイトのみで運用。広告で本文を分断しない

を方針として運営している。詳細な戦略・コーディング規約・承認必須事項は
[`CLAUDE.md`](./CLAUDE.md) を参照。

## 技術スタック

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn ベース UI primitives
- Google Gemini API（`lib/ai/provider.ts` の抽象レイヤ経由）
- 学習履歴は `localStorage` + Postgres (Prisma) のハイブリッド
- 認証: NextAuth.js v5（Google / GitHub / Email Magic Link）
- 課金: Stripe（テストモード可）
- pnpm / ESLint / Zod / tsx

## セットアップ

### 1. 依存関係

```bash
pnpm install
```

`postinstall` で `prisma generate` が走る。Prisma クライアントが
`node_modules/.prisma/client` に生成される。

### 2. 環境変数

```bash
cp .env.example .env.local
```

最低限の動作確認なら **何も入れなくて良い**。Gemini API キー未設定時は
`lib/ai/providers/mock.ts` のスタブ応答にフォールバックする。

各変数の役割は [`.env.example`](./.env.example) のコメントを参照。
認証・課金の詳細手順は [`docs/AUTH_AND_BILLING_SETUP.md`](./docs/AUTH_AND_BILLING_SETUP.md)。

### 3. 開発サーバ

```bash
pnpm dev
```

http://localhost:3000 で起動する。

### 4. （任意）データベース

```bash
# .env.local に DATABASE_URL を入れた後
pnpm db:migrate:dev
pnpm db:studio
```

DB 未設定でもアプリは動作する（ゲストモード: 履歴は localStorage のみ）。

## スクリプト

```bash
# 開発・検証
pnpm dev                  # Next.js dev server
pnpm build                # 本番ビルド
pnpm lint                 # ESLint
pnpm typecheck            # tsc --noEmit

# データパイプライン
pnpm fetch:pdfs           # IPA 公式 PDF をローカル取得 (data/raw_pdfs/, .gitignore 済)
pnpm parse:pdfs           # PDF → JSON 変換 (Gemini Vision)
pnpm parse:all            # 全試験区分を一括パース
pnpm parse:afternoon      # AP 午後専用パイプライン
pnpm validate:questions   # zod スキーマ検証
pnpm tag:topics           # トピックタグ自動付与

# 解説の品質改善
pnpm find:placeholders    # プレースホルダ解説の検出
pnpm regen:explanations   # Gemini で解説を再生成

# DB
pnpm db:generate          # Prisma クライアント生成
pnpm db:migrate:dev       # 開発マイグレーション
pnpm db:migrate:deploy    # 本番マイグレーション
pnpm db:studio            # Prisma Studio
```

## 主要環境変数

| カテゴリ | 変数 | 役割 |
| --- | --- | --- |
| Site | `NEXT_PUBLIC_SITE_URL` | OG / canonical 用ベース URL |
| LLM | `GEMINI_API_KEY` | Gemini API キー (空でモック動作) |
| LLM | `GEMINI_MODEL_FREE` / `_PREMIUM` | プラン別モデル |
| 制限 | `FREE_DAILY_LIMIT` / `PREMIUM_MINUTE_LIMIT` | レート制限値 |
| 認証 | `AUTH_SECRET` / `AUTH_URL` | NextAuth.js 必須 |
| 認証 | `AUTH_GOOGLE_*` / `AUTH_GITHUB_*` / `AUTH_EMAIL_*` | プロバイダ毎の鍵 |
| DB | `DATABASE_URL` | Postgres 接続文字列 |
| 課金 | `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` | Stripe 鍵 |
| 課金 | `STRIPE_PRICE_ID_PREMIUM` / `_TEAM` | Price ID |
| 管理 | `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS` | `/admin/stats/*` Basic 認証 |
| 監視 | `NEXT_PUBLIC_POSTHOG_KEY` / `_HOST` | プロダクト解析（Phase4 実装予定） |
| 監視 | `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | エラー監視（Phase4 実装予定） |
| 通知 | `SLACK_WEBHOOK_URL` | 運用アラート転送（Phase4 実装予定） |
| アフィリ | `NEXT_PUBLIC_AMAZON_TAG` / `_RAKUTEN_ID` | 参考書アフィリ |

価格・回数・モデル変更は `CLAUDE.md` の「承認必須事項」扱い。

## 監視と運用

現状は Vercel Analytics（`@vercel/analytics`）のみ常駐。本格的な監視レイヤは
Phase4 で導入予定:

- **PostHog**: ファネル / 機能フラグ / セッションリプレイ
- **Sentry**: クライアント・サーバ両方のエラー監視
- **Slack Webhook**: お問合せ・課金イベント・障害通知の転送
- **`/admin/stats`**: Basic 認証で保護された運営ダッシュボード（実装済）

## Vercel デプロイ

```bash
npm i -g vercel
vercel link
vercel env add GEMINI_API_KEY    # production / preview / development で個別設定
vercel                            # preview deploy
vercel --prod                     # production deploy
```

環境変数の詳細は [`docs/AUTH_AND_BILLING_SETUP.md`](./docs/AUTH_AND_BILLING_SETUP.md)
を参照。

## ディレクトリ

```
app/                  Next.js App Router
  api/                copilot / scoring / stripe / webhooks / account / email-list
  q/[exam]            問題詳細ページ (SSR)
  quiz/               クイズプレイヤー (client loader)
  modes/              年度別・分野別一覧
  account/            ログイン後のマイページ
  admin/              運営ダッシュボード (Basic 認証)
  pricing/            プラン比較
  about / privacy / terms / operator / faq
components/
  quiz/               QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer
  copilot/            CopilotPanel (+ モバイルボトムシート)
  afternoon/          午後 AI 採点 UI
  seo/                JsonLd / ShareButtons / AnswerReveal
  ui/                 Button / Card / Dialog / Switch / Badge / Markdown
lib/
  ai/                 provider.ts + providers/{gemini,claude,openai,mock}.ts
  questions/          types / load / filter
  storage/            localStorage 履歴・プレミアム・レート制限
  rate-limit/         IP ベースのサーバー側レート制限
  auth/               NextAuth.js v5 設定
  stripe/             Stripe クライアント
  db/                 Prisma クライアント
  seo/                JSON-LD / config
  streak/             連続学習バッジ
  exam-naming/        試験名称の歴史的変遷マッピング
data/
  questions/          試験区分別 TS データ (ap/ fe/ ip/ ...)
prisma/               schema + migrations
scripts/              fetch / parse / validate / regenerate
```

## ライセンス / 出典

- 問題文・選択肢・模範解答は IPA 情報処理技術者試験の公開過去問を原典とし、
  各問に原典 PDF リンクを付与している。
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示している。
  詳細は `/about` ページおよび IPA 公式の著作権ページを参照。
- 解説本文・UI・タグ付け・AI応答などは本サイト独自の著作物。

## 貢献

現在は個人開発。Issue / PR は後日解放予定。
