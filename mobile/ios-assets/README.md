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
