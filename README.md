# IPA Quiz

AIネイティブな、情報処理技術者試験(IPA)過去問学習プラットフォーム。

- ゼロ遷移の四択クイズUI（タップ→即座に色変化＋解説スライドイン）
- AIコパイロット常駐（用語解説・選択肢分析・類題・誤答分析）
- 全試験区分を1アプリに統合（IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU）

フェーズ1（MVP）の対象は「応用情報技術者(AP) 午前」。以降、順次拡張予定。

## 技術スタック

- Next.js 16 (App Router) + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn ベース UI primitives
- Google Gemini API（`lib/ai/provider.ts` の抽象レイヤ経由）
- 学習履歴は `localStorage`（将来 Supabase に移行可能な抽象層）
- pnpm / ESLint / Zod / tsx

## セットアップ

```bash
pnpm install
cp .env.example .env.local
# GEMINI_API_KEY を入れるか、空のまま起動して mock フォールバックで開発
pnpm dev
```

開発サーバは http://localhost:3000 で起動します。

### GEMINI_API_KEY 未設定時の挙動

`GEMINI_API_KEY` が空でも、AI コパイロットは `lib/ai/providers/mock.ts` の
モックレスポンスで動作します。クイズ UI・レート制限・セッション遷移などの
挙動はキーなしでフル確認できます。

## スクリプト

```bash
# IPA 公式 PDF をローカルへダウンロード (data/raw_pdfs/ は .gitignore 済み)
pnpm fetch:pdfs

# PDF → JSON 変換 (現状スケルトン)
pnpm parse:pdfs

# 問題データを zod で検証
pnpm validate:questions

# Gemini でトピックタグを自動付与 (ヒューリスティックのみ動作)
pnpm tag:topics

# Lint / typecheck / build
pnpm lint
pnpm typecheck
pnpm build
```

## 環境変数一覧

| 変数 | 役割 | デフォルト |
| --- | --- | --- |
| `LLM_PROVIDER` | プロバイダ選択 | `gemini` |
| `GEMINI_API_KEY` | Gemini API キー | （空でモック動作） |
| `GEMINI_MODEL_FREE` | 無料ユーザー向けモデル | `gemini-2.5-flash-lite` |
| `GEMINI_MODEL_PREMIUM` | プレミアム向けモデル | `gemini-2.5-flash` |
| `FREE_DAILY_LIMIT` | 無料枠の1日回数 | `30` |
| `PREMIUM_MINUTE_LIMIT` | プレミアムの1分ソフトリミット | `10` |

価格・回数・モデル変更は `CLAUDE.md` の「承認必須事項」扱いです。

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
app/                  Next.js App Router
  api/copilot/        AI コパイロット ストリーミング API
  quiz/               クイズプレイヤー (client loader)
  modes/year,topic    年度別・分野別一覧
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
data/
  questions/ap/       AP 問題データ (まずは手動キュレーションのサンプル)
scripts/              fetch / parse / validate / topic-tagger
```

## ライセンス / 出典

- 問題文・選択肢・模範解答は IPA 情報処理技術者試験の公開過去問を原典とし、
  各問に原典 PDF リンクを付与しています。
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しています。
  詳細は `/about` ページおよび IPA 公式の著作権ページを参照してください。
- 解説本文・UI・タグ付け・AI応答などは本サイト独自の著作物です。

## 貢献

現在は個人開発。Issue / PR は後日解放予定。
