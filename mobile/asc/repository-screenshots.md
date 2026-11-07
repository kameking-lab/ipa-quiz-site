# ASC9: リポジトリ画像で掲載を更新

通常の掲載workflowはSimulator撮影、native build、ios:prepare、Prisma生成を実行しない。
`mobile/fastlane/screenshots/ja/` の10枚と `manifest.json` をGitで管理する。
最初にPythonで寸法・全枚数・SHA-256を検査し、mobile依存の導入後に
`node scripts/asc_repository_check.mjs` で完全デコード・白画面検査・
ハッシュに紐づく目視確認記録を検証する。失敗した場合はアップロードへ進まない。
通常TestFlight、準備タグ、対象build固定、提出ガード・手動公開は従来どおり。

ASC4の無料枠を使わない同じ5画面を維持する。

1. `01-home`: 本番ホームのIT・情報処理フィルターを選んだ資格目次。
2. `02-qualification`: 本番 `/ap` の資格詳細。
3. `03-review`: 本番 `/review` の空の復習キュー。
4. `04-history`: 本番 `/account/dashboard` の回答0件の履歴。
5. `05-reminder`: 同じ `mobile/index.html` / `src/main.tsx` をViteで描画した設定前リマインダー。

1206×2622（Dynamic Island中型・必須）と1320×2868（大型）の各5枚。
6.5インチのセットは今回は追加しない。Appleの現行寸法指定とASC1 §8.1に合わせる。
画像の拡大縮小、架空の履歴・AI応答・通知成功・会員権利の注入は行わない。

撮影は既存Playwrightの**Windows WebKit**を使う。`ms-playwright` の削除・変更・
ブラウザーのinstallは行わない。オンライン4画面は本番の `nativeClient()` と
Capacitorの既存 `CapacitorCustomPlatform` を使い、アプリ用の設定・保存・共有欄も描画する。
下部タブはWeb実装で、別のネイティブUITabBarは実装されていない。
5枚目は本番Webに同じローカル画面がないため、アプリの同じソースをWeb実装で描画する。
通知・購入・権利付与APIは操作しない。既存の本物の空状態を表示する。
広告無効・Cookie同意拒否・案内スキップの撮影条件はASC4に合わせる。

これはiOS実機・Simulatorの撮影ではない。Windowsのフォント、time入力、safe-area、
OSの表示には差があり、iOSビルドとのピクセル一致や通知動作は証明していない。
Apple [2.3 / 2.3.3](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata)
は掲載画像と実際の体験の一致を求める。撮影機材をMacに限定する規定は確認できないが、
ブラウザー出力が無条件で適合する規定もない。共有ソース・アプリ表示切替で実装済みUIを
示す方針とし、審査の承認や実機一致を確認済みとは扱わない。
出典: [Appleの必要寸法](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)。

再撮影時は既存依存を使い、mobileディレクトリで
`npm exec --no -- vite --host 127.0.0.1 --port 5199 --strictPort` を起動する。
別ターミナルでworktree直下から
`node mobile/scripts/asc_capture_windows.mjs mobile/build/asc/windows-capture-NEW` を実行する。
出力先は空でなければ停止する。許可した4画面だけを開き、無料枠・AI・認証・課金経路を送信前に拒否する。
`POST /api/review/due` は実リクエストの `historyIds=[]` かつ `reviewStore={}` を確認した場合だけ送信する。
この空状態は `permittedBatch` に空配列を渡すため問題のgrantを発行しない。応答は本番の実応答を使用する。
原寸で2回撮り、読み込み・画像・フォント・画素変化を検査する。manifestに出典、
local source hash、capture script hash、阻止したリクエストを記録する。
全10枚を目視した後だけ、各画像の `visual_review` を `approved`、確認時刻と
`readable_japanese / no_loading / no_empty_ad_slot / no_personal_information` をtrueにする。
JPEGを `fastlane/screenshots/ja/`、manifestをその親に配置し、両検証を実行してレビューする。

```powershell
python mobile/scripts/asc_validate.py --screenshots
node mobile/scripts/asc_repository_check.mjs
node --test mobile/scripts/asc_repository_check.test.mjs
```

従来のSimulator撮影スクリプトは手動診断用に残すが、掲載workflowは呼ばない。
将来実行する場合はリポジトリ画像を上書きせず、空の別worktreeで行う。
その仕組みは [capture-simctl.md](capture-simctl.md) を参照。
ASC8の本番Web待機には `[aria-label="iPhoneの学習機能"]` が必要だが、ASC9確認時の
本番では操作欄は表示されてもこのaria-labelは0件だった。旧撮影の待機失敗の一因候補であり、
Codemagicの失敗ログ自体を再取得して確定した原因ではない。
