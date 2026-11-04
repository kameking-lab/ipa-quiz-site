# App Store掲載情報と撮影（ASC2）

App Store Connectへログインせず、Codemagicの既存 `App Store Key` 連携で日本語の
掲載文・スクリーンショットをアップロードする。APIキー値を取得・コピー・コミットしない。
Windowsでは静的検証のみ。Mac/Xcodeと本番Webへの接続が撮影に必要。

## Claudeからの起動

1. このコミットを対象ブランチにpushする（ASC2作業自体ではpushしない）。
2. 通常の `kakomon-ios-testflight` 等で対象バージョンのIPAを既にASCへアップロードし、処理完了を待つ。
3. Codemagicの既存 `kakomon_ios` グループに秘密変数 `ASC_SCREENSHOT_REVIEW_CODE` を設定する。
   これはIOS3の有効な本番コード。APIキーではない。コードはログ・URL・リポジトリに書かない。
   既存の `MOBILE_RC_IOS_PUBLIC_KEY` も使う。公開WebにIOS3/NativeToolsが反映済みであること。
4. Codemagicでブランチと `kakomon-asc-metadata` を選び、`ASC_BUILD_NUMBER` に**実際の既存番号**、
   `ASC_APP_VERSION` に対応するmarketing version（初期値1.0.0）を指定して手動開始する。
   API起動の場合は既存のCodemagicトークンとアプリIDを用い、以下のリクエストを送る。
   秘密トークンの値をコマンド引数・ログに出さない。

```json
{
  "appId": "<既存CodemagicアプリID>",
  "workflowId": "kakomon-asc-metadata",
  "branch": "feat/ios-app-v1-20261103",
  "environment": { "variables": {
    "ASC_APP_VERSION": "1.0.0",
    "ASC_BUILD_NUMBER": "<アップロード済み番号>",
    "SUBMIT_FOR_REVIEW": "false"
  }}
}
```

POST先は `https://api.codemagic.io/builds`、ヘッダーは `x-auth-token`。
ASCログインは不要だが、Codemagicの認証が必要。トークン値・アプリIDを本書では新設しない。
`triggering` がないため、通常push・タグpush・PRではこのworkflowを自動実行しない。
既存のTestFlight workflowの通常push動作は従来どおり。

## 設定と動作

| 変数 | 用途 |
|---|---|
| `ASC_APP_VERSION` | 既存ビルドと一致するmarketing version。初期値1.0.0 |
| `ASC_BUILD_NUMBER` | 必須。latestの自動選択なし |
| `ASC_SCREENSHOT_REVIEW_CODE` | 秘密。実際の無料審査会員で撮影。1回の全撮影で回答6問とAI質問2回を消費 |
| `SUBMIT_FOR_REVIEW` | 文字列 `true` のときのみ審査提出。初期値 `false` |
| `ASC_REVIEW_INFO_READY` | Notes記載の本番機能を確認後、`true` で審査情報更新 |
| `ASC_REVIEW_FIRST_NAME`, `ASC_REVIEW_LAST_NAME`, `ASC_REVIEW_PHONE`, `ASC_REVIEW_EMAIL`, `ASC_REVIEW_CODE` | すべて秘密変数。review ready時に全項目必須 |
| `ASC_COPYRIGHT` | 確定した著作権表記。未指定なら変更しない |
| `ASC_PREREQUISITES_CONFIRMED` | ASC1とapi-followupの前提を確認後のみ `true`。審査提出に必要 |

審査コードは無料権利のまま使う。試行錯誤で無料枠・AI上限に達したらJSTの更新を待つか、
正規の別の撮影会員を用意する。権利・回答履歴・AI応答を偽造して通さない。
2機種それぞれの実データは独立し、01資格選択→02回答・解説→03実AI応答→04実履歴→05端末内リマインダー。
05はASC1で許容された代替案で、保存・オフライン権利を主張しない。

撮影端末はiPhone 16 Pro（1206×2622）と16 Pro Max（1320×2868）。
対応するSimulator runtimeがなければ停止。`asc/capture.json` を実在する同寸法機種へ変更できる。
端末名だけ変えて画像を引き伸ばさない。PNG原寸撮影後にJPEGへ変換してalphaをなくす。
fastlane 2.241.2では中型をAPP_IPHONE_61、大型をAPP_IPHONE_67へ分類する。

撮影スクリプトは空のシミュレーターを新規作成し、その端末だけを削除する。
生成物のcontrollerにDebug+simulator限定でWKWebView inspectionを追加し、Appiumから実UIを操作する。
`ios-assets` と配布IPAには変更を加えない。Auth.jsのCSRF/審査用認証APIで正規セッションを取得する。
コードを入力するWebDriver通信はloopbackだけにし、Appiumログ・画面ダンプを保存しない。
ブラウザのAI送信同意ダイアログを受諾し、回答が完了するまで待つ。
エラー・未反映UI・画像未読込・認証失敗なら停止し、アップロードstepに進まない。

成果物はCodemagic artifactsから取得: 10枚のJPEG、SHA-256付きmanifest、API外項目一覧、
成功時 `result.json`、simulator buildログ。画像の見た目と提出Archiveとの一致を確認する。
再撮影時は前回画像を明示的に退避する。既存画像混入を自動削除して隠さない。
ストア上の同言語・対象サイズの既存画像はdeliverで置換する。

## ローカル実行

Windows（秘密やネットワーク不要）:

```powershell
python mobile/scripts/asc_validate.py
python -m unittest discover -s mobile/scripts -p 'asc_test.py' -v
ruby mobile/scripts/asc_config_test.rb
ruby mobile/scripts/asc_lane_test.rb
```

Mac（mobile依存・CocoaPodsと本番公開Webが準備済み）:

```bash
cd mobile
npm run build
bundle install
BUILD_NUMBER="$ASC_BUILD_NUMBER" bundle exec npm run ios:prepare
bash scripts/asc_capture.sh
bundle exec fastlane ios asc_metadata
```

APIの対応範囲と残作業は [api-followup.md](api-followup.md)。
掲載文はASC1そのまま（末尾改行のみ付加）、任意のMarketing URL・初回に不要なRelease Notesは未入力。
主カテゴリはEDUCATION。未確認のCopyright・IAP Product ID・年齢区分・審査連絡先を補完しない。

資料: [Codemagic Builds API](https://docs.codemagic.io/rest-api/builds/)、
[Appium Hybrid Apps](https://appium.github.io/appium-xcuitest-driver/latest/guides/hybrid/)。
