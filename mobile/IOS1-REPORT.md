# IOS1 実装報告

作業日：2026-11-03（日本時間）。既存HEAD `ae2d3a8d0` から新規worktree `C:/Users/kanet/20260522/ipa-quiz-ios1`、ブランチ `feat/ios-app-v1-20261103` を作成した。

## 成果

Capacitor 8＋ReactのiOS v1実装を `mobile/` に追加した。Bundle IDは仮の `jp.kakomon-ai.app`。主要画面と最小データを同梱し、`server.url` は設定していない。ログイン・IAP・外部購入誘導はない。

- 資格選択→四択演習→解答・固定解説。ITパスポート20問／基本情報科目A16問の計36問を同梱。圏外の初回起動から解ける構成。
- 誤答／自信のない正解の復習、解答履歴、今日の演習・正答率、回答済み画面の再開、記録削除。Filesystemの2スナップショットとPreferencesの確定ポインタを使い、端末に保存する。クラウド同期はない。
- 差分更新API `GET /api/mobile/packs?pack=ip&since=1`。新版・変更・削除・SHA-256を検証し、保存完了後に切替。異常時は旧版を保持。v1→v2の差分適用はフィクスチャで検証、実配信v1の更新確認は204を返す。
- AIはオンライン／明示同意時だけ既存 `POST /api/copilot` を呼ぶ。既存の無料枠定数10回/日、JSTリセット、IP制限・費用ガードを維持。ログイン不要。送信前にローカル回数を保存し、自動再試行をしない。ネイティブHTTPで既存のテキスト応答を全体受信する。
- 毎日任意時刻のローカル通知、許可・拒否・変更・停止、通知タップ→復習を実装。WidgetKitはApp Groupで集計だけを共有する設計をREADMEに記載。
- v1.1のRevenueCat＋IAP用 `EntitlementProvider` 境界を用意。v1は常にfreeで、購入SDKやキーは導入していない。
- Codemagicの署名なしarchive設定、macOS限定のiOSプロジェクト生成・同期スクリプト、日本語表示、独自アイコン、Privacy Manifestを追加。

4.2向けの具体的な価値は、外部通信なしの演習・固定解説、端末内の復習／継続記録、ローカル通知から復習への復帰。App Store審査通過を確認したものではない。

## 既存サイトとの境界

アプリ用の実装・パック・テスト・iOS素材は `mobile/` に置いた。サイト側は新規専用API入口 `app/api/mobile/packs/route.ts` のみ追加。ルート `tsconfig.json` の包括検査から独立アプリを除外したが、APIがimportするモジュールはサイト側の型チェックも通している。Codemagic用にルート `codemagic.yaml` を追加した。

既存の画面・AIルート・認証・料金・無料回数・コスト上限・DB・ルートlockfileは変更していない。元worktreeの既存未コミット変更には触れていない。

## 問題の確認

既存TSデータから画像／図表依存・要確認問題を除外。古い出典URLをアプリパック内だけで公式の現行PDFへ修正し、正答PDFも保持した。IPの採用20問は公式スキャンPDFを目視、FEの採用16問は問題文／選択肢の正規化テキストを照合し、採用36問の正答は公式正答表と一致した。固定解説は過去問AIの学習用であることを表示した。

照合したPDFのURL・hash・公式正答は `mobile/content-review.json`、抽出元・パックhashは `mobile/src/packs/inventory.json` に記録。配布前の所有者による編集／権利の最終確認は残る。

## 検証結果

| 検証 | 結果 |
|---|---|
| アプリ `npm run typecheck` | 成功 |
| アプリ `npm test` | 5ファイル・29件成功 |
| アプリ `npm run build` | 成功。アプリ専用の静的アセット生成のみ、約386KB（未圧縮） |
| ブラウザ `npm run test:e2e` | 2件成功。ローカルアセット配信を模した圏外初回起動、解答、解説、圏外再読込復元、復習、削除、同意後のみのモックAI送信、更新確認 |
| サイト `npm run typecheck` | 成功 |
| 既存AI／無料枠の関連テスト | 4ファイル・23件成功。API、ストリーム、quota同期、クライアント挙動。モックのみ |
| 変更対象ESLint／`git diff --check` | 成功 |
| アプリ `npm audit` | 検出0件（開発依存を含む）。lockfile固定 |
| Codemagic YAML／Privacy Manifest | 構文読込成功。iOS生成JSの構文チェック成功 |

単体テストでは保存失敗・中断・復旧・同時操作、破損差分／版不一致、問題撤回、オンライン境界、同意、10回上限／JST日替わり、サーバー429、通知許可拒否／失敗／停止、APIの固定ホスト制約を確認した。

ルートの依存導入では既存のpnpm workspace設定とnpm peer依存の不整合があり、検査用に `npm install --ignore-scripts --package-lock=false --workspaces=false --legacy-peer-deps` と、未導入のテスト用peer `@testing-library/dom@10.4.1` の `--no-save` 導入を使用した。Prisma Clientをローカル生成して型チェックを実行。ルートの依存宣言・lockfile・DBは変更していない。

## 未実施と次の確認

- iOSビルド、Codemagic実行、iPhone実機での通知／圏外復元／ネイティブHTTP確認は未実施。Windowsでネイティブ生成・ビルドは実行していない。
- 署名・App Store Connect登録・提出・push・Vercelビルド／デプロイ／設定変更・実キー呼出しは行っていない。秘密値は読み出し／表示していない。
- 新規パックAPIは未デプロイ。本番への反映後に更新取得を確認する。AI実応答は未検証で、実キーを使う確認は今回の禁止範囲として残した。
- Codemagic初回unsigned archive、通知の実機挙動、VoiceOver／大きな文字、AI提供者と保持方針の本番一致、App Privacy申告、配布内容の最終確認を公開前に行う。現状の未署名archive設定ではTestFlight／App Storeへ配布しない。

詳細手順・差分契約・v1.1差込口・Widget設計・公式資料リンクは `mobile/README.md`。審査・配布の完了報告ではなく、ローカルで検証したv1実装の引き継ぎである。
