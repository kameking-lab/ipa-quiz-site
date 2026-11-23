# DB1: iOSテーブルをVercelビルド時に自動適用

2026-11-04作成、INT5Bで2026-11-05更新。オーナー承認（11月4日14:30「全部やっていいよ」、23:05「自分でやれ」）の対象はDB1の新規3テーブルと追加列。Vercel本番ビルドで自動適用する。接続文字列の読出し・ローカルへの貼付けなど、オーナーの手作業は不要。INT5Bでは実装・ローカル検証のみ行い、本番接続・適用・push・デプロイは行っていない。

MIG2追記（2026-11-05）: 同日12:10 JSTのオーナー承認により、[フィードバックで+10問](./feedback-unlock.md) の `20261103000000_feedback_unlock` と `20261103010000_feedback_unlock_user_id` もDB1と一緒に本番適用できる。同日10:12の診断ビルドで本番未適用は下記5本と確認済み。MIG2では専用ブランチをpushするが、本番接続・適用・デプロイは実施しない。

PET1追記（2026-11-08）: オーナー承認（11月8日夜「DB スキーマの新規作成・変更」）により、チワワ育成のクラウド保存用 `20261108000000_pet_cloud_profile`（新テーブル `PetProfile` 1つと、そのテーブル自身の外部キーだけ。既存テーブルは変更しない）を追加した。最新のmigrationなので、ゲートの許可パターンは **MIG2の5本+PET1**、**DB1の3本+PET1**、**PET1の1本だけ**、**0本** の4通りになった（本番が既存migrationを全適用済みなら、次の本番ビルドのログは「Preflight passed: 1 pending」になる）。以下の本文の「5本/3本/0本」は、PET1未作成時点の記述として読む。

## 正本と設計判断

| Prisma migration | 追加内容 |
| --- | --- |
| `20261103000000_feedback_unlock` | `feedback_unlock`、`feedback_unlock_grant`、`feedback_unlock_rate` |
| `20261103010000_feedback_unlock_user_id` | `feedback_unlock.user_id` と一意インデックス |
| `20261104000000_mobile_revenuecat` | `MobileRevenueCatAccount`、`MobileAuthCode` |
| `20261104010000_mobile_account_deletion` | `DeletedBillingRetention`、`MobileAuthCode.authenticatedAt`（nullable BIGINT） |
| `20261104020000_mobile_store_environments` | `MobileRevenueCatAccount.productionExpiresAt` / `sandboxExpiresAt`（nullable TIMESTAMPTZ） |

旧 `mobile/migrations/20261103_*.sql` を上記の各 `migration.sql` に移動済み。対応は [mobile/migrations/README.md](../mobile/migrations/README.md)。INT5Bでは既存のmigration SQLを変更しない。

`schema.prisma` にモデルは追加しない。既存のfeedback-unlockと同じくraw SQLをPrisma履歴で管理し、iOS実装もraw SQLで参照する。将来 `migrate dev` 等からSQLを生成する際には、モデル外テーブルのDROP等が混入していないことを確認する。

3本の実行文は `CREATE TABLE IF NOT EXISTS` と、今回新設するテーブルだけへの `ADD COLUMN IF NOT EXISTS` の計6文。既存User等へのDDL/DML、INSERT、UPDATE、DELETE、DROP、TRUNCATE、バックフィル、NOT NULL化、デフォルト変更なし。元SQLの `ON DELETE CASCADE` は将来Userを削除した場合の新テーブル側の動作であり、作成時に既存Userやそのデータを削除しない。

## Vercelビルド時に自動適用

ルート `package.json` は `build = node scripts/vercel-migrate.mjs && next build`。`vercel.json` の `buildCommand = pnpm run build` で管理画面のBuild Commandよりリポジトリ設定を優先する。pnpmの暗黙のprebuild実行には依存しない。`.vercelignore` は `scripts/vercel-migrate.mjs` だけを例外として含める。`postinstall = prisma generate` は従来どおりClient生成だけを行う。

実行条件は `VERCEL=1` かつ `VERCEL_ENV=production`、さらにホストビルドで設定される `VERCEL_DEPLOYMENT_ID=dpl_...` があること。Preview・通常ローカル・通常CIはURLの検査やDB接続もせず、終了0でスキップする。デプロイIDのないローカル `vercel build --prod`、明示的なローカルCLIマーカー（`VERCEL_CLI`）、外部CIの既知マーカーもスキップする。Vercelのホストビルド自体が `CI=1` を設定するため、CIフラグだけでは停止させない。本番相当の環境フラグを偽装してローカル実行しない。

### 直結URLと秘密値

既存Vercel ProductionのSensitive envをビルドプロセス内で使う。優先順位は `DATABASE_URL_UNPOOLED` → `DIRECT_URL`（既存 `docs/neon-setup.md` の名前）→ `POSTGRES_URL_NON_POOLING`。値の取得・表示・env pull・ファイル保存は不要。どれもなければビルドを停止し、アプリ用 `DATABASE_URL` へフォールバックしない。Neonの `-pooler` ホストと `pgbouncer=true` は拒否する。

選んだURLは専用Prisma Clientの `datasourceUrl` とPrisma子プロセスの `DATABASE_URL` にのみ渡す。アプリ用の接続設定や `schema.prisma` は変更しない。子プロセスの引数には渡さない。Prismaの出力・例外には接続先が含まれうるため、成功時も失敗時も公開ログへ流さない。ログには固定の段階・件数・安全な停止理由と、想定外だった場合の未適用migration名（秘密値ではない）を出す。

