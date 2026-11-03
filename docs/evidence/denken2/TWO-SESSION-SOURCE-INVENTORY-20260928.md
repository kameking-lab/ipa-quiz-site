# 電験二種一次・2回分へ拡張するための公式ソース台帳

2026-09-28確認。次に拡張する資格は**第二種電気主任技術者（一次試験）**。実施日が異なる2025-08-31と2026-08-30の2回を対象とする。電力・法規などの科目行、1問の複数空欄、一次・二次の別は独立した「試験回」と数えない。現時点で[既存収録状況](STATUS.md)にあるのは2026年の電力35単位と法規35単位だけで、`launch.json` は70単位すべて15肢・15件の非空解説を持つ。理論・機械と2025年の全科目は未収録。

## 公式問題・正答

[試験センターの問題・解答一覧](https://www.shiken.or.jp/chief/second/qa/)に両年の一次試験4科目と正答PDFが掲載されている。URLと実PDFバイト列のSHA-256は [`source-inventory-2025-2026.json`](source-inventory-2025-2026.json) に固定した。10本すべて直接取得してハッシュを計算し、2026年の既収録3本（電力・法規・正答）は既存の `scripts/denken2-source-manifest.json` と一致した。

| 試験日 | 理論 | 電力 | 機械 | 法規 | 正答 |
| --- | --- | --- | --- | --- | --- |
| 2025-08-31 | [公式PDF](https://www.shiken.or.jp/chief/upload/20250831_ch_second_q01.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20250831_ch_second_q02.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20250831_ch_second_q03.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20250831_ch_second_q04.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20250831_ch_second_a01.pdf) |
| 2026-08-30 | [公式PDF](https://www.shiken.or.jp/chief/upload/20260830_ch_second_q01.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20260830_ch_second_q02.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20260830_ch_second_q03.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20260830_ch_second_q04.pdf) | [公式PDF](https://www.shiken.or.jp/chief/upload/20260830_ch_second_a01.pdf) |

## 掲載条件と公開ゲート

[同センターの掲載条件](https://www.shiken.or.jp/chief/second/qa/)は教育目的等の公表過去問題の利用に許諾・使用料を不要とし、年度・試験区分・科目などの出典と、問題を整形した場合の改変表示を求める。著作権は放棄されていない。[FAQ (277)](https://www.shiken.or.jp/shiken/faq/faq08/000082.html)は利用状況の参考として連絡先等をメールで知らせるよう求めるが、許諾申請を要件にはしていない。この作業では外部送信をしていない。独自解説を試験センターの公式解説と誤認させない。

正答PDFの構成から、各回は理論8問・電力7問・機械8問・法規7問で、主に1問5空欄の解答単位となる。単純計数なら各回150単位・2回300単位で、既収録70単位に対し**約230単位が未収録**。ただし2026年理論問7/8は選択問題、機械問7には配点1点の複合欄があるため、公開件数は問題・解答の紙面画像を各単位ごとに確認して確定する。必要な全肢解説は、各空欄の解答群15肢すべてに固有の理由を付ける既存契約に従う。

次の作業順は、公式PDFのページ画像と解答表の科目列を固定し、2026年理論・機械、続いて2025年4科目を問単位に取り込み、各空欄の15肢を一次資料で説明して独立査読すること。選択問題・複合配点・図や数式のOCR欠落は個別に扱う。既存70単位の本番ローダーや `APPROVED` は、このソース台帳では変更しない。資格全体を「2回分、全科目、全肢解説完備」と表示するのは全単位のQA完了後に限る。
