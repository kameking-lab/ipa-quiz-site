# CI ゲート（test + lint）と main ブランチ保護 — 2026-05-26

## 変更（このPRで自動化済み）

`.github/workflows/e2e.yml`（チェック名: **e2e**）に以下を追加し、PR ごとに必ず実行されるようにした:

- `pnpm lint`（ESLint）
- `pnpm test`（Vitest 全 24 ファイル / 140 テスト）

実行順（fail-fast）: Install → Lint → Typecheck → Unit tests → Build → Playwright E2E。

構造レビューで判明していた「CI が vitest も eslint も実行しておらず、133 テストが PR ゲートに寄与していない」状態（致命傷②）を解消する。これ以降、test/lint が落ちる PR は **e2e チェックが赤**になる。

## 社長作業（GitHub UI でのブランチ保護設定）

CI を「緑必須」にしてマージをブロックするには、GitHub 側で main の保護ルールが必要（コードからは設定できない）。

手順:
1. GitHub → リポジトリ `kameking-lab/ipa-quiz-site` → Settings → Branches
2. 「Add branch ruleset」または「Add classic branch protection rule」
3. Branch name pattern: `main`
4. 有効化する項目:
   - ✅ Require a pull request before merging（main への直 push を禁止）
   - ✅ Require status checks to pass before merging
     - 必須チェックに **e2e** を追加（このワークフローのジョブ名）
   - ✅ Require branches to be up to date before merging（任意・推奨）
5. 保存

注意:
- 設定後は、CI 赤の PR は「Merge」ボタンが押せなくなる（管理者の override は別途設定次第）。
- これまで本フェーズで使っていた `gh pr merge --admin`（docs PR の先行マージ）は、保護設定後は管理者バイパスになる。コード PR は必ず e2e 緑を待ってから通常マージすること。
- チェック名は **e2e**（ワークフロー名は "E2E"、ジョブ ID は `e2e`）。Playwright だけでなく lint/typecheck/test/build を内包する。

## 動作確認

この PR（`ci/add-test-and-lint-to-pr-gate`）自体の e2e チェックで、新しい Lint / Unit tests ステップが実行されることを確認する（4-4）。
