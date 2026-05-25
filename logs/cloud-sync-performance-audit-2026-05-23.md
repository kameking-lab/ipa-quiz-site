# クラウド同期 パフォーマンス監査 (2026-05-23, phase 8 task ⑦)

同期実装のパフォーマンス影響を点検。**ユーザー実データ規模での実害なし**。
report-only（チューニング実装は不要と判断）。残課題は将来最適化として記録。

## 7-1 同期 API 応答時間

- 各エンドポイントの構造: `findMany`（既存取得、userId スコープ・index 利用）
  → 差分のみ per-item で `upsert`/`update`/`create` → 全件 `findMany` で返却。
- per-item ループ（N 回の書き込みクエリ）が主なコスト。ペイロードは上限つき
  （bookmark 2000 / custom-tag 200 / study-plan 50 で slice）。
- 実データ規模の見積り: 一般ユーザーのブックマークは数十件、学習計画 1〜5 件、
  タグ十数件程度。この規模では往復 + 数十クエリで **数百 ms 以内**に収まる見込み。
- 大量データ時（ブックマーク 1000 件超）: per-item upsert が逐次 await のため
  秒オーダーになりうる。**将来最適化（非ブロッカー）**: 差分を
  `createMany(skipDuplicates)` + 更新分のみ個別 update、もしくは
  `$transaction` でバッチ化。history-sync は既に createMany でバッチ化済みなので
  同パターンへ寄せられる。

## 7-2 クライアント側影響

- `syncAll()` は 4 種同期を `Promise.all` で並列実行（直列化しない）。
- merge 関数（mergeServerBookmarks 等）は LocalStorage 上の O(n) 走査 + JSON
  シリアライズのみ。数十〜数百件で 1ms オーダー、メインスレッドブロックは無視可能。
- 自動同期は `DeferredLayoutWidgets` 経由で requestIdleCallback 後・ssr:false で
  ロードし、1 ブラウザセッション 1 回のみ（sessionStorage ガード）。LCP/INP への
  影響なし。
- Service Worker 活用余地: 現状オフライン時は同期をスキップし LocalStorage 保持、
  オンライン復帰時に手動/次回セッションで同期。Background Sync API による自動
  再送は将来の任意拡張（必須ではない）。

## 7-3 DB 負荷

- 追加 index: `Bookmark(userId, updatedAt)` + `(userId, questionId)` unique、
  `CustomTag(userId, sortOrder)` + `(userId, name)` unique、
  `StudyPlan(userId, updatedAt)`。同期の userId スコープ findMany と upsert の
  一意衝突判定はいずれも index を利用する。
- 返却用 `findMany` の orderBy:
  - bookmark は `bookmarkedAt desc`（index は updatedAt）。実データ数十件では
    フルスキャン相当でも無視可能。**任意最適化**: 真に大量化したら
    `(userId, bookmarkedAt)` index を追加（現状は不要）。
  - custom-tag は `sortOrder`（index あり）、study-plan は `updatedAt`（index あり）。
- N+1 は per-item upsert のループのみ（7-1 の通り、バッチ化で解消可能）。

## 結論

- 実データ規模でのパフォーマンス問題は **検出されず**。チューニング実装は見送り
  （report-only 先行マージ）。
- 将来最適化（いずれも非ブロッカー）:
  1. 大量データ時の per-item upsert を createMany/transaction でバッチ化。
  2. ブックマーク表示順最適化のための `(userId, bookmarkedAt)` index（必要時）。
