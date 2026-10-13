# IPA Quiz

IPA 情報処理技術者試験（IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU）
全区分の公開過去問を無料で学べる、教育貢献型 AI ネイティブ学習プラットフォームです。

- ゼロ遷移の四択クイズ UI（タップ→即座に色変化＋解説スライドイン）
- AI コパイロット（公開過去問に沿う用語解説・選択肢分析・誤答分析）
- 全試験区分を 1 アプリに統合

オーナー決定方針（2026-10-13、未公開の作業ブランチ）では、Webの公開学習機能を全て無料・商業的なユーザー別回数枠なしとする。類題生成と独自作成の午後・論述問題は公開せず、論述AI採点の入口を設けない。短時間・IP・サイト全体の乱用防止、入力上限、認証の実権限、月間API費用の警告・停止は維持する。

## 技術スタック

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn ベース UI primitives
- Google Gemini API（`lib/ai/provider.ts` の抽象レイヤ経由）
- 学習履歴は `localStorage`（将来 Supabase に移行可能な抽象層）
- pnpm / ESLint / Zod / tsx / react-markdown / lucide-react / radix-ui

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# GEMINI_API_KEY を入れるか、空のまま起動して mock フォールバックで開発
pnpm dev
```

開発サーバは http://localhost:3000 で起動します。

`GEMINI_API_KEY` が空でも、AI コパイロットは `lib/ai/providers/mock.ts` のモックレスポンスで動作します。クイズ UI・レート制限などの挙動はキーなしでフル確認できます。

## 環境変数

| 変数 | 役割 | デフォルト |
| --- | --- | --- |
| `GEMINI_API_KEY` | Gemini API キー | （空でモック動作） |
| `ANTHROPIC_API_KEY` | Anthropic API キー（スタブ用） | — |
| `DATABASE_URL` | DB 接続文字列（フェーズ 2〜） | — |
| `NEXTAUTH_SECRET` | NextAuth シークレット（フェーズ 2〜） | — |
| `NEXTAUTH_URL` | アプリ公開 URL | — |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog プロジェクト API キー | — |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog ホスト | `https://us.i.posthog.com` |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN | — |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` | 任意のAmazon紹介タグ。閉鎖済み `safeaisite22-22` は無効化され通常商品リンクになる | — |
| `NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID` | 楽天アフィリエイト ID | — |
| `ADMIN_BASIC_USER` | 管理画面 Basic 認証ユーザー | — |
| `ADMIN_BASIC_PASS` | 管理画面 Basic 認証パスワード | — |
| `SLACK_WEBHOOK_URL` | cron ジョブ通知用 Webhook | — |
| `LLM_PROVIDER` | プロバイダ選択 | `gemini` |
| `GEMINI_MODEL_GRADING` | 公開停止中の午後記述・論述AI採点コードに残るモデル設定 | `gemini-2.5-flash` |

価格・回数・モデル変更は `CLAUDE.md` の「承認必須事項」扱いです。

## スクリプト

```bash
pnpm dev          # 開発サーバ起動
pnpm build        # 本番ビルド
pnpm typecheck    # TypeScript 型チェック
pnpm lint         # ESLint

pnpm fetch:pdfs         # IPA 公式 PDF をローカルへダウンロード
pnpm parse:pdfs         # PDF → JSON 変換
pnpm validate:questions # 問題データを zod で検証
pnpm tag:topics         # Gemini でトピックタグを自動付与
```

## デプロイ（Vercel）

```bash
npm i -g vercel
vercel link                   # 初回のみ
vercel env add GEMINI_API_KEY # production / preview / development で設定
vercel                        # preview deploy
vercel --prod                 # production deploy
```

## 監視

| エンドポイント | 用途 |
| --- | --- |
| `/api/health` | ヘルスチェック（Vercel / UptimeRobot 監視用） |
| PostHog | ページビュー・クイズ操作イベント |
| Sentry | フロント/サーバーエラー収集 |

## ディレクトリ構造

```
app/
  api/copilot/        AI コパイロット ストリーミング API
  api/health/         ヘルスチェック
  (home) page.tsx     モード選択ホーム
  quiz/               クイズプレイヤー
  modes/year,topic    年度別・分野別一覧
  about/              IPA出典・著作権ページ
components/
  quiz/               QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer
  copilot/            CopilotPanel + モバイルボトムシート
  ui/                 Button / Card / Dialog / Switch / Badge / Markdown
lib/
  ai/                 provider.ts + providers/{gemini,claude,openai,mock}.ts
  questions/          types / load / filter
  storage/            localStorage 履歴・設定
  rate-limit/         IP ベースのサーバー側レート制限
data/
  questions/ap/       AP 問題データ
scripts/              fetch / parse / validate / topic-tagger
```

## ライセンス / 出典

- 問題文・選択肢・模範解答は IPA 情報処理技術者試験の公開過去問を原典とし、各問に原典 PDF リンクを付与しています。
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しています。詳細は `/about` ページを参照してください。
- 解説本文・UI・タグ付け・AI 応答などは本サイト独自の著作物です。

## 貢献

現在は個人開発。Issue / PR は後日解放予定。
