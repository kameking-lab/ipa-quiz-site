# 令和8年度 1級電気通信工事施工管理技術検定・第一次検定

全国建設研修センターの[試験問題／正答肢一覧](https://www.jctc.jp/mondai/)から、次の原本を取得した。

| 原本 | 公式URL | SHA-256 |
| --- | --- | --- |
| 問題A | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_mondaia.pdf | `92367d48419e62b7bcf9d0f52c5f94c36dc98739c950d890f81ec64ead1c36cf` |
| 問題B | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_mondaib.pdf | `413a26b3b67141778d625cb027a1ff25cab8c343efb9570c13bdd1e7e19a51aa` |
| 正答肢 | https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_seitou.pdf | `ec90c11593965c413028313988dca1bc1a67f29e4cd606d4c3f68064976a404d` |

原本の表紙によると、問題Aは55問から33問を選択（No.1〜19から14問、No.20〜47から14問、No.48〜55から5問）、問題Bは35問から27問を解答（No.1〜2とNo.31〜35は必須、No.3〜16から8問、No.17〜30から12問）する。合計90問のうち実試験の解答数は60問。

初回は図を使わず文章だけで解ける問題A No.5・8・11〜16、問題B No.1・5・6・9の12問を掲載する。残り78問は未収録。`scripts/extract-jctc-rubyless.py`でルビを除去した文字起こしを作り、`scripts/build_tsushin1_pilot.py`でデータ化した。`scripts/audit_tsushin1_pilot.py`は全12問の問題文・4肢・正答を原本PDFと照合する。学習用解説は本サイトが作成し、公式正答表と区別する。
