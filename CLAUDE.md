# 過去問AI — Claude Code 向け指示書

本ファイルは Claude Code (Cursor 等) に対するプロジェクトコンテキストです。
新しいセッションを開始する際は、まず本ファイルを読んでから作業を始めてください。

## 1. プロジェクトビジョン・戦略

IPA 情報処理技術者試験（IP / SG / FE / AP / ST / SA / PM / NW / DB / ES / SC / SM / AU）
全区分の公開過去問を網羅する、AI ネイティブな過去問学習プラットフォーム。

**現在の戦略: 教育貢献プロジェクト**
- `PAID_MODE=false` — 全機能無料・課金なし・広告なし
- API 利用料が月 5 万円を超えるまで課金モデルは復活させない
- ボランティア有志運営。収益最大化より教育アクセス最大化を優先する

差別化軸:

1. **(A) UX最速**: 午前四択クイズのインタラクションを業界最速にする。
   画面遷移ゼロ・ローディングゼロで、モバイル片手操作で完結する。
2. **(B) AI コパイロット常駐**: 各問に AI が常駐し、用語解説・選択肢分析・類題生成・
   誤答分析を無制限対話で提供する。静的解説では届かない体験密度を作る。
3. **(C) 午後 AI 採点**: 午後記述／論文添削を AI で実現。

## 2. 技術スタック

- Next.js 16 App Router + React 19 + TypeScript strict
- Tailwind CSS v4 + 自作の shadcn 風 UI primitives (`components/ui/`)
- LLM: **Google Gemini**（Claude/OpenAI はスタブのみ）
- 学習履歴は `localStorage`（将来 Supabase 置換可能な抽象層）
- pnpm / ESLint / Zod / tsx / react-markdown / lucide-react / radix-ui

## 3. ディレクトリ構造

