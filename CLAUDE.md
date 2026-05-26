# IPA Quiz — Claude Code 向け指示書

本ファイルは Claude Code (Cursor 等) に対するプロジェクトコンテキストです。
新しいセッションを開始する際は、まず本ファイルを読んでから作業を始めてください。

## 0. プロジェクト戦略（最重要）

### 教育貢献プロジェクト
本プロジェクトは **教育貢献** を第一義とし、IPA 過去問を誰でも無料で学べる環境を提供する。
収益化は教育価値を損なわない範囲に限定し、ユーザー獲得・学習継続率を最優先指標とする。

### 課金モード
`PAID_MODE=false`（デフォルト）。
**Stripe 本実装・プレミアム課金の有効化はフェーズ 4 まで実施しない。**
LocalStorage の `ipa-quiz:premium:v1` は開発検証用フラグであり、本番決済には紐づけない。

### API コスト上限
月間 API コストが **5 万円** に達した場合、新規 AI リクエストを自動停止し、Slack 通知を送る。
この上限はユーザーの承認なしに変更してはならない。

### 禁止事項
以下は **いかなる理由があっても自律実行禁止**:
- Stripe / 外部決済の本実装・有効化
- Enterprise プラン・法人向け課金の導入
- 既存の無料枠・価格設定の復旧（一度削除・変更した場合）
- 上記 API コスト上限の引き上げ・無効化

---

## 1. プロジェクトビジョン

IPA 情報処理技術者試験（IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU）
全区分の公開過去問を網羅する、AI ネイティブな過去問学習プラットフォーム。

競合「過去問道場」（siken.com 系ネットワーク）は人力解説で 10 年積み上げた歴史がある。
同じ武器では勝たない。差別化は以下 3 軸:

1. **(A) UX最速**: 午前四択クイズのインタラクションを業界最速にする。
   画面遷移ゼロ・ローディングゼロで、モバイル片手操作で完結する。
2. **(B) AI コパイロット常駐**: 各問に AI が常駐し、用語解説・選択肢分析・類題生成・
   誤答分析を無制限対話で提供する。競合の静的解説では届かない体験密度を作る。
3. **(C) 午後 AI 採点**: 午後記述／論文添削を AI で実現。競合が未着手の領域を押さえる。

料金戦略はユーザー獲得最優先・持ち出し最小。月 300 円で広告収益モデルと予備校との間を切り崩す。

## 2. 技術スタック

- Next.js 16 App Router + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn 風 UI primitives (`components/ui/`)
- LLM: **Google Gemini**（Claude/OpenAI はスタブのみ）
- 学習履歴は `localStorage`（将来 Supabase 置換可能な抽象層）
- pnpm / ESLint / Zod / tsx / react-markdown / lucide-react / radix-ui

## 3. ディレクトリ構造

