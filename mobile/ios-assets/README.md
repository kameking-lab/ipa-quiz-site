# iOS AppIcon / APPICON1

採用案はB（紺背景、勉強するチワワ、○×の答案用紙、AI吹き出し）。
既存の `public/brand/chihuahua-icon-512.png` と `public/mascot/chihuahua-study.webp` を
参照して built-in image_gen で3案を生成。外部の画像素材は使用していない。
60pxで顔・AI・○×を区別しやすく、背景とのコントラストが高い案を採用した。

- `icon-1024.png`: App Store用原本。1024×1024、RGB PNG、アルファなし、全面背景、角丸なし。
- `AppIcon.appiconset/`: iPhone / iPad / App Storeの18スロット、13種類のPNGとContents.json。
- 再生成: リポジトリルートで `node mobile/scripts/generate-app-icons.mjs`。
- macOS: mobile内で `npm run ios:prepare`。生成・同期したネイティブプロジェクトへ
  カタログ全体をコピーし、テンプレートのContents.jsonも置き換える。
- `mobile/ios/` は従来どおりgit管理外。Windowsでは素材の生成・寸法・参照整合性を検証済み。
  Xcodeのアセットコンパイル・実機ホーム画面・App Storeアップロードは未検証。

比較画像・3案の1024px原本・生成プロンプト・報告は所有者指定の
`C:/Users/kanet/Documents/Codex/2026-11-02/task-2/appicon1-*` に保存。

## 起動画面（LaunchScreen / 起動中表示）

- `LaunchScreen.storyboard`: Web トップと同じ紙色（`LaunchBackground.colorset`、ライト `#f7f3e9` / ダーク `#1b241e` = `app/home-study.css` の `--study-paper`）の中央に、Web ヘッダーと同じ丸いチワワ（`LaunchChihuahua.imageset`、120pt・画面中央より 40pt 上）。文字・ボタンなし。
- `mobile/index.html` の起動中表示が同じ色・同じ絵・同じ位置で続き、「過去問AI」「今日も1問から」と小さな動き（チワワがゆれる・点）を足す。スクリプトを待たずに HTML だけで描画され、オンラインならそのまま Web トップへ切り替わる（オフライン時は React の画面が置き換える）。
- `QualificationBridgeViewController.swift` が WebView の地色を `LaunchBackground` にするので、起動画面 → 起動中表示の間に白（ダークモードでは黒）が挟まらない。
- 再生成: リポジトリルートで `node mobile/scripts/generate-launch-assets.mjs`（元絵は `public/brand/chihuahua-icon-512.png`。新しい絵は描いていない）。
- `npm run ios:prepare` が `scripts/install-launch-screen.mjs` で Capacitor テンプレートの起動画面（白地＋Capacitor ロゴの `Splash.imageset`）を置き換える。
- iOS は起動画面をキャッシュするため、端末によっては更新後の初回起動で古い起動画面が出ることがある（再起動または再インストールで反映）。
