# データポータビリティ ガイド (2026-05-23, phase 8 task ④)

クラウド同期導入後も、手動エクスポート/インポートは**そのまま並列維持**される。
ユーザーはいつでも自分のデータを JSON で持ち出せる。

## 既存の手動エクスポート/インポート（動作確認済み）

- **ブックマーク** (`/bookmarks`)
  - エクスポート: `exportBookmarks()` → `ipa-bookmarks-YYYY-MM-DD.json` をダウンロード
  - インポート: `importBookmarks(json)`（タグ inline 込みで復元）
  - クラウド同期実装後も既存ボタンは不変・正常動作。
- **学習履歴** (`/settings` 学習履歴管理)
  - エクスポート: `historyStore.exportJson()` → `ipa-quiz-history-YYYY-MM-DD.json`
  - インポート: `historyStore.importJson(text)`
  - サインインユーザー向けには `/api/account/history-export`（サーバ側 JSON）も併存。
- **学習計画** (`/study-plan`)
  - LocalStorage 保持。プラン単位の削除可。
- いずれもクラウド同期とは独立。同期 ON/OFF に関わらず手動入出力は機能する。

## LocalStorage ⇄ クラウド 移行手順

### LocalStorage → クラウド（バックアップ）
1. `/auth/signin` でサインイン（メールのマジックリンク等、パスワード不要）。
2. `/settings` →「クラウド同期」→「今すぐ同期」。
   - または初回サインイン後、`CloudSyncAutoSync` が自動で 1 回アップロード。
3. 学習履歴・ブックマーク・カスタムタグ・学習計画がクラウドへ保存される。

### クラウド → LocalStorage（新しい端末で復元）
1. 新端末で同じアカウントにサインイン。
2. `/settings` →「今すぐ同期」（または初回自動同期）。
3. サーバの全データが端末の LocalStorage へマージされる（union + last-write-wins）。
   既存のローカルデータは消えず、サーバの新しい項目が追加される。

### 同期をやめる（LocalStorage のみ運用へ戻す）
- サインアウトすれば以後の同期は停止し、データは各端末の LocalStorage に残る。
- クラウド側データは次のアカウント削除まで保持される。

## アカウント削除時のデータ取扱い

- Prisma 全モデルは `onDelete: Cascade`（`User` 削除で
  StudyRecord / Bookmark / CustomTag / StudyPlan / Streak / Session / Account も削除）。
- 端末の LocalStorage は削除されない（クラウド削除はローカルに波及しない）。
  ユーザーは引き続きローカルのみで利用可能。
- 削除前のバックアップとして上記の手動エクスポートを案内する。

## 既知の v1 制限

- 削除の同期は v1 非対応（tombstone 未実装）。端末 A で外したブックマークは
  端末 B の同期で復活しうる（データ喪失は起きない）。次フェーズで検討。
- ブックマークのタグのみの編集は `bookmarkedAt` を更新しないため、まれに
  古い側が勝つ可能性（実害小、`logs/db-migration-2026-05-23.md` 参照）。
