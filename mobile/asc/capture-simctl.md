# ASC7: Appiumを使わない匿名撮影

対象の失敗情報（ユーザー提供）: タグ `asc-kakomon-v1.0.0-b2-r20261105-05`、
Codemagic build `6aec4f386a1999f83b794cae`、コミット `2db26e7be`。
ASC6のSimulator選択は成功したが、Appiumの `POST /session` がTimeoutErrorになった。
WDA/Xcode 26.6側の詳細な原因は未確定。ASC7はWDA自体を撮影経路から除く。

`bash scripts/asc_capture.sh` は互換Simulatorの事前確認後、次の設定でビルドする。

```sh
xcodebuild -workspace ios/App/App.xcworkspace -scheme App -configuration Debug \
  -sdk iphonesimulator -destination 'generic/platform=iOS Simulator' \
  -derivedDataPath build/asc-simulator CODE_SIGNING_ALLOWED=NO \
  'SWIFT_ACTIVE_COMPILATION_CONDITIONS=$(inherited) DEBUG ASC_CAPTURE' build
```

撮影ヘルパーは `#if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)` 内にある。
通常Debugは専用フラグなし、提出ReleaseはDebug条件なし、実機はsimulator条件なしで、
どの場合も起動引数の解析・自動遷移・JS実行・準備ログの実装がコンパイル対象外になる。
残る `ASCCaptureGate.isActive` はfalseだけを返す。URL scheme・UserDefaults・Webページや
リモート設定から撮影機能を有効にする入口は作らない。

各画面を新しいプロセスで起動する。引数はルートと毎回新規のUUIDを両方要求し、重複も拒否する。

```sh
xcrun simctl launch --terminate-running-process "$UDID" jp.kakomon-ai.app \
  -AppleLanguages '(ja)' -AppleLocale ja_JP \
  -ascCaptureRoute=/ap -ascCaptureToken="$NEW_UUID"
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
`NSLog` で `ASC_CAPTURE_READY <UUID> <route>` を出す。タイマーは110秒で失敗ログを出す。

Pythonは起動前に `simctl spawn <UDID> log stream --style compact --level info` を開始し、
UUIDで絞り込む。受信したUUIDとルートが完全一致する準備ログだけを採用する。
購読開始直前のログ取り逃がしは5秒ごとの `log show --last 2m --info` で補完する。
120秒待機しても準備ログが来なければ失敗。タイムアウトだけを理由に撮影しない。
ログ購読は各画面のfinallyで停止し、撮影失敗時も作成した端末だけをshutdown/deleteする。

ステータスバーは9:41・Wi-Fi 3本・携帯電波4本・充電完了100%、外観はlightに固定する。
`simctl io <UDID> screenshot --type=png` の原寸を `sips` でJPEG化し、既存の
寸法・RGB・10枚・SHA-256検証が通ってから後続の掲載処理へ進む。

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
