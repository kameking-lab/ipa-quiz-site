# VERCEL_TOKEN セットアップ手順 (本人作業)

`.github/workflows/vercel-recovery.yml` の自動再デプロイ機能を有効化するために必要。

## 手順

1. Vercel ダッシュボードで Personal Access Token を発行
   - https://vercel.com/account/tokens
   - Name: `gh-actions-redeploy`
   - Scope: `kameking-labs-projects` (Team)
   - Expiration: 1 年程度推奨
   - Token 文字列をコピー

2. GitHub リポジトリの Actions secret に登録
   - https://github.com/kameking-lab/ipa-quiz-site/settings/secrets/actions
   - "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: 上記で発行した token を貼り付け
   - "Add secret"

3. 動作確認 (任意)
   - Actions タブ → "Vercel Deployment Recovery" → "Run workflow"
   - `force_redeploy: true` で実行
   - "Trigger Vercel redeploy via API" ステップが成功し、empty-commit fallback ではなく API 経路で動くことを確認

## 注意

- `VERCEL_TOKEN` は本番デプロイをトリガーできる強力な権限を持つ
- workflow 以外で使わない。万一漏洩したら即 Vercel ダッシュボードで revoke
- このリカバリは「production と main の SHA が乖離した時に redeploy を triggers するだけ」で、deploy 自体が失敗する根因は別途解決が必要
