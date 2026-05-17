# Vercel デプロイ復旧手順書

最終更新: 2026-05-17  
担当: @kameking

---

## 概要

Vercel Hobby プランは **100 ビルド/24h (UTC 00:00 リセット)** の上限がある。  
多数の PR を 1 日にマージするとクォータを超過し、本番デプロイが止まる。

本書はクォータ超過時の復旧手順と自動化の説明。

---

## 現状確認

### 1. 管理画面で確認（推奨）

```
https://ipa-kentei.com/admin/deployment-status
```

Basic Auth（`ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS`）でログイン。  
本番 SHA と main SHA の一致を確認する。

### 2. GitHub CLI で確認

```bash
# 最新本番デプロイの SHA
gh api repos/kameking-lab/ipa-quiz-site/deployments \
  -q '[.[] | select(.environment=="Production")] | .[0] | {sha, created_at}'

# main 先端 SHA
gh api repos/kameking-lab/ipa-quiz-site/commits/main -q '.sha'

# 差分コミット数（0 なら問題なし）
git log --oneline <PROD_SHA>..origin/main | wc -l
```

---

## 復旧手順

### パターン A: クォータリセット待ち（推奨）

1. JST 09:00 (UTC 00:00) を待つ
2. GitHub Actions の `Vercel Deployment Recovery` が UTC 00:05 に自動実行される
3. 管理画面で本番 SHA が main と一致することを確認

**所要時間**: クォータリセットまで最大 24 時間

---

### パターン B: GitHub Actions 手動トリガー（クォータリセット後）

```
https://github.com/kameking-lab/ipa-quiz-site/actions/workflows/vercel-recovery.yml
```

1. `Run workflow` をクリック
2. `force_redeploy = true` にチェック
3. 理由を入力して実行
4. ワークフローが Vercel API で再デプロイをトリガー
5. 約 5〜10 分後に `admin/deployment-status` で確認

**前提**: `VERCEL_TOKEN` Secret が設定済みであること（下記参照）

---

### パターン C: Vercel ダッシュボードから手動再デプロイ

1. https://vercel.com/kameking-lab/ipa-quiz-site へアクセス
2. "Deployments" タブ → 最新の main コミット
3. "Redeploy" ボタンをクリック
4. "Use existing Build Cache" を OFF にして実行

**クォータが残っている場合のみ有効**

---

### パターン D: 緊急 — 空コミット push

```bash
git checkout main
git pull origin main
git commit --allow-empty -m "chore(ci): trigger Vercel redeploy"
git push origin main
```

これにより Vercel の GitHub 連携が新規デプロイをトリガーする。  
**クォータが残っている場合のみ有効。**

---

## VERCEL_TOKEN の取得と設定

Vercel API 経由の自動再デプロイには `VERCEL_TOKEN` が必要。

### 取得

1. https://vercel.com/account/tokens
2. "Create Token" → スコープ `Full Account`
3. 生成されたトークンをコピー

### GitHub Secrets への設定

```
https://github.com/kameking-lab/ipa-quiz-site/settings/secrets/actions
```

- Secret 名: `VERCEL_TOKEN`
- Value: 上記で取得したトークン

### Vercel 環境変数への設定（管理画面 API 用）

```
https://vercel.com/kameking-lab/ipa-quiz-site/settings/environment-variables
```

- Key: `VERCEL_TOKEN`
- Value: 同じトークン
- Environment: Production のみ

---

## 予防策

### 日次 PR マージ本数を分散する

- 一日に 80 本以上マージすると高確率でクォータを超過
- Preview ビルドも消費するため、PR ブランチの作りすぎに注意

### Preview ビルドを抑制する

`vercel.json` の `github.silent: true` はビルドを止めないが、  
Preview デプロイを無効化するには Vercel プロジェクト設定で  
「Automatically expose System Environment Variables for PRs」を OFF にする。

### Vercel Pro へのアップグレード

月額 $20/member。ビルド上限が実質無制限になる。  
PR 本数が週に 200 本を超えるようなら検討する。

---

## 自動化の仕組み（参考）

`.github/workflows/vercel-recovery.yml`:

| トリガー | 内容 |
|---------|------|
| UTC 00:05 毎日 | クォータリセット直後に本番 SHA と main を比較、乖離があれば Vercel API で再デプロイ |
| UTC 偶数時 (02,04,...,22) | 2 時間毎の監視 |
| `workflow_dispatch` | 手動実行、`force_redeploy` オプション付き |

---

## 関連リソース

- 管理画面: https://ipa-kentei.com/admin/deployment-status
- Actions ワークフロー: https://github.com/kameking-lab/ipa-quiz-site/actions/workflows/vercel-recovery.yml
- Vercel ダッシュボード: https://vercel.com/kameking-lab/ipa-quiz-site
- 本日の状況ログ: `logs/deployment-status.md`
