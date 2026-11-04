# DB1: iOSサーバー新規テーブルの本番適用手順

2026-11-04作成。オーナー承認（同日14:30 JST「全部やっていいよ」）の対象は新規3テーブルとその追加列。DB1の作業は準備・ローカル検証までで、本番接続・適用・pushは実施しない。以下は後続の適用担当者が実行する手順。

## 正本と設計判断

| Prisma migration | 追加内容 |
| --- | --- |
| `20261104000000_mobile_revenuecat` | `MobileRevenueCatAccount`、`MobileAuthCode` |
| `20261104010000_mobile_account_deletion` | `DeletedBillingRetention`、`MobileAuthCode.authenticatedAt`（nullable BIGINT） |
| `20261104020000_mobile_store_environments` | `MobileRevenueCatAccount.productionExpiresAt` / `sandboxExpiresAt`（nullable TIMESTAMPTZ） |

旧 `mobile/migrations/20261103_*.sql` を上記の各 `migration.sql` に移動した。旧ファイルとの対応は [mobile/migrations/README.md](../mobile/migrations/README.md)。既存のPrisma migrationは変更しない。

`schema.prisma` にモデルは追加しない。既存の `20261103000000_feedback_unlock` 等もraw SQLをPrisma履歴で管理しており、iOS側の `mobile/server/auth.ts`、`mobile/server/revenuecat.ts`、`lib/auth/delete-account.ts` も `$queryRawUnsafe` / `$executeRawUnsafe` を使う。今回はこの方式に揃え、Prisma Clientや認証・課金の処理を変更しない。将来 `migrate dev` / スキーマ差分から生成したSQLを使う場合、モデル外テーブルのDROP等が混入していないことを必ず確認する。

3本の実行文は `CREATE TABLE IF NOT EXISTS` と、**今回新設するテーブルだけ**への `ADD COLUMN IF NOT EXISTS` の計6文。既存の `User` 等にDDL/DMLは行わない。INSERT、UPDATE、DELETE、DROP、TRUNCATE、バックフィル、NOT NULL化、デフォルト変更はない。`REFERENCES "User"("id") ON DELETE CASCADE` は元SQLを保持する。作成時に親のUserを変更・削除することはなく、将来Userが削除された際の新テーブル側の挙動だけを規定する。

再適用時には既存オブジェクトと行を保持する。ただし `IF NOT EXISTS` は型・制約の不一致を修復しない。同名テーブルがある場合、後述の列と制約を先に照合し、異なるなら停止する。追加列の既存行はNULLのままで、認証日時等の推定や課金期限の移行はしない。

## ビルドから自動適用されるか

リポジトリ設定では**自動適用しない**。

- ルート `package.json`: `build = next build`、`postinstall = prisma generate`。`db:migrate:deploy = prisma migrate deploy` は独立した手動スクリプト。
- `vercel.json`: `buildCommand` / `installCommand` の指定なし。cronと一部ブランチのdeploymentEnabledのみ。
- `.github/workflows`: `migrate deploy` / `db:migrate:deploy` 呼出しなし。`mobile/package.json` のbuildにもなし。
- `docs/AUTH_AND_BILLING_SETUP.md` のbuild前置案は提案であり、現行の実装ではない。

