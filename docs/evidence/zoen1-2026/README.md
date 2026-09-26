# 令和8年度 1級造園施工管理技術検定・第一次検定

全国建設研修センターの[試験問題／正答肢一覧](https://www.jctc.jp/mondai/)から、次の原本を取得した。

| 原本 | 公式URL | SHA-256 |
| --- | --- | --- |
| 問題A | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaia.pdf | `fd2af674b3049915a085ec0c1e5d0a2360549f7cfed0e3fea23be346b9e4f0da` |
| 問題B | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaib.pdf | `f3b0df0c1a8cc7feeb2b659faa7854a0ff1bf41e01b365fe47127b671756a06d` |
| 正答肢 | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_seitou.pdf | `6faa5bee113cde6b5c4665ddcfcde223bae90a11083348c813e1f530f6d81a7d` |

原本の表紙によると、問題Aは36問、問題Bは29問でいずれも**全問必須**。問題BのNo.24〜29は「正解を全て」塗る形式で、正答個数は問題ごとに異なる。原本にはふりがなが重ねて印刷されているため、`scripts/extract-jctc-rubyless.py` でルビを除いたテキストを作成した。公開用の文字起こしではルビ、改行、空白を整理し、原本の数字選択肢をサイトの内部キーへ順番どおりに変換する。

現時点の公開候補は問題A No.1〜5、問題B No.3・24〜26の9問。図や判読できない表を必要とする設問を含めておらず、残りの56問は未収録。`python scripts/audit-zoen1-pilot.py` は候補9問の問題文・4肢・公式正答を原本PDFと照合する。学習用解説は当サイトが作成し、公式正答表とは区別する。
