# 過去問AI

情報処理技術者試験（IPA）の過去問を無料で学習できる、教育貢献プロジェクト。
全機能無料・ボランティア有志運営。広告・課金なし。

- **13区分 12,162問** 収録（IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU）
- ゼロ遷移の四択クイズ UI（タップ→即座に色変化＋解説スライドイン）
- AI コパイロット常駐（用語解説・選択肢分析・類題・誤答分析）
- ダークモード・PWA 対応

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# 全て空でも起動可（Mock LLM でフロント開発可）
pnpm dev
```

開発サーバーは http://localhost:3000 で起動します。

`GEMINI_API_KEY` が未設定でも、AI コパイロットは `lib/ai/providers/mock.ts` の
モックレスポンスで動作します。クイズ UI・レート制限などをキーなしでフル確認できます。

## 技術スタック

- Next.js 16 (App Router) + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn ベース UI primitives
- Google Gemini API（`lib/ai/provider.ts` の抽象レイヤ経由）
- 学習履歴は `localStorage`（将来 Supabase に移行可能な抽象層）
- pnpm / ESLint / Zod / tsx / react-markdown / lucide-react / radix-ui

## 環境変数

`.env.example` を参照。主要な変数:

| 変数 | 役割 |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API キー（空でモック動作） |
| `ANTHROPIC_API_KEY` | Anthropic API キー（スタブ用） |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog アナリティクス |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry エラー監視 |
| `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS` | 管理画面の Basic 認証 |
| `SLACK_WEBHOOK_URL` | Cron 通知先 Slack Webhook |

## スクリプト

```bash
pnpm typecheck        # TypeScript 型検査
pnpm build            # 本番ビルド
pnpm test             # ユニットテスト
pnpm test:e2e:smoke   # E2E スモークテスト

pnpm validate:questions  # 問題データを zod で検証
pnpm fetch:pdfs          # IPA 公式 PDF をダウンロード
pnpm parse:pdfs          # PDF → JSON 変換
pnpm tag:topics          # Gemini でトピックタグを自動付与
pnpm find:placeholders   # 画像なし問題のプレースホルダ解説検出
pnpm regen:explanations  # Gemini で解説を再生成
```

## デプロイ

Vercel（GitHub `main` ブランチへの push で自動デプロイ）。

環境変数は Vercel ダッシュボードまたは CLI で設定:

```bash
vercel env add GEMINI_API_KEY
```

## 監視

- **PostHog**: ページビュー・クイズ回答イベント
- **Sentry**: エラー・例外トラッキング
- **ヘルスチェック**: `/api/health`

## ディレクトリ構造

```
app/
  api/copilot/          AI コパイロット ストリーミング API
  api/health/           ヘルスチェック
  [exam]/               試験区分トップ + 年度・分野・午後ページ
  q/[exam]/[ys]/[s]/[q] 問題詳細ページ（SEO 用個別 URL）
  admin/{stats}/        管理ダッシュボード（Basic 認証で保護）
  modes/{year,topic}/   年度別・分野別一覧
  about/ faq/ privacy/ terms/ operator/  静的ページ
components/
  quiz/                 QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer
  afternoon/            AfternoonPlayer / AfternoonResultView
  copilot/              CopilotPanel + モバイルボトムシート
  ui/                   Button / Card / Dialog / Switch / Badge / Markdown
lib/
  ai/                   provider.ts + providers/{gemini,claude,openai,mock}.ts
  questions/            types / load / filter
  storage/              localStorage 履歴・レート制限
  rate-limit/           IP ベースのサーバー側レート制限
data/
  questions/{exam}/     全区分の問題データ（TS ファイル）
scripts/                fetch / parse / validate / topic-tagger / regen
```

## ライセンス / 出典

問題文・選択肢・模範解答は IPA 情報処理技術者試験の公開過去問を原典とし、
各問に原典 PDF リンクを付与しています。
IPA は過去問の使用について許諾不要・使用料不要と公式に明示しています。
詳細は `/about` ページおよび IPA 公式の著作権ページを参照してください。

解説本文・UI・タグ付け・AI 応答などは本サイト独自の著作物です。

## 貢献

Issue / PR 歓迎です。
