# クラウド同期 — ブロッカー記録 (2026-05-23, phase 7 task ⑦)

## 結論

タスク⑦「クラウド同期最小実装」は **部分実装 + 一部ブロッカー**。
学習履歴の同期は既存実装で稼働済みのため /settings から発見可能にした
（この PR でマージ可能な安全スライス）。一方、ブックマーク・カスタムタグ・
学習計画の同期は **新規 DB スキーマ（Prisma モデル）追加が必須**であり、
CLAUDE.md §10「DB スキーマの新規作成・変更」= 承認必須事項に該当するため、
社長承認なしには自律実行できない。**本 PR は draft 保持・マージ保留**。

## 既に存在する資産（追加実装不要）

- NextAuth.js v5（`lib/auth/`）: Google / GitHub OAuth + Email Magic Link。
  パスワード不要のマジックリンク認証は要件を満たす。
- `DATABASE_URL` 設定時のみ Prisma Adapter で永続化（未設定なら JWT のみ）。
- 学習履歴の同期は **実装済み**:
  - `app/api/account/history-sync/route.ts`（POST、(userId, questionId, answeredAt)
    三つ組マージ）
  - `app/account/HistorySyncPanel.tsx`（手動「同期」「エクスポート」ボタン）
  - Prisma `StudyRecord` モデル + `Streak` モデルは既存。

## この PR でマージ可能な安全スライス（スキーマ変更なし）

- `/settings` に「クラウド同期」セクションを追加し、`/account`（既存の
  HistorySyncPanel）への動線とオプトイン説明を掲載。レビュー継続力スコアの
  最大押し下げ要因「LocalStorage 依存による履歴喪失」を、最大データである
  学習履歴について発見性改善で部分的に救済。新規 LS キーなし・AI 呼び出しなし。

## ブロッカー（社長承認が必要）

以下の同期対象は新規 Prisma モデルが必要 = CLAUDE.md §10 承認必須:

1. ブックマーク + カスタムタグ
   - 現状 LocalStorage `ipa-quiz:bookmarks:v1`（`lib/storage/bookmarks.ts`）。
   - 必要モデル（案）:
     ```prisma
     model Bookmark {
       id         String   @id @default(cuid())
       userId     String
       questionId String
       tags       String[] // カスタムタグ
       createdAt  DateTime @default(now())
       user User @relation(fields: [userId], references: [id], onDelete: Cascade)
       @@unique([userId, questionId])
       @@index([userId])
     }
     ```
2. 学習計画
   - 現状 LocalStorage（`lib/study-plan/storage.ts`）。
   - 必要モデル（案）: `StudyPlanRecord { id, userId, payload Json, updatedAt }`
     （プラン構造は複雑なため JSON 列で保持するのが最小）。
3. ストリーク同期
   - `Streak` モデルは既存だが同期エンドポイント未実装。
   - `app/api/account/streak-sync` を追加すればスキーマ変更なしで実装可能。
     （ブックマーク/計画と同時に出すべきなので本 PR では保留）。

## 競合書き込み（competing writes）方針案

- 履歴: append-only。三つ組重複判定で冪等マージ（実装済み）。
- ブックマーク: `(userId, questionId)` ユニーク。タグは `updatedAt` 新しい方優先
  （last-write-wins）。
- 学習計画: プラン単位で `updatedAt` last-write-wins。

## 追加が想定される環境変数（本人後付け用）

既存 NextAuth が使用（この PR では新規追加なし）:
- `AUTH_SECRET`（必須）
- `AUTH_URL`（本番必須）
- `DATABASE_URL`（Prisma Adapter 有効化）
- `AUTH_EMAIL_SERVER` / `AUTH_EMAIL_FROM`（マジックリンク用 SMTP）

スキーマ承認後に上記モデルを追加 → `prisma migrate` → 各 sync エンドポイント
（bookmark-sync / study-plan-sync / streak-sync）を実装、という順序。

## 推奨アクション（社長判断待ち）

1. 上記 Bookmark / StudyPlanRecord モデル追加を承認するか判断。
2. 承認されれば、本 draft PR をベースに sync エンドポイント 3 種を追加実装し
   /settings から各データのオプトイン同期を提供する（次フェーズ）。
3. 承認しない場合は、本 PR の安全スライス（settings 発見性）のみ切り出して
   マージ可能。
