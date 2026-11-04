# IOS1G 検証報告

対象：`C:/Users/kanet/20260522/ipa-quiz-ios1`、ブランチ `feat/ios-app-v1-20261103`。
開始：2026-11-04 01:26 JST。開始HEAD：`a46bfef676284817519ead730535d5a38fd3dcd5`。
最終ソース：`e7ae7c6ec38a49b8013df09c78a8360acd0420f1`（692f67006の履歴修正＋既存テストprops更新）。後続の証跡コミットはアプリソースを変更しない。
**40分制限での引継ぎ：漏洩2経路を修正・コミット。最終ソースからの全ページ再ビルドと生成物監査は未完了。成功済みとは評価しない。**

## 修正内容

- 拡張した静的監査により、FP2級・FP3級実技の個別ページで、画面本体が制限されていても `generateMetadata()` が問題本文冒頭をHTMLのdescriptionへ出す経路を発見した。制限有効時は本文取得より前に一般的な説明・noindexを返すよう修正。制限無効時の既存説明は維持する。ON/OFFの回帰2件成功。
- HTMLだけでなく埋め込みFlight・独立RSCも確認。通常問題と全別教材のルート、および静的生成された試験紙を対象に、ゲート、正答・解説などのシリアライズ禁止フィールド、元教材の長文指紋を検査する。prerender-manifestとHTML/RSCのファイルを照合し、欠落も失敗にする。
- client chunkは全教材の長文指紋と採点索引のID群で検査する。公開の採点対象外ポリシーで使う参照専用ID・公式出典URLは本文／採点索引と区別。IDの前方一致（q1とq12）を避ける。検査器の漏洩注入・誤検出回帰5件成功。
- 許可リストのOS環境変数だけで子プロセスを起動し、実設定の.envがあれば停止する再実行用スクリプトを追加。ログ・開始HEAD・コマンド・制限フラグ・終了コードを保存する。
- 教材配布トレースはpaper-resultsに加え、catalog／download／billing/questionも検査できるようにした。
- 最後のclient chunk監査で、論述添削履歴画面が題名表示のために `lib/essay/load` 経由で論述問題集全体を同梱する別の本文漏れを検出した。`EssayHistoryView` から本文ローダーを除去し、サーバーページがID・題名だけを渡すよう修正。本文・模範解答をクライアントpropsへ渡さない回帰1件成功。ビルド再監査は下記残作業。

## 検証状況

- 開始HEADの制限有効Next.jsビルド：12,484／12,484生成、終了コード0。旧IOS1Fの実行プロセスは残っていなかったため、本タスクで再実行した。生成物監査で上記メタ情報漏れを検出して修正した。
- メタ情報修正後・履歴修正前の `0316e52ac` の制限有効Next.jsビルド：**12,484／12,484生成、終了コード0、BUILD_ID `GGnRrzghNx8lTK8zwTZFc`**。コンパイルとビルド内型検査も成功。ただし生成物監査は**終了コード1**。`.next/static/chunks/app/account/essay-history/page-0fc8f22d058c9947.js` の本文漏れを検出したため、最終監査の成功JSONはない。単なる代表サンプル検査より対象を広げた結果の実検出。
- 同ビルドの配布トレース：catalog 1,029件、download 1,029件、billing/question 1,027件、paper-results 628件。各APIで期待する教材JSON222ファイルの不足0。
- `0316e52ac` のモバイルPlaywright全E2E：34成功、失敗0。履歴修正後 `692f67006` でも全34件成功・失敗0。e7ae7c6ecはテスト呼出propsだけの更新。Chromium／iPhone 13設定。購入・復元・失効、無料枠11問目の拒否、日付変更と11回答復元、保存ON/OFF、未閲覧解答図の圏外表示・拡大、削除・既存ウェブ契約導線を含む。SDK・認証・APIはモック、外部通信はモック／拒否。
- mobile Vitest：9ファイル、73成功。mobile型チェック：成功。
- 関連ルート単体：目次全件照合を除く75ファイル成功・1ファイル既定skip、753成功・8skip。目次全件照合は単独で2件成功、合計755成功・8skip・失敗0。初回はビルドとの並行中に60秒の既定タイムアウト1件。単独48秒で成功し、他の一式も再実行して成功した。タイムアウト値・検証内容は変更していない。Postgres8件は実DBを使わないため既定skip。
- モバイル製品ビルドへ復帰済み。13ファイル、1,706,922 bytes／gzip 431,139 bytes、テストハーネスなし。IPAのサイズではない。

