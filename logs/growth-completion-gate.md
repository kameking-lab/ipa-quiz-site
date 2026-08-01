# 集客・収益化フェーズ 反映判定手順（growth-integration → main）

ループは締切ではなく**バックログ枯渇**で自動停止する（logs/growth-loop-runs.txt に「BACKLOG EXHAUSTED」）。
停止後（または区切りの良い時点で）、growth-integration を本番へ反映するか判定する。第1弾と同じ「CI緑→Chrome採点→人間マージ」。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 手順
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1) PR を1本作成し CI を実走
```
git checkout growth-integration && git pull --ff-only
gh pr create --base main --head growth-integration \
  --title "Growth phase: 午後AI採点旗艦化 / 科目B / 404掃除 / あと一歩回収" \
  --body "集客・収益化フェーズの成果。logs/growth-worklog.md 参照。CI緑を確認の上マージ判定。"
```
- GitHub Actions（E2E ワークフロー = lint/typecheck/test/build/E2E + Question/Essays Quality）が全緑か確認。
- 赤があれば worklog と突合し原因特定。**第1弾の教訓**: DOM/構造を変えたら対応E2Eの更新漏れに注意（テストのみ修正で緑化）。

### 2) Chrome agent による本番相当の採点
- PRのVercel Preview（または localhost 本番ビルド）に対し `logs/growth-morning-chrome-gate-prompt.txt` を貼って実行。
- スモーク退行ゼロ＋新規実装が機能（午後採点入口・404解消・新ブログ実在・アフィリ導線が壊れていない）を確認。

### 3) 合格 → マージ（本番反映）
```
gh pr merge <PR番号> --squash
```
- マージ後、本番デプロイ完了を待ち、growth-baseline.md C のスモークを本番 https://www.kakomon-ai.jp で再確認。
- 新デプロイIDを記録（次回ロールバック基準）。

### 4) 不合格 → main 不変のまま個別除外
- 退行コミットを `git revert <SHA>` で除外 → 再push → 再採点。切り分け不能なら PR を保留（破棄は GROWTH-PANIC-ROLLBACK.md §2）。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 人間が朝/区切りにやる最小操作
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. （任意）logs/growth-loop-runs.txt / growth-worklog.md / growth-human-decisions.md を一読。
2. `logs/growth-morning-chrome-gate-prompt.txt` を Chrome agent に貼る → 採点結果を受け取る。
3. 合格なら手順3のマージ1コマンド。不合格なら何もしない（main 無傷）。
4. **GSCで後日測定**: 404件数の減少・登録数の増加・午後/科目B系クエリの表示/順位を、数週間後に確認（順位はGoogle次第で即日は動かない）。
5. **HD-1（GSCの404実URL一覧エクスポート）**を実施するとP0の精度が上がる（growth-human-decisions.md）。
- 本番異常を感じたら即 GROWTH-PANIC-ROLLBACK.md。
