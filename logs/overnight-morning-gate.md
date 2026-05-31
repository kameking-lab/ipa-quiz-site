# 朝の判定手順（2026-05-31 09:00 JST 以降）

夜間ループは 09:00 JST で自動停止する。朝、overnight-integration を本番へ反映するか判定する。
**判定は Chrome agent が overnight-baseline.md のしきい値で行う**（人間は最小操作のみ）。
Chrome agent 用の貼り付けプロンプト全文 = `logs/morning-chrome-gate-prompt.txt`。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 手順
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1) PR を1本作成し CI を確認
```
git checkout overnight-integration
git pull --ff-only
gh pr create --base main --head overnight-integration \
  --title "夜間自律改善 2026-05-30→31 の統合" \
  --body "overnight-integration の夜間改善コミット群。logs/overnight-worklog.md 参照。CI 緑を確認の上マージ判定。"
```
- GitHub Actions（PR ゲート: typecheck/lint/test/build + E2E）が**全緑**であることを確認。
- 赤があれば該当コミットを特定（worklog と突き合わせ）。

### 2) Chrome agent による本番相当の再採点
- プレビュー URL（PR に紐づく Vercel Preview）または localhost 本番ビルド（`pnpm build && pnpm start`）に対し、
  `logs/morning-chrome-gate-prompt.txt` を Chrome agent に貼って実行。
- agent は `overnight-baseline.md` の B（HTTP/数値）と D（合否ルール）に従い採点し、合否と退行有無を返す。

### 3) 合格 → マージ（本番反映）
- CI 緑 かつ ベースラインを下回らない かつ 退行ゼロ なら:
```
gh pr merge overnight-integration --merge --delete-branch=false
```
  （`--squash` でも可。履歴を1本化したいなら squash 推奨。CI が最終番人。）
- マージ後、本番デプロイ完了を待ち、`overnight-baseline.md` B のしきい値を本番 `https://www.kakomon-ai.jp` で再確認。

### 4) 不合格 → main 不変のまま個別除外
- ベースラインを下回る/同等、または退行コミットがある場合:
  - main へはマージしない。
  - 問題コミットを特定し `git revert <SHA>` で overnight-integration 上で個別除外 → 再 push → 再採点（手順2へ）。
  - どうしても切り分け不能なら、PR を閉じて overnight-integration を保留（破棄は PANIC-ROLLBACK.md §2）。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 人間が朝にやる最小操作
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. （任意）`logs/overnight-loop-runs.txt` と `logs/overnight-worklog.md` をざっと眺める。
2. `logs/morning-chrome-gate-prompt.txt` を Chrome agent に貼る → 採点結果を受け取る。
3. 合格なら手順3のマージコマンド1つを実行。不合格なら何もしない（main は無傷のまま）。
- 本番が壊れた感触があれば即 `logs/PANIC-ROLLBACK.md`。