Vercel管理画面のBuild/Install Command上書き設定はこの作業では取得していない。適用担当者は対象プロジェクトのSettings → Build and Deploymentで実効コマンドを確認し、リポジトリ外のDB適用がないことを確かめる。管理画面で上書きできる仕様は [Vercel公式](https://vercel.com/docs/builds/configure-a-build) を参照。今回は自動適用の設定を追加しない。

## 適用前の確認

1. 取り込むDB1コミットと対象環境を固定する。Node 22以上と依存関係（lockfileのPrisma 6.19.3）を用意する。インストールは秘密値を置く前に `corepack pnpm install --frozen-lockfile` で行う（packageManagerはpnpm 10.33.0）。
2. オーナーがルートの `.env.production.local` に、対象本番DBの**直接接続**を `DATABASE_URL` として貼る。このファイルは `.gitignore` の `.env*` に該当する。値をチャット・ログ・コマンド引数・報告に転記しない。このファイルの内容を表示するコマンドは使わない。
3. 現在の `schema.prisma` は `env("DATABASE_URL")` のみを参照し、`directUrl` の指定はない。`DIRECT_URL` だけを置いても適用先には使われない。DB名・本番ブランチ・接続先schema（この手順は `public`）をオーナー側で照合する。schemaがpublic以外なら、この確認SQLも同じschemaに直してから実施する。
4. 復旧点を確保し、正確な件数比較を行う時間帯はアプリやジョブの書込みを止める。SQLは既存データを書き換えないが、DDLにはロックが必要となる。接続中の処理を自動終了したり、制約を外したりしない。

PowerShellでworktreeルートから実行する。以下は**将来の適用時のみ**。Nodeのenv-fileは既存のプロセス環境変数より優先されないため、先に継承されたDATABASE_URLをこのシェルから外す。Prismaが自動検出する `.env` / `prisma/.env` 間の重複定義エラーがあれば停止して整理し、`.env.production.local` の接続先が使われることを確認する。

```powershell
Set-Location 'C:/Users/kanet/20260522/ipa-quiz-ios1'
git status --short
git check-ignore .env.production.local
Remove-Item Env:DATABASE_URL -ErrorAction SilentlyContinue
node --env-file=.env.production.local node_modules/prisma/build/index.js migrate status --schema=prisma/schema.prisma
```

`migrate status` の未適用一覧が**上記DB1の3本だけ**であることを確認する。未適用があるため終了コード1になること自体は想定内。接続失敗、失敗中のmigration、履歴不一致、未知の履歴、DB1以外の未適用があれば適用を停止する。特にこのブランチの `feedback_unlock` 2本等が本番未適用の場合、その承認をDB1の承認に含めない。`migrate deploy` は未適用を全て流し、3本だけを選ぶフラグはないため。

本番のSQLエディター、または同じ直接接続を用いるローカルSQLクライアントで [mobile-db-check.sql](./mobile-db-check.sql) を実行し、列・制約・NOTICEの件数・履歴を適用前の証跡として保存する。接続文字列は記録しない。`_prisma_migrations` がない場合は既存履歴の確認ができないため停止する。スクリプトはREAD ONLYトランザクションで、動的SELECTにより新テーブルが未作成でも件数確認できる。実行エラー時にはROLLBACKして先へ進まない。

既存の同名テーブルがある場合の期待構造（列デフォルトは全てなし）:

| テーブル | 必須列・型・NULL可否 | 制約 |
| --- | --- | --- |
| MobileRevenueCatAccount | userId TEXT NOT NULL、appUserId TEXT NOT NULL、expiresAt / checkedAt TIMESTAMPTZ NULL可 | userId PK、appUserId UNIQUE、userId → User.id FK（ON DELETE CASCADE、ON UPDATE NO ACTION） |
| MobileAuthCode | codeHash TEXT NOT NULL、userId TEXT NOT NULL、challenge TEXT NOT NULL、expiresAt TIMESTAMPTZ NOT NULL | codeHash PK、userId → User.id FK（同上） |
| DeletedBillingRetention | archiveId TEXT NOT NULL、purgeAfter TIMESTAMPTZ NOT NULL | archiveId PK、archiveId → User.id FK（同上） |

追加3列は未存在なら作成対象。存在するなら `authenticatedAt` はBIGINT NULL可、`productionExpiresAt` / `sandboxExpiresAt` はTIMESTAMPTZ NULL可であること。他の型・制約、余分な必須列、トリガー等の独自変更があれば自動修復せず調査する。既存の同名テーブルとデータが正しいなら、SQLがスキップされてもPrismaが今回の履歴を記録できる。

## 適用と適用後の確認

前項でDB1だけが未適用であることを確認した同じcheckout・シェルで、次を実行する。

```powershell
node --env-file=.env.production.local node_modules/prisma/build/index.js migrate deploy --schema=prisma/schema.prisma
if ($LASTEXITCODE -ne 0) { throw 'Migration failed; stop and investigate before retrying.' }
node --env-file=.env.production.local node_modules/prisma/build/index.js migrate status --schema=prisma/schema.prisma
if ($LASTEXITCODE -ne 0) { throw 'Migration status is not clean.' }
```

1. `mobile-db-check.sql` を再実行し、3テーブル・計13列とPK / UNIQUE / FKを確認する。Prisma履歴は3本全て `finished_at IS NOT NULL` / `rolled_back_at IS NULL`、未適用なしであること。
2. 新規作成したテーブルは0件。適用前から存在する3テーブルおよび全既存Web/課金テーブルの件数は、書込み停止中なら前後同一。`_prisma_migrations` は今回3本分増えるため件数同一の対象外。通常運用中に比較する場合はアプリ・ジョブの増減と区別し、差分をDDLの結果と決めつけない。
3. 必要なら同じ `migrate deploy` を再実行し、`No pending migrations to apply` を確認する。Prismaの履歴管理に加え、今回のSQL自体も再実行で行を変更しない。

失敗時はアプリ公開を進めず、失敗箇所・実際の列/制約・履歴を照合する。今回は破壊的な逆マイグレーションを用意しない。`migrate reset`、`db push`、手動DROP、無確認の `migrate resolve --applied` は使わない。部分適用でも `IF NOT EXISTS` により作成済み部分は保持されるが、失敗履歴がある状態は `deploy` だけでは再開できない。実状態を確認したうえで別途復旧手順を確定する。

Prismaの運用仕様: [Prisma ORM v6 Development and production](https://www.prisma.io/docs/orm/v6/prisma-migrate/workflows/development-and-production)。`migrate deploy` はmigration SQLと履歴を使用するため、今回のraw SQLにPrismaモデルは不要。
