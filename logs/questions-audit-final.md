# 問題データ統合監査 — 最終結果

実施日: 2026-05-16
ブランチ: audit/questions-data-integrity

## 監査対象

- 午前 (Question):              14,402 問
- 午後 (AfternoonQuestion AP):       3 問
- 論述 (EssayQuestion):              12 問
- **総計:                       14,417 問**

## Phase 3 修復前

- 致命傷 (critical):       20
- 機会損失 (opportunity): 2,477
- 警告 (warning):       21,687

## Phase 3 修復後（再監査）

- 致命傷 (critical):        **0**  ← 全件解消
- 機会損失 (opportunity): 2,477
- 警告 (warning):       21,707  (致命傷を warning に降格した 20 件分が加算)

## 修復内容

### データ修復（10 問）

multiple-choice なのに全選択肢が空文字（IPA PDF 内の図版選択肢を Vision パーサが
抽出できなかったケース）の 10 問に `needsReview: true` を付与:

- fe-2019h-am-q5
- sc-2009a-am1-q19
- nw-2017h-am1-q16
- pm-2018a-am1-q7
- pm-2018a-am1-q10
- pm-2018a-am1-q20
- es-2021a-am2-q10
- es-2021a-am2-q11
- es-2021a-am2-q13
- sm-2009a-am2-q10

選択肢が見えない → ユーザーが正答を選べない構造的破綻。
本文の捏造は禁止事項のため `needsReview` で隠す方針を取った。

### コード補強

1. `app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx`
   - `q.needsReview` の場合 `notFound()` を返すガードを追加
2. `lib/seo/sitemap-pagination.ts`
   - サイトマップから needsReview 付き問題を除外

これにより:
- クイズプール: 既に filter.ts が除外済
- 個別問題ページ: 404 を返す（"準備中" 表示の near-duplicate を回避）
- サイトマップ: 404 URL を Submit しなくなる

### 監査スクリプトと CI ゲート

- `scripts/audit-questions.ts` — 統合監査スクリプト（午前・午後・論述すべて対応）
- `scripts/repair-empty-choices.ts` — 10 件の一回限り修復スクリプト
- `.github/workflows/question-quality.yml` に `--ci` モード（致命傷検出で exit 1）を追加

## 機会損失 (opportunity) 2,477 件の扱い

| カテゴリ | 件数 | 対応 |
|----------|------|------|
| missing-image-urls | 2,147 | 既存 `hasUnrenderableContent` でクイズプールから除外済 |
| placeholder-explanation | 320 | 既存 `isPlaceholderExplanation` で個別ページ noindex 済。生成パイプライン（`pnpm find:placeholders` → `pnpm regen:explanations`）で対応する領域 |
| その他 | 10 | descriptive/essay の modelAnswer 等。本 Dispatch スコープ外 |

指示書の 3.2 に従い、機会損失の修復は本 Dispatch スコープ外とした。

## 警告 (warning) 21,707 件の扱い

| カテゴリ | 件数 | 性質 |
|----------|------|------|
| duplicate-body-cross | 21,658 | IPA 過去問の異年度／異試験での再出題。正規データ |
| markup-question | 15 | 問題文の Markdown/HTML 整合。要目視確認 |
| markup-explanation | 13 | 解説の Markdown/HTML 整合。要目視確認 |
| duplicate-body-same-exam | 1 | 同一試験内で本文一致 |
| その他 | 20 | needsReview に降格された旧致命傷 |

duplicate-body-cross は IPA 過去問の構造上正規であり、致命度を上げない設計とした。

## 検証コマンド

```
npx tsx scripts/audit-questions.ts --ci   # 致命傷ゼロを確認
pnpm typecheck                            # TypeScript パス
pnpm build                                # 本番ビルドパス
```

すべてパスを確認済。

## 本番反映確認 (Phase 6)

PR #221 マージ済 (2026-05-16T08:40:03Z, merge commit `3e4552b`)。
ローカル `main` も `origin/main` と一致を確認 (`3e4552b`)。

CI 結果 (merge SHA `3e4552b6`):
- Validate Question Data: success
- TypeScript Typecheck: success
- e2e: success

本番 URL の 404 化検証は、本タスク完了時点で Vercel 本番デプロイが未トリガー状態。
GitHub Deployments API 上、最新の Production 環境デプロイは `ce043dcc` (2026-05-16T01:20:43Z) で、
それ以降にマージされた PR #216 〜 #221 すべてが本番未反映。これは本 PR 固有の問題ではなく
Vercel 側のデプロイキュー／設定問題と推定される。

本 PR の変更が本番に反映されれば、対象 10 URL は `notFound()` ガード経由で 404 を返し、
次回サイトマップ再生成（`/sitemap.xml`）でもそれらの URL は除外される。
コード変更とデータ修復は merge commit `3e4552b` 内で完結しているため、
Vercel デプロイ完了次第、自動的に期待挙動に切り替わる。
