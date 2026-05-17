# Vercel デプロイ状況レポート — 2026-05-17 (JST)

生成日時: 2026-05-17T00:43:10Z (09:43 JST)  
本番 SHA: `8e1b2ddb65319becdda3fc70970df328e6212081` = `origin/main` 先端 ✅

---

## 現状サマリー

- **本番反映状況**: ✅ 全 PR 反映済み（本日 09:43 JST に最終デプロイ成功）
- **本日 merged PR 数**: 65+ 件（#201〜#269、2026-05-16 UTC 全件）
- **Vercel Hobby プラン上限**: 100 ビルド/24h（UTC 00:00 リセット）
- **クォータ逼迫**: 当日 00:01–22:13 UTC は Production デプロイが停止（Preview のみ）
- **最長遅延**: 約 22 時間（#201–#254 は Production 未反映のまま推移）

---

## Vercel 本番デプロイ タイムライン（本日）

| # | ID | 時刻 (UTC) | 時刻 (JST) | SHA | 対応 PR / 状態 |
|---|-----|------------|-----------|-----|---------------|
| 1 | 4714952951 | 2026-05-17T00:43:10Z | 09:43 | `8e1b2ddb` | #265–#269 (tip of main) ✅ SUCCESS |
| 2 | 4714408695 | 2026-05-16T22:38:44Z | 07:38 | `09a02070` | #257–#264 ✅ SUCCESS |
| 3 | 4714335611 | 2026-05-16T22:23:50Z | 07:23 | `f524740b` | #256 (feat/history) ✅ SUCCESS |
| 4 | 4714335566 | 2026-05-16T22:23:50Z | 07:23 | `b2f1aa35` | #255 (audit/site-scan-round2) ❌ CANCELED |

---

## 本日 merged PR 一覧と反映ステータス

### 反映済み ✅（全件、最終 SHA 8e1b2ddb に含有）

| PR# | タイトル | merge 時刻 (UTC) | 最初の Production デプロイ | 遅延 |
|-----|---------|-----------------|--------------------------|------|
| #269 | feat(copilot): RAG-based citations | 00:12:39Z | 00:43:10Z (同日) | 30 分 |
| #267 | feat(pwa): offline support | 00:35:19Z | 00:43:10Z (同日) | 8 分 |
| #266 | feat(bookmarks): bookmark tags | 00:02:04Z | 00:43:10Z (同日) | 41 分 |
| #265 | fix(data): AP explanations final | 00:01:57Z | 00:43:10Z (同日) | 41 分 |
| #264 | feat(study-plan): study schedule | 23:48:45Z | 00:43:10Z (+1d) | 54 分 |
| #263 | feat(feedback): error report UI | 23:45:19Z | 00:43:10Z (+1d) | 58 分 |
| #262 | fix(data): AP explanations batch2 | 22:29:57Z | 22:38:44Z | 9 分 |
| #261 | feat(seo): structured data | 22:30:44Z | 22:38:44Z | 8 分 |
| #260 | fix: comprehensive bug hunt | 22:26:51Z | 22:38:44Z | 12 分 |
| #259 | feat(seo): metadata + OGP | 22:21:52Z | 22:38:44Z | 17 分 |
| #258 | feat(search): cross-exam search | 22:25:36Z | 22:38:44Z | 13 分 |
| #257 | feat(mock-exam): balanced select | 22:16:23Z | 22:38:44Z | 22 分 |
| #256 | feat(history): /my-progress | 22:15:32Z | 22:23:50Z | 8 分 |
| #255 | chore: site scan round 2 | 22:13:29Z | 22:23:50Z (✅ 次 deploy) | 25 分 |
| #254 | refine(essays): 学び/反省 | 17:26:00Z | 22:23:50Z | **4 時間 57 分** ⚠️ |
| #253 | fix(data): AP explanations | 17:00:26Z | 22:23:50Z | **5 時間 23 分** ⚠️ |
| #252 | feat(copilot): quality | 16:53:47Z | 22:23:50Z | **5 時間 30 分** ⚠️ |
| #251 | feat(quiz-ux): keyboard | 16:46:32Z | 22:23:50Z | **5 時間 37 分** ⚠️ |
| #250 | feat(seo): sitemap | 16:25:08Z | 22:23:50Z | **5 時間 58 分** ⚠️ |
| #249 | feat(seo): hub-spoke | 16:11:00Z | 22:23:50Z | **6 時間 12 分** ⚠️ |
| #248 | chore(api): cleanup | 16:10:38Z | 22:23:50Z | **6 時間 13 分** ⚠️ |
| #247 | feat(ui): footer enrichment | 16:01:48Z | 22:23:50Z | **6 時間 22 分** ⚠️ |
| #246–#201 | (前日 JST) | 〜15:00Z | 22:23:50Z | 7〜22 時間 ⚠️ |

---

## 原因分析

Vercel Hobby プランの **100 ビルド/24h 制限** を超過したと推定。

- 2026-05-16 UTC に 65+ PR が main にマージ
- Preview ビルド（PR ブランチ）+ Production ビルド（main push）で合計 100 を超過
- 超過後は Production ビルドがキューに入らず Preview のみ生成
- UTC 00:00（JST 09:00）のクォータリセット後、00:43 UTC に最終 Production ビルド成功

---

## 自動復旧の仕組み（今後）

- **GitHub Actions cron**: UTC 00:05 に Production SHA vs main SHA を比較し、乖離があれば Vercel API で再デプロイをトリガー
- **管理画面**: `/admin/deployment-status` でリアルタイム確認
- **手動手順**: `logs/recovery-procedure.md` 参照

---

*次回チェック: クォータリセット直後 (JST 09:05) に GitHub Actions が自動実行*
