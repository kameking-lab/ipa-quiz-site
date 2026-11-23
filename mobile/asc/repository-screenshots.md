# App Store 掲載画像の検証

日本向けの掲載画像は `mobile/fastlane/screenshots/ja/` で管理する。1.0.2 は
`aso-2` の9カットを大型（1320×2868 px）の PNG で掲載する。Dynamic Island 中型の
必須枠には1カット目の1206×2622 px版を入れる。ファイル名の連番が表示順。
[Apple のスクリーンショット仕様](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)

掲載用の寸法とファイル一覧は `asc/listing-screenshots.json` に記載する。
出典・SHA-256・目視確認記録は `fastlane/screenshots/manifest.json` に保存する。
1.0.2の画像は Windows の Playwright WebKit で撮影したアプリ画面による。
学習履歴と受験目標日は撮影用のデータ。2枚目は AI の質問入力画面を掲載する。

画像を差し替える際は、一覧とハッシュを更新し、日本語の可読性、画面の読み込み、
空の広告枠と個人情報の有無を確認してから `visual_review` を更新する。
掲載ワークフローは Python でファイル一覧・寸法・ハッシュを照合し、Node.js で
全画素のデコード・白画面・目視確認記録を検証する。

```powershell
python mobile/scripts/asc_validate.py --screenshots
node mobile/scripts/asc_repository_check.mjs
node --test mobile/scripts/asc_repository_check.test.mjs
```

`asc/capture.json` の撮影設定は [シミュレーターでの診断](capture-simctl.md) に使う。
掲載ワークフローはリポジトリにある掲載画像を使用する。
