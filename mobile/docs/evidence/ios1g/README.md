# IOS1G ローカル検証証跡

全ページビルドの検証ソースは `0316e52ac17d3018b29e38d096aa32410d4ea394`。開始HEADのビルドは `next-strict.*`、メタ情報修正後は `next-final.*`。後者の監査も本文漏れを実検出して失敗した。履歴画面を修正した最終ソースは `692f670060d2130969849616d12de63237525bf3` で、全ページ再ビルド・生成物再監査は40分制限の残作業。後続の報告・証跡コミットはアプリコードを変更しない。

各 `*.exit.json` の `exitCode` が実プロセスの終了結果。`*.run.json` は開始HEAD・実行コマンド・環境変数の名前だけを記録する。秘密の値は記録しない。初回の一部は起動記録機能追加前のためrun.jsonがない。

- `next-final.*`：MOBILE_IAP_ENABLED=true、webpack、本番ビルド。完了ページ数はログ末尾の生成完了行を確認。
- `web-audit-final.*`：本文漏れの実検出で終了コード1。論述履歴のclient chunkに問題集本文が入っていた。成功JSON `web-audit.json` はない。
- `history-regression.*`：履歴のサーバー／クライアント境界にID・題名だけを渡す回帰とFPメタ情報回帰、合計3件成功。
- `mobile-e2e-history-final.*`：履歴修正後の全34件再実行結果。
- `web-audit-initial.*`：修正前のFP実技メタ情報の本文漏れを実生成HTMLで検出した失敗ログ。
- `trace-final.*`／`build-traces.json`：4 APIそれぞれの配布トレースに期待する教材JSONが揃っていることを検査。
- `mobile-e2e-final.*`：mobile/tests/e2e全34件。外部依存はモック／拒否。screenshotsはこのテスト実行で保存した画像。
- `mobile-unit-release.*`：mobile Vitest全9ファイル73件。静的監査器の漏洩注入と誤検出回帰も含む。
- `mobile-typecheck-release.*`：mobile全体の型チェック。
- `related-tests.*`：初回の関連一式。目次全件照合だけがビルド並行中に60秒で時間切れ。
- `catalog-retry.*`：目次全件照合を単独実行し2件成功。タイムアウト設定は変更していない。
- `related-final.*`：目次全件照合を分けた残りの関連一式。753成功・8件既定skip。上記目次と合計755成功。
- `metadata-regression.*`：制限ONで本文を出さず、OFFでは従来の説明を返す2件。
- `mobile-production-final.*`／`mobile-release-measure-final.*`／`release-audit.*`：E2E後に製品配信物へ戻し、ハーネスなし・サイズ一致を検査。

リポジトリルートからの主な再実行コマンド：

```powershell
node mobile/scripts/run-isolated-check.mjs next-final strict
node mobile/scripts/run-isolated-check.mjs web-audit-final node_modules/tsx/dist/cli.mjs --tsconfig mobile/tsconfig.scripts.json mobile/scripts/audit-web-content.ts
node mobile/scripts/run-isolated-check.mjs trace-final mobile/scripts/audit-build-traces.mjs
node mobile/scripts/run-isolated-check.mjs mobile-e2e-final mobile/scripts/run-e2e.mjs
node mobile/scripts/run-isolated-check.mjs mobile-production-final mobile/node_modules/vite/bin/vite.js build mobile --config mobile/vite.config.ts
node mobile/scripts/run-isolated-check.mjs mobile-release-measure-final mobile/scripts/measure-bundle.mjs
```

E2Eはdistをテストモードに作り直すため、終了後に製品ビルドへ戻す。実DB・実購入・署名付きIPAの検証証跡ではない。詳細は `../../ios1g-report.md` を参照。
