# 登録販売者 令和6年度 関西広域連合 — 非公開ステージング

2026-09-28時点で、[関西広域連合の過去問題一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html)にある[前半](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_zennhan.pdf)、[後半](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_kouhan.pdf)、[確定正答](https://www.kouiki-kansai.jp/material/files/group/12/R06touhankaitou.pdf)を取得した。出題日は2024-08-31。解説の時点根拠は厚生労働省の[令和6年4月版手引き](https://www.mhlw.go.jp/content/001477985.pdf)とする。各PDFのSHA-256と公式正答120件は `source-receipt.json` に記録した。

`extracted-questions.json` は既存の令和7年度用PyMuPDF座標抽出器を令和6年度PDFに適用した**候補原稿**で、120問・600選択肢・公式正答120件を機械的に抽出した。`python reports/tohan-kansai-2024/validate-stage.py` は構造・問番号・科目配分と、公式正答PDFから別途転記した正答表との一致を検査する。逐語照合や解説の正確さを証明するものではない。問21〜40・41・114のPDFページ画像照合を実施し、残り98問の画像照合が必要。

**公開HOLD:** 問題文と5肢の原本画像照合98問、令和6年版手引きに基づく各肢の独立理由査読600件、独立設問査読120問が未完了。下書き40問の正答判定は公式正答と機械照合したが、独立査読は0問。`data/questions/tohan/index.ts` には接続しない。サイトの登録販売者は引き続き令和7年度1回120問のみとして扱う。これらがすべて済むまで「2回分」「全肢解説完備」の表示や本番公開を行わない。

2026-09-28の追加QAは `qa-progress-20260928.json` を参照。公式PDFのSHAを再確認し、問2の「LD50」、問3の英語表記、問22の配合成分表の抽出ミスを修正した。問題文の原本テキスト照合は32問、PDFページ画像照合は22問（問21〜40、41、114）。問21〜40では選択肢と成分表も画像で照合し、追加の転記ミスは見つからなかった。問1〜40は厚労省手引きに基づく選択肢別解説200件を**未査読の下書き**として `draft-choice-reasons-q1-20.json` と `draft-choice-reasons-q21-40.json` に置いた。公式正答との機械照合は各問で一致したが、独立査読の代わりにはならない。機械的な文字包含率スキャンは120問に実施したが、図表の行対応や脱字を保証しない。公開HOLDは継続する。

[関西広域連合の利用ルール](https://www.kouiki-kansai.jp/site/221.html)は商用利用を認める一方、出典URLと編集・加工した旨の表示、第三者権利の確認を要求する。公開前に令和6年度資料に別条件・第三者著作物がないか再確認し、既存の令和7年度と同様に年・地域・問番号・原典URL・編集内容を表示する。
