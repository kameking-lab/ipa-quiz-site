# 本人作業手順書 — Basic Auth credential rotation

このドキュメントは Path A (Claude が自律実行を見送る範囲) で **本人が手作業で実施する必要がある操作** をまとめたものです。
クレデンシャル値そのもの(旧/新ともに)は一切記載しません。プレースホルダー `<NEW_BASIC_USER>` / `<NEW_BASIC_PASS>` で表記します。

## 前提と全体フロー

1. このリポジトリは PUBLIC で、Basic Auth クレデンシャル `ADMIN_BASIC_PASS=xK7m...` がハードコードで公開されていた
2. 旧値はローテーション完了まで有効。**作業中は注意**(本番 `/admin/*` に旧値でアクセス可能な状態のまま)
3. ローテーションは以下の順序で実施。**順序を間違えると CI 失敗・本番アクセス断につながる**ため厳守

```
Step A 新クレデンシャル生成 (ローカル shell)
   ↓
Step B GitHub Secrets 登録 (gh secret set)
   ↓
Step C Vercel 環境変数更新 (3 環境 × 2 キー = 6 操作)
   ↓ ← この時点で旧値は invalidate される
Step D 本番影響確認 (新値で /admin/stats が 200 になる)
   ↓
Step E PR ブランチで E2E 手動トリガー
   ↓
Step F E2E green 確認
   ↓
Step G Draft PR を Ready for review → レビュー → main マージ
```

`PR: security/rotate-basic-auth-v2` は Step G で初めてマージします。**Step B/C 完了前にマージすると CI が壊れる**(workflow が空の Secrets を参照して E2E が失敗する)ため絶対 NG。

## Step A: 新クレデンシャル生成

ローカルシェル(WSL/Git Bash/PowerShell)で以下を実行し、**環境変数として保持**(ファイル書き出し禁止):

```bash
# 新ユーザー名(日付入り、衝突回避用)
export NEW_BASIC_USER="e2e-ci-$(date +%Y%m%d)"

# 新パスワード(32 文字以上、URL-safe Base64)
export NEW_BASIC_PASS="$(openssl rand -base64 32)"

# 確認(値は表示せず、長さだけ確認)
echo "user length: ${#NEW_BASIC_USER}"
echo "pass length: ${#NEW_BASIC_PASS}"
```

PowerShell 版:

```powershell
$NEW_BASIC_USER = "e2e-ci-$(Get-Date -Format yyyyMMdd)"
$NEW_BASIC_PASS = -join ([Convert]::ToBase64String([byte[]] (Get-Random -InputObject (0..255) -Count 32)))
"user length: $($NEW_BASIC_USER.Length)"
"pass length: $($NEW_BASIC_PASS.Length)"
```

> **重要**: 値は環境変数のみで保持。ファイル(.env など)に書かない、コマンド履歴に直接入れない、Slack 等にコピペしない。

## Step B: GitHub Secrets 登録

```bash
# 既存 Secrets 確認
gh secret list --repo kameking-lab/ipa-quiz-site

# 新値を登録(echo -n のパイプ経由 → コマンド履歴に値が残らない、改行も入らない)
printf '%s' "$NEW_BASIC_USER" | gh secret set ADMIN_BASIC_USER --repo kameking-lab/ipa-quiz-site
printf '%s' "$NEW_BASIC_PASS" | gh secret set ADMIN_BASIC_PASS --repo kameking-lab/ipa-quiz-site

# 登録確認(値は表示されない仕様)
gh secret list --repo kameking-lab/ipa-quiz-site | grep ADMIN_BASIC
```

`gh secret set --body "$VAR"` ではなくパイプ経由を推奨理由: `--body` だとシェル履歴に値が記録される環境がある。`printf '%s' | ` は改行を入れずに値を渡せる。

## Step C: Vercel 環境変数の更新

Vercel CLI で `production` / `preview` / `development` の 3 環境について `ADMIN_BASIC_USER` と `ADMIN_BASIC_PASS` を更新します。合計 **3 環境 × 2 キー = 6 回**実行。

事前に `vercel link` でプロジェクト紐付け済みのこと。

```bash
# 既存値を確認(値そのものは隠される)
vercel env ls

# ADMIN_BASIC_USER を 3 環境とも更新(rm → add の順)
for ENV in production preview development; do
  vercel env rm ADMIN_BASIC_USER $ENV --yes
  printf '%s' "$NEW_BASIC_USER" | vercel env add ADMIN_BASIC_USER $ENV
done

# ADMIN_BASIC_PASS も同様に 3 環境
for ENV in production preview development; do
  vercel env rm ADMIN_BASIC_PASS $ENV --yes
  printf '%s' "$NEW_BASIC_PASS" | vercel env add ADMIN_BASIC_PASS $ENV
done

# 確認
vercel env ls | grep ADMIN_BASIC
```

