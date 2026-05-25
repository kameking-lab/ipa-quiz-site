# 新試験回の問題追加レシピ (exam-update-recipe)

新しい試験回（例: 令和8年度春期 = 2026年4月）の問題を追加する手順。
現状は **半自動**（PDF 取得・パースはスクリプト化済み、最終検証は人手）。

## 前提

- 問題データは `data/questions/{exam}/by-year/{year}-{season}-{section}.ts` に
  TypeScript 配列として格納し、`data/questions/index.ts` の `ALL_QUESTIONS` /
  `QUESTIONS_BY_EXAM` に集約される。
- `/q/*` は `dynamicParams=true` + ISR なので、データを追加して再デプロイすれば
  追加分は自動で 200 になる（サイトマップも `getIndexableQuestions()` 経由で自動反映）。

## 手順

1. PDF 取得
   - `pnpm tsx scripts/fetch-ipa-pdfs.ts` で IPA 公式 PDF を `data/raw_pdfs/`（.gitignore）へ。
   - 新試験回の問題冊子・解答 PDF の URL を同スクリプトの対象リストに追記。

2. パース（午前四択）
   - `pnpm tsx scripts/parse-all.ts`（または `scripts/parse-pdf-to-json.ts`）で
     PDF → JSON 化。Gemini Vision を使う部分は GEMINI_API_KEY が必要。
   - AP 専用一括生成は `scripts/generate-ap-all.ts`。

3. 解説生成
   - 解説が空（placeholder）の問題は `scripts/regenerate-explanations.ts` /
     `scripts/fill-explanations-batch.mjs` で AI 生成（要 GEMINI_API_KEY）。
   - placeholder のままの問題は sitemap / `/q/*` から自動除外されるので、
     未生成でも 404 や noindex 事故は起きない（`getIndexableQuestions()` 参照）。

4. 検証（人手必須）
   - `pnpm tsx scripts/validate-questions.ts` で zod スキーマ検証。
   - `pnpm tsx scripts/verify-answers-with-pdf.ts` で正答の突き合わせ。
   - `scripts/detect-explanation-mismatch.ts` で解説と正答の矛盾検出。
   - 図表問題は `hasImage`/`needsReview` を適切に設定（未対応問題は `needsReview: true`）。

5. 登録・反映
   - `data/questions/{exam}/index.ts` に新ファイルを import 追加。
   - `pnpm typecheck && pnpm build` で全 SSG/ISR ルートが通ることを確認。
   - デプロイ。サイトマップ・内部リンク・年度横断ナビは自動更新。

## 自動化レベル

- PDF 取得: **自動**（スクリプト、対象 URL の追記のみ手動）
- パース: **半自動**（Gemini Vision、レイアウト崩れは手直し）
- 解説生成: **自動**（AI バッチ、ただしコスト上限内）
- 検証: **手動**（正答突き合わせ・図表判定は人手が安全）
- 登録・反映: **自動**（index 追記 + デプロイ）

## 1 試験回あたりの想定工数

- 午前 80 問 × 1 区分: PDF 取得 5 分 + パース 10 分 + 解説生成 20 分（バッチ待ち）
  + 検証 30〜60 分 ≈ **約 1〜1.5 時間／区分**。
- 全 13 区分の春期/秋期同時追加で **半日〜1 日**。
