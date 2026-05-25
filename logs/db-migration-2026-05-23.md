# DB マイグレーション記録 (2026-05-23, phase 8 task ①)

CLAUDE.md §10 承認（社長 / kameking-lab / 2026-05-23、ブックマーク・カスタムタグ・
学習計画の同期に必要な Prisma モデル追加）に基づくスキーマ追加。

## マイグレーション

- 名称: `20260523000000_cloud_sync_models`
- 種別: **新規テーブル追加のみ**（既存テーブルの変更・削除なし）
- 既存データ影響: **なし**（User に新リレーションを追加するが、既存行は不変）

開発環境に DATABASE_URL が無いため `prisma migrate dev` は実行不可。マイグレーション
SQL を既存 `20260419000000_init` と同じ書式で手書きし、`prisma generate` でクライアント
型を更新済み。本番反映は DATABASE_URL 設定環境で `pnpm db:migrate:deploy`
（= `prisma migrate deploy`）により行う。

## 追加テーブル

### Bookmark
- `(userId, questionId)` UNIQUE、`(userId, updatedAt)` INDEX
- `tags TEXT[]`（アプリの inline 自由テキストタグをそのまま保持）
- 表示用 denormalised 列（questionSnippet/exam/year/season/qNumber/category）
- `version INT`（楽観的並行制御 / 競合検知用 etag）、`updatedAt`（LWW キー）

### CustomTag
- `(userId, name)` UNIQUE、`(userId, sortOrder)` INDEX
- `name / color / sortOrder`（タグカタログのメタ。色付きチップ用）
- `version` / `updatedAt`

### StudyPlan
- `id`（クライアント生成 cuid を PK に流用）、`(userId, updatedAt)` INDEX
- `payload JSONB`（lib/study-plan/types の StudyPlan を verbatim 保持）
- `progress JSONB?`（StoredProgress.progress）
- `version` / `updatedAt`

## Prisma クライアント配線

`lib/db/prisma.ts` を従来の `null` プレースホルダから実クライアント singleton へ更新。
ただし **DATABASE_URL が無い環境では従来通り null** を保持（全 sync エンドポイントは
`if (!DATABASE_URL) 503` で先にガードしているため安全）。DATABASE_URL 設定 +
`migrate deploy` 後に、既存の history-sync を含む全同期が一斉に有効化される。

## 競合解決方針（competing writes）

- 各レコード `updatedAt` による last-write-wins（incoming.updatedAt > 既存のみ上書き）。
- 追加は union（サーバ既存を消さない）。**削除の同期は v1 では非対応**（tombstone 未実装）。
  端末間で削除は伝播しない代わりにデータ喪失は起きない。次フェーズで tombstone 検討。
- `version` を上書き毎にインクリメントし、UI が「他端末の新しい変更を反映」を検知できる。

## ロールバック

新規テーブルのみのため、`DROP TABLE "Bookmark","CustomTag","StudyPlan"` で安全に巻き戻し可能
（既存データ無影響）。