```
app/
  api/copilot/           AI コパイロット ストリーミング API
  (home) page.tsx        モード選択ホーム
  quiz/                  クイズプレイヤー
  modes/year,topic       年度別・分野別一覧
  about/                 IPA出典・著作権
components/
  quiz/                  QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer / ClientQuizLoader
  copilot/               CopilotPanel (+ モバイル ボトムシート)
  ui/                    Button / Card / Dialog / Switch / Badge / Markdown
  theme-provider.tsx     Light/Dark/System
  ThemeToggle.tsx
  HistoryStats.tsx
  PremiumUpsellDialog.tsx
lib/
  ai/
    provider.ts          ← 必ずこの抽象経由で LLM を呼ぶ
    providers/{gemini,claude,openai,mock}.ts
    prompts.ts           システムプロンプト + クイックアクション定義
  questions/             types / load / filter
  storage/               keys / history / rate-limit-client
  rate-limit/server.ts   IP ベースの in-memory レート制限
  utils.ts               cn / examLabel / formatYearSeason
data/
  questions/ap/          問題 TS データ（まず手動キュレーションサンプル）
  raw_pdfs/              .gitignore 対象 / fetch:pdfs の出力先
scripts/
  fetch-ipa-pdfs.ts      IPA PDF クローラ
  parse-pdf-to-json.ts   スケルトン (Gemini Vision 実装が次の強化ポイント)
  validate-questions.ts  zod 検証
  topic-tagger.ts        Gemini タグ付け (未書き込みのヒューリスティックのみ)
public/
  manifest.webmanifest   PWA マニフェスト
  icon-192.svg / icon-512.svg
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

- **フェーズ1（完了済み：MVP）**: AP 午前 + クイズ UX + AI コパイロット + 無料枠制限（現行は初回 10 回/日・フィードバック後ほぼ無制限）
- **フェーズ2**: 全区分の午前／午前 I・II を網羅、模試モード、段級ランキング、会話履歴保存、CSV エクスポート
- **フェーズ3**: 午後 AI 採点 (AP/DB/NW/SC/ES/PM/SM/AU)、topicTag ベースの全試験横断弱点マップ、学習プラン自動生成
- **フェーズ4**: 論文添削 (ST/PM/SA/AU/SM)、Stripe 決済、参考書アフィリエイト実装、ANZEN AI 相互送客、`/api/admin/usage` 使用量ダッシュボード

## 7. 実装ルール

### コーディング規約
- TypeScript strict モード必須。`any` 禁止。型推論できない箇所のみ明示型付け
- ファイル命名: コンポーネントは PascalCase、ユーティリティは camelCase
- `cn(...)` は `lib/utils.ts` の `twMerge(clsx())` を使う
- 型は `export interface` 優先、簡単な union は `type`
- `"use client"` 宣言は必要最小限に（サーバーコンポーネント優先 / App Router）
- localStorage キーは必ず `lib/storage/keys.ts` の `LS_KEYS` 経由で参照
- API ルートは `export const runtime = "nodejs"` 明示
- クイズ UI は **ゼロ遷移** が最優先。解説を見るためにページ遷移しない

### スタイリング
- Tailwind CSS v4 のみ使用。インラインスタイルは原則禁止
- コンポーネントは `components/ui/` の primitives を再利用し、新規 CSS ファイルを作らない
- レスポンシブはモバイルファースト（`sm:` `md:` `lg:` の順）

### テスト & CI
```bash
pnpm typecheck   # TypeScript 型チェック（エラーゼロが必須）
pnpm build       # 本番ビルド（ビルドエラーは main マージ前に必ず解消）
pnpm test        # ユニットテスト（存在する場合）
pnpm lint        # ESLint（警告はゼロが望ましい）
```
PR 作成前に上記 4 コマンドをすべてパスさせること。

## 8. IPA 出典ルール

- 全ページのフッターに「出典: IPA 情報処理技術者試験」を明記する
- 各問題には `sourcePdfUrl` を必ず保持し、解説末尾から原典 PDF へリンクする
- `/about` ページで著作権・利用条件を明記
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しているが、引用ルールは厳守

## 9. 料金プラン & レート制限設計

無料プラン（ユーザー獲得最優先）:
- 全試験・全機能アクセス無制限
- AI コパイロット: 初回 10 回（JST 0:00 リセット）。フィードバック投稿後はほぼ無制限（フィードバック駆動モデル）。単一情報源は `lib/constants/ai-quota.ts` の `FREE_AI_DAILY_LIMIT`
- 広告表示あり（本文と分離、控えめ）
- モデル: `gemini-2.5-flash-lite`

プレミアム 月 300 円:
- AI コパイロット 無制限（1 分 10 回ソフトリミット）
- モデル: `gemini-2.5-flash`
- 広告非表示

現状は `localStorage` の `ipa-quiz:premium:v1` フラグで暫定判定。
Stripe 本実装はフェーズ4。

## 10. 承認必須事項

以下は「自律実行しないで、必ずユーザー確認を取る」こと:

- 新規外部 API の導入（Gemini 以外の LLM など）
- LLM プロバイダ変更（Gemini → Claude 等）
- デフォルトモデル変更（Flash-Lite → Flash 等）
- 無料枠の日次回数変更（現状 10。単一情報源は `lib/constants/ai-quota.ts` の `FREE_AI_DAILY_LIMIT`）
- プレミアム価格の変更（現状 300 円/月）
- DB スキーマの新規作成・変更
- Stripe / 認証の本実装
- アフィリエイト ID の変更
- 大規模 URL ルーティング再設計
- AI コパイロットのシステムプロンプト大幅変更
- レート制限値の変更

## 11. 競合（過去問道場）から学ぶ UX パターン集

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
- 無料ユーザー 初回 10 回/日 × 1,000 人 = 最大 10,000 req/日（フィードバック後は増加しうる）
- 無料枠（1,000 req/日）活用で初期は実質 0 円運用が可能
- プレミアム 300 円/月 / 1 人 → 仮に 1 人当たり 1,000 req/月 = コスト約 55 円 = 粗利率 約 80%

## 13. よくあるタスクと手順

### 新しい試験区分を追加するとき

1. `data/questions/{exam}/index.ts` を作成し `QUESTIONS_BY_EXAM` に登録
2. `lib/utils.ts` の `EXAM_LABELS` は既に全区分あるので OK
3. ホーム画面 (`app/page.tsx`) に試験切替 UI を追加（フェーズ2）

### AI プロンプトを調整するとき

- システムプロンプト本体は `lib/ai/prompts.ts::COPILOT_SYSTEM_PROMPT`
- クイックアクションは同ファイルの `QUICK_ACTIONS` マップ
- 大幅変更は「承認必須事項」扱い

### 問題データを追加するとき

- `data/questions/ap/` に年度別 TS ファイルを追加
- `pnpm validate:questions` でスキーマ検証
- `hasImage: true` の問題は MVP では非表示推奨

## 14. 姉妹プロジェクトと共有する構成

- ANZEN AI (safe-ai-site) と Vercel 環境・アフィリエイト枠を共有
- アフィリエイト ID（環境変数名はコードと一致させること）: `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=safeaisite22-22`, `NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID=5291f19d.a0fc3c16.5291f19e.b91d11f6`
- フェーズ4 で相互送客バナーを実装
