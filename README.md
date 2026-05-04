# IPA Quiz

AIネイティブな、情報処理技術者試験(IPA)過去問学習プラットフォーム。

- ゼロ遷移の四択クイズUI（タップ→即座に色変化＋解説スライドイン）
- AIコパイロット常駐（用語解説・選択肢分析・類題・誤答分析）
- 全試験区分を1アプリに統合（IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU）
- ダークモード・PWA・キーボードショートカット・モバイル片手操作最適化

> **教育貢献プロジェクト**: 本サイトはIPA公開過去問の学習体験を最速にすることを
> 目的とした非営利寄りの個人開発プロジェクトです。プレミアム月額300円は運用コスト
> （Gemini API・ホスティング）回収のためのもので、利益最大化を目的としません。

β公開中・全機能無料。

## 技術スタック

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn ベース UI primitives
- Google Gemini API（`lib/ai/provider.ts` の抽象レイヤ経由）
- Prisma + Postgres（任意・履歴同期と課金で利用）
- NextAuth (Google / GitHub / Email マジックリンク)
- Stripe（プレミアム月額 300 円・任意）
- 学習履歴は `localStorage`（DB 接続時は同期可能）
- pnpm / ESLint / Zod / tsx

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# 最小構成: GEMINI_API_KEY を入れるか、空のまま起動して mock フォールバックで開発
pnpm dev
```

開発サーバは http://localhost:3000 で起動します。

### 段階的に有効化できる機能

| 必須? | 機能 | 設定する環境変数 |
| --- | --- | --- |
| 不要 | クイズ UI / モック AI コパイロット | （なし） |
| 推奨 | Gemini AI コパイロット | `GEMINI_API_KEY` |
| 任意 | 学習履歴同期・サインイン | `DATABASE_URL` + NextAuth (`AUTH_*`) |
| 任意 | プレミアム課金 | `STRIPE_*` 一式 + DATABASE_URL |
| 任意 | 管理画面 (`/admin/stats`) | `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS` |

詳しくは `.env.example` のコメントを参照してください。

### GEMINI_API_KEY 未設定時の挙動

`GEMINI_API_KEY` が空でも、AI コパイロットは `lib/ai/providers/mock.ts` の
モックレスポンスで動作します。クイズ UI・レート制限・セッション遷移などの
挙動はキーなしでフル確認できます。

## スクリプト

```bash
# IPA 公式 PDF をローカルへダウンロード (data/raw_pdfs/ は .gitignore 済み)
pnpm fetch:pdfs
pnpm fetch:pdfs:all

# PDF → JSON 変換 (Gemini Vision)
pnpm parse:pdfs
pnpm parse:all                 # 全 PDF 一括
pnpm parse:dry-run             # 走査だけ（API 呼ばない）

# 午後問題パーサ
pnpm parse:afternoon

# 問題データを zod で検証
pnpm validate:questions

# トピックタグ自動付与
pnpm tag:topics

# 解説の placeholder 検出 → 再生成
pnpm find:placeholders
pnpm regen:explanations

# Lint / typecheck / build
pnpm lint
pnpm typecheck
pnpm build
```

## 環境変数

`.env.example` に全変数を網羅。代表的なもの:

| 変数 | 役割 | デフォルト |
| --- | --- | --- |
| `LLM_PROVIDER` | プロバイダ選択（gemini 固定） | `gemini` |
| `GEMINI_API_KEY` | Gemini API キー | （空でモック動作） |
| `GEMINI_MODEL_FREE` | 無料ユーザー向けモデル | `gemini-2.5-flash-lite` |
| `GEMINI_MODEL_PREMIUM` | プレミアム向けモデル | `gemini-2.5-flash` |
| `BETA_DAILY_LIMIT` | β期間の1日リクエスト上限 | `50` |
| `BETA_MINUTE_LIMIT` | β期間の1分ソフトリミット | `15` |
| `DATABASE_URL` | Postgres（履歴同期/課金） | （未設定でも動作） |
| `AUTH_SECRET` | NextAuth セッション暗号化 | 必須（DB 利用時） |
| `STRIPE_SECRET_KEY` | Stripe API キー | 任意 |
| `ADMIN_BASIC_USER/PASS` | 管理画面 Basic 認証 | 必須（/admin 利用時） |

価格・回数・モデル変更は `CLAUDE.md` の「承認必須事項」扱いです。

## 監視・分析

- **Vercel Analytics**: `@vercel/analytics` で自動送信。追加設定不要
- **PostHog / Sentry**: `.env.example` に変数枠だけ用意済み（実装はフェーズ4）
- **Slack 通知**: 運用アラート用に `SLACK_WEBHOOK_URL` 枠あり（未実装）
- **管理画面 `/admin/stats`**: Basic 認証で保護。利用状況の簡易ダッシュボード

## Vercel デプロイ

```bash
npm i -g vercel
vercel link                                          # 初回のみ
vercel env add GEMINI_API_KEY                        # production / preview / development で設定
vercel env add NEXT_PUBLIC_SITE_URL                  # canonical/OGP 用
vercel env add ADMIN_BASIC_USER ADMIN_BASIC_PASS     # 管理画面保護
vercel                                               # preview deploy
vercel --prod                                        # production deploy
```

## ディレクトリ

```
app/                  Next.js App Router
  api/copilot/        AI コパイロット ストリーミング API
  api/scoring/        午後 AI 採点 API
  api/stripe/         Stripe Checkout / Portal
  api/webhooks/       Stripe Webhook
  api/account/        履歴同期・エクスポート
  quiz/               クイズプレイヤー
  modes/year,topic    年度別・分野別一覧
  [exam]/             試験区分別ルーティング
  q/[exam]/           クイズ実施ページ
  admin/              管理ダッシュボード（Basic 認証）
  about/              IPA出典・著作権ページ
components/
  quiz/               QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer
  copilot/            CopilotPanel + モバイルボトムシート
  ui/                 Button / Card / Dialog / Switch / Badge / Markdown
lib/
  ai/                 provider.ts + providers/{gemini,claude,openai,mock}.ts
  questions/          types / load / filter
  storage/            localStorage 履歴・プレミアム・レート制限
  rate-limit/         IP ベースのサーバー側レート制限
  auth/               NextAuth 設定
  db/prisma.ts        Prisma クライアント
  stripe/             Stripe クライアント抽象
  seo/config.ts       共通 SEO 設定
data/
  questions/          全試験区分の問題データ
scripts/              fetch / parse / validate / topic-tagger / regenerate
prisma/               DB スキーマ
```

## ライセンス / 出典

- 問題文・選択肢・模範解答は IPA 情報処理技術者試験の公開過去問を原典とし、
  各問に原典 PDF リンクを付与しています。
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しています。
  詳細は `/about` ページおよび IPA 公式の著作権ページを参照してください。
- 解説本文・UI・タグ付け・AI応答などは本サイト独自の著作物です。

## 貢献

現在は個人開発。Issue / PR は後日解放予定。