```
app/
  api/                       copilot / scoring / health / email-list
  [exam]/                    試験区分トップ + 年度・分野・午後ページ
  q/[exam]/[ys]/[s]/[q]      問題詳細ページ（SEO 用個別 URL）
  admin/{stats}/             管理ダッシュボード（Basic 認証で保護）
  modes/{year,topic}/        年度別・分野別一覧
  about/ faq/ privacy/ terms/ operator/  静的ページ
  sitemap.xml/ sitemap/[id]/ robots.ts opengraph-image.tsx
components/
  quiz/                      QuestionCard / ChoiceButton / ExplanationCard / QuizPlayer / ClientQuizLoader
  afternoon/                 AfternoonPlayer / AfternoonResultView / AfternoonDisclaimer
  copilot/                   CopilotPanel (+ モバイル ボトムシート)
  seo/                       JsonLd / ShareButtons / AnswerReveal
  ui/                        Button / Card / Dialog / Switch / Badge / Markdown
  theme-provider.tsx ThemeToggle.tsx HistoryStats.tsx
  KeyboardShortcutsHelp.tsx ServiceWorkerRegistration.tsx SiteLogo.tsx
  HeroDemoAnimation.tsx ExamCategoryGrid.tsx
lib/
  ai/                        provider.ts ← 必ずこの抽象経由で LLM を呼ぶ
                             providers/{gemini,claude,openai,mock}.ts
                             prompts.ts cost-tracker.ts
  questions/                 types / load / filter / get-questions
  afternoon/                 午後採点ロジック
  exam-naming/history.ts     試験名称の歴史的変遷
  exam-config.ts             試験区分ごとのメタ情報
  storage/                   keys / history / rate-limit-client / settings
  rate-limit/server.ts       IP ベースの in-memory レート制限
  streak/                    Duolingo 式ストリーク
  seo/                       sitemap / OGP / 構造化データ
  analytics/events.ts        クライアント側イベント定義
  utils.ts                   cn / examLabel / formatYearSeason
data/
  questions/{exam}/          試験区分ごとの問題データ（IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU）
  raw_pdfs/                  .gitignore 対象 / fetch:pdfs の出力先
scripts/
  fetch-ipa-pdfs.ts          IPA PDF クローラ
  parse-pdf-to-json.ts       PDF → JSON（Gemini Vision）
  parse-all.ts               一括パイプライン
  parse-afternoon/           午後問題専用パーサ
  validate-questions.ts      zod 検証
  topic-tagger.ts            Gemini タグ付け
  find-placeholder-explanations.ts  画像なし問題のプレースホルダ解説検出
  regenerate-explanations.ts        Gemini で解説を再生成
public/
  manifest.webmanifest       PWA マニフェスト
  icon-192.svg / icon-512.svg / favicon.svg / sw.js
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
- **フェーズ3（完了）**: AP 午後 AI 採点、3 層解説リファクタ、モバイル UX 細部調整、a11y 改善
- **フェーズ4（教育貢献ピボット）**: 課金・認証削除。全機能無料化。PostHog/Sentry 監視導入
- **フェーズ5（未着手）**: 論文添削（ST/PM/SA/AU/SM）、参考書アフィリエイト UI、ANZEN AI 相互送客バナー

## 7. コーディング規約

- ファイル命名: コンポーネントは PascalCase、ユーティリティは camelCase
- `cn(...)` は `lib/utils.ts` の `twMerge(clsx())` を使う
- 型は `export interface` 優先、簡単な union は `type`
- `"use client"` 宣言は必要最小限に（サーバーコンポーネント優先）
- localStorage キーは必ず `lib/storage/keys.ts` の `LS_KEYS` 経由で参照
- API ルートは `export const runtime = "nodejs"` 明示
- クイズ UI は **ゼロ遷移** が最優先。解説を見るためにページ遷移しない

## 8. テスト・CI

```bash
pnpm typecheck        # TypeScript 型検査（必須）
pnpm build            # 本番ビルド（必須）
pnpm test             # ユニットテスト
pnpm test:e2e:smoke   # E2E スモークテスト（Playwright）
```

PR をマージする前に必ず `typecheck` と `build` が通ることを確認する。

## 9. コミット規約

Conventional Commits を使う:

```
feat: 新機能
fix: バグ修正
docs: ドキュメントのみの変更
refactor: リファクタリング（機能変更なし）
chore: ビルド・設定・スクリプト変更
test: テストの追加・修正
```

スコープ例: `feat(quiz): ...`, `fix(copilot): ...`, `chore(data): ...`

## 10. IPA 出典ルール

- 全ページのフッターに「出典: IPA 情報処理技術者試験」を明記する
- 各問題には `sourcePdfUrl` を必ず保持し、解説末尾から原典 PDF へリンクする
- `/about` ページで著作権・利用条件を明記
- IPA は過去問の使用について許諾不要・使用料不要と公式に明示しているが、引用ルールは厳守

## 11. レート制限設計

無料プラン（全ユーザー共通）:
- 全試験・全機能アクセス無制限
- AI コパイロット: IP 単位で 1 日 50 回 / 1 分 15 回（`BETA_DAILY_LIMIT` / `BETA_MINUTE_LIMIT`）
- モデル: `gemini-2.5-flash-lite`

課金・プレミアム判定は現在無効（`PAID_MODE=false`）。
API 月 5 万円到達まで課金モデルは復活させない。

## 12. 承認必須事項

以下は「自律実行しないで、必ずユーザー確認を取る」こと:

- 新規外部 API の導入（Gemini 以外の LLM、PostHog、Sentry、Slack 通知 等）
- LLM プロバイダ変更（Gemini → Claude 等）
- デフォルトモデル変更（Flash-Lite → Flash 等）
- レート制限値の変更（`BETA_DAILY_LIMIT=50` / `BETA_MINUTE_LIMIT=15` 既定）
- DB スキーマの新規作成・変更
- アフィリエイト ID の変更（ANZEN AI と共有）
- 大規模 URL ルーティング再設計（既存の `/q/[exam]/...` SEO URL に影響するもの）
- AI コパイロットのシステムプロンプト大幅変更（`lib/ai/prompts.ts`）
- 「AI 競合言及禁止」ルールの緩和
- フッターの IPA 出典表記の削除・改変

## 13. 触ってはいけないもの（削除済み・復旧禁止）

以下は意図的に削除済みであり、復旧・再実装してはならない:

- **Stripe 決済** — 教育貢献フェーズでは不要。API 月 5 万円超過後に別途設計する
- **Enterprise プラン** — 削除済み。復旧禁止
- **SAML / SCIM** — 削除済み。復旧禁止
- **`/pricing` ページ** — 削除済み。復旧禁止
- **`PremiumUpsellDialog`** — 削除済み（残存参照があれば削除すること）
- **NextAuth / 認証フロー** — 削除済み（`lib/auth/` は参照しないこと）
- **Prisma / DB 接続** — 削除済み（`lib/db/` は参照しないこと）

## 14. 競合から学ぶ UX パターン集

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

## 15. コスト見積もり（Gemini Flash-Lite 前提）

- 平均 1 リクエスト あたり入力 1,200 token / 出力 600 token 想定
- Gemini 2.5 Flash-Lite: $0.10 / 1M input, $0.40 / 1M output
- 1 リクエストあたりコスト: $0.00012 + $0.00024 ≒ $0.00036 ≒ 0.055 円
- 無料ユーザー 1 日 50 回 × 1,000 人 = 50,000 req/日 ≒ 月 2,750 円
- 無料枠（1,000 req/日）活用で初期は実質 0 円運用が可能

## 16. よくあるタスクと手順

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

## 17. 姉妹プロジェクトと共有する構成

- ANZEN AI (safe-ai-site) と Vercel 環境・アフィリエイト枠を共有
- アフィリエイト ID: `NEXT_PUBLIC_AMAZON_TAG=safeaisite22-22`, `NEXT_PUBLIC_RAKUTEN_ID=5291f19d.a0fc3c16.5291f19e.b91d11f6`
- フェーズ5 で相互送客バナーを実装
