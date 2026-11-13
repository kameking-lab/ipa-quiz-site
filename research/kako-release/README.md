# 公開用統合の最終点検（kr-2-rv）

対象コード: `af67a4ecb`。製品コードの変更はなく、統合保持の照合とローカル検証の証跡を保存した。

- 取り込み元10枝をGitオブジェクトから照合。追加登録問題ID16,137件・追加資格slug156件を保持（枝間の重複を除いた件数、旧資格コード3組はcanonical対応を含む）。欠落・正答変更0件。
- 登録問題55,281問・321試験区分、ホーム9カテゴリ・361項目。高圧ガス2026年度11原稿は非公開のまま。
- `corepack pnpm typecheck`、`test --maxWorkers=2`、`validate:questions`、`build` が成功。全テストは1,077ファイル・10,481テスト成功、既存10テストスキップ。
- ローカルのビルド済み画面でアカウント入口、キャンセル、ログアウト、セッション消去、新2資格の検索を確認。未処理ブラウザーエラー0件。

## 画面

390×844、上59pxを撮影用CSSで確保。メニューには既存の `app/globals.css` のnative-app用余白ルールと同じ値を撮影時だけ適用した。実機Safari/WebViewの検証ではない。ローカルAuth.jsには合成テストセッションを使用し、実OAuth・本番DB・有料AIは利用していない。

| ファイル | 内容 |
| --- | --- |
| [01-home-iphone.png](01-home-iphone.png) | ホーム |
| [02-signed-in-account-entry-iphone.png](02-signed-in-account-entry-iphone.png) | ログイン後のメニューとアカウント入口 |
| [03-account-iphone.png](03-account-iphone.png) | アカウント先頭のログアウト導線 |
| [04-signout-confirmation-iphone.png](04-signout-confirmation-iphone.png) | ログアウト確認 |
| [05-signed-out-menu-iphone.png](05-signed-out-menu-iphone.png) | ログアウト後のログイン表示 |

## 機械照合

[integration-audit.json](integration-audit.json) は枝ごとの件数・元コミット・資格別名・主要実装の比較結果。[browser-results.json](browser-results.json) は画面検証条件と結果。

詳細ID一覧、実行ログ、補助スクリプトは実行フォルダの `tools/kr-2-rv/`、最終レポートは `reports/kr-2-rv.md` に保存。push・デプロイは行っていない。
