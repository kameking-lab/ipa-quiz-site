# ASC8: Appiumを使わない匿名撮影と準備待機の耐障害化

対象の失敗情報（ユーザー提供）: タグ `asc-kakomon-v1.0.0-b2-r20261105-05`、
Codemagic build `6aec4f386a1999f83b794cae`、コミット `2db26e7be`。
ASC6のSimulator選択は成功したが、Appiumの `POST /session` がTimeoutErrorになった。
WDA/Xcode 26.6側の詳細な原因は未確定。ASC7はWDA自体を撮影経路から除く。

ASC8対象（ユーザー提供）: コミット `2e2063784`、タグ
`asc-kakomon-v1.0.0-b2-r20261105-06`、Codemagic build
`6aec58776a1999f83b79843c`。iPhone 16 Pro / iOS 26.5の作成・起動は成功したが、
01-homeの準備待機中に10秒のcommand timeoutで停止した。従来の準備待機自体は120秒で、
内部の `log show` に設定した10秒timeoutが例外となり待機全体を中断する経路があった。
CI原本ログは本変更では取得していないため、ログ欠落・プライバシー・起動失敗の併発は未確定。

`bash scripts/asc_capture.sh` は互換Simulatorの事前確認後、次の設定でビルドする。

```sh
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath build/asc-simulator CODE_SIGNING_ALLOWED=NO \
  'SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) DEBUG ASC_CAPTURE' build
```

ビルド直前に生成済みSwiftとios-assets原本を `cmp` し、同じ引数の
`xcodebuild -showBuildSettings -json` でAppのDebug・iphonesimulator・DEBUG/ASC_CAPTUREと
bundle IDを検証する。保存するのはこの4項目だけ（CI環境を含む全設定は保存しない）。
実行時の `ASC_CAPTURE_STARTED` と準備完了receiptでも専用実装の有効化を確認できる。

撮影ヘルパーは `#if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)` 内にある。
通常Debugは専用フラグなし、提出ReleaseはDebug条件なし、実機はsimulator条件なしで、
どの場合も起動引数の解析・自動遷移・JS実行・準備ログの実装がコンパイル対象外になる。
残る `ASCCaptureGate.isActive` はfalseだけを返す。URL scheme・UserDefaults・Webページや
リモート設定から撮影機能を有効にする入口は作らない。

各画面を新しいプロセスで起動する。引数はルートと毎回新規のUUIDを両方要求し、重複も拒否する。

```sh
xcrun simctl launch --terminate-running-process "$UDID" jp.kakomon-ai.app \
  -AppleLanguages '(ja)' -AppleLocale ja_JP \
  -ascCaptureRoute /ap -ascCaptureToken "$NEW_UUID"
```

許可するルートは `/`、`/ap`、`/review`、`/account/dashboard`、ローカル画面を示す
`reminder` の5つだけ。`/q/*`、`/quiz*`、認証、課金、任意URL、query付きルートは拒否する。
撮影専用の課金権利、無料枠、サンプル履歴は作らない。ASC4と同じ5画面を各2サイズで撮影する。

ローカル起動時に広告ブロックとSDK公開設定保存が完了し、Reactのmainと実履歴復元の
`data-mobile-ready=true` が揃ってから本番の既存ページへ移動する。WKWebViewの
`isLoading=false`、正しいorigin/path、`document.readyState=complete` を確認し、
オンラインのネイティブUI、既存ダイアログの拒否・スキップ、ホームIT分類の選択と結果を待つ。
復習は実際の「復習キューはまだ空です」、履歴は実データの「総問題数」の表示も要求する。
対象へスクロールし、可視画像・font・本文とレイアウトが2秒間安定したら、
`os_log` のdefaultレベル、専用subsystem `jp.kakomon-ai.app.asc-capture`、category
`readiness` と `%{public}@` で `ASC_CAPTURE_READY <UUID> <route>` を出す。
print/stdoutには依存しない。STARTED・10秒ごとのSTATE・FAILEDも同じ出力経路で記録する。
初回のローカル準備やWebViewロード中にもSTATEを出す。ネイティブの期限は150秒。
期限後の非同期JSコールバックからREADYを出すことはない。

