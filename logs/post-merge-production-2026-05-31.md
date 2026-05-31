# 本番反映記録 — 夜間自律改善 PR #474 マージ

実施: 2026-05-31 16:47 JST（マージ）/ 本番デプロイ Ready 確認: 同日 ~17:0x JST
社長の明示許可のもと、overnight-integration（夜間370コミット）を main へ squash マージし本番反映。

---

## 1. マージ結果
- PR: #474（base=main ← head=overnight-integration）/ state=MERGED / mergedAt=2026-05-31T07:47:23Z（16:47 JST）
- **マージ前 main SHA（凍結点）**: `ea2ca69`（タグ `pre-overnight-20260530`）
- **マージ後 main SHA**: `fb72413`（squash commit「Overnight autonomous improvements (370 commits)... (#474)」）
- origin/main も `fb72413` に同期済み。

## 2. 本番デプロイ（ロールバック基準）
- **新・本番デプロイ（現在 live / 次回ロールバックの“正常な現行”基準）**:
  - URL: `https://ipa-quiz-site-rgb19s7s7-kameking-labs-projects.vercel.app`
  - 状態: ● Ready / Production / ビルド4分 / fb72413 由来
- **直前の本番デプロイ（即時ロールバック先＝マージ前の状態）**:
  - URL: `https://ipa-quiz-site-r1f6sl3op-kameking-labs-projects.vercel.app`
  - 状態: ● Ready / Production
- **夜間開始時の本番デプロイ（PANIC-ROLLBACK.md 記載・引き続き有効）**: `ipa-quiz-site-1pczwwevy-...`

## 3. 本番スモーク確認結果（curl 実測・全て正常）
- `/` ホーム: **HTTP 200**（cache: PRERENDER＝新デプロイ反映）
- `/admin`: **HTTP 401**（健全なログイン要求。503ではない）
- `/quiz`: **308 → `/`（最終 200）**＝意図的（裸の /quiz は noindex・canonical=/・mode未指定時はホームへ誘導。致命傷④）。ループ等なし。
- `/q/ap/2024-autumn/am/q1`: **200**
- `/search`: **200**
- `/mock-exam`: **200**
- `/ip`: **200**、問題数 **2,381**（SSOT一致）
- `/blog/ip-nani-kara-benkyou`: **200**、**2,381**（旧 2,398 は混入なし）
- 問題ページ前後リンク: `/q/ap/2024-autumn/am/q2` の rel=prev=q1（**200**）・rel=next=q3（**200**）＝実在ページ
- 業種セレクタ（今回CI緑化した機能）: `/essays/sc/2025-spring/pm2/q1` に `role=group "業種選択"` ×1 + `aria-pressed` ボタン×8 が本番描画＝正常動作
- 致命的問題（500 / 白画面 / リダイレクトループ）: **なし**

## 4. ロールバック手段（引き続き有効）
- 最速（git不要）: Vercel ダッシュボードで **直前の本番デプロイ `r1f6sl3op`** を Promote to Production（マージ前の状態に即復帰）。
- git 観点の凍結点: タグ `pre-overnight-20260530`（`ea2ca69`）も有効。
- 詳細手順: `logs/PANIC-ROLLBACK.md`。

## 5. 結論
夜間自律改善 **370コミット（実改善89・守りテスト155・記録ほか）が本番反映完了**。CI全緑通過・本番スモーク全項目正常・本番無傷で可逆。問題は検知されなかった。
