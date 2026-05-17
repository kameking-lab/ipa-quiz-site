# Explanation Fill — Final Batch

開始日時: 2026-05-17
ブランチ: refine/explanation-fill-final
担当: Claude Opus 4.7
方針: A + D (Gemini 既存パイプライン + 自動マージ)

## 目的
PR #253 (74件) / PR #262 (150件) に続き、残 96 件のプレースホルダー解説を完全埋め込み、placeholder 件数 0 達成。

## 採用方針
- LLM: Gemini 2.5 Flash-Lite (既存 `scripts/regenerate-explanations.ts`)
- CLAUDE.md §10 規約遵守 (Gemini 専用、Claude/OpenAI スタブのみ)
- 環境変数: `vercel env pull` で production の GEMINI_API_KEY を取得
- 完了時: PR 作成 → CI 緑確認 → `gh pr merge --auto --squash`

## Phase
- Phase 0: 監査 (`pnpm find:placeholders`) → `docs/audits/explanation-placeholders-2026-05-17.md`
- Phase 1: 生成 (`pnpm regen:explanations`) → data/questions/{exam}/by-year/*.ts 更新
- Phase 2: 品質確認 (`pnpm tsx scripts/audit-questions.ts --ci`)
- Phase 3: 反映 (`pnpm typecheck && pnpm build && pnpm lint`)

## 制約
- 既存問題本文・選択肢・正解番号は触らない (explanation 欄のみ更新)
- needsReview: true → false に切替
- 字数 200-400 字目安 (既存プロンプトは 300-500 字)
