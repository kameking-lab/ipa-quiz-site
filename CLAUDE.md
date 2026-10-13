# IPA Quiz — Claude Code 向け指示書

本ファイルは Claude Code (Cursor 等) に対するプロジェクトコンテキストです。
新しいセッションを開始する際は、まず本ファイルを読んでから作業を始めてください。

## 0. プロジェクト戦略（最重要）

### 教育貢献プロジェクト
本プロジェクトは **教育貢献** を第一義とし、IPA 過去問を誰でも無料で学べる環境を提供する。
収益化は教育価値を損なわない範囲に限定し、ユーザー獲得・学習継続率を最優先指標とする。

### 課金モード
`PAID_MODE=false`（デフォルト）。
**オーナー決定方針（2026-10-13、未公開の作業ブランチ）: Webの公開学習機能は全て無料、商業的なユーザー別回数枠なし。課金を有効化しない。旧Stripe・プレミアム構想は現在の提供計画ではない。**
LocalStorage の `ipa-quiz:premium:v1` は開発検証用フラグであり、本番決済には紐づけない。

### API コスト上限
推定月間 API コストが **4 万円** に達すると警告し、**5 万円** に達すると新規の実プロバイダ呼び出しを停止する。KVの残高が読めない場合も停止する。
この上限はユーザーの承認なしに変更してはならない。
費用は呼出完了後にKVへ記録するため、並行実行や書込失敗時の厳密な5万円上限は保証しない。実請求額は未測定。

### 禁止事項
以下は **いかなる理由があっても自律実行禁止**:
- Stripe / 外部決済の本実装・有効化
- Enterprise プラン・法人向け課金の導入
- 公開中の無料・回数枠なし方針に反する商業的な利用枠や課金の再導入
- 上記 API コスト上限の引き上げ・無効化

---

## 1. プロジェクトビジョン

IPA 情報処理技術者試験（IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU）
全区分の公開過去問を網羅する、AI ネイティブな過去問学習プラットフォーム。

競合「過去問道場」（siken.com 系ネットワーク）は人力解説で 10 年積み上げた歴史がある。
同じ武器では勝たない。差別化は以下 3 軸:

1. **(A) UX最速**: 午前四択クイズのインタラクションを業界最速にする。
   画面遷移ゼロ・ローディングゼロで、モバイル片手操作で完結する。
2. **(B) 過去問に沿うAIコパイロット**: 公開済みの過去問をもとに、用語・選択肢・誤答理由の理解を助ける。類題の自動生成は提供しない。
3. **(C) 出典の確認**: 公式過去問の問題冊子・解答例・採点講評への案内を明確にする。独自作成の午後・論述問題は公開せず、現在は論述AI採点の入口を設けない。

Webの公開学習機能は無料・商業的な利用回数枠なしを方針とし、短時間・IP・サイト全体の乱用防止と月間API費用の停止措置を維持する。

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

## 6. 提供方針と旧構想

- オーナー決定方針（2026-10-13、未公開の作業ブランチ）: 出典を確認した過去問の演習と解説を中心に、Webの公開学習機能は無料・商業的なユーザー別回数枠なしで提供する。
- 独自作成の午後・論述問題、類題生成、論述AI採点の入口は公開しない。IPA公式の問題冊子・解答例・採点講評を案内する。
- 旧ロードマップの午後AI採点・論文添削・Stripe課金は現在の公開予定ではない。将来の機能追加は出典・費用・運用を別途確認する。

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

### AI を呼ぶ機能は「Preview で 1 回実行して目視」するまで完了としない

**公開中で実AIを呼ぶ経路に手を入れた変更は、公開前のPreviewで実際に1回実行し、返ってきた中身を目で見るまで「完了」にしない。停止済みの午後・論述採点と類題生成は、providerを呼ばず404/410を返すことを検査する。**
確認する項目は最低限これだけ:

- 応答が本物か（採点系なら `gradingMode` が `ai`。`simplified` は失敗を意味する）
- 応答が途中で切れていないか（`finishReason` が `STOP`。`MAX_TOKENS` は切断）
- コストが計上されているか（`ai_cost:YYYY-MM` が実測ぶん増える）

理由: これらの失敗はすべて **HTTP 200 で返る**。採点が簡易判定に落ちても、
JSON が途中で切れても、利用者には 200 とそれらしい画面が返り、型も通り、
ユニットテストも E2E も緑のままになる。実際、370 コミットぶんの変更が
CI 全緑のまま「課金だけ発生して中身は字数判定」という状態で積み上がり、
気づいたのは人が手で 1 回叩いたときだった。

CI が緑であることは、AI 応答の中身が正しいことを何も保証しない。
モックプロバイダで走る自動テストは経路の形しか見ていない。
実物を 1 回叩く以外に、この種の壊れ方を見つける方法はない。

## 8. IPA 出典ルール

- 全ページのフッターに「出典: IPA 情報処理技術者試験」を明記する
- 各問題には `sourcePdfUrl` を必ず保持し、解説末尾から原典 PDF へリンクする
- `/about` ページで著作権・利用条件を明記
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しているが、引用ルールは厳守

## 9. 現行の無料運用 & 乱用防止設計

オーナー決定方針（2026-10-13、未公開の作業ブランチ）:
- Webで公開する過去問演習とAI学習機能は全て無料で、商業的なユーザー別回数枠を設けない。独自作成の午後・論述問題、類題生成、論述AI採点の入口は提供しない。
- AIコパイロットにはIP単位（20回/分・100回/時・500回/日）とサイト全体（500回/時・5000回/日）の乱用防止制限を適用する。入力上限と認証上の実権限も維持する。
- 実プロバイダには月間費用の警告・停止を適用し、共有KVが使えなければ一時停止する。`lib/constants/ai-quota.ts` の旧日次値は非AIエンドポイントの防御用で、公開AIの商業的利用枠ではない。

旧プレミアム・Stripe案および `ipa-quiz:premium:v1` フラグは現行提供を表さず、公開AIの利用可否を判定しない。

## 10. 承認必須事項

以下は「自律実行しないで、必ずユーザー確認を取る」こと:

- 新規外部 API の導入（Gemini 以外の LLM など）
- LLM プロバイダ変更（Gemini → Claude 等）
- デフォルトモデル変更（Flash-Lite → Flash 等）
- 公開AIの料金・商業的な利用回数枠の変更（2026-10-13のオーナー決定方針はWeb無料・ユーザー別回数枠なし。乱用対策と月間費用上限は維持）
- 新たな有料プランの導入
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
4. 高度試験は午前 II のみ → IPA公式の午後問題冊子・解答例・採点講評への案内を整える
5. 試験ごとのドメイン分断 → 単一アプリ統合、午前 I 共通履歴共有
6. 広告過多 → 参考書アフィリは控えめに UI 完全分離
7. ダークモード・PWA なし → 両方標準装備

## 12. API費用の見積もり

モデル単価と導入期・通常期の区分は `lib/ai/cost-tracker.ts` にあるコード上の推定値を参照する。実請求額は未測定。推定月間4万円で警告、5万円で新規の実プロバイダ利用を停止するが、記録後方式のため並行実行やKV書込失敗による超過を厳密には防げない。

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
- アフィリエイト ID（環境変数名はコードと一致させること）: `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=`（過去問AIでは2026-10-03に閉鎖が確認された `safeaisite22-22` を通常商品リンクへ切り替え。再設定しない。他サイト・別IDの状態はこの変更の対象外）, `NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID=5291f19d.a0fc3c16.5291f19e.b91d11f6`
- フェーズ4 で相互送客バナーを実装
