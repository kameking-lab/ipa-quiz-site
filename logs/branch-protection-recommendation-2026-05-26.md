# main ブランチ保護 推奨設定 — 2026-05-26

## 現状

`gh api repos/kameking-lab/ipa-quiz-site/branches/main/protection` → **404 "Branch not protected"**。
main に保護ルールは未設定。フェーズ13（PR #447）で CI（ワークフロー名 "E2E"、ジョブ/チェック名 `e2e`）に
`pnpm lint` と `pnpm test` を組み込んだが、これらは **マージの必須条件になっていない**（赤でもマージ可能・直 push 可能）。

## 推奨設定（GitHub UI）

1. GitHub → `kameking-lab/ipa-quiz-site` → Settings → Branches → Add branch ruleset（or classic rule）
2. Branch name pattern: `main`
3. 有効化:
   - ☑ Require a pull request before merging（main への直 push を禁止）
   - ☑ Require status checks to pass before merging
     - 必須チェックに **`e2e`** を追加（lint / typecheck / unit test / build / Playwright を内包）
   - ☑ Require branches to be up to date before merging（推奨）
4. 保存

## 必須にすべき status check 名

- **`e2e`**（`.github/workflows/e2e.yml` のジョブ。install → lint → typecheck → unit test → build → Playwright を実行）

`question-quality.yml` / `essays-quality.yml` は paths フィルタ付き（データ変更時のみ起動）のため、
必須チェックには含めない（コードのみの PR では起動せず、required にすると永久 pending になる）。

## CLI で設定する場合（参考・非推奨）

`gh api -X PUT repos/kameking-lab/ipa-quiz-site/branches/main/protection` で JSON を送れば設定可能だが、
必須チェック名の固定・enforce_admins の扱い等で誤設定リスクがあるため、UI 操作を推奨。
