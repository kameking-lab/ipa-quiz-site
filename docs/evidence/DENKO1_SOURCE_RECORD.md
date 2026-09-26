# 第一種電気工事士 学科試験 収録元と公開前提の記録

記録日: 2026-09-26 JST（公式ページ・PDFは同日18:46〜18:48 JSTに取得）

## 公開前提

サイト運営者は2026-09-26、今回依頼した資格試験はすべて許可取得済みという前提で進めるよう指示した。第一種電気工事士もこの前提で公開する。運営者の指示により、サイトの表示文言・問題データには利用条件・転載可否・許諾に関する記述を入れない。出典は第二種電気工事士と同じ形式（実施団体名・年度・期・区分・問番号と、整形・記号置換・図の切り出しの別）で各問に表示する。

## 収録元

| 資料 | URL | sha256 |
|---|---|---|
| 第一種電気工事士試験の問題と解答（一覧） | https://www.shiken.or.jp/construction/first/qa/ | — |
| 令和8年度第一種電気工事士上期学科試験【出題例】問題 | https://www.shiken.or.jp/construction/upload/20260401_co_first_q01.pdf | `c6d5470d2aa8f504b20a1726df8a5200a71fd38b256b8852695eb4b8b0c1ba26` |
| 同 解答 | https://www.shiken.or.jp/construction/upload/20260401_co_first_a01.pdf | `84c6413267ffecf78b5533dfe20fc1381a2447f161a1afbf22011e213a589a8a` |

- 令和8年度上期学科試験（2026年4月1日〜5月8日、CBT方式）について試験センターが公表した出題例で、一般問題40問・配線図問題10問の全50問。公表中の第一種電気工事士学科試験のうち最新。
- 図・写真・選択肢の図は問題PDFから該当部分だけを切り出した（`scripts/denko1-extract.py`、PDFのsha256は各バッチに固定）。選択肢の図から記号の文字を除き、画面では選択肢記号をア・イ・ウ・エに置き換える。
- 正答は解答PDFのとおり。各肢の解説は当サイトが作成したもので、試験センターの解説ではない。

## 品質ゲート

- `scripts/denko1-independent-review.py`: 各問の公式設問行画像・公開用の図・一次資料照合receiptを添付し、claude-opus-5-5 が問題文・四肢・正答・全肢解説を独立に照合。
- `scripts/denko1-law-check.py`: 法令・解釈・施工基準の断定を、経済産業省『電気設備の技術基準の解釈』PDF、e-Gov法令、自治体の施工マニュアル・共通仕様書、製造者カタログの原文句で機械照合し、`docs/evidence/denko1-law/` にsha256付きで保存。
- `scripts/denko1-finalize.py` → `docs/evidence/denko1-final/20260401.json`: 現在の問題データ・設問行画像・図・receiptのハッシュと、PASSした直接レビューを1問ずつ固定。
- `scripts/denko1-strict-coverage.py --require-complete`: 50/50問がすべて固定どおりでなければCIを失敗させる。
