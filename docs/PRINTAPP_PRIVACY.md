# パシャっと管理の公開用文書

`public/printapp/index.html` と `public/printapp/privacy.html` は、同じ運営者のiOSアプリ「パシャっと管理」のサポート・プライバシーポリシー。過去問AIの学習・課金・問い合わせフォームは変更しない。

- 掲載先：`https://www.kakomon-ai.jp/printapp/index.html`
- ポリシー：`https://www.kakomon-ai.jp/printapp/privacy.html`
- 削除等の相談先：`https://www.kakomon-ai.jp/printapp/privacy.html#contact`
- メールは冷蔵庫シェフと同じ公開済み窓口。オーナーの2026-11-11決定で共用。

本文の正本は `kameking-lab/printapp_mobile` の `lib/privacy-policy.json`。本追加時のソースはブランチ `cx/release-p1-20261110`、コミット `81e265c`。

更新時は正本を編集し、そのリポジトリで `npm run privacy:generate` と `npm run privacy:release-check` を実行する。生成された `public/legal/index.html`・`privacy.html` を、このリポジトリの `public/printapp/` へ同名でコピーして一緒に反映する。こちらのHTMLだけで本文を編集しない。

静的HTMLで、JavaScript・広告・購入SDKを含めない。相対リンクとメールリンクだけで閲覧・連絡できる。Next.jsの `public/` 配信を利用し、既存アプリのポリシーURLを差し替えない。

今回の作業はファイル配置まで。push・mainへのマージ・デプロイは未実施。出荷担当者は通常の公開手順で反映後、匿名ブラウザーで2URLの200応答、本文・アプリ名、相互リンク、`#contact`、メールリンクとスマートフォン表示を確認する。その後にパシャっと管理のApp Store掲載URLを更新する。
