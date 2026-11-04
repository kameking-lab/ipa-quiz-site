# INT1 公開バッチ1 統合作業報告

状態：停止条件に到達。統合・公開準備・検証は未完了。
確認日時：2026-11-04 10:31 JST。締切：2026-11-05 12:00 JST。

依頼の「DBスキーマ変更が必要になったら止めて報告」に従い、iOSサーバー成果に新規DBスキーマへの依存を確認した時点で停止した。DBへの接続・変更・マイグレーション実行はしていない。

## 作成済み

- `git fetch origin` 実行済み。
- 最新 `origin/main`：`00e49b94060cc2671e9d098df91d653a4ed3ffe2`。
- worktree：`C:/Users/kanet/20260522/wt-batch1`。
- ブランチ：`release/batch1-20261105`。上記基点から作成。
- 元の `ipa-quiz-site` worktree に存在した変更には触れていない。
- 進捗台帳の対象ステータスを抽出し、71行を確認。抽出時点の写しは隣接する `candidate-snapshot.json`。資格ページ単位の数ではなく台帳の行数。
- 高圧ガス冷凍の台帳は「完成（独立レビュー合格・230問）」、`qual/khk-reito-20261104@65f0ef46b`、バッチ1対象へ更新されていた。受入証跡自体の再照合は未実施。
- `docs/two-round-question-ingestion.md` と LQ4B/F/G の報告を確認。LQ4B旧報告では未完了だったビル管理360問と技術士機械160問は後続LQ4F/G報告で内容受入済み。公開ローダーへの登録が別途必要。

## 停止理由：IAP未設定でも到達できる新規DB参照

確認対象：`feat/ios-app-v1-20261103@43ff0154672db7f898c30ca9a941175353698cd2`。
確認したファイルは `C:/Users/kanet/20260522/ipa-quiz-ios1` のコミット済み成果。

1. `app/api/mobile/auth/complete/route.ts` と `app/api/mobile/auth/exchange/route.ts` は `mobile/server/auth.ts` の関数を直接公開している。
2. `mobile/server/auth.ts` の `complete()` は、認証・確認フォーム等の検査後に `MobileAuthCode` をDELETE/INSERTする。`exchange()` も有効形式の要求で同テーブルをDELETE/RETURNINGする。両関数に `MOBILE_IAP_ENABLED` や `requireMobileReady()` の検査はない。
3. INSERT/RETURNING は新設の `authenticatedAt` 列も要求する。IAP未設定だけではこれらのSQLに到達しないことを保証できない。
4. `app/api/account/delete/route.ts` → `lib/auth/delete-account.ts` もIAPフラグで停止せず、既存課金データを持つ会員の削除で `DeletedBillingRetention` にINSERTする。

成果に同梱されたSQL：

| ファイル | 必要となるスキーマ |
| --- | --- |
| `mobile/migrations/20261103_mobile_revenuecat.sql` | `MobileRevenueCatAccount`、`MobileAuthCode` のCREATE TABLE |
| `mobile/migrations/20261103_account_deletion.sql` | `DeletedBillingRetention` のCREATE TABLE、`MobileAuthCode.authenticatedAt` の追加 |
| `mobile/migrations/20261103_store_environments.sql` | `MobileRevenueCatAccount.productionExpiresAt` / `sandboxExpiresAt` の追加（IAP有効時に使用） |

`prisma/schema.prisma` の差分だけではこの依存を検知できない。実装はraw SQLで新規テーブルを参照する。現行本番DBに当該テーブルがあるかは確認していない。SQLの適用済み証跡も今回確認できておらず、スキーマ追加を前提とする成果を無条件で統合していない。

IAP有効時だけ必要なRevenueCat用テーブルに加え、フラグ未設定で到達する認証・削除経路にも新規スキーマ依存があるため、指定の停止条件として扱った。独断で当該機能を削除・無効化して取り込む変更も行っていない。

## 別途解決が必要な取り込み範囲

iOSブランチには `app/api/copilot/route.ts`、`app/api/copilot/exam-library/route.ts`、`lib/ai/consent.ts` などAI呼び出し経路の変更もある。依頼の「AI呼び出し経路には手を入れない」に従い、ブランチ全体のmergeはしていない。再開時もこれらをそのまま取り込むことはできない。

## 未実施

- 資格成果とiOS成果の取り込み、競合解消、公開フラグ切替、部分収録注記。
- 各資格の期待件数と公開ローダー件数の照合、重複・資格対応の検査。
- `pnpm typecheck` / `pnpm lint` / `pnpm test` / `pnpm build` / `pnpm validate:questions`。
- IAP未設定時のWeb影響検証、ローカル本番ビルドと10資格以上の画面検収。
- 最終 `batch1-publish-list.md`。未検証の候補一覧を公開確定リストとして作成していない。
- 指定CLIによる統合差分・公開リストの独立レビュー。統合差分がまだないためPASSとは報告しない。

成果取り込み前の基点に、停止報告と候補スナップショットのみをコミットする。push・PR・mainマージ・デプロイ・Vercel操作・AI実呼び出し・DBスキーマ変更は一切していない。

## 再開時に必要な判断

DB依存の認証・削除等を今回の取り込み対象から外す／未設定時には到達できないようにする方針、または必要スキーマの扱いについてオーナー判断が必要。これは今回の停止指示を解除せずに独断で進められる変更ではない。再開後は上記未実施項目をすべて実施し、承認用の統合ブランチとして再検収する。
