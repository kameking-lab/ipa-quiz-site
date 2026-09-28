# 登録販売者 令和6年度 関西広域連合 — 非公開ステージング

2026-09-28時点で、[関西広域連合の過去問題一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/touroku/7607.html)にある[前半](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_zennhan.pdf)、[後半](https://www.kouiki-kansai.jp/material/files/group/12/R6tourokuhanbaisyashiken_kouhan.pdf)、[確定正答](https://www.kouiki-kansai.jp/material/files/group/12/R06touhankaitou.pdf)を取得した。出題日は2024-08-31。解説の時点根拠は厚生労働省の[令和6年4月版手引き](https://www.mhlw.go.jp/content/001477985.pdf)とする。各PDFのSHA-256と公式正答120件は `source-receipt.json` に記録した。

`extracted-questions.json` は既存の令和7年度用PyMuPDF座標抽出器を令和6年度PDFに適用した**候補原稿**で、120問・600選択肢・公式正答120件を機械的に抽出した。`python reports/tohan-kansai-2024/validate-stage.py` は構造・問番号・科目配分と、公式正答PDFから別途転記した正答表との一致を検査する。逐語照合や解説の正確さを証明するものではない。問1〜120のPDFページ画像照合を実施した。

**公開HOLD:** 独立査読済みは[113問・565肢](independent-qa-20260928.md)で、残り7問・35肢と第三者権利確認が未完了。公式正答の位置だけは別経路で120問すべて一致した。`data/questions/tohan/index.ts` には接続しない。サイトの登録販売者は引き続き令和7年度1回120問のみとして扱う。これらがすべて済むまで「2回分」「全肢解説完備」の表示や本番公開を行わない。

2026-09-28の追加QAは `qa-progress-20260928.json` を参照。公式PDFのSHAを再確認し、問2の「LD50」、問3の英語表記、問22の配合成分表の抽出ミスを修正した。問題文の原本テキスト照合・PDFページ画像照合はそれぞれ120問。最初の22問の内訳は問21〜40の20問、問41・114の各1問。その後、問42〜60の19問、問61〜80の20問、問81〜100の20問、問101〜120の19問（問114は再照合）、問1〜20の20問を追加し、成分表と五肢の対応も画像で照合した。問1〜120は厚労省手引きに基づく選択肢別解説600件を**非公開の候補原稿**として `draft-choice-reasons-q1-20.json`、`draft-choice-reasons-q21-40.json`、`draft-choice-reasons-q41-60.json`、`draft-choice-reasons-q61-80.json`、`draft-choice-reasons-q81-100.json`、`draft-choice-reasons-q101-120.json` に置いた。法令解説は2024年試験で使われた令和6年4月手引き時点のもの。公式正答との機械照合と別経路からの独立抽出が各120問で一致。機械的な文字包含率スキャンは120問に実施したが、図表の行対応や脱字を保証しない。全600肢の著者側整合性検査は `self-audit-choice-reasons.py` で通過した。手引きの記述については113問・565肢を独立確認済みで、残りは未確認。公開HOLDは継続する。

[関西広域連合の利用ルール](https://www.kouiki-kansai.jp/site/221.html)は商用利用を認める一方、出典URLと編集・加工した旨の表示、第三者権利の確認を要求する。公開前に令和6年度資料に別条件・第三者著作物がないか再確認し、既存の令和7年度と同様に年・地域・問番号・原典URL・編集内容を表示する。