Pythonは起動前に `simctl spawn <UDID> log stream --style compact --level debug` を開始する。
述語は `subsystem == "jp.kakomon-ai.app.asc-capture" OR eventMessage CONTAINS "<UUID>"`。
process名（実行ファイルAppとbundle IDの相違）に依存しない。受信したUUIDとルートが
完全一致する準備ログだけを採用する。起動コマンド上限は60秒、各画面の準備待機は180秒。
購読競合は最初15秒後、以降30秒間隔の `log show --last 5m --info --debug` で補完する。
補助コマンドは残り待機時間以下、最大3秒に制限し、timeout/非zeroは記録して待機を続ける。
log stream起動失敗・途中終了も即停止せず、期限まで履歴取得と予備経路を待つ。

ログが取れない場合、180秒待機後に `get_app_container ... data` で
`Library/Caches/asc-capture-<UUID>.json` を読む。これはネイティブが各通知時にatomic保存する
独立経路。今回のUUID・route・READY・detailの一致が必須。準備失敗・不一致・ファイル欠落は
撮影候補として採用しない。ログの明示FAILEDも即停止する。

全撮影で既存の固定sharp依存を使い原寸確認とピクセル統計を計算する。中央本文領域
（左右5%、上12%、下10%を除外）を240×480に縮小し、暗色画素0.8%以上、標準偏差8以上、
最多16階調RGB色の占有率98.5%未満、4×6区画のうち6区画以上・3行以上に内容を要求する。
白・黒一色、ステータスバーのみ、疎なspinner/読み込み表示を拒否する。
予備経路はさらに3秒離れた2枚で両方を検証し、平均輝度差2以下、差20超の画素1%以下を要求する。
最終フレームをJPEG化し、manifestに検知経路と統計を記録する。画像統計は意味判定の保証では
ないため、同一launchのネイティブREADYを必須とし、最後の目視確認も行う。

画面ごとのstream出力全文（stdout/stderr、機密除去済み）と履歴取得の出力/エラー全文を
`build/asc/diagnostics/<device>/<screen>-app.log` / `-history.log` に保存する。
候補PNG・比較PNG・統計JSON・取得receiptも同じ階層に残す。失敗時はその時点の
`failure.png`、STATE/例外の `failure.txt`、Simulator一覧も保存し、標準出力に失敗理由、
artifact一覧とログ末尾20行を出す。Codemagicの既存 `diagnostics/**/*.log|txt|json|png`
artifacts指定がこれらを回収する。ログ購読は撮影・検証完了まで継続しfinallyで停止する。
撮影失敗時も作成した端末だけをshutdown/deleteする。

ステータスバーは9:41・Wi-Fi 3本・携帯電波4本・充電完了100%、外観はlightに固定する。
`simctl io <UDID> screenshot --type=png` の原寸を `sips` でJPEG化し、既存の
寸法・RGB・10枚・SHA-256検証が通ってから後続の掲載処理へ進む。
元PNGを新たに撮り直すことなく、検証した同じフレームを変換する。

撮影起動ではネイティブ広告設定をfalseにしてATT/CMPの自動要求を止め、広告ブロックは維持する。
通知の許可要求は既存の「毎日の通知を設定」操作時だけで、撮影はそのボタンを押さない。
Webダイアログは既存の明示的な拒否・スキップだけを使い、未知のダイアログは待機して停止する。
通常の提出ビルドでは広告・ATT・通知の既存動作を維持する。

Appleは隠れた機能を禁じ、実際のアプリ体験に沿うスクリーンショットを求めている。
そのため撮影実装を提出Release・実機から除き、通常UIの操作と撮影だけに限定している。
同じソースを提出ビルドの生成に使っても、撮影引数による利用者向けの機能切替は生じない。
審査結果そのものはAppleの判断であり保証ではない。次回Macで10枚を目視し、
提出対象ビルドと画面・文言・機能が一致することを確認する。

一次資料: [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)、
[2.3.3 Screenshots](https://developer.apple.com/help/app-review/guideline-reference/2-3-3-screenshots)。
WindowsではPython・Shell構文・抽出したJSの実行テスト・TypeScript・Webビルドを検証する。
Swiftコンパイル、Xcode条件の実バイナリ確認、simctl、実ダイアログ、実撮影はMacで検証する。