> **注意**: Vercel の env 更新は次回デプロイから反映される。production を即時反映したい場合は `vercel --prod` または GitHub Actions 経由の再デプロイをトリガー。
> 本 PR をマージしただけでは Vercel が自動再デプロイするとは限らないため、必要に応じて `vercel redeploy` を実行。

## Step D: 本番影響確認

ローテーション直後、本番 `/admin/stats` で **旧値は 401、新値は 200** になることを確認:

```bash
# 旧値(漏洩値)で 401 になることを確認
# 旧値は git 履歴(commits af9f548 / 2ea0d8b / 0145bb1 時点の .github/workflows/e2e.yml:16)から
# 一時的にコピーして環境変数 OLD_BASIC_USER / OLD_BASIC_PASS にセット。
# このドキュメントには値そのものを書かない。
# (本 PR マージ後は履歴からも読み取れるが、Step H で履歴書き換え判断を参照)
#
# export OLD_BASIC_USER='...'   # ローカルでのみ、ファイル/履歴に残さない
# export OLD_BASIC_PASS='...'

OLD_B64=$(printf '%s:%s' "$OLD_BASIC_USER" "$OLD_BASIC_PASS" | base64)
curl -sI -o /dev/null -w "old creds: %{http_code}\n" \
  -H "Authorization: Basic $OLD_B64" https://www.kakomon-ai.jp/admin/stats
# 期待値: 401(ローテーション完了後)

# 新値で 200 になることを確認
NEW_B64=$(printf '%s:%s' "$NEW_BASIC_USER" "$NEW_BASIC_PASS" | base64)
curl -sI -o /dev/null -w "new creds: %{http_code}\n" \
  -H "Authorization: Basic $NEW_B64" https://www.kakomon-ai.jp/admin/stats
# 期待値: 200

# 確認後、旧値をシェルから破棄
unset OLD_BASIC_USER OLD_BASIC_PASS OLD_B64
```

> 旧値で 401 が返らない場合 = Vercel env がまだ反映されていない可能性。Step C を再確認、必要なら `vercel redeploy --prod`。
> 旧値検証はオプション。新値で 200 が返れば本質的にはローテーション成功している。

## Step E: PR ブランチで E2E 手動トリガー

GitHub Secrets が新値で登録済みであることを再確認してから、PR ブランチで workflow を手動実行:

```bash
gh workflow run e2e --ref security/rotate-basic-auth-v2

# 実行中の run を確認
gh run list --workflow=e2e --branch=security/rotate-basic-auth-v2 --limit 3

# 最新 run を追跡(green になるまで待つ)
gh run watch
```

注: 本 PR の `e2e.yml` 修正により、workflow は `${{ secrets.ADMIN_BASIC_USER }}` / `${{ secrets.ADMIN_BASIC_PASS }}` を参照する。Step B が完了していないと空文字列となり、`tests/e2e/admin-auth.spec.ts` の throw で失敗する(=設計通りの fail-fast)。

## Step F: E2E green 確認

```bash
# 最新 run のステータス
gh run view --log-failed  # 失敗時のみログ
gh run list --workflow=e2e --limit 1
```

green 確認できたら次の Step。**赤の場合は Step G に進まず原因調査**(典型的原因: GitHub Secrets 未設定、Vercel env 未反映、別のテスト失敗)。

## Step G: Draft PR を Ready for review → マージ

```bash
# PR 番号を取得(Claude が作成した Draft PR)
gh pr list --head security/rotate-basic-auth-v2 --state open --json number,url

# Draft 解除
gh pr ready security/rotate-basic-auth-v2

# レビュー(必要なら) → マージ
# 注意: main に直接 push する設定でない限り、Required Reviews があるので承認後にマージ
gh pr merge security/rotate-basic-auth-v2 --merge

# マージ後の main HEAD 確認
git fetch origin && git log -1 origin/main --oneline
```

## Step H (post-merge): 残作業

1. `claude/peaceful-pascal-1b0265` ブランチに含まれる `logs/status-snapshot-20260515-1759.md` に旧漏洩値が記載されている。**そのブランチを main にマージする前に該当箇所を `[REDACTED - rotated 2026-05-15]` で置換**すること(本 PR では当該ブランチが未マージのため対象外)。
2. ローカルシェルから `NEW_BASIC_USER` / `NEW_BASIC_PASS` を `unset`(または シェル終了)して環境変数を破棄。
3. 必要に応じて `SECURITY.md` を新規追加し、過去にハードコード漏洩があった事実と対処日付を記録(任意、本 PR スコープ外)。

## 緊急停止条件

以下に該当したら作業を停止し、状況を整理してから再開:

- Step D で **旧値が 200 を返し続ける**(=Vercel env が反映されていない、または新値登録が失敗)
- Step F で **E2E が失敗し続ける**(=Secrets 未設定、テストロジック不整合、または他の壊れ)
- Step C 実行中に Vercel CLI がエラー → 手動で Vercel Dashboard から 6 値更新する代替策に切り替え
