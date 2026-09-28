# 令和6年度関西広域連合試験資料の再利用条件：一次調査

調査日：2026-09-28。対象は[公式過去問題一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html)の[令和6年度前半PDF](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_zennhan.pdf)、[後半PDF](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_kouhan.pdf)、[確定正答PDF](https://www.kouiki-kansai.jp/material/files/group/12/R06touhankaitou.pdf)と、[関西広域連合の利用ルール](https://www.kouiki-kansai.jp/site/221.html)。参照したPDFのSHA-256は `source-receipt.json` に記録。

令和7年度（既公開の1回分）も同じ[公式一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html)にある[前半](https://www.kouiki-kansai.jp/material/files/group/12/R7tourokuhannbaisyashiken_zennhan.pdf)・[後半](https://www.kouiki-kansai.jp/material/files/group/12/R7tourokuhannbaisyashiken_kouhan.pdf)・[正答](https://www.kouiki-kansai.jp/material/files/group/12/R7touhan_kaitou.pdf)を別途取得し、リポジトリの `data/questions/tohan/2025-kansai.json` に記録済みのSHA-256と3件とも一致した。2回分を合わせた掲載条件の調査とする。

## 一次資料から確認できたこと

- 公式一覧が当該年度の問題前半・後半と解答を公開している。公式一覧に令和6年度だけの別利用条件は記載されていない。
- 利用ルールの本文は、別条件がある資料を除き、複製・公衆送信・翻案と商用利用を認める。出典の明記を要求し、編集・加工した場合はその旨を別に明記する。関西広域連合自身が編集版を作成したと誤認される表示は避ける。
- 同ルールは第三者の権利を別に確認し、必要なら許諾を得るよう求める。試験PDF・解答PDFの全文から「出典」「引用」「著作権」「転載」「無断」等を検索した範囲では、別ライセンス、個別の権利者表示、第三者由来の写真・図版は見つからなかった。3 PDFの埋め込み画像は0個。ただしPDFに画像オブジェクトがないことと、第三者権利がないことは同じではない。設問中に他者の文章が含まれる可能性を否定できない。
- 厚生労働省の[令和6年4月版手引き](https://www.mhlw.go.jp/content/001477985.pdf)は解説の事実確認に使用する。解説は独自文で書き、長文転載はしない。
- 令和7年度の3 PDFも全ページのPDFテキストで権利クレジット・転載制限の文言を検索し、埋め込み画像が0件であることを確認した。令和6年度同様、写真・画像の個別転用は予定しない。令和7年度についても第三者の問題テキスト・表現が含まれないとの公式確認は得ていない。PDFの無画像・無クレジットだけでは権利クリアとは判定しない。

## 公開時に必要な表示案

> 出典：関西広域連合「令和6年度 登録販売者試験問題・解答」（公式過去問題一覧、前半・後半・正答の各URL）。当サイトが問題を表示用に編集・加工し、解説を独自に作成しました。関西広域連合による解説・監修ではありません。解説の参照資料：厚生労働省「試験問題の作成に関する手引き（令和6年4月版）」。

実装では各年度・地域・問番号ごとに原本PDFと正答PDFへのリンクを示し、編集・加工の内容が読者に分かるようにする。

## 判定

一次資料の一般利用ルール上は、出典・加工表示を伴う商用再利用が想定されている。令和6年度全120問・600肢の独立内容査読は完了した。**令和6年度の追加公開可否は未承認／公開HOLD。** 両年度PDFの個別素材検査では第三者画像・写真は検出されず、置換対象もない。問題テキストの第三者権利の有無を関西広域連合の資格試験・免許課へ確認し、回答・必要な個別許諾を記録する。令和6年度の公開ローダー・APPROVED・マージ・公開は変更しない。この調査は法的な最終判断ではない。

## 照会先と確認事項

[公式過去問題一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html)の「この記事に関するお問い合わせ先」は関西広域連合本部事務局・資格試験・免許課、電話 06-4803-5669、[同課の問い合わせフォーム](https://www.kouiki-kansai.jp/cgi-bin/inquiry.php/13)。「登録販売者」を選択し、対象記事URLと令和6年度の前半・後半・解答PDFの3 URLを示す必要がある。照会文案は `permission-request-20260928.md` に記録。照会は未送信で、回答も未取得。
