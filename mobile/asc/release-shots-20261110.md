# 2026-11-10 スクリーンショット更新案

App Store掲載画像の更新素材。アップロード・審査提出・公開はこの作業に含めない。
既存の `fastlane/screenshots` と掲載workflowは変更しない。

## 見せる順番

最初の3枚で「資格を探す → 問題を解く → 解説で理解する」を示す。

1. 学びたい資格が、すぐ見つかる。資格名検索と分野フィルター。
2. 一問ずつ、理解を積み重ねる。問題文とタップする選択肢。
3. なぜ正解か。違う答えも、わかる。選択肢ごとの既存解説。
4. わからない点を、その問題のまま。AIへの質問入力。応答は生成しない。
5. 年度で進める。分野をきわめる。資格ページからの演習選択。
6. 気になる一問を、自分の復習帳に。操作して保存したブックマーク。
7. チワワと、こつこつ続けよう。ホームの木もれびの自習室。

## 撮影と成果物

- 対象ソースはこの統合ブランチ。新規Playwrightブラウザーで撮影し、既存Chromeやデバッグポートには接続しない。
- 本番ビルドの生成は禁止されているため、一時的なローカルNext開発サーバーで共有画面を描画する。iOS実機の撮影ではない。
- 既存のアプリ表示切替 `CapacitorCustomPlatform=ios` を利用する。
- 問題は既存の `ap-2022a-am-q32`。本文・選択肢・公式正答・解説は変更しない。
- 無料演習の通信境界だけ、ブラウザー内で見本のゲスト応答に差し替える。問題本文はローカルの公開APIから取得し、購入権利やオフライン保存権利は作らない。
- 回答とブックマークは実際のUI操作。AIへの質問は入力だけで送信しない。外部AI・認証・購入・ダウンロードの通信は遮断する。
- HTML/CSSで背景・見出し・短い説明と操作案内を加え、1320×2868 PNGへ書き出す。
- iOSの `TARGETED_DEVICE_FAMILY = '1'` と公開ページの「iPhoneのみ対応」に合わせ、iPad版は作成しない。

納品先: `C:/Users/kanet/20260522/appstore-shots-20261110/kako/`

再現スクリプト: `C:/Users/kanet/20260522/codex-run-20261110/tools/c-rel-kako-shots/`

詳細な結果・検証・未確認事項: `C:/Users/kanet/20260522/codex-run-20261110/reports/c-rel-kako-shots.md`

## 2026-11-11 第4弾の差し替え（f-kako-shots）

撮影元 `9cbf40d6f`。前回と同じローカル起動・新規Playwright Chromium・iOS表示切替・1320×2868の構成で比較し、画面内に変更がある3枚だけを同じ納品先へ差し替えた。

- `03-explain.png`: 答え合わせ位置のチワワと「相棒まで あと4問」。前回と同じ問題への実回答1件で作られた状態を使用。
- `04-ai.png`: 不要な注意書きを削除した現在の質問入力欄。質問を入力するだけで送信しない。
- `07-room.png`: 自分の席と育成進捗、席選択の新しい配置。育成データの読込みとボタンの有効化を待って撮影。説明は「自分の席のチワワと、今日の一問へ。」、操作は「自習室 →『育成を見る』でお世話」に更新。

`01-choose.png`・`02-answer.png`・`05-modes.png`・`06-bookmark.png` は撮影範囲に変化がなく、前回のPNG・HTML・原寸画面を維持。PNGのSHA-256一致を検証した。一覧画像・見出し一覧・manifest・撮影記録・検証結果も更新。7枚の順番は維持している。

補助スクリプトと変更前の退避画像: `C:/Users/kanet/20260522/codex-run-20261110/tools/f-kako-shots/`

更新レポート: `C:/Users/kanet/20260522/codex-run-20261110/reports/f-kako-shots.md`

## 公式参照

- [現在の公開掲載](https://apps.apple.com/jp/app/id6830358918)
- [Apple画像寸法](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)
- [Apple 2.3 正確なメタデータ](https://developer.apple.com/app-store/review/guidelines/#accurate-metadata)
- [撮影問題の公式問題・解答索引](https://www.ipa.go.jp/shiken/mondai-kaiotu/2022r04.html)
