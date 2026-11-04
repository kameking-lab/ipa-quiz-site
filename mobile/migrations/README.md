# iOSサーバーDBマイグレーション

DB1でSQLの正本をルートの `prisma/migrations` へ移動した。旧SQLは重複適用や内容の乖離を防ぐため残さない。過去のIOS1B等の報告にある旧パスは以下へ読み替える。

| 旧ファイル | 現在の正本（リポジトリルートから） |
| --- | --- |
| `20261103_mobile_revenuecat.sql` | `prisma/migrations/20261104000000_mobile_revenuecat/migration.sql` |
| `20261103_account_deletion.sql` | `prisma/migrations/20261104010000_mobile_account_deletion/migration.sql` |
| `20261103_store_environments.sql` | `prisma/migrations/20261104020000_mobile_store_environments/migration.sql` |

実行順は表の順。適用経路はPrisma Migrateに統一し、アプリ起動時のDDLは追加しない。[本番適用・確認手順](../../docs/mobile-db-migrations.md) を参照。DB1では接続・本番適用を実施していない。
