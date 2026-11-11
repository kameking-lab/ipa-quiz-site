# k11 問題画像の保管

8資格の既存の非公開設定に合わせ、原問・解答画像218点を `public` の外に保持する。
JSON の `imageUrls` / `answerImageUrls` は将来の配信用パスであり、現在の配信先ではない。
例えば `/images/questions/kikenbutsu-kou/2026-page-02.png` の保管先は
`private-assets/k11/images/questions/kikenbutsu-kou/2026-page-02.png`。

アプリからの配信ルートや自動コピー処理は設けない。デプロイ入力とファイルトレースからも除外する。
公開設定を変更するときは、対象データの公開状態と画像の配置を併せて更新し、
一覧・演習・画像URLを確認する。画像のバイト列と公式正答は今回の移動で変更していない。
