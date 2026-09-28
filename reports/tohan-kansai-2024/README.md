# 登録販売者 令和6年度 関西広域連合 — 非公開ステージング

2026-09-28時点で、[関西広域連合の過去問題一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html)にある[前半](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_zennhan.pdf)、[後半](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_kouhan.pdf)、[確定正答](https://www.kouiki-kansai.jp/material/files/group/12/R06touhankaitou.pdf)を取得した。出題日は2024-08-31。解説の時点根拠は厚生労働省の[令和6年4月版手引き](https://www.mhlw.go.jp/content/001477985.pdf)とする。各PDFのSHA-256と公式正答120件は `source-receipt.json` に記録した。

`extracted-questions.json` は既存の令和7年度用PyMuPDF座標抽出器を令和6年度PDFに適用した**候補原稿**で、120問・600選択肢・公式正答120件を機械的に抽出した。`python reports/tohan-kansai-2024/validate-stage.py` は構造・問番号・科目配分と、公式正答PDFから別途転記した正答表との一致を検査する。逐語照合や解説の正確さを証明するものではない。問41・114の成分表を含め、全問のPDFページ画像との照合が残る。

**公開HOLD:** 問題文と5肢の原本照合120問、令和6年版手引きに基づく各肢の独立理由600件、判定から導く正答と公式正答の照合120問、独立査読120問が未完了。`data/questions/tohan/index.ts` には接続しない。サイトの登録販売者は引き続き令和7年度1回120問のみとして扱う。これらがすべて済むまで「2回分」「全肢解説完備」の表示や本番公開を行わない。

[関西広域連合の利用ルール](https://www.kouiki-kansai.jp/site/221.html)は商用利用を認める一方、出典URLと編集・加工した旨の表示、第三者権利の確認を要求する。公開前に令和6年度資料に別条件・第三者著作物がないか再確認し、既存の令和7年度と同様に年・地域・問番号・原典URL・編集内容を表示する。