### 適用前の自動ゲート

1. migrationディレクトリを一時領域に複製し、検査とdeployを同じスナップショットで実行する。一時schemaと作業ディレクトリを使い、Prisma CLIからリポジトリのdotenvを探索させない。
2. 協調する本番ビルド同士をPostgreSQL advisory transaction lockで直列化する。別ビルドが検査中なら待たずに失敗する。
3. `_prisma_migrations` を読取り、ローカルの全migration名・SQL SHA256と照合する。履歴なし、未完了/失敗、未知の履歴、重複適用、SQL変更を拒否する。Prisma同様、LF/CRLFの差は許容する。明示的にrolled backへ解決済みのレコードは適用済みから除く。
4. 未適用を名前と順序まで照合し、**上表の5本ちょうど（記載順）**、**末尾のDB1の3本ちょうど（記載順）**、**0本**のいずれかに限定する。それ以外の部分適用、feedbackの2本だけ、未知の追加migration等は、未適用名をエラーに出し、**deployを一度も呼ばず**ビルドを失敗させる。
5. 本物の `prisma migrate status` も実行する。5本/3本なら未適用表示と終了1、0本ならup-to-date表示と終了0を確認する。通信・認証エラー等を未適用と誤認しない。

`feedback_unlock` の冒頭注記だけをMIG2の承認記録へ更新した。過去に旧注記で適用したDBでも3本/0本を許可できるよう、この1本に限り新旧注記それぞれのSQL SHA256（LF/CRLFを含む）を許容する。実行SQLの差異は許容せず、履歴のチェックサムを書き換えない。他のmigrationの照合も従来どおり。

`migrate deploy` は適用対象を選ぶオプションがないため、終了コード1だけを見て実行してはいけない。このゲートは名前と履歴の照合を先に行う。

### 適用と事後確認

ゲート成功時のみ `prisma migrate deploy` を実行する（0本でも冪等に実行）。終了0に加え、再読取りした履歴の未適用0本と、再度の `migrate status` のup-to-dateを確認してから `next build` を開始する。通常はログに次が出る:

```text
[vercel-migrate] Preflight passed: 5 pending approved migrations.
[vercel-migrate] Migration deploy and clean postflight passed.
```

feedbackの2本が適用済みなら先頭の件数は3、全適用済みなら0。承認した5本は追加DDLのみで既存Webと後方互換を保つ。migration成功後にNextビルドが失敗した場合も、追加テーブルはDBに残り、次回は0本として通る。DB変更とアプリ公開は単一トランザクションではない。

Vercelは成功した本番ビルドのみ本番ドメインへ自動昇格させるため、migration失敗でbuildが非0終了すれば新バージョンは配信されず、既存の本番デプロイが継続する。この動作は公式仕様で確認した。INT5Bでは実際のデプロイを作って失敗させる試験はしていない。

- [Vercel Deployment Checks（成功した本番ビルドだけを昇格）](https://vercel.com/docs/deployment-checks)
- [Vercel System Environment Variables](https://vercel.com/docs/environment-variables/system-environment-variables)
- [Vercel buildCommand](https://vercel.com/docs/project-configuration/vercel-json#buildcommand)
- [Prisma migrate status](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#migrate-status)
- [Neon poolingと直接接続](https://neon.com/docs/connect/connection-pooling)

## ローカル再現と失敗時の扱い

`node --test scripts/vercel-migrate.test.mjs` で環境判定と履歴ゲートを検証する。Windowsのembedded PostgreSQLバイナリとpgを専用の一時toolingディレクトリに用意し、`node scripts/check-vercel-migrate-postgres.mjs <tooling-directory>` で合成データだけの新規クラスタを作る。サービス資格情報とdotenvを引き継がず127.0.0.1にのみ接続する。未適用5本・3本・0本・想定外の4本を本物のPrisma CLIで検証し、既存行とmigration履歴を比較する。3本/0本は旧承認注記の履歴、5本は新注記での適用と0本での再実行も確認する。想定外では全テーブルと履歴が変わらず、未適用名が出ることを確認する。アプリ用URLに偽の無効URLを置き、直結URLだけを使うことも確認する。

失敗時は公開を進めない。`migrate reset`、`db push`、手動DROP、無確認の `migrate resolve --applied` は使わない。接続設定不足なら安全な固定エラーを出し、想定外の未適用や履歴不一致なら別作業として調査する。オーナーに接続文字列の読出しや貼付けを依頼しない。将来必要な接続調査も、Vercel内の秘密値を表示しない方法で行う。

適用途中でSQLが失敗した場合、既に作成されたオブジェクトが残る可能性がある。次のビルドは失敗履歴または部分適用ゲートで停止する。自動resolveや自動逆migrationは行わず、状態を確認したうえで別途復旧する。

追加の読取り診断には [mobile-db-check.sql](./mobile-db-check.sql) を使える。これはREAD ONLYで列・制約・件数・履歴を出す補助SQLであり、自動ゲートの代替ではない。同名テーブルが既に存在する場合、`IF NOT EXISTS` は不一致を修復しない。3テーブルの期待値は計13列、PK3・UNIQUE1・ON DELETE CASCADEのFK3。`authenticatedAt` はnullable BIGINT、`productionExpiresAt` / `sandboxExpiresAt` はnullable TIMESTAMPTZ。既存データを推定・上書きしない。