## コミットと証跡

- `a1f9839ba`：FPメタ情報漏れ修正、回帰テスト、静的監査と安全な起動処理。
- `f22494a03`：公開の参照専用IDと採点索引の完全一致検出を区別。
- `0316e52ac`：公式出典URLと本文指紋を区別。
- `692f67006`：論述履歴のクライアントから問題集本文を除去し、ID・題名だけを渡す回帰を追加。
- リポジトリ内の保存先：`mobile/docs/evidence/ios1g/`。最終ビルドは `next-final.log`／`next-final.run.json`／`next-final.exit.json`。E2Eは `mobile-e2e-final.*`。最終監査のJSON・ログ、スクリーンショットもここへ保存する。
- 同じ報告を `mobile/docs/ios1g-report.md` に保存して証跡とともにコミットする。

## 残作業・再開コマンド

`692f67006` で全ページを再生成し、監査が成功するまで継続する。現在の `.next` は `0316e52ac` の漏れを検出した生成物なので、配布可能な最終成果物として扱わない。修正後のNext.js再ビルドは40分以内の完了が見込めないため未開始。

```powershell
node mobile/scripts/run-isolated-check.mjs next-history-fixed strict
node mobile/scripts/run-isolated-check.mjs web-audit-history-fixed node_modules/tsx/dist/cli.mjs --tsconfig mobile/tsconfig.scripts.json mobile/scripts/audit-web-content.ts
node mobile/scripts/run-isolated-check.mjs trace-history-fixed mobile/scripts/audit-build-traces.mjs
```

HTML／RSCの欠落・本文／正答フィールド・全client chunkの本文指紋／採点索引を再確認する。監査は最初のclient chunk漏れで停止するため、履歴以外の後続chunkも未確認として扱う。問題があれば修正・回帰後に再ビルドする。

## 範囲・未実施

今回の「全E2E」はiOSアプリの `mobile/tests/e2e` 全34件。通常公開ウェブ全体の別E2E一式ではない。HTML監査は静的生成された保護対象とclient chunkに対する検査であり、オンデマンド経路・すべての変形表現・実サービス全体の漏洩不存在を証明するものではない。

署名付きIPA・iOS実機・実App Store購入／復元／失効・実Apple再認証／削除・実契約ポータル・隔離Postgres競合・保持期限後の削除運用はIOS1Fからの別残条件。本タスクのモック／メモリー検証と区別する。

push・デプロイ、本番DB・設定変更、実キー呼び出し、git reset --hard／clean／ブランチ削除は行っていない。秘密値は表示・保存・コミットしていない。

追加確認：履歴修正と既存採点表示の回帰は2ファイル5件成功。既存テストのprops不足を修正し、ルート型チェックをroot-typecheck-verified.*で再実行した。終了結果は同証跡を参照。最終ソースの全ページ再ビルド・生成物再監査は未実施。

終了時追記：ルート型チェック再実行は終了コード0で成功（root-typecheck-verified.exit.json、02:06:36 JST）。e7ae7c6ecで既存テストのpropsを更新済み。履歴修正後E2Eは全34件成功、製品ビルドへ復帰・サイズ再計測も成功。再ビルドを待つ子プロセスは起動していない。残作業は最終HEADからのNext.js全ページ再ビルドと生成物の全文監査・配布トレース再確認。
